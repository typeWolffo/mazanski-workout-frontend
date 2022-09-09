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
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "../../context/authContext";
import { setFormState } from "../../redux/slices/initialFormSlice";
import ApiClient from "../../services/apiService";
import { UserCredentials } from "../../types/userCredentials";

function Login() {
  const apiClient = new ApiClient();
  const router = useRouter();
  const dispatch = useDispatch();
  const { setUserToken } = useAuthContext();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UserCredentials>();

  const onSubmit = handleSubmit((data) =>
    apiClient.login(data).then((response) => {
      const token = response.data.access_token;

      if (token) {
        setUserToken(token);
        router.push("/dashboard");
      }
    })
  );

  const handleChangeForm = () => dispatch(setFormState("register"));

  return (
    <ScaleFade initialScale={0.4} in>
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

            <FormControl
              isRequired
              isInvalid={!!errors.username}
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

            <Button
              type="submit"
              colorScheme="teal"
              loadingText="Logging in..."
              className="mt-5"
              variant="outline"
              w={200}
              isLoading={isSubmitting}
            >
              Login
            </Button>
          </form>
          <Button
            variant="ghost"
            _hover={{ bg: "brand.pastel" }}
            w={200}
            className="mt-5"
            onClick={handleChangeForm}
          >
            Register
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
            textTransform="uppercase"
            paddingLeft={[10, 20, 30]}
          >
            Mazański workout
          </Heading>
        </Box>
      </Box>
    </ScaleFade>
  );
}

export default memo(Login);
