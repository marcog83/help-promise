/**
 * Created by mgobbi on 10/03/2017.
 */

import compose from "./internal/_compose";
import equals from "./src/equals";
import tap from "./src/tap";
import of from "./src/of";
import filter from "./src/filter";

import fromCallback from "./src/from-callback";
import {bind, map, then} from "./src/then-map-bind";
import alt from "./src/alt";
import ap from "./src/ap";
import {isZero, zero} from "./src/zero";
import concat from "./src/concat";

export default {
    compose
    , equals
    , concat
    , of
    , ap
    , fromCallback
    , then
    , bind
    , map
    , filter
    , alt
    , isZero
    , tap
    , zero
}




