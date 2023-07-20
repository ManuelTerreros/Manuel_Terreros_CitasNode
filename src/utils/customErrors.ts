class CreationError extends Error {
    constructor(message: string, componentName: string) {
        super(message)
        this.name = `${componentName}CreationError`
    }
}

class UpdateError extends Error {
    constructor(message: string, componentName: string) {
        super(message)
        this.name = `${componentName}UpdateError`
    }
}

class DeleteError extends Error {
    constructor(message: string, componentName: string) {
        super(message)
        this.name = `${componentName}DeleteError`
    }
}

class RecordNotFoundError extends Error {
    constructor(){
        super("Record has not found yet")
        this.name = "RecordNotFound"
    }
}


class GetAllError extends Error {
    constructor(message: string, componentName?: string){
        super(message)
        this.name = `${componentName}GetAllError`
    }
}

export {
    RecordNotFoundError,
    UpdateError,
    DeleteError,
    GetAllError,
    CreationError
}