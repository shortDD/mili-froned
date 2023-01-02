import { useQuery } from "@apollo/client";
import { ALL_CATEGORIES } from "../../apollo-hooks";
import Carousel from "../../components/Carousel/Carousel";
import Category from "../../components/Category/Category";
import Feed from "../../components/Feed/Feed";
import Header from "../../components/Header/Header";
import { allCategory } from "../../__generated__/allCategory";
import "./index.css";
const pictures = [
  {
    link: "",
    alt: "第一张图片",
    url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-06-27%2F5b3345789ca2c.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1673674750&t=0eaf47b4b7fa39c671eaa600b9f87a24",
  },
  {
    link: "",
    alt: "第二张图片",

    url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1673674770&t=44d1ec396ec95dbb708c7c11a3a180de",
  },
  {
    link: "",
    alt: "第三张图片",
    url: "https://img2.baidu.com/it/u=1395980100,2999837177&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=675",
  },
  {
    link: "",
    alt: "第四张图片",
    url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Ff%2F57a42b9002e19.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1673696573&t=24a40ef93b94625449b728cf46aafc0f",
  },
  {
    link: "",
    alt: "第五张图片",
    url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fupload.pig66.com%2Fuploadfile%2F2017%2F0511%2F20170511075802322.jpg&refer=http%3A%2F%2Fupload.pig66.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1673696594&t=6f98dd5a6a1701680a118c0a00922580",
  },
];
const Home = () => {
  const { data, loading } = useQuery<allCategory>(ALL_CATEGORIES);
  return (
    <div className="homepage">
      <div className="carousel">
        <Carousel pictures={pictures} />
      </div>
      <div className="category">
        <div className="container">
          <div className="category-items">
            {data?.allCategory.categories.map((item) => (
              <Category key={item.id} name={item.name} categoryId={item.id} />
            ))}
          </div>
        </div>
      </div>
      <div className="main">
        <div className="container">
          <Feed />
        </div>
      </div>
    </div>
  );
};

export default Home;
