import { useMutation, useQuery } from "@apollo/client";
import { IonIcon } from "@ionic/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ALL_CATEGORIES, POST_VIDEO } from "../../apollo-hooks";
import useDataUrl from "../../hooks/useDataUrl";
import getVideoDuration from "../../utils/getVideoDuration";
import { uploadFile } from "../../utils/upload";
import { allCategory } from "../../__generated__/allCategory";

import {
  createVideo,
  createVideoVariables,
} from "../../__generated__/createVideo";
import "./index.scss";

interface IFormProps {
  file: any;
  title: string;
  cover: any;
  introduction: string;
  category: number;
}
const Platform = () => {
  const { data: categories } = useQuery<allCategory>(ALL_CATEGORIES);
  const [uploading, setUploading] = useState<boolean>(false);
  // const [cover, setCover] = useState("");
  const [cover, setCover, setCoverByFile] = useDataUrl();

  //-------------------------请求---------------------
  const [postVideo, { data: postVideoResult, loading: postVideoLoading }] =
    useMutation<createVideo, createVideoVariables>(POST_VIDEO, {
      onError: () => {
        setUploading(false);
      },
      onCompleted: (data) => {
        setUploading(false);
        const {
          createVideo: { ok },
        } = data;
        if (ok) {
          reset();
          setCover("");
        }
      },
    });
  //-------------------------请求---------------------

  //-------------------------表单----------------------
  const inputCover = useRef<any>();
  const inputVideo = useRef<any>();
  const videoUrl = useRef<string>("");
  const coverUrl = useRef<string>("");
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      category: 1,
    },
  });
  /*封面上传 */
  const uploadCover = async (files: any) => {
    let result = await uploadFile(files);
    result = result === "error" ? "" : result;
    setCover(result);
    coverUrl.current = result;
    if (!result) {
      setError("cover", { type: "404" });
    }
  };
  /*表单提交事件 */
  const submit = async () => {
    if (postVideoLoading) return;
    const { file, title, introduction, category } = getValues();
    const formData = new FormData();
    formData.append("file", file[0]);
    try {
      setUploading(true);
      videoUrl.current = await uploadFile(file);
      const duration = await getVideoDuration(videoUrl.current);
      postVideo({
        variables: {
          input: {
            title,
            fileUrl: videoUrl.current,
            coverUrl: coverUrl.current,
            introduction,
            categoryId: Number(category),
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  //-------------------------表单----------------------

  return (
    <div className="platform-wrap">
      <div className="platform-header container-lg">
        <div className="left">logo</div>
        <div className="right">22</div>
      </div>
      <div className="main" style={{ display: "flex" }}>
        <div className="sider"></div>
        <div className="content">
          <div className="upload-wrap">
            <div className="upload">
              <form onSubmit={handleSubmit(submit)} className="upload-form">
                <div className="form-item">
                  <label className="form-item-lable">*标题</label>
                  <input
                    {...register("title", { required: true })}
                    className="input"
                  />
                </div>
                <div className="form-item">
                  <label className="form-item-lable">*分类</label>
                  <select
                    {...register("category", { required: true })}
                    className="input-select"
                  >
                    {categories?.allCategory.categories.map((category) => (
                      <option
                        value={category.id}
                        key={category.id}
                        className="option"
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* 上传封面 */}
                <div className="form-item">
                  <label className="form-item-lable">*上传封面</label>
                  <div
                    className="input-cover-wrap"
                    onClick={() => {
                      inputCover.current.click();
                    }}
                  >
                    {cover ? (
                      <div className="cover-wrap">
                        <img src={cover} alt="视频封面" />
                      </div>
                    ) : (
                      <div className="input-cover-btn">
                        <IonIcon
                          icon="add-outline"
                          style={{
                            width: "40px",
                            height: "40px",
                            color: "gray",
                          }}
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      {...register("cover", { required: true })}
                      accept="image/*"
                      className="input-cover"
                      ref={inputCover}
                      onChange={({ target }) => {
                        if (!target.files?.length) return;
                        setValue("cover", target.files, {
                          shouldValidate: true,
                        });
                        // uploadCover(target.files);
                        setCoverByFile(target.files[0]);
                      }}
                    />
                  </div>
                  <div className="upload-error">
                    {errors.cover?.type === "404" && <span>上传失败</span>}
                  </div>
                </div>
                {/* 上传视频 */}
                <div className="form-item">
                  <label className="form-item-lable">*上传视频</label>
                  <div
                    className="input-file-wrap"
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const files = e.dataTransfer.files;
                      setValue("file", files, { shouldValidate: true });
                    }}
                  >
                    <div className="input-file-actions">
                      <div className="upload-icon">
                        <IonIcon
                          icon="cloud-upload-outline"
                          style={{
                            width: "35px",
                            height: "35px",
                          }}
                        />
                        <span>拖拽到此处也可上传</span>
                      </div>
                      <div
                        className="input-file-btn"
                        onClick={() => {
                          inputVideo.current.click();
                        }}
                      >
                        上传视频
                      </div>
                      {getValues("file") && <span></span>}
                    </div>
                    <input
                      type="file"
                      {...register("file", { required: true })}
                      accept="video/*"
                      className="input-file"
                      ref={inputVideo}
                      style={{ display: "none" }}
                      onChange={(e) => {
                        setValue("file", e.target.files, {
                          shouldValidate: true,
                        });
                      }}
                    />
                    {errors.file?.message && <span>file不通过</span>}
                  </div>
                </div>
                <div className="form-item">
                  <label className="form-item-lable">视频简介</label>
                  <textarea
                    {...register("introduction")}
                    className="input-textarea"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
                <div className="form-item">
                  <div style={{ width: "20%" }}></div>
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={!isValid}
                  >
                    {uploading ? "提交中...." : "提交"}
                  </button>
                </div>
                {postVideoResult?.createVideo.ok ? (
                  <span>{"上传成功！！"}</span>
                ) : (
                  <span>{postVideoResult?.createVideo.error}</span>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Platform;
