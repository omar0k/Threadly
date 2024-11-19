import Form from "../components/Form";

const Register = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Form method={"Register"} route={"/api/user/register/"} />
    </div>
  );
};

export default Register;
