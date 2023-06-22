from rest_framework import serializers, validators
from .models import (
    ParentInfo,
    StudentInfo,
    EmployeeInfo,
    ClassModel,
    ClassSchedule,
    Transactions,
    Invoices,
)
from auth_api.models import CustomUser


valid = {
    "required": True,
}


class ParentSerializer(serializers.ModelSerializer):
    class Meta:
        ref_name = "ParentSerializer"
        model = ParentInfo

        fields = "__all__"

        extra_kwargs = {
            "firstName": valid,
            "lastName": valid,
            "branch": {"required": True},
            "country": {"required": True},
            "state": {"required": True},
            "email": {
                "required": True,
                "allow_blank": False,
                "validators": [
                    validators.UniqueValidator(
                        ParentInfo.objects.all(), "email has been used"
                    )
                ],
            },
            "address": {
                "required": True,
            },
            "phoneNumber": {
                "required": True,
                "allow_blank": False,
                "validators": [
                    validators.UniqueValidator(
                        ParentInfo.objects.all(), "number has been used"
                    )
                ],
            },
            "homeNumber": {
                "allow_blank": True,
                "validators": [
                    validators.UniqueValidator(
                        ParentInfo.objects.all(), "number has been used"
                    )
                ],
            },
            "workNumber": {
                "allow_blank": True,
                "validators": [
                    validators.UniqueValidator(
                        ParentInfo.objects.all(), "number has been used"
                    )
                ],
            },
        }

    def create(self, validated_data):
        email = validated_data.get("email")
        lastName = validated_data.get("lastName")

        newParent = ParentInfo.objects.create(**validated_data)

        customUser = CustomUser.objects.create(username=email, isParent=True)
        customUser.set_password(raw_password=lastName)
        customUser.save()
        newParent.save()
        return newParent


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentInfo
        ref_name = "StudentSerializer"
        fields = "__all__"

        extra_kwargs = {
            "firstName": valid,
            "lastName": valid,
            "email": valid,
            "phoneNumber": valid,
        }

    def create(self, validated_data):
        newStudent = StudentInfo.objects.create(**validated_data)

        email, lastName, isAdult = [
            validated_data.get("email"),
            validated_data.get("lastName"),
            validated_data.get("isAdult"),
        ]

        if not isAdult:
            customUser = CustomUser.objects.create(
                username=email,
            )
            customUser.set_password(raw_password=lastName)
            customUser.save()

        newStudent.save()

        return newStudent


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeInfo
        ref_name = "EmployeeSerializer"
        fields = "__all__"

        extra_kwargs = {
            "firstName": valid,
            "lastName": valid,
            "email": {
                "required": True,
                "allow_blank": False,
                "validators": [
                    validators.UniqueValidator(
                        EmployeeInfo.objects.all(),
                        "Email has been used by another tutor",
                    ),
                ],
            },
            "phoneNumber": valid,
            "availabilities": valid,
            "specialization": valid,
            "address": valid,
            "postalCode": valid,
            "dateOfBirth": valid,
            "gender": {
                "allow_blank": True,
                "required": False,
            },
            "socialSecurityNumber": valid,
            "accountNumber": valid,
            "routingNumber": valid,
        }

        def create(self, validated_data):
            # email = validated_data.get("email")
            # lastName = validated_data.get("lastName")
            newEmployee = EmployeeInfo.objects.create(**validated_data)

            newEmployee.save()
            return newEmployee


def DyanamicFullNameSerializer(model_class):
    class FullNameSerializer(serializers.ModelSerializer):
        full_name = serializers.SerializerMethodField()

        def get_full_name(self, obj):
            return f"{obj.firstName} {obj.lastName}"

        class Meta:
            model = model_class
            ref_name = "DyanamicFullNameSerializer"
            fields = (
                "id",
                "full_name",
            )

    return FullNameSerializer


class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassModel
        ref_name = "ClassSerializer"
        fields = "__all__"
        extra_kwargs = {
            "title": {
                "required": True,
                "validators": [
                    validators.UniqueValidator(
                        ClassModel.objects.all(), "Another class has this name already"
                    )
                ],
            },
            "section": {"required": True},
            "branch": {"required": True},
        }

    def create(self, validated_data):
        newClass = ClassModel.objects.create(**validated_data)
        newClass.save()

        return newClass


class ClassSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassModel
        ref_name = "ClassSearchSerializer"
        fields = (
            "id",
            "title",
        )


class ClassScheduleSerializer(serializers.ModelSerializer):
    class_type = serializers.ChoiceField(choices=ClassSchedule.ClassType.choices)

    class Meta:
        ref_name = "ClassScheduleSerializer"
        model = ClassSchedule
        fields = "__all__"

    def create(self, validated_data):
        newSchedule = ClassSchedule.objects.create(**validated_data)
        newSchedule.save()

        return newSchedule


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transactions
        ref_name = "TransactionSerializer"
        fields = "__all__"
        extra_kwargs = {
            "transaction_type": valid,
            "amout": valid,
            "description": {"required": False},
        }

    def create(self, validated_data):
        new_transactions = Transactions.objects.create(
            amount=validated_data.get("amount"),
            type=validated_data.get("type"),
            description=validated_data.get("description"),
            transaction_type=validated_data.get("transaction_type"),
            family=validated_data.get("family"),
        )

        return new_transactions


class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoices
        ref_name = "InvoiceSerializer"
        fields = "__all__"

    def create(self, validated_data):
        new_invoice = Transactions.objects.create(
            format=validated_data.get("format"),
            include=validated_data.get("include"),
            start_date=validated_data.get("start_date"),
            end_date=validated_data.get("end_date"),
            due_date=validated_data.get("due_date"),
            footer_note=validated_data.get("footer_note"),
            private_note=validated_data.get("private_note"),
            family=validated_data.get("family"),
        )

        return new_invoice
