export const createResponse = (res: any, code: any = 200, success: any = true, message: any = '', result: any = []) => {
    return res.json({
        code,
        success,
        message,
        result
    })
}