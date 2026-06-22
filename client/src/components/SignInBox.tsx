import { Link } from "react-router-dom";
import { emailIcon, googleIcon } from "../assets/icons";
import { BrandIconOnly } from "./BrandLogo";

type SignInBoxType = {
  message?: string;
  typeOfLogin: string;
};

const SIGNIN_OPTIONS = [
  {
    id: 1,
    title: "with Google",
    handler: "Google",
    image: googleIcon,
  },
  {
    id: 2,
    title: "with email",
    handler: "mail",
    image: emailIcon,
  },
];

export default function SignInBox({ message, typeOfLogin }: SignInBoxType) {
  function handleGoogleAuth() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
      redirect_uri: import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT_URL,
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };
    const qs = new URLSearchParams(options);
    window.location.assign(`${rootUrl}?${qs.toString()}`);
  }
  function handleEmailLogin() {}
  return (
    <div className="w-[90%] sm:w-full max-w-[650px] mx-auto flex flex-col items-center gap-4 py-16 bg-white rounded-2xl px-6" style={{
        boxShadow: "rgb(190, 190, 190) 2px 2px 12px, rgb(255, 255, 255) -20px -20px 60px"
    }}>
      <BrandIconOnly className="mb-2 h-12 md:h-14" />
      <p className="font-serif text-2xl md:text-[28px] mb-8 text-center">
        {message}
      </p>
      {SIGNIN_OPTIONS.map((item) => {
        return (
          <ButtonLoginWith
            image={item.image}
            key={item.id}
            onClick={
              item.handler == "Google" ? handleGoogleAuth : handleEmailLogin
            }
            text={typeOfLogin + " " + item.title}
          />
        );
      })}
      {typeOfLogin === "Sign in" ? (
        <p style={{ marginTop: "22px", color: "#5c5c5c" }}>
          No account?{" "}
          <Link
            style={{
              color: "#1a8917",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "14px",
            }}
            to="/signin/new"
          >
            Create one
          </Link>
        </p>
      ) : (
        <p style={{ marginTop: "22px", color: "#5c5c5c" }}>
          Already have an account?{" "}
          <Link
            style={{
              color: "#1a8917",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "14px",
            }}
            to="/signin/in"
          >
            Sign in
          </Link>
        </p>
      )}

      <p
        style={{
          fontSize: "13px",
          color: "gray",
          width: "78%",
          textAlign: "center",
          lineHeight: "22px",
          marginTop: "22px",
        }}
      >
        Click “{typeOfLogin}” to agree to NowScripts's Terms of Service and
        acknowledge that NowScripts's Privacy Policy applies to you.
      </p>
    </div>
  );
}

function ButtonLoginWith({
  image,
  onClick,
  text,
}: {
  onClick(): void;
  text: string;
  image: any;
}) {
  return (
    <button
      style={{
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "6px 14px",
        borderRadius: "18px",
        width: "200px",
        border: "1px solid #c9c9c9",
        gap: "12px",
        cursor: "pointer",
        color: "#5c5c5c",
      }}
      onClick={() => {
        onClick();
      }}
    >
      {image}
      {text}
    </button>
  );
}
