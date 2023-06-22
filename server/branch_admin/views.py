from rest_framework.response import Response
from rest_framework import views, viewsets, generics, status, permissions
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import action, permission_classes
from django.shortcuts import get_object_or_404
from master_admin.models import BranchInfo
from .serializers import *
from auth_api.custom_permissions import isBranchAdmin
from knox.auth import TokenAuthentication
from auth_api.models import CustomUser
from django.db.models import Q

# Create your views here.


class ParentView(viewsets.ViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated, isBranchAdmin)

    def create(self, request):
        data = request.data
        serializer = ParentSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request):
        queryset = ParentInfo.objects.all()
        serializer = ParentSerializer(queryset, many=True)
        return Response(serializer.data)

    def getParentInfo(self, request, pk=None):
        queryset = ParentInfo.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = ParentSerializer(user)
        return Response(serializer.data)

    def validate_family_email(self, request, email=None):
        queryset = ParentInfo.objects.all()
        parent = get_object_or_404(queryset, email=email)
        serializer = ParentSerializer(parent)
        return Response(serializer.data)


class StudentView(viewsets.ViewSet):
    authentication_classes = (TokenAuthentication,)

    # permission_classes = (permissions.IsAuthenticated, isBranchAdmin)

    def create(self, request):
        email = request.data["email"]
        print("this is d email", email)
        email_exists = CustomUser.objects.filter(username=email).exists()
        print("email exists is ", email_exists)

        if email_exists:
            return Response({"email": email_exists}, status=status.HTTP_400_BAD_REQUEST)

        else:
            serializer = StudentSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request):
        queryset = StudentInfo.objects.all()
        serializer = StudentSerializer(queryset, many=True)
        return Response(serializer.data)

    @permission_classes(
        [
            isBranchAdmin,
        ]
    )
    @action(
        detail=True,
        methods=[
            "get",
        ],
    )
    def getStudentInfo(self, request, pk=None):
        queryset = StudentInfo.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = StudentSerializer(user)
        parentID = serializer.data["parent"]
        parent = ParentInfo.objects.filter(id=parentID).values(
            "firstName", "lastName", "phoneNumber"
        )[0]

        parentName = f"{parent['firstName']} {parent['lastName']}"
        parentPhoneNumber = parent["phoneNumber"]

        data = serializer.data
        data["parentName"] = parentName
        data["parentPhoneNumber"] = parentPhoneNumber
        return Response(data, status=status.HTTP_200_OK)

    def addIndependentStudent(self, request):
        data = request.data.copy()
        [data.pop("school"), data.pop("grade")]

        data["isAdult"] = True

        serializer = ParentSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # for students
        data = request.data.copy()
        data["parent"] = serializer.data["id"]
        data["isAdult"] = True

        serializer = StudentSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def getParentChild(self, request, parentID=None):
        data = ""
        renderer = JSONRenderer()
        children = StudentInfo.objects.filter(parent=parentID).values(
            "firstName", "lastName", "email"
        )
        # parent_child = get_object_or_404(children, parent=parentID)
        serializer = StudentSerializer(children)
        data = renderer.render(children)
        return Response(data, status=status.HTTP_200_OK)

    def getNames(self, request, branch=None):
        queryset = EmployeeInfo.objects.all()
        serializer_class = DyanamicFullNameSerializer(StudentInfo)
        serializer = serializer_class(queryset, many=True)
        return Response(serializer.data)


class StudentSearchAPIView(generics.ListAPIView):
    serializer_class = DyanamicFullNameSerializer(StudentInfo)
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated, isBranchAdmin)

    def get_queryset(self):
        query = self.request.query_params.get("query")
        branch_id = self.request.query_params.get("branch_id")
        if query:
            queryset = StudentInfo.objects.filter(
                Q(firstName__icontains=query) | Q(lastName__icontains=query)
            )
        if branch_id:
            queryset = queryset.filter(branch_id=branch_id)
        else:
            queryset = StudentInfo.objects.all()
        return queryset


class TutorSearchAPIView(generics.ListAPIView):
    serializer_class = DyanamicFullNameSerializer(EmployeeInfo)
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated, isBranchAdmin)

    def get_queryset(self):
        query = self.request.query_params.get("query")
        branch_id = self.request.query_params.get("branch_id")
        if query:
            queryset = EmployeeInfo.objects.filter(
                Q(firstName__icontains=query) | Q(lastName__icontains=query)
            )
        if branch_id:
            queryset = queryset.filter(branch_id=branch_id)
        else:
            queryset = EmployeeInfo.objects.all()
        return queryset


class ClassSearchAPIView(generics.ListAPIView):
    serializer_class = ClassSearchSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated, isBranchAdmin)

    def get_queryset(self):
        query = self.request.query_params.get("query")
        branch_id = self.request.query_params.get("branch_id")
        if query:
            queryset = ClassModel.objects.filter(Q(title__icontains=query))
        if branch_id:
            queryset = queryset.filter(branch_id=branch_id)
        else:
            queryset = ClassModel.objects.all()
        return queryset


class EmployeeView(viewsets.ViewSet):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (permissions.IsAuthenticated, IsBranchAdmin)
    def create(self, request):
        data = request.data

        serializer = EmployeeSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        email, lastName = [data.get("email"), data.get("lastName")]
        new_user = CustomUser.objects.create(username=email, isTutor=True)
        new_user.set_password(raw_password=lastName)
        new_user.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request):
        queryset = EmployeeInfo.objects.all()
        serializer = EmployeeSerializer(queryset, many=True)
        return Response(serializer.data)

    def getEmployeeInfo(self, request, pk=None):
        queryset = EmployeeInfo.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = EmployeeSerializer(user)
        return Response(serializer.data)

    def getNames(self, request, branch=None):
        queryset = EmployeeInfo.objects.all()
        serializer_class = DyanamicFullNameSerializer(EmployeeInfo)
        serializer = serializer_class(queryset, many=True)
        return Response(serializer.data)


class BranchListView(viewsets.ViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated, isBranchAdmin)

    def get_branch_list(self, request, branch=None, info=None):
        data = ""
        renderer = JSONRenderer()

        if info == "students":
            queryset = StudentInfo.objects.filter(branch=branch).values(
                "id", "firstName", "lastName", "email", "phoneNumber"
            )
            data = renderer.render(queryset)

        elif info == "families":
            queryset = ParentInfo.objects.filter(branch=branch, isAdult=False).values(
                "id", "firstName", "lastName", "email", "phoneNumber"
            )
            data = renderer.render(queryset)

        elif info == "employees":
            queryset = EmployeeInfo.objects.filter(branch=branch).values(
                "id", "firstName", "lastName", "email", "phoneNumber", "hireDate"
            )
            data = renderer.render(queryset)

        return Response(data, status=status.HTTP_200_OK)


class TutorInBranch(generics.ListAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (permissions.IsAuthenticated, IsBranchAdmin)

    serializer_class = EmployeeSerializer

    def get_queryset(self):
        """
        This view should return a list of all the tutors in the branch
        as determined by the id portion of the URL.
        """
        branch_id = self.kwargs["id"]
        return EmployeeInfo.objects.filter(branch=branch_id)


class ParentInBranch(generics.ListAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (permissions.IsAuthenticated, IsBranchAdmin)

    serializer_class = ParentSerializer

    def get_queryset(self):
        """
        This view should return a list of all the parent in the branch
        as determined by the id portion of the URL.
        """
        branch_id = self.kwargs["id"]
        return ParentInfo.objects.filter(branch=branch_id)


class StudentsUnderParent(generics.ListAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (permissions.IsAuthenticated, IsBranchAdmin, IsParent)
    serializer_class = StudentSerializer

    def get_queryset(self):
        """
        This view should return a list of all the students under the parent
        as determined by the id portion of the URL.
        """
        parent_id = self.kwargs["id"]
        return StudentInfo.objects.filter(parent=parent_id)


class ClassView(viewsets.ViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated, isBranchAdmin)

    def create(self, request):
        serializer = ClassSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request):
        queryset = ClassModel.objects.all()
        serializer = ClassSerializer(queryset, many=True)
        return Response(serializer.data)


class ClassScheduleView(viewsets.ViewSet):
    def create(self, request):
        serializer = ClassScheduleSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# this viewset can add student to class and can also retrieve list of all student and the class they are in classes
class StudentClassViewset(viewsets.ViewSet):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (permissions.IsAuthenticated, IsBranchAdmin)
    def create(self, request):
        serializer = ClassSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request):
        queryset = ClassModel.objects.all()
        serializer = ClassSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
