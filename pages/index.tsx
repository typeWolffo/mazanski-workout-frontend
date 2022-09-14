import { Box, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { memo } from "react";
import { useSelector } from "react-redux";
import Login from "../components/Login";
import Register from "../components/Register";
import { currentFormState } from "../redux/slices/initialFormSlice";

const Home: NextPage = () => {
  const { formState } = useSelector(currentFormState);

  const formMap = {
    login: <Login />,
    register: <Register />,
  };
  // @ts-ignore
  const currentForm = formMap[formState]; //TODO: make it better

  return (
    <>
      <Head>
        <title>Mazański Workout</title>
        <meta name="description" content="Mazański workout" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex h="100vh">
        <Box className="w-full h-full relative">
          {currentForm}
          <Image src="/start-screen.jpeg" layout="fill" objectFit="cover" />
        </Box>
      </Flex>
    </>
  );
};

export default memo(Home);
