import "./index.scss";
import Logo from "../../images/logo.png";
import Avatar from "../Avatar/Avatar";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { isLoggedIn } from "../../apollo";

const Header = () => {
  const isLogged = useReactiveVar(isLoggedIn);
  return (
    <div className="header container-lg">
      <div className="header-nav">
        <div className="left">
          <img src={Logo} alt="" className="logo" />
          <ul className="entry-box">
            <li>
              <a href="http://localhost:3000" className="entry">
                主页
              </a>
            </li>
            <li>
              <a href="http://localhost:4000/graphql" className="entry">
                直播
              </a>
            </li>
            <li>
              <a href="http://localhost:4000/graphql" className="entry">
                番剧
              </a>
            </li>
            <li>
              <a href="http://localhost:4000/graphql" className="entry">
                游戏中心
              </a>
            </li>
          </ul>
        </div>
        <div className="center">
          <div className="search">
            <form className="search-form">
              <input type="search" className="search-input" />
              <div className="search-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  style={{ width: "17px", height: "17px" }}
                >
                  <title>Search</title>
                  <path
                    d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    strokeWidth="32"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    strokeWidth="32"
                    d="M338.29 338.29L448 448"
                  />
                </svg>
              </div>
            </form>
          </div>
        </div>
        <div className="right">
          <ul className="entry-box">
            <li>
              {isLogged ? (
                <Avatar avatarUrl="" />
              ) : (
                <Link to="/login">
                  <div className="no-logged-avatar">
                    <span>登入</span>
                  </div>
                </Link>
              )}
            </li>
            <li>
              <Icon iconname="mail-outline" />
            </li>
            <li>
              <Icon iconname="sparkles-outline" />
            </li>
            <li>
              <Icon iconname="time-outline" />
            </li>
            <li>
              <Icon iconname="help-outline" />
            </li>
            <li>
              <Link to="/platform">
                <Button text="发布" bgColor="pink" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Header;
