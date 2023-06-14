const PageTitle = ({title, subTitle}) => {
  return (
    <div>
      <div className=" py-6 md:py-20  px-4 bg-gray-100">
        <div className="my-container text-center">
          <h1 className="text-center text-2xl md:text-4xl font-bold text-black mb-4">
            {title}
          </h1>
          <p>{subTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
