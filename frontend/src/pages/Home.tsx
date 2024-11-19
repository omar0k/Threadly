import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <div className='flex '>
      <Button onClick={Logout}>Logout</Button>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Home;
