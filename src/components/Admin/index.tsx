import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider";

import { Blog } from "@/models/blog.model";

import "./styles.scss";
import {
  Button,
  CircularProgress,
  Input,
  TextareaAutosize,
} from "@mui/material";
import { headers } from "next/headers";
import { set } from "firebase/database";
import Login from "../Login";
import { apiInstance } from "@/services";

const Admin = () => {
  const [blogs, setBlogs] = useState([]);
  const auth = useAuth();
  const [editData, setEditData] = useState({} as any);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [info, setInfo] = useState("");
  const [id, setId] = useState("");

  const [author, setAuthor] = useState("");

  const [loading, setLoading] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [verificationCode, setVerificationCode] = useState("");

  const [openVerificationModal, setOpenVerificationModal] = useState(false);

  const fetchBlogs = async () => {
    const data = await apiInstance.get("/blogs").then((res) => res.data);
    setBlogs(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (auth.user === null || auth.user === undefined) {
      alert("You are not logged in");
      return;
    }
    e.preventDefault();
    setLoading(true);

    let lowerCaseTitle = title.trim().toLowerCase();

    apiInstance
      .post(
        "/blogs",
        {
          title: lowerCaseTitle,
          description,
          info,
          author,
        },
        {
          headers: {
            "x-access-token": auth.user.token,
          },
        }
      )
      .then(() => {
        alert("Success");
        setTitle("");
        setDescription("");
        setInfo("");
        setAuthor("");

        fetchBlogs();

        setOpenCreateModal(false);
      })
      .catch((e) => alert(e));
    setLoading(false);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    if (auth.user === null || auth.user === undefined) {
      alert("You are not logged in");
      return;
    }
    e.preventDefault();
    setLoading(true);

    await apiInstance
      .put(
        `/blogs/post/${id}`,
        {
          title,
          description,
          info,
          author,
        },
        {
          headers: {
            "x-access-token": auth.user.token,
          },
        }
      )
      .then(() => {
        alert("Success");
        setTitle("");
        setDescription("");
        setInfo("");
        setId("");
        setAuthor("");

        fetchBlogs();

        setOpenEditModal(false);
      })
      .catch((e) => alert(e));
    setLoading(false);
  };

  const editBlog = async (id: string) => {
    const data = await apiInstance
      .get(`/blogs/post/${id}`)
      .then((res) => res.data);
    setInfo(data.info);
    setTitle(data.title);
    setDescription(data.description);
    setId(data._id);
    setAuthor(data.author);
    setOpenEditModal(true);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div>
      {auth.user && !openCreateModal && !openEditModal && (
        <div>
          <div className="blog-container">
            <Button
              onClick={() => {
                setOpenCreateModal(true);
                setTitle("");
                setDescription("");
                setInfo("");
              }}
            >
              Create Blog
            </Button>

            <h2>Blogs</h2>
            <div>
              {blogs.map((element: Blog) => (
                <div
                  className="blog-list-item"
                  key={element.title}
                  onClick={() => editBlog(element.title.split(" ").join("-"))}
                >
                  <p> {element.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {auth.user === null && !openVerificationModal && <Login />}
      {auth.user === undefined && <h2>Loading...</h2>}

      {openEditModal && (
        <div className={"hellobello"}>
          <div className={"hello"}>
            <h2>Edit Blog</h2>
            <form
              onSubmit={(e: any) => handleEditSubmit(e)}
              className={"container"}
            >
              <Input
                name="title"
                value={title}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                value={description}
                name="description"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <Input
                value={author}
                name="author"
                placeholder="Author"
                onChange={(e) => setAuthor(e.target.value)}
              />

              <TextareaAutosize
                value={info}
                name="info"
                placeholder="Html"
                onChange={(e) => setInfo(e.target.value)}
                minRows={3}
              />

              {/* Submit Button */}
              <Button
                variant={"contained"}
                type="submit"
                value="Submit"
                className="submit-button"
              >
                {loading ? <CircularProgress /> : "Submit"}
              </Button>

              <Button
                variant={"contained"}
                onClick={() => setOpenEditModal(false)}
                className="submit-button"
              >
                Cancel
              </Button>
            </form>
          </div>

          <div className={"viewer"}>
            <div
              className="blog"
              dangerouslySetInnerHTML={{ __html: info || "" }}
            />
          </div>
        </div>
      )}

      {openCreateModal && (
        <div className={"hellobello"}>
          <div className={"hello"}>
            <h2>Edit Blog</h2>
            <form
              onSubmit={(e: any) => handleSubmit(e)}
              className={"container"}
            >
              <Input
                name="title"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                type="hidden"
                name="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <Input
                name="description"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <Input
                name="author"
                placeholder="Author"
                onChange={(e) => setAuthor(e.target.value)}
              />
              <TextareaAutosize
                name="info"
                placeholder="Html"
                onChange={(e) => setInfo(e.target.value)}
                minRows={3}
              />

              {/* Submit Button */}
              <Button
                variant={"contained"}
                type="submit"
                value="Submit"
                className="submit-button"
              >
                {loading ? <CircularProgress /> : "Submit"}
              </Button>
              <Button
                variant={"contained"}
                onClick={() => setOpenCreateModal(false)}
                className="submit-button"
              >
                Cancel
              </Button>
            </form>
          </div>

          <div className={"viewer"}>
            <div dangerouslySetInnerHTML={{ __html: info || "" }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
