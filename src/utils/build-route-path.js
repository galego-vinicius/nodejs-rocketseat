// /users/:id
export function buildRoutePath(path){
    const routeParametersRejex = /:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routeParametersRejex, '(?<$1>[a-z0-9\-_]+)')

    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

    return pathRegex
}