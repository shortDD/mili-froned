const getStaticUrl = (file: any) => {
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = function (e) {};
};

export default getStaticUrl;
