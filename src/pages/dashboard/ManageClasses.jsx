import { useContext, useEffect } from "react";
import Container from "../../components/shared/Container";
import { AuthContext } from "../../providerders/AuthProviders";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
const ManageClasses = () => {
  const [AxiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);

//   const { data: enrolls = [] } = useQuery({
//     queryKey: [],
//     enabled: !loading,
//     queryFn: async () => {
//       const res = await AxiosSecure.get(`/classes`);
//       return res.data;
//     },
//   });

//   const { data: enrolls = [] } = useQuery({
//     queryKey: [],
//     enabled: !loading,
//     queryFn: async () => {
//       const res = await AxiosSecure.get(`/classes/`);
//       return res.data;
//     },
//   });
useEffect(()=>{
    axios.get('classes').then(res=>{
        console.log('res from manage classes', res.data);
    })
},[])

  return (
    <Container>
      <h1>this </h1>
    </Container>
  );
};

export default ManageClasses;
