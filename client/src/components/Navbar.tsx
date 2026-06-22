import { Link } from "react-router-dom";
import {
  carrotIcon,
  mediumLogo,
  NotificationIcon,
  writeBlogIcon,
} from "../assets/icons";
import { useAuth } from "../contexts/Auth";
import AvatarMenu from "./AvatarMenu";
import Search from "./Search";

export default function Navbar({
  notificationsCount,
}: {
  notificationsCount: number;
}) {
  console.log(notificationsCount);

  return (
    <nav
      style={{
        height: "56px",
        borderBottom: "solid 1px #E2E8F0",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        className="left"
        style={{
          marginLeft: "23px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "17px",
        }}
      >
        <Link to="/">{mediumLogo}</Link>
        <Search />
      </div>
      <div
        className="right"
        style={{
          marginRight: "25px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "16px",
          height: "100%",
        }}
      >
        <Link to="/learn" style={{ textDecoration: "none", color: "#64748B", fontSize: "14px", whiteSpace: "nowrap" }}>Learn</Link>
        <Link to="#" className="hidden md:block" style={{ textDecoration: "none", color: "#64748B", fontSize: "14px", whiteSpace: "nowrap" }}>Roadmaps</Link>
        <Link to="#" className="hidden lg:block" style={{ textDecoration: "none", color: "#64748B", fontSize: "14px", whiteSpace: "nowrap" }}>Projects</Link>
        <Link to="/interview-prep" className="hidden lg:block" style={{ textDecoration: "none", color: "#64748B", fontSize: "14px", whiteSpace: "nowrap" }}>Interview Prep</Link>
        <Link to="/community" className="hidden md:block" style={{ textDecoration: "none", color: "#64748B", fontSize: "14px", whiteSpace: "nowrap" }}>Community</Link>
        <Link
          to="/write"
          className="writeBtn"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            color: "gray",
            gap: "8px",
            textDecoration: "none",
          }}
        >
          <span style={{ color: "#64748B" }}>
            {writeBlogIcon}
          </span>
          <p style={{ fontSize: "14.5px", marginTop: "-4px", color: "#64748B" }}>Share Content</p>
        </Link>
        <div className="notifactionBtn">
          <Link
            to="/notifications"
            style={{
              color: "#64748B",
              textDecoration: "none",
              position: "relative",
            }}
          >
            {NotificationIcon}
            {notificationsCount > 0 && (
              <span
                style={{
                  fontSize: "9.5px",
                  position: "absolute",
                  top: "-15px",
                  right: "-5px",
                  backgroundColor: "#1a8917",
                  color: "white",
                  padding: "3px 3.75px",
                  borderRadius: "4px",
                }}
              >
                {notificationsCount}
              </span>
            )}
          </Link>
        </div>
        <AvatarMenu />
      </div>
    </nav>
  );
}
