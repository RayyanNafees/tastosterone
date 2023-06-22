from django.db import models
from master_admin.models import BranchInfo

# Create your models here.


class ParentInfo(models.Model):
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    email = models.EmailField()
    branch = models.ForeignKey(BranchInfo, on_delete=models.CASCADE)
    phoneNumber = models.CharField(max_length=20)
    homeNumber = models.CharField(max_length=20, blank=True)
    workNumber = models.CharField(max_length=20, blank=True)
    gender = models.CharField(max_length=20)
    address = models.CharField(max_length=10000)
    state = models.CharField(max_length=1000)
    country = models.CharField(max_length=1000)
    zip_code = models.CharField(max_length=100)
    isAdult = models.BooleanField(default=False)

    # short for additional info
    add_info = models.TextField(default="")


class StudentInfo(models.Model):
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    gender = models.CharField(max_length=100, default="male")
    date_of_birth = models.DateField(default="2004-03-23")
    school = models.CharField(max_length=100, default="good college")
    grade = models.CharField(max_length=100, default="grade 2")
    subjects = models.CharField(max_length=10000)
    email = models.EmailField()
    phoneNumber = models.CharField(max_length=20)
    address = models.CharField(max_length=10000, default="USA")
    state = models.CharField(max_length=1000, default="USA")
    country = models.CharField(max_length=1000, default="USA")
    zip_code = models.CharField(max_length=100, default="12345")
    parent = models.ForeignKey(ParentInfo, on_delete=models.CASCADE)
    isAdult = models.BooleanField(default=False)
    add_info = models.TextField(default="", blank=True)
    branch = models.ForeignKey(BranchInfo, on_delete=models.CASCADE)


class EmployeeInfo(models.Model):
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    email = models.EmailField()
    phoneNumber = models.CharField(max_length=20)
    specialization = models.CharField(max_length=10000)
    availablilityData = models.CharField(max_length=5000)
    branch = models.ForeignKey(BranchInfo, on_delete=models.CASCADE)
    address = models.CharField(max_length=10000, default="USA")
    state = models.CharField(max_length=1000, default="USA")
    country = models.CharField(max_length=1000, default="USA")
    postalCode = models.CharField(max_length=100)
    dateOfBirth = models.DateField()
    gender = models.CharField(max_length=100)
    maritalStatus = models.CharField(max_length=1000, blank=True)
    socialSecurityNumber = models.CharField(max_length=11)
    accountNumber = models.CharField(max_length=20)
    routingNumber = models.CharField(max_length=20)
    # additinal information
    add_info = models.TextField(blank=True)
    hireDate = models.DateTimeField(auto_now_add=True)


class ClassModel(models.Model):
    title = models.CharField(max_length=100)
    section = models.CharField(max_length=100)
    branch = models.ForeignKey(BranchInfo, on_delete=models.CASCADE)
    modules = models.TextField(blank=True)
    description = models.TextField()


class ClassSchedule(models.Model):
    class ClassType(models.IntegerChoices):
        group = 1, "group"
        private = 2, "private"

    tutor = models.ForeignKey(EmployeeInfo, on_delete=models.CASCADE)
    students = models.ManyToManyField(StudentInfo)
    class_type = models.IntegerField(choices=ClassType.choices)
    description = models.TextField(blank=True)
    availablilityData = models.CharField(max_length=5000)
    branch = models.ForeignKey(BranchInfo, on_delete=models.CASCADE)


class Transactions(models.Model):
    class TransactionType(models.IntegerChoices):
        payment = 1
        charge = 2
        discount = 3
        refund = 4

    transaction_type = models.IntegerField(choices=TransactionType.choices)
    family = models.ForeignKey(ParentInfo, on_delete=models.CASCADE)
    branch = models.ForeignKey(BranchInfo, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    amount = models.IntegerField()
    description = models.CharField(max_length=1000)
    # repeat, when True makes the payment recurring
    repeat = models.BooleanField(default=False)


class Invoices(models.Model):
    class InvoiceType(models.IntegerChoices):
        condensed = 1
        normal = 2
        expanded = 3

    format = models.IntegerField(choices=InvoiceType.choices)
    # the include is for adding former transactions and balance to the invoice
    include = models.BooleanField(default=True)
    start_date = models.DateField()
    end_date = models.DateField()
    invoice_date = models.DateField(auto_now_add=True)
    due_date = models.DateField()
    footer_note = models.CharField(max_length=1000, blank=True)
    private_note = models.CharField(max_length=1000, blank=True)
    family = models.ForeignKey(ParentInfo, on_delete=models.CASCADE)
    branch = models.ForeignKey(BranchInfo, on_delete=models.CASCADE)


class Module(models.Model):
    topic = models.CharField(max_length=1000, blank=False)
    completed = models.BooleanField(default=False)
