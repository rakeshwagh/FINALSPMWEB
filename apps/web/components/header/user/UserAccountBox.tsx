import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { userInfoActions } from "../../../store/user-slice";
import { useLanguage } from "../../../hooks/useLanguage";
import { AiOutlineHeart } from "react-icons/ai";
import { useRouter } from "next/router";
import { IoLogOutOutline } from "react-icons/io5";
import jsCookie from "js-cookie";
import { logout } from "../../../services/firebase";
interface Props {
  onClose: () => void;
}
const UserAccountBox: React.FC<Props> = ({ onClose }) => {
  const { t } = useLanguage();
  const router = useRouter();
  const dispatch = useDispatch();
  async function onLogoutClickHandler() {
    try {
      dispatch(userInfoActions.userLogout());
      await logout();
      await fetch("http://localhost:3001/auth/logout", {
        method: "post",
        credentials: "include",
      });
      onClose();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <ul>
        <li className="my-1 py-1" onClick={onClose}>
          <Link href={"/favorite"}>
            <a className="flex items-center hover:text-palette-primary">
              <AiOutlineHeart
                style={{
                  fontSize: "1.2rem",
                  width: "1.8rem",
                }}
              />
              <span className="font-normal rtl:mr-1 ltr:ml-1">
                {t.favorites}
              </span>
            </a>
          </Link>
        </li>
        <li className="my-1 py-1" onClick={() => onLogoutClickHandler()}>
          <Link href={`/`}>
            <a className="flex items-center hover:text-palette-primary">
              <IoLogOutOutline
                style={{
                  fontSize: "1.5rem",
                  width: "1.8rem",
                }}
              />
              <span className="font-normal rtl:mr-1 ltr:ml-1">{t.logout}</span>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserAccountBox;
