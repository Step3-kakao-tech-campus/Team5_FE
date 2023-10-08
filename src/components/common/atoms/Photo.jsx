const Photo = ({ className = "", src, alt }) => {
  return (
    <picture className={`photo ${className}`}>
      <source srcSet={`${src}`} />
      <img src={`${src}`} alt={alt} className={`photo ${className}`} />
    </picture>
  );
};

export default Photo;
