import FamilyProfile from "@/app/pages/MasterAdmin/Student-Family/FamilyProfile";

export default ({ params }: { params: { familyID: any } }) => (
  <FamilyProfile familyID={params.familyID} />
);
