

// export const fetchApplabList = () => axios.get('/applab.json')
export const fetchApplabList = () =>
  fetch(
    'https://api.sidequestvr.com/v2/apps?limit=500&is_app_lab=true'
  ).then(res => res.json())
