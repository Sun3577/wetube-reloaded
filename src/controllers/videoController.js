const fakeUser = {
  name: "Yoon Seok",
  loggedIn: false,
};

export const trending = (req, res) =>
  res.render("home", { pageTitle: "Home", fakeUser });

export const see = (req, res) => res.render("watch", { pageTitle: "Watch" });

export const edit = (req, res) =>
  res.render("edit", { pageTitle: "Edit Video" });

export const search = (req, res) => res.send("Search");
export const deleteVideo = (req, res) => {
  console.log(req.params);
  return res.send("Delete Video");
};

export const upload = (req, res) => res.send("Upload");
