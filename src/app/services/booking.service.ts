import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { CollectionReference, DocumentData, DocumentSnapshot, Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore'
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private fs: Firestore, private afs: AngularFirestore) { }

  createBooking(params: any): Observable<any> {
    const ref: CollectionReference<DocumentData> = collection(this.fs, 'bookings');
    return from(addDoc(ref, params));
  }

  // updateBooking(params: any, id: any): Observable<any> {
  //   const ref = doc(this.fs, 'bookings', id);
  //   return from(updateDoc(ref, params))
  // }

  getBookingById(id: any): Observable<any> {
    const bookingsRef = collection(this.fs, 'bookings');
    const queryRef = query(bookingsRef, where('userUid', '==', id));
    return from(getDocs(queryRef)).pipe(
      map((querySnapshot: any) => {
        const data = querySnapshot.docs.map((doc: any) => ({ uid: doc.id, ...doc.data() }));
        return data
      })
    );
  }

  getBookings(): Observable<any> {
    const ref = collection(this.fs, 'bookings');
    return from(getDocs(ref)).pipe(
      map((querySnapshot: any) => {
        const data = querySnapshot.docs.map((doc: any) => ({ uid: doc.id, ...doc.data() }));
        return data
      })
    );
  }

  // deleteBooking(id: any): Observable<any> {
  //   const companyDoc = doc(this.fs, 'bookings', id);
  //   return from(deleteDoc(companyDoc));
  // }
}
