import { useState } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { singinUser } from "../../service/auth";
import SweetAlert from "../common/SweetAlert";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function SignInForm() {
  const { setAuth, setUserInfo } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const singInHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", e.target.email.value);
      formData.append("password", e.target.password.value);
      const response = await singinUser(formData);
      console.log(response);
      // console.log(response.response.data.message);

      if (response.success) {
        await localStorage.setItem("ecom", JSON.stringify(response.token));
        setAuth({
          checkAuth: true,
          token: response.token,
        });
        setUserInfo(response.data);
        SweetAlert({
          icon: "success",
          title: response.message,
        });

        e.target.reset();
      } else {
        SweetAlert({
          icon: "error",
          title: response.response.data.message,
        });
      }
    } catch (error) {
      console.log("error", error);

      SweetAlert({
        icon: "error",
        title: error.request.data.message,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-1 ">
      <div className="flex flex-col justify-center flex-1 w-full max-w-xl mx-auto">
        <div className="border p-10 shadow-2xl rounded-2xl">
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <form className="" onSubmit={singInHandler}>
              <div className="space-y-6">
                <div>
                  <Label htmlFor={"email"}>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    name={"email"}
                    id={"email"}
                    placeholder="info@gmail.com"
                    type="email"
                    required
                    value="glmsr777@gmail.com"
                  />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      name={"password"}
                      id={"password"}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                      value="11223344"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <Button disabled={loading} className="w-full" size="sm">
                    Sign in
                  </Button>
                </div>
              </div>
            </form>
            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
