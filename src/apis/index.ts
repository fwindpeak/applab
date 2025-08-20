import axios from 'axios'

// export const fetchApplabList = () => axios.get('/applab.json')
export const fetchApplabList = () =>
  axios.get(
    'https://api.sidequestvr.com/v2/apps?limit=500&is_app_lab=true'
  )
