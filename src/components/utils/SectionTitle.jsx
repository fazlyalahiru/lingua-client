const SectionTitle = ({title, subTitle}) => {
    return (
        <div className="text-center pt-8 pb-12">
            <h1 className="text-4xl font-bold">{title}</h1>
            <h1 className="text-xl pt-3">{subTitle}</h1>
            <div className=" w-1/4 text-center m-auto border-b-2 border-[#4285f4] pt-3"></div>
        </div>
    );
};

export default SectionTitle;