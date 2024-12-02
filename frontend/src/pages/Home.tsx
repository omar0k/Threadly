import api from '@/api';
import Sidebar from '@/components/Sidebar/Sidebar';
import SidebarTab from '@/components/Sidebar/SidebarTab';
import { Community } from '@/types';
import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [communities, setCommunities] = useState<Community[]>();
  const Logout = () => {
    localStorage.clear();
    navigate('/login');
  };
  useEffect(() => {
    const fetchCommunities = async () => {
      const response = await api.get('/api/communities/');

      console.log(response);
      setCommunities(response.data);
    };
    fetchCommunities();
  }, []);
  return (
    <div className='flex'>
      {/* <Button onClick={Logout}>Logout</Button> */}
      {/* Sidebar */}
      <Sidebar communities={communities} />
      <div>Threads feed</div>
      {/* <div></div> */}
    </div>
  );
};

export default Home;
