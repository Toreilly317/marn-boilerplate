const formatDate = date => {
  const d = new Date(date);
  let dd = d.getDate();
  // Jan is 0
  let mm = d.getMonth() + 1;

  const yyyy = d.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  const formatedDate = `${dd}/${mm}/${yyyy}`;
  return formatedDate;
};

const PostMetaData = ({ posts }) => {
  const totalPostCount = posts.length;
  const [state, setState] = useState({
    draft: 0,
    published: 0,
    removed: 0,
  });

  useEffect(() => {
    posts.map(post => {
      if (post.status) {
        setState({ ...state, [post.status]: state[post.status] + 2 });
      }
    });
  }, []);

  return (
    <div>
      <div>ALL: {totalPostCount}</div>
      <div>Published: {state.published}</div>
      <div>Draft: {state.draft}</div>
      <div>Removed: {state.removed}</div>
    </div>
  );
};
