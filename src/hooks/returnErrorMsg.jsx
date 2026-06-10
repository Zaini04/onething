const returnErrorMsg = (err) => {
    return  err?.response?.data?.message || err?.response?.data?.data?.message || err?.message || 'Something went wrong.'
}

export default returnErrorMsg