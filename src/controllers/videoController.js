export const home = (req, res) => res.send(`HOME`);
export const search = (req, res) => res.send(`SEARCH`);
export const see = (req, res) => {
  console.log(req.params.id);
  res.send(`SEE VIDEO #${req.params.id}`);
};
export const edit = (req, res) => res.send(`EDIT VIDEO`);
export const deleteVideo = (req, res) => res.send(`DELETE VIDEO`);
export const upload = (req, res) => res.send(`UPLOAD VIDEO`);
