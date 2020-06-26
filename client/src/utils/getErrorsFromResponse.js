export default function (err) {
    if (!err) return [{ msg: 'There is no error' }];
    if (!err.response || !err.response.data) return [{ msg: 'Did not get proper response' }];
    if (!err.response.data.error) return [{ msg: 'Did not get error messages in response' }];
    return err.response.data.error.errors;
}
