import React, { useEffect, useState, useCallback } from "react";
import DOMPurify from "dompurify";
import { useAuth } from "../AuthProvider";

import { Blog } from "@/models/blog.model";

import styles from "./admin.module.scss";
import {
  Button,
  CircularProgress,
  Input,
  Select,
  TextareaAutosize,
} from "@mui/material";
import Login from "../Login";
import { blogApi } from "@/services";
import { useRouter, useSearchParams } from "next/navigation";
import { BLOG_CATEGORIES, BLOG_REGIONS } from "@/constants/blog";
import { getBlogSlug } from "@/lib/blog";

const Admin = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const auth = useAuth();
  const router = useRouter();

  // query param edit
  const queryParams = useSearchParams();
  const editParam = queryParams.get("edit");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [info, setInfo] = useState("");
  const [id, setId] = useState("");

  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");

  const [loading, setLoading] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [verificationCode, setVerificationCode] = useState("");

  const [openVerificationModal, setOpenVerificationModal] = useState(false);
  const [isEditorCollapsed, setIsEditorCollapsed] = useState(false);

  const fetchBlogs = async () => {
    const data = await blogApi.getAll();
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

    blogApi
      .create({
        title: lowerCaseTitle,
        description,
        info,
        author,
        category,
        region,
      })
      .then(() => {
        alert("Success");
        setTitle("");
        setDescription("");
        setInfo("");
        setAuthor("");
        setCategory("");
        setRegion("");

        fetchBlogs();

        closeModal("create");
      })
      .catch((e) => alert(e))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    if (auth.user === null || auth.user === undefined) {
      alert("You are not logged in");
      return;
    }
    e.preventDefault();
    setLoading(true);

    await blogApi
      .update(id, {
        title,
        description,
        info,
        author,
        category,
        region,
      })
      .then(() => {
        alert("Success");
        setTitle("");
        setDescription("");
        setInfo("");
        setId("");
        setAuthor("");
        setCategory("");
        setRegion("");

        fetchBlogs();

        closeModal("edit");
      })
      .catch((e) => alert(e))
      .finally(() => {
        setLoading(false);
      });
  };

  const editBlog = useCallback(async (id: string) => {
    // navigate to edit url
    router.push(`/admin?edit=${id}`);

    const data = await blogApi.getBySlug(id);
    setInfo(data.info);
    setTitle(data.title);
    setDescription(data.description);
    setCategory(data.category || "");
    setRegion(data.region || "");
    setId(data._id || "");
    setAuthor(data.author || "");
    setIsEditorCollapsed(false);
    setOpenEditModal(true);
  }, [router]);

  const closeModal = useCallback((which: string = "edit") => {
    if (which === "edit") {
      setOpenEditModal(false);
    } else {
      setOpenCreateModal(false);
    }
    router.push("/admin");
  }, [router]);

  useEffect(() => {
    if (editParam) {
      editBlog(editParam);
    } else {
      closeModal("edit");
      closeModal("create");
    }
  }, [editParam, editBlog, closeModal]);

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div className={styles.adminRoot}>
      {auth.user && !openCreateModal && !openEditModal && (
        <div className={styles.adminDashboard}>
          <div className={styles.adminToolbar}>
            <div className={styles.adminTitle}>
              <h2>Blogs</h2>
              <p>Manage posts and open any blog to edit.</p>
            </div>
            <Button
              variant="contained"
              className={styles.createButton}
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

          <div className={styles.blogContainer}>
            <div className={styles.blogList}>
              {blogs.map((element: Blog) => (
                <button
                  type="button"
                  className={styles.blogListItem}
                  key={element.title}
                  onClick={() => editBlog(getBlogSlug(element))}
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
          <div className={`${styles.adminEditor} ${isEditorCollapsed ? styles.collapsed : ""}`}>
            <div className={styles.editorPanel}>
              <div className={styles.editorHeader}>
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
                className={styles.editorForm}
              >
                <Input
                  name="title"
                  value={title}
                  placeholder="Title"
                  className={styles.editorInput}
                  disableUnderline
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  value={description}
                  name="description"
                  placeholder="Description"
                  className={styles.editorInput}
                  disableUnderline
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Input
                  value={author}
                  name="author"
                  placeholder="Author"
                  className={styles.editorInput}
                  disableUnderline
                  onChange={(e) => setAuthor(e.target.value)}
                />
                <select
                  value={category}
                  className={styles.editorSelect}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {BLOG_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <select
                  value={region}
                  className={styles.editorSelect}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  {BLOG_REGIONS.map((item) => (
                    <option key={item} value={item}>
                      {item || "Region"}
                    </option>
                  ))}
                </select>

                <TextareaAutosize
                  value={info}
                  name="info"
                  placeholder="Html"
                  className={styles.editorTextarea}
                  onChange={(e) => setInfo(e.target.value)}
                  minRows={6}
                />

                <div className={styles.editorActions}>
                  <Button
                    variant="contained"
                    type="submit"
                    value="Submit"
                    className={styles.submitButton}
                  >
                    {loading ? <CircularProgress size={20} /> : "Save Changes"}
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() => closeModal("edit")}
                    className={styles.submitButton}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>

            <div className={styles.previewPanel}>
              <div className={styles.previewHeader}>
                <h3>Live Preview</h3>
                <span>Matches the blog page styling.</span>
              </div>
              <div className={styles.previewBody}>
                <div
                  className={styles.blog}
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(info || "") }}
                />
              </div>
            </div>
          </div>
          <Button
            className={styles.editorToggleHandle}
            onClick={() => setIsEditorCollapsed((s) => !s)}
            aria-pressed={isEditorCollapsed}
          >
            {isEditorCollapsed ? "Show Editor" : "Hide Editor"}
          </Button>
        </>
      )}

      {openCreateModal && (
        <>
          <div className={`${styles.adminEditor} ${isEditorCollapsed ? styles.collapsed : ""}`}>
            <div className={styles.editorPanel}>
              <div className={styles.editorHeader}>
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
                className={styles.editorForm}
              >
                <Input
                  name="title"
                  placeholder="Title"
                  className={styles.editorInput}
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
                  className={styles.editorInput}
                  disableUnderline
                  onChange={(e) => setDescription(e.target.value)}
                />

                <select
                  value={category}
                  className={styles.editorSelect}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {BLOG_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <select
                  value={region}
                  className={styles.editorSelect}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  {BLOG_REGIONS.map((item) => (
                    <option key={item} value={item}>
                      {item || "Region"}
                    </option>
                  ))}
                </select>

                <Input
                  name="author"
                  placeholder="Author"
                  className={styles.editorInput}
                  disableUnderline
                  onChange={(e) => setAuthor(e.target.value)}
                />

                <TextareaAutosize
                  name="info"
                  placeholder="Html"
                  className={styles.editorTextarea}
                  onChange={(e) => setInfo(e.target.value)}
                  minRows={6}
                />

                <div className={styles.editorActions}>
                  <Button
                    variant="contained"
                    type="submit"
                    value="Submit"
                    className={styles.submitButton}
                  >
                    {loading ? <CircularProgress size={20} /> : "Publish"}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => closeModal("create")}
                    className={styles.submitButton}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>

            <div className={styles.previewPanel}>
              <div className={styles.previewHeader}>
                <h3>Live Preview</h3>
                <span>Matches the blog page styling.</span>
              </div>
              <div className={styles.previewBody}>
                <div
                  className={styles.blog}
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(info || "") }}
                />
              </div>
            </div>
          </div>
          <Button
            className={styles.editorToggleHandle}
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
