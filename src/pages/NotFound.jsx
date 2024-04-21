import imgLogo from "../assets/img-logo-2.png";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-slate-700">
      <div className="mb-10 text-center">
        <img src={imgLogo} alt="" className="w-20 mx-auto mb-10 font-poppins" />
      </div>
      <div className="text-center">
        <h1 className="mb-2 text-5xl font-bold">Ooups, page not found..</h1>
        <p className="font-medium text-md mb-11 font-poppins">
          Oops, the page you&apos;re looking for doesn&apos;t exist. <br />
          Please check the URL and try again, or return to the homepage.
        </p>
        <a
          href="/"
          className="px-4 py-2 mb-10 text-white rounded-md shadow-2xl bg-slate-700 hover:bg-slate-600"
        >
          Go back home?
        </a>
      </div>
    </div>
  );
};

export default NotFound;
