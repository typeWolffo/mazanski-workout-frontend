import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  ScaleFade,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setFormState } from "../../redux/slices/initialFormSlice";
import ApiClient from "../../services/apiService";

type RegisterCredentials = {
  username: string;
  mail: string;
  password: string;
  confirmedPassword: string;
};

function Register() {
  const apiClient = new ApiClient();
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<RegisterCredentials>();

  const onSubmit = handleSubmit((data) => {
    const userCredentials = {
      username: data.username,
      password: data.password,
    };
    apiClient.register(userCredentials).then((response) => {
      console.log(response);

      if (response.status === 201) {
        dispatch(setFormState("login"));
      }
    });
  });

  const handleChangeForm = () => dispatch(setFormState("login"));

  return (
    <ScaleFade initialScale={0.7} in={isMounted}>
      <Box
        className="absolute flex z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        color="#fff"
        h="80%"
      >
        <Box
          bgGradient="linear(to-br, brand.dark, brand.pastel)"
          className="rounded-md p-10 flex justify-center flex-col"
          w={["100vw", 400, 500]}
        >
          <form onSubmit={onSubmit} className="w-full">
            <FormControl
              isRequired
              isInvalid={!!errors.username}
              marginBottom={8}
            >
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="Username"
                {...register("username")}
                borderColor="brand.light"
              />
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.mail} marginBottom={8}>
              <FormLabel>Mail</FormLabel>
              <Input
                placeholder="Mail"
                {...register("mail")}
                borderColor="brand.light"
              />
            </FormControl>

            <FormControl
              isRequired
              isInvalid={!!errors.password}
              marginBottom={8}
            >
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
                borderColor="brand.light"
              />
            </FormControl>

            <FormControl
              isRequired
              isInvalid={!!errors.confirmedPassword}
              marginBottom={8}
              borderColor="brand.light"
            >
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm password"
                {...register("confirmedPassword")}
                borderColor="brand.light"
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="teal"
              loadingText="Rejestracja..."
              className="mt-5"
              variant="outline"
              isLoading={isSubmitting}
              w={200}
            >
              Register
            </Button>
          </form>

          <Button
            leftIcon={<ArrowBackIcon />}
            color="brand.accent"
            borderColor="brand.accent"
            variant="outline"
            className="mt-5"
            w={200}
            onClick={handleChangeForm}
          >
            Go back
          </Button>
        </Box>

        <Box
          bg="rgba(225,225,225,0.3)"
          backdropFilter="blur(2px)"
          className="hidden md:flex items-center justify-center"
        >
          <Heading
            bgGradient="linear(to-br, brand.pastel, brand.gray, darkred)"
            bgClip="text"
            fontSize={["xl", "xl", "5xl", "7xl", "8xl"]}
            fontWeight="black"
            w="100%"
            paddingLeft={[10, 20, 30]}
          >
            Rejestracja
          </Heading>
        </Box>
      </Box>
    </ScaleFade>
  );
}

export default memo(Register);
