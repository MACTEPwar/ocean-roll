$(document).ready(() => {
    catalogService.getProductsByFilter({skip: 1, take: 5}, (data) => {
        console.log(data)
    })
})