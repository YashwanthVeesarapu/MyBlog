import React, { useEffect, useState, Fragment } from "react";
import { useAuth } from "../AuthProvider";

import { Blog } from "@/models/blog.model";

import "./styles.scss";
import {
  Button,
  CircularProgress,
  Input,
  Select,
  TextareaAutosize,
} from "@mui/material";
import Login from "../Login";
import { apiInstance } from "@/services";
import { useRouter, useSearchParams } from "next/navigation";

const BLOG_CATEGORIES = [
  "",
  "Technology",
  "Health",
  "Travel",
  "Food",
  "Lifestyle",
  "Education",
  "Finance",
  "Entertainment",
  "Sports",
  "Science",
  "Software",
];

const Admin = () => {
  const [blogs, setBlogs] = useState([]);
  const auth = useAuth();
  const router = useRouter();

  // query param edit
  const queryParams = useSearchParams();
  const editParam = queryParams.get("edit");

  const [editData, setEditData] = useState({} as any);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [info, setInfo] = useState("");
  const [id, setId] = useState("");

  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [verificationCode, setVerificationCode] = useState("");

  const [openVerificationModal, setOpenVerificationModal] = useState(false);
  const [isEditorCollapsed, setIsEditorCollapsed] = useState(false);

  const fetchBlogs = async () => {
    const data = await apiInstance.get("/blog/blogs").then((res) => res.data);
    setBlogs(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsEditorCollapsed(false);
    if (auth.user === null || auth.user === undefined) {
      alert("You are not logged in");
      return;
    }
    e.preventDefault();
    setLoading(true);

    let lowerCaseTitle = title.trim().toLowerCase();

    apiInstance
      .post(
        "/blog/blogs",
        {
          title: lowerCaseTitle,
          description,
          info,
          author,
          category,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        alert("Success");
        setTitle("");
        setDescription("");
        setInfo("");
        setAuthor("");
        setCategory("");

        fetchBlogs();

        closeModal("create");
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
        `/blog/blogs/${id}`,
        {
          title,
          description,
          info,
          author,
          category,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        alert("Success");
        setTitle("");
        setDescription("");
        setInfo("");
        setId("");
        setAuthor("");
        setCategory("");

        fetchBlogs();

        closeModal("edit");
      })
      .catch((e) => alert(e));
    setLoading(false);
  };

  const editBlog = async (id: string) => {
    // navigate to edit url
    router.push(`/admin?edit=${id}`);

    const data = await apiInstance
      .get(`/blog/blogs/post/${id}`, {
        withCredentials: true,
      })
      .then((res) => res.data);
    setInfo(data.info);
    setTitle(data.title);
    setDescription(data.description);
    setCategory(data.category);
    setId(data._id);
    setAuthor(data.author);
    setIsEditorCollapsed(false);
    setOpenEditModal(true);
  };

  const closeModal = (which: string = "edit") => {
    if (which === "edit") {
      setOpenEditModal(false);
    } else {
      setOpenCreateModal(false);
    }
    router.push("/admin");
  };

  useEffect(() => {
    if (editParam) {
      editBlog(editParam);
    } else {
      console.log(editParam);
      closeModal("edit");
      closeModal("create");
    }
  }, [editParam]);

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div className="admin-root">
      {auth.user && !openCreateModal && !openEditModal && (
        <div className="admin-dashboard">
          <div className="admin-toolbar">
            <div className="admin-title">
              <h2>Blogs</h2>
              <p>Manage posts and open any blog to edit.</p>
            </div>
            <Button
              variant="contained"
              className="create-button"
              onClick={() => {
                setOpenCreateModal(true);
                setTitle("");
                setDescription("");
                setInfo("");
              }}
            >
              Create Blog
            </Button>
          </div>

          <div className="blog-container">
            <div className="blog-list">
              {blogs.map((element: Blog) => (
                <button
                  type="button"
                  className="blog-list-item"
                  key={element.title}
                  onClick={() => editBlog(element.title.split(" ").join("-"))}
                >
                  <span>{element.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {auth.user === null && !openVerificationModal && <Login />}
      {auth.user === undefined && <h2>Loading...</h2>}

      {openEditModal && (
        <>
          <div className={`admin-editor ${isEditorCollapsed ? "collapsed" : ""}`}>
            <div className="editor-panel">
              <div className="editor-header">
                <div>
                  <h2>Edit Blog</h2>
                  <p>Changes appear instantly in the preview.</p>
                </div>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setIsEditorCollapsed((s) => !s)}
                  aria-pressed={isEditorCollapsed}
                >
                  {isEditorCollapsed ? "Show Editor" : "Hide Editor"}
                </Button>
              </div>
              <form
                onSubmit={(e: any) => handleEditSubmit(e)}
                className="editor-form"
              >
                <Input
                  name="title"
                  value={title}
                  placeholder="Title"
                  className="editor-input"
                  disableUnderline
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  value={description}
                  name="description"
                  placeholder="Description"
                  className="editor-input"
                  disableUnderline
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Input
                  value={author}
                  name="author"
                  placeholder="Author"
                  className="editor-input"
                  disableUnderline
                  onChange={(e) => setAuthor(e.target.value)}
                />
                <select
                  value={category}
                  className="editor-select"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {BLOG_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <TextareaAutosize
                  value={info}
                  name="info"
                  placeholder="Html"
                  className="editor-textarea"
                  onChange={(e) => setInfo(e.target.value)}
                  minRows={6}
                />

                <div className="editor-actions">
                  <Button
                    variant="contained"
                    type="submit"
                    value="Submit"
                    className="submit-button"
                  >
                    {loading ? <CircularProgress size={20} /> : "Save Changes"}
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() => closeModal("edit")}
                    className="submit-button"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>

            <div className="preview-panel">
              <div className="preview-header">
                <h3>Live Preview</h3>
                <span>Matches the blog page styling.</span>
              </div>
              <div className="preview-body">
                <div
                  className="blog"
                  dangerouslySetInnerHTML={{ __html: info || "" }}
                />
              </div>
            </div>
          </div>
          <Button
            className="editor-toggle-handle"
            onClick={() => setIsEditorCollapsed((s) => !s)}
            aria-pressed={isEditorCollapsed}
          >
            {isEditorCollapsed ? "Show Editor" : "Hide Editor"}
          </Button>
        </>
      )}

      {openCreateModal && (
        <>
          <div className={`admin-editor ${isEditorCollapsed ? "collapsed" : ""}`}>
            <div className="editor-panel">
              <div className="editor-header">
                <div>
                  <h2>Create Blog</h2>
                  <p>Draft the post and review the live preview.</p>
                </div>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setIsEditorCollapsed((s) => !s)}
                  aria-pressed={isEditorCollapsed}
                >
                  {isEditorCollapsed ? "Show Editor" : "Hide Editor"}
                </Button>
              </div>
              <form
                onSubmit={(e: any) => handleSubmit(e)}
                className="editor-form"
              >
                <Input
                  name="title"
                  placeholder="Title"
                  className="editor-input"
                  disableUnderline
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
                  className="editor-input"
                  disableUnderline
                  onChange={(e) => setDescription(e.target.value)}
                />

                <select
                  value={category}
                  className="editor-select"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {BLOG_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <Input
                  name="author"
                  placeholder="Author"
                  className="editor-input"
                  disableUnderline
                  onChange={(e) => setAuthor(e.target.value)}
                />

                <TextareaAutosize
                  name="info"
                  placeholder="Html"
                  className="editor-textarea"
                  onChange={(e) => setInfo(e.target.value)}
                  minRows={6}
                />

                <div className="editor-actions">
                  <Button
                    variant="contained"
                    type="submit"
                    value="Submit"
                    className="submit-button"
                  >
                    {loading ? <CircularProgress size={20} /> : "Publish"}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => closeModal("create")}
                    className="submit-button"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>

            <div className="preview-panel">
              <div className="preview-header">
                <h3>Live Preview</h3>
                <span>Matches the blog page styling.</span>
              </div>
              <div className="preview-body">
                <div
                  className="blog"
                  dangerouslySetInnerHTML={{ __html: info || "" }}
                />
              </div>
            </div>
          </div>
          <Button
            className="editor-toggle-handle"
            onClick={() => setIsEditorCollapsed((s) => !s)}
            aria-pressed={isEditorCollapsed}
          >
            {isEditorCollapsed ? "Show Editor" : "Hide Editor"}
          </Button>
        </>
      )}
    </div>
  );
};

export default Admin;
