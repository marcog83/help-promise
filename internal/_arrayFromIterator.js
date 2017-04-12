/**
 * Created by mgobbi on 12/04/2017.
 */
export default function _arrayFromIterator(iter) {
    var list = [];
    var next;
    while (!(next = iter.next()).done) {
        list.push(next.value);
    }
    return list;
};