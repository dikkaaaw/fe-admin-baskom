import imgLogo from "../assets/img-logo-2.png";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-slate-700">
      <div className="text-center">
        <img src={imgLogo} alt="" className="w-20 mb-20 font-poppins" />
        <h1 className="text-5xl font-bold mb-2">Ooups, page not found..</h1>
        <p className="text-md font-medium mb-11 font-poppins">
          Oops, the page you're looking for doesn't exist. <br />
          Please check the URL and try again, or return to the homepage.
        </p>
        <a
          href="/"
          className="bg-slate-700 shadow-2xl text-white px-4 py-2 rounded-md hover:bg-slate-600"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
