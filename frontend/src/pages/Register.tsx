import Form from "../components/Form";

const Register = () => {
  return (
    <div>
      <Form method={"Register"} route={"/api/user/register/"} />
    </div>
  );
};

export default Register;
