from django.urls import path, re_path, include
from rest_framework.routers import DefaultRouter
from .views import *


router = DefaultRouter()
router.register(r"parent", ParentView, basename="parent")
router.register(r"student", StudentView, basename="student"),
router.register(r"tutors", EmployeeView, basename="tutor"),
router.register(r"class", ClassView, basename="class"),
router.register(r"studentclass", StudentClassViewset, basename="Student-class-viewset"),
router.register(
    r"schedule-class", ClassScheduleView, basename="schedule-class-viewset"
),


urlpatterns = [
    path("", include(router.urls)),
    # path('date-based-class', )
    re_path("^parentinbranch/(?P<id>.+)/$", ParentInBranch.as_view()),
    re_path("^tutorinbranch/(?P<id>.+)/$", TutorInBranch.as_view()),
    re_path("^studentsunderparent/(?P<id>.+)/$", StudentsUnderParent.as_view()),
    path(
        "validate-family/<str:email>",
        ParentView.as_view({"get": "validate_family_email"}),
    ),
    path(
        "add-independent-student/",
        StudentView.as_view({"post": "addIndependentStudent"}),
    ),
    path(
        "get-list/<str:info>/<int:branch>",
        BranchListView.as_view({"get": "get_branch_list"}),
    ),
    path(
        "get-student-info/<int:pk>",
        StudentView.as_view({"get": "getStudentInfo"}),
    ),
    path(
        "get-student-names/<int:branch>",
        StudentView.as_view({"get": "getNames"}),
    ),
    path(
        "get-parent-info/<int:pk>",
        ParentView.as_view({"get": "getParentInfo"}),
    ),
    path(
        "get-employee-info/<int:pk>",
        EmployeeView.as_view({"get": "getEmployeeInfo"}),
    ),
    path(
        "get-employee-names/<int:branch>",
        EmployeeView.as_view({"get": "getNames"}),
    ),
    path(
        "get-parent-child/<int:parentID>",
        StudentView.as_view({"get": "getParentChild"}),
    ),
    # url for searching students
    path("search-students/", StudentSearchAPIView.as_view(), name="student-search"),
    path("search-tutors/", TutorSearchAPIView.as_view(), name="tutor-search"),
    path("search-classes/", ClassSearchAPIView.as_view(), name="class-search"),
]
