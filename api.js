

const searchBook = () => {

    const searchBook = document.getElementById('search-field').value;

    loadBook(searchBook);
    document.getElementById('search-field').value = '';

}

const loadBook = searchBook => {
    const url = `https://openlibrary.org/search.json?q=${searchBook}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBook(data.numFound, data.docs));
}

const displayBook = (count, books) => {


    const bookContainer = document.getElementById('books');

    bookContainer.textContent = '';
    const isFound = document.getElementById('isFound');
    if (books.length === 0) {
        isFound.innerText = '😞 No result found ☹';
    }
    else {
        isFound.innerHTML = `search result: ${count} `;
        books?.slice(-25).forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `   
         <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">  
        <div class="card-body">
            <h4 class="card-title">Book name : ${book.title}</h4>
             <h5>Author: <span class="text-danger">${book.author_name ? book.author_name : 'No Name found'}</span></h5>
             <h5>Publisher: <span class="text-danger">${book.publisher ? book.publisher : 'No Publisher found'}</span></h5>
            <h5>First Publishment: ${books[0].first_publish_year ? books[0].first_publish_year : 'No Date Found'}</h5>
        </div>
    `;
            bookContainer.appendChild(div);
        })
    }
}