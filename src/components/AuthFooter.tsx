import React from "react";
import { Typography } from "./ui/Typography";
import Link from "next/link";

const AuthFooter = ({ isLogin }: { isLogin?: boolean }) => {
  return (
    <div className="h-18 flex justify-center border-t border-strokes-primary items-center fixed bottom-0 left-0 right-0 bg-white">
      <Typography variant="paragraph" className="text-primary-stroke">
        {isLogin ? "Еще нет аккаунта?" : "Уже есть аккаунт?"}
        <Link href={isLogin ? "/register" : "/login"} className="text-txt ml-1">
          {isLogin ? "Зарегистрироваться" : "Войти"}
        </Link>
      </Typography>
    </div>
  );
};

export default AuthFooter;
