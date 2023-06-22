import StudentProfile from '@/app/pages/MasterAdmin/Student-Family/StudentProfile'

export default ({params}: {params: {studentID: any}}) => <StudentProfile studentID={params.studentID} />