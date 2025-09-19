<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
        <button @click="updateBook(book.id)" style="margin-left: 10px">Update</button>
        <button @click="deleteBook(book.id)" style="margin-left: 5px">Delete</button>
      </li>
    </ul>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import db from '../Firebase/init.js'
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  orderBy,
  limit
} from 'firebase/firestore'

export default {
  setup() {
    const books = ref([])

    // Fetch books from Firestore
    const fetchBooks = async () => {
      try {
        const q = query(
          collection(db, 'books'),
          where('isbn', '>', 1000),
          orderBy('isbn', 'desc'),
          limit(3)
        )
        const querySnapshot = await getDocs(q)
        const booksArray = []
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() })
        })
        books.value = booksArray
      } catch (error) {
        console.error('Error fetching books: ', error)
      }
    }
    // Update book details
    const updateBook = async (bookId) => {
      const newName = prompt('Enter new book name:')
      const newIsbn = prompt('Enter new ISBN:')

      if (newName && newIsbn) {
        try {
          await updateDoc(doc(db, 'books', bookId), {
            name: newName,
            isbn: Number(newIsbn)
          })
          fetchBooks()
        } catch (error) {
          console.error('Error updating book:', error)
        }
      }
    }
    
    // Delete a book
    const deleteBook = async (bookId) => {
      try {
        await deleteDoc(doc(db, 'books', bookId))
        fetchBooks()
      } catch (error) {
        console.error('Error deleting book:', error)
      }
    }

    onMounted(() => {
      fetchBooks()
    })

    return {
      books,
      updateBook,
      deleteBook
    }
  }
}
</script>
