//region block: polyfills
if (typeof ArrayBuffer.isView === 'undefined') {
  ArrayBuffer.isView = function (a) {
    return a != null && a.__proto__ != null && a.__proto__.__proto__ === Int8Array.prototype.__proto__;
  };
}
if (typeof Array.prototype.fill === 'undefined') {
  // Polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill#Polyfill
  Object.defineProperty(Array.prototype, 'fill', {value: function (value) {
    // Steps 1-2.
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }
    var O = Object(this); // Steps 3-5.
    var len = O.length >>> 0; // Steps 6-7.
    var start = arguments[1];
    var relativeStart = start >> 0; // Step 8.
    var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len); // Steps 9-10.
    var end = arguments[2];
    var relativeEnd = end === undefined ? len : end >> 0; // Step 11.
    var finalValue = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len); // Step 12.
    while (k < finalValue) {
      O[k] = value;
      k++;
    }
    ; // Step 13.
    return O;
  }});
}
[Int8Array, Int16Array, Uint16Array, Int32Array, Float32Array, Float64Array].forEach(function (TypedArray) {
  if (typeof TypedArray.prototype.fill === 'undefined') {
    Object.defineProperty(TypedArray.prototype, 'fill', {value: Array.prototype.fill});
  }
});
[Int8Array, Int16Array, Uint16Array, Int32Array, Float32Array, Float64Array].forEach(function (TypedArray) {
  if (typeof TypedArray.prototype.sort === 'undefined') {
    Object.defineProperty(TypedArray.prototype, 'sort', {value: function (compareFunction) {
      compareFunction = compareFunction || function (a, b) {
        if (a < b)
          return -1;
        if (a > b)
          return 1;
        if (a === b) {
          if (a !== 0)
            return 0;
          var ia = 1 / a;
          return ia === 1 / b ? 0 : ia < 0 ? -1 : 1;
        }
        return a !== a ? b !== b ? 0 : 1 : -1;
      };
      return Array.prototype.sort.call(this, compareFunction || totalOrderComparator);
    }});
  }
});
if (typeof Math.hypot === 'undefined') {
  Math.hypot = function () {
    var y = 0;
    var length = arguments.length;
    for (var i = 0; i < length; i++) {
      if (arguments[i] === Infinity || arguments[i] === -Infinity) {
        return Infinity;
      }
      y += arguments[i] * arguments[i];
    }
    return Math.sqrt(y);
  };
}
if (typeof Math.clz32 === 'undefined') {
  Math.clz32 = function (log, LN2) {
    return function (x) {
      var asUint = x >>> 0;
      if (asUint === 0) {
        return 32;
      }
      return 31 - (log(asUint) / LN2 | 0) | 0; // the "| 0" acts like math.floor
    };
  }(Math.log, Math.LN2);
}
(function () {
  if (typeof globalThis === 'object')
    return;
  Object.defineProperty(Object.prototype, '__magic__', {get: function () {
    return this;
  }, configurable: true});
  __magic__.globalThis = __magic__;
  delete Object.prototype.__magic__;
}());
if (typeof Math.imul === 'undefined') {
  Math.imul = function imul(a, b) {
    return (a & 4.29490176E9) * (b & 65535) + (a & 65535) * (b | 0) | 0;
  };
}
//endregion
(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports'], factory);
  else if (typeof exports === 'object')
    factory(module.exports);
  else
    root.motor = factory(typeof motor === 'undefined' ? {} : motor);
}(this, function (_) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var clz32 = Math.clz32;
  var isView = ArrayBuffer.isView;
  var hypot = Math.hypot;
  //endregion
  //region block: pre-declaration
  setMetadataFor(Annotation, 'Annotation', interfaceMeta);
  setMetadataFor(IntrinsicConstEvaluation, 'IntrinsicConstEvaluation', classMeta, VOID, [Annotation]);
  setMetadataFor(CharSequence, 'CharSequence', interfaceMeta);
  setMetadataFor(Comparable, 'Comparable', interfaceMeta);
  setMetadataFor(Iterator, 'Iterator', interfaceMeta);
  setMetadataFor(ListIterator, 'ListIterator', interfaceMeta, VOID, [Iterator]);
  setMetadataFor(MutableIterator, 'MutableIterator', interfaceMeta, VOID, [Iterator]);
  setMetadataFor(MutableListIterator, 'MutableListIterator', interfaceMeta, VOID, [ListIterator, MutableIterator]);
  setMetadataFor(Number_0, 'Number', classMeta);
  setMetadataFor(Suppress, 'Suppress', classMeta, VOID, [Annotation]);
  setMetadataFor(SinceKotlin, 'SinceKotlin', classMeta, VOID, [Annotation]);
  setMetadataFor(PublishedApi, 'PublishedApi', classMeta, VOID, [Annotation]);
  setMetadataFor(ParameterName, 'ParameterName', classMeta, VOID, [Annotation]);
  setMetadataFor(Deprecated, 'Deprecated', classMeta, VOID, [Annotation]);
  setMetadataFor(ReplaceWith, 'ReplaceWith', classMeta, VOID, [Annotation]);
  setMetadataFor(DeprecatedSinceKotlin, 'DeprecatedSinceKotlin', classMeta, VOID, [Annotation]);
  setMetadataFor(ExtensionFunctionType, 'ExtensionFunctionType', classMeta, VOID, [Annotation]);
  setMetadataFor(Enum, 'Enum', classMeta, VOID, [Comparable]);
  setMetadataFor(DeprecationLevel, 'DeprecationLevel', classMeta, Enum);
  setMetadataFor(UnsafeVariance, 'UnsafeVariance', classMeta, VOID, [Annotation]);
  setMetadataFor(Unit, 'Unit', objectMeta);
  setMetadataFor(Target, 'Target', classMeta, VOID, [Annotation]);
  setMetadataFor(AnnotationTarget, 'AnnotationTarget', classMeta, Enum);
  setMetadataFor(Retention, 'Retention', classMeta, VOID, [Annotation]);
  setMetadataFor(AnnotationRetention, 'AnnotationRetention', classMeta, Enum);
  setMetadataFor(MustBeDocumented, 'MustBeDocumented', classMeta, VOID, [Annotation]);
  setMetadataFor(Repeatable, 'Repeatable', classMeta, VOID, [Annotation]);
  setMetadataFor(ByteCompanionObject, 'ByteCompanionObject', objectMeta);
  setMetadataFor(ShortCompanionObject, 'ShortCompanionObject', objectMeta);
  setMetadataFor(IntCompanionObject, 'IntCompanionObject', objectMeta);
  setMetadataFor(FloatCompanionObject, 'FloatCompanionObject', objectMeta);
  setMetadataFor(DoubleCompanionObject, 'DoubleCompanionObject', objectMeta);
  setMetadataFor(StringCompanionObject, 'StringCompanionObject', objectMeta);
  setMetadataFor(BooleanCompanionObject, 'BooleanCompanionObject', objectMeta);
  setMetadataFor(Comparator, 'Comparator', interfaceMeta);
  setMetadataFor(JsQualifier, 'JsQualifier', classMeta, VOID, [Annotation]);
  setMetadataFor(JsFileName, 'JsFileName', classMeta, VOID, [Annotation]);
  setMetadataFor(JsName, 'JsName', classMeta, VOID, [Annotation]);
  setMetadataFor(Ignore, 'Ignore', classMeta, VOID, [Annotation]);
  setMetadataFor(JsExport, 'JsExport', classMeta, VOID, [Annotation]);
  setMetadataFor(EagerInitialization, 'EagerInitialization', classMeta, VOID, [Annotation]);
  setMetadataFor(Iterable, 'Iterable', interfaceMeta);
  setMetadataFor(Collection, 'Collection', interfaceMeta, VOID, [Iterable]);
  setMetadataFor(AbstractCollection, 'AbstractCollection', classMeta, VOID, [Collection]);
  setMetadataFor(MutableIterable, 'MutableIterable', interfaceMeta, VOID, [Iterable]);
  setMetadataFor(MutableCollection, 'MutableCollection', interfaceMeta, VOID, [Collection, MutableIterable]);
  setMetadataFor(AbstractMutableCollection, 'AbstractMutableCollection', classMeta, AbstractCollection, [AbstractCollection, MutableCollection]);
  setMetadataFor(IteratorImpl, 'IteratorImpl', classMeta, VOID, [MutableIterator]);
  setMetadataFor(ListIteratorImpl, 'ListIteratorImpl', classMeta, IteratorImpl, [IteratorImpl, MutableListIterator]);
  setMetadataFor(List, 'List', interfaceMeta, VOID, [Collection]);
  setMetadataFor(MutableList, 'MutableList', interfaceMeta, VOID, [List, MutableCollection]);
  setMetadataFor(AbstractMutableList, 'AbstractMutableList', classMeta, AbstractMutableCollection, [AbstractMutableCollection, MutableList]);
  setMetadataFor(RandomAccess, 'RandomAccess', interfaceMeta);
  setMetadataFor(SubList, 'SubList', classMeta, AbstractMutableList, [AbstractMutableList, RandomAccess]);
  setMetadataFor(Map_0, 'Map', interfaceMeta);
  setMetadataFor(AbstractMap, 'AbstractMap', classMeta, VOID, [Map_0]);
  setMetadataFor(MutableMap, 'MutableMap', interfaceMeta, VOID, [Map_0]);
  setMetadataFor(AbstractMutableMap, 'AbstractMutableMap', classMeta, AbstractMap, [AbstractMap, MutableMap]);
  setMetadataFor(Set, 'Set', interfaceMeta, VOID, [Collection]);
  setMetadataFor(MutableSet, 'MutableSet', interfaceMeta, VOID, [Set, MutableCollection]);
  setMetadataFor(AbstractMutableSet, 'AbstractMutableSet', classMeta, AbstractMutableCollection, [AbstractMutableCollection, MutableSet]);
  setMetadataFor(Companion, 'Companion', objectMeta);
  setMetadataFor(ArrayList, 'ArrayList', classMeta, AbstractMutableList, [AbstractMutableList, MutableList, RandomAccess], ArrayList_init_$Create$);
  setMetadataFor(HashMap, 'HashMap', classMeta, AbstractMutableMap, [AbstractMutableMap, MutableMap], HashMap_init_$Create$_0);
  setMetadataFor(HashMapKeys, 'HashMapKeys', classMeta, AbstractMutableSet, [MutableSet, AbstractMutableSet]);
  setMetadataFor(HashMapValues, 'HashMapValues', classMeta, AbstractMutableCollection, [MutableCollection, AbstractMutableCollection]);
  setMetadataFor(HashMapEntrySetBase, 'HashMapEntrySetBase', classMeta, AbstractMutableSet, [MutableSet, AbstractMutableSet]);
  setMetadataFor(HashMapEntrySet, 'HashMapEntrySet', classMeta, HashMapEntrySetBase);
  setMetadataFor(HashMapKeysDefault$iterator$1, VOID, classMeta, VOID, [MutableIterator]);
  setMetadataFor(HashMapKeysDefault, 'HashMapKeysDefault', classMeta, AbstractMutableSet);
  setMetadataFor(HashMapValuesDefault$iterator$1, VOID, classMeta, VOID, [MutableIterator]);
  setMetadataFor(HashMapValuesDefault, 'HashMapValuesDefault', classMeta, AbstractMutableCollection);
  setMetadataFor(HashSet, 'HashSet', classMeta, AbstractMutableSet, [AbstractMutableSet, MutableSet], HashSet_init_$Create$_0);
  setMetadataFor(Companion_0, 'Companion', objectMeta);
  setMetadataFor(Itr, 'Itr', classMeta);
  setMetadataFor(KeysItr, 'KeysItr', classMeta, Itr, [Itr, MutableIterator]);
  setMetadataFor(ValuesItr, 'ValuesItr', classMeta, Itr, [Itr, MutableIterator]);
  setMetadataFor(EntriesItr, 'EntriesItr', classMeta, Itr, [Itr, MutableIterator]);
  setMetadataFor(Entry, 'Entry', interfaceMeta);
  setMetadataFor(MutableEntry, 'MutableEntry', interfaceMeta, VOID, [Entry]);
  setMetadataFor(EntryRef, 'EntryRef', classMeta, VOID, [MutableEntry]);
  function containsAllEntries(m) {
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlin.collections.all' call
      var tmp;
      if (isInterface(m, Collection)) {
        tmp = m.isEmpty_y1axqb_k$();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = true;
        break $l$block_0;
      }
      var tmp0_iterator = m.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'kotlin.collections.InternalMap.containsAllEntries.<anonymous>' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        var entry = element;
        var tmp_0;
        if (!(entry == null) ? isInterface(entry, Entry) : false) {
          tmp_0 = this.containsOtherEntry_yvdc55_k$(entry);
        } else {
          tmp_0 = false;
        }
        if (!tmp_0) {
          tmp$ret$0 = false;
          break $l$block_0;
        }
      }
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  }
  setMetadataFor(InternalMap, 'InternalMap', interfaceMeta);
  setMetadataFor(InternalHashMap, 'InternalHashMap', classMeta, VOID, [InternalMap], InternalHashMap_init_$Create$);
  setMetadataFor(EmptyHolder, 'EmptyHolder', objectMeta);
  setMetadataFor(LinkedHashMap, 'LinkedHashMap', classMeta, HashMap, [HashMap, MutableMap], LinkedHashMap_init_$Create$);
  setMetadataFor(BaseOutput, 'BaseOutput', classMeta);
  setMetadataFor(NodeJsOutput, 'NodeJsOutput', classMeta, BaseOutput);
  setMetadataFor(BufferedOutput, 'BufferedOutput', classMeta, BaseOutput, VOID, BufferedOutput);
  setMetadataFor(BufferedOutputToConsoleLog, 'BufferedOutputToConsoleLog', classMeta, BufferedOutput, VOID, BufferedOutputToConsoleLog);
  setMetadataFor(Continuation, 'Continuation', interfaceMeta);
  setMetadataFor(_no_name_provided__qut3iv, VOID, classMeta, VOID, [Continuation]);
  setMetadataFor(EnumEntriesSerializationProxy, 'EnumEntriesSerializationProxy', classMeta);
  setMetadataFor(JsPolyfill, 'JsPolyfill', classMeta, VOID, [Annotation]);
  setMetadataFor(Serializable, 'Serializable', interfaceMeta);
  setMetadataFor(KCallable, 'KCallable', interfaceMeta);
  setMetadataFor(KClassifier, 'KClassifier', interfaceMeta);
  setMetadataFor(KClass, 'KClass', interfaceMeta, VOID, [KClassifier]);
  setMetadataFor(KClassImpl, 'KClassImpl', classMeta, VOID, [KClass]);
  setMetadataFor(NothingKClassImpl, 'NothingKClassImpl', objectMeta, KClassImpl);
  setMetadataFor(ErrorKClass, 'ErrorKClass', classMeta, VOID, [KClass], ErrorKClass);
  setMetadataFor(PrimitiveKClassImpl, 'PrimitiveKClassImpl', classMeta, KClassImpl);
  setMetadataFor(SimpleKClassImpl, 'SimpleKClassImpl', classMeta, KClassImpl);
  setMetadataFor(KFunction, 'KFunction', interfaceMeta, VOID, [KCallable]);
  setMetadataFor(KProperty, 'KProperty', interfaceMeta, VOID, [KCallable]);
  setMetadataFor(Function0, 'Function0', interfaceMeta);
  setMetadataFor(KProperty0, 'KProperty0', interfaceMeta, VOID, [KProperty]);
  setMetadataFor(Function1, 'Function1', interfaceMeta);
  setMetadataFor(KProperty1, 'KProperty1', interfaceMeta, VOID, [KProperty]);
  setMetadataFor(Function2, 'Function2', interfaceMeta);
  setMetadataFor(KProperty2, 'KProperty2', interfaceMeta, VOID, [KProperty]);
  setMetadataFor(KMutableProperty, 'KMutableProperty', interfaceMeta, VOID, [KProperty]);
  setMetadataFor(KMutableProperty0, 'KMutableProperty0', interfaceMeta, VOID, [KProperty0, KMutableProperty]);
  setMetadataFor(KMutableProperty1, 'KMutableProperty1', interfaceMeta, VOID, [KProperty1, KMutableProperty]);
  setMetadataFor(KMutableProperty2, 'KMutableProperty2', interfaceMeta, VOID, [KProperty2, KMutableProperty]);
  setMetadataFor(KType, 'KType', interfaceMeta);
  setMetadataFor(KTypeImpl, 'KTypeImpl', classMeta, VOID, [KType]);
  setMetadataFor(DynamicKType, 'DynamicKType', objectMeta, VOID, [KType]);
  setMetadataFor(KTypeParameter, 'KTypeParameter', interfaceMeta, VOID, [KClassifier]);
  setMetadataFor(KTypeParameterImpl, 'KTypeParameterImpl', classMeta, VOID, [KTypeParameter]);
  setMetadataFor(PrimitiveClasses, 'PrimitiveClasses', objectMeta);
  setMetadataFor(Appendable, 'Appendable', interfaceMeta);
  setMetadataFor(StringBuilder, 'StringBuilder', classMeta, VOID, [Appendable, CharSequence], StringBuilder_init_$Create$_1);
  setMetadataFor(sam$kotlin_Comparator$0, 'sam$kotlin_Comparator$0', classMeta, VOID, [Comparator]);
  setMetadataFor(sam$kotlin_Comparator$0_0, 'sam$kotlin_Comparator$0', classMeta, VOID, [Comparator]);
  setMetadataFor(sam$kotlin_Comparator$0_1, 'sam$kotlin_Comparator$0', classMeta, VOID, [Comparator]);
  setMetadataFor(Exception, 'Exception', classMeta, Error, VOID, Exception_init_$Create$);
  setMetadataFor(RuntimeException, 'RuntimeException', classMeta, Exception, VOID, RuntimeException_init_$Create$);
  setMetadataFor(KotlinNothingValueException, 'KotlinNothingValueException', classMeta, RuntimeException, VOID, KotlinNothingValueException_init_$Create$);
  setMetadataFor(ExperimentalJsFileName, 'ExperimentalJsFileName', classMeta, VOID, [Annotation]);
  setMetadataFor(ExperimentalJsExport, 'ExperimentalJsExport', classMeta, VOID, [Annotation]);
  setMetadataFor(Companion_1, 'Companion', objectMeta);
  setMetadataFor(Char, 'Char', classMeta, VOID, [Comparable]);
  setMetadataFor(Companion_2, 'Companion', objectMeta);
  setMetadataFor(DefaultConstructorMarker, 'DefaultConstructorMarker', objectMeta);
  setMetadataFor(arrayIterator$1, VOID, classMeta, VOID, [Iterator]);
  setMetadataFor(BooleanIterator, 'BooleanIterator', classMeta, VOID, [Iterator]);
  setMetadataFor(booleanArrayIterator$1, VOID, classMeta, BooleanIterator);
  setMetadataFor(CharIterator, 'CharIterator', classMeta, VOID, [Iterator]);
  setMetadataFor(charArrayIterator$1, VOID, classMeta, CharIterator);
  setMetadataFor(ByteIterator, 'ByteIterator', classMeta, VOID, [Iterator]);
  setMetadataFor(byteArrayIterator$1, VOID, classMeta, ByteIterator);
  setMetadataFor(ShortIterator, 'ShortIterator', classMeta, VOID, [Iterator]);
  setMetadataFor(shortArrayIterator$1, VOID, classMeta, ShortIterator);
  setMetadataFor(IntIterator, 'IntIterator', classMeta, VOID, [Iterator]);
  setMetadataFor(intArrayIterator$1, VOID, classMeta, IntIterator);
  setMetadataFor(FloatIterator, 'FloatIterator', classMeta, VOID, [Iterator]);
  setMetadataFor(floatArrayIterator$1, VOID, classMeta, FloatIterator);
  setMetadataFor(LongIterator, 'LongIterator', classMeta, VOID, [Iterator]);
  setMetadataFor(longArrayIterator$1, VOID, classMeta, LongIterator);
  setMetadataFor(DoubleIterator, 'DoubleIterator', classMeta, VOID, [Iterator]);
  setMetadataFor(doubleArrayIterator$1, VOID, classMeta, DoubleIterator);
  setMetadataFor(DoNotIntrinsify, 'DoNotIntrinsify', classMeta, VOID, [Annotation]);
  setMetadataFor(JsIntrinsic, 'JsIntrinsic', classMeta, VOID, [Annotation]);
  setMetadataFor(JsFun, 'JsFun', classMeta, VOID, [Annotation]);
  setMetadataFor(JsImplicitExport, 'JsImplicitExport', classMeta, VOID, [Annotation]);
  setMetadataFor(Companion_3, 'Companion', objectMeta);
  setMetadataFor(Long, 'Long', classMeta, Number_0, [Number_0, Comparable]);
  setMetadataFor(Error_0, 'Error', classMeta, Error, VOID, Error_init_$Create$);
  setMetadataFor(IrLinkageError, 'IrLinkageError', classMeta, Error_0);
  setMetadataFor(SuspendFunction0, 'SuspendFunction0', interfaceMeta, VOID, VOID, VOID, VOID, VOID, [0]);
  setMetadataFor(SuspendFunction1, 'SuspendFunction1', interfaceMeta, VOID, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(SuspendFunction2, 'SuspendFunction2', interfaceMeta, VOID, VOID, VOID, VOID, VOID, [2]);
  setMetadataFor(Function3, 'Function3', interfaceMeta);
  setMetadataFor(Function5, 'Function5', interfaceMeta);
  setMetadataFor(KFunction2, 'KFunction2', interfaceMeta);
  setMetadataFor(KFunction1, 'KFunction1', interfaceMeta);
  setMetadataFor(CoroutineImpl, 'CoroutineImpl', classMeta, VOID, [Continuation]);
  setMetadataFor(CompletedContinuation, 'CompletedContinuation', objectMeta, VOID, [Continuation]);
  setMetadataFor(IllegalArgumentException, 'IllegalArgumentException', classMeta, RuntimeException, VOID, IllegalArgumentException_init_$Create$);
  setMetadataFor(IndexOutOfBoundsException, 'IndexOutOfBoundsException', classMeta, RuntimeException, VOID, IndexOutOfBoundsException_init_$Create$);
  setMetadataFor(IllegalStateException, 'IllegalStateException', classMeta, RuntimeException, VOID, IllegalStateException_init_$Create$);
  setMetadataFor(UnsupportedOperationException, 'UnsupportedOperationException', classMeta, RuntimeException, VOID, UnsupportedOperationException_init_$Create$);
  setMetadataFor(NoSuchElementException, 'NoSuchElementException', classMeta, RuntimeException, VOID, NoSuchElementException_init_$Create$);
  setMetadataFor(ArithmeticException, 'ArithmeticException', classMeta, RuntimeException, VOID, ArithmeticException_init_$Create$);
  setMetadataFor(ConcurrentModificationException, 'ConcurrentModificationException', classMeta, RuntimeException, VOID, ConcurrentModificationException_init_$Create$);
  setMetadataFor(NullPointerException, 'NullPointerException', classMeta, RuntimeException, VOID, NullPointerException_init_$Create$);
  setMetadataFor(NoWhenBranchMatchedException, 'NoWhenBranchMatchedException', classMeta, RuntimeException, VOID, NoWhenBranchMatchedException_init_$Create$);
  setMetadataFor(ClassCastException, 'ClassCastException', classMeta, RuntimeException, VOID, ClassCastException_init_$Create$);
  setMetadataFor(UninitializedPropertyAccessException, 'UninitializedPropertyAccessException', classMeta, RuntimeException, VOID, UninitializedPropertyAccessException_init_$Create$);
  setMetadataFor(ExperimentalStdlibApi, 'ExperimentalStdlibApi', classMeta, VOID, [Annotation]);
  setMetadataFor(OverloadResolutionByLambdaReturnType, 'OverloadResolutionByLambdaReturnType', classMeta, VOID, [Annotation]);
  setMetadataFor(OptionalExpectation, 'OptionalExpectation', classMeta, VOID, [Annotation]);
  setMetadataFor(ExperimentalMultiplatform, 'ExperimentalMultiplatform', classMeta, VOID, [Annotation]);
  setMetadataFor(OptIn, 'OptIn', classMeta, VOID, [Annotation]);
  setMetadataFor(Level, 'Level', classMeta, Enum);
  setMetadataFor(RequiresOptIn, 'RequiresOptIn', classMeta, VOID, [Annotation]);
  setMetadataFor(WasExperimental, 'WasExperimental', classMeta, VOID, [Annotation]);
  setMetadataFor(AbstractList, 'AbstractList', classMeta, AbstractCollection, [AbstractCollection, List]);
  setMetadataFor(SubList_0, 'SubList', classMeta, AbstractList, [AbstractList, RandomAccess]);
  setMetadataFor(IteratorImpl_0, 'IteratorImpl', classMeta, VOID, [Iterator]);
  setMetadataFor(ListIteratorImpl_0, 'ListIteratorImpl', classMeta, IteratorImpl_0, [IteratorImpl_0, ListIterator]);
  setMetadataFor(Companion_4, 'Companion', objectMeta);
  setMetadataFor(AbstractMap$keys$1$iterator$1, VOID, classMeta, VOID, [Iterator]);
  setMetadataFor(AbstractMap$values$1$iterator$1, VOID, classMeta, VOID, [Iterator]);
  setMetadataFor(Companion_5, 'Companion', objectMeta);
  setMetadataFor(AbstractSet, 'AbstractSet', classMeta, AbstractCollection, [AbstractCollection, Set]);
  setMetadataFor(AbstractMap$keys$1, VOID, classMeta, AbstractSet);
  setMetadataFor(AbstractMap$values$1, VOID, classMeta, AbstractCollection);
  setMetadataFor(Companion_6, 'Companion', objectMeta);
  setMetadataFor(ArrayAsCollection, 'ArrayAsCollection', classMeta, VOID, [Collection]);
  setMetadataFor(EmptyList, 'EmptyList', objectMeta, VOID, [List, Serializable, RandomAccess]);
  setMetadataFor(EmptyIterator, 'EmptyIterator', objectMeta, VOID, [ListIterator]);
  setMetadataFor(IndexedValue, 'IndexedValue', classMeta);
  setMetadataFor(IndexingIterable, 'IndexingIterable', classMeta, VOID, [Iterable]);
  setMetadataFor(IndexingIterator, 'IndexingIterator', classMeta, VOID, [Iterator]);
  setMetadataFor(Sequence, 'Sequence', interfaceMeta);
  setMetadataFor(sam$kotlin_Comparator$0_2, 'sam$kotlin_Comparator$0', classMeta, VOID, [Comparator]);
  function callsInPlace$default(lambda, kind, $super) {
    kind = kind === VOID ? InvocationKind_UNKNOWN_getInstance() : kind;
    return $super === VOID ? this.callsInPlace_bst7z0_k$(lambda, kind) : $super.callsInPlace_bst7z0_k$.call(this, lambda, kind);
  }
  setMetadataFor(ContractBuilder, 'ContractBuilder', interfaceMeta);
  setMetadataFor(InvocationKind, 'InvocationKind', classMeta, Enum);
  setMetadataFor(ExperimentalContracts, 'ExperimentalContracts', classMeta, VOID, [Annotation]);
  setMetadataFor(Effect, 'Effect', interfaceMeta);
  setMetadataFor(ConditionalEffect, 'ConditionalEffect', interfaceMeta, VOID, [Effect]);
  setMetadataFor(SimpleEffect, 'SimpleEffect', interfaceMeta, VOID, [Effect]);
  setMetadataFor(Returns, 'Returns', interfaceMeta, VOID, [SimpleEffect]);
  setMetadataFor(CallsInPlace, 'CallsInPlace', interfaceMeta, VOID, [Effect]);
  setMetadataFor(ReturnsNotNull, 'ReturnsNotNull', interfaceMeta, VOID, [SimpleEffect]);
  setMetadataFor(_no_name_provided__qut3iv_0, VOID, classMeta, VOID, [Continuation]);
  setMetadataFor(Key_0, 'Key', interfaceMeta);
  setMetadataFor(Key, 'Key', objectMeta, VOID, [Key_0]);
  function plus(context) {
    var tmp;
    if (context === EmptyCoroutineContext_getInstance()) {
      tmp = this;
    } else {
      tmp = context.fold_j2vaxd_k$(this, CoroutineContext$plus$lambda);
    }
    return tmp;
  }
  setMetadataFor(CoroutineContext, 'CoroutineContext', interfaceMeta);
  function get(key) {
    var tmp;
    if (equals(this.get_key_18j28a_k$(), key)) {
      tmp = isInterface(this, Element) ? this : THROW_CCE();
    } else {
      tmp = null;
    }
    return tmp;
  }
  function fold(initial, operation) {
    return operation(initial, this);
  }
  function minusKey(key) {
    return equals(this.get_key_18j28a_k$(), key) ? EmptyCoroutineContext_getInstance() : this;
  }
  setMetadataFor(Element, 'Element', interfaceMeta, VOID, [CoroutineContext]);
  function releaseInterceptedContinuation(continuation) {
  }
  function get_0(key) {
    if (key instanceof AbstractCoroutineContextKey) {
      var tmp;
      if (key.isSubKey_4za1qh_k$(this.get_key_18j28a_k$())) {
        var tmp_0 = key.tryCast_mbga6n_k$(this);
        tmp = (!(tmp_0 == null) ? isInterface(tmp_0, Element) : false) ? tmp_0 : null;
      } else {
        tmp = null;
      }
      return tmp;
    }
    var tmp_1;
    if (Key_getInstance() === key) {
      tmp_1 = isInterface(this, Element) ? this : THROW_CCE();
    } else {
      tmp_1 = null;
    }
    return tmp_1;
  }
  function minusKey_0(key) {
    if (key instanceof AbstractCoroutineContextKey) {
      return (key.isSubKey_4za1qh_k$(this.get_key_18j28a_k$()) ? !(key.tryCast_mbga6n_k$(this) == null) : false) ? EmptyCoroutineContext_getInstance() : this;
    }
    return Key_getInstance() === key ? EmptyCoroutineContext_getInstance() : this;
  }
  setMetadataFor(ContinuationInterceptor, 'ContinuationInterceptor', interfaceMeta, VOID, [Element]);
  setMetadataFor(EmptyCoroutineContext, 'EmptyCoroutineContext', objectMeta, VOID, [CoroutineContext, Serializable]);
  setMetadataFor(Companion_7, 'Companion', objectMeta);
  setMetadataFor(Serialized, 'Serialized', classMeta, VOID, [Serializable]);
  setMetadataFor(CombinedContext, 'CombinedContext', classMeta, VOID, [CoroutineContext, Serializable]);
  setMetadataFor(AbstractCoroutineContextKey, 'AbstractCoroutineContextKey', classMeta, VOID, [Key_0]);
  setMetadataFor(CoroutineSingletons, 'CoroutineSingletons', classMeta, Enum);
  setMetadataFor(EnumEntries, 'EnumEntries', interfaceMeta, VOID, [List]);
  setMetadataFor(EnumEntriesList, 'EnumEntriesList', classMeta, AbstractList, [EnumEntries, AbstractList, Serializable]);
  setMetadataFor(ExperimentalTypeInference, 'ExperimentalTypeInference', classMeta, VOID, [Annotation]);
  setMetadataFor(InlineOnly, 'InlineOnly', classMeta, VOID, [Annotation]);
  setMetadataFor(LowPriorityInOverloadResolution, 'LowPriorityInOverloadResolution', classMeta, VOID, [Annotation]);
  setMetadataFor(NoInfer, 'NoInfer', classMeta, VOID, [Annotation]);
  setMetadataFor(DynamicExtension, 'DynamicExtension', classMeta, VOID, [Annotation]);
  setMetadataFor(ContractsDsl, 'ContractsDsl', classMeta, VOID, [Annotation]);
  setMetadataFor(OnlyInputTypes, 'OnlyInputTypes', classMeta, VOID, [Annotation]);
  setMetadataFor(RequireKotlin, 'RequireKotlin', classMeta, VOID, [Annotation]);
  setMetadataFor(RequireKotlinVersionKind, 'RequireKotlinVersionKind', classMeta, Enum);
  setMetadataFor(HidesMembers, 'HidesMembers', classMeta, VOID, [Annotation]);
  setMetadataFor(Base64, 'Base64', classMeta);
  setMetadataFor(Default, 'Default', objectMeta, Base64);
  setMetadataFor(ExperimentalEncodingApi, 'ExperimentalEncodingApi', classMeta, VOID, [Annotation]);
  setMetadataFor(Companion_8, 'Companion', objectMeta);
  setMetadataFor(IntProgression, 'IntProgression', classMeta, VOID, [Iterable]);
  function contains(value) {
    return compareTo_0(value, this.get_start_iypx6h_k$()) >= 0 ? compareTo_0(value, this.get_endInclusive_r07xpi_k$()) <= 0 : false;
  }
  function isEmpty() {
    return compareTo_0(this.get_start_iypx6h_k$(), this.get_endInclusive_r07xpi_k$()) > 0;
  }
  setMetadataFor(ClosedRange, 'ClosedRange', interfaceMeta);
  function contains_0(value) {
    return compareTo_0(value, this.get_start_iypx6h_k$()) >= 0 ? compareTo_0(value, this.get_endExclusive_pmwm6k_k$()) < 0 : false;
  }
  function isEmpty_0() {
    return compareTo_0(this.get_start_iypx6h_k$(), this.get_endExclusive_pmwm6k_k$()) >= 0;
  }
  setMetadataFor(OpenEndRange, 'OpenEndRange', interfaceMeta);
  setMetadataFor(IntRange, 'IntRange', classMeta, IntProgression, [IntProgression, ClosedRange, OpenEndRange]);
  setMetadataFor(Companion_9, 'Companion', objectMeta);
  setMetadataFor(CharProgression, 'CharProgression', classMeta, VOID, [Iterable]);
  setMetadataFor(CharRange, 'CharRange', classMeta, CharProgression, [CharProgression, ClosedRange, OpenEndRange]);
  setMetadataFor(Companion_10, 'Companion', objectMeta);
  setMetadataFor(LongProgression, 'LongProgression', classMeta, VOID, [Iterable]);
  setMetadataFor(LongRange, 'LongRange', classMeta, LongProgression, [LongProgression, ClosedRange, OpenEndRange]);
  setMetadataFor(IntProgressionIterator, 'IntProgressionIterator', classMeta, IntIterator);
  setMetadataFor(CharProgressionIterator, 'CharProgressionIterator', classMeta, CharIterator);
  setMetadataFor(LongProgressionIterator, 'LongProgressionIterator', classMeta, LongIterator);
  setMetadataFor(Companion_11, 'Companion', objectMeta);
  setMetadataFor(Companion_12, 'Companion', objectMeta);
  setMetadataFor(Companion_13, 'Companion', objectMeta);
  setMetadataFor(Companion_14, 'Companion', objectMeta);
  setMetadataFor(KTypeProjection, 'KTypeProjection', classMeta);
  setMetadataFor(KVariance, 'KVariance', classMeta, Enum);
  setMetadataFor(iterator$1, VOID, classMeta, CharIterator);
  setMetadataFor(Companion_15, 'Companion', objectMeta);
  setMetadataFor(Failure, 'Failure', classMeta, VOID, [Serializable]);
  setMetadataFor(Result, 'Result', classMeta, VOID, [Serializable]);
  setMetadataFor(NotImplementedError, 'NotImplementedError', classMeta, Error_0, VOID, NotImplementedError);
  setMetadataFor(Pair, 'Pair', classMeta, VOID, [Serializable]);
  setMetadataFor(Triple, 'Triple', classMeta, VOID, [Serializable]);
  setMetadataFor(Companion_16, 'Companion', objectMeta);
  setMetadataFor(UByte, 'UByte', classMeta, VOID, [Comparable]);
  setMetadataFor(Iterator_0, 'Iterator', classMeta, VOID, [Iterator]);
  setMetadataFor(UByteArray, 'UByteArray', classMeta, VOID, [Collection]);
  setMetadataFor(Companion_17, 'Companion', objectMeta);
  setMetadataFor(UInt, 'UInt', classMeta, VOID, [Comparable]);
  setMetadataFor(Iterator_1, 'Iterator', classMeta, VOID, [Iterator]);
  setMetadataFor(UIntArray, 'UIntArray', classMeta, VOID, [Collection]);
  setMetadataFor(Companion_18, 'Companion', objectMeta);
  setMetadataFor(UIntProgression, 'UIntProgression', classMeta, VOID, [Iterable]);
  setMetadataFor(UIntRange, 'UIntRange', classMeta, UIntProgression, [UIntProgression, ClosedRange, OpenEndRange]);
  setMetadataFor(Companion_19, 'Companion', objectMeta);
  setMetadataFor(UIntProgressionIterator, 'UIntProgressionIterator', classMeta, VOID, [Iterator]);
  setMetadataFor(Companion_20, 'Companion', objectMeta);
  setMetadataFor(ULong, 'ULong', classMeta, VOID, [Comparable]);
  setMetadataFor(Iterator_2, 'Iterator', classMeta, VOID, [Iterator]);
  setMetadataFor(ULongArray, 'ULongArray', classMeta, VOID, [Collection]);
  setMetadataFor(Companion_21, 'Companion', objectMeta);
  setMetadataFor(ULongProgression, 'ULongProgression', classMeta, VOID, [Iterable]);
  setMetadataFor(ULongRange, 'ULongRange', classMeta, ULongProgression, [ULongProgression, ClosedRange, OpenEndRange]);
  setMetadataFor(Companion_22, 'Companion', objectMeta);
  setMetadataFor(ULongProgressionIterator, 'ULongProgressionIterator', classMeta, VOID, [Iterator]);
  setMetadataFor(Companion_23, 'Companion', objectMeta);
  setMetadataFor(UShort, 'UShort', classMeta, VOID, [Comparable]);
  setMetadataFor(Iterator_3, 'Iterator', classMeta, VOID, [Iterator]);
  setMetadataFor(UShortArray, 'UShortArray', classMeta, VOID, [Collection]);
  setMetadataFor(ExperimentalUnsignedTypes, 'ExperimentalUnsignedTypes', classMeta, VOID, [Annotation]);
  setMetadataFor(Imagem, 'Imagem', classMeta);
  setMetadataFor(Lado, 'Lado', interfaceMeta);
  setMetadataFor(sam$pt_decisaoessencial_digitalizador_CorrecaoPaginas_Lado$0, 'sam$pt_decisaoessencial_digitalizador_CorrecaoPaginas_Lado$0', classMeta, VOID, [Lado]);
  setMetadataFor(Companion_24, 'Companion', objectMeta);
  setMetadataFor(BlocoPlano, 'BlocoPlano', classMeta);
  setMetadataFor(Contorno, 'Contorno', classMeta);
  setMetadataFor(Analise, 'Analise', classMeta);
  setMetadataFor(Modelo, 'Modelo', classMeta);
  setMetadataFor(Bloco, 'Bloco', classMeta);
  setMetadataFor(Transf, 'Transf', classMeta);
  setMetadataFor(Pag, 'Pag', classMeta);
  setMetadataFor(Medidas, 'Medidas', classMeta);
  setMetadataFor(Cache, 'Cache', classMeta);
  setMetadataFor(Id, 'Id', classMeta);
  setMetadataFor(Comp, 'Comp', classMeta);
  setMetadataFor(Poli, 'Poli', classMeta);
  setMetadataFor(Pagina, 'Pagina', classMeta);
  setMetadataFor(Geometria, 'Geometria', classMeta);
  setMetadataFor(Elemento, 'Elemento', classMeta);
  setMetadataFor(Campo, 'Campo', classMeta);
  setMetadataFor(Lombada, 'Lombada', classMeta);
  setMetadataFor(sam$kotlin_Comparator$0_3, 'sam$kotlin_Comparator$0', classMeta, VOID, [Comparator]);
  setMetadataFor(sam$kotlin_Comparator$0_4, 'sam$kotlin_Comparator$0', classMeta, VOID, [Comparator]);
  setMetadataFor(CorrecaoPaginas, 'CorrecaoPaginas', objectMeta);
  setMetadataFor(ImagemJs, 'ImagemJs', classMeta);
  //endregion
  function IntrinsicConstEvaluation() {
  }
  protoOf(IntrinsicConstEvaluation).equals = function (other) {
    if (!(other instanceof IntrinsicConstEvaluation))
      return false;
    other instanceof IntrinsicConstEvaluation || THROW_CCE();
    return true;
  };
  protoOf(IntrinsicConstEvaluation).hashCode = function () {
    return 0;
  };
  protoOf(IntrinsicConstEvaluation).toString = function () {
    return '@kotlin.internal.IntrinsicConstEvaluation()';
  };
  function Annotation() {
  }
  function CharSequence() {
  }
  function Comparable() {
  }
  function Iterator() {
  }
  function ListIterator() {
  }
  function MutableIterator() {
  }
  function MutableListIterator() {
  }
  function Number_0() {
  }
  protoOf(Number_0).toChar_tavt71_k$ = function () {
    return numberToChar(numberToInt(this));
  };
  function Suppress(names) {
    this.names_1 = names;
  }
  protoOf(Suppress).get_names_ivn21r_k$ = function () {
    return this.names_1;
  };
  protoOf(Suppress).equals = function (other) {
    if (!(other instanceof Suppress))
      return false;
    var tmp0_other_with_cast = other instanceof Suppress ? other : THROW_CCE();
    if (!contentEquals_8(this.names_1, tmp0_other_with_cast.names_1))
      return false;
    return true;
  };
  protoOf(Suppress).hashCode = function () {
    return imul(getStringHashCode('names'), 127) ^ hashCode(this.names_1);
  };
  protoOf(Suppress).toString = function () {
    return '@kotlin.Suppress(names=' + toString_2(this.names_1) + ')';
  };
  function SinceKotlin(version) {
    this.version_1 = version;
  }
  protoOf(SinceKotlin).get_version_72w4j3_k$ = function () {
    return this.version_1;
  };
  protoOf(SinceKotlin).equals = function (other) {
    if (!(other instanceof SinceKotlin))
      return false;
    var tmp0_other_with_cast = other instanceof SinceKotlin ? other : THROW_CCE();
    if (!(this.version_1 === tmp0_other_with_cast.version_1))
      return false;
    return true;
  };
  protoOf(SinceKotlin).hashCode = function () {
    return imul(getStringHashCode('version'), 127) ^ getStringHashCode(this.version_1);
  };
  protoOf(SinceKotlin).toString = function () {
    return '@kotlin.SinceKotlin(version=' + this.version_1 + ')';
  };
  function PublishedApi() {
  }
  protoOf(PublishedApi).equals = function (other) {
    if (!(other instanceof PublishedApi))
      return false;
    other instanceof PublishedApi || THROW_CCE();
    return true;
  };
  protoOf(PublishedApi).hashCode = function () {
    return 0;
  };
  protoOf(PublishedApi).toString = function () {
    return '@kotlin.PublishedApi()';
  };
  function ParameterName(name) {
    this.name_1 = name;
  }
  protoOf(ParameterName).get_name_woqyms_k$ = function () {
    return this.name_1;
  };
  protoOf(ParameterName).equals = function (other) {
    if (!(other instanceof ParameterName))
      return false;
    var tmp0_other_with_cast = other instanceof ParameterName ? other : THROW_CCE();
    if (!(this.name_1 === tmp0_other_with_cast.name_1))
      return false;
    return true;
  };
  protoOf(ParameterName).hashCode = function () {
    return imul(getStringHashCode('name'), 127) ^ getStringHashCode(this.name_1);
  };
  protoOf(ParameterName).toString = function () {
    return '@kotlin.ParameterName(name=' + this.name_1 + ')';
  };
  function Deprecated(message, replaceWith, level) {
    replaceWith = replaceWith === VOID ? new ReplaceWith('', []) : replaceWith;
    level = level === VOID ? DeprecationLevel_WARNING_getInstance() : level;
    this.message_1 = message;
    this.replaceWith_1 = replaceWith;
    this.level_1 = level;
  }
  protoOf(Deprecated).get_message_h23axq_k$ = function () {
    return this.message_1;
  };
  protoOf(Deprecated).get_replaceWith_l0ddm9_k$ = function () {
    return this.replaceWith_1;
  };
  protoOf(Deprecated).get_level_ium7h7_k$ = function () {
    return this.level_1;
  };
  protoOf(Deprecated).equals = function (other) {
    if (!(other instanceof Deprecated))
      return false;
    var tmp0_other_with_cast = other instanceof Deprecated ? other : THROW_CCE();
    if (!(this.message_1 === tmp0_other_with_cast.message_1))
      return false;
    if (!this.replaceWith_1.equals(tmp0_other_with_cast.replaceWith_1))
      return false;
    if (!this.level_1.equals(tmp0_other_with_cast.level_1))
      return false;
    return true;
  };
  protoOf(Deprecated).hashCode = function () {
    var result = imul(getStringHashCode('message'), 127) ^ getStringHashCode(this.message_1);
    result = result + (imul(getStringHashCode('replaceWith'), 127) ^ hashCode(this.replaceWith_1)) | 0;
    result = result + (imul(getStringHashCode('level'), 127) ^ this.level_1.hashCode()) | 0;
    return result;
  };
  protoOf(Deprecated).toString = function () {
    return '@kotlin.Deprecated(message=' + this.message_1 + ', replaceWith=' + this.replaceWith_1 + ', level=' + this.level_1 + ')';
  };
  function ReplaceWith(expression, imports) {
    this.expression_1 = expression;
    this.imports_1 = imports;
  }
  protoOf(ReplaceWith).get_expression_l5w7j5_k$ = function () {
    return this.expression_1;
  };
  protoOf(ReplaceWith).get_imports_x49mdh_k$ = function () {
    return this.imports_1;
  };
  protoOf(ReplaceWith).equals = function (other) {
    if (!(other instanceof ReplaceWith))
      return false;
    var tmp0_other_with_cast = other instanceof ReplaceWith ? other : THROW_CCE();
    if (!(this.expression_1 === tmp0_other_with_cast.expression_1))
      return false;
    if (!contentEquals_8(this.imports_1, tmp0_other_with_cast.imports_1))
      return false;
    return true;
  };
  protoOf(ReplaceWith).hashCode = function () {
    var result = imul(getStringHashCode('expression'), 127) ^ getStringHashCode(this.expression_1);
    result = result + (imul(getStringHashCode('imports'), 127) ^ hashCode(this.imports_1)) | 0;
    return result;
  };
  protoOf(ReplaceWith).toString = function () {
    return '@kotlin.ReplaceWith(expression=' + this.expression_1 + ', imports=' + toString_2(this.imports_1) + ')';
  };
  function DeprecatedSinceKotlin(warningSince, errorSince, hiddenSince) {
    warningSince = warningSince === VOID ? '' : warningSince;
    errorSince = errorSince === VOID ? '' : errorSince;
    hiddenSince = hiddenSince === VOID ? '' : hiddenSince;
    this.warningSince_1 = warningSince;
    this.errorSince_1 = errorSince;
    this.hiddenSince_1 = hiddenSince;
  }
  protoOf(DeprecatedSinceKotlin).get_warningSince_szk795_k$ = function () {
    return this.warningSince_1;
  };
  protoOf(DeprecatedSinceKotlin).get_errorSince_6p3nh7_k$ = function () {
    return this.errorSince_1;
  };
  protoOf(DeprecatedSinceKotlin).get_hiddenSince_8z3cp_k$ = function () {
    return this.hiddenSince_1;
  };
  protoOf(DeprecatedSinceKotlin).equals = function (other) {
    if (!(other instanceof DeprecatedSinceKotlin))
      return false;
    var tmp0_other_with_cast = other instanceof DeprecatedSinceKotlin ? other : THROW_CCE();
    if (!(this.warningSince_1 === tmp0_other_with_cast.warningSince_1))
      return false;
    if (!(this.errorSince_1 === tmp0_other_with_cast.errorSince_1))
      return false;
    if (!(this.hiddenSince_1 === tmp0_other_with_cast.hiddenSince_1))
      return false;
    return true;
  };
  protoOf(DeprecatedSinceKotlin).hashCode = function () {
    var result = imul(getStringHashCode('warningSince'), 127) ^ getStringHashCode(this.warningSince_1);
    result = result + (imul(getStringHashCode('errorSince'), 127) ^ getStringHashCode(this.errorSince_1)) | 0;
    result = result + (imul(getStringHashCode('hiddenSince'), 127) ^ getStringHashCode(this.hiddenSince_1)) | 0;
    return result;
  };
  protoOf(DeprecatedSinceKotlin).toString = function () {
    return '@kotlin.DeprecatedSinceKotlin(warningSince=' + this.warningSince_1 + ', errorSince=' + this.errorSince_1 + ', hiddenSince=' + this.hiddenSince_1 + ')';
  };
  function ExtensionFunctionType() {
  }
  protoOf(ExtensionFunctionType).equals = function (other) {
    if (!(other instanceof ExtensionFunctionType))
      return false;
    other instanceof ExtensionFunctionType || THROW_CCE();
    return true;
  };
  protoOf(ExtensionFunctionType).hashCode = function () {
    return 0;
  };
  protoOf(ExtensionFunctionType).toString = function () {
    return '@kotlin.ExtensionFunctionType()';
  };
  var DeprecationLevel_WARNING_instance;
  var DeprecationLevel_ERROR_instance;
  var DeprecationLevel_HIDDEN_instance;
  function values() {
    return [DeprecationLevel_WARNING_getInstance(), DeprecationLevel_ERROR_getInstance(), DeprecationLevel_HIDDEN_getInstance()];
  }
  function valueOf(value) {
    switch (value) {
      case 'WARNING':
        return DeprecationLevel_WARNING_getInstance();
      case 'ERROR':
        return DeprecationLevel_ERROR_getInstance();
      case 'HIDDEN':
        return DeprecationLevel_HIDDEN_getInstance();
      default:
        DeprecationLevel_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries() {
    if ($ENTRIES == null)
      $ENTRIES = enumEntries(values());
    return $ENTRIES;
  }
  var DeprecationLevel_entriesInitialized;
  function DeprecationLevel_initEntries() {
    if (DeprecationLevel_entriesInitialized)
      return Unit_getInstance();
    DeprecationLevel_entriesInitialized = true;
    DeprecationLevel_WARNING_instance = new DeprecationLevel('WARNING', 0);
    DeprecationLevel_ERROR_instance = new DeprecationLevel('ERROR', 1);
    DeprecationLevel_HIDDEN_instance = new DeprecationLevel('HIDDEN', 2);
  }
  var $ENTRIES;
  function DeprecationLevel(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function UnsafeVariance() {
  }
  protoOf(UnsafeVariance).equals = function (other) {
    if (!(other instanceof UnsafeVariance))
      return false;
    other instanceof UnsafeVariance || THROW_CCE();
    return true;
  };
  protoOf(UnsafeVariance).hashCode = function () {
    return 0;
  };
  protoOf(UnsafeVariance).toString = function () {
    return '@kotlin.UnsafeVariance()';
  };
  function DeprecationLevel_WARNING_getInstance() {
    DeprecationLevel_initEntries();
    return DeprecationLevel_WARNING_instance;
  }
  function DeprecationLevel_ERROR_getInstance() {
    DeprecationLevel_initEntries();
    return DeprecationLevel_ERROR_instance;
  }
  function DeprecationLevel_HIDDEN_getInstance() {
    DeprecationLevel_initEntries();
    return DeprecationLevel_HIDDEN_instance;
  }
  function Unit() {
    Unit_instance = this;
  }
  protoOf(Unit).toString = function () {
    return 'kotlin.Unit';
  };
  var Unit_instance;
  function Unit_getInstance() {
    if (Unit_instance == null)
      new Unit();
    return Unit_instance;
  }
  function Target(allowedTargets) {
    this.allowedTargets_1 = allowedTargets;
  }
  protoOf(Target).get_allowedTargets_9sf77n_k$ = function () {
    return this.allowedTargets_1;
  };
  protoOf(Target).equals = function (other) {
    if (!(other instanceof Target))
      return false;
    var tmp0_other_with_cast = other instanceof Target ? other : THROW_CCE();
    if (!contentEquals_8(this.allowedTargets_1, tmp0_other_with_cast.allowedTargets_1))
      return false;
    return true;
  };
  protoOf(Target).hashCode = function () {
    return imul(getStringHashCode('allowedTargets'), 127) ^ hashCode(this.allowedTargets_1);
  };
  protoOf(Target).toString = function () {
    return '@kotlin.annotation.Target(allowedTargets=' + toString_2(this.allowedTargets_1) + ')';
  };
  var AnnotationTarget_CLASS_instance;
  var AnnotationTarget_ANNOTATION_CLASS_instance;
  var AnnotationTarget_TYPE_PARAMETER_instance;
  var AnnotationTarget_PROPERTY_instance;
  var AnnotationTarget_FIELD_instance;
  var AnnotationTarget_LOCAL_VARIABLE_instance;
  var AnnotationTarget_VALUE_PARAMETER_instance;
  var AnnotationTarget_CONSTRUCTOR_instance;
  var AnnotationTarget_FUNCTION_instance;
  var AnnotationTarget_PROPERTY_GETTER_instance;
  var AnnotationTarget_PROPERTY_SETTER_instance;
  var AnnotationTarget_TYPE_instance;
  var AnnotationTarget_EXPRESSION_instance;
  var AnnotationTarget_FILE_instance;
  var AnnotationTarget_TYPEALIAS_instance;
  function values_0() {
    return [AnnotationTarget_CLASS_getInstance(), AnnotationTarget_ANNOTATION_CLASS_getInstance(), AnnotationTarget_TYPE_PARAMETER_getInstance(), AnnotationTarget_PROPERTY_getInstance(), AnnotationTarget_FIELD_getInstance(), AnnotationTarget_LOCAL_VARIABLE_getInstance(), AnnotationTarget_VALUE_PARAMETER_getInstance(), AnnotationTarget_CONSTRUCTOR_getInstance(), AnnotationTarget_FUNCTION_getInstance(), AnnotationTarget_PROPERTY_GETTER_getInstance(), AnnotationTarget_PROPERTY_SETTER_getInstance(), AnnotationTarget_TYPE_getInstance(), AnnotationTarget_EXPRESSION_getInstance(), AnnotationTarget_FILE_getInstance(), AnnotationTarget_TYPEALIAS_getInstance()];
  }
  function valueOf_0(value) {
    switch (value) {
      case 'CLASS':
        return AnnotationTarget_CLASS_getInstance();
      case 'ANNOTATION_CLASS':
        return AnnotationTarget_ANNOTATION_CLASS_getInstance();
      case 'TYPE_PARAMETER':
        return AnnotationTarget_TYPE_PARAMETER_getInstance();
      case 'PROPERTY':
        return AnnotationTarget_PROPERTY_getInstance();
      case 'FIELD':
        return AnnotationTarget_FIELD_getInstance();
      case 'LOCAL_VARIABLE':
        return AnnotationTarget_LOCAL_VARIABLE_getInstance();
      case 'VALUE_PARAMETER':
        return AnnotationTarget_VALUE_PARAMETER_getInstance();
      case 'CONSTRUCTOR':
        return AnnotationTarget_CONSTRUCTOR_getInstance();
      case 'FUNCTION':
        return AnnotationTarget_FUNCTION_getInstance();
      case 'PROPERTY_GETTER':
        return AnnotationTarget_PROPERTY_GETTER_getInstance();
      case 'PROPERTY_SETTER':
        return AnnotationTarget_PROPERTY_SETTER_getInstance();
      case 'TYPE':
        return AnnotationTarget_TYPE_getInstance();
      case 'EXPRESSION':
        return AnnotationTarget_EXPRESSION_getInstance();
      case 'FILE':
        return AnnotationTarget_FILE_getInstance();
      case 'TYPEALIAS':
        return AnnotationTarget_TYPEALIAS_getInstance();
      default:
        AnnotationTarget_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_0() {
    if ($ENTRIES_0 == null)
      $ENTRIES_0 = enumEntries(values_0());
    return $ENTRIES_0;
  }
  var AnnotationTarget_entriesInitialized;
  function AnnotationTarget_initEntries() {
    if (AnnotationTarget_entriesInitialized)
      return Unit_getInstance();
    AnnotationTarget_entriesInitialized = true;
    AnnotationTarget_CLASS_instance = new AnnotationTarget('CLASS', 0);
    AnnotationTarget_ANNOTATION_CLASS_instance = new AnnotationTarget('ANNOTATION_CLASS', 1);
    AnnotationTarget_TYPE_PARAMETER_instance = new AnnotationTarget('TYPE_PARAMETER', 2);
    AnnotationTarget_PROPERTY_instance = new AnnotationTarget('PROPERTY', 3);
    AnnotationTarget_FIELD_instance = new AnnotationTarget('FIELD', 4);
    AnnotationTarget_LOCAL_VARIABLE_instance = new AnnotationTarget('LOCAL_VARIABLE', 5);
    AnnotationTarget_VALUE_PARAMETER_instance = new AnnotationTarget('VALUE_PARAMETER', 6);
    AnnotationTarget_CONSTRUCTOR_instance = new AnnotationTarget('CONSTRUCTOR', 7);
    AnnotationTarget_FUNCTION_instance = new AnnotationTarget('FUNCTION', 8);
    AnnotationTarget_PROPERTY_GETTER_instance = new AnnotationTarget('PROPERTY_GETTER', 9);
    AnnotationTarget_PROPERTY_SETTER_instance = new AnnotationTarget('PROPERTY_SETTER', 10);
    AnnotationTarget_TYPE_instance = new AnnotationTarget('TYPE', 11);
    AnnotationTarget_EXPRESSION_instance = new AnnotationTarget('EXPRESSION', 12);
    AnnotationTarget_FILE_instance = new AnnotationTarget('FILE', 13);
    AnnotationTarget_TYPEALIAS_instance = new AnnotationTarget('TYPEALIAS', 14);
  }
  var $ENTRIES_0;
  function AnnotationTarget(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function Retention(value) {
    value = value === VOID ? AnnotationRetention_RUNTIME_getInstance() : value;
    this.value_1 = value;
  }
  protoOf(Retention).get_value_j01efc_k$ = function () {
    return this.value_1;
  };
  protoOf(Retention).equals = function (other) {
    if (!(other instanceof Retention))
      return false;
    var tmp0_other_with_cast = other instanceof Retention ? other : THROW_CCE();
    if (!this.value_1.equals(tmp0_other_with_cast.value_1))
      return false;
    return true;
  };
  protoOf(Retention).hashCode = function () {
    return imul(getStringHashCode('value'), 127) ^ this.value_1.hashCode();
  };
  protoOf(Retention).toString = function () {
    return '@kotlin.annotation.Retention(value=' + this.value_1 + ')';
  };
  var AnnotationRetention_SOURCE_instance;
  var AnnotationRetention_BINARY_instance;
  var AnnotationRetention_RUNTIME_instance;
  function values_1() {
    return [AnnotationRetention_SOURCE_getInstance(), AnnotationRetention_BINARY_getInstance(), AnnotationRetention_RUNTIME_getInstance()];
  }
  function valueOf_1(value) {
    switch (value) {
      case 'SOURCE':
        return AnnotationRetention_SOURCE_getInstance();
      case 'BINARY':
        return AnnotationRetention_BINARY_getInstance();
      case 'RUNTIME':
        return AnnotationRetention_RUNTIME_getInstance();
      default:
        AnnotationRetention_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_1() {
    if ($ENTRIES_1 == null)
      $ENTRIES_1 = enumEntries(values_1());
    return $ENTRIES_1;
  }
  var AnnotationRetention_entriesInitialized;
  function AnnotationRetention_initEntries() {
    if (AnnotationRetention_entriesInitialized)
      return Unit_getInstance();
    AnnotationRetention_entriesInitialized = true;
    AnnotationRetention_SOURCE_instance = new AnnotationRetention('SOURCE', 0);
    AnnotationRetention_BINARY_instance = new AnnotationRetention('BINARY', 1);
    AnnotationRetention_RUNTIME_instance = new AnnotationRetention('RUNTIME', 2);
  }
  var $ENTRIES_1;
  function AnnotationRetention(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function MustBeDocumented() {
  }
  protoOf(MustBeDocumented).equals = function (other) {
    if (!(other instanceof MustBeDocumented))
      return false;
    other instanceof MustBeDocumented || THROW_CCE();
    return true;
  };
  protoOf(MustBeDocumented).hashCode = function () {
    return 0;
  };
  protoOf(MustBeDocumented).toString = function () {
    return '@kotlin.annotation.MustBeDocumented()';
  };
  function Repeatable() {
  }
  protoOf(Repeatable).equals = function (other) {
    if (!(other instanceof Repeatable))
      return false;
    other instanceof Repeatable || THROW_CCE();
    return true;
  };
  protoOf(Repeatable).hashCode = function () {
    return 0;
  };
  protoOf(Repeatable).toString = function () {
    return '@kotlin.annotation.Repeatable()';
  };
  function AnnotationTarget_CLASS_getInstance() {
    AnnotationTarget_initEntries();
    return AnnotationTarget_CLASS_instance;
  }
  function AnnotationTarget_ANNOTATION_CLASS_getInstance() {
    AnnotationTarget_initEntries();
    return AnnotationTarget_ANNOTATION_CLASS_instance;
  }
  function AnnotationTarget_TYPE_PARAMETER_getInstance() {
    AnnotationTarget_initEntries();
    return AnnotationTarget_TYPE_PARAMETER_instance;
  }
  function AnnotationTarget_PROPERTY_getInstance() {
    AnnotationTarget_initEntries();
    return AnnotationTarget_PROPERTY_instance;
  }
  function AnnotationTarget_FIELD_getInstance() {
    AnnotationTarget_initEntries();
    return AnnotationTarget_FIELD_instance;
  }
  function AnnotationTarget_LOCAL_VARIABLE_getInstance() {
    AnnotationTarget_initEntries();
    return AnnotationTarget_LOCAL_VARIABLE_instance;
  }
  function AnnotationTarget_VALUE_PARAMETER_getInstance() {
    AnnotationTarget_initEntries();
    return AnnotationTarget_VALUE_PARAMETER_instance;
  }
  function AnnotationTarget_CONSTRUCTOR_getInstance() {
    AnnotationTarget_initEntries();
    return AnnotationTarget_CONSTRUCTOR_instance;
  }
  function AnnotationTarget_FUNCTION_getInstance() {
    AnnotationTarget_initEntries();
    return AnnotationTarget_FUNCTION_instance;
  }
  function AnnotationTarget_PROPERTY_GETTER_getInstance() {
    AnnotationTarget_initEntries();
    return AnnotationTarget_PROPERTY_GETTER_instance;
  }
  function AnnotationTarget_PROPERTY_SETTER_getInstance() {
    AnnotationTarget_initEntries();
    return AnnotationTarget_PROPERTY_SETTER_instance;
  }
  function AnnotationTarget_TYPE_getInstance() {
    AnnotationTarget_initEntries();
    return AnnotationTarget_TYPE_instance;
  }
  function AnnotationTarget_EXPRESSION_getInstance() {
    AnnotationTarget_initEntries();
    return AnnotationTarget_EXPRESSION_instance;
  }
  function AnnotationTarget_FILE_getInstance() {
    AnnotationTarget_initEntries();
    return AnnotationTarget_FILE_instance;
  }
  function AnnotationTarget_TYPEALIAS_getInstance() {
    AnnotationTarget_initEntries();
    return AnnotationTarget_TYPEALIAS_instance;
  }
  function AnnotationRetention_SOURCE_getInstance() {
    AnnotationRetention_initEntries();
    return AnnotationRetention_SOURCE_instance;
  }
  function AnnotationRetention_BINARY_getInstance() {
    AnnotationRetention_initEntries();
    return AnnotationRetention_BINARY_instance;
  }
  function AnnotationRetention_RUNTIME_getInstance() {
    AnnotationRetention_initEntries();
    return AnnotationRetention_RUNTIME_instance;
  }
  function ByteCompanionObject() {
    ByteCompanionObject_instance = this;
    this.MIN_VALUE = -128;
    this.MAX_VALUE = 127;
    this.SIZE_BYTES = 1;
    this.SIZE_BITS = 8;
  }
  protoOf(ByteCompanionObject).get_MIN_VALUE_7nmmor_k$ = function () {
    return this.MIN_VALUE;
  };
  protoOf(ByteCompanionObject).get_MAX_VALUE_54a9lf_k$ = function () {
    return this.MAX_VALUE;
  };
  protoOf(ByteCompanionObject).get_SIZE_BYTES_qphg4q_k$ = function () {
    return this.SIZE_BYTES;
  };
  protoOf(ByteCompanionObject).get_SIZE_BITS_7qhjj9_k$ = function () {
    return this.SIZE_BITS;
  };
  var ByteCompanionObject_instance;
  function ByteCompanionObject_getInstance() {
    if (ByteCompanionObject_instance == null)
      new ByteCompanionObject();
    return ByteCompanionObject_instance;
  }
  function ShortCompanionObject() {
    ShortCompanionObject_instance = this;
    this.MIN_VALUE = -32768;
    this.MAX_VALUE = 32767;
    this.SIZE_BYTES = 2;
    this.SIZE_BITS = 16;
  }
  protoOf(ShortCompanionObject).get_MIN_VALUE_7nmmor_k$ = function () {
    return this.MIN_VALUE;
  };
  protoOf(ShortCompanionObject).get_MAX_VALUE_54a9lf_k$ = function () {
    return this.MAX_VALUE;
  };
  protoOf(ShortCompanionObject).get_SIZE_BYTES_qphg4q_k$ = function () {
    return this.SIZE_BYTES;
  };
  protoOf(ShortCompanionObject).get_SIZE_BITS_7qhjj9_k$ = function () {
    return this.SIZE_BITS;
  };
  var ShortCompanionObject_instance;
  function ShortCompanionObject_getInstance() {
    if (ShortCompanionObject_instance == null)
      new ShortCompanionObject();
    return ShortCompanionObject_instance;
  }
  function IntCompanionObject() {
    IntCompanionObject_instance = this;
    this.MIN_VALUE = -2147483648;
    this.MAX_VALUE = 2147483647;
    this.SIZE_BYTES = 4;
    this.SIZE_BITS = 32;
  }
  protoOf(IntCompanionObject).get_MIN_VALUE_7nmmor_k$ = function () {
    return this.MIN_VALUE;
  };
  protoOf(IntCompanionObject).get_MAX_VALUE_54a9lf_k$ = function () {
    return this.MAX_VALUE;
  };
  protoOf(IntCompanionObject).get_SIZE_BYTES_qphg4q_k$ = function () {
    return this.SIZE_BYTES;
  };
  protoOf(IntCompanionObject).get_SIZE_BITS_7qhjj9_k$ = function () {
    return this.SIZE_BITS;
  };
  var IntCompanionObject_instance;
  function IntCompanionObject_getInstance() {
    if (IntCompanionObject_instance == null)
      new IntCompanionObject();
    return IntCompanionObject_instance;
  }
  function FloatCompanionObject() {
    FloatCompanionObject_instance = this;
    this.MIN_VALUE = 1.4E-45;
    this.MAX_VALUE = 3.4028235E38;
    this.POSITIVE_INFINITY = Infinity;
    this.NEGATIVE_INFINITY = -Infinity;
    this.NaN = NaN;
    this.SIZE_BYTES = 4;
    this.SIZE_BITS = 32;
  }
  protoOf(FloatCompanionObject).get_MIN_VALUE_7nmmor_k$ = function () {
    return this.MIN_VALUE;
  };
  protoOf(FloatCompanionObject).get_MAX_VALUE_54a9lf_k$ = function () {
    return this.MAX_VALUE;
  };
  protoOf(FloatCompanionObject).get_POSITIVE_INFINITY_yq30fv_k$ = function () {
    return this.POSITIVE_INFINITY;
  };
  protoOf(FloatCompanionObject).get_NEGATIVE_INFINITY_e9bp9z_k$ = function () {
    return this.NEGATIVE_INFINITY;
  };
  protoOf(FloatCompanionObject).get_NaN_18jnv2_k$ = function () {
    return this.NaN;
  };
  protoOf(FloatCompanionObject).get_SIZE_BYTES_qphg4q_k$ = function () {
    return this.SIZE_BYTES;
  };
  protoOf(FloatCompanionObject).get_SIZE_BITS_7qhjj9_k$ = function () {
    return this.SIZE_BITS;
  };
  var FloatCompanionObject_instance;
  function FloatCompanionObject_getInstance() {
    if (FloatCompanionObject_instance == null)
      new FloatCompanionObject();
    return FloatCompanionObject_instance;
  }
  function DoubleCompanionObject() {
    DoubleCompanionObject_instance = this;
    this.MIN_VALUE = 4.9E-324;
    this.MAX_VALUE = 1.7976931348623157E308;
    this.POSITIVE_INFINITY = Infinity;
    this.NEGATIVE_INFINITY = -Infinity;
    this.NaN = NaN;
    this.SIZE_BYTES = 8;
    this.SIZE_BITS = 64;
  }
  protoOf(DoubleCompanionObject).get_MIN_VALUE_7nmmor_k$ = function () {
    return this.MIN_VALUE;
  };
  protoOf(DoubleCompanionObject).get_MAX_VALUE_54a9lf_k$ = function () {
    return this.MAX_VALUE;
  };
  protoOf(DoubleCompanionObject).get_POSITIVE_INFINITY_yq30fv_k$ = function () {
    return this.POSITIVE_INFINITY;
  };
  protoOf(DoubleCompanionObject).get_NEGATIVE_INFINITY_e9bp9z_k$ = function () {
    return this.NEGATIVE_INFINITY;
  };
  protoOf(DoubleCompanionObject).get_NaN_18jnv2_k$ = function () {
    return this.NaN;
  };
  protoOf(DoubleCompanionObject).get_SIZE_BYTES_qphg4q_k$ = function () {
    return this.SIZE_BYTES;
  };
  protoOf(DoubleCompanionObject).get_SIZE_BITS_7qhjj9_k$ = function () {
    return this.SIZE_BITS;
  };
  var DoubleCompanionObject_instance;
  function DoubleCompanionObject_getInstance() {
    if (DoubleCompanionObject_instance == null)
      new DoubleCompanionObject();
    return DoubleCompanionObject_instance;
  }
  function StringCompanionObject() {
    StringCompanionObject_instance = this;
  }
  var StringCompanionObject_instance;
  function StringCompanionObject_getInstance() {
    if (StringCompanionObject_instance == null)
      new StringCompanionObject();
    return StringCompanionObject_instance;
  }
  function BooleanCompanionObject() {
    BooleanCompanionObject_instance = this;
  }
  var BooleanCompanionObject_instance;
  function BooleanCompanionObject_getInstance() {
    if (BooleanCompanionObject_instance == null)
      new BooleanCompanionObject();
    return BooleanCompanionObject_instance;
  }
  function Comparator() {
  }
  function isNaN_0(_this__u8e3s4) {
    return !(_this__u8e3s4 === _this__u8e3s4);
  }
  function takeHighestOneBit(_this__u8e3s4) {
    var tmp;
    if (_this__u8e3s4 === 0) {
      tmp = 0;
    } else {
      IntCompanionObject_getInstance();
      var tmp_0 = 32 - 1 | 0;
      // Inline function 'kotlin.countLeadingZeroBits' call
      tmp = 1 << (tmp_0 - clz32(_this__u8e3s4) | 0);
    }
    return tmp;
  }
  function countLeadingZeroBits(_this__u8e3s4) {
    return clz32(_this__u8e3s4);
  }
  function isNaN_1(_this__u8e3s4) {
    return !(_this__u8e3s4 === _this__u8e3s4);
  }
  function JsQualifier(value) {
    this.value_1 = value;
  }
  protoOf(JsQualifier).get_value_j01efc_k$ = function () {
    return this.value_1;
  };
  protoOf(JsQualifier).equals = function (other) {
    if (!(other instanceof JsQualifier))
      return false;
    var tmp0_other_with_cast = other instanceof JsQualifier ? other : THROW_CCE();
    if (!(this.value_1 === tmp0_other_with_cast.value_1))
      return false;
    return true;
  };
  protoOf(JsQualifier).hashCode = function () {
    return imul(getStringHashCode('value'), 127) ^ getStringHashCode(this.value_1);
  };
  protoOf(JsQualifier).toString = function () {
    return '@kotlin.js.JsQualifier(value=' + this.value_1 + ')';
  };
  function JsFileName(name) {
    this.name_1 = name;
  }
  protoOf(JsFileName).get_name_woqyms_k$ = function () {
    return this.name_1;
  };
  protoOf(JsFileName).equals = function (other) {
    if (!(other instanceof JsFileName))
      return false;
    var tmp0_other_with_cast = other instanceof JsFileName ? other : THROW_CCE();
    if (!(this.name_1 === tmp0_other_with_cast.name_1))
      return false;
    return true;
  };
  protoOf(JsFileName).hashCode = function () {
    return imul(getStringHashCode('name'), 127) ^ getStringHashCode(this.name_1);
  };
  protoOf(JsFileName).toString = function () {
    return '@kotlin.js.JsFileName(name=' + this.name_1 + ')';
  };
  function JsName(name) {
    this.name_1 = name;
  }
  protoOf(JsName).get_name_woqyms_k$ = function () {
    return this.name_1;
  };
  protoOf(JsName).equals = function (other) {
    if (!(other instanceof JsName))
      return false;
    var tmp0_other_with_cast = other instanceof JsName ? other : THROW_CCE();
    if (!(this.name_1 === tmp0_other_with_cast.name_1))
      return false;
    return true;
  };
  protoOf(JsName).hashCode = function () {
    return imul(getStringHashCode('name'), 127) ^ getStringHashCode(this.name_1);
  };
  protoOf(JsName).toString = function () {
    return '@kotlin.js.JsName(name=' + this.name_1 + ')';
  };
  function Ignore() {
  }
  protoOf(Ignore).equals = function (other) {
    if (!(other instanceof Ignore))
      return false;
    other instanceof Ignore || THROW_CCE();
    return true;
  };
  protoOf(Ignore).hashCode = function () {
    return 0;
  };
  protoOf(Ignore).toString = function () {
    return '@kotlin.js.JsExport.Ignore()';
  };
  function JsExport() {
  }
  protoOf(JsExport).equals = function (other) {
    if (!(other instanceof JsExport))
      return false;
    other instanceof JsExport || THROW_CCE();
    return true;
  };
  protoOf(JsExport).hashCode = function () {
    return 0;
  };
  protoOf(JsExport).toString = function () {
    return '@kotlin.js.JsExport()';
  };
  function EagerInitialization() {
  }
  protoOf(EagerInitialization).equals = function (other) {
    if (!(other instanceof EagerInitialization))
      return false;
    other instanceof EagerInitialization || THROW_CCE();
    return true;
  };
  protoOf(EagerInitialization).hashCode = function () {
    return 0;
  };
  protoOf(EagerInitialization).toString = function () {
    return '@kotlin.js.EagerInitialization()';
  };
  function collectionToArray(collection) {
    return collectionToArrayCommonImpl(collection);
  }
  function collectionToArray_0(collection, array) {
    return collectionToArrayCommonImpl_0(collection, array);
  }
  function terminateCollectionToArray(collectionSize, array) {
    return array;
  }
  function arrayOfNulls(reference, size) {
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.arrayOfNulls' call
    // Inline function 'kotlin.js.asDynamic' call
    return fillArrayVal(Array(size), null);
  }
  function toTypedArray(_this__u8e3s4) {
    return copyToArray(_this__u8e3s4);
  }
  function copyToArray(collection) {
    var tmp;
    // Inline function 'kotlin.js.asDynamic' call
    if (collection.toArray !== undefined) {
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp = collection.toArray();
    } else {
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp = collectionToArray(collection);
    }
    return tmp;
  }
  function checkIndexOverflow(index) {
    if (index < 0) {
      throwIndexOverflow();
    }
    return index;
  }
  function arrayCopy(source, destination, destinationOffset, startIndex, endIndex) {
    Companion_getInstance_4().checkRangeIndexes_a38xj7_k$(startIndex, endIndex, source.length);
    var rangeSize = endIndex - startIndex | 0;
    Companion_getInstance_4().checkRangeIndexes_a38xj7_k$(destinationOffset, destinationOffset + rangeSize | 0, destination.length);
    if (isView(destination) ? isView(source) : false) {
      // Inline function 'kotlin.js.asDynamic' call
      var subrange = source.subarray(startIndex, endIndex);
      // Inline function 'kotlin.js.asDynamic' call
      destination.set(subrange, destinationOffset);
    } else {
      if (!(source === destination) ? true : destinationOffset <= startIndex) {
        var inductionVariable = 0;
        if (inductionVariable < rangeSize)
          do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            destination[destinationOffset + index | 0] = source[startIndex + index | 0];
          }
           while (inductionVariable < rangeSize);
      } else {
        var inductionVariable_0 = rangeSize - 1 | 0;
        if (0 <= inductionVariable_0)
          do {
            var index_0 = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + -1 | 0;
            destination[destinationOffset + index_0 | 0] = source[startIndex + index_0 | 0];
          }
           while (0 <= inductionVariable_0);
      }
    }
  }
  function listOf(element) {
    return arrayListOf([element]);
  }
  function copyToArrayOfAny(_this__u8e3s4, isVarargs) {
    var tmp;
    if (isVarargs) {
      tmp = _this__u8e3s4;
    } else {
      // Inline function 'kotlin.collections.copyOf' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp = _this__u8e3s4.slice();
    }
    return tmp;
  }
  function checkCountOverflow(count) {
    if (count < 0) {
      throwCountOverflow();
    }
    return count;
  }
  function sortWith(_this__u8e3s4, comparator) {
    collectionsSort(_this__u8e3s4, comparator);
  }
  function collectionsSort(list, comparator) {
    if (list.get_size_woubt6_k$() <= 1)
      return Unit_getInstance();
    var array = copyToArray(list);
    sortArrayWith(array, comparator);
    var inductionVariable = 0;
    var last = array.length;
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        list.set_82063s_k$(i, array[i]);
      }
       while (inductionVariable < last);
  }
  function mapCapacity(expectedSize) {
    return expectedSize;
  }
  function AbstractMutableCollection$removeAll$lambda($elements) {
    return function (it) {
      return $elements.contains_aljjnj_k$(it);
    };
  }
  function AbstractMutableCollection$retainAll$lambda($elements) {
    return function (it) {
      return !$elements.contains_aljjnj_k$(it);
    };
  }
  function AbstractMutableCollection() {
    AbstractCollection.call(this);
  }
  protoOf(AbstractMutableCollection).remove_cedx0m_k$ = function (element) {
    this.checkIsMutable_h5js84_k$();
    var iterator = this.iterator_jk1svi_k$();
    while (iterator.hasNext_bitz1p_k$()) {
      if (equals(iterator.next_20eer_k$(), element)) {
        iterator.remove_ldkf9o_k$();
        return true;
      }
    }
    return false;
  };
  protoOf(AbstractMutableCollection).addAll_4lagoh_k$ = function (elements) {
    this.checkIsMutable_h5js84_k$();
    var modified = false;
    var tmp0_iterator = elements.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      if (this.add_utx5q5_k$(element))
        modified = true;
    }
    return modified;
  };
  protoOf(AbstractMutableCollection).removeAll_y0z8pe_k$ = function (elements) {
    this.checkIsMutable_h5js84_k$();
    var tmp = isInterface(this, MutableIterable) ? this : THROW_CCE();
    return removeAll_0(tmp, AbstractMutableCollection$removeAll$lambda(elements));
  };
  protoOf(AbstractMutableCollection).retainAll_9fhiib_k$ = function (elements) {
    this.checkIsMutable_h5js84_k$();
    var tmp = isInterface(this, MutableIterable) ? this : THROW_CCE();
    return removeAll_0(tmp, AbstractMutableCollection$retainAll$lambda(elements));
  };
  protoOf(AbstractMutableCollection).clear_j9egeb_k$ = function () {
    this.checkIsMutable_h5js84_k$();
    var iterator = this.iterator_jk1svi_k$();
    while (iterator.hasNext_bitz1p_k$()) {
      iterator.next_20eer_k$();
      iterator.remove_ldkf9o_k$();
    }
  };
  protoOf(AbstractMutableCollection).toJSON = function () {
    return this.toArray();
  };
  protoOf(AbstractMutableCollection).checkIsMutable_h5js84_k$ = function () {
  };
  function _get_list__d9tsa5($this) {
    return $this.list_1;
  }
  function _get_fromIndex__987b49($this) {
    return $this.fromIndex_1;
  }
  function _set__size__bau3qd($this, _set____db54di) {
    $this._size_1 = _set____db54di;
  }
  function _get__size__kqacr3($this) {
    return $this._size_1;
  }
  function IteratorImpl($outer) {
    this.$this_1 = $outer;
    this.index_1 = 0;
    this.last_1 = -1;
  }
  protoOf(IteratorImpl).set_index_69f5xp_k$ = function (_set____db54di) {
    this.index_1 = _set____db54di;
  };
  protoOf(IteratorImpl).get_index_it478p_k$ = function () {
    return this.index_1;
  };
  protoOf(IteratorImpl).set_last_hgfygb_k$ = function (_set____db54di) {
    this.last_1 = _set____db54di;
  };
  protoOf(IteratorImpl).get_last_wopotb_k$ = function () {
    return this.last_1;
  };
  protoOf(IteratorImpl).hasNext_bitz1p_k$ = function () {
    return this.index_1 < this.$this_1.get_size_woubt6_k$();
  };
  protoOf(IteratorImpl).next_20eer_k$ = function () {
    if (!this.hasNext_bitz1p_k$())
      throw NoSuchElementException_init_$Create$();
    var tmp = this;
    var tmp1 = this.index_1;
    this.index_1 = tmp1 + 1 | 0;
    tmp.last_1 = tmp1;
    return this.$this_1.get_c1px32_k$(this.last_1);
  };
  protoOf(IteratorImpl).remove_ldkf9o_k$ = function () {
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!(this.last_1 === -1)) {
      // Inline function 'kotlin.collections.IteratorImpl.remove.<anonymous>' call
      var message = 'Call next() or previous() before removing element from the iterator.';
      throw IllegalStateException_init_$Create$_0(toString_2(message));
    }
    this.$this_1.removeAt_6niowx_k$(this.last_1);
    this.index_1 = this.last_1;
    this.last_1 = -1;
  };
  function ListIteratorImpl($outer, index) {
    this.$this_2 = $outer;
    IteratorImpl.call(this, $outer);
    Companion_getInstance_4().checkPositionIndex_xiph8v_k$(index, this.$this_2.get_size_woubt6_k$());
    this.index_1 = index;
  }
  protoOf(ListIteratorImpl).hasPrevious_qh0629_k$ = function () {
    return this.index_1 > 0;
  };
  protoOf(ListIteratorImpl).nextIndex_jshxun_k$ = function () {
    return this.index_1;
  };
  protoOf(ListIteratorImpl).previous_l2dfd5_k$ = function () {
    if (!this.hasPrevious_qh0629_k$())
      throw NoSuchElementException_init_$Create$();
    var tmp = this;
    this.index_1 = this.index_1 - 1 | 0;
    tmp.last_1 = this.index_1;
    return this.$this_2.get_c1px32_k$(this.last_1);
  };
  protoOf(ListIteratorImpl).previousIndex_4qtyw5_k$ = function () {
    return this.index_1 - 1 | 0;
  };
  protoOf(ListIteratorImpl).add_lsk6ib_k$ = function (element) {
    this.$this_2.add_dl6gt3_k$(this.index_1, element);
    this.index_1 = this.index_1 + 1 | 0;
    this.last_1 = -1;
  };
  protoOf(ListIteratorImpl).add_jcyd1a_k$ = function (element) {
    return this.add_lsk6ib_k$((element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(ListIteratorImpl).set_fh2j0_k$ = function (element) {
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!(this.last_1 === -1)) {
      // Inline function 'kotlin.collections.ListIteratorImpl.set.<anonymous>' call
      var message = 'Call next() or previous() before updating element value with the iterator.';
      throw IllegalStateException_init_$Create$_0(toString_2(message));
    }
    this.$this_2.set_82063s_k$(this.last_1, element);
  };
  protoOf(ListIteratorImpl).set_tg4fwj_k$ = function (element) {
    return this.set_fh2j0_k$((element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function SubList(list, fromIndex, toIndex) {
    AbstractMutableList.call(this);
    this.list_1 = list;
    this.fromIndex_1 = fromIndex;
    this._size_1 = 0;
    Companion_getInstance_4().checkRangeIndexes_a38xj7_k$(this.fromIndex_1, toIndex, this.list_1.get_size_woubt6_k$());
    this._size_1 = toIndex - this.fromIndex_1 | 0;
  }
  protoOf(SubList).add_dl6gt3_k$ = function (index, element) {
    Companion_getInstance_4().checkPositionIndex_xiph8v_k$(index, this._size_1);
    this.list_1.add_dl6gt3_k$(this.fromIndex_1 + index | 0, element);
    this._size_1 = this._size_1 + 1 | 0;
  };
  protoOf(SubList).get_c1px32_k$ = function (index) {
    Companion_getInstance_4().checkElementIndex_r3t1bm_k$(index, this._size_1);
    return this.list_1.get_c1px32_k$(this.fromIndex_1 + index | 0);
  };
  protoOf(SubList).removeAt_6niowx_k$ = function (index) {
    Companion_getInstance_4().checkElementIndex_r3t1bm_k$(index, this._size_1);
    var result = this.list_1.removeAt_6niowx_k$(this.fromIndex_1 + index | 0);
    this._size_1 = this._size_1 - 1 | 0;
    return result;
  };
  protoOf(SubList).set_82063s_k$ = function (index, element) {
    Companion_getInstance_4().checkElementIndex_r3t1bm_k$(index, this._size_1);
    return this.list_1.set_82063s_k$(this.fromIndex_1 + index | 0, element);
  };
  protoOf(SubList).get_size_woubt6_k$ = function () {
    return this._size_1;
  };
  protoOf(SubList).checkIsMutable_h5js84_k$ = function () {
    return this.list_1.checkIsMutable_h5js84_k$();
  };
  function AbstractMutableList$removeAll$lambda($elements) {
    return function (it) {
      return $elements.contains_aljjnj_k$(it);
    };
  }
  function AbstractMutableList$retainAll$lambda($elements) {
    return function (it) {
      return !$elements.contains_aljjnj_k$(it);
    };
  }
  function AbstractMutableList() {
    AbstractMutableCollection.call(this);
    this.modCount_1 = 0;
  }
  protoOf(AbstractMutableList).set_modCount_dsd9nm_k$ = function (_set____db54di) {
    this.modCount_1 = _set____db54di;
  };
  protoOf(AbstractMutableList).get_modCount_sgzjli_k$ = function () {
    return this.modCount_1;
  };
  protoOf(AbstractMutableList).add_utx5q5_k$ = function (element) {
    this.checkIsMutable_h5js84_k$();
    this.add_dl6gt3_k$(this.get_size_woubt6_k$(), element);
    return true;
  };
  protoOf(AbstractMutableList).addAll_lxodh3_k$ = function (index, elements) {
    Companion_getInstance_4().checkPositionIndex_xiph8v_k$(index, this.get_size_woubt6_k$());
    this.checkIsMutable_h5js84_k$();
    var _index = index;
    var changed = false;
    var tmp0_iterator = elements.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var e = tmp0_iterator.next_20eer_k$();
      var tmp1 = _index;
      _index = tmp1 + 1 | 0;
      this.add_dl6gt3_k$(tmp1, e);
      changed = true;
    }
    return changed;
  };
  protoOf(AbstractMutableList).clear_j9egeb_k$ = function () {
    this.checkIsMutable_h5js84_k$();
    this.removeRange_sm1kzt_k$(0, this.get_size_woubt6_k$());
  };
  protoOf(AbstractMutableList).removeAll_y0z8pe_k$ = function (elements) {
    this.checkIsMutable_h5js84_k$();
    return removeAll(this, AbstractMutableList$removeAll$lambda(elements));
  };
  protoOf(AbstractMutableList).retainAll_9fhiib_k$ = function (elements) {
    this.checkIsMutable_h5js84_k$();
    return removeAll(this, AbstractMutableList$retainAll$lambda(elements));
  };
  protoOf(AbstractMutableList).iterator_jk1svi_k$ = function () {
    return new IteratorImpl(this);
  };
  protoOf(AbstractMutableList).contains_aljjnj_k$ = function (element) {
    return this.indexOf_si1fv9_k$(element) >= 0;
  };
  protoOf(AbstractMutableList).indexOf_si1fv9_k$ = function (element) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.indexOfFirst' call
      var index = 0;
      var tmp0_iterator = this.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var item = tmp0_iterator.next_20eer_k$();
        // Inline function 'kotlin.collections.AbstractMutableList.indexOf.<anonymous>' call
        if (equals(item, element)) {
          tmp$ret$1 = index;
          break $l$block;
        }
        index = index + 1 | 0;
      }
      tmp$ret$1 = -1;
    }
    return tmp$ret$1;
  };
  protoOf(AbstractMutableList).lastIndexOf_v2p1fv_k$ = function (element) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.indexOfLast' call
      var iterator = this.listIterator_70e65o_k$(this.get_size_woubt6_k$());
      while (iterator.hasPrevious_qh0629_k$()) {
        // Inline function 'kotlin.collections.AbstractMutableList.lastIndexOf.<anonymous>' call
        var it = iterator.previous_l2dfd5_k$();
        if (equals(it, element)) {
          tmp$ret$1 = iterator.nextIndex_jshxun_k$();
          break $l$block;
        }
      }
      tmp$ret$1 = -1;
    }
    return tmp$ret$1;
  };
  protoOf(AbstractMutableList).listIterator_xjshxw_k$ = function () {
    return this.listIterator_70e65o_k$(0);
  };
  protoOf(AbstractMutableList).listIterator_70e65o_k$ = function (index) {
    return new ListIteratorImpl(this, index);
  };
  protoOf(AbstractMutableList).subList_xle3r2_k$ = function (fromIndex, toIndex) {
    return new SubList(this, fromIndex, toIndex);
  };
  protoOf(AbstractMutableList).removeRange_sm1kzt_k$ = function (fromIndex, toIndex) {
    var iterator = this.listIterator_70e65o_k$(fromIndex);
    // Inline function 'kotlin.repeat' call
    var times = toIndex - fromIndex | 0;
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.AbstractMutableList.removeRange.<anonymous>' call
        iterator.next_20eer_k$();
        iterator.remove_ldkf9o_k$();
      }
       while (inductionVariable < times);
  };
  protoOf(AbstractMutableList).equals = function (other) {
    if (other === this)
      return true;
    if (!(!(other == null) ? isInterface(other, List) : false))
      return false;
    return Companion_getInstance_4().orderedEquals_mgd3rc_k$(this, other);
  };
  protoOf(AbstractMutableList).hashCode = function () {
    return Companion_getInstance_4().orderedHashCode_s560y_k$(this);
  };
  function _set_keysView__j45w72($this, _set____db54di) {
    $this.keysView_1 = _set____db54di;
  }
  function _get_keysView__6b9kqa($this) {
    return $this.keysView_1;
  }
  function _set_valuesView__p07d68($this, _set____db54di) {
    $this.valuesView_1 = _set____db54di;
  }
  function _get_valuesView__uyo3no($this) {
    return $this.valuesView_1;
  }
  function AbstractMutableMap() {
    AbstractMap.call(this);
    this.keysView_1 = null;
    this.valuesView_1 = null;
  }
  protoOf(AbstractMutableMap).createKeysView_nu3fmd_k$ = function () {
    return new HashMapKeysDefault(this);
  };
  protoOf(AbstractMutableMap).createValuesView_6r85x9_k$ = function () {
    return new HashMapValuesDefault(this);
  };
  protoOf(AbstractMutableMap).get_keys_wop4xp_k$ = function () {
    var tmp0_elvis_lhs = this.keysView_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.also' call
      var this_0 = this.createKeysView_nu3fmd_k$();
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlin.collections.AbstractMutableMap.<get-keys>.<anonymous>' call
      this.keysView_1 = this_0;
      tmp = this_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(AbstractMutableMap).get_values_ksazhn_k$ = function () {
    var tmp0_elvis_lhs = this.valuesView_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.also' call
      var this_0 = this.createValuesView_6r85x9_k$();
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlin.collections.AbstractMutableMap.<get-values>.<anonymous>' call
      this.valuesView_1 = this_0;
      tmp = this_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(AbstractMutableMap).clear_j9egeb_k$ = function () {
    this.get_entries_p20ztl_k$().clear_j9egeb_k$();
  };
  protoOf(AbstractMutableMap).putAll_wgg6cj_k$ = function (from) {
    this.checkIsMutable_h5js84_k$();
    // Inline function 'kotlin.collections.iterator' call
    var tmp0_iterator = from.get_entries_p20ztl_k$().iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var tmp1_loop_parameter = tmp0_iterator.next_20eer_k$();
      // Inline function 'kotlin.collections.component1' call
      var key = tmp1_loop_parameter.get_key_18j28a_k$();
      // Inline function 'kotlin.collections.component2' call
      var value = tmp1_loop_parameter.get_value_j01efc_k$();
      this.put_4fpzoq_k$(key, value);
    }
  };
  protoOf(AbstractMutableMap).remove_gppy8k_k$ = function (key) {
    this.checkIsMutable_h5js84_k$();
    var iter = this.get_entries_p20ztl_k$().iterator_jk1svi_k$();
    while (iter.hasNext_bitz1p_k$()) {
      var entry = iter.next_20eer_k$();
      var k = entry.get_key_18j28a_k$();
      if (equals(key, k)) {
        var value = entry.get_value_j01efc_k$();
        iter.remove_ldkf9o_k$();
        return value;
      }
    }
    return null;
  };
  protoOf(AbstractMutableMap).checkIsMutable_h5js84_k$ = function () {
  };
  function AbstractMutableSet() {
    AbstractMutableCollection.call(this);
  }
  protoOf(AbstractMutableSet).equals = function (other) {
    if (other === this)
      return true;
    if (!(!(other == null) ? isInterface(other, Set) : false))
      return false;
    return Companion_getInstance_6().setEquals_3t788x_k$(this, other);
  };
  protoOf(AbstractMutableSet).hashCode = function () {
    return Companion_getInstance_6().unorderedHashCode_3jmy63_k$(this);
  };
  function arrayOfUninitializedElements(capacity) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(capacity >= 0)) {
      // Inline function 'kotlin.collections.arrayOfUninitializedElements.<anonymous>' call
      var message = 'capacity must be non-negative.';
      throw IllegalArgumentException_init_$Create$_0(toString_2(message));
    }
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.arrayOfNulls' call
    // Inline function 'kotlin.js.asDynamic' call
    return fillArrayVal(Array(capacity), null);
  }
  function resetAt(_this__u8e3s4, index) {
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    _this__u8e3s4[index] = null;
  }
  function resetRange(_this__u8e3s4, fromIndex, toIndex) {
    // Inline function 'kotlin.js.nativeFill' call
    // Inline function 'kotlin.js.asDynamic' call
    _this__u8e3s4.fill(null, fromIndex, toIndex);
  }
  function copyOfUninitializedElements(_this__u8e3s4, newSize) {
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return copyOf_0(_this__u8e3s4, newSize);
  }
  function _get_Empty__x4mxmk($this) {
    return $this.Empty_1;
  }
  function _set_array__c8isr0($this, _set____db54di) {
    $this.array_1 = _set____db54di;
  }
  function _get_array__jslnqg($this) {
    return $this.array_1;
  }
  function Companion() {
    Companion_instance = this;
    var tmp = this;
    // Inline function 'kotlin.also' call
    var this_0 = ArrayList_init_$Create$_0(0);
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.collections.Companion.Empty.<anonymous>' call
    this_0.isReadOnly_1 = true;
    tmp.Empty_1 = this_0;
  }
  var Companion_instance;
  function Companion_getInstance() {
    if (Companion_instance == null)
      new Companion();
    return Companion_instance;
  }
  function _set_isReadOnly__fb15ed($this, _set____db54di) {
    $this.isReadOnly_1 = _set____db54di;
  }
  function _get_isReadOnly__ud9qjl($this) {
    return $this.isReadOnly_1;
  }
  function ArrayList_init_$Init$($this) {
    // Inline function 'kotlin.emptyArray' call
    var tmp$ret$0 = [];
    ArrayList.call($this, tmp$ret$0);
    return $this;
  }
  function ArrayList_init_$Create$() {
    return ArrayList_init_$Init$(objectCreate(protoOf(ArrayList)));
  }
  function ArrayList_init_$Init$_0(initialCapacity, $this) {
    // Inline function 'kotlin.emptyArray' call
    var tmp$ret$0 = [];
    ArrayList.call($this, tmp$ret$0);
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(initialCapacity >= 0)) {
      // Inline function 'kotlin.collections.ArrayList.<init>.<anonymous>' call
      var message = 'Negative initial capacity: ' + initialCapacity;
      throw IllegalArgumentException_init_$Create$_0(toString_2(message));
    }
    return $this;
  }
  function ArrayList_init_$Create$_0(initialCapacity) {
    return ArrayList_init_$Init$_0(initialCapacity, objectCreate(protoOf(ArrayList)));
  }
  function ArrayList_init_$Init$_1(elements, $this) {
    // Inline function 'kotlin.collections.toTypedArray' call
    var tmp$ret$0 = copyToArray(elements);
    ArrayList.call($this, tmp$ret$0);
    return $this;
  }
  function ArrayList_init_$Create$_1(elements) {
    return ArrayList_init_$Init$_1(elements, objectCreate(protoOf(ArrayList)));
  }
  function increaseLength($this, amount) {
    var previous = $this.get_size_woubt6_k$();
    // Inline function 'kotlin.js.asDynamic' call
    $this.array_1.length = $this.get_size_woubt6_k$() + amount | 0;
    return previous;
  }
  function rangeCheck($this, index) {
    // Inline function 'kotlin.apply' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.collections.ArrayList.rangeCheck.<anonymous>' call
    Companion_getInstance_4().checkElementIndex_r3t1bm_k$(index, $this.get_size_woubt6_k$());
    return index;
  }
  function insertionRangeCheck($this, index) {
    // Inline function 'kotlin.apply' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.collections.ArrayList.insertionRangeCheck.<anonymous>' call
    Companion_getInstance_4().checkPositionIndex_xiph8v_k$(index, $this.get_size_woubt6_k$());
    return index;
  }
  function ArrayList(array) {
    Companion_getInstance();
    AbstractMutableList.call(this);
    this.array_1 = array;
    this.isReadOnly_1 = false;
  }
  protoOf(ArrayList).build_1k0s4u_k$ = function () {
    this.checkIsMutable_h5js84_k$();
    this.isReadOnly_1 = true;
    return this.get_size_woubt6_k$() > 0 ? this : Companion_getInstance().Empty_1;
  };
  protoOf(ArrayList).trimToSize_dmxq0i_k$ = function () {
  };
  protoOf(ArrayList).ensureCapacity_wr7980_k$ = function (minCapacity) {
  };
  protoOf(ArrayList).get_size_woubt6_k$ = function () {
    return this.array_1.length;
  };
  protoOf(ArrayList).get_c1px32_k$ = function (index) {
    var tmp = this.array_1[rangeCheck(this, index)];
    return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
  };
  protoOf(ArrayList).set_82063s_k$ = function (index, element) {
    this.checkIsMutable_h5js84_k$();
    rangeCheck(this, index);
    // Inline function 'kotlin.apply' call
    var this_0 = this.array_1[index];
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.collections.ArrayList.set.<anonymous>' call
    this.array_1[index] = element;
    var tmp = this_0;
    return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
  };
  protoOf(ArrayList).add_utx5q5_k$ = function (element) {
    this.checkIsMutable_h5js84_k$();
    // Inline function 'kotlin.js.asDynamic' call
    this.array_1.push(element);
    this.modCount_1 = this.modCount_1 + 1 | 0;
    return true;
  };
  protoOf(ArrayList).add_dl6gt3_k$ = function (index, element) {
    this.checkIsMutable_h5js84_k$();
    // Inline function 'kotlin.js.asDynamic' call
    this.array_1.splice(insertionRangeCheck(this, index), 0, element);
    this.modCount_1 = this.modCount_1 + 1 | 0;
  };
  protoOf(ArrayList).addAll_4lagoh_k$ = function (elements) {
    this.checkIsMutable_h5js84_k$();
    if (elements.isEmpty_y1axqb_k$())
      return false;
    var offset = increaseLength(this, elements.get_size_woubt6_k$());
    // Inline function 'kotlin.collections.forEachIndexed' call
    var index = 0;
    var tmp0_iterator = elements.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var item = tmp0_iterator.next_20eer_k$();
      // Inline function 'kotlin.collections.ArrayList.addAll.<anonymous>' call
      var tmp1 = index;
      index = tmp1 + 1 | 0;
      var index_0 = checkIndexOverflow(tmp1);
      this.array_1[offset + index_0 | 0] = item;
    }
    this.modCount_1 = this.modCount_1 + 1 | 0;
    return true;
  };
  protoOf(ArrayList).addAll_lxodh3_k$ = function (index, elements) {
    this.checkIsMutable_h5js84_k$();
    insertionRangeCheck(this, index);
    if (index === this.get_size_woubt6_k$())
      return this.addAll_4lagoh_k$(elements);
    if (elements.isEmpty_y1axqb_k$())
      return false;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tail = this.array_1.splice(index);
    this.addAll_4lagoh_k$(elements);
    var offset = increaseLength(this, tail.length);
    // Inline function 'kotlin.repeat' call
    var times = tail.length;
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index_0 = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.ArrayList.addAll.<anonymous>' call
        this.array_1[offset + index_0 | 0] = tail[index_0];
      }
       while (inductionVariable < times);
    this.modCount_1 = this.modCount_1 + 1 | 0;
    return true;
  };
  protoOf(ArrayList).removeAt_6niowx_k$ = function (index) {
    this.checkIsMutable_h5js84_k$();
    rangeCheck(this, index);
    this.modCount_1 = this.modCount_1 + 1 | 0;
    var tmp;
    if (index === get_lastIndex_6(this)) {
      // Inline function 'kotlin.js.asDynamic' call
      tmp = this.array_1.pop();
    } else {
      // Inline function 'kotlin.js.asDynamic' call
      tmp = this.array_1.splice(index, 1)[0];
    }
    return tmp;
  };
  protoOf(ArrayList).remove_cedx0m_k$ = function (element) {
    this.checkIsMutable_h5js84_k$();
    var inductionVariable = 0;
    var last = this.array_1.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (equals(this.array_1[index], element)) {
          // Inline function 'kotlin.js.asDynamic' call
          this.array_1.splice(index, 1);
          this.modCount_1 = this.modCount_1 + 1 | 0;
          return true;
        }
      }
       while (inductionVariable <= last);
    return false;
  };
  protoOf(ArrayList).removeRange_sm1kzt_k$ = function (fromIndex, toIndex) {
    this.checkIsMutable_h5js84_k$();
    this.modCount_1 = this.modCount_1 + 1 | 0;
    // Inline function 'kotlin.js.asDynamic' call
    this.array_1.splice(fromIndex, toIndex - fromIndex | 0);
  };
  protoOf(ArrayList).clear_j9egeb_k$ = function () {
    this.checkIsMutable_h5js84_k$();
    var tmp = this;
    // Inline function 'kotlin.emptyArray' call
    tmp.array_1 = [];
    this.modCount_1 = this.modCount_1 + 1 | 0;
  };
  protoOf(ArrayList).indexOf_si1fv9_k$ = function (element) {
    return indexOf_3(this.array_1, element);
  };
  protoOf(ArrayList).lastIndexOf_v2p1fv_k$ = function (element) {
    return lastIndexOf(this.array_1, element);
  };
  protoOf(ArrayList).toString = function () {
    return arrayToString(this.array_1);
  };
  protoOf(ArrayList).toArray_6cwqme_k$ = function (array) {
    if (array.length < this.get_size_woubt6_k$()) {
      var tmp = this.toArray_jjyjqa_k$();
      return isArray(tmp) ? tmp : THROW_CCE();
    }
    // Inline function 'kotlin.collections.copyInto' call
    var tmp_0 = this.array_1;
    var this_0 = isArray(tmp_0) ? tmp_0 : THROW_CCE();
    var endIndex = this_0.length;
    arrayCopy(this_0, array, 0, 0, endIndex);
    return terminateCollectionToArray(this.get_size_woubt6_k$(), array);
  };
  protoOf(ArrayList).toArray_jjyjqa_k$ = function () {
    return [].slice.call(this.array_1);
  };
  protoOf(ArrayList).toArray = function () {
    return this.toArray_jjyjqa_k$();
  };
  protoOf(ArrayList).checkIsMutable_h5js84_k$ = function () {
    if (this.isReadOnly_1)
      throw UnsupportedOperationException_init_$Create$();
  };
  function set__stableSortingIsSupported(_set____db54di) {
    _stableSortingIsSupported = _set____db54di;
  }
  function get__stableSortingIsSupported() {
    return _stableSortingIsSupported;
  }
  var _stableSortingIsSupported;
  function sortArrayWith(array, comparator) {
    if (getStableSortingIsSupported()) {
      var comparison = sortArrayWith$lambda(comparator);
      // Inline function 'kotlin.js.asDynamic' call
      array.sort(comparison);
    } else {
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      mergeSort(array, 0, get_lastIndex_3(array), comparator);
    }
  }
  function getStableSortingIsSupported() {
    var tmp0_safe_receiver = _stableSortingIsSupported;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      return tmp0_safe_receiver;
    }
    _stableSortingIsSupported = false;
    // Inline function 'kotlin.js.unsafeCast' call
    var array = [];
    var inductionVariable = 0;
    if (inductionVariable < 600)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.js.asDynamic' call
        array.push(index);
      }
       while (inductionVariable < 600);
    var comparison = getStableSortingIsSupported$lambda;
    // Inline function 'kotlin.js.asDynamic' call
    array.sort(comparison);
    var inductionVariable_0 = 1;
    var last = array.length;
    if (inductionVariable_0 < last)
      do {
        var index_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        var a = array[index_0 - 1 | 0];
        var b = array[index_0];
        if ((a & 3) === (b & 3) ? a >= b : false)
          return false;
      }
       while (inductionVariable_0 < last);
    _stableSortingIsSupported = true;
    return true;
  }
  function mergeSort(array, start, endInclusive, comparator) {
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.arrayOfNulls' call
    var size = array.length;
    // Inline function 'kotlin.js.asDynamic' call
    var buffer = fillArrayVal(Array(size), null);
    var result = mergeSort_0(array, buffer, start, endInclusive, comparator);
    if (!(result === array)) {
      var inductionVariable = start;
      if (inductionVariable <= endInclusive)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          array[i] = result[i];
        }
         while (!(i === endInclusive));
    }
  }
  function mergeSort_0(array, buffer, start, end, comparator) {
    if (start === end) {
      return array;
    }
    var median = (start + end | 0) / 2 | 0;
    var left = mergeSort_0(array, buffer, start, median, comparator);
    var right = mergeSort_0(array, buffer, median + 1 | 0, end, comparator);
    var target = left === buffer ? array : buffer;
    var leftIndex = start;
    var rightIndex = median + 1 | 0;
    var inductionVariable = start;
    if (inductionVariable <= end)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (leftIndex <= median ? rightIndex <= end : false) {
          var leftValue = left[leftIndex];
          var rightValue = right[rightIndex];
          if (comparator.compare(leftValue, rightValue) <= 0) {
            target[i] = leftValue;
            leftIndex = leftIndex + 1 | 0;
          } else {
            target[i] = rightValue;
            rightIndex = rightIndex + 1 | 0;
          }
        } else if (leftIndex <= median) {
          target[i] = left[leftIndex];
          leftIndex = leftIndex + 1 | 0;
        } else {
          target[i] = right[rightIndex];
          rightIndex = rightIndex + 1 | 0;
        }
      }
       while (!(i === end));
    return target;
  }
  function sortArrayWith$lambda($comparator) {
    return function (a, b) {
      return $comparator.compare(a, b);
    };
  }
  function getStableSortingIsSupported$lambda(a, b) {
    return (a & 3) - (b & 3) | 0;
  }
  function HashMap_init_$Init$(internalMap, $this) {
    AbstractMutableMap.call($this);
    HashMap.call($this);
    $this.internalMap_1 = internalMap;
    return $this;
  }
  function HashMap_init_$Create$(internalMap) {
    return HashMap_init_$Init$(internalMap, objectCreate(protoOf(HashMap)));
  }
  function HashMap_init_$Init$_0($this) {
    HashMap_init_$Init$(InternalHashMap_init_$Create$(), $this);
    return $this;
  }
  function HashMap_init_$Create$_0() {
    return HashMap_init_$Init$_0(objectCreate(protoOf(HashMap)));
  }
  function HashMap_init_$Init$_1(initialCapacity, loadFactor, $this) {
    HashMap_init_$Init$(InternalHashMap_init_$Create$_2(initialCapacity, loadFactor), $this);
    return $this;
  }
  function HashMap_init_$Create$_1(initialCapacity, loadFactor) {
    return HashMap_init_$Init$_1(initialCapacity, loadFactor, objectCreate(protoOf(HashMap)));
  }
  function HashMap_init_$Init$_2(initialCapacity, $this) {
    HashMap_init_$Init$_1(initialCapacity, 1.0, $this);
    return $this;
  }
  function HashMap_init_$Create$_2(initialCapacity) {
    return HashMap_init_$Init$_2(initialCapacity, objectCreate(protoOf(HashMap)));
  }
  function HashMap_init_$Init$_3(original, $this) {
    HashMap_init_$Init$(InternalHashMap_init_$Create$_1(original), $this);
    return $this;
  }
  function HashMap_init_$Create$_3(original) {
    return HashMap_init_$Init$_3(original, objectCreate(protoOf(HashMap)));
  }
  function _set_entriesView__3cvh68($this, _set____db54di) {
    $this.entriesView_1 = _set____db54di;
  }
  function _get_entriesView__qxip5o($this) {
    return $this.entriesView_1;
  }
  protoOf(HashMap).get_internalMap_kinfuy_k$ = function () {
    return this.internalMap_1;
  };
  protoOf(HashMap).clear_j9egeb_k$ = function () {
    this.internalMap_1.clear_j9egeb_k$();
  };
  protoOf(HashMap).containsKey_aw81wo_k$ = function (key) {
    return this.internalMap_1.contains_vbgn2f_k$(key);
  };
  protoOf(HashMap).containsValue_yf2ykl_k$ = function (value) {
    return this.internalMap_1.containsValue_yf2ykl_k$(value);
  };
  protoOf(HashMap).createKeysView_nu3fmd_k$ = function () {
    return new HashMapKeys(this.internalMap_1);
  };
  protoOf(HashMap).createValuesView_6r85x9_k$ = function () {
    return new HashMapValues(this.internalMap_1);
  };
  protoOf(HashMap).get_entries_p20ztl_k$ = function () {
    var tmp0_elvis_lhs = this.entriesView_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.also' call
      var this_0 = new HashMapEntrySet(this.internalMap_1);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlin.collections.HashMap.<get-entries>.<anonymous>' call
      this.entriesView_1 = this_0;
      tmp = this_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(HashMap).get_wei43m_k$ = function (key) {
    return this.internalMap_1.get_wei43m_k$(key);
  };
  protoOf(HashMap).put_4fpzoq_k$ = function (key, value) {
    return this.internalMap_1.put_4fpzoq_k$(key, value);
  };
  protoOf(HashMap).remove_gppy8k_k$ = function (key) {
    return this.internalMap_1.remove_gppy8k_k$(key);
  };
  protoOf(HashMap).get_size_woubt6_k$ = function () {
    return this.internalMap_1.get_size_woubt6_k$();
  };
  protoOf(HashMap).putAll_wgg6cj_k$ = function (from) {
    return this.internalMap_1.putAll_wgg6cj_k$(from);
  };
  function HashMap() {
    this.entriesView_1 = null;
  }
  function _get_backing__s7m0a($this) {
    return $this.backing_1;
  }
  function HashMapKeys(backing) {
    AbstractMutableSet.call(this);
    this.backing_1 = backing;
  }
  protoOf(HashMapKeys).get_size_woubt6_k$ = function () {
    return this.backing_1.get_size_woubt6_k$();
  };
  protoOf(HashMapKeys).isEmpty_y1axqb_k$ = function () {
    return this.backing_1.get_size_woubt6_k$() === 0;
  };
  protoOf(HashMapKeys).contains_aljjnj_k$ = function (element) {
    return this.backing_1.contains_vbgn2f_k$(element);
  };
  protoOf(HashMapKeys).clear_j9egeb_k$ = function () {
    return this.backing_1.clear_j9egeb_k$();
  };
  protoOf(HashMapKeys).add_utx5q5_k$ = function (element) {
    throw UnsupportedOperationException_init_$Create$();
  };
  protoOf(HashMapKeys).addAll_4lagoh_k$ = function (elements) {
    throw UnsupportedOperationException_init_$Create$();
  };
  protoOf(HashMapKeys).remove_cedx0m_k$ = function (element) {
    return !(this.backing_1.remove_gppy8k_k$(element) == null);
  };
  protoOf(HashMapKeys).iterator_jk1svi_k$ = function () {
    return this.backing_1.keysIterator_mjslfm_k$();
  };
  protoOf(HashMapKeys).checkIsMutable_h5js84_k$ = function () {
    return this.backing_1.checkIsMutable_h5js84_k$();
  };
  function _get_backing__s7m0a_0($this) {
    return $this.backing_1;
  }
  function HashMapValues(backing) {
    AbstractMutableCollection.call(this);
    this.backing_1 = backing;
  }
  protoOf(HashMapValues).get_size_woubt6_k$ = function () {
    return this.backing_1.get_size_woubt6_k$();
  };
  protoOf(HashMapValues).isEmpty_y1axqb_k$ = function () {
    return this.backing_1.get_size_woubt6_k$() === 0;
  };
  protoOf(HashMapValues).contains_m22g8e_k$ = function (element) {
    return this.backing_1.containsValue_yf2ykl_k$(element);
  };
  protoOf(HashMapValues).contains_aljjnj_k$ = function (element) {
    if (!(element == null ? true : !(element == null)))
      return false;
    return this.contains_m22g8e_k$((element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(HashMapValues).add_sqnzo4_k$ = function (element) {
    throw UnsupportedOperationException_init_$Create$();
  };
  protoOf(HashMapValues).add_utx5q5_k$ = function (element) {
    return this.add_sqnzo4_k$((element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(HashMapValues).addAll_txis5e_k$ = function (elements) {
    throw UnsupportedOperationException_init_$Create$();
  };
  protoOf(HashMapValues).addAll_4lagoh_k$ = function (elements) {
    return this.addAll_txis5e_k$(elements);
  };
  protoOf(HashMapValues).clear_j9egeb_k$ = function () {
    return this.backing_1.clear_j9egeb_k$();
  };
  protoOf(HashMapValues).iterator_jk1svi_k$ = function () {
    return this.backing_1.valuesIterator_3ptos0_k$();
  };
  protoOf(HashMapValues).remove_xv0fr_k$ = function (element) {
    return this.backing_1.removeValue_ccp5hc_k$(element);
  };
  protoOf(HashMapValues).remove_cedx0m_k$ = function (element) {
    if (!(element == null ? true : !(element == null)))
      return false;
    return this.remove_xv0fr_k$((element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(HashMapValues).checkIsMutable_h5js84_k$ = function () {
    return this.backing_1.checkIsMutable_h5js84_k$();
  };
  function HashMapEntrySet(backing) {
    HashMapEntrySetBase.call(this, backing);
  }
  protoOf(HashMapEntrySet).iterator_jk1svi_k$ = function () {
    return this.backing_1.entriesIterator_or017i_k$();
  };
  function HashMapEntrySetBase(backing) {
    AbstractMutableSet.call(this);
    this.backing_1 = backing;
  }
  protoOf(HashMapEntrySetBase).get_backing_4h5ufi_k$ = function () {
    return this.backing_1;
  };
  protoOf(HashMapEntrySetBase).get_size_woubt6_k$ = function () {
    return this.backing_1.get_size_woubt6_k$();
  };
  protoOf(HashMapEntrySetBase).isEmpty_y1axqb_k$ = function () {
    return this.backing_1.get_size_woubt6_k$() === 0;
  };
  protoOf(HashMapEntrySetBase).contains_pftbw2_k$ = function (element) {
    return this.backing_1.containsEntry_jg6xfi_k$(element);
  };
  protoOf(HashMapEntrySetBase).contains_aljjnj_k$ = function (element) {
    if (!(!(element == null) ? isInterface(element, Entry) : false))
      return false;
    return this.contains_pftbw2_k$((!(element == null) ? isInterface(element, Entry) : false) ? element : THROW_CCE());
  };
  protoOf(HashMapEntrySetBase).clear_j9egeb_k$ = function () {
    return this.backing_1.clear_j9egeb_k$();
  };
  protoOf(HashMapEntrySetBase).add_k8z7xs_k$ = function (element) {
    throw UnsupportedOperationException_init_$Create$();
  };
  protoOf(HashMapEntrySetBase).add_utx5q5_k$ = function (element) {
    return this.add_k8z7xs_k$((!(element == null) ? isInterface(element, Entry) : false) ? element : THROW_CCE());
  };
  protoOf(HashMapEntrySetBase).addAll_4lagoh_k$ = function (elements) {
    throw UnsupportedOperationException_init_$Create$();
  };
  protoOf(HashMapEntrySetBase).remove_z40ynn_k$ = function (element) {
    return this.backing_1.removeEntry_dxtz15_k$(element);
  };
  protoOf(HashMapEntrySetBase).remove_cedx0m_k$ = function (element) {
    if (!(!(element == null) ? isInterface(element, Entry) : false))
      return false;
    return this.remove_z40ynn_k$((!(element == null) ? isInterface(element, Entry) : false) ? element : THROW_CCE());
  };
  protoOf(HashMapEntrySetBase).containsAll_xk45sd_k$ = function (elements) {
    return this.backing_1.containsAllEntries_5fw0no_k$(elements);
  };
  protoOf(HashMapEntrySetBase).checkIsMutable_h5js84_k$ = function () {
    return this.backing_1.checkIsMutable_h5js84_k$();
  };
  function _get_backingMap__nfspgq($this) {
    return $this.backingMap_1;
  }
  function HashMapKeysDefault$iterator$1($entryIterator) {
    this.$entryIterator_1 = $entryIterator;
  }
  protoOf(HashMapKeysDefault$iterator$1).hasNext_bitz1p_k$ = function () {
    return this.$entryIterator_1.hasNext_bitz1p_k$();
  };
  protoOf(HashMapKeysDefault$iterator$1).next_20eer_k$ = function () {
    return this.$entryIterator_1.next_20eer_k$().get_key_18j28a_k$();
  };
  protoOf(HashMapKeysDefault$iterator$1).remove_ldkf9o_k$ = function () {
    return this.$entryIterator_1.remove_ldkf9o_k$();
  };
  function HashMapKeysDefault(backingMap) {
    AbstractMutableSet.call(this);
    this.backingMap_1 = backingMap;
  }
  protoOf(HashMapKeysDefault).add_b330zt_k$ = function (element) {
    throw UnsupportedOperationException_init_$Create$_0('Add is not supported on keys');
  };
  protoOf(HashMapKeysDefault).add_utx5q5_k$ = function (element) {
    return this.add_b330zt_k$((element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(HashMapKeysDefault).clear_j9egeb_k$ = function () {
    return this.backingMap_1.clear_j9egeb_k$();
  };
  protoOf(HashMapKeysDefault).contains_vbgn2f_k$ = function (element) {
    return this.backingMap_1.containsKey_aw81wo_k$(element);
  };
  protoOf(HashMapKeysDefault).contains_aljjnj_k$ = function (element) {
    if (!(element == null ? true : !(element == null)))
      return false;
    return this.contains_vbgn2f_k$((element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(HashMapKeysDefault).iterator_jk1svi_k$ = function () {
    var entryIterator = this.backingMap_1.get_entries_p20ztl_k$().iterator_jk1svi_k$();
    return new HashMapKeysDefault$iterator$1(entryIterator);
  };
  protoOf(HashMapKeysDefault).remove_gppy8k_k$ = function (element) {
    this.checkIsMutable_h5js84_k$();
    if (this.backingMap_1.containsKey_aw81wo_k$(element)) {
      this.backingMap_1.remove_gppy8k_k$(element);
      return true;
    }
    return false;
  };
  protoOf(HashMapKeysDefault).remove_cedx0m_k$ = function (element) {
    if (!(element == null ? true : !(element == null)))
      return false;
    return this.remove_gppy8k_k$((element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(HashMapKeysDefault).get_size_woubt6_k$ = function () {
    return this.backingMap_1.get_size_woubt6_k$();
  };
  protoOf(HashMapKeysDefault).checkIsMutable_h5js84_k$ = function () {
    return this.backingMap_1.checkIsMutable_h5js84_k$();
  };
  function _get_backingMap__nfspgq_0($this) {
    return $this.backingMap_1;
  }
  function HashMapValuesDefault$iterator$1($entryIterator) {
    this.$entryIterator_1 = $entryIterator;
  }
  protoOf(HashMapValuesDefault$iterator$1).hasNext_bitz1p_k$ = function () {
    return this.$entryIterator_1.hasNext_bitz1p_k$();
  };
  protoOf(HashMapValuesDefault$iterator$1).next_20eer_k$ = function () {
    return this.$entryIterator_1.next_20eer_k$().get_value_j01efc_k$();
  };
  protoOf(HashMapValuesDefault$iterator$1).remove_ldkf9o_k$ = function () {
    return this.$entryIterator_1.remove_ldkf9o_k$();
  };
  function HashMapValuesDefault(backingMap) {
    AbstractMutableCollection.call(this);
    this.backingMap_1 = backingMap;
  }
  protoOf(HashMapValuesDefault).add_sqnzo4_k$ = function (element) {
    throw UnsupportedOperationException_init_$Create$_0('Add is not supported on values');
  };
  protoOf(HashMapValuesDefault).add_utx5q5_k$ = function (element) {
    return this.add_sqnzo4_k$((element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(HashMapValuesDefault).clear_j9egeb_k$ = function () {
    return this.backingMap_1.clear_j9egeb_k$();
  };
  protoOf(HashMapValuesDefault).contains_m22g8e_k$ = function (element) {
    return this.backingMap_1.containsValue_yf2ykl_k$(element);
  };
  protoOf(HashMapValuesDefault).contains_aljjnj_k$ = function (element) {
    if (!(element == null ? true : !(element == null)))
      return false;
    return this.contains_m22g8e_k$((element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(HashMapValuesDefault).iterator_jk1svi_k$ = function () {
    var entryIterator = this.backingMap_1.get_entries_p20ztl_k$().iterator_jk1svi_k$();
    return new HashMapValuesDefault$iterator$1(entryIterator);
  };
  protoOf(HashMapValuesDefault).get_size_woubt6_k$ = function () {
    return this.backingMap_1.get_size_woubt6_k$();
  };
  protoOf(HashMapValuesDefault).checkIsMutable_h5js84_k$ = function () {
    return this.backingMap_1.checkIsMutable_h5js84_k$();
  };
  function HashSet_init_$Init$(map, $this) {
    AbstractMutableSet.call($this);
    HashSet.call($this);
    $this.internalMap_1 = map;
    return $this;
  }
  function HashSet_init_$Create$(map) {
    return HashSet_init_$Init$(map, objectCreate(protoOf(HashSet)));
  }
  function HashSet_init_$Init$_0($this) {
    HashSet_init_$Init$(InternalHashMap_init_$Create$(), $this);
    return $this;
  }
  function HashSet_init_$Create$_0() {
    return HashSet_init_$Init$_0(objectCreate(protoOf(HashSet)));
  }
  function HashSet_init_$Init$_1(elements, $this) {
    HashSet_init_$Init$(InternalHashMap_init_$Create$_0(elements.get_size_woubt6_k$()), $this);
    var tmp0_iterator = elements.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      $this.internalMap_1.put_4fpzoq_k$(element, true);
    }
    return $this;
  }
  function HashSet_init_$Create$_1(elements) {
    return HashSet_init_$Init$_1(elements, objectCreate(protoOf(HashSet)));
  }
  function HashSet_init_$Init$_2(initialCapacity, loadFactor, $this) {
    HashSet_init_$Init$(InternalHashMap_init_$Create$_2(initialCapacity, loadFactor), $this);
    return $this;
  }
  function HashSet_init_$Create$_2(initialCapacity, loadFactor) {
    return HashSet_init_$Init$_2(initialCapacity, loadFactor, objectCreate(protoOf(HashSet)));
  }
  function HashSet_init_$Init$_3(initialCapacity, $this) {
    HashSet_init_$Init$_2(initialCapacity, 1.0, $this);
    return $this;
  }
  function HashSet_init_$Create$_3(initialCapacity) {
    return HashSet_init_$Init$_3(initialCapacity, objectCreate(protoOf(HashSet)));
  }
  protoOf(HashSet).get_internalMap_kinfuy_k$ = function () {
    return this.internalMap_1;
  };
  protoOf(HashSet).add_utx5q5_k$ = function (element) {
    return this.internalMap_1.put_4fpzoq_k$(element, true) == null;
  };
  protoOf(HashSet).clear_j9egeb_k$ = function () {
    this.internalMap_1.clear_j9egeb_k$();
  };
  protoOf(HashSet).contains_aljjnj_k$ = function (element) {
    return this.internalMap_1.contains_vbgn2f_k$(element);
  };
  protoOf(HashSet).isEmpty_y1axqb_k$ = function () {
    return this.internalMap_1.get_size_woubt6_k$() === 0;
  };
  protoOf(HashSet).iterator_jk1svi_k$ = function () {
    return this.internalMap_1.keysIterator_mjslfm_k$();
  };
  protoOf(HashSet).remove_cedx0m_k$ = function (element) {
    return !(this.internalMap_1.remove_gppy8k_k$(element) == null);
  };
  protoOf(HashSet).get_size_woubt6_k$ = function () {
    return this.internalMap_1.get_size_woubt6_k$();
  };
  function HashSet() {
  }
  function _get_MAGIC__u1807w($this) {
    return $this.MAGIC_1;
  }
  function _get_INITIAL_CAPACITY__cjfwmu($this) {
    return $this.INITIAL_CAPACITY_1;
  }
  function _get_INITIAL_MAX_PROBE_DISTANCE__m8imof($this) {
    return $this.INITIAL_MAX_PROBE_DISTANCE_1;
  }
  function _get_TOMBSTONE__4dd6nw($this) {
    return $this.TOMBSTONE_1;
  }
  function computeHashSize($this, capacity) {
    return takeHighestOneBit(imul(coerceAtLeast(capacity, 1), 3));
  }
  function computeShift($this, hashSize) {
    // Inline function 'kotlin.countLeadingZeroBits' call
    return clz32(hashSize) + 1 | 0;
  }
  function _set_expectedModCount__2cl3f2($this, _set____db54di) {
    $this.expectedModCount_1 = _set____db54di;
  }
  function _get_expectedModCount__qqj5nq($this) {
    return $this.expectedModCount_1;
  }
  function _get_map__e6co1h($this) {
    return $this.map_1;
  }
  function _get_index__g2optt($this) {
    return $this.index_1;
  }
  function _set_keysArray__eje9b4($this, _set____db54di) {
    $this.keysArray_1 = _set____db54di;
  }
  function _get_keysArray__r6vc9g($this) {
    return $this.keysArray_1;
  }
  function _set_valuesArray__3mvrle($this, _set____db54di) {
    $this.valuesArray_1 = _set____db54di;
  }
  function _get_valuesArray__qnieqi($this) {
    return $this.valuesArray_1;
  }
  function _set_presenceArray__8v6hax($this, _set____db54di) {
    $this.presenceArray_1 = _set____db54di;
  }
  function _get_presenceArray__o2xzt9($this) {
    return $this.presenceArray_1;
  }
  function _set_hashArray__mk2fy2($this, _set____db54di) {
    $this.hashArray_1 = _set____db54di;
  }
  function _get_hashArray__j675mi($this) {
    return $this.hashArray_1;
  }
  function _set_maxProbeDistance__m5lu0m($this, _set____db54di) {
    $this.maxProbeDistance_1 = _set____db54di;
  }
  function _get_maxProbeDistance__jsdyvq($this) {
    return $this.maxProbeDistance_1;
  }
  function _set_length__xo12bz($this, _set____db54di) {
    $this.length_1 = _set____db54di;
  }
  function _get_length__w7ahp7($this) {
    return $this.length_1;
  }
  function _set_hashShift__ux81td($this, _set____db54di) {
    $this.hashShift_1 = _set____db54di;
  }
  function _get_hashShift__at1jr7($this) {
    return $this.hashShift_1;
  }
  function _set_modCount__bz8h4m($this, _set____db54di) {
    $this.modCount_1 = _set____db54di;
  }
  function _get_modCount__os4sle($this) {
    return $this.modCount_1;
  }
  function _set__size__bau3qd_0($this, _set____db54di) {
    $this._size_1 = _set____db54di;
  }
  function _get__size__kqacr3_0($this) {
    return $this._size_1;
  }
  function _set_isReadOnly__fb15ed_0($this, _set____db54di) {
    $this.isReadOnly_1 = _set____db54di;
  }
  function _get_isReadOnly__ud9qjl_0($this) {
    return $this.isReadOnly_1;
  }
  function InternalHashMap_init_$Init$($this) {
    InternalHashMap_init_$Init$_0(8, $this);
    return $this;
  }
  function InternalHashMap_init_$Create$() {
    return InternalHashMap_init_$Init$(objectCreate(protoOf(InternalHashMap)));
  }
  function InternalHashMap_init_$Init$_0(initialCapacity, $this) {
    InternalHashMap.call($this, arrayOfUninitializedElements(initialCapacity), null, new Int32Array(initialCapacity), new Int32Array(computeHashSize(Companion_getInstance_0(), initialCapacity)), 2, 0);
    return $this;
  }
  function InternalHashMap_init_$Create$_0(initialCapacity) {
    return InternalHashMap_init_$Init$_0(initialCapacity, objectCreate(protoOf(InternalHashMap)));
  }
  function InternalHashMap_init_$Init$_1(original, $this) {
    InternalHashMap_init_$Init$_0(original.get_size_woubt6_k$(), $this);
    $this.putAll_wgg6cj_k$(original);
    return $this;
  }
  function InternalHashMap_init_$Create$_1(original) {
    return InternalHashMap_init_$Init$_1(original, objectCreate(protoOf(InternalHashMap)));
  }
  function InternalHashMap_init_$Init$_2(initialCapacity, loadFactor, $this) {
    InternalHashMap_init_$Init$_0(initialCapacity, $this);
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(loadFactor > 0.0)) {
      // Inline function 'kotlin.collections.InternalHashMap.<init>.<anonymous>' call
      var message = 'Non-positive load factor: ' + loadFactor;
      throw IllegalArgumentException_init_$Create$_0(toString_2(message));
    }
    return $this;
  }
  function InternalHashMap_init_$Create$_2(initialCapacity, loadFactor) {
    return InternalHashMap_init_$Init$_2(initialCapacity, loadFactor, objectCreate(protoOf(InternalHashMap)));
  }
  function _get_capacity__a9k9f3($this) {
    return $this.keysArray_1.length;
  }
  function _get_hashSize__tftcho($this) {
    return $this.hashArray_1.length;
  }
  function registerModification($this) {
    $this.modCount_1 = $this.modCount_1 + 1 | 0;
  }
  function ensureExtraCapacity($this, n) {
    if (shouldCompact($this, n)) {
      rehash($this, _get_hashSize__tftcho($this));
    } else {
      ensureCapacity($this, $this.length_1 + n | 0);
    }
  }
  function shouldCompact($this, extraCapacity) {
    var spareCapacity = _get_capacity__a9k9f3($this) - $this.length_1 | 0;
    var gaps = $this.length_1 - $this.get_size_woubt6_k$() | 0;
    return (spareCapacity < extraCapacity ? (gaps + spareCapacity | 0) >= extraCapacity : false) ? gaps >= (_get_capacity__a9k9f3($this) / 4 | 0) : false;
  }
  function ensureCapacity($this, minCapacity) {
    if (minCapacity < 0)
      throw RuntimeException_init_$Create$_0('too many elements');
    if (minCapacity > _get_capacity__a9k9f3($this)) {
      var newSize = Companion_getInstance_4().newCapacity_jl318a_k$(_get_capacity__a9k9f3($this), minCapacity);
      $this.keysArray_1 = copyOfUninitializedElements($this.keysArray_1, newSize);
      var tmp = $this;
      var tmp0_safe_receiver = $this.valuesArray_1;
      tmp.valuesArray_1 = tmp0_safe_receiver == null ? null : copyOfUninitializedElements(tmp0_safe_receiver, newSize);
      $this.presenceArray_1 = copyOf($this.presenceArray_1, newSize);
      var newHashSize = computeHashSize(Companion_getInstance_0(), newSize);
      if (newHashSize > _get_hashSize__tftcho($this)) {
        rehash($this, newHashSize);
      }
    }
  }
  function allocateValuesArray($this) {
    var curValuesArray = $this.valuesArray_1;
    if (!(curValuesArray == null))
      return curValuesArray;
    var newValuesArray = arrayOfUninitializedElements(_get_capacity__a9k9f3($this));
    $this.valuesArray_1 = newValuesArray;
    return newValuesArray;
  }
  function hash($this, key) {
    return key == null ? 0 : imul(hashCode(key), -1640531527) >>> $this.hashShift_1 | 0;
  }
  function compact($this) {
    var i = 0;
    var j = 0;
    var valuesArray = $this.valuesArray_1;
    while (i < $this.length_1) {
      if ($this.presenceArray_1[i] >= 0) {
        $this.keysArray_1[j] = $this.keysArray_1[i];
        if (!(valuesArray == null)) {
          valuesArray[j] = valuesArray[i];
        }
        j = j + 1 | 0;
      }
      i = i + 1 | 0;
    }
    resetRange($this.keysArray_1, j, $this.length_1);
    if (valuesArray == null)
      null;
    else {
      resetRange(valuesArray, j, $this.length_1);
    }
    $this.length_1 = j;
  }
  function rehash($this, newHashSize) {
    registerModification($this);
    if ($this.length_1 > $this._size_1) {
      compact($this);
    }
    if (!(newHashSize === _get_hashSize__tftcho($this))) {
      $this.hashArray_1 = new Int32Array(newHashSize);
      $this.hashShift_1 = computeShift(Companion_getInstance_0(), newHashSize);
    } else {
      fill($this.hashArray_1, 0, 0, _get_hashSize__tftcho($this));
    }
    var i = 0;
    while (i < $this.length_1) {
      var tmp0 = i;
      i = tmp0 + 1 | 0;
      if (!putRehash($this, tmp0)) {
        throw IllegalStateException_init_$Create$_0('This cannot happen with fixed magic multiplier and grow-only hash array. Have object hashCodes changed?');
      }
    }
  }
  function putRehash($this, i) {
    var hash_0 = hash($this, $this.keysArray_1[i]);
    var probesLeft = $this.maxProbeDistance_1;
    while (true) {
      var index = $this.hashArray_1[hash_0];
      if (index === 0) {
        $this.hashArray_1[hash_0] = i + 1 | 0;
        $this.presenceArray_1[i] = hash_0;
        return true;
      }
      probesLeft = probesLeft - 1 | 0;
      if (probesLeft < 0)
        return false;
      var tmp0 = hash_0;
      hash_0 = tmp0 - 1 | 0;
      if (tmp0 === 0)
        hash_0 = _get_hashSize__tftcho($this) - 1 | 0;
    }
  }
  function findKey($this, key) {
    var hash_0 = hash($this, key);
    var probesLeft = $this.maxProbeDistance_1;
    while (true) {
      var index = $this.hashArray_1[hash_0];
      if (index === 0)
        return -1;
      if (index > 0 ? equals($this.keysArray_1[index - 1 | 0], key) : false)
        return index - 1 | 0;
      probesLeft = probesLeft - 1 | 0;
      if (probesLeft < 0)
        return -1;
      var tmp0 = hash_0;
      hash_0 = tmp0 - 1 | 0;
      if (tmp0 === 0)
        hash_0 = _get_hashSize__tftcho($this) - 1 | 0;
    }
  }
  function findValue($this, value) {
    var i = $this.length_1;
    $l$loop: while (true) {
      i = i - 1 | 0;
      if (!(i >= 0)) {
        break $l$loop;
      }
      if ($this.presenceArray_1[i] >= 0 ? equals(ensureNotNull($this.valuesArray_1)[i], value) : false)
        return i;
    }
    return -1;
  }
  function addKey($this, key) {
    $this.checkIsMutable_h5js84_k$();
    retry: while (true) {
      var hash_0 = hash($this, key);
      var tentativeMaxProbeDistance = coerceAtMost(imul($this.maxProbeDistance_1, 2), _get_hashSize__tftcho($this) / 2 | 0);
      var probeDistance = 0;
      while (true) {
        var index = $this.hashArray_1[hash_0];
        if (index <= 0) {
          if ($this.length_1 >= _get_capacity__a9k9f3($this)) {
            ensureExtraCapacity($this, 1);
            continue retry;
          }
          var tmp1 = $this.length_1;
          $this.length_1 = tmp1 + 1 | 0;
          var putIndex = tmp1;
          $this.keysArray_1[putIndex] = key;
          $this.presenceArray_1[putIndex] = hash_0;
          $this.hashArray_1[hash_0] = putIndex + 1 | 0;
          $this._size_1 = $this._size_1 + 1 | 0;
          registerModification($this);
          if (probeDistance > $this.maxProbeDistance_1)
            $this.maxProbeDistance_1 = probeDistance;
          return putIndex;
        }
        if (equals($this.keysArray_1[index - 1 | 0], key)) {
          return -index | 0;
        }
        probeDistance = probeDistance + 1 | 0;
        if (probeDistance > tentativeMaxProbeDistance) {
          rehash($this, imul(_get_hashSize__tftcho($this), 2));
          continue retry;
        }
        var tmp4 = hash_0;
        hash_0 = tmp4 - 1 | 0;
        if (tmp4 === 0)
          hash_0 = _get_hashSize__tftcho($this) - 1 | 0;
      }
    }
  }
  function removeKey($this, key) {
    $this.checkIsMutable_h5js84_k$();
    var index = findKey($this, key);
    if (index < 0)
      return -1;
    removeKeyAt($this, index);
    return index;
  }
  function removeKeyAt($this, index) {
    resetAt($this.keysArray_1, index);
    removeHashAt($this, $this.presenceArray_1[index]);
    $this.presenceArray_1[index] = -1;
    $this._size_1 = $this._size_1 - 1 | 0;
    registerModification($this);
  }
  function removeHashAt($this, removedHash) {
    var hash_0 = removedHash;
    var hole = removedHash;
    var probeDistance = 0;
    var patchAttemptsLeft = coerceAtMost(imul($this.maxProbeDistance_1, 2), _get_hashSize__tftcho($this) / 2 | 0);
    while (true) {
      var tmp0 = hash_0;
      hash_0 = tmp0 - 1 | 0;
      if (tmp0 === 0)
        hash_0 = _get_hashSize__tftcho($this) - 1 | 0;
      probeDistance = probeDistance + 1 | 0;
      if (probeDistance > $this.maxProbeDistance_1) {
        $this.hashArray_1[hole] = 0;
        return Unit_getInstance();
      }
      var index = $this.hashArray_1[hash_0];
      if (index === 0) {
        $this.hashArray_1[hole] = 0;
        return Unit_getInstance();
      }
      if (index < 0) {
        $this.hashArray_1[hole] = -1;
        hole = hash_0;
        probeDistance = 0;
      } else {
        var otherHash = hash($this, $this.keysArray_1[index - 1 | 0]);
        if (((otherHash - hash_0 | 0) & (_get_hashSize__tftcho($this) - 1 | 0)) >= probeDistance) {
          $this.hashArray_1[hole] = index;
          $this.presenceArray_1[index - 1 | 0] = hole;
          hole = hash_0;
          probeDistance = 0;
        }
      }
      patchAttemptsLeft = patchAttemptsLeft - 1 | 0;
      if (patchAttemptsLeft < 0) {
        $this.hashArray_1[hole] = -1;
        return Unit_getInstance();
      }
    }
  }
  function contentEquals($this, other) {
    return $this._size_1 === other.get_size_woubt6_k$() ? $this.containsAllEntries_5fw0no_k$(other.get_entries_p20ztl_k$()) : false;
  }
  function putEntry($this, entry) {
    var index = addKey($this, entry.get_key_18j28a_k$());
    var valuesArray = allocateValuesArray($this);
    if (index >= 0) {
      valuesArray[index] = entry.get_value_j01efc_k$();
      return true;
    }
    var oldValue = valuesArray[(-index | 0) - 1 | 0];
    if (!equals(entry.get_value_j01efc_k$(), oldValue)) {
      valuesArray[(-index | 0) - 1 | 0] = entry.get_value_j01efc_k$();
      return true;
    }
    return false;
  }
  function putAllEntries($this, from) {
    if (from.isEmpty_y1axqb_k$())
      return false;
    ensureExtraCapacity($this, from.get_size_woubt6_k$());
    var it = from.iterator_jk1svi_k$();
    var updated = false;
    while (it.hasNext_bitz1p_k$()) {
      if (putEntry($this, it.next_20eer_k$()))
        updated = true;
    }
    return updated;
  }
  function Companion_0() {
    Companion_instance_0 = this;
    this.MAGIC_1 = -1640531527;
    this.INITIAL_CAPACITY_1 = 8;
    this.INITIAL_MAX_PROBE_DISTANCE_1 = 2;
    this.TOMBSTONE_1 = -1;
  }
  var Companion_instance_0;
  function Companion_getInstance_0() {
    if (Companion_instance_0 == null)
      new Companion_0();
    return Companion_instance_0;
  }
  function Itr(map) {
    this.map_1 = map;
    this.index_1 = 0;
    this.lastIndex_1 = -1;
    this.expectedModCount_1 = this.map_1.modCount_1;
    this.initNext_95pjyr_k$();
  }
  protoOf(Itr).get_map_18j0ul_k$ = function () {
    return this.map_1;
  };
  protoOf(Itr).set_index_69f5xp_k$ = function (_set____db54di) {
    this.index_1 = _set____db54di;
  };
  protoOf(Itr).get_index_it478p_k$ = function () {
    return this.index_1;
  };
  protoOf(Itr).set_lastIndex_mit0mh_k$ = function (_set____db54di) {
    this.lastIndex_1 = _set____db54di;
  };
  protoOf(Itr).get_lastIndex_tk4gr1_k$ = function () {
    return this.lastIndex_1;
  };
  protoOf(Itr).initNext_95pjyr_k$ = function () {
    while (this.index_1 < this.map_1.length_1 ? this.map_1.presenceArray_1[this.index_1] < 0 : false) {
      this.index_1 = this.index_1 + 1 | 0;
    }
  };
  protoOf(Itr).hasNext_bitz1p_k$ = function () {
    return this.index_1 < this.map_1.length_1;
  };
  protoOf(Itr).remove_ldkf9o_k$ = function () {
    this.checkForComodification_ue3neh_k$();
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!(this.lastIndex_1 === -1)) {
      // Inline function 'kotlin.collections.Itr.remove.<anonymous>' call
      var message = 'Call next() before removing element from the iterator.';
      throw IllegalStateException_init_$Create$_0(toString_2(message));
    }
    this.map_1.checkIsMutable_h5js84_k$();
    removeKeyAt(this.map_1, this.lastIndex_1);
    this.lastIndex_1 = -1;
    this.expectedModCount_1 = this.map_1.modCount_1;
  };
  protoOf(Itr).checkForComodification_ue3neh_k$ = function () {
    if (!(this.map_1.modCount_1 === this.expectedModCount_1))
      throw ConcurrentModificationException_init_$Create$();
  };
  function KeysItr(map) {
    Itr.call(this, map);
  }
  protoOf(KeysItr).next_20eer_k$ = function () {
    this.checkForComodification_ue3neh_k$();
    if (this.index_1 >= this.map_1.length_1)
      throw NoSuchElementException_init_$Create$();
    var tmp = this;
    var tmp1 = this.index_1;
    this.index_1 = tmp1 + 1 | 0;
    tmp.lastIndex_1 = tmp1;
    var result = this.map_1.keysArray_1[this.lastIndex_1];
    this.initNext_95pjyr_k$();
    return result;
  };
  function ValuesItr(map) {
    Itr.call(this, map);
  }
  protoOf(ValuesItr).next_20eer_k$ = function () {
    this.checkForComodification_ue3neh_k$();
    if (this.index_1 >= this.map_1.length_1)
      throw NoSuchElementException_init_$Create$();
    var tmp = this;
    var tmp1 = this.index_1;
    this.index_1 = tmp1 + 1 | 0;
    tmp.lastIndex_1 = tmp1;
    var result = ensureNotNull(this.map_1.valuesArray_1)[this.lastIndex_1];
    this.initNext_95pjyr_k$();
    return result;
  };
  function EntriesItr(map) {
    Itr.call(this, map);
  }
  protoOf(EntriesItr).next_20eer_k$ = function () {
    this.checkForComodification_ue3neh_k$();
    if (this.index_1 >= this.map_1.length_1)
      throw NoSuchElementException_init_$Create$();
    var tmp = this;
    var tmp1 = this.index_1;
    this.index_1 = tmp1 + 1 | 0;
    tmp.lastIndex_1 = tmp1;
    var result = new EntryRef(this.map_1, this.lastIndex_1);
    this.initNext_95pjyr_k$();
    return result;
  };
  protoOf(EntriesItr).nextHashCode_esvjde_k$ = function () {
    if (this.index_1 >= this.map_1.length_1)
      throw NoSuchElementException_init_$Create$();
    var tmp = this;
    var tmp1 = this.index_1;
    this.index_1 = tmp1 + 1 | 0;
    tmp.lastIndex_1 = tmp1;
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver = this.map_1.keysArray_1[this.lastIndex_1];
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    var tmp_0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver_0 = ensureNotNull(this.map_1.valuesArray_1)[this.lastIndex_1];
    var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode(tmp0_safe_receiver_0);
    var result = tmp_0 ^ (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0);
    this.initNext_95pjyr_k$();
    return result;
  };
  protoOf(EntriesItr).nextAppendString_c748pk_k$ = function (sb) {
    if (this.index_1 >= this.map_1.length_1)
      throw NoSuchElementException_init_$Create$();
    var tmp = this;
    var tmp1 = this.index_1;
    this.index_1 = tmp1 + 1 | 0;
    tmp.lastIndex_1 = tmp1;
    var key = this.map_1.keysArray_1[this.lastIndex_1];
    if (equals(key, this.map_1)) {
      sb.append_22ad7x_k$('(this Map)');
    } else {
      sb.append_t8pm91_k$(key);
    }
    sb.append_am5a4z_k$(_Char___init__impl__6a9atx(61));
    var value = ensureNotNull(this.map_1.valuesArray_1)[this.lastIndex_1];
    if (equals(value, this.map_1)) {
      sb.append_22ad7x_k$('(this Map)');
    } else {
      sb.append_t8pm91_k$(value);
    }
    this.initNext_95pjyr_k$();
  };
  function EntryRef(map, index) {
    this.map_1 = map;
    this.index_1 = index;
  }
  protoOf(EntryRef).get_key_18j28a_k$ = function () {
    return this.map_1.keysArray_1[this.index_1];
  };
  protoOf(EntryRef).get_value_j01efc_k$ = function () {
    return ensureNotNull(this.map_1.valuesArray_1)[this.index_1];
  };
  protoOf(EntryRef).setValue_9cjski_k$ = function (newValue) {
    this.map_1.checkIsMutable_h5js84_k$();
    var valuesArray = allocateValuesArray(this.map_1);
    var oldValue = valuesArray[this.index_1];
    valuesArray[this.index_1] = newValue;
    return oldValue;
  };
  protoOf(EntryRef).equals = function (other) {
    var tmp;
    var tmp_0;
    if (!(other == null) ? isInterface(other, Entry) : false) {
      tmp_0 = equals(other.get_key_18j28a_k$(), this.get_key_18j28a_k$());
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = equals(other.get_value_j01efc_k$(), this.get_value_j01efc_k$());
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(EntryRef).hashCode = function () {
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver = this.get_key_18j28a_k$();
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    var tmp = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver_0 = this.get_value_j01efc_k$();
    var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode(tmp0_safe_receiver_0);
    return tmp ^ (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0);
  };
  protoOf(EntryRef).toString = function () {
    return '' + this.get_key_18j28a_k$() + '=' + this.get_value_j01efc_k$();
  };
  function InternalHashMap(keysArray, valuesArray, presenceArray, hashArray, maxProbeDistance, length) {
    Companion_getInstance_0();
    this.keysArray_1 = keysArray;
    this.valuesArray_1 = valuesArray;
    this.presenceArray_1 = presenceArray;
    this.hashArray_1 = hashArray;
    this.maxProbeDistance_1 = maxProbeDistance;
    this.length_1 = length;
    this.hashShift_1 = computeShift(Companion_getInstance_0(), _get_hashSize__tftcho(this));
    this.modCount_1 = 0;
    this._size_1 = 0;
    this.isReadOnly_1 = false;
  }
  protoOf(InternalHashMap).get_size_woubt6_k$ = function () {
    return this._size_1;
  };
  protoOf(InternalHashMap).build_52xuhq_k$ = function () {
    this.checkIsMutable_h5js84_k$();
    this.isReadOnly_1 = true;
  };
  protoOf(InternalHashMap).isEmpty_y1axqb_k$ = function () {
    return this._size_1 === 0;
  };
  protoOf(InternalHashMap).containsValue_yf2ykl_k$ = function (value) {
    return findValue(this, value) >= 0;
  };
  protoOf(InternalHashMap).get_wei43m_k$ = function (key) {
    var index = findKey(this, key);
    if (index < 0)
      return null;
    return ensureNotNull(this.valuesArray_1)[index];
  };
  protoOf(InternalHashMap).contains_vbgn2f_k$ = function (key) {
    return findKey(this, key) >= 0;
  };
  protoOf(InternalHashMap).put_4fpzoq_k$ = function (key, value) {
    var index = addKey(this, key);
    var valuesArray = allocateValuesArray(this);
    if (index < 0) {
      var oldValue = valuesArray[(-index | 0) - 1 | 0];
      valuesArray[(-index | 0) - 1 | 0] = value;
      return oldValue;
    } else {
      valuesArray[index] = value;
      return null;
    }
  };
  protoOf(InternalHashMap).putAll_wgg6cj_k$ = function (from) {
    this.checkIsMutable_h5js84_k$();
    putAllEntries(this, from.get_entries_p20ztl_k$());
  };
  protoOf(InternalHashMap).remove_gppy8k_k$ = function (key) {
    var index = removeKey(this, key);
    if (index < 0)
      return null;
    var valuesArray = ensureNotNull(this.valuesArray_1);
    var oldValue = valuesArray[index];
    resetAt(valuesArray, index);
    return oldValue;
  };
  protoOf(InternalHashMap).clear_j9egeb_k$ = function () {
    this.checkIsMutable_h5js84_k$();
    var inductionVariable = 0;
    var last = this.length_1 - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var hash = this.presenceArray_1[i];
        if (hash >= 0) {
          this.hashArray_1[hash] = 0;
          this.presenceArray_1[i] = -1;
        }
      }
       while (!(i === last));
    resetRange(this.keysArray_1, 0, this.length_1);
    var tmp1_safe_receiver = this.valuesArray_1;
    if (tmp1_safe_receiver == null)
      null;
    else {
      resetRange(tmp1_safe_receiver, 0, this.length_1);
    }
    this._size_1 = 0;
    this.length_1 = 0;
    registerModification(this);
  };
  protoOf(InternalHashMap).equals = function (other) {
    var tmp;
    if (other === this) {
      tmp = true;
    } else {
      var tmp_0;
      if (!(other == null) ? isInterface(other, Map_0) : false) {
        tmp_0 = contentEquals(this, other);
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(InternalHashMap).hashCode = function () {
    var result = 0;
    var it = this.entriesIterator_or017i_k$();
    while (it.hasNext_bitz1p_k$()) {
      result = result + it.nextHashCode_esvjde_k$() | 0;
    }
    return result;
  };
  protoOf(InternalHashMap).toString = function () {
    var sb = StringBuilder_init_$Create$(2 + imul(this._size_1, 3) | 0);
    sb.append_22ad7x_k$('{');
    var i = 0;
    var it = this.entriesIterator_or017i_k$();
    while (it.hasNext_bitz1p_k$()) {
      if (i > 0) {
        sb.append_22ad7x_k$(', ');
      }
      it.nextAppendString_c748pk_k$(sb);
      i = i + 1 | 0;
    }
    sb.append_22ad7x_k$('}');
    return sb.toString();
  };
  protoOf(InternalHashMap).checkIsMutable_h5js84_k$ = function () {
    if (this.isReadOnly_1)
      throw UnsupportedOperationException_init_$Create$();
  };
  protoOf(InternalHashMap).containsEntry_jg6xfi_k$ = function (entry) {
    var index = findKey(this, entry.get_key_18j28a_k$());
    if (index < 0)
      return false;
    return equals(ensureNotNull(this.valuesArray_1)[index], entry.get_value_j01efc_k$());
  };
  protoOf(InternalHashMap).containsOtherEntry_yvdc55_k$ = function (entry) {
    return this.containsEntry_jg6xfi_k$(isInterface(entry, Entry) ? entry : THROW_CCE());
  };
  protoOf(InternalHashMap).removeEntry_dxtz15_k$ = function (entry) {
    this.checkIsMutable_h5js84_k$();
    var index = findKey(this, entry.get_key_18j28a_k$());
    if (index < 0)
      return false;
    if (!equals(ensureNotNull(this.valuesArray_1)[index], entry.get_value_j01efc_k$()))
      return false;
    removeKeyAt(this, index);
    return true;
  };
  protoOf(InternalHashMap).removeValue_ccp5hc_k$ = function (value) {
    this.checkIsMutable_h5js84_k$();
    var index = findValue(this, value);
    if (index < 0)
      return false;
    removeKeyAt(this, index);
    return true;
  };
  protoOf(InternalHashMap).keysIterator_mjslfm_k$ = function () {
    return new KeysItr(this);
  };
  protoOf(InternalHashMap).valuesIterator_3ptos0_k$ = function () {
    return new ValuesItr(this);
  };
  protoOf(InternalHashMap).entriesIterator_or017i_k$ = function () {
    return new EntriesItr(this);
  };
  function InternalMap() {
  }
  function LinkedHashMap_init_$Init$($this) {
    HashMap_init_$Init$_0($this);
    LinkedHashMap.call($this);
    return $this;
  }
  function LinkedHashMap_init_$Create$() {
    return LinkedHashMap_init_$Init$(objectCreate(protoOf(LinkedHashMap)));
  }
  function LinkedHashMap_init_$Init$_0(initialCapacity, $this) {
    HashMap_init_$Init$_2(initialCapacity, $this);
    LinkedHashMap.call($this);
    return $this;
  }
  function LinkedHashMap_init_$Create$_0(initialCapacity) {
    return LinkedHashMap_init_$Init$_0(initialCapacity, objectCreate(protoOf(LinkedHashMap)));
  }
  function LinkedHashMap_init_$Init$_1(initialCapacity, loadFactor, $this) {
    HashMap_init_$Init$_1(initialCapacity, loadFactor, $this);
    LinkedHashMap.call($this);
    return $this;
  }
  function LinkedHashMap_init_$Create$_1(initialCapacity, loadFactor) {
    return LinkedHashMap_init_$Init$_1(initialCapacity, loadFactor, objectCreate(protoOf(LinkedHashMap)));
  }
  function LinkedHashMap_init_$Init$_2(original, $this) {
    HashMap_init_$Init$_3(original, $this);
    LinkedHashMap.call($this);
    return $this;
  }
  function LinkedHashMap_init_$Create$_2(original) {
    return LinkedHashMap_init_$Init$_2(original, objectCreate(protoOf(LinkedHashMap)));
  }
  function LinkedHashMap_init_$Init$_3(internalMap, $this) {
    HashMap_init_$Init$(internalMap, $this);
    LinkedHashMap.call($this);
    return $this;
  }
  function LinkedHashMap_init_$Create$_3(internalMap) {
    return LinkedHashMap_init_$Init$_3(internalMap, objectCreate(protoOf(LinkedHashMap)));
  }
  function EmptyHolder() {
    EmptyHolder_instance = this;
    var tmp = this;
    // Inline function 'kotlin.also' call
    var this_0 = InternalHashMap_init_$Create$_0(0);
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.collections.EmptyHolder.value.<anonymous>' call
    this_0.build_52xuhq_k$();
    tmp.value_1 = LinkedHashMap_init_$Create$_3(this_0);
  }
  protoOf(EmptyHolder).get_value_j01efc_k$ = function () {
    return this.value_1;
  };
  var EmptyHolder_instance;
  function EmptyHolder_getInstance() {
    if (EmptyHolder_instance == null)
      new EmptyHolder();
    return EmptyHolder_instance;
  }
  protoOf(LinkedHashMap).build_1k0s4u_k$ = function () {
    this.internalMap_1.build_52xuhq_k$();
    var tmp;
    if (this.get_size_woubt6_k$() > 0) {
      tmp = this;
    } else {
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp = EmptyHolder_getInstance().value_1;
    }
    return tmp;
  };
  protoOf(LinkedHashMap).checkIsMutable_h5js84_k$ = function () {
    return this.internalMap_1.checkIsMutable_h5js84_k$();
  };
  function LinkedHashMap() {
  }
  function RandomAccess() {
  }
  function set_output(_set____db54di) {
    _init_properties_console_kt__rfg7jv();
    output = _set____db54di;
  }
  function get_output() {
    _init_properties_console_kt__rfg7jv();
    return output;
  }
  var output;
  function BaseOutput() {
  }
  protoOf(BaseOutput).println_uvj9r3_k$ = function () {
    this.print_o1pwgy_k$('\n');
  };
  protoOf(BaseOutput).println_ghnc0w_k$ = function (message) {
    this.print_o1pwgy_k$(message);
    this.println_uvj9r3_k$();
  };
  protoOf(BaseOutput).flush_shahbo_k$ = function () {
  };
  function NodeJsOutput(outputStream) {
    BaseOutput.call(this);
    this.outputStream_1 = outputStream;
  }
  protoOf(NodeJsOutput).get_outputStream_2dy5nu_k$ = function () {
    return this.outputStream_1;
  };
  protoOf(NodeJsOutput).print_o1pwgy_k$ = function (message) {
    // Inline function 'kotlin.io.String' call
    var messageString = String(message);
    this.outputStream_1.write(messageString);
  };
  function BufferedOutputToConsoleLog() {
    BufferedOutput.call(this);
  }
  protoOf(BufferedOutputToConsoleLog).print_o1pwgy_k$ = function (message) {
    // Inline function 'kotlin.io.String' call
    var s = String(message);
    // Inline function 'kotlin.text.nativeLastIndexOf' call
    // Inline function 'kotlin.js.asDynamic' call
    var i = s.lastIndexOf('\n', 0);
    if (i >= 0) {
      var tmp = this;
      var tmp_0 = this.buffer_1;
      // Inline function 'kotlin.text.substring' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp.buffer_1 = tmp_0 + s.substring(0, i);
      this.flush_shahbo_k$();
      // Inline function 'kotlin.text.substring' call
      var this_0 = s;
      var startIndex = i + 1 | 0;
      // Inline function 'kotlin.js.asDynamic' call
      s = this_0.substring(startIndex);
    }
    this.buffer_1 = this.buffer_1 + s;
  };
  protoOf(BufferedOutputToConsoleLog).flush_shahbo_k$ = function () {
    console.log(this.buffer_1);
    this.buffer_1 = '';
  };
  function String_0(value) {
    _init_properties_console_kt__rfg7jv();
    return String(value);
  }
  function BufferedOutput() {
    BaseOutput.call(this);
    this.buffer_1 = '';
  }
  protoOf(BufferedOutput).set_buffer_25ukzx_k$ = function (_set____db54di) {
    this.buffer_1 = _set____db54di;
  };
  protoOf(BufferedOutput).get_buffer_bmaafd_k$ = function () {
    return this.buffer_1;
  };
  protoOf(BufferedOutput).print_o1pwgy_k$ = function (message) {
    var tmp = this;
    var tmp_0 = this.buffer_1;
    // Inline function 'kotlin.io.String' call
    tmp.buffer_1 = tmp_0 + String(message);
  };
  protoOf(BufferedOutput).flush_shahbo_k$ = function () {
    this.buffer_1 = '';
  };
  var properties_initialized_console_kt_gll9dl;
  function _init_properties_console_kt__rfg7jv() {
    if (!properties_initialized_console_kt_gll9dl) {
      properties_initialized_console_kt_gll9dl = true;
      // Inline function 'kotlin.run' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlin.io.output.<anonymous>' call
      var isNode = typeof process !== 'undefined' && process.versions && !!process.versions.node;
      output = isNode ? new NodeJsOutput(process.stdout) : new BufferedOutputToConsoleLog();
    }
  }
  function get_EmptyContinuation() {
    _init_properties_EmptyContinuation_kt__o181ce();
    return EmptyContinuation;
  }
  var EmptyContinuation;
  function _no_name_provided__qut3iv($context) {
    this.$context_1 = $context;
  }
  protoOf(_no_name_provided__qut3iv).get_context_h02k06_k$ = function () {
    return this.$context_1;
  };
  protoOf(_no_name_provided__qut3iv).resumeWith_b9cu3x_k$ = function (result) {
    // Inline function 'kotlin.getOrThrow' call
    throwOnFailure(result);
    var tmp = _Result___get_value__impl__bjfvqg(result);
    (tmp == null ? true : !(tmp == null)) || THROW_CCE();
    return Unit_getInstance();
  };
  protoOf(_no_name_provided__qut3iv).resumeWith_dtxwbr_k$ = function (result) {
    return this.resumeWith_b9cu3x_k$(result);
  };
  var properties_initialized_EmptyContinuation_kt_4jdb9w;
  function _init_properties_EmptyContinuation_kt__o181ce() {
    if (!properties_initialized_EmptyContinuation_kt_4jdb9w) {
      properties_initialized_EmptyContinuation_kt_4jdb9w = true;
      // Inline function 'kotlin.coroutines.Continuation' call
      var context = EmptyCoroutineContext_getInstance();
      EmptyContinuation = new _no_name_provided__qut3iv(context);
    }
  }
  function asDynamic(_this__u8e3s4) {
    return _this__u8e3s4;
  }
  function unsafeCastDynamic(_this__u8e3s4) {
    return _this__u8e3s4;
  }
  function unsafeCast(_this__u8e3s4) {
    // Inline function 'kotlin.js.asDynamic' call
    return _this__u8e3s4;
  }
  function EnumEntriesSerializationProxy(entries) {
  }
  function JsPolyfill(implementation) {
    this.implementation_1 = implementation;
  }
  protoOf(JsPolyfill).get_implementation_9txf7p_k$ = function () {
    return this.implementation_1;
  };
  protoOf(JsPolyfill).equals = function (other) {
    if (!(other instanceof JsPolyfill))
      return false;
    var tmp0_other_with_cast = other instanceof JsPolyfill ? other : THROW_CCE();
    if (!(this.implementation_1 === tmp0_other_with_cast.implementation_1))
      return false;
    return true;
  };
  protoOf(JsPolyfill).hashCode = function () {
    return imul(getStringHashCode('implementation'), 127) ^ getStringHashCode(this.implementation_1);
  };
  protoOf(JsPolyfill).toString = function () {
    return '@kotlin.js.JsPolyfill(implementation=' + this.implementation_1 + ')';
  };
  function Serializable() {
  }
  function platformEncodeToByteArray(_this__u8e3s4, source, startIndex, endIndex) {
    return _this__u8e3s4.encodeToByteArrayImpl_ebqasg_k$(source, startIndex, endIndex);
  }
  function platformEncodeIntoByteArray(_this__u8e3s4, source, destination, destinationOffset, startIndex, endIndex) {
    return _this__u8e3s4.encodeIntoByteArrayImpl_lkr6v7_k$(source, destination, destinationOffset, startIndex, endIndex);
  }
  function platformEncodeToString(_this__u8e3s4, source, startIndex, endIndex) {
    var byteResult = _this__u8e3s4.encodeToByteArrayImpl_ebqasg_k$(source, startIndex, endIndex);
    return _this__u8e3s4.bytesToStringImpl_fo2bjd_k$(byteResult);
  }
  function platformCharsToBytes(_this__u8e3s4, source, startIndex, endIndex) {
    return _this__u8e3s4.charsToBytesImpl_xmdp06_k$(source, startIndex, endIndex);
  }
  function nativeFill(_this__u8e3s4, element, fromIndex, toIndex) {
    // Inline function 'kotlin.js.asDynamic' call
    _this__u8e3s4.fill(element, fromIndex, toIndex);
  }
  function nativeSort(_this__u8e3s4, comparison) {
    comparison = comparison === VOID ? undefined : comparison;
    // Inline function 'kotlin.js.asDynamic' call
    _this__u8e3s4.sort(comparison);
  }
  function pow(_this__u8e3s4, n) {
    return Math.pow(_this__u8e3s4, n);
  }
  function roundToInt(_this__u8e3s4) {
    var tmp;
    if (isNaN_0(_this__u8e3s4)) {
      throw IllegalArgumentException_init_$Create$_0('Cannot round NaN value.');
    } else if (_this__u8e3s4 > IntCompanionObject_getInstance().MAX_VALUE) {
      tmp = IntCompanionObject_getInstance().MAX_VALUE;
    } else if (_this__u8e3s4 < IntCompanionObject_getInstance().MIN_VALUE) {
      tmp = IntCompanionObject_getInstance().MIN_VALUE;
    } else {
      tmp = numberToInt(Math.round(_this__u8e3s4));
    }
    return tmp;
  }
  function max(a, b) {
    return Math.max(a, b);
  }
  function abs(x) {
    return Math.abs(x);
  }
  function min(a, b) {
    return Math.min(a, b);
  }
  function hypot_0(x, y) {
    return hypot(x, y);
  }
  function max_0(a, b) {
    return Math.max(a, b);
  }
  function sqrt(x) {
    return Math.sqrt(x);
  }
  function min_0(a, b) {
    return Math.min(a, b);
  }
  function cos(x) {
    return Math.cos(x);
  }
  function sin(x) {
    return Math.sin(x);
  }
  function abs_0(n) {
    return n < 0 ? -n | 0 | 0 : n;
  }
  function pow_0(_this__u8e3s4, x) {
    return Math.pow(_this__u8e3s4, x);
  }
  function cbrt(x) {
    return Math.cbrt(x);
  }
  function floor(x) {
    return Math.floor(x);
  }
  function abs_1(x) {
    return Math.abs(x);
  }
  function atan2(y, x) {
    return Math.atan2(y, x);
  }
  function max_1(a, b) {
    return Math.max(a, b);
  }
  function min_1(a, b) {
    return Math.min(a, b);
  }
  function get_INV_2_26() {
    _init_properties_PlatformRandom_kt__6kjv62();
    return INV_2_26;
  }
  var INV_2_26;
  function get_INV_2_53() {
    _init_properties_PlatformRandom_kt__6kjv62();
    return INV_2_53;
  }
  var INV_2_53;
  var properties_initialized_PlatformRandom_kt_uibhw8;
  function _init_properties_PlatformRandom_kt__6kjv62() {
    if (!properties_initialized_PlatformRandom_kt_uibhw8) {
      properties_initialized_PlatformRandom_kt_uibhw8 = true;
      // Inline function 'kotlin.math.pow' call
      INV_2_26 = Math.pow(2.0, -26);
      // Inline function 'kotlin.math.pow' call
      INV_2_53 = Math.pow(2.0, -53);
    }
  }
  function KCallable() {
  }
  function KClass() {
  }
  function KClassImpl(jClass) {
    this.jClass_1 = jClass;
  }
  protoOf(KClassImpl).get_jClass_en9agn_k$ = function () {
    return this.jClass_1;
  };
  protoOf(KClassImpl).get_qualifiedName_aokcf6_k$ = function () {
    throw new NotImplementedError();
  };
  protoOf(KClassImpl).equals = function (other) {
    var tmp;
    if (other instanceof NothingKClassImpl) {
      tmp = false;
    } else {
      if (other instanceof ErrorKClass) {
        tmp = false;
      } else {
        if (other instanceof KClassImpl) {
          tmp = equals(this.get_jClass_en9agn_k$(), other.get_jClass_en9agn_k$());
        } else {
          tmp = false;
        }
      }
    }
    return tmp;
  };
  protoOf(KClassImpl).hashCode = function () {
    var tmp0_safe_receiver = this.get_simpleName_r6f8py_k$();
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : getStringHashCode(tmp0_safe_receiver);
    return tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
  };
  protoOf(KClassImpl).toString = function () {
    return 'class ' + this.get_simpleName_r6f8py_k$();
  };
  function NothingKClassImpl() {
    NothingKClassImpl_instance = this;
    KClassImpl.call(this, Object);
    this.simpleName_1 = 'Nothing';
  }
  protoOf(NothingKClassImpl).get_simpleName_r6f8py_k$ = function () {
    return this.simpleName_1;
  };
  protoOf(NothingKClassImpl).isInstance_6tn68w_k$ = function (value) {
    return false;
  };
  protoOf(NothingKClassImpl).get_jClass_en9agn_k$ = function () {
    throw UnsupportedOperationException_init_$Create$_0("There's no native JS class for Nothing type");
  };
  protoOf(NothingKClassImpl).equals = function (other) {
    return other === this;
  };
  protoOf(NothingKClassImpl).hashCode = function () {
    return 0;
  };
  var NothingKClassImpl_instance;
  function NothingKClassImpl_getInstance() {
    if (NothingKClassImpl_instance == null)
      new NothingKClassImpl();
    return NothingKClassImpl_instance;
  }
  function ErrorKClass() {
  }
  protoOf(ErrorKClass).get_simpleName_r6f8py_k$ = function () {
    var message = 'Unknown simpleName for ErrorKClass';
    throw IllegalStateException_init_$Create$_0(toString_2(message));
  };
  protoOf(ErrorKClass).get_qualifiedName_aokcf6_k$ = function () {
    var message = 'Unknown qualifiedName for ErrorKClass';
    throw IllegalStateException_init_$Create$_0(toString_2(message));
  };
  protoOf(ErrorKClass).isInstance_6tn68w_k$ = function (value) {
    var message = "Can's check isInstance on ErrorKClass";
    throw IllegalStateException_init_$Create$_0(toString_2(message));
  };
  protoOf(ErrorKClass).equals = function (other) {
    return other === this;
  };
  protoOf(ErrorKClass).hashCode = function () {
    return 0;
  };
  function _get_givenSimpleName__jpleuh($this) {
    return $this.givenSimpleName_1;
  }
  function _get_isInstanceFunction__fkefl8($this) {
    return $this.isInstanceFunction_1;
  }
  function PrimitiveKClassImpl(jClass, givenSimpleName, isInstanceFunction) {
    KClassImpl.call(this, jClass);
    this.givenSimpleName_1 = givenSimpleName;
    this.isInstanceFunction_1 = isInstanceFunction;
  }
  protoOf(PrimitiveKClassImpl).equals = function (other) {
    if (!(other instanceof PrimitiveKClassImpl))
      return false;
    return protoOf(KClassImpl).equals.call(this, other) ? this.givenSimpleName_1 === other.givenSimpleName_1 : false;
  };
  protoOf(PrimitiveKClassImpl).get_simpleName_r6f8py_k$ = function () {
    return this.givenSimpleName_1;
  };
  protoOf(PrimitiveKClassImpl).isInstance_6tn68w_k$ = function (value) {
    return this.isInstanceFunction_1(value);
  };
  function SimpleKClassImpl(jClass) {
    KClassImpl.call(this, jClass);
    var tmp = this;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp0_safe_receiver = jClass.$metadata$;
    tmp.simpleName_1 = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.simpleName;
  }
  protoOf(SimpleKClassImpl).get_simpleName_r6f8py_k$ = function () {
    return this.simpleName_1;
  };
  protoOf(SimpleKClassImpl).isInstance_6tn68w_k$ = function (value) {
    return jsIsType(value, this.get_jClass_en9agn_k$());
  };
  function KFunction() {
  }
  function KProperty() {
  }
  function KProperty0() {
  }
  function KProperty1() {
  }
  function KProperty2() {
  }
  function KMutableProperty0() {
  }
  function KMutableProperty() {
  }
  function KMutableProperty1() {
  }
  function KMutableProperty2() {
  }
  function KType() {
  }
  function createKType(classifier, arguments_0, isMarkedNullable) {
    return new KTypeImpl(classifier, asList(arguments_0), isMarkedNullable);
  }
  function createDynamicKType() {
    return DynamicKType_getInstance();
  }
  function createKTypeParameter(name, upperBounds, variance) {
    var kVariance;
    switch (variance) {
      case 'in':
        kVariance = KVariance_IN_getInstance();
        break;
      case 'out':
        kVariance = KVariance_OUT_getInstance();
        break;
      default:
        kVariance = KVariance_INVARIANT_getInstance();
        break;
    }
    return new KTypeParameterImpl(name, asList(upperBounds), kVariance, false);
  }
  function getStarKTypeProjection() {
    return Companion_getInstance_14().get_STAR_wo9fa3_k$();
  }
  function createCovariantKTypeProjection(type) {
    return Companion_getInstance_14().covariant_daguew_k$(type);
  }
  function createInvariantKTypeProjection(type) {
    return Companion_getInstance_14().invariant_a4yrrz_k$(type);
  }
  function createContravariantKTypeProjection(type) {
    return Companion_getInstance_14().contravariant_bkjggt_k$(type);
  }
  function KTypeImpl(classifier, arguments_0, isMarkedNullable) {
    this.classifier_1 = classifier;
    this.arguments_1 = arguments_0;
    this.isMarkedNullable_1 = isMarkedNullable;
  }
  protoOf(KTypeImpl).get_classifier_ottyl2_k$ = function () {
    return this.classifier_1;
  };
  protoOf(KTypeImpl).get_arguments_p5ddub_k$ = function () {
    return this.arguments_1;
  };
  protoOf(KTypeImpl).get_isMarkedNullable_4el8ow_k$ = function () {
    return this.isMarkedNullable_1;
  };
  protoOf(KTypeImpl).equals = function (other) {
    var tmp;
    var tmp_0;
    var tmp_1;
    if (other instanceof KTypeImpl) {
      tmp_1 = equals(this.classifier_1, other.classifier_1);
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = equals(this.arguments_1, other.arguments_1);
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = this.isMarkedNullable_1 === other.isMarkedNullable_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(KTypeImpl).hashCode = function () {
    return imul(imul(hashCode(this.classifier_1), 31) + hashCode(this.arguments_1) | 0, 31) + getBooleanHashCode(this.isMarkedNullable_1) | 0;
  };
  protoOf(KTypeImpl).toString = function () {
    var tmp = this.classifier_1;
    var kClass = isInterface(tmp, KClass) ? tmp : null;
    var classifierName = kClass == null ? toString_2(this.classifier_1) : !(kClass.get_simpleName_r6f8py_k$() == null) ? kClass.get_simpleName_r6f8py_k$() : '(non-denotable type)';
    var args = this.arguments_1.isEmpty_y1axqb_k$() ? '' : joinToString_0(this.arguments_1, ', ', '<', '>');
    var nullable = this.isMarkedNullable_1 ? '?' : '';
    return plus_2(classifierName, args) + nullable;
  };
  function DynamicKType() {
    DynamicKType_instance = this;
    this.classifier_1 = null;
    this.arguments_1 = emptyList();
    this.isMarkedNullable_1 = false;
  }
  protoOf(DynamicKType).get_classifier_ottyl2_k$ = function () {
    return this.classifier_1;
  };
  protoOf(DynamicKType).get_arguments_p5ddub_k$ = function () {
    return this.arguments_1;
  };
  protoOf(DynamicKType).get_isMarkedNullable_4el8ow_k$ = function () {
    return this.isMarkedNullable_1;
  };
  protoOf(DynamicKType).toString = function () {
    return 'dynamic';
  };
  var DynamicKType_instance;
  function DynamicKType_getInstance() {
    if (DynamicKType_instance == null)
      new DynamicKType();
    return DynamicKType_instance;
  }
  function KTypeParameterImpl(name, upperBounds, variance, isReified) {
    this.name_1 = name;
    this.upperBounds_1 = upperBounds;
    this.variance_1 = variance;
    this.isReified_1 = isReified;
  }
  protoOf(KTypeParameterImpl).get_name_woqyms_k$ = function () {
    return this.name_1;
  };
  protoOf(KTypeParameterImpl).get_upperBounds_k5qia_k$ = function () {
    return this.upperBounds_1;
  };
  protoOf(KTypeParameterImpl).get_variance_ik7ku2_k$ = function () {
    return this.variance_1;
  };
  protoOf(KTypeParameterImpl).get_isReified_gx0s91_k$ = function () {
    return this.isReified_1;
  };
  protoOf(KTypeParameterImpl).toString = function () {
    return this.name_1;
  };
  protoOf(KTypeParameterImpl).component1_7eebsc_k$ = function () {
    return this.name_1;
  };
  protoOf(KTypeParameterImpl).component2_7eebsb_k$ = function () {
    return this.upperBounds_1;
  };
  protoOf(KTypeParameterImpl).component3_7eebsa_k$ = function () {
    return this.variance_1;
  };
  protoOf(KTypeParameterImpl).component4_7eebs9_k$ = function () {
    return this.isReified_1;
  };
  protoOf(KTypeParameterImpl).copy_hiuxq5_k$ = function (name, upperBounds, variance, isReified) {
    return new KTypeParameterImpl(name, upperBounds, variance, isReified);
  };
  protoOf(KTypeParameterImpl).copy$default_puwfie_k$ = function (name, upperBounds, variance, isReified, $super) {
    name = name === VOID ? this.name_1 : name;
    upperBounds = upperBounds === VOID ? this.upperBounds_1 : upperBounds;
    variance = variance === VOID ? this.variance_1 : variance;
    isReified = isReified === VOID ? this.isReified_1 : isReified;
    return $super === VOID ? this.copy_hiuxq5_k$(name, upperBounds, variance, isReified) : $super.copy_hiuxq5_k$.call(this, name, upperBounds, variance, isReified);
  };
  protoOf(KTypeParameterImpl).hashCode = function () {
    var result = getStringHashCode(this.name_1);
    result = imul(result, 31) + hashCode(this.upperBounds_1) | 0;
    result = imul(result, 31) + this.variance_1.hashCode() | 0;
    result = imul(result, 31) + getBooleanHashCode(this.isReified_1) | 0;
    return result;
  };
  protoOf(KTypeParameterImpl).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof KTypeParameterImpl))
      return false;
    var tmp0_other_with_cast = other instanceof KTypeParameterImpl ? other : THROW_CCE();
    if (!(this.name_1 === tmp0_other_with_cast.name_1))
      return false;
    if (!equals(this.upperBounds_1, tmp0_other_with_cast.upperBounds_1))
      return false;
    if (!this.variance_1.equals(tmp0_other_with_cast.variance_1))
      return false;
    if (!(this.isReified_1 === tmp0_other_with_cast.isReified_1))
      return false;
    return true;
  };
  function get_functionClasses() {
    _init_properties_primitives_kt__3fums4();
    return functionClasses;
  }
  var functionClasses;
  function PrimitiveClasses$anyClass$lambda(it) {
    return !(it == null);
  }
  function PrimitiveClasses$numberClass$lambda(it) {
    return isNumber(it);
  }
  function PrimitiveClasses$booleanClass$lambda(it) {
    return !(it == null) ? typeof it === 'boolean' : false;
  }
  function PrimitiveClasses$byteClass$lambda(it) {
    return !(it == null) ? typeof it === 'number' : false;
  }
  function PrimitiveClasses$shortClass$lambda(it) {
    return !(it == null) ? typeof it === 'number' : false;
  }
  function PrimitiveClasses$intClass$lambda(it) {
    return !(it == null) ? typeof it === 'number' : false;
  }
  function PrimitiveClasses$floatClass$lambda(it) {
    return !(it == null) ? typeof it === 'number' : false;
  }
  function PrimitiveClasses$doubleClass$lambda(it) {
    return !(it == null) ? typeof it === 'number' : false;
  }
  function PrimitiveClasses$arrayClass$lambda(it) {
    return !(it == null) ? isArray(it) : false;
  }
  function PrimitiveClasses$stringClass$lambda(it) {
    return !(it == null) ? typeof it === 'string' : false;
  }
  function PrimitiveClasses$throwableClass$lambda(it) {
    return it instanceof Error;
  }
  function PrimitiveClasses$booleanArrayClass$lambda(it) {
    return !(it == null) ? isBooleanArray(it) : false;
  }
  function PrimitiveClasses$charArrayClass$lambda(it) {
    return !(it == null) ? isCharArray(it) : false;
  }
  function PrimitiveClasses$byteArrayClass$lambda(it) {
    return !(it == null) ? isByteArray(it) : false;
  }
  function PrimitiveClasses$shortArrayClass$lambda(it) {
    return !(it == null) ? isShortArray(it) : false;
  }
  function PrimitiveClasses$intArrayClass$lambda(it) {
    return !(it == null) ? isIntArray(it) : false;
  }
  function PrimitiveClasses$longArrayClass$lambda(it) {
    return !(it == null) ? isLongArray(it) : false;
  }
  function PrimitiveClasses$floatArrayClass$lambda(it) {
    return !(it == null) ? isFloatArray(it) : false;
  }
  function PrimitiveClasses$doubleArrayClass$lambda(it) {
    return !(it == null) ? isDoubleArray(it) : false;
  }
  function PrimitiveClasses$functionClass$lambda($arity) {
    return function (it) {
      var tmp;
      if (typeof it === 'function') {
        // Inline function 'kotlin.js.asDynamic' call
        tmp = it.length === $arity;
      } else {
        tmp = false;
      }
      return tmp;
    };
  }
  function PrimitiveClasses() {
    PrimitiveClasses_instance = this;
    var tmp = this;
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp_0 = Object;
    tmp.anyClass = new PrimitiveKClassImpl(tmp_0, 'Any', PrimitiveClasses$anyClass$lambda);
    var tmp_1 = this;
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp_2 = Number;
    tmp_1.numberClass = new PrimitiveKClassImpl(tmp_2, 'Number', PrimitiveClasses$numberClass$lambda);
    this.nothingClass = NothingKClassImpl_getInstance();
    var tmp_3 = this;
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp_4 = Boolean;
    tmp_3.booleanClass = new PrimitiveKClassImpl(tmp_4, 'Boolean', PrimitiveClasses$booleanClass$lambda);
    var tmp_5 = this;
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp_6 = Number;
    tmp_5.byteClass = new PrimitiveKClassImpl(tmp_6, 'Byte', PrimitiveClasses$byteClass$lambda);
    var tmp_7 = this;
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp_8 = Number;
    tmp_7.shortClass = new PrimitiveKClassImpl(tmp_8, 'Short', PrimitiveClasses$shortClass$lambda);
    var tmp_9 = this;
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp_10 = Number;
    tmp_9.intClass = new PrimitiveKClassImpl(tmp_10, 'Int', PrimitiveClasses$intClass$lambda);
    var tmp_11 = this;
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp_12 = Number;
    tmp_11.floatClass = new PrimitiveKClassImpl(tmp_12, 'Float', PrimitiveClasses$floatClass$lambda);
    var tmp_13 = this;
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp_14 = Number;
    tmp_13.doubleClass = new PrimitiveKClassImpl(tmp_14, 'Double', PrimitiveClasses$doubleClass$lambda);
    var tmp_15 = this;
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp_16 = Array;
    tmp_15.arrayClass = new PrimitiveKClassImpl(tmp_16, 'Array', PrimitiveClasses$arrayClass$lambda);
    var tmp_17 = this;
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp_18 = String;
    tmp_17.stringClass = new PrimitiveKClassImpl(tmp_18, 'String', PrimitiveClasses$stringClass$lambda);
    var tmp_19 = this;
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp_20 = Error;
    tmp_19.throwableClass = new PrimitiveKClassImpl(tmp_20, 'Throwable', PrimitiveClasses$throwableClass$lambda);
    var tmp_21 = this;
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp_22 = Array;
    tmp_21.booleanArrayClass = new PrimitiveKClassImpl(tmp_22, 'BooleanArray', PrimitiveClasses$booleanArrayClass$lambda);
    var tmp_23 = this;
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp_24 = Uint16Array;
    tmp_23.charArrayClass = new PrimitiveKClassImpl(tmp_24, 'CharArray', PrimitiveClasses$charArrayClass$lambda);
    var tmp_25 = this;
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp_26 = Int8Array;
    tmp_25.byteArrayClass = new PrimitiveKClassImpl(tmp_26, 'ByteArray', PrimitiveClasses$byteArrayClass$lambda);
    var tmp_27 = this;
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp_28 = Int16Array;
    tmp_27.shortArrayClass = new PrimitiveKClassImpl(tmp_28, 'ShortArray', PrimitiveClasses$shortArrayClass$lambda);
    var tmp_29 = this;
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp_30 = Int32Array;
    tmp_29.intArrayClass = new PrimitiveKClassImpl(tmp_30, 'IntArray', PrimitiveClasses$intArrayClass$lambda);
    var tmp_31 = this;
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp_32 = Array;
    tmp_31.longArrayClass = new PrimitiveKClassImpl(tmp_32, 'LongArray', PrimitiveClasses$longArrayClass$lambda);
    var tmp_33 = this;
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp_34 = Float32Array;
    tmp_33.floatArrayClass = new PrimitiveKClassImpl(tmp_34, 'FloatArray', PrimitiveClasses$floatArrayClass$lambda);
    var tmp_35 = this;
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp_36 = Float64Array;
    tmp_35.doubleArrayClass = new PrimitiveKClassImpl(tmp_36, 'DoubleArray', PrimitiveClasses$doubleArrayClass$lambda);
  }
  protoOf(PrimitiveClasses).get_anyClass_x0jl4l_k$ = function () {
    return this.anyClass;
  };
  protoOf(PrimitiveClasses).get_numberClass_pnym9y_k$ = function () {
    return this.numberClass;
  };
  protoOf(PrimitiveClasses).get_nothingClass_7ivpcc_k$ = function () {
    return this.nothingClass;
  };
  protoOf(PrimitiveClasses).get_booleanClass_d285fr_k$ = function () {
    return this.booleanClass;
  };
  protoOf(PrimitiveClasses).get_byteClass_pu7s61_k$ = function () {
    return this.byteClass;
  };
  protoOf(PrimitiveClasses).get_shortClass_5ajsv9_k$ = function () {
    return this.shortClass;
  };
  protoOf(PrimitiveClasses).get_intClass_mw4y9a_k$ = function () {
    return this.intClass;
  };
  protoOf(PrimitiveClasses).get_floatClass_xlwq2t_k$ = function () {
    return this.floatClass;
  };
  protoOf(PrimitiveClasses).get_doubleClass_dahzcy_k$ = function () {
    return this.doubleClass;
  };
  protoOf(PrimitiveClasses).get_arrayClass_udg0fc_k$ = function () {
    return this.arrayClass;
  };
  protoOf(PrimitiveClasses).get_stringClass_bik2gy_k$ = function () {
    return this.stringClass;
  };
  protoOf(PrimitiveClasses).get_throwableClass_ee1a8x_k$ = function () {
    return this.throwableClass;
  };
  protoOf(PrimitiveClasses).get_booleanArrayClass_lnbwea_k$ = function () {
    return this.booleanArrayClass;
  };
  protoOf(PrimitiveClasses).get_charArrayClass_7lhfoe_k$ = function () {
    return this.charArrayClass;
  };
  protoOf(PrimitiveClasses).get_byteArrayClass_57my8g_k$ = function () {
    return this.byteArrayClass;
  };
  protoOf(PrimitiveClasses).get_shortArrayClass_c1p7wy_k$ = function () {
    return this.shortArrayClass;
  };
  protoOf(PrimitiveClasses).get_intArrayClass_h44pbv_k$ = function () {
    return this.intArrayClass;
  };
  protoOf(PrimitiveClasses).get_longArrayClass_v379a4_k$ = function () {
    return this.longArrayClass;
  };
  protoOf(PrimitiveClasses).get_floatArrayClass_qngmha_k$ = function () {
    return this.floatArrayClass;
  };
  protoOf(PrimitiveClasses).get_doubleArrayClass_84hee1_k$ = function () {
    return this.doubleArrayClass;
  };
  protoOf(PrimitiveClasses).functionClass = function (arity) {
    var tmp0_elvis_lhs = get_functionClasses()[arity];
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.run' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlin.reflect.js.internal.PrimitiveClasses.functionClass.<anonymous>' call
      // Inline function 'kotlin.js.unsafeCast' call
      var tmp_0 = Function;
      var tmp_1 = 'Function' + arity;
      var result = new PrimitiveKClassImpl(tmp_0, tmp_1, PrimitiveClasses$functionClass$lambda(arity));
      // Inline function 'kotlin.js.asDynamic' call
      get_functionClasses()[arity] = result;
      tmp = result;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  var PrimitiveClasses_instance;
  function PrimitiveClasses_getInstance() {
    if (PrimitiveClasses_instance == null)
      new PrimitiveClasses();
    return PrimitiveClasses_instance;
  }
  var properties_initialized_primitives_kt_jle18u;
  function _init_properties_primitives_kt__3fums4() {
    if (!properties_initialized_primitives_kt_jle18u) {
      properties_initialized_primitives_kt_jle18u = true;
      // Inline function 'kotlin.arrayOfNulls' call
      functionClasses = fillArrayVal(Array(0), null);
    }
  }
  function getKClass(jClass) {
    var tmp;
    if (Array.isArray(jClass)) {
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp = getKClassM(jClass);
    } else {
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp = getKClass1(jClass);
    }
    return tmp;
  }
  function getKClassM(jClasses) {
    var tmp;
    switch (jClasses.length) {
      case 1:
        tmp = getKClass1(jClasses[0]);
        break;
      case 0:
        // Inline function 'kotlin.js.unsafeCast' call

        // Inline function 'kotlin.js.asDynamic' call

        tmp = NothingKClassImpl_getInstance();
        break;
      default:
        // Inline function 'kotlin.js.unsafeCast' call

        // Inline function 'kotlin.js.asDynamic' call

        tmp = new ErrorKClass();
        break;
    }
    return tmp;
  }
  function getKClass1(jClass) {
    if (jClass === String) {
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      return PrimitiveClasses_getInstance().stringClass;
    }
    // Inline function 'kotlin.js.asDynamic' call
    var metadata = jClass.$metadata$;
    var tmp;
    if (metadata != null) {
      var tmp_0;
      if (metadata.$kClass$ == null) {
        var kClass = new SimpleKClassImpl(jClass);
        metadata.$kClass$ = kClass;
        tmp_0 = kClass;
      } else {
        tmp_0 = metadata.$kClass$;
      }
      tmp = tmp_0;
    } else {
      tmp = new SimpleKClassImpl(jClass);
    }
    return tmp;
  }
  function getKClassFromExpression(e) {
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp;
    switch (typeof e) {
      case 'string':
        tmp = PrimitiveClasses_getInstance().stringClass;
        break;
      case 'number':
        var tmp_0;
        // Inline function 'kotlin.js.asDynamic' call

        // Inline function 'kotlin.js.jsBitwiseOr' call

        if ((e | 0) === e) {
          tmp_0 = PrimitiveClasses_getInstance().intClass;
        } else {
          tmp_0 = PrimitiveClasses_getInstance().doubleClass;
        }

        tmp = tmp_0;
        break;
      case 'boolean':
        tmp = PrimitiveClasses_getInstance().booleanClass;
        break;
      case 'function':
        var tmp_1 = PrimitiveClasses_getInstance();
        // Inline function 'kotlin.js.asDynamic' call

        tmp = tmp_1.functionClass(e.length);
        break;
      default:
        var tmp_2;
        if (isBooleanArray(e)) {
          tmp_2 = PrimitiveClasses_getInstance().booleanArrayClass;
        } else {
          if (isCharArray(e)) {
            tmp_2 = PrimitiveClasses_getInstance().charArrayClass;
          } else {
            if (isByteArray(e)) {
              tmp_2 = PrimitiveClasses_getInstance().byteArrayClass;
            } else {
              if (isShortArray(e)) {
                tmp_2 = PrimitiveClasses_getInstance().shortArrayClass;
              } else {
                if (isIntArray(e)) {
                  tmp_2 = PrimitiveClasses_getInstance().intArrayClass;
                } else {
                  if (isLongArray(e)) {
                    tmp_2 = PrimitiveClasses_getInstance().longArrayClass;
                  } else {
                    if (isFloatArray(e)) {
                      tmp_2 = PrimitiveClasses_getInstance().floatArrayClass;
                    } else {
                      if (isDoubleArray(e)) {
                        tmp_2 = PrimitiveClasses_getInstance().doubleArrayClass;
                      } else {
                        if (isInterface(e, KClass)) {
                          tmp_2 = getKClass(KClass);
                        } else {
                          if (isArray(e)) {
                            tmp_2 = PrimitiveClasses_getInstance().arrayClass;
                          } else {
                            var constructor = Object.getPrototypeOf(e).constructor;
                            var tmp_3;
                            if (constructor === Object) {
                              tmp_3 = PrimitiveClasses_getInstance().anyClass;
                            } else if (constructor === Error) {
                              tmp_3 = PrimitiveClasses_getInstance().throwableClass;
                            } else {
                              var jsClass = constructor;
                              tmp_3 = getKClass1(jsClass);
                            }
                            tmp_2 = tmp_3;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }

        tmp = tmp_2;
        break;
    }
    // Inline function 'kotlin.js.asDynamic' call
    return tmp;
  }
  function Appendable() {
  }
  function StringBuilder_init_$Init$(capacity, $this) {
    StringBuilder_init_$Init$_1($this);
    return $this;
  }
  function StringBuilder_init_$Create$(capacity) {
    return StringBuilder_init_$Init$(capacity, objectCreate(protoOf(StringBuilder)));
  }
  function StringBuilder_init_$Init$_0(content, $this) {
    StringBuilder.call($this, toString_2(content));
    return $this;
  }
  function StringBuilder_init_$Create$_0(content) {
    return StringBuilder_init_$Init$_0(content, objectCreate(protoOf(StringBuilder)));
  }
  function StringBuilder_init_$Init$_1($this) {
    StringBuilder.call($this, '');
    return $this;
  }
  function StringBuilder_init_$Create$_1() {
    return StringBuilder_init_$Init$_1(objectCreate(protoOf(StringBuilder)));
  }
  function _set_string__57jj1i($this, _set____db54di) {
    $this.string_1 = _set____db54di;
  }
  function _get_string__6oa3oa($this) {
    return $this.string_1;
  }
  function checkReplaceRange($this, startIndex, endIndex, length) {
    if (startIndex < 0 ? true : startIndex > length) {
      throw IndexOutOfBoundsException_init_$Create$_0('startIndex: ' + startIndex + ', length: ' + length);
    }
    if (startIndex > endIndex) {
      throw IllegalArgumentException_init_$Create$_0('startIndex(' + startIndex + ') > endIndex(' + endIndex + ')');
    }
  }
  function StringBuilder(content) {
    this.string_1 = !(content === undefined) ? content : '';
  }
  protoOf(StringBuilder).get_length_g42xv3_k$ = function () {
    // Inline function 'kotlin.js.asDynamic' call
    return this.string_1.length;
  };
  protoOf(StringBuilder).get_kdzpvg_k$ = function (index) {
    // Inline function 'kotlin.text.getOrElse' call
    var this_0 = this.string_1;
    var tmp;
    if (index >= 0 ? index <= get_lastIndex_7(this_0) : false) {
      tmp = charSequenceGet(this_0, index);
    } else {
      throw IndexOutOfBoundsException_init_$Create$_0('index: ' + index + ', length: ' + this.get_length_g42xv3_k$() + '}');
    }
    return tmp;
  };
  protoOf(StringBuilder).subSequence_hm5hnj_k$ = function (startIndex, endIndex) {
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    return this.string_1.substring(startIndex, endIndex);
  };
  protoOf(StringBuilder).append_am5a4z_k$ = function (value) {
    this.string_1 = this.string_1 + toString_0(value);
    return this;
  };
  protoOf(StringBuilder).append_jgojdo_k$ = function (value) {
    this.string_1 = this.string_1 + toString_1(value);
    return this;
  };
  protoOf(StringBuilder).append_xdc1zw_k$ = function (value, startIndex, endIndex) {
    return this.appendRange_arc5oa_k$(value == null ? 'null' : value, startIndex, endIndex);
  };
  protoOf(StringBuilder).reverse_i6tiw2_k$ = function () {
    var reversed = '';
    var index = this.string_1.length - 1 | 0;
    while (index >= 0) {
      var tmp = this.string_1;
      var tmp0 = index;
      index = tmp0 - 1 | 0;
      var low = charSequenceGet(tmp, tmp0);
      if (isLowSurrogate(low) ? index >= 0 : false) {
        var tmp_0 = this.string_1;
        var tmp1 = index;
        index = tmp1 - 1 | 0;
        var high = charSequenceGet(tmp_0, tmp1);
        if (isHighSurrogate(high)) {
          reversed = reversed + new Char(high) + toString_0(low);
        } else {
          reversed = reversed + new Char(low) + toString_0(high);
        }
      } else {
        reversed = reversed + toString_0(low);
      }
    }
    this.string_1 = reversed;
    return this;
  };
  protoOf(StringBuilder).append_t8pm91_k$ = function (value) {
    this.string_1 = this.string_1 + toString_1(value);
    return this;
  };
  protoOf(StringBuilder).append_g4kq45_k$ = function (value) {
    this.string_1 = this.string_1 + value;
    return this;
  };
  protoOf(StringBuilder).append_yxu0ua_k$ = function (value) {
    return this.append_22ad7x_k$(value.toString());
  };
  protoOf(StringBuilder).append_osrnku_k$ = function (value) {
    return this.append_22ad7x_k$(value.toString());
  };
  protoOf(StringBuilder).append_uppzia_k$ = function (value) {
    return this.append_22ad7x_k$(value.toString());
  };
  protoOf(StringBuilder).append_8gl4h8_k$ = function (value) {
    return this.append_22ad7x_k$(value.toString());
  };
  protoOf(StringBuilder).append_g7wmaq_k$ = function (value) {
    return this.append_22ad7x_k$(value.toString());
  };
  protoOf(StringBuilder).append_jynnak_k$ = function (value) {
    return this.append_22ad7x_k$(value.toString());
  };
  protoOf(StringBuilder).append_eohvew_k$ = function (value) {
    this.string_1 = this.string_1 + concatToString(value);
    return this;
  };
  protoOf(StringBuilder).append_22ad7x_k$ = function (value) {
    var tmp = this;
    var tmp_0 = this.string_1;
    tmp.string_1 = tmp_0 + (value == null ? 'null' : value);
    return this;
  };
  protoOf(StringBuilder).capacity_14dpom_k$ = function () {
    return this.get_length_g42xv3_k$();
  };
  protoOf(StringBuilder).ensureCapacity_wr7980_k$ = function (minimumCapacity) {
  };
  protoOf(StringBuilder).indexOf_x62zdd_k$ = function (string) {
    // Inline function 'kotlin.js.asDynamic' call
    return this.string_1.indexOf(string);
  };
  protoOf(StringBuilder).indexOf_jar3b_k$ = function (string, startIndex) {
    // Inline function 'kotlin.js.asDynamic' call
    return this.string_1.indexOf(string, startIndex);
  };
  protoOf(StringBuilder).lastIndexOf_8r5hvr_k$ = function (string) {
    // Inline function 'kotlin.js.asDynamic' call
    return this.string_1.lastIndexOf(string);
  };
  protoOf(StringBuilder).lastIndexOf_dql50x_k$ = function (string, startIndex) {
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(string) === 0) {
      tmp = startIndex < 0;
    } else {
      tmp = false;
    }
    if (tmp)
      return -1;
    // Inline function 'kotlin.js.asDynamic' call
    return this.string_1.lastIndexOf(string, startIndex);
  };
  protoOf(StringBuilder).insert_ktc7wm_k$ = function (index, value) {
    Companion_getInstance_4().checkPositionIndex_xiph8v_k$(index, this.get_length_g42xv3_k$());
    var tmp = this;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = this.string_1.substring(0, index) + value;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.string_1 = tmp_0 + this.string_1.substring(index);
    return this;
  };
  protoOf(StringBuilder).insert_i0btdl_k$ = function (index, value) {
    return this.insert_xumlbs_k$(index, value.toString());
  };
  protoOf(StringBuilder).insert_kf40vb_k$ = function (index, value) {
    return this.insert_xumlbs_k$(index, value.toString());
  };
  protoOf(StringBuilder).insert_5z02kn_k$ = function (index, value) {
    return this.insert_xumlbs_k$(index, value.toString());
  };
  protoOf(StringBuilder).insert_qjjc8h_k$ = function (index, value) {
    return this.insert_xumlbs_k$(index, value.toString());
  };
  protoOf(StringBuilder).insert_9lbr89_k$ = function (index, value) {
    return this.insert_xumlbs_k$(index, value.toString());
  };
  protoOf(StringBuilder).insert_zi6gm1_k$ = function (index, value) {
    return this.insert_xumlbs_k$(index, value.toString());
  };
  protoOf(StringBuilder).insert_azl3w2_k$ = function (index, value) {
    Companion_getInstance_4().checkPositionIndex_xiph8v_k$(index, this.get_length_g42xv3_k$());
    var tmp = this;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = this.string_1.substring(0, index) + toString_0(value);
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.string_1 = tmp_0 + this.string_1.substring(index);
    return this;
  };
  protoOf(StringBuilder).insert_117419_k$ = function (index, value) {
    Companion_getInstance_4().checkPositionIndex_xiph8v_k$(index, this.get_length_g42xv3_k$());
    var tmp = this;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = this.string_1.substring(0, index) + concatToString(value);
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.string_1 = tmp_0 + this.string_1.substring(index);
    return this;
  };
  protoOf(StringBuilder).insert_nbdn49_k$ = function (index, value) {
    Companion_getInstance_4().checkPositionIndex_xiph8v_k$(index, this.get_length_g42xv3_k$());
    var tmp = this;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = this.string_1.substring(0, index) + toString_1(value);
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.string_1 = tmp_0 + this.string_1.substring(index);
    return this;
  };
  protoOf(StringBuilder).insert_fjhmv4_k$ = function (index, value) {
    Companion_getInstance_4().checkPositionIndex_xiph8v_k$(index, this.get_length_g42xv3_k$());
    var tmp = this;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = this.string_1.substring(0, index) + toString_1(value);
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.string_1 = tmp_0 + this.string_1.substring(index);
    return this;
  };
  protoOf(StringBuilder).insert_xumlbs_k$ = function (index, value) {
    Companion_getInstance_4().checkPositionIndex_xiph8v_k$(index, this.get_length_g42xv3_k$());
    var toInsert = value == null ? 'null' : value;
    var tmp = this;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = this.string_1.substring(0, index) + toInsert;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.string_1 = tmp_0 + this.string_1.substring(index);
    return this;
  };
  protoOf(StringBuilder).setLength_oy0ork_k$ = function (newLength) {
    if (newLength < 0) {
      throw IllegalArgumentException_init_$Create$_0('Negative new length: ' + newLength + '.');
    }
    if (newLength <= this.get_length_g42xv3_k$()) {
      var tmp = this;
      // Inline function 'kotlin.text.substring' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp.string_1 = this.string_1.substring(0, newLength);
    } else {
      var inductionVariable = this.get_length_g42xv3_k$();
      if (inductionVariable < newLength)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          this.string_1 = this.string_1 + toString_0(_Char___init__impl__6a9atx(0));
        }
         while (inductionVariable < newLength);
    }
  };
  protoOf(StringBuilder).substring_376r6h_k$ = function (startIndex) {
    Companion_getInstance_4().checkPositionIndex_xiph8v_k$(startIndex, this.get_length_g42xv3_k$());
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    return this.string_1.substring(startIndex);
  };
  protoOf(StringBuilder).substring_d7lab3_k$ = function (startIndex, endIndex) {
    Companion_getInstance_4().checkBoundsIndexes_fu3rwb_k$(startIndex, endIndex, this.get_length_g42xv3_k$());
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    return this.string_1.substring(startIndex, endIndex);
  };
  protoOf(StringBuilder).trimToSize_dmxq0i_k$ = function () {
  };
  protoOf(StringBuilder).toString = function () {
    return this.string_1;
  };
  protoOf(StringBuilder).clear_1keqml_k$ = function () {
    this.string_1 = '';
    return this;
  };
  protoOf(StringBuilder).set_l67naf_k$ = function (index, value) {
    Companion_getInstance_4().checkElementIndex_r3t1bm_k$(index, this.get_length_g42xv3_k$());
    var tmp = this;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = this.string_1.substring(0, index) + toString_0(value);
    // Inline function 'kotlin.text.substring' call
    var this_0 = this.string_1;
    var startIndex = index + 1 | 0;
    // Inline function 'kotlin.js.asDynamic' call
    tmp.string_1 = tmp_0 + this_0.substring(startIndex);
  };
  protoOf(StringBuilder).setRange_ekuxun_k$ = function (startIndex, endIndex, value) {
    checkReplaceRange(this, startIndex, endIndex, this.get_length_g42xv3_k$());
    var tmp = this;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = this.string_1.substring(0, startIndex) + value;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.string_1 = tmp_0 + this.string_1.substring(endIndex);
    return this;
  };
  protoOf(StringBuilder).deleteAt_mq1vvq_k$ = function (index) {
    Companion_getInstance_4().checkElementIndex_r3t1bm_k$(index, this.get_length_g42xv3_k$());
    var tmp = this;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = this.string_1.substring(0, index);
    // Inline function 'kotlin.text.substring' call
    var this_0 = this.string_1;
    var startIndex = index + 1 | 0;
    // Inline function 'kotlin.js.asDynamic' call
    tmp.string_1 = tmp_0 + this_0.substring(startIndex);
    return this;
  };
  protoOf(StringBuilder).deleteRange_2clgry_k$ = function (startIndex, endIndex) {
    checkReplaceRange(this, startIndex, endIndex, this.get_length_g42xv3_k$());
    var tmp = this;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = this.string_1.substring(0, startIndex);
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.string_1 = tmp_0 + this.string_1.substring(endIndex);
    return this;
  };
  protoOf(StringBuilder).toCharArray_bwugy6_k$ = function (destination, destinationOffset, startIndex, endIndex) {
    Companion_getInstance_4().checkBoundsIndexes_fu3rwb_k$(startIndex, endIndex, this.get_length_g42xv3_k$());
    Companion_getInstance_4().checkBoundsIndexes_fu3rwb_k$(destinationOffset, (destinationOffset + endIndex | 0) - startIndex | 0, destination.length);
    var dstIndex = destinationOffset;
    var inductionVariable = startIndex;
    if (inductionVariable < endIndex)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp1 = dstIndex;
        dstIndex = tmp1 + 1 | 0;
        destination[tmp1] = charSequenceGet(this.string_1, index);
      }
       while (inductionVariable < endIndex);
  };
  protoOf(StringBuilder).toCharArray$default_lalpk3_k$ = function (destination, destinationOffset, startIndex, endIndex, $super) {
    destinationOffset = destinationOffset === VOID ? 0 : destinationOffset;
    startIndex = startIndex === VOID ? 0 : startIndex;
    endIndex = endIndex === VOID ? this.get_length_g42xv3_k$() : endIndex;
    var tmp;
    if ($super === VOID) {
      this.toCharArray_bwugy6_k$(destination, destinationOffset, startIndex, endIndex);
      tmp = Unit_getInstance();
    } else {
      tmp = $super.toCharArray_bwugy6_k$.call(this, destination, destinationOffset, startIndex, endIndex);
    }
    return tmp;
  };
  protoOf(StringBuilder).appendRange_1a5qnl_k$ = function (value, startIndex, endIndex) {
    this.string_1 = this.string_1 + concatToString_0(value, startIndex, endIndex);
    return this;
  };
  protoOf(StringBuilder).appendRange_arc5oa_k$ = function (value, startIndex, endIndex) {
    var stringCsq = toString_2(value);
    Companion_getInstance_4().checkBoundsIndexes_fu3rwb_k$(startIndex, endIndex, stringCsq.length);
    var tmp = this;
    var tmp_0 = this.string_1;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.string_1 = tmp_0 + stringCsq.substring(startIndex, endIndex);
    return this;
  };
  protoOf(StringBuilder).insertRange_qm6w02_k$ = function (index, value, startIndex, endIndex) {
    Companion_getInstance_4().checkPositionIndex_xiph8v_k$(index, this.get_length_g42xv3_k$());
    var tmp = this;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = this.string_1.substring(0, index) + concatToString_0(value, startIndex, endIndex);
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.string_1 = tmp_0 + this.string_1.substring(index);
    return this;
  };
  protoOf(StringBuilder).insertRange_vx3juf_k$ = function (index, value, startIndex, endIndex) {
    Companion_getInstance_4().checkPositionIndex_xiph8v_k$(index, this.get_length_g42xv3_k$());
    var stringCsq = toString_2(value);
    Companion_getInstance_4().checkBoundsIndexes_fu3rwb_k$(startIndex, endIndex, stringCsq.length);
    var tmp = this;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = this.string_1.substring(0, index);
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_1 = tmp_0 + stringCsq.substring(startIndex, endIndex);
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.string_1 = tmp_1 + this.string_1.substring(index);
    return this;
  };
  function uppercaseChar(_this__u8e3s4) {
    // Inline function 'kotlin.text.uppercase' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var uppercase = toString_0(_this__u8e3s4).toUpperCase();
    return uppercase.length > 1 ? _this__u8e3s4 : charSequenceGet(uppercase, 0);
  }
  function lowercaseChar(_this__u8e3s4) {
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$2 = toString_0(_this__u8e3s4).toLowerCase();
    return charSequenceGet(tmp$ret$2, 0);
  }
  function uppercase(_this__u8e3s4) {
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return toString_0(_this__u8e3s4).toUpperCase();
  }
  function lowercase(_this__u8e3s4) {
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return toString_0(_this__u8e3s4).toLowerCase();
  }
  function isLowSurrogate(_this__u8e3s4) {
    Companion_getInstance_1();
    var containsLower = _Char___init__impl__6a9atx(56320);
    var tmp;
    Companion_getInstance_1();
    if (_this__u8e3s4 <= _Char___init__impl__6a9atx(57343)) {
      tmp = containsLower <= _this__u8e3s4;
    } else {
      tmp = false;
    }
    return tmp;
  }
  function isHighSurrogate(_this__u8e3s4) {
    Companion_getInstance_1();
    var containsLower = _Char___init__impl__6a9atx(55296);
    var tmp;
    Companion_getInstance_1();
    if (_this__u8e3s4 <= _Char___init__impl__6a9atx(56319)) {
      tmp = containsLower <= _this__u8e3s4;
    } else {
      tmp = false;
    }
    return tmp;
  }
  function toString(_this__u8e3s4, radix) {
    // Inline function 'kotlin.js.asDynamic' call
    return _this__u8e3s4.toString(checkRadix(radix));
  }
  function checkRadix(radix) {
    if (!(2 <= radix ? radix <= 36 : false)) {
      throw IllegalArgumentException_init_$Create$_0('radix ' + radix + ' was not in valid range 2..36');
    }
    return radix;
  }
  function get_STRING_CASE_INSENSITIVE_ORDER() {
    _init_properties_stringJs_kt__bg7zye();
    return STRING_CASE_INSENSITIVE_ORDER;
  }
  var STRING_CASE_INSENSITIVE_ORDER;
  function nativeLastIndexOf(_this__u8e3s4, str, fromIndex) {
    _init_properties_stringJs_kt__bg7zye();
    // Inline function 'kotlin.js.asDynamic' call
    return _this__u8e3s4.lastIndexOf(str, fromIndex);
  }
  function substring(_this__u8e3s4, startIndex, endIndex) {
    _init_properties_stringJs_kt__bg7zye();
    // Inline function 'kotlin.js.asDynamic' call
    return _this__u8e3s4.substring(startIndex, endIndex);
  }
  function substring_0(_this__u8e3s4, startIndex) {
    _init_properties_stringJs_kt__bg7zye();
    // Inline function 'kotlin.js.asDynamic' call
    return _this__u8e3s4.substring(startIndex);
  }
  function compareTo(_this__u8e3s4, other, ignoreCase) {
    ignoreCase = ignoreCase === VOID ? false : ignoreCase;
    _init_properties_stringJs_kt__bg7zye();
    if (ignoreCase) {
      var n1 = _this__u8e3s4.length;
      var n2 = other.length;
      // Inline function 'kotlin.comparisons.minOf' call
      var min = Math.min(n1, n2);
      if (min === 0)
        return n1 - n2 | 0;
      var inductionVariable = 0;
      if (inductionVariable < min)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var thisChar = charSequenceGet(_this__u8e3s4, index);
          var otherChar = charSequenceGet(other, index);
          if (!(thisChar === otherChar)) {
            thisChar = uppercaseChar(thisChar);
            otherChar = uppercaseChar(otherChar);
            if (!(thisChar === otherChar)) {
              // Inline function 'kotlin.text.lowercaseChar' call
              // Inline function 'kotlin.text.lowercase' call
              var this_0 = thisChar;
              // Inline function 'kotlin.js.unsafeCast' call
              // Inline function 'kotlin.js.asDynamic' call
              var tmp$ret$3 = toString_0(this_0).toLowerCase();
              thisChar = charSequenceGet(tmp$ret$3, 0);
              // Inline function 'kotlin.text.lowercaseChar' call
              // Inline function 'kotlin.text.lowercase' call
              var this_1 = otherChar;
              // Inline function 'kotlin.js.unsafeCast' call
              // Inline function 'kotlin.js.asDynamic' call
              var tmp$ret$7 = toString_0(this_1).toLowerCase();
              otherChar = charSequenceGet(tmp$ret$7, 0);
              if (!(thisChar === otherChar)) {
                return Char__compareTo_impl_ypi4mb(thisChar, otherChar);
              }
            }
          }
        }
         while (inductionVariable < min);
      return n1 - n2 | 0;
    } else {
      return compareTo_0(_this__u8e3s4, other);
    }
  }
  function concatToString(_this__u8e3s4) {
    _init_properties_stringJs_kt__bg7zye();
    var result = '';
    var inductionVariable = 0;
    var last = _this__u8e3s4.length;
    while (inductionVariable < last) {
      var char = _this__u8e3s4[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      result = result + toString_0(char);
    }
    return result;
  }
  function concatToString_0(_this__u8e3s4, startIndex, endIndex) {
    startIndex = startIndex === VOID ? 0 : startIndex;
    endIndex = endIndex === VOID ? _this__u8e3s4.length : endIndex;
    _init_properties_stringJs_kt__bg7zye();
    Companion_getInstance_4().checkBoundsIndexes_fu3rwb_k$(startIndex, endIndex, _this__u8e3s4.length);
    var result = '';
    var inductionVariable = startIndex;
    if (inductionVariable < endIndex)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        result = result + toString_0(_this__u8e3s4[index]);
      }
       while (inductionVariable < endIndex);
    return result;
  }
  function sam$kotlin_Comparator$0(function_0) {
    this.function_1 = function_0;
  }
  protoOf(sam$kotlin_Comparator$0).compare_bczr_k$ = function (a, b) {
    return this.function_1(a, b);
  };
  protoOf(sam$kotlin_Comparator$0).compare = function (a, b) {
    return this.compare_bczr_k$(a, b);
  };
  function STRING_CASE_INSENSITIVE_ORDER$lambda(a, b) {
    _init_properties_stringJs_kt__bg7zye();
    return compareTo(a, b, true);
  }
  var properties_initialized_stringJs_kt_nta8o4;
  function _init_properties_stringJs_kt__bg7zye() {
    if (!properties_initialized_stringJs_kt_nta8o4) {
      properties_initialized_stringJs_kt_nta8o4 = true;
      var tmp = STRING_CASE_INSENSITIVE_ORDER$lambda;
      STRING_CASE_INSENSITIVE_ORDER = new sam$kotlin_Comparator$0(tmp);
    }
  }
  function get_REPLACEMENT_BYTE_SEQUENCE() {
    _init_properties_utf8Encoding_kt__9thjs4();
    return REPLACEMENT_BYTE_SEQUENCE;
  }
  var REPLACEMENT_BYTE_SEQUENCE;
  var properties_initialized_utf8Encoding_kt_eee1vq;
  function _init_properties_utf8Encoding_kt__9thjs4() {
    if (!properties_initialized_utf8Encoding_kt_eee1vq) {
      properties_initialized_utf8Encoding_kt_eee1vq = true;
      // Inline function 'kotlin.byteArrayOf' call
      REPLACEMENT_BYTE_SEQUENCE = new Int8Array([-17, -65, -67]);
    }
  }
  function fold_0(_this__u8e3s4, initial, operation) {
    var accumulator = initial;
    var inductionVariable = 0;
    var last = _this__u8e3s4.length;
    while (inductionVariable < last) {
      var element = _this__u8e3s4[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      accumulator = operation(accumulator, element);
    }
    return accumulator;
  }
  function forEachIndexed(_this__u8e3s4, action) {
    var index = 0;
    var inductionVariable = 0;
    var last = _this__u8e3s4.length;
    while (inductionVariable < last) {
      var item = _this__u8e3s4[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      var tmp1 = index;
      index = tmp1 + 1 | 0;
      action(tmp1, item);
    }
  }
  function contains_1(_this__u8e3s4, element) {
    return indexOf(_this__u8e3s4, element) >= 0;
  }
  function indexOf(_this__u8e3s4, element) {
    var inductionVariable = 0;
    var last = _this__u8e3s4.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (element === _this__u8e3s4[index]) {
          return index;
        }
      }
       while (inductionVariable <= last);
    return -1;
  }
  function get_indices(_this__u8e3s4) {
    return new IntRange(0, get_lastIndex(_this__u8e3s4));
  }
  function get_lastIndex(_this__u8e3s4) {
    return _this__u8e3s4.length - 1 | 0;
  }
  function contains_2(_this__u8e3s4, element) {
    return indexOf_0(_this__u8e3s4, element) >= 0;
  }
  function indexOf_0(_this__u8e3s4, element) {
    var inductionVariable = 0;
    var last = _this__u8e3s4.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (element === _this__u8e3s4[index]) {
          return index;
        }
      }
       while (inductionVariable <= last);
    return -1;
  }
  function get_indices_0(_this__u8e3s4) {
    return new IntRange(0, get_lastIndex_0(_this__u8e3s4));
  }
  function get_lastIndex_0(_this__u8e3s4) {
    return _this__u8e3s4.length - 1 | 0;
  }
  function contains_3(_this__u8e3s4, element) {
    return indexOf_1(_this__u8e3s4, element) >= 0;
  }
  function indexOf_1(_this__u8e3s4, element) {
    var inductionVariable = 0;
    var last = _this__u8e3s4.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (element === _this__u8e3s4[index]) {
          return index;
        }
      }
       while (inductionVariable <= last);
    return -1;
  }
  function get_indices_1(_this__u8e3s4) {
    return new IntRange(0, get_lastIndex_1(_this__u8e3s4));
  }
  function get_lastIndex_1(_this__u8e3s4) {
    return _this__u8e3s4.length - 1 | 0;
  }
  function contains_4(_this__u8e3s4, element) {
    return indexOf_2(_this__u8e3s4, element) >= 0;
  }
  function indexOf_2(_this__u8e3s4, element) {
    var inductionVariable = 0;
    var last = _this__u8e3s4.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (element.equals(_this__u8e3s4[index])) {
          return index;
        }
      }
       while (inductionVariable <= last);
    return -1;
  }
  function get_indices_2(_this__u8e3s4) {
    return new IntRange(0, get_lastIndex_2(_this__u8e3s4));
  }
  function get_lastIndex_2(_this__u8e3s4) {
    return _this__u8e3s4.length - 1 | 0;
  }
  function get_indices_3(_this__u8e3s4) {
    return new IntRange(0, get_lastIndex_3(_this__u8e3s4));
  }
  function indexOf_3(_this__u8e3s4, element) {
    if (element == null) {
      var inductionVariable = 0;
      var last = _this__u8e3s4.length - 1 | 0;
      if (inductionVariable <= last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (_this__u8e3s4[index] == null) {
            return index;
          }
        }
         while (inductionVariable <= last);
    } else {
      var inductionVariable_0 = 0;
      var last_0 = _this__u8e3s4.length - 1 | 0;
      if (inductionVariable_0 <= last_0)
        do {
          var index_0 = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          if (equals(element, _this__u8e3s4[index_0])) {
            return index_0;
          }
        }
         while (inductionVariable_0 <= last_0);
    }
    return -1;
  }
  function lastIndexOf(_this__u8e3s4, element) {
    if (element == null) {
      var inductionVariable = _this__u8e3s4.length - 1 | 0;
      if (0 <= inductionVariable)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + -1 | 0;
          if (_this__u8e3s4[index] == null) {
            return index;
          }
        }
         while (0 <= inductionVariable);
    } else {
      var inductionVariable_0 = _this__u8e3s4.length - 1 | 0;
      if (0 <= inductionVariable_0)
        do {
          var index_0 = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + -1 | 0;
          if (equals(element, _this__u8e3s4[index_0])) {
            return index_0;
          }
        }
         while (0 <= inductionVariable_0);
    }
    return -1;
  }
  function get_lastIndex_3(_this__u8e3s4) {
    return _this__u8e3s4.length - 1 | 0;
  }
  function joinToString(_this__u8e3s4, separator, prefix, postfix, limit, truncated, transform) {
    separator = separator === VOID ? ', ' : separator;
    prefix = prefix === VOID ? '' : prefix;
    postfix = postfix === VOID ? '' : postfix;
    limit = limit === VOID ? -1 : limit;
    truncated = truncated === VOID ? '...' : truncated;
    transform = transform === VOID ? null : transform;
    return joinTo(_this__u8e3s4, StringBuilder_init_$Create$_1(), separator, prefix, postfix, limit, truncated, transform).toString();
  }
  function joinTo(_this__u8e3s4, buffer, separator, prefix, postfix, limit, truncated, transform) {
    separator = separator === VOID ? ', ' : separator;
    prefix = prefix === VOID ? '' : prefix;
    postfix = postfix === VOID ? '' : postfix;
    limit = limit === VOID ? -1 : limit;
    truncated = truncated === VOID ? '...' : truncated;
    transform = transform === VOID ? null : transform;
    buffer.append_jgojdo_k$(prefix);
    var count = 0;
    var inductionVariable = 0;
    var last = _this__u8e3s4.length;
    $l$loop: while (inductionVariable < last) {
      var element = _this__u8e3s4[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      count = count + 1 | 0;
      if (count > 1) {
        buffer.append_jgojdo_k$(separator);
      }
      if (limit < 0 ? true : count <= limit) {
        appendElement(buffer, element, transform);
      } else
        break $l$loop;
    }
    if (limit >= 0 ? count > limit : false) {
      buffer.append_jgojdo_k$(truncated);
    }
    buffer.append_jgojdo_k$(postfix);
    return buffer;
  }
  function isEmpty_1(_this__u8e3s4) {
    return _this__u8e3s4.length === 0;
  }
  function contains_5(_this__u8e3s4, element) {
    return indexOf_3(_this__u8e3s4, element) >= 0;
  }
  function average(_this__u8e3s4) {
    var sum = 0.0;
    var count = 0;
    var inductionVariable = 0;
    var last = _this__u8e3s4.length;
    while (inductionVariable < last) {
      var element = _this__u8e3s4[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      sum = sum + element;
      count = count + 1 | 0;
    }
    var tmp;
    if (count === 0) {
      DoubleCompanionObject_getInstance();
      tmp = NaN;
    } else {
      tmp = sum / count;
    }
    return tmp;
  }
  function first(_this__u8e3s4) {
    // Inline function 'kotlin.collections.isEmpty' call
    if (_this__u8e3s4.length === 0)
      throw NoSuchElementException_init_$Create$_0('Array is empty.');
    return _this__u8e3s4[0];
  }
  function isEmpty_2(_this__u8e3s4) {
    return _this__u8e3s4.length === 0;
  }
  function last(_this__u8e3s4) {
    // Inline function 'kotlin.collections.isEmpty' call
    if (_this__u8e3s4.length === 0)
      throw NoSuchElementException_init_$Create$_0('Array is empty.');
    return _this__u8e3s4[get_lastIndex_4(_this__u8e3s4)];
  }
  function get_lastIndex_4(_this__u8e3s4) {
    return _this__u8e3s4.length - 1 | 0;
  }
  function get_indices_4(_this__u8e3s4) {
    return new IntRange(0, get_lastIndex_4(_this__u8e3s4));
  }
  function map(_this__u8e3s4, transform) {
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$_0(_this__u8e3s4.length);
    var inductionVariable = 0;
    var last = _this__u8e3s4.length;
    while (inductionVariable < last) {
      var item = _this__u8e3s4[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      destination.add_utx5q5_k$(transform(item));
    }
    return destination;
  }
  function mapTo(_this__u8e3s4, destination, transform) {
    var inductionVariable = 0;
    var last = _this__u8e3s4.length;
    while (inductionVariable < last) {
      var item = _this__u8e3s4[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      destination.add_utx5q5_k$(transform(item));
    }
    return destination;
  }
  function filterNotNull(_this__u8e3s4) {
    return filterNotNullTo(_this__u8e3s4, ArrayList_init_$Create$());
  }
  function filterNotNullTo(_this__u8e3s4, destination) {
    var inductionVariable = 0;
    var last = _this__u8e3s4.length;
    while (inductionVariable < last) {
      var element = _this__u8e3s4[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      if (!(element == null)) {
        destination.add_utx5q5_k$(element);
      }
    }
    return destination;
  }
  function all(_this__u8e3s4, predicate) {
    var inductionVariable = 0;
    var last = _this__u8e3s4.length;
    while (inductionVariable < last) {
      var element = _this__u8e3s4[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      if (!predicate(element))
        return false;
    }
    return true;
  }
  function all_0(_this__u8e3s4, predicate) {
    var inductionVariable = 0;
    var last = _this__u8e3s4.length;
    while (inductionVariable < last) {
      var element = _this__u8e3s4[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      if (!predicate(element))
        return false;
    }
    return true;
  }
  function sortedArray(_this__u8e3s4) {
    // Inline function 'kotlin.collections.isEmpty' call
    if (_this__u8e3s4.length === 0)
      return _this__u8e3s4;
    // Inline function 'kotlin.apply' call
    // Inline function 'kotlin.collections.copyOf' call
    // Inline function 'kotlin.js.asDynamic' call
    var this_0 = _this__u8e3s4.slice();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.collections.sortedArray.<anonymous>' call
    sort(this_0);
    return this_0;
  }
  function maxOf(_this__u8e3s4, selector) {
    // Inline function 'kotlin.collections.isEmpty' call
    if (_this__u8e3s4.length === 0)
      throw NoSuchElementException_init_$Create$();
    var maxValue = selector(_this__u8e3s4[0]);
    var inductionVariable = 1;
    var last = get_lastIndex_4(_this__u8e3s4);
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var v = selector(_this__u8e3s4[i]);
        // Inline function 'kotlin.comparisons.maxOf' call
        var a = maxValue;
        maxValue = Math.max(a, v);
      }
       while (!(i === last));
    return maxValue;
  }
  function max_2(_this__u8e3s4) {
    // Inline function 'kotlin.collections.isEmpty' call
    if (_this__u8e3s4.length === 0)
      throw NoSuchElementException_init_$Create$();
    var max = _this__u8e3s4[0];
    var inductionVariable = 1;
    var last = get_lastIndex_1(_this__u8e3s4);
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var e = _this__u8e3s4[i];
        if (max < e)
          max = e;
      }
       while (!(i === last));
    return max;
  }
  function isEmpty_3(_this__u8e3s4) {
    return _this__u8e3s4.length === 0;
  }
  function filter(_this__u8e3s4, predicate) {
    // Inline function 'kotlin.collections.filterTo' call
    var destination = ArrayList_init_$Create$();
    var inductionVariable = 0;
    var last = _this__u8e3s4.length;
    while (inductionVariable < last) {
      var element = _this__u8e3s4[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      if (predicate(element)) {
        destination.add_utx5q5_k$(element);
      }
    }
    return destination;
  }
  function filterTo(_this__u8e3s4, destination, predicate) {
    var inductionVariable = 0;
    var last = _this__u8e3s4.length;
    while (inductionVariable < last) {
      var element = _this__u8e3s4[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      if (predicate(element)) {
        destination.add_utx5q5_k$(element);
      }
    }
    return destination;
  }
  function map_0(_this__u8e3s4, transform) {
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$_0(_this__u8e3s4.length);
    var inductionVariable = 0;
    var last = _this__u8e3s4.length;
    while (inductionVariable < last) {
      var item = _this__u8e3s4[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      destination.add_utx5q5_k$(transform(item));
    }
    return destination;
  }
  function mapTo_0(_this__u8e3s4, destination, transform) {
    var inductionVariable = 0;
    var last = _this__u8e3s4.length;
    while (inductionVariable < last) {
      var item = _this__u8e3s4[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      destination.add_utx5q5_k$(transform(item));
    }
    return destination;
  }
  function reversedArray(_this__u8e3s4) {
    // Inline function 'kotlin.collections.isEmpty' call
    if (_this__u8e3s4.length === 0)
      return _this__u8e3s4;
    var result = new Int32Array(_this__u8e3s4.length);
    var lastIndex = get_lastIndex_1(_this__u8e3s4);
    var inductionVariable = 0;
    if (inductionVariable <= lastIndex)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        result[lastIndex - i | 0] = _this__u8e3s4[i];
      }
       while (!(i === lastIndex));
    return result;
  }
  function sortedArray_0(_this__u8e3s4) {
    // Inline function 'kotlin.collections.isEmpty' call
    if (_this__u8e3s4.length === 0)
      return _this__u8e3s4;
    // Inline function 'kotlin.apply' call
    // Inline function 'kotlin.collections.copyOf' call
    // Inline function 'kotlin.js.asDynamic' call
    var this_0 = _this__u8e3s4.slice();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.collections.sortedArray.<anonymous>' call
    sort_0(this_0);
    return this_0;
  }
  function isEmpty_4(_this__u8e3s4) {
    return _this__u8e3s4.length === 0;
  }
  function all_1(_this__u8e3s4, predicate) {
    var inductionVariable = 0;
    var last = _this__u8e3s4.length;
    while (inductionVariable < last) {
      var element = _this__u8e3s4[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      if (!predicate(element))
        return false;
    }
    return true;
  }
  function get_indices_5(_this__u8e3s4) {
    return new IntRange(0, get_lastIndex_5(_this__u8e3s4));
  }
  function get_lastIndex_5(_this__u8e3s4) {
    return _this__u8e3s4.length - 1 | 0;
  }
  function getOrNull(_this__u8e3s4, index) {
    return (index >= 0 ? index <= get_lastIndex_3(_this__u8e3s4) : false) ? _this__u8e3s4[index] : null;
  }
  function indexOfFirst(_this__u8e3s4, predicate) {
    var index = 0;
    var tmp0_iterator = _this__u8e3s4.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var item = tmp0_iterator.next_20eer_k$();
      if (predicate(item))
        return index;
      index = index + 1 | 0;
    }
    return -1;
  }
  function indexOfLast(_this__u8e3s4, predicate) {
    var iterator = _this__u8e3s4.listIterator_70e65o_k$(_this__u8e3s4.get_size_woubt6_k$());
    while (iterator.hasPrevious_qh0629_k$()) {
      if (predicate(iterator.previous_l2dfd5_k$())) {
        return iterator.nextIndex_jshxun_k$();
      }
    }
    return -1;
  }
  function any(_this__u8e3s4, predicate) {
    var tmp;
    if (isInterface(_this__u8e3s4, Collection)) {
      tmp = _this__u8e3s4.isEmpty_y1axqb_k$();
    } else {
      tmp = false;
    }
    if (tmp)
      return false;
    var tmp0_iterator = _this__u8e3s4.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      if (predicate(element))
        return true;
    }
    return false;
  }
  function all_2(_this__u8e3s4, predicate) {
    var tmp;
    if (isInterface(_this__u8e3s4, Collection)) {
      tmp = _this__u8e3s4.isEmpty_y1axqb_k$();
    } else {
      tmp = false;
    }
    if (tmp)
      return true;
    var tmp0_iterator = _this__u8e3s4.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      if (!predicate(element))
        return false;
    }
    return true;
  }
  function joinToString_0(_this__u8e3s4, separator, prefix, postfix, limit, truncated, transform) {
    separator = separator === VOID ? ', ' : separator;
    prefix = prefix === VOID ? '' : prefix;
    postfix = postfix === VOID ? '' : postfix;
    limit = limit === VOID ? -1 : limit;
    truncated = truncated === VOID ? '...' : truncated;
    transform = transform === VOID ? null : transform;
    return joinTo_0(_this__u8e3s4, StringBuilder_init_$Create$_1(), separator, prefix, postfix, limit, truncated, transform).toString();
  }
  function joinTo_0(_this__u8e3s4, buffer, separator, prefix, postfix, limit, truncated, transform) {
    separator = separator === VOID ? ', ' : separator;
    prefix = prefix === VOID ? '' : prefix;
    postfix = postfix === VOID ? '' : postfix;
    limit = limit === VOID ? -1 : limit;
    truncated = truncated === VOID ? '...' : truncated;
    transform = transform === VOID ? null : transform;
    buffer.append_jgojdo_k$(prefix);
    var count = 0;
    var tmp0_iterator = _this__u8e3s4.iterator_jk1svi_k$();
    $l$loop: while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      count = count + 1 | 0;
      if (count > 1) {
        buffer.append_jgojdo_k$(separator);
      }
      if (limit < 0 ? true : count <= limit) {
        appendElement(buffer, element, transform);
      } else
        break $l$loop;
    }
    if (limit >= 0 ? count > limit : false) {
      buffer.append_jgojdo_k$(truncated);
    }
    buffer.append_jgojdo_k$(postfix);
    return buffer;
  }
  function forEachIndexed_0(_this__u8e3s4, action) {
    var index = 0;
    var tmp0_iterator = _this__u8e3s4.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var item = tmp0_iterator.next_20eer_k$();
      var tmp1 = index;
      index = tmp1 + 1 | 0;
      action(checkIndexOverflow(tmp1), item);
    }
  }
  function firstOrNull(_this__u8e3s4, predicate) {
    var tmp0_iterator = _this__u8e3s4.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      if (predicate(element))
        return element;
    }
    return null;
  }
  function count(_this__u8e3s4, predicate) {
    var tmp;
    if (isInterface(_this__u8e3s4, Collection)) {
      tmp = _this__u8e3s4.isEmpty_y1axqb_k$();
    } else {
      tmp = false;
    }
    if (tmp)
      return 0;
    var count = 0;
    var tmp0_iterator = _this__u8e3s4.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      if (predicate(element)) {
        count = count + 1 | 0;
        checkCountOverflow(count);
      }
    }
    return count;
  }
  function filter_0(_this__u8e3s4, predicate) {
    // Inline function 'kotlin.collections.filterTo' call
    var destination = ArrayList_init_$Create$();
    var tmp0_iterator = _this__u8e3s4.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      if (predicate(element)) {
        destination.add_utx5q5_k$(element);
      }
    }
    return destination;
  }
  function filterTo_0(_this__u8e3s4, destination, predicate) {
    var tmp0_iterator = _this__u8e3s4.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      if (predicate(element)) {
        destination.add_utx5q5_k$(element);
      }
    }
    return destination;
  }
  function first_0(_this__u8e3s4) {
    if (_this__u8e3s4.isEmpty_y1axqb_k$())
      throw NoSuchElementException_init_$Create$_0('List is empty.');
    return _this__u8e3s4.get_c1px32_k$(0);
  }
  function last_0(_this__u8e3s4) {
    if (_this__u8e3s4.isEmpty_y1axqb_k$())
      throw NoSuchElementException_init_$Create$_0('List is empty.');
    return _this__u8e3s4.get_c1px32_k$(get_lastIndex_6(_this__u8e3s4));
  }
  function maxOf_0(_this__u8e3s4, selector) {
    var iterator = _this__u8e3s4.iterator_jk1svi_k$();
    if (!iterator.hasNext_bitz1p_k$())
      throw NoSuchElementException_init_$Create$();
    var maxValue = selector(iterator.next_20eer_k$());
    while (iterator.hasNext_bitz1p_k$()) {
      var v = selector(iterator.next_20eer_k$());
      if (compareTo_0(maxValue, v) < 0) {
        maxValue = v;
      }
    }
    return maxValue;
  }
  function sortedBy(_this__u8e3s4, selector) {
    // Inline function 'kotlin.comparisons.compareBy' call
    var tmp = sortedBy$lambda(selector);
    var tmp$ret$0 = new sam$kotlin_Comparator$0_0(tmp);
    return sortedWith(_this__u8e3s4, tmp$ret$0);
  }
  function sortedWith(_this__u8e3s4, comparator) {
    if (isInterface(_this__u8e3s4, Collection)) {
      if (_this__u8e3s4.get_size_woubt6_k$() <= 1)
        return toList(_this__u8e3s4);
      // Inline function 'kotlin.apply' call
      // Inline function 'kotlin.collections.toTypedArray' call
      var tmp = copyToArray(_this__u8e3s4);
      var this_0 = isArray(tmp) ? tmp : THROW_CCE();
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlin.collections.sortedWith.<anonymous>' call
      sortWith_0(this_0, comparator);
      return asList(this_0);
    }
    // Inline function 'kotlin.apply' call
    var this_1 = toMutableList(_this__u8e3s4);
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.collections.sortedWith.<anonymous>' call
    sortWith(this_1, comparator);
    return this_1;
  }
  function toList(_this__u8e3s4) {
    if (isInterface(_this__u8e3s4, Collection)) {
      var tmp;
      switch (_this__u8e3s4.get_size_woubt6_k$()) {
        case 0:
          tmp = emptyList();
          break;
        case 1:
          var tmp_0;
          if (isInterface(_this__u8e3s4, List)) {
            tmp_0 = _this__u8e3s4.get_c1px32_k$(0);
          } else {
            tmp_0 = _this__u8e3s4.iterator_jk1svi_k$().next_20eer_k$();
          }

          tmp = listOf(tmp_0);
          break;
        default:
          tmp = toMutableList_0(_this__u8e3s4);
          break;
      }
      return tmp;
    }
    return optimizeReadOnlyList(toMutableList(_this__u8e3s4));
  }
  function toMutableList(_this__u8e3s4) {
    if (isInterface(_this__u8e3s4, Collection))
      return toMutableList_0(_this__u8e3s4);
    return toCollection(_this__u8e3s4, ArrayList_init_$Create$());
  }
  function toMutableList_0(_this__u8e3s4) {
    return ArrayList_init_$Create$_1(_this__u8e3s4);
  }
  function toCollection(_this__u8e3s4, destination) {
    var tmp0_iterator = _this__u8e3s4.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var item = tmp0_iterator.next_20eer_k$();
      destination.add_utx5q5_k$(item);
    }
    return destination;
  }
  function map_1(_this__u8e3s4, transform) {
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(_this__u8e3s4, 10));
    var tmp0_iterator = _this__u8e3s4.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var item = tmp0_iterator.next_20eer_k$();
      destination.add_utx5q5_k$(transform(item));
    }
    return destination;
  }
  function mapTo_1(_this__u8e3s4, destination, transform) {
    var tmp0_iterator = _this__u8e3s4.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var item = tmp0_iterator.next_20eer_k$();
      destination.add_utx5q5_k$(transform(item));
    }
    return destination;
  }
  function maxByOrNull(_this__u8e3s4, selector) {
    var iterator = _this__u8e3s4.iterator_jk1svi_k$();
    if (!iterator.hasNext_bitz1p_k$())
      return null;
    var maxElem = iterator.next_20eer_k$();
    if (!iterator.hasNext_bitz1p_k$())
      return maxElem;
    var maxValue = selector(maxElem);
    do {
      var e = iterator.next_20eer_k$();
      var v = selector(e);
      if (compareTo_0(maxValue, v) < 0) {
        maxElem = e;
        maxValue = v;
      }
    }
     while (iterator.hasNext_bitz1p_k$());
    return maxElem;
  }
  function toDoubleArray(_this__u8e3s4) {
    var result = new Float64Array(_this__u8e3s4.get_size_woubt6_k$());
    var index = 0;
    var tmp0_iterator = _this__u8e3s4.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      var tmp1 = index;
      index = tmp1 + 1 | 0;
      result[tmp1] = element;
    }
    return result;
  }
  function plus_0(_this__u8e3s4, elements) {
    if (isInterface(elements, Collection)) {
      var result = ArrayList_init_$Create$_0(_this__u8e3s4.get_size_woubt6_k$() + elements.get_size_woubt6_k$() | 0);
      result.addAll_4lagoh_k$(_this__u8e3s4);
      result.addAll_4lagoh_k$(elements);
      return result;
    } else {
      var result_0 = ArrayList_init_$Create$_1(_this__u8e3s4);
      addAll(result_0, elements);
      return result_0;
    }
  }
  function flatMap(_this__u8e3s4, transform) {
    // Inline function 'kotlin.collections.flatMapTo' call
    var destination = ArrayList_init_$Create$();
    var tmp0_iterator = _this__u8e3s4.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      var list = transform(element);
      addAll(destination, list);
    }
    return destination;
  }
  function flatMapTo(_this__u8e3s4, destination, transform) {
    var tmp0_iterator = _this__u8e3s4.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      var list = transform(element);
      addAll(destination, list);
    }
    return destination;
  }
  function max_3(_this__u8e3s4) {
    var iterator = _this__u8e3s4.iterator_jk1svi_k$();
    if (!iterator.hasNext_bitz1p_k$())
      throw NoSuchElementException_init_$Create$();
    var max = iterator.next_20eer_k$();
    while (iterator.hasNext_bitz1p_k$()) {
      var e = iterator.next_20eer_k$();
      // Inline function 'kotlin.comparisons.maxOf' call
      var a = max;
      max = Math.max(a, e);
    }
    return max;
  }
  function maxOf_1(_this__u8e3s4, selector) {
    var iterator = _this__u8e3s4.iterator_jk1svi_k$();
    if (!iterator.hasNext_bitz1p_k$())
      throw NoSuchElementException_init_$Create$();
    var maxValue = selector(iterator.next_20eer_k$());
    while (iterator.hasNext_bitz1p_k$()) {
      var v = selector(iterator.next_20eer_k$());
      // Inline function 'kotlin.comparisons.maxOf' call
      var a = maxValue;
      maxValue = Math.max(a, v);
    }
    return maxValue;
  }
  function forEach(_this__u8e3s4, action) {
    var tmp0_iterator = _this__u8e3s4.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      action(element);
    }
  }
  function plus_1(_this__u8e3s4, element) {
    var result = ArrayList_init_$Create$_0(_this__u8e3s4.get_size_woubt6_k$() + 1 | 0);
    result.addAll_4lagoh_k$(_this__u8e3s4);
    result.add_utx5q5_k$(element);
    return result;
  }
  function getOrNull_0(_this__u8e3s4, index) {
    return (index >= 0 ? index <= get_lastIndex_6(_this__u8e3s4) : false) ? _this__u8e3s4.get_c1px32_k$(index) : null;
  }
  function mapIndexed(_this__u8e3s4, transform) {
    // Inline function 'kotlin.collections.mapIndexedTo' call
    var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(_this__u8e3s4, 10));
    var index = 0;
    var tmp0_iterator = _this__u8e3s4.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var item = tmp0_iterator.next_20eer_k$();
      var tmp1 = index;
      index = tmp1 + 1 | 0;
      destination.add_utx5q5_k$(transform(checkIndexOverflow(tmp1), item));
    }
    return destination;
  }
  function mapIndexedTo(_this__u8e3s4, destination, transform) {
    var index = 0;
    var tmp0_iterator = _this__u8e3s4.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var item = tmp0_iterator.next_20eer_k$();
      var tmp1 = index;
      index = tmp1 + 1 | 0;
      destination.add_utx5q5_k$(transform(checkIndexOverflow(tmp1), item));
    }
    return destination;
  }
  function average_0(_this__u8e3s4) {
    var sum = 0.0;
    var count = 0;
    var tmp0_iterator = _this__u8e3s4.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      sum = sum + element;
      count = count + 1 | 0;
      checkCountOverflow(count);
    }
    var tmp;
    if (count === 0) {
      DoubleCompanionObject_getInstance();
      tmp = NaN;
    } else {
      tmp = sum / count;
    }
    return tmp;
  }
  function sumOf(_this__u8e3s4, selector) {
    var sum = 0.0;
    var tmp0_iterator = _this__u8e3s4.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      sum = sum + selector(element);
    }
    return sum;
  }
  function first_1(_this__u8e3s4) {
    if (isInterface(_this__u8e3s4, List))
      return first_0(_this__u8e3s4);
    else {
      var iterator = _this__u8e3s4.iterator_jk1svi_k$();
      if (!iterator.hasNext_bitz1p_k$())
        throw NoSuchElementException_init_$Create$_0('Collection is empty.');
      return iterator.next_20eer_k$();
    }
  }
  function toHashSet(_this__u8e3s4) {
    return toCollection(_this__u8e3s4, HashSet_init_$Create$_3(mapCapacity(collectionSizeOrDefault(_this__u8e3s4, 12))));
  }
  function sortBy(_this__u8e3s4, selector) {
    if (_this__u8e3s4.get_size_woubt6_k$() > 1) {
      // Inline function 'kotlin.comparisons.compareBy' call
      var tmp = sortBy$lambda(selector);
      var tmp$ret$0 = new sam$kotlin_Comparator$0_1(tmp);
      sortWith(_this__u8e3s4, tmp$ret$0);
    }
  }
  function minByOrNull(_this__u8e3s4, selector) {
    var iterator = _this__u8e3s4.iterator_jk1svi_k$();
    if (!iterator.hasNext_bitz1p_k$())
      return null;
    var minElem = iterator.next_20eer_k$();
    if (!iterator.hasNext_bitz1p_k$())
      return minElem;
    var minValue = selector(minElem);
    do {
      var e = iterator.next_20eer_k$();
      var v = selector(e);
      if (compareTo_0(minValue, v) > 0) {
        minElem = e;
        minValue = v;
      }
    }
     while (iterator.hasNext_bitz1p_k$());
    return minElem;
  }
  function withIndex(_this__u8e3s4) {
    return new IndexingIterable(withIndex$lambda(_this__u8e3s4));
  }
  function sumOf_0(_this__u8e3s4, selector) {
    var sum = 0;
    var tmp0_iterator = _this__u8e3s4.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      sum = sum + selector(element) | 0;
    }
    return sum;
  }
  function minOf(_this__u8e3s4, selector) {
    var iterator = _this__u8e3s4.iterator_jk1svi_k$();
    if (!iterator.hasNext_bitz1p_k$())
      throw NoSuchElementException_init_$Create$();
    var minValue = selector(iterator.next_20eer_k$());
    while (iterator.hasNext_bitz1p_k$()) {
      var v = selector(iterator.next_20eer_k$());
      if (compareTo_0(minValue, v) > 0) {
        minValue = v;
      }
    }
    return minValue;
  }
  function sam$kotlin_Comparator$0_0(function_0) {
    this.function_1 = function_0;
  }
  protoOf(sam$kotlin_Comparator$0_0).compare_bczr_k$ = function (a, b) {
    return this.function_1(a, b);
  };
  protoOf(sam$kotlin_Comparator$0_0).compare = function (a, b) {
    return this.compare_bczr_k$(a, b);
  };
  function sam$kotlin_Comparator$0_1(function_0) {
    this.function_1 = function_0;
  }
  protoOf(sam$kotlin_Comparator$0_1).compare_bczr_k$ = function (a, b) {
    return this.function_1(a, b);
  };
  protoOf(sam$kotlin_Comparator$0_1).compare = function (a, b) {
    return this.compare_bczr_k$(a, b);
  };
  function sortedBy$lambda($selector) {
    return function (a, b) {
      // Inline function 'kotlin.comparisons.compareValuesBy' call
      return compareValues($selector(a), $selector(b));
    };
  }
  function sortBy$lambda($selector) {
    return function (a, b) {
      // Inline function 'kotlin.comparisons.compareValuesBy' call
      return compareValues($selector(a), $selector(b));
    };
  }
  function withIndex$lambda($this_withIndex) {
    return function () {
      return $this_withIndex.iterator_jk1svi_k$();
    };
  }
  function until(_this__u8e3s4, to) {
    if (to <= IntCompanionObject_getInstance().MIN_VALUE)
      return Companion_getInstance_8().EMPTY_1;
    return numberRangeToNumber(_this__u8e3s4, to - 1 | 0);
  }
  function until_0(_this__u8e3s4, to) {
    if (Char__compareTo_impl_ypi4mb(to, _Char___init__impl__6a9atx(0)) <= 0)
      return Companion_getInstance_9().EMPTY_1;
    return Char__rangeTo_impl_tkncvp(_this__u8e3s4, Char__toChar_impl_3h7tei(Char__minus_impl_a2frrh_0(to, 1)));
  }
  function until_1(_this__u8e3s4, to) {
    return numberRangeToNumber(_this__u8e3s4, to - 1 | 0);
  }
  function until_2(_this__u8e3s4, to) {
    return numberRangeToNumber(_this__u8e3s4, to - 1 | 0);
  }
  function until_3(_this__u8e3s4, to) {
    Companion_getInstance_3();
    if (to.compareTo_9jj042_k$(new Long(0, -2147483648)) <= 0)
      return Companion_getInstance_10().EMPTY_1;
    var tmp = toLong(_this__u8e3s4);
    // Inline function 'kotlin.Long.minus' call
    var tmp$ret$0 = to.minus_mfbszm_k$(toLong(1));
    return tmp.rangeTo_dxc9t6_k$(tmp$ret$0.toLong_edfucp_k$());
  }
  function until_4(_this__u8e3s4, to) {
    return numberRangeToNumber(_this__u8e3s4, to - 1 | 0);
  }
  function until_5(_this__u8e3s4, to) {
    return numberRangeToNumber(_this__u8e3s4, to - 1 | 0);
  }
  function until_6(_this__u8e3s4, to) {
    if (to <= IntCompanionObject_getInstance().MIN_VALUE)
      return Companion_getInstance_8().EMPTY_1;
    return numberRangeToNumber(_this__u8e3s4, to - 1 | 0);
  }
  function until_7(_this__u8e3s4, to) {
    Companion_getInstance_3();
    if (to.compareTo_9jj042_k$(new Long(0, -2147483648)) <= 0)
      return Companion_getInstance_10().EMPTY_1;
    var tmp = toLong(_this__u8e3s4);
    // Inline function 'kotlin.Long.minus' call
    var tmp$ret$0 = to.minus_mfbszm_k$(toLong(1));
    return tmp.rangeTo_dxc9t6_k$(tmp$ret$0.toLong_edfucp_k$());
  }
  function until_8(_this__u8e3s4, to) {
    return numberRangeToNumber(_this__u8e3s4, to - 1 | 0);
  }
  function until_9(_this__u8e3s4, to) {
    return numberRangeToNumber(_this__u8e3s4, to - 1 | 0);
  }
  function until_10(_this__u8e3s4, to) {
    if (to <= IntCompanionObject_getInstance().MIN_VALUE)
      return Companion_getInstance_8().EMPTY_1;
    return numberRangeToNumber(_this__u8e3s4, to - 1 | 0);
  }
  function until_11(_this__u8e3s4, to) {
    Companion_getInstance_3();
    if (to.compareTo_9jj042_k$(new Long(0, -2147483648)) <= 0)
      return Companion_getInstance_10().EMPTY_1;
    var tmp = toLong(_this__u8e3s4);
    // Inline function 'kotlin.Long.minus' call
    var tmp$ret$0 = to.minus_mfbszm_k$(toLong(1));
    return tmp.rangeTo_dxc9t6_k$(tmp$ret$0.toLong_edfucp_k$());
  }
  function until_12(_this__u8e3s4, to) {
    // Inline function 'kotlin.Long.minus' call
    var tmp$ret$0 = toLong(to).minus_mfbszm_k$(toLong(1));
    return _this__u8e3s4.rangeTo_dxc9t6_k$(tmp$ret$0.toLong_edfucp_k$());
  }
  function until_13(_this__u8e3s4, to) {
    // Inline function 'kotlin.Long.minus' call
    var tmp$ret$0 = toLong(to).minus_mfbszm_k$(toLong(1));
    return _this__u8e3s4.rangeTo_dxc9t6_k$(tmp$ret$0.toLong_edfucp_k$());
  }
  function until_14(_this__u8e3s4, to) {
    // Inline function 'kotlin.Long.minus' call
    var tmp$ret$0 = toLong(to).minus_mfbszm_k$(toLong(1));
    return _this__u8e3s4.rangeTo_dxc9t6_k$(tmp$ret$0.toLong_edfucp_k$());
  }
  function until_15(_this__u8e3s4, to) {
    Companion_getInstance_3();
    if (to.compareTo_9jj042_k$(new Long(0, -2147483648)) <= 0)
      return Companion_getInstance_10().EMPTY_1;
    // Inline function 'kotlin.Long.minus' call
    var tmp$ret$0 = to.minus_mfbszm_k$(toLong(1));
    return _this__u8e3s4.rangeTo_dxc9t6_k$(tmp$ret$0.toLong_edfucp_k$());
  }
  function reversed(_this__u8e3s4) {
    return Companion_getInstance_11().fromClosedRange_y6bqsv_k$(_this__u8e3s4.last_1, _this__u8e3s4.first_1, -_this__u8e3s4.step_1 | 0);
  }
  function downTo(_this__u8e3s4, to) {
    return Companion_getInstance_11().fromClosedRange_y6bqsv_k$(_this__u8e3s4, to, -1);
  }
  function coerceAtMost(_this__u8e3s4, maximumValue) {
    return _this__u8e3s4 > maximumValue ? maximumValue : _this__u8e3s4;
  }
  function coerceAtLeast(_this__u8e3s4, minimumValue) {
    return _this__u8e3s4 < minimumValue ? minimumValue : _this__u8e3s4;
  }
  function step(_this__u8e3s4, step) {
    checkStepIsPositive(step > 0, step);
    return Companion_getInstance_11().fromClosedRange_y6bqsv_k$(_this__u8e3s4.first_1, _this__u8e3s4.last_1, _this__u8e3s4.step_1 > 0 ? step : -step | 0);
  }
  function coerceIn(_this__u8e3s4, minimumValue, maximumValue) {
    if (minimumValue > maximumValue)
      throw IllegalArgumentException_init_$Create$_0('Cannot coerce value to an empty range: maximum ' + maximumValue + ' is less than minimum ' + minimumValue + '.');
    if (_this__u8e3s4 < minimumValue)
      return minimumValue;
    if (_this__u8e3s4 > maximumValue)
      return maximumValue;
    return _this__u8e3s4;
  }
  function coerceIn_0(_this__u8e3s4, minimumValue, maximumValue) {
    if (minimumValue > maximumValue)
      throw IllegalArgumentException_init_$Create$_0('Cannot coerce value to an empty range: maximum ' + maximumValue + ' is less than minimum ' + minimumValue + '.');
    if (_this__u8e3s4 < minimumValue)
      return minimumValue;
    if (_this__u8e3s4 > maximumValue)
      return maximumValue;
    return _this__u8e3s4;
  }
  function coerceAtLeast_0(_this__u8e3s4, minimumValue) {
    return _this__u8e3s4 < minimumValue ? minimumValue : _this__u8e3s4;
  }
  function coerceIn_1(_this__u8e3s4, minimumValue, maximumValue) {
    if (minimumValue > maximumValue)
      throw IllegalArgumentException_init_$Create$_0('Cannot coerce value to an empty range: maximum ' + maximumValue + ' is less than minimum ' + minimumValue + '.');
    if (_this__u8e3s4 < minimumValue)
      return minimumValue;
    if (_this__u8e3s4 > maximumValue)
      return maximumValue;
    return _this__u8e3s4;
  }
  function forEachIndexed_1(_this__u8e3s4, action) {
    var index = 0;
    var inductionVariable = 0;
    while (inductionVariable < charSequenceLength(_this__u8e3s4)) {
      var item = charSequenceGet(_this__u8e3s4, inductionVariable);
      inductionVariable = inductionVariable + 1 | 0;
      var tmp1 = index;
      index = tmp1 + 1 | 0;
      action(tmp1, new Char(item));
    }
  }
  function getOrElse(_this__u8e3s4, index, defaultValue) {
    return (index >= 0 ? index <= get_lastIndex_7(_this__u8e3s4) : false) ? charSequenceGet(_this__u8e3s4, index) : defaultValue(index).value_1;
  }
  function contentEquals_0(_this__u8e3s4, other) {
    var tmp;
    var tmp_0 = _this__u8e3s4;
    if ((tmp_0 == null ? null : new UByteArray(tmp_0)) == null) {
      tmp = null;
    } else {
      tmp = _UByteArray___get_storage__impl__d4kctt(_this__u8e3s4);
    }
    var tmp_1 = tmp;
    var tmp_2;
    var tmp_3 = other;
    if ((tmp_3 == null ? null : new UByteArray(tmp_3)) == null) {
      tmp_2 = null;
    } else {
      tmp_2 = _UByteArray___get_storage__impl__d4kctt(other);
    }
    return contentEquals_4(tmp_1, tmp_2);
  }
  function contentEquals_1(_this__u8e3s4, other) {
    var tmp;
    var tmp_0 = _this__u8e3s4;
    if ((tmp_0 == null ? null : new UIntArray(tmp_0)) == null) {
      tmp = null;
    } else {
      tmp = _UIntArray___get_storage__impl__92a0v0(_this__u8e3s4);
    }
    var tmp_1 = tmp;
    var tmp_2;
    var tmp_3 = other;
    if ((tmp_3 == null ? null : new UIntArray(tmp_3)) == null) {
      tmp_2 = null;
    } else {
      tmp_2 = _UIntArray___get_storage__impl__92a0v0(other);
    }
    return contentEquals_5(tmp_1, tmp_2);
  }
  function contentEquals_2(_this__u8e3s4, other) {
    var tmp;
    var tmp_0 = _this__u8e3s4;
    if ((tmp_0 == null ? null : new ULongArray(tmp_0)) == null) {
      tmp = null;
    } else {
      tmp = _ULongArray___get_storage__impl__28e64j(_this__u8e3s4);
    }
    var tmp_1 = tmp;
    var tmp_2;
    var tmp_3 = other;
    if ((tmp_3 == null ? null : new ULongArray(tmp_3)) == null) {
      tmp_2 = null;
    } else {
      tmp_2 = _ULongArray___get_storage__impl__28e64j(other);
    }
    return contentEquals_6(tmp_1, tmp_2);
  }
  function contentEquals_3(_this__u8e3s4, other) {
    var tmp;
    var tmp_0 = _this__u8e3s4;
    if ((tmp_0 == null ? null : new UShortArray(tmp_0)) == null) {
      tmp = null;
    } else {
      tmp = _UShortArray___get_storage__impl__t2jpv5(_this__u8e3s4);
    }
    var tmp_1 = tmp;
    var tmp_2;
    var tmp_3 = other;
    if ((tmp_3 == null ? null : new UShortArray(tmp_3)) == null) {
      tmp_2 = null;
    } else {
      tmp_2 = _UShortArray___get_storage__impl__t2jpv5(other);
    }
    return contentEquals_7(tmp_1, tmp_2);
  }
  function until_16(_this__u8e3s4, to) {
    // Inline function 'kotlin.UInt.compareTo' call
    Companion_getInstance_17();
    var other = _UInt___init__impl__l7qpdl(0);
    if (uintCompare(_UInt___get_data__impl__f0vqqw(to), _UInt___get_data__impl__f0vqqw(other)) <= 0)
      return Companion_getInstance_18().EMPTY_1;
    // Inline function 'kotlin.UInt.rangeTo' call
    // Inline function 'kotlin.UInt.toUInt' call
    // Inline function 'kotlin.UInt.minus' call
    var other_0 = _UInt___init__impl__l7qpdl(1);
    var other_1 = _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(to) - _UInt___get_data__impl__f0vqqw(other_0) | 0);
    return new UIntRange(_this__u8e3s4, other_1);
  }
  function until_17(_this__u8e3s4, to) {
    // Inline function 'kotlin.ULong.compareTo' call
    Companion_getInstance_20();
    var other = _ULong___init__impl__c78o9k(new Long(0, 0));
    if (ulongCompare(_ULong___get_data__impl__fggpzb(to), _ULong___get_data__impl__fggpzb(other)) <= 0)
      return Companion_getInstance_21().EMPTY_1;
    // Inline function 'kotlin.ULong.rangeTo' call
    // Inline function 'kotlin.ULong.toULong' call
    // Inline function 'kotlin.ULong.minus' call
    // Inline function 'kotlin.ULong.minus' call
    // Inline function 'kotlin.UInt.toULong' call
    var this_0 = _UInt___init__impl__l7qpdl(1);
    var other_0 = _ULong___init__impl__c78o9k(toLong(_UInt___get_data__impl__f0vqqw(this_0)).and_4spn93_k$(new Long(-1, 0)));
    var other_1 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(to).minus_mfbszm_k$(_ULong___get_data__impl__fggpzb(other_0)));
    return new ULongRange(_this__u8e3s4, other_1);
  }
  function until_18(_this__u8e3s4, to) {
    // Inline function 'kotlin.UByte.compareTo' call
    Companion_getInstance_16();
    var other = _UByte___init__impl__g9hnc4(0);
    // Inline function 'kotlin.UByte.toInt' call
    var tmp = _UByte___get_data__impl__jof9qr(to) & 255;
    // Inline function 'kotlin.UByte.toInt' call
    var tmp$ret$1 = _UByte___get_data__impl__jof9qr(other) & 255;
    if (compareTo_0(tmp, tmp$ret$1) <= 0)
      return Companion_getInstance_18().EMPTY_1;
    // Inline function 'kotlin.UInt.rangeTo' call
    // Inline function 'kotlin.UByte.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(_this__u8e3s4) & 255);
    // Inline function 'kotlin.UInt.toUInt' call
    // Inline function 'kotlin.UByte.minus' call
    var other_0 = _UInt___init__impl__l7qpdl(1);
    // Inline function 'kotlin.UInt.minus' call
    // Inline function 'kotlin.UByte.toUInt' call
    var this_1 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(to) & 255);
    var other_1 = _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(this_1) - _UInt___get_data__impl__f0vqqw(other_0) | 0);
    return new UIntRange(this_0, other_1);
  }
  function until_19(_this__u8e3s4, to) {
    // Inline function 'kotlin.UShort.compareTo' call
    Companion_getInstance_23();
    var other = _UShort___init__impl__jigrne(0);
    // Inline function 'kotlin.UShort.toInt' call
    var tmp = _UShort___get_data__impl__g0245(to) & 65535;
    // Inline function 'kotlin.UShort.toInt' call
    var tmp$ret$1 = _UShort___get_data__impl__g0245(other) & 65535;
    if (compareTo_0(tmp, tmp$ret$1) <= 0)
      return Companion_getInstance_18().EMPTY_1;
    // Inline function 'kotlin.UInt.rangeTo' call
    // Inline function 'kotlin.UShort.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(_this__u8e3s4) & 65535);
    // Inline function 'kotlin.UInt.toUInt' call
    // Inline function 'kotlin.UShort.minus' call
    var other_0 = _UInt___init__impl__l7qpdl(1);
    // Inline function 'kotlin.UInt.minus' call
    // Inline function 'kotlin.UShort.toUInt' call
    var this_1 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(to) & 65535);
    var other_1 = _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(this_1) - _UInt___get_data__impl__f0vqqw(other_0) | 0);
    return new UIntRange(this_0, other_1);
  }
  function KotlinNothingValueException_init_$Init$($this) {
    RuntimeException_init_$Init$($this);
    KotlinNothingValueException.call($this);
    return $this;
  }
  function KotlinNothingValueException_init_$Create$() {
    var tmp = KotlinNothingValueException_init_$Init$(objectCreate(protoOf(KotlinNothingValueException)));
    captureStack(tmp, KotlinNothingValueException_init_$Create$);
    return tmp;
  }
  function KotlinNothingValueException_init_$Init$_0(message, $this) {
    RuntimeException_init_$Init$_0(message, $this);
    KotlinNothingValueException.call($this);
    return $this;
  }
  function KotlinNothingValueException_init_$Create$_0(message) {
    var tmp = KotlinNothingValueException_init_$Init$_0(message, objectCreate(protoOf(KotlinNothingValueException)));
    captureStack(tmp, KotlinNothingValueException_init_$Create$_0);
    return tmp;
  }
  function KotlinNothingValueException_init_$Init$_1(message, cause, $this) {
    RuntimeException_init_$Init$_1(message, cause, $this);
    KotlinNothingValueException.call($this);
    return $this;
  }
  function KotlinNothingValueException_init_$Create$_1(message, cause) {
    var tmp = KotlinNothingValueException_init_$Init$_1(message, cause, objectCreate(protoOf(KotlinNothingValueException)));
    captureStack(tmp, KotlinNothingValueException_init_$Create$_1);
    return tmp;
  }
  function KotlinNothingValueException_init_$Init$_2(cause, $this) {
    RuntimeException_init_$Init$_2(cause, $this);
    KotlinNothingValueException.call($this);
    return $this;
  }
  function KotlinNothingValueException_init_$Create$_2(cause) {
    var tmp = KotlinNothingValueException_init_$Init$_2(cause, objectCreate(protoOf(KotlinNothingValueException)));
    captureStack(tmp, KotlinNothingValueException_init_$Create$_2);
    return tmp;
  }
  function KotlinNothingValueException() {
    captureStack(this, KotlinNothingValueException);
  }
  function ExperimentalJsFileName() {
  }
  protoOf(ExperimentalJsFileName).equals = function (other) {
    if (!(other instanceof ExperimentalJsFileName))
      return false;
    other instanceof ExperimentalJsFileName || THROW_CCE();
    return true;
  };
  protoOf(ExperimentalJsFileName).hashCode = function () {
    return 0;
  };
  protoOf(ExperimentalJsFileName).toString = function () {
    return '@kotlin.js.ExperimentalJsFileName()';
  };
  function ExperimentalJsExport() {
  }
  protoOf(ExperimentalJsExport).equals = function (other) {
    if (!(other instanceof ExperimentalJsExport))
      return false;
    other instanceof ExperimentalJsExport || THROW_CCE();
    return true;
  };
  protoOf(ExperimentalJsExport).hashCode = function () {
    return 0;
  };
  protoOf(ExperimentalJsExport).toString = function () {
    return '@kotlin.js.ExperimentalJsExport()';
  };
  function get_PI() {
    return PI;
  }
  var PI;
  function _Char___init__impl__6a9atx(value) {
    return value;
  }
  function _get_value__a43j40($this) {
    return $this;
  }
  function _Char___init__impl__6a9atx_0(code) {
    // Inline function 'kotlin.UShort.toInt' call
    var tmp$ret$0 = _UShort___get_data__impl__g0245(code) & 65535;
    return _Char___init__impl__6a9atx(tmp$ret$0);
  }
  function Char__compareTo_impl_ypi4mb($this, other) {
    return _get_value__a43j40($this) - _get_value__a43j40(other) | 0;
  }
  function Char__compareTo_impl_ypi4mb_0($this, other) {
    return Char__compareTo_impl_ypi4mb($this.value_1, other instanceof Char ? other.value_1 : THROW_CCE());
  }
  function Char__plus_impl_qi7pgj($this, other) {
    return numberToChar(_get_value__a43j40($this) + other | 0);
  }
  function Char__minus_impl_a2frrh($this, other) {
    return _get_value__a43j40($this) - _get_value__a43j40(other) | 0;
  }
  function Char__minus_impl_a2frrh_0($this, other) {
    return numberToChar(_get_value__a43j40($this) - other | 0);
  }
  function Char__inc_impl_6e1wmz($this) {
    return numberToChar(_get_value__a43j40($this) + 1 | 0);
  }
  function Char__dec_impl_1ipdy9($this) {
    return numberToChar(_get_value__a43j40($this) - 1 | 0);
  }
  function Char__rangeTo_impl_tkncvp($this, other) {
    return new CharRange($this, other);
  }
  function Char__rangeUntil_impl_igwnre($this, other) {
    return until_0($this, other);
  }
  function Char__toByte_impl_7s7yt0($this) {
    return toByte(_get_value__a43j40($this));
  }
  function Char__toChar_impl_3h7tei($this) {
    return $this;
  }
  function Char__toShort_impl_7qagse($this) {
    return toShort(_get_value__a43j40($this));
  }
  function Char__toInt_impl_vasixd($this) {
    return _get_value__a43j40($this);
  }
  function Char__toLong_impl_r7eygw($this) {
    return toLong(_get_value__a43j40($this));
  }
  function Char__toFloat_impl_kl2gf6($this) {
    return _get_value__a43j40($this);
  }
  function Char__toDouble_impl_jaecy3($this) {
    return _get_value__a43j40($this);
  }
  function Char__equals_impl_x6719k($this, other) {
    if (!(other instanceof Char))
      return false;
    return _get_value__a43j40($this) === _get_value__a43j40(other.value_1);
  }
  function Char__hashCode_impl_otmys($this) {
    return _get_value__a43j40($this);
  }
  function toString_0($this) {
    // Inline function 'kotlin.js.unsafeCast' call
    return String.fromCharCode(_get_value__a43j40($this));
  }
  function Companion_1() {
    Companion_instance_1 = this;
    this.MIN_VALUE_1 = _Char___init__impl__6a9atx(0);
    this.MAX_VALUE_1 = _Char___init__impl__6a9atx(65535);
    this.MIN_HIGH_SURROGATE_1 = _Char___init__impl__6a9atx(55296);
    this.MAX_HIGH_SURROGATE_1 = _Char___init__impl__6a9atx(56319);
    this.MIN_LOW_SURROGATE_1 = _Char___init__impl__6a9atx(56320);
    this.MAX_LOW_SURROGATE_1 = _Char___init__impl__6a9atx(57343);
    this.MIN_SURROGATE_1 = _Char___init__impl__6a9atx(55296);
    this.MAX_SURROGATE_1 = _Char___init__impl__6a9atx(57343);
    this.SIZE_BYTES_1 = 2;
    this.SIZE_BITS_1 = 16;
  }
  protoOf(Companion_1).get_MIN_VALUE_9z8va5_k$ = function () {
    return this.MIN_VALUE_1;
  };
  protoOf(Companion_1).get_MAX_VALUE_bm2fhr_k$ = function () {
    return this.MAX_VALUE_1;
  };
  protoOf(Companion_1).get_MIN_HIGH_SURROGATE_t8674j_k$ = function () {
    return this.MIN_HIGH_SURROGATE_1;
  };
  protoOf(Companion_1).get_MAX_HIGH_SURROGATE_eamm67_k$ = function () {
    return this.MAX_HIGH_SURROGATE_1;
  };
  protoOf(Companion_1).get_MIN_LOW_SURROGATE_mwv6vb_k$ = function () {
    return this.MIN_LOW_SURROGATE_1;
  };
  protoOf(Companion_1).get_MAX_LOW_SURROGATE_gxd79n_k$ = function () {
    return this.MAX_LOW_SURROGATE_1;
  };
  protoOf(Companion_1).get_MIN_SURROGATE_6v5u0s_k$ = function () {
    return this.MIN_SURROGATE_1;
  };
  protoOf(Companion_1).get_MAX_SURROGATE_r7zmwa_k$ = function () {
    return this.MAX_SURROGATE_1;
  };
  protoOf(Companion_1).get_SIZE_BYTES_qphg4q_k$ = function () {
    return this.SIZE_BYTES_1;
  };
  protoOf(Companion_1).get_SIZE_BITS_7qhjj9_k$ = function () {
    return this.SIZE_BITS_1;
  };
  var Companion_instance_1;
  function Companion_getInstance_1() {
    if (Companion_instance_1 == null)
      new Companion_1();
    return Companion_instance_1;
  }
  function Char(value) {
    Companion_getInstance_1();
    this.value_1 = value;
  }
  protoOf(Char).compareTo_gstm7h_k$ = function (other) {
    return Char__compareTo_impl_ypi4mb(this.value_1, other);
  };
  protoOf(Char).compareTo_hpufkf_k$ = function (other) {
    return Char__compareTo_impl_ypi4mb_0(this, other);
  };
  protoOf(Char).equals = function (other) {
    return Char__equals_impl_x6719k(this.value_1, other);
  };
  protoOf(Char).hashCode = function () {
    return Char__hashCode_impl_otmys(this.value_1);
  };
  protoOf(Char).toString = function () {
    return toString_0(this.value_1);
  };
  function List() {
  }
  function Iterable() {
  }
  function Collection() {
  }
  function Set() {
  }
  function Entry() {
  }
  function Map_0() {
  }
  function MutableCollection() {
  }
  function MutableIterable() {
  }
  function MutableSet() {
  }
  function MutableList() {
  }
  function MutableEntry() {
  }
  function MutableMap() {
  }
  function Companion_2() {
    Companion_instance_2 = this;
  }
  var Companion_instance_2;
  function Companion_getInstance_2() {
    if (Companion_instance_2 == null)
      new Companion_2();
    return Companion_instance_2;
  }
  function Enum(name, ordinal) {
    Companion_getInstance_2();
    this.name_1 = name;
    this.ordinal_1 = ordinal;
  }
  protoOf(Enum).get_name_woqyms_k$ = function () {
    return this.name_1;
  };
  protoOf(Enum).get_ordinal_ip24qg_k$ = function () {
    return this.ordinal_1;
  };
  protoOf(Enum).compareTo_30rs7w_k$ = function (other) {
    return compareTo_0(this.ordinal_1, other.ordinal_1);
  };
  protoOf(Enum).compareTo_hpufkf_k$ = function (other) {
    return this.compareTo_30rs7w_k$(other instanceof Enum ? other : THROW_CCE());
  };
  protoOf(Enum).equals = function (other) {
    return this === other;
  };
  protoOf(Enum).hashCode = function () {
    return identityHashCode(this);
  };
  protoOf(Enum).toString = function () {
    return this.name_1;
  };
  function arrayOfNulls_0(size) {
    return fillArrayVal(Array(size), null);
  }
  function byteArrayOf(elements) {
    return elements;
  }
  function arrayOf(elements) {
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return elements;
  }
  function toString_1(_this__u8e3s4) {
    var tmp1_elvis_lhs = _this__u8e3s4 == null ? null : toString_2(_this__u8e3s4);
    return tmp1_elvis_lhs == null ? 'null' : tmp1_elvis_lhs;
  }
  function plus_2(_this__u8e3s4, other) {
    var tmp3_elvis_lhs = _this__u8e3s4 == null ? null : toString_2(_this__u8e3s4);
    var tmp = tmp3_elvis_lhs == null ? 'null' : tmp3_elvis_lhs;
    var tmp1_elvis_lhs = other == null ? null : toString_2(other);
    return tmp + (tmp1_elvis_lhs == null ? 'null' : tmp1_elvis_lhs);
  }
  function doubleArrayOf(elements) {
    return elements;
  }
  function floatArrayOf(elements) {
    return elements;
  }
  function intArrayOf(elements) {
    return elements;
  }
  function implement(interfaces) {
    var maxSize = 1;
    var masks = [];
    var inductionVariable = 0;
    var last = interfaces.length;
    while (inductionVariable < last) {
      var i = interfaces[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      var currentSize = maxSize;
      var tmp1_elvis_lhs = i.prototype.$imask$;
      var imask = tmp1_elvis_lhs == null ? i.$imask$ : tmp1_elvis_lhs;
      if (!(imask == null)) {
        masks.push(imask);
        currentSize = imask.length;
      }
      var iid = i.$metadata$.iid;
      var tmp;
      if (iid == null) {
        tmp = null;
      } else {
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'kotlin.js.implement.<anonymous>' call
        tmp = bitMaskWith(iid);
      }
      var iidImask = tmp;
      if (!(iidImask == null)) {
        masks.push(iidImask);
        currentSize = Math.max(currentSize, iidImask.length);
      }
      if (currentSize > maxSize) {
        maxSize = currentSize;
      }
    }
    return compositeBitMask(maxSize, masks);
  }
  function bitMaskWith(activeBit) {
    var numberIndex = activeBit >> 5;
    var intArray = new Int32Array(numberIndex + 1 | 0);
    var positionInNumber = activeBit & 31;
    var numberWithSettledBit = 1 << positionInNumber;
    intArray[numberIndex] = intArray[numberIndex] | numberWithSettledBit;
    return intArray;
  }
  function compositeBitMask(capacity, masks) {
    var tmp = 0;
    var tmp_0 = new Int32Array(capacity);
    while (tmp < capacity) {
      var tmp_1 = tmp;
      var result = 0;
      var inductionVariable = 0;
      var last = masks.length;
      while (inductionVariable < last) {
        var mask = masks[inductionVariable];
        inductionVariable = inductionVariable + 1 | 0;
        if (tmp_1 < mask.length) {
          result = result | mask[tmp_1];
        }
      }
      tmp_0[tmp_1] = result;
      tmp = tmp + 1 | 0;
    }
    return tmp_0;
  }
  function isBitSet(_this__u8e3s4, possibleActiveBit) {
    var numberIndex = possibleActiveBit >> 5;
    if (numberIndex > _this__u8e3s4.length)
      return false;
    var positionInNumber = possibleActiveBit & 31;
    var numberWithSettledBit = 1 << positionInNumber;
    return !((_this__u8e3s4[numberIndex] & numberWithSettledBit) === 0);
  }
  function DefaultConstructorMarker() {
    DefaultConstructorMarker_instance = this;
  }
  var DefaultConstructorMarker_instance;
  function DefaultConstructorMarker_getInstance() {
    if (DefaultConstructorMarker_instance == null)
      new DefaultConstructorMarker();
    return DefaultConstructorMarker_instance;
  }
  function fillArrayVal(array, initValue) {
    var inductionVariable = 0;
    var last = array.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        array[i] = initValue;
      }
       while (!(i === last));
    return array;
  }
  function arrayWithFun(size, init) {
    // Inline function 'kotlin.js.fillArrayFun' call
    // Inline function 'kotlin.js.unsafeCast' call
    var result = Array(size);
    var i = 0;
    while (!(i === result.length)) {
      result[i] = init(i);
      i = i + 1 | 0;
    }
    return result;
  }
  function fillArrayFun(array, init) {
    // Inline function 'kotlin.js.unsafeCast' call
    var result = array;
    var i = 0;
    while (!(i === result.length)) {
      result[i] = init(i);
      i = i + 1 | 0;
    }
    return result;
  }
  function arrayIterator(array) {
    return new arrayIterator$1(array);
  }
  function booleanArrayIterator(array) {
    return new booleanArrayIterator$1(array);
  }
  function charArrayIterator(array) {
    return new charArrayIterator$1(array);
  }
  function byteArrayIterator(array) {
    return new byteArrayIterator$1(array);
  }
  function shortArrayIterator(array) {
    return new shortArrayIterator$1(array);
  }
  function intArrayIterator(array) {
    return new intArrayIterator$1(array);
  }
  function floatArrayIterator(array) {
    return new floatArrayIterator$1(array);
  }
  function longArrayIterator(array) {
    return new longArrayIterator$1(array);
  }
  function doubleArrayIterator(array) {
    return new doubleArrayIterator$1(array);
  }
  function booleanArray(size) {
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'withType' call
    var type = 'BooleanArray';
    var array = fillArrayVal(Array(size), false);
    array.$type$ = type;
    return array;
  }
  function charArray(size) {
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'withType' call
    var type = 'CharArray';
    var array = new Uint16Array(size);
    array.$type$ = type;
    return array;
  }
  function longArray(size) {
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'withType' call
    var type = 'LongArray';
    var array = fillArrayVal(Array(size), new Long(0, 0));
    array.$type$ = type;
    return array;
  }
  function booleanArrayOf(arr) {
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'withType' call
    var type = 'BooleanArray';
    // Inline function 'kotlin.js.asDynamic' call
    var array = arr.slice();
    array.$type$ = type;
    return array;
  }
  function charArrayOf(arr) {
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'withType' call
    var type = 'CharArray';
    var array = new Uint16Array(arr);
    array.$type$ = type;
    return array;
  }
  function longArrayOf(arr) {
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'withType' call
    var type = 'LongArray';
    // Inline function 'kotlin.js.asDynamic' call
    var array = arr.slice();
    array.$type$ = type;
    return array;
  }
  function arrayIterator$1($array) {
    this.$array_1 = $array;
    this.index_1 = 0;
  }
  protoOf(arrayIterator$1).set_index_69f5xp_k$ = function (_set____db54di) {
    this.index_1 = _set____db54di;
  };
  protoOf(arrayIterator$1).get_index_it478p_k$ = function () {
    return this.index_1;
  };
  protoOf(arrayIterator$1).hasNext_bitz1p_k$ = function () {
    return !(this.index_1 === this.$array_1.length);
  };
  protoOf(arrayIterator$1).next_20eer_k$ = function () {
    var tmp;
    if (!(this.index_1 === this.$array_1.length)) {
      var tmp1 = this.index_1;
      this.index_1 = tmp1 + 1 | 0;
      tmp = this.$array_1[tmp1];
    } else {
      throw NoSuchElementException_init_$Create$_0('' + this.index_1);
    }
    return tmp;
  };
  function booleanArrayIterator$1($array) {
    this.$array_1 = $array;
    BooleanIterator.call(this);
    this.index_1 = 0;
  }
  protoOf(booleanArrayIterator$1).set_index_69f5xp_k$ = function (_set____db54di) {
    this.index_1 = _set____db54di;
  };
  protoOf(booleanArrayIterator$1).get_index_it478p_k$ = function () {
    return this.index_1;
  };
  protoOf(booleanArrayIterator$1).hasNext_bitz1p_k$ = function () {
    return !(this.index_1 === this.$array_1.length);
  };
  protoOf(booleanArrayIterator$1).nextBoolean_nfdk1h_k$ = function () {
    var tmp;
    if (!(this.index_1 === this.$array_1.length)) {
      var tmp1 = this.index_1;
      this.index_1 = tmp1 + 1 | 0;
      tmp = this.$array_1[tmp1];
    } else {
      throw NoSuchElementException_init_$Create$_0('' + this.index_1);
    }
    return tmp;
  };
  function charArrayIterator$1($array) {
    this.$array_1 = $array;
    CharIterator.call(this);
    this.index_1 = 0;
  }
  protoOf(charArrayIterator$1).set_index_69f5xp_k$ = function (_set____db54di) {
    this.index_1 = _set____db54di;
  };
  protoOf(charArrayIterator$1).get_index_it478p_k$ = function () {
    return this.index_1;
  };
  protoOf(charArrayIterator$1).hasNext_bitz1p_k$ = function () {
    return !(this.index_1 === this.$array_1.length);
  };
  protoOf(charArrayIterator$1).nextChar_yvnk6j_k$ = function () {
    var tmp;
    if (!(this.index_1 === this.$array_1.length)) {
      var tmp1 = this.index_1;
      this.index_1 = tmp1 + 1 | 0;
      tmp = this.$array_1[tmp1];
    } else {
      throw NoSuchElementException_init_$Create$_0('' + this.index_1);
    }
    return tmp;
  };
  function byteArrayIterator$1($array) {
    this.$array_1 = $array;
    ByteIterator.call(this);
    this.index_1 = 0;
  }
  protoOf(byteArrayIterator$1).set_index_69f5xp_k$ = function (_set____db54di) {
    this.index_1 = _set____db54di;
  };
  protoOf(byteArrayIterator$1).get_index_it478p_k$ = function () {
    return this.index_1;
  };
  protoOf(byteArrayIterator$1).hasNext_bitz1p_k$ = function () {
    return !(this.index_1 === this.$array_1.length);
  };
  protoOf(byteArrayIterator$1).nextByte_njqopn_k$ = function () {
    var tmp;
    if (!(this.index_1 === this.$array_1.length)) {
      var tmp1 = this.index_1;
      this.index_1 = tmp1 + 1 | 0;
      tmp = this.$array_1[tmp1];
    } else {
      throw NoSuchElementException_init_$Create$_0('' + this.index_1);
    }
    return tmp;
  };
  function shortArrayIterator$1($array) {
    this.$array_1 = $array;
    ShortIterator.call(this);
    this.index_1 = 0;
  }
  protoOf(shortArrayIterator$1).set_index_69f5xp_k$ = function (_set____db54di) {
    this.index_1 = _set____db54di;
  };
  protoOf(shortArrayIterator$1).get_index_it478p_k$ = function () {
    return this.index_1;
  };
  protoOf(shortArrayIterator$1).hasNext_bitz1p_k$ = function () {
    return !(this.index_1 === this.$array_1.length);
  };
  protoOf(shortArrayIterator$1).nextShort_jxwabt_k$ = function () {
    var tmp;
    if (!(this.index_1 === this.$array_1.length)) {
      var tmp1 = this.index_1;
      this.index_1 = tmp1 + 1 | 0;
      tmp = this.$array_1[tmp1];
    } else {
      throw NoSuchElementException_init_$Create$_0('' + this.index_1);
    }
    return tmp;
  };
  function intArrayIterator$1($array) {
    this.$array_1 = $array;
    IntIterator.call(this);
    this.index_1 = 0;
  }
  protoOf(intArrayIterator$1).set_index_69f5xp_k$ = function (_set____db54di) {
    this.index_1 = _set____db54di;
  };
  protoOf(intArrayIterator$1).get_index_it478p_k$ = function () {
    return this.index_1;
  };
  protoOf(intArrayIterator$1).hasNext_bitz1p_k$ = function () {
    return !(this.index_1 === this.$array_1.length);
  };
  protoOf(intArrayIterator$1).nextInt_ujorgc_k$ = function () {
    var tmp;
    if (!(this.index_1 === this.$array_1.length)) {
      var tmp1 = this.index_1;
      this.index_1 = tmp1 + 1 | 0;
      tmp = this.$array_1[tmp1];
    } else {
      throw NoSuchElementException_init_$Create$_0('' + this.index_1);
    }
    return tmp;
  };
  function floatArrayIterator$1($array) {
    this.$array_1 = $array;
    FloatIterator.call(this);
    this.index_1 = 0;
  }
  protoOf(floatArrayIterator$1).set_index_69f5xp_k$ = function (_set____db54di) {
    this.index_1 = _set____db54di;
  };
  protoOf(floatArrayIterator$1).get_index_it478p_k$ = function () {
    return this.index_1;
  };
  protoOf(floatArrayIterator$1).hasNext_bitz1p_k$ = function () {
    return !(this.index_1 === this.$array_1.length);
  };
  protoOf(floatArrayIterator$1).nextFloat_jqti5l_k$ = function () {
    var tmp;
    if (!(this.index_1 === this.$array_1.length)) {
      var tmp1 = this.index_1;
      this.index_1 = tmp1 + 1 | 0;
      tmp = this.$array_1[tmp1];
    } else {
      throw NoSuchElementException_init_$Create$_0('' + this.index_1);
    }
    return tmp;
  };
  function longArrayIterator$1($array) {
    this.$array_1 = $array;
    LongIterator.call(this);
    this.index_1 = 0;
  }
  protoOf(longArrayIterator$1).set_index_69f5xp_k$ = function (_set____db54di) {
    this.index_1 = _set____db54di;
  };
  protoOf(longArrayIterator$1).get_index_it478p_k$ = function () {
    return this.index_1;
  };
  protoOf(longArrayIterator$1).hasNext_bitz1p_k$ = function () {
    return !(this.index_1 === this.$array_1.length);
  };
  protoOf(longArrayIterator$1).nextLong_njwv0v_k$ = function () {
    var tmp;
    if (!(this.index_1 === this.$array_1.length)) {
      var tmp1 = this.index_1;
      this.index_1 = tmp1 + 1 | 0;
      tmp = this.$array_1[tmp1];
    } else {
      throw NoSuchElementException_init_$Create$_0('' + this.index_1);
    }
    return tmp;
  };
  function doubleArrayIterator$1($array) {
    this.$array_1 = $array;
    DoubleIterator.call(this);
    this.index_1 = 0;
  }
  protoOf(doubleArrayIterator$1).set_index_69f5xp_k$ = function (_set____db54di) {
    this.index_1 = _set____db54di;
  };
  protoOf(doubleArrayIterator$1).get_index_it478p_k$ = function () {
    return this.index_1;
  };
  protoOf(doubleArrayIterator$1).hasNext_bitz1p_k$ = function () {
    return !(this.index_1 === this.$array_1.length);
  };
  protoOf(doubleArrayIterator$1).nextDouble_s2xvfg_k$ = function () {
    var tmp;
    if (!(this.index_1 === this.$array_1.length)) {
      var tmp1 = this.index_1;
      this.index_1 = tmp1 + 1 | 0;
      tmp = this.$array_1[tmp1];
    } else {
      throw NoSuchElementException_init_$Create$_0('' + this.index_1);
    }
    return tmp;
  };
  function get_buf() {
    _init_properties_bitUtils_kt__nfcg4k();
    return buf;
  }
  var buf;
  function get_bufFloat64() {
    _init_properties_bitUtils_kt__nfcg4k();
    return bufFloat64;
  }
  var bufFloat64;
  function get_bufFloat32() {
    _init_properties_bitUtils_kt__nfcg4k();
    return bufFloat32;
  }
  var bufFloat32;
  function get_bufInt32() {
    _init_properties_bitUtils_kt__nfcg4k();
    return bufInt32;
  }
  var bufInt32;
  function get_lowIndex() {
    _init_properties_bitUtils_kt__nfcg4k();
    return lowIndex;
  }
  var lowIndex;
  function get_highIndex() {
    _init_properties_bitUtils_kt__nfcg4k();
    return highIndex;
  }
  var highIndex;
  function getNumberHashCode(obj) {
    _init_properties_bitUtils_kt__nfcg4k();
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.jsBitwiseOr' call
    // Inline function 'kotlin.js.asDynamic' call
    if ((obj | 0) === obj) {
      return numberToInt(obj);
    }
    get_bufFloat64()[0] = obj;
    return imul(get_bufInt32()[get_highIndex()], 31) + get_bufInt32()[get_lowIndex()] | 0;
  }
  var properties_initialized_bitUtils_kt_i2bo3e;
  function _init_properties_bitUtils_kt__nfcg4k() {
    if (!properties_initialized_bitUtils_kt_i2bo3e) {
      properties_initialized_bitUtils_kt_i2bo3e = true;
      buf = new ArrayBuffer(8);
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      bufFloat64 = new Float64Array(get_buf());
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      bufFloat32 = new Float32Array(get_buf());
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      bufInt32 = new Int32Array(get_buf());
      // Inline function 'kotlin.run' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlin.js.lowIndex.<anonymous>' call
      get_bufFloat64()[0] = -1.0;
      lowIndex = !(get_bufInt32()[0] === 0) ? 1 : 0;
      highIndex = 1 - get_lowIndex() | 0;
    }
  }
  function booleanInExternalLog(name, obj) {
    if (!(typeof obj === 'boolean')) {
      // Inline function 'kotlin.js.asDynamic' call
      console.error("Boolean expected for '" + name + "', but actual:", obj);
    }
  }
  function booleanInExternalException(name, obj) {
    if (!(typeof obj === 'boolean')) {
      throw new Error("Boolean expected for '" + name + "', but actual: " + obj);
    }
  }
  function DoNotIntrinsify() {
  }
  protoOf(DoNotIntrinsify).equals = function (other) {
    if (!(other instanceof DoNotIntrinsify))
      return false;
    other instanceof DoNotIntrinsify || THROW_CCE();
    return true;
  };
  protoOf(DoNotIntrinsify).hashCode = function () {
    return 0;
  };
  protoOf(DoNotIntrinsify).toString = function () {
    return '@kotlin.js.DoNotIntrinsify()';
  };
  function charSequenceGet(a, index) {
    var tmp;
    if (isString(a)) {
      // Inline function 'kotlin.Char' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var code = a.charCodeAt(index);
      var tmp_0;
      // Inline function 'kotlin.code' call
      Companion_getInstance_1();
      var this_0 = _Char___init__impl__6a9atx(0);
      if (code < Char__toInt_impl_vasixd(this_0)) {
        tmp_0 = true;
      } else {
        // Inline function 'kotlin.code' call
        Companion_getInstance_1();
        var this_1 = _Char___init__impl__6a9atx(65535);
        tmp_0 = code > Char__toInt_impl_vasixd(this_1);
      }
      if (tmp_0) {
        throw IllegalArgumentException_init_$Create$_0('Invalid Char code: ' + code);
      }
      tmp = numberToChar(code);
    } else {
      tmp = a.get_kdzpvg_k$(index);
    }
    return tmp;
  }
  function isString(a) {
    return typeof a === 'string';
  }
  function charSequenceLength(a) {
    var tmp;
    if (isString(a)) {
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp = a.length;
    } else {
      tmp = a.get_length_g42xv3_k$();
    }
    return tmp;
  }
  function charSequenceSubSequence(a, startIndex, endIndex) {
    var tmp;
    if (isString(a)) {
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp = a.substring(startIndex, endIndex);
    } else {
      tmp = a.subSequence_hm5hnj_k$(startIndex, endIndex);
    }
    return tmp;
  }
  function arrayToString(array) {
    return joinToString(array, ', ', '[', ']', VOID, VOID, arrayToString$lambda);
  }
  function contentEqualsInternal(_this__u8e3s4, other) {
    // Inline function 'kotlin.js.asDynamic' call
    var a = _this__u8e3s4;
    // Inline function 'kotlin.js.asDynamic' call
    var b = other;
    if (a === b)
      return true;
    if (((a == null ? true : b == null) ? true : !isArrayish(b)) ? true : a.length != b.length)
      return false;
    var inductionVariable = 0;
    var last = a.length;
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (!equals(a[i], b[i])) {
          return false;
        }
      }
       while (inductionVariable < last);
    return true;
  }
  function arrayToString$lambda(it) {
    return toString_2(it);
  }
  function compareTo_0(a, b) {
    var tmp;
    switch (typeof a) {
      case 'number':
        var tmp_0;
        if (typeof b === 'number') {
          tmp_0 = doubleCompareTo(a, b);
        } else {
          if (b instanceof Long) {
            tmp_0 = doubleCompareTo(a, b.toDouble_ygsx0s_k$());
          } else {
            tmp_0 = primitiveCompareTo(a, b);
          }
        }

        tmp = tmp_0;
        break;
      case 'string':
      case 'boolean':
        tmp = primitiveCompareTo(a, b);
        break;
      default:
        tmp = compareToDoNotIntrinsicify(a, b);
        break;
    }
    return tmp;
  }
  function doubleCompareTo(a, b) {
    var tmp;
    if (a < b) {
      tmp = -1;
    } else if (a > b) {
      tmp = 1;
    } else if (a === b) {
      var tmp_0;
      if (a !== 0) {
        tmp_0 = 0;
      } else {
        // Inline function 'kotlin.js.asDynamic' call
        var ia = 1 / a;
        var tmp_1;
        // Inline function 'kotlin.js.asDynamic' call
        if (ia === 1 / b) {
          tmp_1 = 0;
        } else {
          if (ia < 0) {
            tmp_1 = -1;
          } else {
            tmp_1 = 1;
          }
        }
        tmp_0 = tmp_1;
      }
      tmp = tmp_0;
    } else if (a !== a) {
      tmp = b !== b ? 0 : 1;
    } else {
      tmp = -1;
    }
    return tmp;
  }
  function primitiveCompareTo(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  function compareToDoNotIntrinsicify(a, b) {
    return a.compareTo_hpufkf_k$(b);
  }
  function identityHashCode(obj) {
    return getObjectHashCode(obj);
  }
  function getObjectHashCode(obj) {
    // Inline function 'kotlin.js.jsIn' call
    if (!('kotlinHashCodeValue$' in obj)) {
      var hash = calculateRandomHash();
      var descriptor = new Object();
      descriptor.value = hash;
      descriptor.enumerable = false;
      Object.defineProperty(obj, 'kotlinHashCodeValue$', descriptor);
    }
    // Inline function 'kotlin.js.unsafeCast' call
    return obj['kotlinHashCodeValue$'];
  }
  function get_OBJECT_HASH_CODE_PROPERTY_NAME() {
    return OBJECT_HASH_CODE_PROPERTY_NAME;
  }
  var OBJECT_HASH_CODE_PROPERTY_NAME;
  function calculateRandomHash() {
    // Inline function 'kotlin.js.jsBitwiseOr' call
    return Math.random() * 4.294967296E9 | 0;
  }
  function get_POW_2_32() {
    return POW_2_32;
  }
  var POW_2_32;
  function toString_2(o) {
    var tmp;
    if (o == null) {
      tmp = 'null';
    } else if (isArrayish(o)) {
      tmp = '[...]';
    } else if (!(typeof o.toString === 'function')) {
      tmp = anyToString(o);
    } else {
      // Inline function 'kotlin.js.unsafeCast' call
      tmp = o.toString();
    }
    return tmp;
  }
  function anyToString(o) {
    return Object.prototype.toString.call(o);
  }
  function hashCode(obj) {
    if (obj == null)
      return 0;
    var typeOf = typeof obj;
    var tmp;
    switch (typeOf) {
      case 'object':
        tmp = 'function' === typeof obj.hashCode ? obj.hashCode() : getObjectHashCode(obj);
        break;
      case 'function':
        tmp = getObjectHashCode(obj);
        break;
      case 'number':
        tmp = getNumberHashCode(obj);
        break;
      case 'boolean':
        // Inline function 'kotlin.js.unsafeCast' call

        tmp = getBooleanHashCode(obj);
        break;
      case 'string':
        tmp = getStringHashCode(String(obj));
        break;
      case 'bigint':
        tmp = getBigIntHashCode(obj);
        break;
      case 'symbol':
        tmp = getSymbolHashCode(obj);
        break;
      default:
        tmp = function () {
          throw new Error('Unexpected typeof `' + typeOf + '`');
        }();
        break;
    }
    return tmp;
  }
  function getBooleanHashCode(value) {
    return value ? 1231 : 1237;
  }
  function getStringHashCode(str) {
    var hash = 0;
    var length = str.length;
    var inductionVariable = 0;
    var last = length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.js.asDynamic' call
        var code = str.charCodeAt(i);
        hash = imul(hash, 31) + code | 0;
      }
       while (!(i === last));
    return hash;
  }
  function getBigIntHashCode(value) {
    var shiftNumber = BigInt(32);
    var MASK = BigInt(4.294967295E9);
    var bigNumber = value < 0 ? -value : value;
    var hashCode = 0;
    var signum = value < 0 ? -1 : 1;
    while (bigNumber != 0) {
      // Inline function 'kotlin.js.unsafeCast' call
      var chunk = Number(bigNumber & MASK);
      hashCode = imul(31, hashCode) + chunk | 0;
      bigNumber = bigNumber >> shiftNumber;
    }
    return imul(hashCode, signum);
  }
  function getSymbolHashCode(value) {
    var hashCodeMap = symbolIsSharable(value) ? getSymbolMap() : getSymbolWeakMap();
    var cachedHashCode = hashCodeMap.get(value);
    if (cachedHashCode !== VOID)
      return cachedHashCode;
    var hash = calculateRandomHash();
    hashCodeMap.set(value, hash);
    return hash;
  }
  function symbolIsSharable(symbol) {
    return Symbol.keyFor(symbol) != VOID;
  }
  function getSymbolMap() {
    if (symbolMap === VOID) {
      symbolMap = new Map();
    }
    return symbolMap;
  }
  function getSymbolWeakMap() {
    if (symbolWeakMap === VOID) {
      symbolWeakMap = new WeakMap();
    }
    return symbolWeakMap;
  }
  function set_symbolMap(_set____db54di) {
    symbolMap = _set____db54di;
  }
  function get_symbolMap() {
    return symbolMap;
  }
  var symbolMap;
  function set_symbolWeakMap(_set____db54di) {
    symbolWeakMap = _set____db54di;
  }
  function get_symbolWeakMap() {
    return symbolWeakMap;
  }
  var symbolWeakMap;
  function equals(obj1, obj2) {
    if (obj1 == null) {
      return obj2 == null;
    }
    if (obj2 == null) {
      return false;
    }
    if (typeof obj1 === 'object' ? typeof obj1.equals === 'function' : false) {
      return obj1.equals(obj2);
    }
    if (obj1 !== obj1) {
      return obj2 !== obj2;
    }
    if (typeof obj1 === 'number' ? typeof obj2 === 'number' : false) {
      var tmp;
      if (obj1 === obj2) {
        var tmp_0;
        if (obj1 !== 0) {
          tmp_0 = true;
        } else {
          // Inline function 'kotlin.js.asDynamic' call
          var tmp_1 = 1 / obj1;
          // Inline function 'kotlin.js.asDynamic' call
          tmp_0 = tmp_1 === 1 / obj2;
        }
        tmp = tmp_0;
      } else {
        tmp = false;
      }
      return tmp;
    }
    return obj1 === obj2;
  }
  function boxIntrinsic(x) {
    var message = 'Should be lowered';
    throw IllegalStateException_init_$Create$_0(toString_2(message));
  }
  function unboxIntrinsic(x) {
    var message = 'Should be lowered';
    throw IllegalStateException_init_$Create$_0(toString_2(message));
  }
  function captureStack(instance, constructorFunction) {
    if (Error.captureStackTrace != null) {
      Error.captureStackTrace(instance, constructorFunction);
    } else {
      // Inline function 'kotlin.js.asDynamic' call
      instance.stack = (new Error()).stack;
    }
  }
  function protoOf(constructor) {
    return constructor.prototype;
  }
  function defineProp(obj, name, getter, setter) {
    return Object.defineProperty(obj, name, {configurable: true, get: getter, set: setter});
  }
  function objectCreate(proto) {
    return Object.create(proto);
  }
  function createThis(ctor, box) {
    var self_0 = Object.create(ctor.prototype);
    boxApply(self_0, box);
    return self_0;
  }
  function boxApply(self_0, box) {
    if (box !== VOID)
      Object.assign(self_0, box);
  }
  function createExternalThis(ctor, superExternalCtor, parameters, box) {
    var tmp;
    if (box === VOID) {
      tmp = ctor;
    } else {
      var newCtor = class  extends ctor {}
      Object.assign(newCtor.prototype, box);
      newCtor.constructor = ctor;
      tmp = newCtor;
    }
    var selfCtor = tmp;
    return Reflect.construct(superExternalCtor, parameters, selfCtor);
  }
  function newThrowable(message, cause) {
    var throwable = new Error();
    var tmp;
    if (isUndefined(message)) {
      var tmp_0;
      if (isUndefined(cause)) {
        tmp_0 = message;
      } else {
        var tmp1_elvis_lhs = cause == null ? null : cause.toString();
        tmp_0 = tmp1_elvis_lhs == null ? VOID : tmp1_elvis_lhs;
      }
      tmp = tmp_0;
    } else {
      tmp = message == null ? VOID : message;
    }
    throwable.message = tmp;
    throwable.cause = cause;
    throwable.name = 'Throwable';
    // Inline function 'kotlin.js.unsafeCast' call
    return throwable;
  }
  function isUndefined(value) {
    return value === VOID;
  }
  function extendThrowable(this_, message, cause) {
    Error.call(this_);
    setPropertiesToThrowableInstance(this_, message, cause);
  }
  function setPropertiesToThrowableInstance(this_, message, cause) {
    var errorInfo = calculateErrorInfo(Object.getPrototypeOf(this_));
    if ((errorInfo & 1) === 0) {
      var tmp;
      if (message == null) {
        var tmp_0;
        if (!(message === null)) {
          var tmp1_elvis_lhs = cause == null ? null : cause.toString();
          tmp_0 = tmp1_elvis_lhs == null ? VOID : tmp1_elvis_lhs;
        } else {
          tmp_0 = VOID;
        }
        tmp = tmp_0;
      } else {
        tmp = message;
      }
      this_.message = tmp;
    }
    if ((errorInfo & 2) === 0) {
      this_.cause = cause;
    }
    this_.name = Object.getPrototypeOf(this_).constructor.name;
  }
  function getContinuation() {
    throw Exception_init_$Create$_0('Implemented as intrinsic');
  }
  function returnIfSuspended(argument, $completion) {
    return (argument == null ? true : !(argument == null)) ? argument : THROW_CCE();
  }
  function suspendCoroutineUninterceptedOrReturnJS(block, $completion) {
    return block($completion);
  }
  function getCoroutineContext($completion) {
    return $completion.get_context_h02k06_k$();
  }
  function unreachableDeclarationLog() {
    // Inline function 'kotlin.js.asDynamic' call
    console.trace('Unreachable declaration');
  }
  function unreachableDeclarationException() {
    throw new Error('Unreachable declaration');
  }
  function ensureNotNull(v) {
    var tmp;
    if (v == null) {
      THROW_NPE();
    } else {
      tmp = v;
    }
    return tmp;
  }
  function THROW_NPE() {
    throw NullPointerException_init_$Create$();
  }
  function noWhenBranchMatchedException() {
    throw NoWhenBranchMatchedException_init_$Create$();
  }
  function THROW_CCE() {
    throw ClassCastException_init_$Create$();
  }
  function throwUninitializedPropertyAccessException(name) {
    throw UninitializedPropertyAccessException_init_$Create$_0('lateinit property ' + name + ' has not been initialized');
  }
  function throwKotlinNothingValueException() {
    throw KotlinNothingValueException_init_$Create$();
  }
  function THROW_ISE() {
    throw IllegalStateException_init_$Create$();
  }
  function THROW_IAE(msg) {
    throw IllegalArgumentException_init_$Create$_0(msg);
  }
  function JsIntrinsic() {
  }
  protoOf(JsIntrinsic).equals = function (other) {
    if (!(other instanceof JsIntrinsic))
      return false;
    other instanceof JsIntrinsic || THROW_CCE();
    return true;
  };
  protoOf(JsIntrinsic).hashCode = function () {
    return 0;
  };
  protoOf(JsIntrinsic).toString = function () {
    return '@kotlin.js.JsIntrinsic()';
  };
  function emptyArray() {
    return [];
  }
  function fillFrom(src, dst) {
    var srcLen = src.length;
    var dstLen = dst.length;
    var index = 0;
    // Inline function 'kotlin.js.unsafeCast' call
    var arr = dst;
    while (index < srcLen ? index < dstLen : false) {
      var tmp = index;
      var tmp0 = index;
      index = tmp0 + 1 | 0;
      arr[tmp] = src[tmp0];
    }
    return dst;
  }
  function arrayCopyResize(source, newSize, defaultValue) {
    // Inline function 'kotlin.js.unsafeCast' call
    var result = source.slice(0, newSize);
    // Inline function 'kotlin.copyArrayType' call
    if (source.$type$ !== undefined) {
      result.$type$ = source.$type$;
    }
    var index = source.length;
    if (newSize > index) {
      // Inline function 'kotlin.js.asDynamic' call
      result.length = newSize;
      while (index < newSize) {
        var tmp0 = index;
        index = tmp0 + 1 | 0;
        result[tmp0] = defaultValue;
      }
    }
    return result;
  }
  function copyArrayType(from, to) {
    if (from.$type$ !== undefined) {
      to.$type$ = from.$type$;
    }
  }
  function JsFun(code) {
    this.code_1 = code;
  }
  protoOf(JsFun).get_code_wok7xy_k$ = function () {
    return this.code_1;
  };
  protoOf(JsFun).equals = function (other) {
    if (!(other instanceof JsFun))
      return false;
    var tmp0_other_with_cast = other instanceof JsFun ? other : THROW_CCE();
    if (!(this.code_1 === tmp0_other_with_cast.code_1))
      return false;
    return true;
  };
  protoOf(JsFun).hashCode = function () {
    return imul(getStringHashCode('code'), 127) ^ getStringHashCode(this.code_1);
  };
  protoOf(JsFun).toString = function () {
    return '@kotlin.js.JsFun(code=' + this.code_1 + ')';
  };
  function JsImplicitExport() {
  }
  protoOf(JsImplicitExport).equals = function (other) {
    if (!(other instanceof JsImplicitExport))
      return false;
    other instanceof JsImplicitExport || THROW_CCE();
    return true;
  };
  protoOf(JsImplicitExport).hashCode = function () {
    return 0;
  };
  protoOf(JsImplicitExport).toString = function () {
    return '@kotlin.js.JsImplicitExport()';
  };
  function enumValueOfIntrinsic(name) {
    throw IllegalStateException_init_$Create$_0('Should be replaced by compiler');
  }
  function enumValuesIntrinsic() {
    throw IllegalStateException_init_$Create$_0('Should be replaced by compiler');
  }
  function Companion_3() {
    Companion_instance_3 = this;
    this.MIN_VALUE_1 = new Long(0, -2147483648);
    this.MAX_VALUE_1 = new Long(-1, 2147483647);
    this.SIZE_BYTES_1 = 8;
    this.SIZE_BITS_1 = 64;
  }
  protoOf(Companion_3).get_MIN_VALUE_7nmmor_k$ = function () {
    return this.MIN_VALUE_1;
  };
  protoOf(Companion_3).get_MAX_VALUE_54a9lf_k$ = function () {
    return this.MAX_VALUE_1;
  };
  protoOf(Companion_3).get_SIZE_BYTES_qphg4q_k$ = function () {
    return this.SIZE_BYTES_1;
  };
  protoOf(Companion_3).get_SIZE_BITS_7qhjj9_k$ = function () {
    return this.SIZE_BITS_1;
  };
  var Companion_instance_3;
  function Companion_getInstance_3() {
    if (Companion_instance_3 == null)
      new Companion_3();
    return Companion_instance_3;
  }
  function Long(low, high) {
    Companion_getInstance_3();
    Number_0.call(this);
    this.low_1 = low;
    this.high_1 = high;
  }
  protoOf(Long).get_low_18j191_k$ = function () {
    return this.low_1;
  };
  protoOf(Long).get_high_wonai3_k$ = function () {
    return this.high_1;
  };
  protoOf(Long).compareTo_z0c5i0_k$ = function (other) {
    return this.compareTo_9jj042_k$(toLong(other));
  };
  protoOf(Long).compareTo_ka11ag_k$ = function (other) {
    return this.compareTo_9jj042_k$(toLong(other));
  };
  protoOf(Long).compareTo_7hwzko_k$ = function (other) {
    return this.compareTo_9jj042_k$(toLong(other));
  };
  protoOf(Long).compareTo_9jj042_k$ = function (other) {
    return compare(this, other);
  };
  protoOf(Long).compareTo_hpufkf_k$ = function (other) {
    return this.compareTo_9jj042_k$(other instanceof Long ? other : THROW_CCE());
  };
  protoOf(Long).compareTo_9qeqt4_k$ = function (other) {
    return compareTo_0(this.toFloat_jhbgwv_k$(), other);
  };
  protoOf(Long).compareTo_t5h9ae_k$ = function (other) {
    return compareTo_0(this.toDouble_ygsx0s_k$(), other);
  };
  protoOf(Long).plus_hard1a_k$ = function (other) {
    return this.plus_r93sks_k$(toLong(other));
  };
  protoOf(Long).plus_7d0ae6_k$ = function (other) {
    return this.plus_r93sks_k$(toLong(other));
  };
  protoOf(Long).plus_gv6ohq_k$ = function (other) {
    return this.plus_r93sks_k$(toLong(other));
  };
  protoOf(Long).plus_r93sks_k$ = function (other) {
    return add(this, other);
  };
  protoOf(Long).plus_xnnzhe_k$ = function (other) {
    return this.toFloat_jhbgwv_k$() + other;
  };
  protoOf(Long).plus_pjpmi4_k$ = function (other) {
    return this.toDouble_ygsx0s_k$() + other;
  };
  protoOf(Long).minus_m4jcmg_k$ = function (other) {
    return this.minus_mfbszm_k$(toLong(other));
  };
  protoOf(Long).minus_t8tq14_k$ = function (other) {
    return this.minus_mfbszm_k$(toLong(other));
  };
  protoOf(Long).minus_vfk7ag_k$ = function (other) {
    return this.minus_mfbszm_k$(toLong(other));
  };
  protoOf(Long).minus_mfbszm_k$ = function (other) {
    return subtract(this, other);
  };
  protoOf(Long).minus_brujug_k$ = function (other) {
    return this.toFloat_jhbgwv_k$() - other;
  };
  protoOf(Long).minus_ur3tau_k$ = function (other) {
    return this.toDouble_ygsx0s_k$() - other;
  };
  protoOf(Long).times_l3vm36_k$ = function (other) {
    return this.times_nfzjiw_k$(toLong(other));
  };
  protoOf(Long).times_pycwwe_k$ = function (other) {
    return this.times_nfzjiw_k$(toLong(other));
  };
  protoOf(Long).times_kr2a3y_k$ = function (other) {
    return this.times_nfzjiw_k$(toLong(other));
  };
  protoOf(Long).times_nfzjiw_k$ = function (other) {
    return multiply(this, other);
  };
  protoOf(Long).times_422v76_k$ = function (other) {
    return this.toFloat_jhbgwv_k$() * other;
  };
  protoOf(Long).times_qz1dds_k$ = function (other) {
    return this.toDouble_ygsx0s_k$() * other;
  };
  protoOf(Long).div_op7y5j_k$ = function (other) {
    return this.div_jun7gj_k$(toLong(other));
  };
  protoOf(Long).div_haijbb_k$ = function (other) {
    return this.div_jun7gj_k$(toLong(other));
  };
  protoOf(Long).div_fxyyjd_k$ = function (other) {
    return this.div_jun7gj_k$(toLong(other));
  };
  protoOf(Long).div_jun7gj_k$ = function (other) {
    return divide(this, other);
  };
  protoOf(Long).div_nq5qk9_k$ = function (other) {
    return this.toFloat_jhbgwv_k$() / other;
  };
  protoOf(Long).div_k6dnjf_k$ = function (other) {
    return this.toDouble_ygsx0s_k$() / other;
  };
  protoOf(Long).rem_wr7kce_k$ = function (other) {
    return this.rem_bsnl9o_k$(toLong(other));
  };
  protoOf(Long).rem_g0zx5q_k$ = function (other) {
    return this.rem_bsnl9o_k$(toLong(other));
  };
  protoOf(Long).rem_agrhqa_k$ = function (other) {
    return this.rem_bsnl9o_k$(toLong(other));
  };
  protoOf(Long).rem_bsnl9o_k$ = function (other) {
    return modulo(this, other);
  };
  protoOf(Long).rem_ozocpu_k$ = function (other) {
    return this.toFloat_jhbgwv_k$() % other;
  };
  protoOf(Long).rem_rpe504_k$ = function (other) {
    return this.toDouble_ygsx0s_k$() % other;
  };
  protoOf(Long).inc_28ke_k$ = function () {
    return this.plus_r93sks_k$(new Long(1, 0));
  };
  protoOf(Long).dec_24n6_k$ = function () {
    return this.minus_mfbszm_k$(new Long(1, 0));
  };
  protoOf(Long).unaryPlus_g9fn1l_k$ = function () {
    return this;
  };
  protoOf(Long).unaryMinus_6uz0qp_k$ = function () {
    return this.inv_28kx_k$().plus_r93sks_k$(new Long(1, 0));
  };
  protoOf(Long).rangeTo_umivsw_k$ = function (other) {
    return this.rangeTo_dxc9t6_k$(toLong(other));
  };
  protoOf(Long).rangeTo_suedwg_k$ = function (other) {
    return this.rangeTo_dxc9t6_k$(toLong(other));
  };
  protoOf(Long).rangeTo_d1bgzk_k$ = function (other) {
    return this.rangeTo_dxc9t6_k$(toLong(other));
  };
  protoOf(Long).rangeTo_dxc9t6_k$ = function (other) {
    return new LongRange(this, other);
  };
  protoOf(Long).rangeUntil_3oumv_k$ = function (other) {
    return until_12(this, other);
  };
  protoOf(Long).rangeUntil_vu7vsn_k$ = function (other) {
    return until_13(this, other);
  };
  protoOf(Long).rangeUntil_621v6f_k$ = function (other) {
    return until_14(this, other);
  };
  protoOf(Long).rangeUntil_qkxqzx_k$ = function (other) {
    return until_15(this, other);
  };
  protoOf(Long).shl_bg8if3_k$ = function (bitCount) {
    return shiftLeft(this, bitCount);
  };
  protoOf(Long).shr_9fl3wl_k$ = function (bitCount) {
    return shiftRight(this, bitCount);
  };
  protoOf(Long).ushr_z7nmq8_k$ = function (bitCount) {
    return shiftRightUnsigned(this, bitCount);
  };
  protoOf(Long).and_4spn93_k$ = function (other) {
    return new Long(this.low_1 & other.low_1, this.high_1 & other.high_1);
  };
  protoOf(Long).or_v7fvkl_k$ = function (other) {
    return new Long(this.low_1 | other.low_1, this.high_1 | other.high_1);
  };
  protoOf(Long).xor_qzz94j_k$ = function (other) {
    return new Long(this.low_1 ^ other.low_1, this.high_1 ^ other.high_1);
  };
  protoOf(Long).inv_28kx_k$ = function () {
    return new Long(~this.low_1, ~this.high_1);
  };
  protoOf(Long).toByte_edm0nx_k$ = function () {
    return toByte(this.low_1);
  };
  protoOf(Long).toChar_tavt71_k$ = function () {
    return numberToChar(this.low_1);
  };
  protoOf(Long).toShort_ja8oqn_k$ = function () {
    return toShort(this.low_1);
  };
  protoOf(Long).toInt_1tsl84_k$ = function () {
    return this.low_1;
  };
  protoOf(Long).toLong_edfucp_k$ = function () {
    return this;
  };
  protoOf(Long).toFloat_jhbgwv_k$ = function () {
    return this.toDouble_ygsx0s_k$();
  };
  protoOf(Long).toDouble_ygsx0s_k$ = function () {
    return toNumber(this);
  };
  protoOf(Long).valueOf = function () {
    return this.toDouble_ygsx0s_k$();
  };
  protoOf(Long).equals = function (other) {
    var tmp;
    if (other instanceof Long) {
      tmp = equalsLong(this, other);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(Long).hashCode = function () {
    return hashCode_0(this);
  };
  protoOf(Long).toString = function () {
    return toStringImpl(this, 10);
  };
  function get_ZERO() {
    _init_properties_longjs_kt__tqrzid();
    return ZERO;
  }
  var ZERO;
  function get_ONE() {
    _init_properties_longjs_kt__tqrzid();
    return ONE;
  }
  var ONE;
  function get_NEG_ONE() {
    _init_properties_longjs_kt__tqrzid();
    return NEG_ONE;
  }
  var NEG_ONE;
  function get_MAX_VALUE() {
    _init_properties_longjs_kt__tqrzid();
    return MAX_VALUE;
  }
  var MAX_VALUE;
  function get_MIN_VALUE() {
    _init_properties_longjs_kt__tqrzid();
    return MIN_VALUE;
  }
  var MIN_VALUE;
  function get_TWO_PWR_24_() {
    _init_properties_longjs_kt__tqrzid();
    return TWO_PWR_24_;
  }
  var TWO_PWR_24_;
  function compare(_this__u8e3s4, other) {
    _init_properties_longjs_kt__tqrzid();
    if (equalsLong(_this__u8e3s4, other)) {
      return 0;
    }
    var thisNeg = isNegative(_this__u8e3s4);
    var otherNeg = isNegative(other);
    return (thisNeg ? !otherNeg : false) ? -1 : (!thisNeg ? otherNeg : false) ? 1 : isNegative(subtract(_this__u8e3s4, other)) ? -1 : 1;
  }
  function add(_this__u8e3s4, other) {
    _init_properties_longjs_kt__tqrzid();
    var a48 = _this__u8e3s4.high_1 >>> 16 | 0;
    var a32 = _this__u8e3s4.high_1 & 65535;
    var a16 = _this__u8e3s4.low_1 >>> 16 | 0;
    var a00 = _this__u8e3s4.low_1 & 65535;
    var b48 = other.high_1 >>> 16 | 0;
    var b32 = other.high_1 & 65535;
    var b16 = other.low_1 >>> 16 | 0;
    var b00 = other.low_1 & 65535;
    var c48 = 0;
    var c32 = 0;
    var c16 = 0;
    var c00 = 0;
    c00 = c00 + (a00 + b00 | 0) | 0;
    c16 = c16 + (c00 >>> 16 | 0) | 0;
    c00 = c00 & 65535;
    c16 = c16 + (a16 + b16 | 0) | 0;
    c32 = c32 + (c16 >>> 16 | 0) | 0;
    c16 = c16 & 65535;
    c32 = c32 + (a32 + b32 | 0) | 0;
    c48 = c48 + (c32 >>> 16 | 0) | 0;
    c32 = c32 & 65535;
    c48 = c48 + (a48 + b48 | 0) | 0;
    c48 = c48 & 65535;
    return new Long(c16 << 16 | c00, c48 << 16 | c32);
  }
  function subtract(_this__u8e3s4, other) {
    _init_properties_longjs_kt__tqrzid();
    return add(_this__u8e3s4, other.unaryMinus_6uz0qp_k$());
  }
  function multiply(_this__u8e3s4, other) {
    _init_properties_longjs_kt__tqrzid();
    if (isZero(_this__u8e3s4)) {
      return get_ZERO();
    } else if (isZero(other)) {
      return get_ZERO();
    }
    if (equalsLong(_this__u8e3s4, get_MIN_VALUE())) {
      return isOdd(other) ? get_MIN_VALUE() : get_ZERO();
    } else if (equalsLong(other, get_MIN_VALUE())) {
      return isOdd(_this__u8e3s4) ? get_MIN_VALUE() : get_ZERO();
    }
    if (isNegative(_this__u8e3s4)) {
      var tmp;
      if (isNegative(other)) {
        tmp = multiply(negate(_this__u8e3s4), negate(other));
      } else {
        tmp = negate(multiply(negate(_this__u8e3s4), other));
      }
      return tmp;
    } else if (isNegative(other)) {
      return negate(multiply(_this__u8e3s4, negate(other)));
    }
    if (lessThan(_this__u8e3s4, get_TWO_PWR_24_()) ? lessThan(other, get_TWO_PWR_24_()) : false) {
      return fromNumber(toNumber(_this__u8e3s4) * toNumber(other));
    }
    var a48 = _this__u8e3s4.high_1 >>> 16 | 0;
    var a32 = _this__u8e3s4.high_1 & 65535;
    var a16 = _this__u8e3s4.low_1 >>> 16 | 0;
    var a00 = _this__u8e3s4.low_1 & 65535;
    var b48 = other.high_1 >>> 16 | 0;
    var b32 = other.high_1 & 65535;
    var b16 = other.low_1 >>> 16 | 0;
    var b00 = other.low_1 & 65535;
    var c48 = 0;
    var c32 = 0;
    var c16 = 0;
    var c00 = 0;
    c00 = c00 + imul(a00, b00) | 0;
    c16 = c16 + (c00 >>> 16 | 0) | 0;
    c00 = c00 & 65535;
    c16 = c16 + imul(a16, b00) | 0;
    c32 = c32 + (c16 >>> 16 | 0) | 0;
    c16 = c16 & 65535;
    c16 = c16 + imul(a00, b16) | 0;
    c32 = c32 + (c16 >>> 16 | 0) | 0;
    c16 = c16 & 65535;
    c32 = c32 + imul(a32, b00) | 0;
    c48 = c48 + (c32 >>> 16 | 0) | 0;
    c32 = c32 & 65535;
    c32 = c32 + imul(a16, b16) | 0;
    c48 = c48 + (c32 >>> 16 | 0) | 0;
    c32 = c32 & 65535;
    c32 = c32 + imul(a00, b32) | 0;
    c48 = c48 + (c32 >>> 16 | 0) | 0;
    c32 = c32 & 65535;
    c48 = c48 + (((imul(a48, b00) + imul(a32, b16) | 0) + imul(a16, b32) | 0) + imul(a00, b48) | 0) | 0;
    c48 = c48 & 65535;
    return new Long(c16 << 16 | c00, c48 << 16 | c32);
  }
  function divide(_this__u8e3s4, other) {
    _init_properties_longjs_kt__tqrzid();
    if (isZero(other)) {
      throw Exception_init_$Create$_0('division by zero');
    } else if (isZero(_this__u8e3s4)) {
      return get_ZERO();
    }
    if (equalsLong(_this__u8e3s4, get_MIN_VALUE())) {
      if (equalsLong(other, get_ONE()) ? true : equalsLong(other, get_NEG_ONE())) {
        return get_MIN_VALUE();
      } else if (equalsLong(other, get_MIN_VALUE())) {
        return get_ONE();
      } else {
        var halfThis = shiftRight(_this__u8e3s4, 1);
        var approx = shiftLeft(halfThis.div_jun7gj_k$(other), 1);
        if (equalsLong(approx, get_ZERO())) {
          return isNegative(other) ? get_ONE() : get_NEG_ONE();
        } else {
          var rem = subtract(_this__u8e3s4, multiply(other, approx));
          return add(approx, rem.div_jun7gj_k$(other));
        }
      }
    } else if (equalsLong(other, get_MIN_VALUE())) {
      return get_ZERO();
    }
    if (isNegative(_this__u8e3s4)) {
      var tmp;
      if (isNegative(other)) {
        tmp = negate(_this__u8e3s4).div_jun7gj_k$(negate(other));
      } else {
        tmp = negate(negate(_this__u8e3s4).div_jun7gj_k$(other));
      }
      return tmp;
    } else if (isNegative(other)) {
      return negate(_this__u8e3s4.div_jun7gj_k$(negate(other)));
    }
    var res = get_ZERO();
    var rem_0 = _this__u8e3s4;
    while (greaterThanOrEqual(rem_0, other)) {
      var approxDouble = toNumber(rem_0) / toNumber(other);
      var approx2 = Math.max(1.0, Math.floor(approxDouble));
      var log2 = Math.ceil(Math.log(approx2) / Math.LN2);
      var delta = log2 <= 48.0 ? 1.0 : Math.pow(2.0, log2 - 48);
      var approxRes = fromNumber(approx2);
      var approxRem = multiply(approxRes, other);
      while (isNegative(approxRem) ? true : greaterThan(approxRem, rem_0)) {
        approx2 = approx2 - delta;
        approxRes = fromNumber(approx2);
        approxRem = multiply(approxRes, other);
      }
      if (isZero(approxRes)) {
        approxRes = get_ONE();
      }
      res = add(res, approxRes);
      rem_0 = subtract(rem_0, approxRem);
    }
    return res;
  }
  function modulo(_this__u8e3s4, other) {
    _init_properties_longjs_kt__tqrzid();
    return subtract(_this__u8e3s4, multiply(_this__u8e3s4.div_jun7gj_k$(other), other));
  }
  function shiftLeft(_this__u8e3s4, numBits) {
    _init_properties_longjs_kt__tqrzid();
    var numBits_0 = numBits & 63;
    if (numBits_0 === 0) {
      return _this__u8e3s4;
    } else {
      if (numBits_0 < 32) {
        return new Long(_this__u8e3s4.low_1 << numBits_0, _this__u8e3s4.high_1 << numBits_0 | (_this__u8e3s4.low_1 >>> (32 - numBits_0 | 0) | 0));
      } else {
        return new Long(0, _this__u8e3s4.low_1 << (numBits_0 - 32 | 0));
      }
    }
  }
  function shiftRight(_this__u8e3s4, numBits) {
    _init_properties_longjs_kt__tqrzid();
    var numBits_0 = numBits & 63;
    if (numBits_0 === 0) {
      return _this__u8e3s4;
    } else {
      if (numBits_0 < 32) {
        return new Long(_this__u8e3s4.low_1 >>> numBits_0 | 0 | _this__u8e3s4.high_1 << (32 - numBits_0 | 0), _this__u8e3s4.high_1 >> numBits_0);
      } else {
        return new Long(_this__u8e3s4.high_1 >> (numBits_0 - 32 | 0), _this__u8e3s4.high_1 >= 0 ? 0 : -1);
      }
    }
  }
  function shiftRightUnsigned(_this__u8e3s4, numBits) {
    _init_properties_longjs_kt__tqrzid();
    var numBits_0 = numBits & 63;
    if (numBits_0 === 0) {
      return _this__u8e3s4;
    } else {
      if (numBits_0 < 32) {
        return new Long(_this__u8e3s4.low_1 >>> numBits_0 | 0 | _this__u8e3s4.high_1 << (32 - numBits_0 | 0), _this__u8e3s4.high_1 >>> numBits_0 | 0);
      } else {
        var tmp;
        if (numBits_0 === 32) {
          tmp = new Long(_this__u8e3s4.high_1, 0);
        } else {
          tmp = new Long(_this__u8e3s4.high_1 >>> (numBits_0 - 32 | 0) | 0, 0);
        }
        return tmp;
      }
    }
  }
  function toNumber(_this__u8e3s4) {
    _init_properties_longjs_kt__tqrzid();
    return _this__u8e3s4.high_1 * 4.294967296E9 + getLowBitsUnsigned(_this__u8e3s4);
  }
  function equalsLong(_this__u8e3s4, other) {
    _init_properties_longjs_kt__tqrzid();
    return _this__u8e3s4.high_1 === other.high_1 ? _this__u8e3s4.low_1 === other.low_1 : false;
  }
  function hashCode_0(l) {
    _init_properties_longjs_kt__tqrzid();
    return l.low_1 ^ l.high_1;
  }
  function toStringImpl(_this__u8e3s4, radix) {
    _init_properties_longjs_kt__tqrzid();
    if (radix < 2 ? true : 36 < radix) {
      throw Exception_init_$Create$_0('radix out of range: ' + radix);
    }
    if (isZero(_this__u8e3s4)) {
      return '0';
    }
    if (isNegative(_this__u8e3s4)) {
      if (equalsLong(_this__u8e3s4, get_MIN_VALUE())) {
        var radixLong = fromInt(radix);
        var div = _this__u8e3s4.div_jun7gj_k$(radixLong);
        var rem = subtract(multiply(div, radixLong), _this__u8e3s4).toInt_1tsl84_k$();
        var tmp = toStringImpl(div, radix);
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return tmp + rem.toString(radix);
      } else {
        return '-' + toStringImpl(negate(_this__u8e3s4), radix);
      }
    }
    var digitsPerTime = radix === 2 ? 31 : radix <= 10 ? 9 : radix <= 21 ? 7 : radix <= 35 ? 6 : 5;
    var radixToPower = fromNumber(Math.pow(radix, digitsPerTime));
    var rem_0 = _this__u8e3s4;
    var result = '';
    while (true) {
      var remDiv = rem_0.div_jun7gj_k$(radixToPower);
      var intval = subtract(rem_0, multiply(remDiv, radixToPower)).toInt_1tsl84_k$();
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var digits = intval.toString(radix);
      rem_0 = remDiv;
      if (isZero(rem_0)) {
        return digits + result;
      } else {
        while (digits.length < digitsPerTime) {
          digits = '0' + digits;
        }
        result = digits + result;
      }
    }
  }
  function fromInt(value) {
    _init_properties_longjs_kt__tqrzid();
    return new Long(value, value < 0 ? -1 : 0);
  }
  function isNegative(_this__u8e3s4) {
    _init_properties_longjs_kt__tqrzid();
    return _this__u8e3s4.high_1 < 0;
  }
  function isZero(_this__u8e3s4) {
    _init_properties_longjs_kt__tqrzid();
    return _this__u8e3s4.high_1 === 0 ? _this__u8e3s4.low_1 === 0 : false;
  }
  function isOdd(_this__u8e3s4) {
    _init_properties_longjs_kt__tqrzid();
    return (_this__u8e3s4.low_1 & 1) === 1;
  }
  function negate(_this__u8e3s4) {
    _init_properties_longjs_kt__tqrzid();
    return _this__u8e3s4.unaryMinus_6uz0qp_k$();
  }
  function lessThan(_this__u8e3s4, other) {
    _init_properties_longjs_kt__tqrzid();
    return compare(_this__u8e3s4, other) < 0;
  }
  function fromNumber(value) {
    _init_properties_longjs_kt__tqrzid();
    if (isNaN_0(value)) {
      return get_ZERO();
    } else if (value <= -9.223372036854776E18) {
      return get_MIN_VALUE();
    } else if (value + 1 >= 9.223372036854776E18) {
      return get_MAX_VALUE();
    } else if (value < 0.0) {
      return negate(fromNumber(-value));
    } else {
      var twoPwr32 = 4.294967296E9;
      // Inline function 'kotlin.js.jsBitwiseOr' call
      var tmp = value % twoPwr32 | 0;
      // Inline function 'kotlin.js.jsBitwiseOr' call
      var tmp$ret$1 = value / twoPwr32 | 0;
      return new Long(tmp, tmp$ret$1);
    }
  }
  function greaterThan(_this__u8e3s4, other) {
    _init_properties_longjs_kt__tqrzid();
    return compare(_this__u8e3s4, other) > 0;
  }
  function greaterThanOrEqual(_this__u8e3s4, other) {
    _init_properties_longjs_kt__tqrzid();
    return compare(_this__u8e3s4, other) >= 0;
  }
  function getLowBitsUnsigned(_this__u8e3s4) {
    _init_properties_longjs_kt__tqrzid();
    return _this__u8e3s4.low_1 >= 0 ? _this__u8e3s4.low_1 : 4.294967296E9 + _this__u8e3s4.low_1;
  }
  function get_TWO_PWR_32_DBL_() {
    return TWO_PWR_32_DBL_;
  }
  var TWO_PWR_32_DBL_;
  function get_TWO_PWR_63_DBL_() {
    return TWO_PWR_63_DBL_;
  }
  var TWO_PWR_63_DBL_;
  var properties_initialized_longjs_kt_5aju7t;
  function _init_properties_longjs_kt__tqrzid() {
    if (!properties_initialized_longjs_kt_5aju7t) {
      properties_initialized_longjs_kt_5aju7t = true;
      ZERO = fromInt(0);
      ONE = fromInt(1);
      NEG_ONE = fromInt(-1);
      MAX_VALUE = new Long(-1, 2147483647);
      MIN_VALUE = new Long(0, -2147483648);
      TWO_PWR_24_ = fromInt(16777216);
    }
  }
  function classMeta(name, defaultConstructor, associatedObjectKey, associatedObjects, suspendArity) {
    return createMetadata('class', name, defaultConstructor, associatedObjectKey, associatedObjects, suspendArity, null);
  }
  function createMetadata(kind, name, defaultConstructor, associatedObjectKey, associatedObjects, suspendArity, iid) {
    var undef = VOID;
    return {kind: kind, simpleName: name, associatedObjectKey: associatedObjectKey, associatedObjects: associatedObjects, suspendArity: suspendArity, $kClass$: undef, defaultConstructor: defaultConstructor, iid: iid};
  }
  function setMetadataFor(ctor, name, metadataConstructor, parent, interfaces, defaultConstructor, associatedObjectKey, associatedObjects, suspendArity) {
    if (!(parent == null)) {
      ctor.prototype = Object.create(parent.prototype);
      ctor.prototype.constructor = ctor;
    }
    var metadata = metadataConstructor(name, defaultConstructor, associatedObjectKey, associatedObjects, suspendArity == null ? [] : suspendArity);
    ctor.$metadata$ = metadata;
    if (!(interfaces == null)) {
      var receiver = !(metadata.iid == null) ? ctor : ctor.prototype;
      receiver.$imask$ = implement(interfaces);
    }
  }
  function interfaceMeta(name, defaultConstructor, associatedObjectKey, associatedObjects, suspendArity) {
    return createMetadata('interface', name, defaultConstructor, associatedObjectKey, associatedObjects, suspendArity, generateInterfaceId());
  }
  function generateInterfaceId() {
    if (iid === VOID) {
      iid = 0;
    }
    // Inline function 'kotlin.js.unsafeCast' call
    iid = iid + 1 | 0;
    // Inline function 'kotlin.js.unsafeCast' call
    return iid;
  }
  function set_iid(_set____db54di) {
    iid = _set____db54di;
  }
  function get_iid() {
    return iid;
  }
  var iid;
  function objectMeta(name, defaultConstructor, associatedObjectKey, associatedObjects, suspendArity) {
    return createMetadata('object', name, defaultConstructor, associatedObjectKey, associatedObjects, suspendArity, null);
  }
  function withType(type, array) {
    array.$type$ = type;
    return array;
  }
  function arrayConcat(args) {
    var len = args.length;
    // Inline function 'kotlin.js.unsafeCast' call
    var typed = Array(len);
    var inductionVariable = 0;
    var last = len - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var arr = args[i];
        if (!(!(arr == null) ? isArray(arr) : false)) {
          typed[i] = [].slice.call(arr);
        } else {
          typed[i] = arr;
        }
      }
       while (!(i === last));
    return [].concat.apply([], typed);
  }
  function primitiveArrayConcat(args) {
    var size_local = 0;
    var inductionVariable = 0;
    var last = args.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = size_local;
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        size_local = tmp + args[i].length | 0;
      }
       while (!(i === last));
    var a = args[0];
    // Inline function 'kotlin.js.unsafeCast' call
    var result = new a.constructor(size_local);
    // Inline function 'kotlin.js.asDynamic' call
    if (a.$type$ != null) {
      // Inline function 'withType' call
      // Inline function 'kotlin.js.asDynamic' call
      result.$type$ = a.$type$;
    }
    size_local = 0;
    var inductionVariable_0 = 0;
    var last_0 = args.length - 1 | 0;
    if (inductionVariable_0 <= last_0)
      do {
        var i_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        var arr = args[i_0];
        var inductionVariable_1 = 0;
        var last_1 = arr.length - 1 | 0;
        if (inductionVariable_1 <= last_1)
          do {
            var j = inductionVariable_1;
            inductionVariable_1 = inductionVariable_1 + 1 | 0;
            var tmp3 = size_local;
            size_local = tmp3 + 1 | 0;
            result[tmp3] = arr[j];
          }
           while (!(j === last_1));
      }
       while (!(i_0 === last_0));
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return result;
  }
  function taggedArrayCopy(array) {
    var res = array.slice();
    res.$type$ = array.$type$;
    // Inline function 'kotlin.js.unsafeCast' call
    return res;
  }
  function numberToByte(a) {
    return toByte(numberToInt(a));
  }
  function toByte(a) {
    // Inline function 'kotlin.js.unsafeCast' call
    return a << 24 >> 24;
  }
  function numberToInt(a) {
    var tmp;
    if (a instanceof Long) {
      tmp = a.toInt_1tsl84_k$();
    } else {
      tmp = doubleToInt(a);
    }
    return tmp;
  }
  function doubleToInt(a) {
    var tmp;
    if (a > 2.147483647E9) {
      tmp = 2147483647;
    } else if (a < -2.147483648E9) {
      tmp = -2147483648;
    } else {
      // Inline function 'kotlin.js.jsBitwiseOr' call
      tmp = a | 0;
    }
    return tmp;
  }
  function numberToDouble(a) {
    // Inline function 'kotlin.js.unsafeCast' call
    return +a;
  }
  function numberToShort(a) {
    return toShort(numberToInt(a));
  }
  function toShort(a) {
    // Inline function 'kotlin.js.unsafeCast' call
    return a << 16 >> 16;
  }
  function numberToLong(a) {
    var tmp;
    if (a instanceof Long) {
      tmp = a;
    } else {
      tmp = fromNumber(a);
    }
    return tmp;
  }
  function numberToChar(a) {
    // Inline function 'kotlin.toUShort' call
    var this_0 = numberToInt(a);
    var tmp$ret$0 = _UShort___init__impl__jigrne(toShort(this_0));
    return _Char___init__impl__6a9atx_0(tmp$ret$0);
  }
  function toLong(a) {
    return fromInt(a);
  }
  function numberRangeToNumber(start, endInclusive) {
    return new IntRange(start, endInclusive);
  }
  function numberRangeToLong(start, endInclusive) {
    return new LongRange(numberToLong(start), endInclusive);
  }
  function get_propertyRefClassMetadataCache() {
    _init_properties_reflectRuntime_kt__5r4uu3();
    return propertyRefClassMetadataCache;
  }
  var propertyRefClassMetadataCache;
  function metadataObject() {
    _init_properties_reflectRuntime_kt__5r4uu3();
    return classMeta(VOID, VOID, VOID, VOID, VOID);
  }
  function getPropertyCallableRef(name, paramCount, superType, getter, setter) {
    _init_properties_reflectRuntime_kt__5r4uu3();
    getter.get = getter;
    getter.set = setter;
    getter.callableName = name;
    // Inline function 'kotlin.js.unsafeCast' call
    return getPropertyRefClass(getter, getKPropMetadata(paramCount, setter), getInterfaceMaskFor(getter, superType));
  }
  function getPropertyRefClass(obj, metadata, imask) {
    _init_properties_reflectRuntime_kt__5r4uu3();
    obj.$metadata$ = metadata;
    obj.constructor = obj;
    obj.$imask$ = imask;
    return obj;
  }
  function getKPropMetadata(paramCount, setter) {
    _init_properties_reflectRuntime_kt__5r4uu3();
    return get_propertyRefClassMetadataCache()[paramCount][setter == null ? 0 : 1];
  }
  function getInterfaceMaskFor(obj, superType) {
    _init_properties_reflectRuntime_kt__5r4uu3();
    var tmp0_elvis_lhs = obj.$imask$;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp$ret$2 = [superType];
      tmp = implement(tmp$ret$2);
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function getLocalDelegateReference(name, superType, mutable, lambda) {
    _init_properties_reflectRuntime_kt__5r4uu3();
    return getPropertyCallableRef(name, 0, superType, lambda, mutable ? lambda : null);
  }
  var properties_initialized_reflectRuntime_kt_inkhwd;
  function _init_properties_reflectRuntime_kt__5r4uu3() {
    if (!properties_initialized_reflectRuntime_kt_inkhwd) {
      properties_initialized_reflectRuntime_kt_inkhwd = true;
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp = [metadataObject(), metadataObject()];
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp_0 = [metadataObject(), metadataObject()];
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      propertyRefClassMetadataCache = [tmp, tmp_0, [metadataObject(), metadataObject()]];
    }
  }
  function jsIn(lhs, rhs) {
    return lhs in rhs;
  }
  function jsBitwiseOr(lhs, rhs) {
    return lhs | rhs;
  }
  function jsInstanceOf(obj, jsClass) {
    return obj instanceof jsClass;
  }
  function isArrayish(o) {
    return isJsArray(o) ? true : isView(o);
  }
  function isJsArray(obj) {
    // Inline function 'kotlin.js.unsafeCast' call
    return Array.isArray(obj);
  }
  function isExternalObject(value, ktExternalObject) {
    var tmp;
    if (value === ktExternalObject) {
      tmp = true;
    } else {
      var tmp_0;
      if (typeof ktExternalObject === 'function') {
        // Inline function 'kotlin.js.jsInstanceOf' call
        tmp_0 = value instanceof ktExternalObject;
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    }
    return tmp;
  }
  function isInterface(obj, iface) {
    return isInterfaceImpl(obj, iface.$metadata$.iid);
  }
  function isInterfaceImpl(obj, iface) {
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp0_elvis_lhs = obj.$imask$;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var mask = tmp;
    return isBitSet(mask, iface);
  }
  function isArray(obj) {
    var tmp;
    if (isJsArray(obj)) {
      // Inline function 'kotlin.js.asDynamic' call
      tmp = !obj.$type$;
    } else {
      tmp = false;
    }
    return tmp;
  }
  function isSuspendFunction(obj, arity) {
    var objTypeOf = typeof obj;
    if (objTypeOf === 'function') {
      // Inline function 'kotlin.js.unsafeCast' call
      return obj.$arity === arity;
    }
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp1_safe_receiver = obj == null ? null : obj.constructor;
    var tmp2_safe_receiver = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.$metadata$;
    var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.suspendArity;
    var tmp;
    if (tmp3_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp3_elvis_lhs;
    }
    var suspendArity = tmp;
    var result = false;
    var inductionVariable = 0;
    var last = suspendArity.length;
    $l$loop: while (inductionVariable < last) {
      var item = suspendArity[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      if (arity === item) {
        result = true;
        break $l$loop;
      }
    }
    return result;
  }
  function isNumber(a) {
    var tmp;
    if (typeof a === 'number') {
      tmp = true;
    } else {
      tmp = a instanceof Long;
    }
    return tmp;
  }
  function isComparable(value) {
    var type = typeof value;
    return ((type === 'string' ? true : type === 'boolean') ? true : isNumber(value)) ? true : isInterface(value, Comparable);
  }
  function isCharSequence(value) {
    return typeof value === 'string' ? true : isInterface(value, CharSequence);
  }
  function isBooleanArray(a) {
    return isJsArray(a) ? a.$type$ === 'BooleanArray' : false;
  }
  function isByteArray(a) {
    // Inline function 'kotlin.js.jsInstanceOf' call
    return a instanceof Int8Array;
  }
  function isShortArray(a) {
    // Inline function 'kotlin.js.jsInstanceOf' call
    return a instanceof Int16Array;
  }
  function isCharArray(a) {
    var tmp;
    // Inline function 'kotlin.js.jsInstanceOf' call
    if (a instanceof Uint16Array) {
      tmp = a.$type$ === 'CharArray';
    } else {
      tmp = false;
    }
    return tmp;
  }
  function isIntArray(a) {
    // Inline function 'kotlin.js.jsInstanceOf' call
    return a instanceof Int32Array;
  }
  function isFloatArray(a) {
    // Inline function 'kotlin.js.jsInstanceOf' call
    return a instanceof Float32Array;
  }
  function isLongArray(a) {
    return isJsArray(a) ? a.$type$ === 'LongArray' : false;
  }
  function isDoubleArray(a) {
    // Inline function 'kotlin.js.jsInstanceOf' call
    return a instanceof Float64Array;
  }
  function jsIsType(obj, jsClass) {
    if (jsClass === Object) {
      return obj != null;
    }
    var objType = typeof obj;
    var jsClassType = typeof jsClass;
    if ((obj == null ? true : jsClass == null) ? true : !(objType === 'object') ? !(objType === 'function') : false) {
      return false;
    }
    var constructor = jsClassType === 'object' ? jsGetPrototypeOf(jsClass) : jsClass;
    var klassMetadata = constructor.$metadata$;
    if ((klassMetadata == null ? null : klassMetadata.kind) === 'interface') {
      // Inline function 'kotlin.js.unsafeCast' call
      var tmp1_elvis_lhs = klassMetadata.iid;
      var tmp;
      if (tmp1_elvis_lhs == null) {
        return false;
      } else {
        tmp = tmp1_elvis_lhs;
      }
      var iid = tmp;
      return isInterfaceImpl(obj, iid);
    }
    // Inline function 'kotlin.js.jsInstanceOf' call
    return obj instanceof constructor;
  }
  function jsGetPrototypeOf(jsClass) {
    return Object.getPrototypeOf(jsClass);
  }
  function calculateErrorInfo(proto) {
    var tmp0_safe_receiver = proto.constructor;
    var metadata = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.$metadata$;
    var tmp2_safe_receiver = metadata == null ? null : metadata.errorInfo;
    if (tmp2_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      return tmp2_safe_receiver;
    }
    var result = 0;
    if (hasProp(proto, 'message'))
      result = result | 1;
    if (hasProp(proto, 'cause'))
      result = result | 2;
    if (!(result === 3)) {
      var parentProto = getPrototypeOf(proto);
      if (parentProto != Error.prototype) {
        result = result | calculateErrorInfo(parentProto);
      }
    }
    if (!(metadata == null)) {
      metadata.errorInfo = result;
    }
    return result;
  }
  function hasProp(proto, propName) {
    return proto.hasOwnProperty(propName);
  }
  function getPrototypeOf(obj) {
    return Object.getPrototypeOf(obj);
  }
  function throwLinkageError(message) {
    throw new IrLinkageError(message);
  }
  function IrLinkageError(message) {
    Error_init_$Init$_0(message, this);
    captureStack(this, IrLinkageError);
  }
  function get_VOID() {
    _init_properties_void_kt__3zg9as();
    return VOID;
  }
  var VOID;
  var properties_initialized_void_kt_e4ret2;
  function _init_properties_void_kt__3zg9as() {
    if (!properties_initialized_void_kt_e4ret2) {
      properties_initialized_void_kt_e4ret2 = true;
      VOID = void 0;
    }
  }
  function SuspendFunction0() {
  }
  function SuspendFunction1() {
  }
  function SuspendFunction2() {
  }
  function Function1() {
  }
  function Function0() {
  }
  function Function2() {
  }
  function Function3() {
  }
  function Function5() {
  }
  function KFunction2() {
  }
  function KFunction1() {
  }
  function fill(_this__u8e3s4, element, fromIndex, toIndex) {
    fromIndex = fromIndex === VOID ? 0 : fromIndex;
    toIndex = toIndex === VOID ? _this__u8e3s4.length : toIndex;
    Companion_getInstance_4().checkRangeIndexes_a38xj7_k$(fromIndex, toIndex, _this__u8e3s4.length);
    // Inline function 'kotlin.js.nativeFill' call
    // Inline function 'kotlin.js.asDynamic' call
    _this__u8e3s4.fill(element, fromIndex, toIndex);
  }
  function copyInto(_this__u8e3s4, destination, destinationOffset, startIndex, endIndex) {
    destinationOffset = destinationOffset === VOID ? 0 : destinationOffset;
    startIndex = startIndex === VOID ? 0 : startIndex;
    endIndex = endIndex === VOID ? _this__u8e3s4.length : endIndex;
    arrayCopy(_this__u8e3s4, destination, destinationOffset, startIndex, endIndex);
    return destination;
  }
  function copyOf(_this__u8e3s4, newSize) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(newSize >= 0)) {
      // Inline function 'kotlin.collections.copyOf.<anonymous>' call
      var message = 'Invalid new array size: ' + newSize + '.';
      throw IllegalArgumentException_init_$Create$_0(toString_2(message));
    }
    return fillFrom(_this__u8e3s4, new Int32Array(newSize));
  }
  function copyOf_0(_this__u8e3s4, newSize) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(newSize >= 0)) {
      // Inline function 'kotlin.collections.copyOf.<anonymous>' call
      var message = 'Invalid new array size: ' + newSize + '.';
      throw IllegalArgumentException_init_$Create$_0(toString_2(message));
    }
    return arrayCopyResize(_this__u8e3s4, newSize, null);
  }
  function copyOf_1(_this__u8e3s4) {
    // Inline function 'kotlin.js.asDynamic' call
    return _this__u8e3s4.slice();
  }
  function asList(_this__u8e3s4) {
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return new ArrayList(_this__u8e3s4);
  }
  function sortWith_0(_this__u8e3s4, comparator) {
    if (_this__u8e3s4.length > 1) {
      sortArrayWith(_this__u8e3s4, comparator);
    }
  }
  function copyOf_2(_this__u8e3s4) {
    // Inline function 'kotlin.js.asDynamic' call
    return _this__u8e3s4.slice();
  }
  function copyInto_0(_this__u8e3s4, destination, destinationOffset, startIndex, endIndex) {
    destinationOffset = destinationOffset === VOID ? 0 : destinationOffset;
    startIndex = startIndex === VOID ? 0 : startIndex;
    endIndex = endIndex === VOID ? _this__u8e3s4.length : endIndex;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp = _this__u8e3s4;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    arrayCopy(tmp, destination, destinationOffset, startIndex, endIndex);
    return destination;
  }
  function sort(_this__u8e3s4) {
    // Inline function 'kotlin.js.nativeSort' call
    var comparison = undefined;
    // Inline function 'kotlin.js.asDynamic' call
    _this__u8e3s4.sort(comparison);
  }
  function copyOf_3(_this__u8e3s4) {
    // Inline function 'kotlin.js.asDynamic' call
    return _this__u8e3s4.slice();
  }
  function sort_0(_this__u8e3s4) {
    // Inline function 'kotlin.js.nativeSort' call
    var comparison = undefined;
    // Inline function 'kotlin.js.asDynamic' call
    _this__u8e3s4.sort(comparison);
  }
  function copyOf_4(_this__u8e3s4) {
    // Inline function 'kotlin.js.asDynamic' call
    return _this__u8e3s4.slice();
  }
  function copyOf_5(_this__u8e3s4) {
    // Inline function 'withType' call
    var type = 'BooleanArray';
    // Inline function 'kotlin.js.asDynamic' call
    var array = _this__u8e3s4.slice();
    array.$type$ = type;
    return array;
  }
  function contentEquals_4(_this__u8e3s4, other) {
    return contentEqualsInternal(_this__u8e3s4, other);
  }
  function contentEquals_5(_this__u8e3s4, other) {
    return contentEqualsInternal(_this__u8e3s4, other);
  }
  function contentEquals_6(_this__u8e3s4, other) {
    return contentEqualsInternal(_this__u8e3s4, other);
  }
  function contentEquals_7(_this__u8e3s4, other) {
    return contentEqualsInternal(_this__u8e3s4, other);
  }
  function contentEquals_8(_this__u8e3s4, other) {
    return contentEqualsInternal(_this__u8e3s4, other);
  }
  function contentEquals_9(_this__u8e3s4, other) {
    return contentEqualsInternal(_this__u8e3s4, other);
  }
  function contentEquals_10(_this__u8e3s4, other) {
    return contentEqualsInternal(_this__u8e3s4, other);
  }
  function contentEquals_11(_this__u8e3s4, other) {
    return contentEqualsInternal(_this__u8e3s4, other);
  }
  function contentEquals_12(_this__u8e3s4, other) {
    return contentEqualsInternal(_this__u8e3s4, other);
  }
  function minOf_0(a, b) {
    return Math.min(a, b);
  }
  function maxOf_2(a, b) {
    return Math.max(a, b);
  }
  function _get_resultContinuation__9wf8ix($this) {
    return $this.resultContinuation_1;
  }
  function _get__context__gmdhsr($this) {
    return $this._context_1;
  }
  function _set_intercepted___wojxxj($this, _set____db54di) {
    $this.intercepted__1 = _set____db54di;
  }
  function _get_intercepted___h4t7df($this) {
    return $this.intercepted__1;
  }
  function releaseIntercepted($this) {
    var intercepted = $this.intercepted__1;
    if (!(intercepted == null) ? !(intercepted === $this) : false) {
      ensureNotNull($this.get_context_h02k06_k$().get_y2st91_k$(Key_getInstance())).releaseInterceptedContinuation_rgafzi_k$(intercepted);
    }
    $this.intercepted__1 = CompletedContinuation_getInstance();
  }
  function CoroutineImpl(resultContinuation) {
    this.resultContinuation_1 = resultContinuation;
    this.state_1 = 0;
    this.exceptionState_1 = 0;
    this.result_1 = null;
    this.exception_1 = null;
    this.finallyPath_1 = null;
    var tmp = this;
    var tmp0_safe_receiver = this.resultContinuation_1;
    tmp._context_1 = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.get_context_h02k06_k$();
    this.intercepted__1 = null;
  }
  protoOf(CoroutineImpl).set_state_rjd8d0_k$ = function (_set____db54di) {
    this.state_1 = _set____db54di;
  };
  protoOf(CoroutineImpl).get_state_iypx7s_k$ = function () {
    return this.state_1;
  };
  protoOf(CoroutineImpl).set_exceptionState_fex74n_k$ = function (_set____db54di) {
    this.exceptionState_1 = _set____db54di;
  };
  protoOf(CoroutineImpl).get_exceptionState_wflpxn_k$ = function () {
    return this.exceptionState_1;
  };
  protoOf(CoroutineImpl).set_result_xj64lm_k$ = function (_set____db54di) {
    this.result_1 = _set____db54di;
  };
  protoOf(CoroutineImpl).get_result_iyg5d2_k$ = function () {
    return this.result_1;
  };
  protoOf(CoroutineImpl).set_exception_px07aa_k$ = function (_set____db54di) {
    this.exception_1 = _set____db54di;
  };
  protoOf(CoroutineImpl).get_exception_x0n6w6_k$ = function () {
    return this.exception_1;
  };
  protoOf(CoroutineImpl).set_finallyPath_ohgcno_k$ = function (_set____db54di) {
    this.finallyPath_1 = _set____db54di;
  };
  protoOf(CoroutineImpl).get_finallyPath_aqs201_k$ = function () {
    return this.finallyPath_1;
  };
  protoOf(CoroutineImpl).get_context_h02k06_k$ = function () {
    return ensureNotNull(this._context_1);
  };
  protoOf(CoroutineImpl).intercepted_vh228x_k$ = function () {
    var tmp2_elvis_lhs = this.intercepted__1;
    var tmp;
    if (tmp2_elvis_lhs == null) {
      // Inline function 'kotlin.also' call
      var tmp0_safe_receiver = this.get_context_h02k06_k$().get_y2st91_k$(Key_getInstance());
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.interceptContinuation_3dnmlu_k$(this);
      var this_0 = tmp1_elvis_lhs == null ? this : tmp1_elvis_lhs;
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlin.coroutines.CoroutineImpl.intercepted.<anonymous>' call
      this.intercepted__1 = this_0;
      tmp = this_0;
    } else {
      tmp = tmp2_elvis_lhs;
    }
    return tmp;
  };
  protoOf(CoroutineImpl).resumeWith_b9cu3x_k$ = function (result) {
    var current = this;
    // Inline function 'kotlin.Result.getOrNull' call
    var tmp;
    if (_Result___get_isFailure__impl__jpiriv(result)) {
      tmp = null;
    } else {
      var tmp_0 = _Result___get_value__impl__bjfvqg(result);
      tmp = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    }
    var currentResult = tmp;
    var currentException = Result__exceptionOrNull_impl_p6xea9(result);
    while (true) {
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with = current;
      if (currentException == null) {
        $this$with.result_1 = currentResult;
      } else {
        $this$with.state_1 = $this$with.exceptionState_1;
        $this$with.exception_1 = currentException;
      }
      try {
        var outcome = $this$with.doResume_5yljmg_k$();
        if (outcome === get_COROUTINE_SUSPENDED())
          return Unit_getInstance();
        currentResult = outcome;
        currentException = null;
      } catch ($p) {
        var exception = $p;
        currentResult = null;
        // Inline function 'kotlin.js.unsafeCast' call
        currentException = exception;
      }
      releaseIntercepted($this$with);
      var completion = ensureNotNull($this$with.resultContinuation_1);
      var tmp_1;
      if (completion instanceof CoroutineImpl) {
        current = completion;
        tmp_1 = Unit_getInstance();
      } else {
        if (!(currentException == null)) {
          // Inline function 'kotlin.coroutines.resumeWithException' call
          var exception_0 = ensureNotNull(currentException);
          // Inline function 'kotlin.Companion.failure' call
          Companion_getInstance_15();
          var tmp$ret$2 = _Result___init__impl__xyqfz8(createFailure(exception_0));
          completion.resumeWith_dtxwbr_k$(tmp$ret$2);
        } else {
          // Inline function 'kotlin.coroutines.resume' call
          var value = currentResult;
          // Inline function 'kotlin.Companion.success' call
          Companion_getInstance_15();
          var tmp$ret$4 = _Result___init__impl__xyqfz8(value);
          completion.resumeWith_dtxwbr_k$(tmp$ret$4);
        }
        return Unit_getInstance();
      }
    }
  };
  protoOf(CoroutineImpl).resumeWith_dtxwbr_k$ = function (result) {
    return this.resumeWith_b9cu3x_k$(result);
  };
  protoOf(CoroutineImpl).create_d196fn_k$ = function (completion) {
    throw UnsupportedOperationException_init_$Create$_0('create(Continuation) has not been overridden');
  };
  protoOf(CoroutineImpl).create_wyq9v6_k$ = function (value, completion) {
    throw UnsupportedOperationException_init_$Create$_0('create(Any?;Continuation) has not been overridden');
  };
  function CompletedContinuation() {
    CompletedContinuation_instance = this;
  }
  protoOf(CompletedContinuation).get_context_h02k06_k$ = function () {
    var message = 'This continuation is already complete';
    throw IllegalStateException_init_$Create$_0(toString_2(message));
  };
  protoOf(CompletedContinuation).resumeWith_b9cu3x_k$ = function (result) {
    // Inline function 'kotlin.error' call
    var message = 'This continuation is already complete';
    throw IllegalStateException_init_$Create$_0(toString_2(message));
  };
  protoOf(CompletedContinuation).resumeWith_dtxwbr_k$ = function (result) {
    return this.resumeWith_b9cu3x_k$(result);
  };
  protoOf(CompletedContinuation).toString = function () {
    return 'This continuation is already complete';
  };
  var CompletedContinuation_instance;
  function CompletedContinuation_getInstance() {
    if (CompletedContinuation_instance == null)
      new CompletedContinuation();
    return CompletedContinuation_instance;
  }
  function invokeSuspendSuperType(_this__u8e3s4, completion) {
    throw new NotImplementedError('It is intrinsic method');
  }
  function invokeSuspendSuperTypeWithReceiver(_this__u8e3s4, receiver, completion) {
    throw new NotImplementedError('It is intrinsic method');
  }
  function invokeSuspendSuperTypeWithReceiverAndParam(_this__u8e3s4, receiver, param, completion) {
    throw new NotImplementedError('It is intrinsic method');
  }
  function Exception_init_$Init$($this) {
    extendThrowable($this);
    Exception.call($this);
    return $this;
  }
  function Exception_init_$Create$() {
    var tmp = Exception_init_$Init$(objectCreate(protoOf(Exception)));
    captureStack(tmp, Exception_init_$Create$);
    return tmp;
  }
  function Exception_init_$Init$_0(message, $this) {
    extendThrowable($this, message);
    Exception.call($this);
    return $this;
  }
  function Exception_init_$Create$_0(message) {
    var tmp = Exception_init_$Init$_0(message, objectCreate(protoOf(Exception)));
    captureStack(tmp, Exception_init_$Create$_0);
    return tmp;
  }
  function Exception_init_$Init$_1(message, cause, $this) {
    extendThrowable($this, message, cause);
    Exception.call($this);
    return $this;
  }
  function Exception_init_$Create$_1(message, cause) {
    var tmp = Exception_init_$Init$_1(message, cause, objectCreate(protoOf(Exception)));
    captureStack(tmp, Exception_init_$Create$_1);
    return tmp;
  }
  function Exception_init_$Init$_2(cause, $this) {
    extendThrowable($this, VOID, cause);
    Exception.call($this);
    return $this;
  }
  function Exception_init_$Create$_2(cause) {
    var tmp = Exception_init_$Init$_2(cause, objectCreate(protoOf(Exception)));
    captureStack(tmp, Exception_init_$Create$_2);
    return tmp;
  }
  function Exception() {
    captureStack(this, Exception);
  }
  function IllegalArgumentException_init_$Init$($this) {
    RuntimeException_init_$Init$($this);
    IllegalArgumentException.call($this);
    return $this;
  }
  function IllegalArgumentException_init_$Create$() {
    var tmp = IllegalArgumentException_init_$Init$(objectCreate(protoOf(IllegalArgumentException)));
    captureStack(tmp, IllegalArgumentException_init_$Create$);
    return tmp;
  }
  function IllegalArgumentException_init_$Init$_0(message, $this) {
    RuntimeException_init_$Init$_0(message, $this);
    IllegalArgumentException.call($this);
    return $this;
  }
  function IllegalArgumentException_init_$Create$_0(message) {
    var tmp = IllegalArgumentException_init_$Init$_0(message, objectCreate(protoOf(IllegalArgumentException)));
    captureStack(tmp, IllegalArgumentException_init_$Create$_0);
    return tmp;
  }
  function IllegalArgumentException_init_$Init$_1(message, cause, $this) {
    RuntimeException_init_$Init$_1(message, cause, $this);
    IllegalArgumentException.call($this);
    return $this;
  }
  function IllegalArgumentException_init_$Create$_1(message, cause) {
    var tmp = IllegalArgumentException_init_$Init$_1(message, cause, objectCreate(protoOf(IllegalArgumentException)));
    captureStack(tmp, IllegalArgumentException_init_$Create$_1);
    return tmp;
  }
  function IllegalArgumentException_init_$Init$_2(cause, $this) {
    RuntimeException_init_$Init$_2(cause, $this);
    IllegalArgumentException.call($this);
    return $this;
  }
  function IllegalArgumentException_init_$Create$_2(cause) {
    var tmp = IllegalArgumentException_init_$Init$_2(cause, objectCreate(protoOf(IllegalArgumentException)));
    captureStack(tmp, IllegalArgumentException_init_$Create$_2);
    return tmp;
  }
  function IllegalArgumentException() {
    captureStack(this, IllegalArgumentException);
  }
  function IndexOutOfBoundsException_init_$Init$($this) {
    RuntimeException_init_$Init$($this);
    IndexOutOfBoundsException.call($this);
    return $this;
  }
  function IndexOutOfBoundsException_init_$Create$() {
    var tmp = IndexOutOfBoundsException_init_$Init$(objectCreate(protoOf(IndexOutOfBoundsException)));
    captureStack(tmp, IndexOutOfBoundsException_init_$Create$);
    return tmp;
  }
  function IndexOutOfBoundsException_init_$Init$_0(message, $this) {
    RuntimeException_init_$Init$_0(message, $this);
    IndexOutOfBoundsException.call($this);
    return $this;
  }
  function IndexOutOfBoundsException_init_$Create$_0(message) {
    var tmp = IndexOutOfBoundsException_init_$Init$_0(message, objectCreate(protoOf(IndexOutOfBoundsException)));
    captureStack(tmp, IndexOutOfBoundsException_init_$Create$_0);
    return tmp;
  }
  function IndexOutOfBoundsException() {
    captureStack(this, IndexOutOfBoundsException);
  }
  function IllegalStateException_init_$Init$($this) {
    RuntimeException_init_$Init$($this);
    IllegalStateException.call($this);
    return $this;
  }
  function IllegalStateException_init_$Create$() {
    var tmp = IllegalStateException_init_$Init$(objectCreate(protoOf(IllegalStateException)));
    captureStack(tmp, IllegalStateException_init_$Create$);
    return tmp;
  }
  function IllegalStateException_init_$Init$_0(message, $this) {
    RuntimeException_init_$Init$_0(message, $this);
    IllegalStateException.call($this);
    return $this;
  }
  function IllegalStateException_init_$Create$_0(message) {
    var tmp = IllegalStateException_init_$Init$_0(message, objectCreate(protoOf(IllegalStateException)));
    captureStack(tmp, IllegalStateException_init_$Create$_0);
    return tmp;
  }
  function IllegalStateException_init_$Init$_1(message, cause, $this) {
    RuntimeException_init_$Init$_1(message, cause, $this);
    IllegalStateException.call($this);
    return $this;
  }
  function IllegalStateException_init_$Create$_1(message, cause) {
    var tmp = IllegalStateException_init_$Init$_1(message, cause, objectCreate(protoOf(IllegalStateException)));
    captureStack(tmp, IllegalStateException_init_$Create$_1);
    return tmp;
  }
  function IllegalStateException_init_$Init$_2(cause, $this) {
    RuntimeException_init_$Init$_2(cause, $this);
    IllegalStateException.call($this);
    return $this;
  }
  function IllegalStateException_init_$Create$_2(cause) {
    var tmp = IllegalStateException_init_$Init$_2(cause, objectCreate(protoOf(IllegalStateException)));
    captureStack(tmp, IllegalStateException_init_$Create$_2);
    return tmp;
  }
  function IllegalStateException() {
    captureStack(this, IllegalStateException);
  }
  function UnsupportedOperationException_init_$Init$($this) {
    RuntimeException_init_$Init$($this);
    UnsupportedOperationException.call($this);
    return $this;
  }
  function UnsupportedOperationException_init_$Create$() {
    var tmp = UnsupportedOperationException_init_$Init$(objectCreate(protoOf(UnsupportedOperationException)));
    captureStack(tmp, UnsupportedOperationException_init_$Create$);
    return tmp;
  }
  function UnsupportedOperationException_init_$Init$_0(message, $this) {
    RuntimeException_init_$Init$_0(message, $this);
    UnsupportedOperationException.call($this);
    return $this;
  }
  function UnsupportedOperationException_init_$Create$_0(message) {
    var tmp = UnsupportedOperationException_init_$Init$_0(message, objectCreate(protoOf(UnsupportedOperationException)));
    captureStack(tmp, UnsupportedOperationException_init_$Create$_0);
    return tmp;
  }
  function UnsupportedOperationException_init_$Init$_1(message, cause, $this) {
    RuntimeException_init_$Init$_1(message, cause, $this);
    UnsupportedOperationException.call($this);
    return $this;
  }
  function UnsupportedOperationException_init_$Create$_1(message, cause) {
    var tmp = UnsupportedOperationException_init_$Init$_1(message, cause, objectCreate(protoOf(UnsupportedOperationException)));
    captureStack(tmp, UnsupportedOperationException_init_$Create$_1);
    return tmp;
  }
  function UnsupportedOperationException_init_$Init$_2(cause, $this) {
    RuntimeException_init_$Init$_2(cause, $this);
    UnsupportedOperationException.call($this);
    return $this;
  }
  function UnsupportedOperationException_init_$Create$_2(cause) {
    var tmp = UnsupportedOperationException_init_$Init$_2(cause, objectCreate(protoOf(UnsupportedOperationException)));
    captureStack(tmp, UnsupportedOperationException_init_$Create$_2);
    return tmp;
  }
  function UnsupportedOperationException() {
    captureStack(this, UnsupportedOperationException);
  }
  function RuntimeException_init_$Init$($this) {
    Exception_init_$Init$($this);
    RuntimeException.call($this);
    return $this;
  }
  function RuntimeException_init_$Create$() {
    var tmp = RuntimeException_init_$Init$(objectCreate(protoOf(RuntimeException)));
    captureStack(tmp, RuntimeException_init_$Create$);
    return tmp;
  }
  function RuntimeException_init_$Init$_0(message, $this) {
    Exception_init_$Init$_0(message, $this);
    RuntimeException.call($this);
    return $this;
  }
  function RuntimeException_init_$Create$_0(message) {
    var tmp = RuntimeException_init_$Init$_0(message, objectCreate(protoOf(RuntimeException)));
    captureStack(tmp, RuntimeException_init_$Create$_0);
    return tmp;
  }
  function RuntimeException_init_$Init$_1(message, cause, $this) {
    Exception_init_$Init$_1(message, cause, $this);
    RuntimeException.call($this);
    return $this;
  }
  function RuntimeException_init_$Create$_1(message, cause) {
    var tmp = RuntimeException_init_$Init$_1(message, cause, objectCreate(protoOf(RuntimeException)));
    captureStack(tmp, RuntimeException_init_$Create$_1);
    return tmp;
  }
  function RuntimeException_init_$Init$_2(cause, $this) {
    Exception_init_$Init$_2(cause, $this);
    RuntimeException.call($this);
    return $this;
  }
  function RuntimeException_init_$Create$_2(cause) {
    var tmp = RuntimeException_init_$Init$_2(cause, objectCreate(protoOf(RuntimeException)));
    captureStack(tmp, RuntimeException_init_$Create$_2);
    return tmp;
  }
  function RuntimeException() {
    captureStack(this, RuntimeException);
  }
  function NoSuchElementException_init_$Init$($this) {
    RuntimeException_init_$Init$($this);
    NoSuchElementException.call($this);
    return $this;
  }
  function NoSuchElementException_init_$Create$() {
    var tmp = NoSuchElementException_init_$Init$(objectCreate(protoOf(NoSuchElementException)));
    captureStack(tmp, NoSuchElementException_init_$Create$);
    return tmp;
  }
  function NoSuchElementException_init_$Init$_0(message, $this) {
    RuntimeException_init_$Init$_0(message, $this);
    NoSuchElementException.call($this);
    return $this;
  }
  function NoSuchElementException_init_$Create$_0(message) {
    var tmp = NoSuchElementException_init_$Init$_0(message, objectCreate(protoOf(NoSuchElementException)));
    captureStack(tmp, NoSuchElementException_init_$Create$_0);
    return tmp;
  }
  function NoSuchElementException() {
    captureStack(this, NoSuchElementException);
  }
  function Error_init_$Init$($this) {
    extendThrowable($this);
    Error_0.call($this);
    return $this;
  }
  function Error_init_$Create$() {
    var tmp = Error_init_$Init$(objectCreate(protoOf(Error_0)));
    captureStack(tmp, Error_init_$Create$);
    return tmp;
  }
  function Error_init_$Init$_0(message, $this) {
    extendThrowable($this, message);
    Error_0.call($this);
    return $this;
  }
  function Error_init_$Create$_0(message) {
    var tmp = Error_init_$Init$_0(message, objectCreate(protoOf(Error_0)));
    captureStack(tmp, Error_init_$Create$_0);
    return tmp;
  }
  function Error_init_$Init$_1(message, cause, $this) {
    extendThrowable($this, message, cause);
    Error_0.call($this);
    return $this;
  }
  function Error_init_$Create$_1(message, cause) {
    var tmp = Error_init_$Init$_1(message, cause, objectCreate(protoOf(Error_0)));
    captureStack(tmp, Error_init_$Create$_1);
    return tmp;
  }
  function Error_init_$Init$_2(cause, $this) {
    extendThrowable($this, VOID, cause);
    Error_0.call($this);
    return $this;
  }
  function Error_init_$Create$_2(cause) {
    var tmp = Error_init_$Init$_2(cause, objectCreate(protoOf(Error_0)));
    captureStack(tmp, Error_init_$Create$_2);
    return tmp;
  }
  function Error_0() {
    captureStack(this, Error_0);
  }
  function ArithmeticException_init_$Init$($this) {
    RuntimeException_init_$Init$($this);
    ArithmeticException.call($this);
    return $this;
  }
  function ArithmeticException_init_$Create$() {
    var tmp = ArithmeticException_init_$Init$(objectCreate(protoOf(ArithmeticException)));
    captureStack(tmp, ArithmeticException_init_$Create$);
    return tmp;
  }
  function ArithmeticException_init_$Init$_0(message, $this) {
    RuntimeException_init_$Init$_0(message, $this);
    ArithmeticException.call($this);
    return $this;
  }
  function ArithmeticException_init_$Create$_0(message) {
    var tmp = ArithmeticException_init_$Init$_0(message, objectCreate(protoOf(ArithmeticException)));
    captureStack(tmp, ArithmeticException_init_$Create$_0);
    return tmp;
  }
  function ArithmeticException() {
    captureStack(this, ArithmeticException);
  }
  function ConcurrentModificationException_init_$Init$($this) {
    RuntimeException_init_$Init$($this);
    ConcurrentModificationException.call($this);
    return $this;
  }
  function ConcurrentModificationException_init_$Create$() {
    var tmp = ConcurrentModificationException_init_$Init$(objectCreate(protoOf(ConcurrentModificationException)));
    captureStack(tmp, ConcurrentModificationException_init_$Create$);
    return tmp;
  }
  function ConcurrentModificationException_init_$Init$_0(message, $this) {
    RuntimeException_init_$Init$_0(message, $this);
    ConcurrentModificationException.call($this);
    return $this;
  }
  function ConcurrentModificationException_init_$Create$_0(message) {
    var tmp = ConcurrentModificationException_init_$Init$_0(message, objectCreate(protoOf(ConcurrentModificationException)));
    captureStack(tmp, ConcurrentModificationException_init_$Create$_0);
    return tmp;
  }
  function ConcurrentModificationException_init_$Init$_1(message, cause, $this) {
    RuntimeException_init_$Init$_1(message, cause, $this);
    ConcurrentModificationException.call($this);
    return $this;
  }
  function ConcurrentModificationException_init_$Create$_1(message, cause) {
    var tmp = ConcurrentModificationException_init_$Init$_1(message, cause, objectCreate(protoOf(ConcurrentModificationException)));
    captureStack(tmp, ConcurrentModificationException_init_$Create$_1);
    return tmp;
  }
  function ConcurrentModificationException_init_$Init$_2(cause, $this) {
    RuntimeException_init_$Init$_2(cause, $this);
    ConcurrentModificationException.call($this);
    return $this;
  }
  function ConcurrentModificationException_init_$Create$_2(cause) {
    var tmp = ConcurrentModificationException_init_$Init$_2(cause, objectCreate(protoOf(ConcurrentModificationException)));
    captureStack(tmp, ConcurrentModificationException_init_$Create$_2);
    return tmp;
  }
  function ConcurrentModificationException() {
    captureStack(this, ConcurrentModificationException);
  }
  function NullPointerException_init_$Init$($this) {
    RuntimeException_init_$Init$($this);
    NullPointerException.call($this);
    return $this;
  }
  function NullPointerException_init_$Create$() {
    var tmp = NullPointerException_init_$Init$(objectCreate(protoOf(NullPointerException)));
    captureStack(tmp, NullPointerException_init_$Create$);
    return tmp;
  }
  function NullPointerException_init_$Init$_0(message, $this) {
    RuntimeException_init_$Init$_0(message, $this);
    NullPointerException.call($this);
    return $this;
  }
  function NullPointerException_init_$Create$_0(message) {
    var tmp = NullPointerException_init_$Init$_0(message, objectCreate(protoOf(NullPointerException)));
    captureStack(tmp, NullPointerException_init_$Create$_0);
    return tmp;
  }
  function NullPointerException() {
    captureStack(this, NullPointerException);
  }
  function NoWhenBranchMatchedException_init_$Init$($this) {
    RuntimeException_init_$Init$($this);
    NoWhenBranchMatchedException.call($this);
    return $this;
  }
  function NoWhenBranchMatchedException_init_$Create$() {
    var tmp = NoWhenBranchMatchedException_init_$Init$(objectCreate(protoOf(NoWhenBranchMatchedException)));
    captureStack(tmp, NoWhenBranchMatchedException_init_$Create$);
    return tmp;
  }
  function NoWhenBranchMatchedException_init_$Init$_0(message, $this) {
    RuntimeException_init_$Init$_0(message, $this);
    NoWhenBranchMatchedException.call($this);
    return $this;
  }
  function NoWhenBranchMatchedException_init_$Create$_0(message) {
    var tmp = NoWhenBranchMatchedException_init_$Init$_0(message, objectCreate(protoOf(NoWhenBranchMatchedException)));
    captureStack(tmp, NoWhenBranchMatchedException_init_$Create$_0);
    return tmp;
  }
  function NoWhenBranchMatchedException_init_$Init$_1(message, cause, $this) {
    RuntimeException_init_$Init$_1(message, cause, $this);
    NoWhenBranchMatchedException.call($this);
    return $this;
  }
  function NoWhenBranchMatchedException_init_$Create$_1(message, cause) {
    var tmp = NoWhenBranchMatchedException_init_$Init$_1(message, cause, objectCreate(protoOf(NoWhenBranchMatchedException)));
    captureStack(tmp, NoWhenBranchMatchedException_init_$Create$_1);
    return tmp;
  }
  function NoWhenBranchMatchedException_init_$Init$_2(cause, $this) {
    RuntimeException_init_$Init$_2(cause, $this);
    NoWhenBranchMatchedException.call($this);
    return $this;
  }
  function NoWhenBranchMatchedException_init_$Create$_2(cause) {
    var tmp = NoWhenBranchMatchedException_init_$Init$_2(cause, objectCreate(protoOf(NoWhenBranchMatchedException)));
    captureStack(tmp, NoWhenBranchMatchedException_init_$Create$_2);
    return tmp;
  }
  function NoWhenBranchMatchedException() {
    captureStack(this, NoWhenBranchMatchedException);
  }
  function ClassCastException_init_$Init$($this) {
    RuntimeException_init_$Init$($this);
    ClassCastException.call($this);
    return $this;
  }
  function ClassCastException_init_$Create$() {
    var tmp = ClassCastException_init_$Init$(objectCreate(protoOf(ClassCastException)));
    captureStack(tmp, ClassCastException_init_$Create$);
    return tmp;
  }
  function ClassCastException_init_$Init$_0(message, $this) {
    RuntimeException_init_$Init$_0(message, $this);
    ClassCastException.call($this);
    return $this;
  }
  function ClassCastException_init_$Create$_0(message) {
    var tmp = ClassCastException_init_$Init$_0(message, objectCreate(protoOf(ClassCastException)));
    captureStack(tmp, ClassCastException_init_$Create$_0);
    return tmp;
  }
  function ClassCastException() {
    captureStack(this, ClassCastException);
  }
  function UninitializedPropertyAccessException_init_$Init$($this) {
    RuntimeException_init_$Init$($this);
    UninitializedPropertyAccessException.call($this);
    return $this;
  }
  function UninitializedPropertyAccessException_init_$Create$() {
    var tmp = UninitializedPropertyAccessException_init_$Init$(objectCreate(protoOf(UninitializedPropertyAccessException)));
    captureStack(tmp, UninitializedPropertyAccessException_init_$Create$);
    return tmp;
  }
  function UninitializedPropertyAccessException_init_$Init$_0(message, $this) {
    RuntimeException_init_$Init$_0(message, $this);
    UninitializedPropertyAccessException.call($this);
    return $this;
  }
  function UninitializedPropertyAccessException_init_$Create$_0(message) {
    var tmp = UninitializedPropertyAccessException_init_$Init$_0(message, objectCreate(protoOf(UninitializedPropertyAccessException)));
    captureStack(tmp, UninitializedPropertyAccessException_init_$Create$_0);
    return tmp;
  }
  function UninitializedPropertyAccessException_init_$Init$_1(message, cause, $this) {
    RuntimeException_init_$Init$_1(message, cause, $this);
    UninitializedPropertyAccessException.call($this);
    return $this;
  }
  function UninitializedPropertyAccessException_init_$Create$_1(message, cause) {
    var tmp = UninitializedPropertyAccessException_init_$Init$_1(message, cause, objectCreate(protoOf(UninitializedPropertyAccessException)));
    captureStack(tmp, UninitializedPropertyAccessException_init_$Create$_1);
    return tmp;
  }
  function UninitializedPropertyAccessException_init_$Init$_2(cause, $this) {
    RuntimeException_init_$Init$_2(cause, $this);
    UninitializedPropertyAccessException.call($this);
    return $this;
  }
  function UninitializedPropertyAccessException_init_$Create$_2(cause) {
    var tmp = UninitializedPropertyAccessException_init_$Init$_2(cause, objectCreate(protoOf(UninitializedPropertyAccessException)));
    captureStack(tmp, UninitializedPropertyAccessException_init_$Create$_2);
    return tmp;
  }
  function UninitializedPropertyAccessException() {
    captureStack(this, UninitializedPropertyAccessException);
  }
  function toString_3(_this__u8e3s4, radix) {
    return toStringImpl(_this__u8e3s4, checkRadix(radix));
  }
  function get_code(_this__u8e3s4) {
    return Char__toInt_impl_vasixd(_this__u8e3s4);
  }
  function Char_0(code) {
    var tmp;
    // Inline function 'kotlin.code' call
    Companion_getInstance_1();
    var this_0 = _Char___init__impl__6a9atx(0);
    if (code < Char__toInt_impl_vasixd(this_0)) {
      tmp = true;
    } else {
      // Inline function 'kotlin.code' call
      Companion_getInstance_1();
      var this_1 = _Char___init__impl__6a9atx(65535);
      tmp = code > Char__toInt_impl_vasixd(this_1);
    }
    if (tmp) {
      throw IllegalArgumentException_init_$Create$_0('Invalid Char code: ' + code);
    }
    return numberToChar(code);
  }
  function ExperimentalStdlibApi() {
  }
  protoOf(ExperimentalStdlibApi).equals = function (other) {
    if (!(other instanceof ExperimentalStdlibApi))
      return false;
    other instanceof ExperimentalStdlibApi || THROW_CCE();
    return true;
  };
  protoOf(ExperimentalStdlibApi).hashCode = function () {
    return 0;
  };
  protoOf(ExperimentalStdlibApi).toString = function () {
    return '@kotlin.ExperimentalStdlibApi()';
  };
  function OverloadResolutionByLambdaReturnType() {
  }
  protoOf(OverloadResolutionByLambdaReturnType).equals = function (other) {
    if (!(other instanceof OverloadResolutionByLambdaReturnType))
      return false;
    other instanceof OverloadResolutionByLambdaReturnType || THROW_CCE();
    return true;
  };
  protoOf(OverloadResolutionByLambdaReturnType).hashCode = function () {
    return 0;
  };
  protoOf(OverloadResolutionByLambdaReturnType).toString = function () {
    return '@kotlin.OverloadResolutionByLambdaReturnType()';
  };
  function OptionalExpectation() {
  }
  protoOf(OptionalExpectation).equals = function (other) {
    if (!(other instanceof OptionalExpectation))
      return false;
    other instanceof OptionalExpectation || THROW_CCE();
    return true;
  };
  protoOf(OptionalExpectation).hashCode = function () {
    return 0;
  };
  protoOf(OptionalExpectation).toString = function () {
    return '@kotlin.OptionalExpectation()';
  };
  function ExperimentalMultiplatform() {
  }
  protoOf(ExperimentalMultiplatform).equals = function (other) {
    if (!(other instanceof ExperimentalMultiplatform))
      return false;
    other instanceof ExperimentalMultiplatform || THROW_CCE();
    return true;
  };
  protoOf(ExperimentalMultiplatform).hashCode = function () {
    return 0;
  };
  protoOf(ExperimentalMultiplatform).toString = function () {
    return '@kotlin.ExperimentalMultiplatform()';
  };
  function OptIn(markerClass) {
    this.markerClass_1 = markerClass;
  }
  protoOf(OptIn).get_markerClass_h8iub9_k$ = function () {
    return this.markerClass_1;
  };
  protoOf(OptIn).equals = function (other) {
    if (!(other instanceof OptIn))
      return false;
    var tmp0_other_with_cast = other instanceof OptIn ? other : THROW_CCE();
    if (!contentEquals_8(this.markerClass_1, tmp0_other_with_cast.markerClass_1))
      return false;
    return true;
  };
  protoOf(OptIn).hashCode = function () {
    return imul(getStringHashCode('markerClass'), 127) ^ hashCode(this.markerClass_1);
  };
  protoOf(OptIn).toString = function () {
    return '@kotlin.OptIn(markerClass=' + toString_2(this.markerClass_1) + ')';
  };
  var Level_WARNING_instance;
  var Level_ERROR_instance;
  function values_2() {
    return [Level_WARNING_getInstance(), Level_ERROR_getInstance()];
  }
  function valueOf_2(value) {
    switch (value) {
      case 'WARNING':
        return Level_WARNING_getInstance();
      case 'ERROR':
        return Level_ERROR_getInstance();
      default:
        Level_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_2() {
    if ($ENTRIES_2 == null)
      $ENTRIES_2 = enumEntries(values_2());
    return $ENTRIES_2;
  }
  var Level_entriesInitialized;
  function Level_initEntries() {
    if (Level_entriesInitialized)
      return Unit_getInstance();
    Level_entriesInitialized = true;
    Level_WARNING_instance = new Level('WARNING', 0);
    Level_ERROR_instance = new Level('ERROR', 1);
  }
  var $ENTRIES_2;
  function Level(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function Level_WARNING_getInstance() {
    Level_initEntries();
    return Level_WARNING_instance;
  }
  function Level_ERROR_getInstance() {
    Level_initEntries();
    return Level_ERROR_instance;
  }
  function RequiresOptIn(message, level) {
    message = message === VOID ? '' : message;
    level = level === VOID ? Level_ERROR_getInstance() : level;
    this.message_1 = message;
    this.level_1 = level;
  }
  protoOf(RequiresOptIn).get_message_h23axq_k$ = function () {
    return this.message_1;
  };
  protoOf(RequiresOptIn).get_level_ium7h7_k$ = function () {
    return this.level_1;
  };
  protoOf(RequiresOptIn).equals = function (other) {
    if (!(other instanceof RequiresOptIn))
      return false;
    var tmp0_other_with_cast = other instanceof RequiresOptIn ? other : THROW_CCE();
    if (!(this.message_1 === tmp0_other_with_cast.message_1))
      return false;
    if (!this.level_1.equals(tmp0_other_with_cast.level_1))
      return false;
    return true;
  };
  protoOf(RequiresOptIn).hashCode = function () {
    var result = imul(getStringHashCode('message'), 127) ^ getStringHashCode(this.message_1);
    result = result + (imul(getStringHashCode('level'), 127) ^ this.level_1.hashCode()) | 0;
    return result;
  };
  protoOf(RequiresOptIn).toString = function () {
    return '@kotlin.RequiresOptIn(message=' + this.message_1 + ', level=' + this.level_1 + ')';
  };
  function WasExperimental(markerClass) {
    this.markerClass_1 = markerClass;
  }
  protoOf(WasExperimental).get_markerClass_h8iub9_k$ = function () {
    return this.markerClass_1;
  };
  protoOf(WasExperimental).equals = function (other) {
    if (!(other instanceof WasExperimental))
      return false;
    var tmp0_other_with_cast = other instanceof WasExperimental ? other : THROW_CCE();
    if (!contentEquals_8(this.markerClass_1, tmp0_other_with_cast.markerClass_1))
      return false;
    return true;
  };
  protoOf(WasExperimental).hashCode = function () {
    return imul(getStringHashCode('markerClass'), 127) ^ hashCode(this.markerClass_1);
  };
  protoOf(WasExperimental).toString = function () {
    return '@kotlin.WasExperimental(markerClass=' + toString_2(this.markerClass_1) + ')';
  };
  function AbstractCollection$toString$lambda(this$0) {
    return function (it) {
      return it === this$0 ? '(this Collection)' : toString_1(it);
    };
  }
  function AbstractCollection() {
  }
  protoOf(AbstractCollection).contains_aljjnj_k$ = function (element) {
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlin.collections.any' call
      var tmp;
      if (isInterface(this, Collection)) {
        tmp = this.isEmpty_y1axqb_k$();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = false;
        break $l$block_0;
      }
      var tmp0_iterator = this.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element_0 = tmp0_iterator.next_20eer_k$();
        // Inline function 'kotlin.collections.AbstractCollection.contains.<anonymous>' call
        if (equals(element_0, element)) {
          tmp$ret$0 = true;
          break $l$block_0;
        }
      }
      tmp$ret$0 = false;
    }
    return tmp$ret$0;
  };
  protoOf(AbstractCollection).containsAll_xk45sd_k$ = function (elements) {
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlin.collections.all' call
      var tmp;
      if (isInterface(elements, Collection)) {
        tmp = elements.isEmpty_y1axqb_k$();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = true;
        break $l$block_0;
      }
      var tmp0_iterator = elements.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'kotlin.collections.AbstractCollection.containsAll.<anonymous>' call
        if (!this.contains_aljjnj_k$(element)) {
          tmp$ret$0 = false;
          break $l$block_0;
        }
      }
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  };
  protoOf(AbstractCollection).isEmpty_y1axqb_k$ = function () {
    return this.get_size_woubt6_k$() === 0;
  };
  protoOf(AbstractCollection).toString = function () {
    return joinToString_0(this, ', ', '[', ']', VOID, VOID, AbstractCollection$toString$lambda(this));
  };
  protoOf(AbstractCollection).toArray = function () {
    return collectionToArray(this);
  };
  protoOf(AbstractCollection).toArray_6cwqme_k$ = function (array) {
    return collectionToArray_0(this, array);
  };
  function _get_list__d9tsa5_0($this) {
    return $this.list_1;
  }
  function _get_fromIndex__987b49_0($this) {
    return $this.fromIndex_1;
  }
  function _set__size__bau3qd_1($this, _set____db54di) {
    $this._size_1 = _set____db54di;
  }
  function _get__size__kqacr3_1($this) {
    return $this._size_1;
  }
  function _get_maxArraySize__r3kkd1($this) {
    return $this.maxArraySize_1;
  }
  function SubList_0(list, fromIndex, toIndex) {
    AbstractList.call(this);
    this.list_1 = list;
    this.fromIndex_1 = fromIndex;
    this._size_1 = 0;
    Companion_getInstance_4().checkRangeIndexes_a38xj7_k$(this.fromIndex_1, toIndex, this.list_1.get_size_woubt6_k$());
    this._size_1 = toIndex - this.fromIndex_1 | 0;
  }
  protoOf(SubList_0).get_c1px32_k$ = function (index) {
    Companion_getInstance_4().checkElementIndex_r3t1bm_k$(index, this._size_1);
    return this.list_1.get_c1px32_k$(this.fromIndex_1 + index | 0);
  };
  protoOf(SubList_0).get_size_woubt6_k$ = function () {
    return this._size_1;
  };
  function IteratorImpl_0($outer) {
    this.$this_1 = $outer;
    this.index_1 = 0;
  }
  protoOf(IteratorImpl_0).set_index_69f5xp_k$ = function (_set____db54di) {
    this.index_1 = _set____db54di;
  };
  protoOf(IteratorImpl_0).get_index_it478p_k$ = function () {
    return this.index_1;
  };
  protoOf(IteratorImpl_0).hasNext_bitz1p_k$ = function () {
    return this.index_1 < this.$this_1.get_size_woubt6_k$();
  };
  protoOf(IteratorImpl_0).next_20eer_k$ = function () {
    if (!this.hasNext_bitz1p_k$())
      throw NoSuchElementException_init_$Create$();
    var tmp1 = this.index_1;
    this.index_1 = tmp1 + 1 | 0;
    return this.$this_1.get_c1px32_k$(tmp1);
  };
  function ListIteratorImpl_0($outer, index) {
    this.$this_2 = $outer;
    IteratorImpl_0.call(this, $outer);
    Companion_getInstance_4().checkPositionIndex_xiph8v_k$(index, this.$this_2.get_size_woubt6_k$());
    this.index_1 = index;
  }
  protoOf(ListIteratorImpl_0).hasPrevious_qh0629_k$ = function () {
    return this.index_1 > 0;
  };
  protoOf(ListIteratorImpl_0).nextIndex_jshxun_k$ = function () {
    return this.index_1;
  };
  protoOf(ListIteratorImpl_0).previous_l2dfd5_k$ = function () {
    if (!this.hasPrevious_qh0629_k$())
      throw NoSuchElementException_init_$Create$();
    this.index_1 = this.index_1 - 1 | 0;
    return this.$this_2.get_c1px32_k$(this.index_1);
  };
  protoOf(ListIteratorImpl_0).previousIndex_4qtyw5_k$ = function () {
    return this.index_1 - 1 | 0;
  };
  function Companion_4() {
    Companion_instance_4 = this;
    this.maxArraySize_1 = 2147483639;
  }
  protoOf(Companion_4).checkElementIndex_r3t1bm_k$ = function (index, size) {
    if (index < 0 ? true : index >= size) {
      throw IndexOutOfBoundsException_init_$Create$_0('index: ' + index + ', size: ' + size);
    }
  };
  protoOf(Companion_4).checkPositionIndex_xiph8v_k$ = function (index, size) {
    if (index < 0 ? true : index > size) {
      throw IndexOutOfBoundsException_init_$Create$_0('index: ' + index + ', size: ' + size);
    }
  };
  protoOf(Companion_4).checkRangeIndexes_a38xj7_k$ = function (fromIndex, toIndex, size) {
    if (fromIndex < 0 ? true : toIndex > size) {
      throw IndexOutOfBoundsException_init_$Create$_0('fromIndex: ' + fromIndex + ', toIndex: ' + toIndex + ', size: ' + size);
    }
    if (fromIndex > toIndex) {
      throw IllegalArgumentException_init_$Create$_0('fromIndex: ' + fromIndex + ' > toIndex: ' + toIndex);
    }
  };
  protoOf(Companion_4).checkBoundsIndexes_fu3rwb_k$ = function (startIndex, endIndex, size) {
    if (startIndex < 0 ? true : endIndex > size) {
      throw IndexOutOfBoundsException_init_$Create$_0('startIndex: ' + startIndex + ', endIndex: ' + endIndex + ', size: ' + size);
    }
    if (startIndex > endIndex) {
      throw IllegalArgumentException_init_$Create$_0('startIndex: ' + startIndex + ' > endIndex: ' + endIndex);
    }
  };
  protoOf(Companion_4).newCapacity_jl318a_k$ = function (oldCapacity, minCapacity) {
    var newCapacity = oldCapacity + (oldCapacity >> 1) | 0;
    if ((newCapacity - minCapacity | 0) < 0)
      newCapacity = minCapacity;
    if ((newCapacity - 2147483639 | 0) > 0)
      newCapacity = minCapacity > 2147483639 ? IntCompanionObject_getInstance().MAX_VALUE : 2147483639;
    return newCapacity;
  };
  protoOf(Companion_4).orderedHashCode_s560y_k$ = function (c) {
    var hashCode_0 = 1;
    var tmp0_iterator = c.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var e = tmp0_iterator.next_20eer_k$();
      var tmp = imul(31, hashCode_0);
      var tmp2_elvis_lhs = e == null ? null : hashCode(e);
      hashCode_0 = tmp + (tmp2_elvis_lhs == null ? 0 : tmp2_elvis_lhs) | 0;
    }
    return hashCode_0;
  };
  protoOf(Companion_4).orderedEquals_mgd3rc_k$ = function (c, other) {
    if (!(c.get_size_woubt6_k$() === other.get_size_woubt6_k$()))
      return false;
    var otherIterator = other.iterator_jk1svi_k$();
    var tmp0_iterator = c.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var elem = tmp0_iterator.next_20eer_k$();
      var elemOther = otherIterator.next_20eer_k$();
      if (!equals(elem, elemOther)) {
        return false;
      }
    }
    return true;
  };
  var Companion_instance_4;
  function Companion_getInstance_4() {
    if (Companion_instance_4 == null)
      new Companion_4();
    return Companion_instance_4;
  }
  function AbstractList() {
    Companion_getInstance_4();
    AbstractCollection.call(this);
  }
  protoOf(AbstractList).iterator_jk1svi_k$ = function () {
    return new IteratorImpl_0(this);
  };
  protoOf(AbstractList).indexOf_si1fv9_k$ = function (element) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.indexOfFirst' call
      var index = 0;
      var tmp0_iterator = this.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var item = tmp0_iterator.next_20eer_k$();
        // Inline function 'kotlin.collections.AbstractList.indexOf.<anonymous>' call
        if (equals(item, element)) {
          tmp$ret$1 = index;
          break $l$block;
        }
        index = index + 1 | 0;
      }
      tmp$ret$1 = -1;
    }
    return tmp$ret$1;
  };
  protoOf(AbstractList).lastIndexOf_v2p1fv_k$ = function (element) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.indexOfLast' call
      var iterator = this.listIterator_70e65o_k$(this.get_size_woubt6_k$());
      while (iterator.hasPrevious_qh0629_k$()) {
        // Inline function 'kotlin.collections.AbstractList.lastIndexOf.<anonymous>' call
        var it = iterator.previous_l2dfd5_k$();
        if (equals(it, element)) {
          tmp$ret$1 = iterator.nextIndex_jshxun_k$();
          break $l$block;
        }
      }
      tmp$ret$1 = -1;
    }
    return tmp$ret$1;
  };
  protoOf(AbstractList).listIterator_xjshxw_k$ = function () {
    return new ListIteratorImpl_0(this, 0);
  };
  protoOf(AbstractList).listIterator_70e65o_k$ = function (index) {
    return new ListIteratorImpl_0(this, index);
  };
  protoOf(AbstractList).subList_xle3r2_k$ = function (fromIndex, toIndex) {
    return new SubList_0(this, fromIndex, toIndex);
  };
  protoOf(AbstractList).equals = function (other) {
    if (other === this)
      return true;
    if (!(!(other == null) ? isInterface(other, List) : false))
      return false;
    return Companion_getInstance_4().orderedEquals_mgd3rc_k$(this, other);
  };
  protoOf(AbstractList).hashCode = function () {
    return Companion_getInstance_4().orderedHashCode_s560y_k$(this);
  };
  function AbstractMap$keys$1$iterator$1($entryIterator) {
    this.$entryIterator_1 = $entryIterator;
  }
  protoOf(AbstractMap$keys$1$iterator$1).hasNext_bitz1p_k$ = function () {
    return this.$entryIterator_1.hasNext_bitz1p_k$();
  };
  protoOf(AbstractMap$keys$1$iterator$1).next_20eer_k$ = function () {
    return this.$entryIterator_1.next_20eer_k$().get_key_18j28a_k$();
  };
  function AbstractMap$values$1$iterator$1($entryIterator) {
    this.$entryIterator_1 = $entryIterator;
  }
  protoOf(AbstractMap$values$1$iterator$1).hasNext_bitz1p_k$ = function () {
    return this.$entryIterator_1.hasNext_bitz1p_k$();
  };
  protoOf(AbstractMap$values$1$iterator$1).next_20eer_k$ = function () {
    return this.$entryIterator_1.next_20eer_k$().get_value_j01efc_k$();
  };
  function _set__keys__b6d6mq($this, _set____db54di) {
    $this._keys_1 = _set____db54di;
  }
  function _get__keys__kur9uq($this) {
    return $this._keys_1;
  }
  function toString_4($this, o) {
    return o === $this ? '(this Map)' : toString_1(o);
  }
  function implFindEntry($this, key) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator = $this.get_entries_p20ztl_k$().iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'kotlin.collections.AbstractMap.implFindEntry.<anonymous>' call
        if (equals(element.get_key_18j28a_k$(), key)) {
          tmp$ret$1 = element;
          break $l$block;
        }
      }
      tmp$ret$1 = null;
    }
    return tmp$ret$1;
  }
  function Companion_5() {
    Companion_instance_5 = this;
  }
  protoOf(Companion_5).entryHashCode_eee78l_k$ = function (e) {
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.collections.Companion.entryHashCode.<anonymous>' call
    var tmp2_safe_receiver = e.get_key_18j28a_k$();
    var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : hashCode(tmp2_safe_receiver);
    var tmp = tmp3_elvis_lhs == null ? 0 : tmp3_elvis_lhs;
    var tmp0_safe_receiver = e.get_value_j01efc_k$();
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    return tmp ^ (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs);
  };
  protoOf(Companion_5).entryToString_szml2i_k$ = function (e) {
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.collections.Companion.entryToString.<anonymous>' call
    return toString_1(e.get_key_18j28a_k$()) + '=' + toString_1(e.get_value_j01efc_k$());
  };
  protoOf(Companion_5).entryEquals_pndsjc_k$ = function (e, other) {
    if (!(!(other == null) ? isInterface(other, Entry) : false))
      return false;
    return equals(e.get_key_18j28a_k$(), other.get_key_18j28a_k$()) ? equals(e.get_value_j01efc_k$(), other.get_value_j01efc_k$()) : false;
  };
  var Companion_instance_5;
  function Companion_getInstance_5() {
    if (Companion_instance_5 == null)
      new Companion_5();
    return Companion_instance_5;
  }
  function AbstractMap$keys$1(this$0) {
    this.this$0__1 = this$0;
    AbstractSet.call(this);
  }
  protoOf(AbstractMap$keys$1).contains_vbgn2f_k$ = function (element) {
    return this.this$0__1.containsKey_aw81wo_k$(element);
  };
  protoOf(AbstractMap$keys$1).contains_aljjnj_k$ = function (element) {
    if (!(element == null ? true : !(element == null)))
      return false;
    return this.contains_vbgn2f_k$((element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(AbstractMap$keys$1).iterator_jk1svi_k$ = function () {
    var entryIterator = this.this$0__1.get_entries_p20ztl_k$().iterator_jk1svi_k$();
    return new AbstractMap$keys$1$iterator$1(entryIterator);
  };
  protoOf(AbstractMap$keys$1).get_size_woubt6_k$ = function () {
    return this.this$0__1.get_size_woubt6_k$();
  };
  function AbstractMap$toString$lambda(this$0) {
    return function (it) {
      return this$0.toString_shrnxz_k$(it);
    };
  }
  function AbstractMap$values$1(this$0) {
    this.this$0__1 = this$0;
    AbstractCollection.call(this);
  }
  protoOf(AbstractMap$values$1).contains_m22g8e_k$ = function (element) {
    return this.this$0__1.containsValue_yf2ykl_k$(element);
  };
  protoOf(AbstractMap$values$1).contains_aljjnj_k$ = function (element) {
    if (!(element == null ? true : !(element == null)))
      return false;
    return this.contains_m22g8e_k$((element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(AbstractMap$values$1).iterator_jk1svi_k$ = function () {
    var entryIterator = this.this$0__1.get_entries_p20ztl_k$().iterator_jk1svi_k$();
    return new AbstractMap$values$1$iterator$1(entryIterator);
  };
  protoOf(AbstractMap$values$1).get_size_woubt6_k$ = function () {
    return this.this$0__1.get_size_woubt6_k$();
  };
  function AbstractMap() {
    Companion_getInstance_5();
    this._keys_1 = null;
    this._values_1 = null;
  }
  protoOf(AbstractMap).containsKey_aw81wo_k$ = function (key) {
    return !(implFindEntry(this, key) == null);
  };
  protoOf(AbstractMap).containsValue_yf2ykl_k$ = function (value) {
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlin.collections.any' call
      var this_0 = this.get_entries_p20ztl_k$();
      var tmp;
      if (isInterface(this_0, Collection)) {
        tmp = this_0.isEmpty_y1axqb_k$();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = false;
        break $l$block_0;
      }
      var tmp0_iterator = this_0.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'kotlin.collections.AbstractMap.containsValue.<anonymous>' call
        if (equals(element.get_value_j01efc_k$(), value)) {
          tmp$ret$0 = true;
          break $l$block_0;
        }
      }
      tmp$ret$0 = false;
    }
    return tmp$ret$0;
  };
  protoOf(AbstractMap).containsEntry_x9fcvg_k$ = function (entry) {
    if (!(!(entry == null) ? isInterface(entry, Entry) : false))
      return false;
    var key = entry.get_key_18j28a_k$();
    var value = entry.get_value_j01efc_k$();
    // Inline function 'kotlin.collections.get' call
    var ourValue = (isInterface(this, Map_0) ? this : THROW_CCE()).get_wei43m_k$(key);
    if (!equals(value, ourValue)) {
      return false;
    }
    var tmp;
    if (ourValue == null) {
      // Inline function 'kotlin.collections.containsKey' call
      tmp = !(isInterface(this, Map_0) ? this : THROW_CCE()).containsKey_aw81wo_k$(key);
    } else {
      tmp = false;
    }
    if (tmp) {
      return false;
    }
    return true;
  };
  protoOf(AbstractMap).equals = function (other) {
    if (other === this)
      return true;
    if (!(!(other == null) ? isInterface(other, Map_0) : false))
      return false;
    if (!(this.get_size_woubt6_k$() === other.get_size_woubt6_k$()))
      return false;
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlin.collections.all' call
      var this_0 = other.get_entries_p20ztl_k$();
      var tmp;
      if (isInterface(this_0, Collection)) {
        tmp = this_0.isEmpty_y1axqb_k$();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = true;
        break $l$block_0;
      }
      var tmp0_iterator = this_0.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'kotlin.collections.AbstractMap.equals.<anonymous>' call
        if (!this.containsEntry_x9fcvg_k$(element)) {
          tmp$ret$0 = false;
          break $l$block_0;
        }
      }
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  };
  protoOf(AbstractMap).get_wei43m_k$ = function (key) {
    var tmp0_safe_receiver = implFindEntry(this, key);
    return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.get_value_j01efc_k$();
  };
  protoOf(AbstractMap).hashCode = function () {
    return hashCode(this.get_entries_p20ztl_k$());
  };
  protoOf(AbstractMap).isEmpty_y1axqb_k$ = function () {
    return this.get_size_woubt6_k$() === 0;
  };
  protoOf(AbstractMap).get_size_woubt6_k$ = function () {
    return this.get_entries_p20ztl_k$().get_size_woubt6_k$();
  };
  protoOf(AbstractMap).get_keys_wop4xp_k$ = function () {
    if (this._keys_1 == null) {
      var tmp = this;
      tmp._keys_1 = new AbstractMap$keys$1(this);
    }
    return ensureNotNull(this._keys_1);
  };
  protoOf(AbstractMap).toString = function () {
    var tmp = this.get_entries_p20ztl_k$();
    return joinToString_0(tmp, ', ', '{', '}', VOID, VOID, AbstractMap$toString$lambda(this));
  };
  protoOf(AbstractMap).toString_shrnxz_k$ = function (entry) {
    return toString_4(this, entry.get_key_18j28a_k$()) + '=' + toString_4(this, entry.get_value_j01efc_k$());
  };
  protoOf(AbstractMap).get_values_ksazhn_k$ = function () {
    if (this._values_1 == null) {
      var tmp = this;
      tmp._values_1 = new AbstractMap$values$1(this);
    }
    return ensureNotNull(this._values_1);
  };
  protoOf(AbstractMap).set__values_jz9swx_k$ = function (_set____db54di) {
    this._values_1 = _set____db54di;
  };
  protoOf(AbstractMap).get__values_wfmpnc_k$ = function () {
    return this._values_1;
  };
  function Companion_6() {
    Companion_instance_6 = this;
  }
  protoOf(Companion_6).unorderedHashCode_3jmy63_k$ = function (c) {
    var hashCode_0 = 0;
    var tmp0_iterator = c.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      var tmp = hashCode_0;
      var tmp2_elvis_lhs = element == null ? null : hashCode(element);
      hashCode_0 = tmp + (tmp2_elvis_lhs == null ? 0 : tmp2_elvis_lhs) | 0;
    }
    return hashCode_0;
  };
  protoOf(Companion_6).setEquals_3t788x_k$ = function (c, other) {
    if (!(c.get_size_woubt6_k$() === other.get_size_woubt6_k$()))
      return false;
    // Inline function 'kotlin.collections.containsAll' call
    return c.containsAll_xk45sd_k$(other);
  };
  var Companion_instance_6;
  function Companion_getInstance_6() {
    if (Companion_instance_6 == null)
      new Companion_6();
    return Companion_instance_6;
  }
  function AbstractSet() {
    Companion_getInstance_6();
    AbstractCollection.call(this);
  }
  protoOf(AbstractSet).equals = function (other) {
    if (other === this)
      return true;
    if (!(!(other == null) ? isInterface(other, Set) : false))
      return false;
    return Companion_getInstance_6().setEquals_3t788x_k$(this, other);
  };
  protoOf(AbstractSet).hashCode = function () {
    return Companion_getInstance_6().unorderedHashCode_3jmy63_k$(this);
  };
  function collectionToArrayCommonImpl(collection) {
    if (collection.isEmpty_y1axqb_k$()) {
      // Inline function 'kotlin.emptyArray' call
      return [];
    }
    // Inline function 'kotlin.arrayOfNulls' call
    var size = collection.get_size_woubt6_k$();
    var destination = fillArrayVal(Array(size), null);
    var iterator = collection.iterator_jk1svi_k$();
    var index = 0;
    while (iterator.hasNext_bitz1p_k$()) {
      var tmp0 = index;
      index = tmp0 + 1 | 0;
      destination[tmp0] = iterator.next_20eer_k$();
    }
    return destination;
  }
  function collectionToArrayCommonImpl_0(collection, array) {
    if (collection.isEmpty_y1axqb_k$())
      return terminateCollectionToArray(0, array);
    var tmp;
    if (array.length < collection.get_size_woubt6_k$()) {
      tmp = arrayOfNulls(array, collection.get_size_woubt6_k$());
    } else {
      tmp = array;
    }
    var destination = tmp;
    var iterator = collection.iterator_jk1svi_k$();
    var index = 0;
    while (iterator.hasNext_bitz1p_k$()) {
      var tmp0 = index;
      index = tmp0 + 1 | 0;
      var tmp_0 = iterator.next_20eer_k$();
      destination[tmp0] = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    }
    return terminateCollectionToArray(collection.get_size_woubt6_k$(), destination);
  }
  function get_lastIndex_6(_this__u8e3s4) {
    return _this__u8e3s4.get_size_woubt6_k$() - 1 | 0;
  }
  function throwIndexOverflow() {
    throw ArithmeticException_init_$Create$_0('Index overflow has happened.');
  }
  function containsAll(_this__u8e3s4, elements) {
    return _this__u8e3s4.containsAll_xk45sd_k$(elements);
  }
  function arrayListOf(elements) {
    return elements.length === 0 ? ArrayList_init_$Create$() : ArrayList_init_$Create$_1(new ArrayAsCollection(elements, true));
  }
  function ArrayAsCollection(values, isVarargs) {
    this.values_1 = values;
    this.isVarargs_1 = isVarargs;
  }
  protoOf(ArrayAsCollection).get_values_ksazhn_k$ = function () {
    return this.values_1;
  };
  protoOf(ArrayAsCollection).get_isVarargs_2u6iq9_k$ = function () {
    return this.isVarargs_1;
  };
  protoOf(ArrayAsCollection).get_size_woubt6_k$ = function () {
    return this.values_1.length;
  };
  protoOf(ArrayAsCollection).isEmpty_y1axqb_k$ = function () {
    // Inline function 'kotlin.collections.isEmpty' call
    return this.values_1.length === 0;
  };
  protoOf(ArrayAsCollection).contains_ccp5tc_k$ = function (element) {
    return contains_5(this.values_1, element);
  };
  protoOf(ArrayAsCollection).contains_aljjnj_k$ = function (element) {
    if (!(element == null ? true : !(element == null)))
      return false;
    return this.contains_ccp5tc_k$((element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(ArrayAsCollection).containsAll_70schq_k$ = function (elements) {
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlin.collections.all' call
      var tmp;
      if (isInterface(elements, Collection)) {
        tmp = elements.isEmpty_y1axqb_k$();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = true;
        break $l$block_0;
      }
      var tmp0_iterator = elements.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'kotlin.collections.ArrayAsCollection.containsAll.<anonymous>' call
        if (!this.contains_ccp5tc_k$(element)) {
          tmp$ret$0 = false;
          break $l$block_0;
        }
      }
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  };
  protoOf(ArrayAsCollection).containsAll_xk45sd_k$ = function (elements) {
    return this.containsAll_70schq_k$(elements);
  };
  protoOf(ArrayAsCollection).iterator_jk1svi_k$ = function () {
    return arrayIterator(this.values_1);
  };
  protoOf(ArrayAsCollection).toArray_jjyjqa_k$ = function () {
    // Inline function 'kotlin.collections.copyToArrayOfAny' call
    var this_0 = this.values_1;
    var tmp;
    if (this.isVarargs_1) {
      tmp = this_0;
    } else {
      // Inline function 'kotlin.collections.copyOf' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp = this_0.slice();
    }
    return tmp;
  };
  function throwCountOverflow() {
    throw ArithmeticException_init_$Create$_0('Count overflow has happened.');
  }
  function emptyList() {
    return EmptyList_getInstance();
  }
  function optimizeReadOnlyList(_this__u8e3s4) {
    switch (_this__u8e3s4.get_size_woubt6_k$()) {
      case 0:
        return emptyList();
      case 1:
        return listOf(_this__u8e3s4.get_c1px32_k$(0));
      default:
        return _this__u8e3s4;
    }
  }
  function _get_serialVersionUID__fhggm9($this) {
    return $this.serialVersionUID_1;
  }
  function readResolve($this) {
    return EmptyList_getInstance();
  }
  function EmptyList() {
    EmptyList_instance = this;
    this.serialVersionUID_1 = new Long(-1478467534, -1720727600);
  }
  protoOf(EmptyList).equals = function (other) {
    var tmp;
    if (!(other == null) ? isInterface(other, List) : false) {
      tmp = other.isEmpty_y1axqb_k$();
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(EmptyList).hashCode = function () {
    return 1;
  };
  protoOf(EmptyList).toString = function () {
    return '[]';
  };
  protoOf(EmptyList).get_size_woubt6_k$ = function () {
    return 0;
  };
  protoOf(EmptyList).isEmpty_y1axqb_k$ = function () {
    return true;
  };
  protoOf(EmptyList).contains_a7ux40_k$ = function (element) {
    return false;
  };
  protoOf(EmptyList).contains_aljjnj_k$ = function (element) {
    if (!false)
      return false;
    var tmp;
    if (false) {
      tmp = element;
    } else {
      tmp = THROW_CCE();
    }
    return this.contains_a7ux40_k$(tmp);
  };
  protoOf(EmptyList).containsAll_g2avn8_k$ = function (elements) {
    return elements.isEmpty_y1axqb_k$();
  };
  protoOf(EmptyList).containsAll_xk45sd_k$ = function (elements) {
    return this.containsAll_g2avn8_k$(elements);
  };
  protoOf(EmptyList).get_c1px32_k$ = function (index) {
    throw IndexOutOfBoundsException_init_$Create$_0("Empty list doesn't contain element at index " + index + '.');
  };
  protoOf(EmptyList).indexOf_31ms1i_k$ = function (element) {
    return -1;
  };
  protoOf(EmptyList).indexOf_si1fv9_k$ = function (element) {
    if (!false)
      return -1;
    var tmp;
    if (false) {
      tmp = element;
    } else {
      tmp = THROW_CCE();
    }
    return this.indexOf_31ms1i_k$(tmp);
  };
  protoOf(EmptyList).lastIndexOf_5pkqqc_k$ = function (element) {
    return -1;
  };
  protoOf(EmptyList).lastIndexOf_v2p1fv_k$ = function (element) {
    if (!false)
      return -1;
    var tmp;
    if (false) {
      tmp = element;
    } else {
      tmp = THROW_CCE();
    }
    return this.lastIndexOf_5pkqqc_k$(tmp);
  };
  protoOf(EmptyList).iterator_jk1svi_k$ = function () {
    return EmptyIterator_getInstance();
  };
  protoOf(EmptyList).listIterator_xjshxw_k$ = function () {
    return EmptyIterator_getInstance();
  };
  protoOf(EmptyList).listIterator_70e65o_k$ = function (index) {
    if (!(index === 0))
      throw IndexOutOfBoundsException_init_$Create$_0('Index: ' + index);
    return EmptyIterator_getInstance();
  };
  protoOf(EmptyList).subList_xle3r2_k$ = function (fromIndex, toIndex) {
    if (fromIndex === 0 ? toIndex === 0 : false)
      return this;
    throw IndexOutOfBoundsException_init_$Create$_0('fromIndex: ' + fromIndex + ', toIndex: ' + toIndex);
  };
  var EmptyList_instance;
  function EmptyList_getInstance() {
    if (EmptyList_instance == null)
      new EmptyList();
    return EmptyList_instance;
  }
  function EmptyIterator() {
    EmptyIterator_instance = this;
  }
  protoOf(EmptyIterator).hasNext_bitz1p_k$ = function () {
    return false;
  };
  protoOf(EmptyIterator).hasPrevious_qh0629_k$ = function () {
    return false;
  };
  protoOf(EmptyIterator).nextIndex_jshxun_k$ = function () {
    return 0;
  };
  protoOf(EmptyIterator).previousIndex_4qtyw5_k$ = function () {
    return -1;
  };
  protoOf(EmptyIterator).next_20eer_k$ = function () {
    throw NoSuchElementException_init_$Create$();
  };
  protoOf(EmptyIterator).previous_l2dfd5_k$ = function () {
    throw NoSuchElementException_init_$Create$();
  };
  var EmptyIterator_instance;
  function EmptyIterator_getInstance() {
    if (EmptyIterator_instance == null)
      new EmptyIterator();
    return EmptyIterator_instance;
  }
  function listOf_0(elements) {
    return elements.length > 0 ? asList(elements) : emptyList();
  }
  function isNotEmpty(_this__u8e3s4) {
    return !_this__u8e3s4.isEmpty_y1axqb_k$();
  }
  function get_indices_6(_this__u8e3s4) {
    return numberRangeToNumber(0, _this__u8e3s4.get_size_woubt6_k$() - 1 | 0);
  }
  function IndexedValue(index, value) {
    this.index_1 = index;
    this.value_1 = value;
  }
  protoOf(IndexedValue).get_index_it478p_k$ = function () {
    return this.index_1;
  };
  protoOf(IndexedValue).get_value_j01efc_k$ = function () {
    return this.value_1;
  };
  protoOf(IndexedValue).component1_7eebsc_k$ = function () {
    return this.index_1;
  };
  protoOf(IndexedValue).component2_7eebsb_k$ = function () {
    return this.value_1;
  };
  protoOf(IndexedValue).copy_n7nq18_k$ = function (index, value) {
    return new IndexedValue(index, value);
  };
  protoOf(IndexedValue).copy$default_9s2o0u_k$ = function (index, value, $super) {
    index = index === VOID ? this.index_1 : index;
    value = value === VOID ? this.value_1 : value;
    return $super === VOID ? this.copy_n7nq18_k$(index, value) : $super.copy_n7nq18_k$.call(this, index, value);
  };
  protoOf(IndexedValue).toString = function () {
    return 'IndexedValue(index=' + this.index_1 + ', value=' + this.value_1 + ')';
  };
  protoOf(IndexedValue).hashCode = function () {
    var result = this.index_1;
    result = imul(result, 31) + (this.value_1 == null ? 0 : hashCode(this.value_1)) | 0;
    return result;
  };
  protoOf(IndexedValue).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof IndexedValue))
      return false;
    var tmp0_other_with_cast = other instanceof IndexedValue ? other : THROW_CCE();
    if (!(this.index_1 === tmp0_other_with_cast.index_1))
      return false;
    if (!equals(this.value_1, tmp0_other_with_cast.value_1))
      return false;
    return true;
  };
  function collectionSizeOrDefault(_this__u8e3s4, default_0) {
    var tmp;
    if (isInterface(_this__u8e3s4, Collection)) {
      tmp = _this__u8e3s4.get_size_woubt6_k$();
    } else {
      tmp = default_0;
    }
    return tmp;
  }
  function _get_iteratorFactory__v4c94b($this) {
    return $this.iteratorFactory_1;
  }
  function IndexingIterable(iteratorFactory) {
    this.iteratorFactory_1 = iteratorFactory;
  }
  protoOf(IndexingIterable).iterator_jk1svi_k$ = function () {
    return new IndexingIterator(this.iteratorFactory_1());
  };
  function _get_iterator__8i7rvn($this) {
    return $this.iterator_1;
  }
  function _set_index__fyfqnn($this, _set____db54di) {
    $this.index_1 = _set____db54di;
  }
  function _get_index__g2optt_0($this) {
    return $this.index_1;
  }
  function IndexingIterator(iterator) {
    this.iterator_1 = iterator;
    this.index_1 = 0;
  }
  protoOf(IndexingIterator).hasNext_bitz1p_k$ = function () {
    return this.iterator_1.hasNext_bitz1p_k$();
  };
  protoOf(IndexingIterator).next_20eer_k$ = function () {
    var tmp1 = this.index_1;
    this.index_1 = tmp1 + 1 | 0;
    return new IndexedValue(checkIndexOverflow(tmp1), this.iterator_1.next_20eer_k$());
  };
  function iterator(_this__u8e3s4) {
    return _this__u8e3s4.get_entries_p20ztl_k$().iterator_jk1svi_k$();
  }
  function component1(_this__u8e3s4) {
    return _this__u8e3s4.get_key_18j28a_k$();
  }
  function component2(_this__u8e3s4) {
    return _this__u8e3s4.get_value_j01efc_k$();
  }
  function get_1(_this__u8e3s4, key) {
    return (isInterface(_this__u8e3s4, Map_0) ? _this__u8e3s4 : THROW_CCE()).get_wei43m_k$(key);
  }
  function containsKey(_this__u8e3s4, key) {
    return (isInterface(_this__u8e3s4, Map_0) ? _this__u8e3s4 : THROW_CCE()).containsKey_aw81wo_k$(key);
  }
  function set(_this__u8e3s4, key, value) {
    _this__u8e3s4.put_4fpzoq_k$(key, value);
  }
  function getOrPut(_this__u8e3s4, key, defaultValue) {
    var value = _this__u8e3s4.get_wei43m_k$(key);
    var tmp;
    if (value == null) {
      var answer = defaultValue();
      _this__u8e3s4.put_4fpzoq_k$(key, answer);
      tmp = answer;
    } else {
      tmp = value;
    }
    return tmp;
  }
  function removeAll(_this__u8e3s4, predicate) {
    return filterInPlace(_this__u8e3s4, predicate, true);
  }
  function removeAll_0(_this__u8e3s4, predicate) {
    return filterInPlace_0(_this__u8e3s4, predicate, true);
  }
  function filterInPlace(_this__u8e3s4, predicate, predicateResultToRemove) {
    if (!isInterface(_this__u8e3s4, RandomAccess)) {
      return filterInPlace_0(isInterface(_this__u8e3s4, MutableIterable) ? _this__u8e3s4 : THROW_CCE(), predicate, predicateResultToRemove);
    }
    var writeIndex = 0;
    var inductionVariable = 0;
    var last = get_lastIndex_6(_this__u8e3s4);
    if (inductionVariable <= last)
      $l$loop: do {
        var readIndex = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var element = _this__u8e3s4.get_c1px32_k$(readIndex);
        if (predicate(element) === predicateResultToRemove)
          continue $l$loop;
        if (!(writeIndex === readIndex)) {
          _this__u8e3s4.set_82063s_k$(writeIndex, element);
        }
        writeIndex = writeIndex + 1 | 0;
      }
       while (!(readIndex === last));
    if (writeIndex < _this__u8e3s4.get_size_woubt6_k$()) {
      var inductionVariable_0 = get_lastIndex_6(_this__u8e3s4);
      var last_0 = writeIndex;
      if (last_0 <= inductionVariable_0)
        do {
          var removeIndex = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + -1 | 0;
          _this__u8e3s4.removeAt_6niowx_k$(removeIndex);
        }
         while (!(removeIndex === last_0));
      return true;
    } else {
      return false;
    }
  }
  function filterInPlace_0(_this__u8e3s4, predicate, predicateResultToRemove) {
    var result = false;
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    var $this$with = _this__u8e3s4.iterator_jk1svi_k$();
    while ($this$with.hasNext_bitz1p_k$())
      if (predicate($this$with.next_20eer_k$()) === predicateResultToRemove) {
        $this$with.remove_ldkf9o_k$();
        result = true;
      }
    return result;
  }
  function addAll(_this__u8e3s4, elements) {
    if (isInterface(elements, Collection))
      return _this__u8e3s4.addAll_4lagoh_k$(elements);
    else {
      var result = false;
      var tmp1_iterator = elements.iterator_jk1svi_k$();
      while (tmp1_iterator.hasNext_bitz1p_k$()) {
        var item = tmp1_iterator.next_20eer_k$();
        if (_this__u8e3s4.add_utx5q5_k$(item))
          result = true;
      }
      return result;
    }
  }
  function IntIterator() {
  }
  protoOf(IntIterator).next_20eer_k$ = function () {
    return this.nextInt_ujorgc_k$();
  };
  function ByteIterator() {
  }
  protoOf(ByteIterator).next_20eer_k$ = function () {
    return this.nextByte_njqopn_k$();
  };
  function CharIterator() {
  }
  protoOf(CharIterator).next_30xa17_k$ = function () {
    return this.nextChar_yvnk6j_k$();
  };
  protoOf(CharIterator).next_20eer_k$ = function () {
    return new Char(this.next_30xa17_k$());
  };
  function LongIterator() {
  }
  protoOf(LongIterator).next_20eer_k$ = function () {
    return this.nextLong_njwv0v_k$();
  };
  function DoubleIterator() {
  }
  protoOf(DoubleIterator).next_20eer_k$ = function () {
    return this.nextDouble_s2xvfg_k$();
  };
  function FloatIterator() {
  }
  protoOf(FloatIterator).next_20eer_k$ = function () {
    return this.nextFloat_jqti5l_k$();
  };
  function ShortIterator() {
  }
  protoOf(ShortIterator).next_20eer_k$ = function () {
    return this.nextShort_jxwabt_k$();
  };
  function BooleanIterator() {
  }
  protoOf(BooleanIterator).next_20eer_k$ = function () {
    return this.nextBoolean_nfdk1h_k$();
  };
  function Sequence() {
  }
  function compareBy(selector) {
    var tmp = compareBy$lambda(selector);
    return new sam$kotlin_Comparator$0_2(tmp);
  }
  function compareValuesBy(a, b, selector) {
    return compareValues(selector(a), selector(b));
  }
  function compareValues(a, b) {
    if (a === b)
      return 0;
    if (a == null)
      return -1;
    if (b == null)
      return 1;
    return compareTo_0((!(a == null) ? isComparable(a) : false) ? a : THROW_CCE(), b);
  }
  function sam$kotlin_Comparator$0_2(function_0) {
    this.function_1 = function_0;
  }
  protoOf(sam$kotlin_Comparator$0_2).compare_bczr_k$ = function (a, b) {
    return this.function_1(a, b);
  };
  protoOf(sam$kotlin_Comparator$0_2).compare = function (a, b) {
    return this.compare_bczr_k$(a, b);
  };
  function compareBy$lambda($selector) {
    return function (a, b) {
      // Inline function 'kotlin.comparisons.compareValuesBy' call
      return compareValues($selector(a), $selector(b));
    };
  }
  function contract(builder) {
  }
  function ContractBuilder() {
  }
  var InvocationKind_AT_MOST_ONCE_instance;
  var InvocationKind_AT_LEAST_ONCE_instance;
  var InvocationKind_EXACTLY_ONCE_instance;
  var InvocationKind_UNKNOWN_instance;
  function values_3() {
    return [InvocationKind_AT_MOST_ONCE_getInstance(), InvocationKind_AT_LEAST_ONCE_getInstance(), InvocationKind_EXACTLY_ONCE_getInstance(), InvocationKind_UNKNOWN_getInstance()];
  }
  function valueOf_3(value) {
    switch (value) {
      case 'AT_MOST_ONCE':
        return InvocationKind_AT_MOST_ONCE_getInstance();
      case 'AT_LEAST_ONCE':
        return InvocationKind_AT_LEAST_ONCE_getInstance();
      case 'EXACTLY_ONCE':
        return InvocationKind_EXACTLY_ONCE_getInstance();
      case 'UNKNOWN':
        return InvocationKind_UNKNOWN_getInstance();
      default:
        InvocationKind_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_3() {
    if ($ENTRIES_3 == null)
      $ENTRIES_3 = enumEntries(values_3());
    return $ENTRIES_3;
  }
  var InvocationKind_entriesInitialized;
  function InvocationKind_initEntries() {
    if (InvocationKind_entriesInitialized)
      return Unit_getInstance();
    InvocationKind_entriesInitialized = true;
    InvocationKind_AT_MOST_ONCE_instance = new InvocationKind('AT_MOST_ONCE', 0);
    InvocationKind_AT_LEAST_ONCE_instance = new InvocationKind('AT_LEAST_ONCE', 1);
    InvocationKind_EXACTLY_ONCE_instance = new InvocationKind('EXACTLY_ONCE', 2);
    InvocationKind_UNKNOWN_instance = new InvocationKind('UNKNOWN', 3);
  }
  var $ENTRIES_3;
  function InvocationKind(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function ExperimentalContracts() {
  }
  protoOf(ExperimentalContracts).equals = function (other) {
    if (!(other instanceof ExperimentalContracts))
      return false;
    other instanceof ExperimentalContracts || THROW_CCE();
    return true;
  };
  protoOf(ExperimentalContracts).hashCode = function () {
    return 0;
  };
  protoOf(ExperimentalContracts).toString = function () {
    return '@kotlin.contracts.ExperimentalContracts()';
  };
  function InvocationKind_AT_MOST_ONCE_getInstance() {
    InvocationKind_initEntries();
    return InvocationKind_AT_MOST_ONCE_instance;
  }
  function InvocationKind_AT_LEAST_ONCE_getInstance() {
    InvocationKind_initEntries();
    return InvocationKind_AT_LEAST_ONCE_instance;
  }
  function InvocationKind_EXACTLY_ONCE_getInstance() {
    InvocationKind_initEntries();
    return InvocationKind_EXACTLY_ONCE_instance;
  }
  function InvocationKind_UNKNOWN_getInstance() {
    InvocationKind_initEntries();
    return InvocationKind_UNKNOWN_instance;
  }
  function ConditionalEffect() {
  }
  function Returns() {
  }
  function CallsInPlace() {
  }
  function ReturnsNotNull() {
  }
  function Effect() {
  }
  function SimpleEffect() {
  }
  function Continuation() {
  }
  function Continuation_0(context, resumeWith) {
    return new _no_name_provided__qut3iv_0(context, resumeWith);
  }
  function resumeWithException(_this__u8e3s4, exception) {
    // Inline function 'kotlin.Companion.failure' call
    Companion_getInstance_15();
    var tmp$ret$0 = _Result___init__impl__xyqfz8(createFailure(exception));
    return _this__u8e3s4.resumeWith_dtxwbr_k$(tmp$ret$0);
  }
  function resume(_this__u8e3s4, value) {
    // Inline function 'kotlin.Companion.success' call
    Companion_getInstance_15();
    var tmp$ret$0 = _Result___init__impl__xyqfz8(value);
    return _this__u8e3s4.resumeWith_dtxwbr_k$(tmp$ret$0);
  }
  function get_coroutineContext() {
    throw new NotImplementedError('Implemented as intrinsic');
  }
  function _no_name_provided__qut3iv_0($context, $resumeWith) {
    this.$context_1 = $context;
    this.$resumeWith_1 = $resumeWith;
  }
  protoOf(_no_name_provided__qut3iv_0).get_context_h02k06_k$ = function () {
    return this.$context_1;
  };
  protoOf(_no_name_provided__qut3iv_0).resumeWith_dtxwbr_k$ = function (result) {
    return this.$resumeWith_1(new Result(result));
  };
  function Key() {
    Key_instance = this;
  }
  var Key_instance;
  function Key_getInstance() {
    if (Key_instance == null)
      new Key();
    return Key_instance;
  }
  function ContinuationInterceptor() {
  }
  function Key_0() {
  }
  function Element() {
  }
  function CoroutineContext$plus$lambda(acc, element) {
    var removed = acc.minusKey_9i5ggf_k$(element.get_key_18j28a_k$());
    var tmp;
    if (removed === EmptyCoroutineContext_getInstance()) {
      tmp = element;
    } else {
      var interceptor = removed.get_y2st91_k$(Key_getInstance());
      var tmp_0;
      if (interceptor == null) {
        tmp_0 = new CombinedContext(removed, element);
      } else {
        var left = removed.minusKey_9i5ggf_k$(Key_getInstance());
        tmp_0 = left === EmptyCoroutineContext_getInstance() ? new CombinedContext(element, interceptor) : new CombinedContext(new CombinedContext(left, element), interceptor);
      }
      tmp = tmp_0;
    }
    return tmp;
  }
  function CoroutineContext() {
  }
  function _get_serialVersionUID__fhggm9_0($this) {
    return $this.serialVersionUID_1;
  }
  function readResolve_0($this) {
    return EmptyCoroutineContext_getInstance();
  }
  function EmptyCoroutineContext() {
    EmptyCoroutineContext_instance = this;
    this.serialVersionUID_1 = new Long(0, 0);
  }
  protoOf(EmptyCoroutineContext).get_y2st91_k$ = function (key) {
    return null;
  };
  protoOf(EmptyCoroutineContext).fold_j2vaxd_k$ = function (initial, operation) {
    return initial;
  };
  protoOf(EmptyCoroutineContext).plus_s13ygv_k$ = function (context) {
    return context;
  };
  protoOf(EmptyCoroutineContext).minusKey_9i5ggf_k$ = function (key) {
    return this;
  };
  protoOf(EmptyCoroutineContext).hashCode = function () {
    return 0;
  };
  protoOf(EmptyCoroutineContext).toString = function () {
    return 'EmptyCoroutineContext';
  };
  var EmptyCoroutineContext_instance;
  function EmptyCoroutineContext_getInstance() {
    if (EmptyCoroutineContext_instance == null)
      new EmptyCoroutineContext();
    return EmptyCoroutineContext_instance;
  }
  function _get_serialVersionUID__fhggm9_1($this) {
    return $this.serialVersionUID_1;
  }
  function Companion_7() {
    Companion_instance_7 = this;
    this.serialVersionUID_1 = new Long(0, 0);
  }
  var Companion_instance_7;
  function Companion_getInstance_7() {
    if (Companion_instance_7 == null)
      new Companion_7();
    return Companion_instance_7;
  }
  function readResolve_1($this) {
    // Inline function 'kotlin.collections.fold' call
    var this_0 = $this.elements_1;
    var accumulator = EmptyCoroutineContext_getInstance();
    var inductionVariable = 0;
    var last = this_0.length;
    while (inductionVariable < last) {
      var element = this_0[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      accumulator = accumulator.plus_s13ygv_k$(element);
    }
    return accumulator;
  }
  function _get_left__d9qyp0($this) {
    return $this.left_1;
  }
  function _get_element__z0t21h($this) {
    return $this.element_1;
  }
  function size($this) {
    var cur = $this;
    var size = 2;
    while (true) {
      var tmp = cur.left_1;
      var tmp0_elvis_lhs = tmp instanceof CombinedContext ? tmp : null;
      var tmp_0;
      if (tmp0_elvis_lhs == null) {
        return size;
      } else {
        tmp_0 = tmp0_elvis_lhs;
      }
      cur = tmp_0;
      size = size + 1 | 0;
    }
  }
  function contains_6($this, element) {
    return equals($this.get_y2st91_k$(element.get_key_18j28a_k$()), element);
  }
  function containsAll_0($this, context) {
    var cur = context;
    while (true) {
      if (!contains_6($this, cur.element_1))
        return false;
      var next = cur.left_1;
      if (next instanceof CombinedContext) {
        cur = next;
      } else {
        return contains_6($this, isInterface(next, Element) ? next : THROW_CCE());
      }
    }
  }
  function writeReplace($this) {
    var n = size($this);
    // Inline function 'kotlin.arrayOfNulls' call
    var elements = fillArrayVal(Array(n), null);
    var index = {_v: 0};
    $this.fold_j2vaxd_k$(Unit_getInstance(), CombinedContext$writeReplace$lambda(elements, index));
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(index._v === n)) {
      // Inline function 'kotlin.check.<anonymous>' call
      var message = 'Check failed.';
      throw IllegalStateException_init_$Create$_0(toString_2(message));
    }
    return new Serialized(isArray(elements) ? elements : THROW_CCE());
  }
  function Serialized(elements) {
    Companion_getInstance_7();
    this.elements_1 = elements;
  }
  protoOf(Serialized).get_elements_vxwh8g_k$ = function () {
    return this.elements_1;
  };
  function CombinedContext$toString$lambda(acc, element) {
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(acc) === 0) {
      tmp = toString_2(element);
    } else {
      tmp = acc + ', ' + element;
    }
    return tmp;
  }
  function CombinedContext$writeReplace$lambda($elements, $index) {
    return function (_anonymous_parameter_0__qggqh8, element) {
      var tmp0 = $index._v;
      $index._v = tmp0 + 1 | 0;
      $elements[tmp0] = element;
      return Unit_getInstance();
    };
  }
  function CombinedContext(left, element) {
    this.left_1 = left;
    this.element_1 = element;
  }
  protoOf(CombinedContext).get_y2st91_k$ = function (key) {
    var cur = this;
    while (true) {
      var tmp0_safe_receiver = cur.element_1.get_y2st91_k$(key);
      if (tmp0_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        return tmp0_safe_receiver;
      }
      var next = cur.left_1;
      if (next instanceof CombinedContext) {
        cur = next;
      } else {
        return next.get_y2st91_k$(key);
      }
    }
  };
  protoOf(CombinedContext).fold_j2vaxd_k$ = function (initial, operation) {
    return operation(this.left_1.fold_j2vaxd_k$(initial, operation), this.element_1);
  };
  protoOf(CombinedContext).minusKey_9i5ggf_k$ = function (key) {
    if (this.element_1.get_y2st91_k$(key) == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      return this.left_1;
    }
    var newLeft = this.left_1.minusKey_9i5ggf_k$(key);
    return newLeft === this.left_1 ? this : newLeft === EmptyCoroutineContext_getInstance() ? this.element_1 : new CombinedContext(newLeft, this.element_1);
  };
  protoOf(CombinedContext).equals = function (other) {
    var tmp;
    if (this === other) {
      tmp = true;
    } else {
      var tmp_0;
      var tmp_1;
      if (other instanceof CombinedContext) {
        tmp_1 = size(other) === size(this);
      } else {
        tmp_1 = false;
      }
      if (tmp_1) {
        tmp_0 = containsAll_0(other, this);
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(CombinedContext).hashCode = function () {
    return hashCode(this.left_1) + hashCode(this.element_1) | 0;
  };
  protoOf(CombinedContext).toString = function () {
    return '[' + this.fold_j2vaxd_k$('', CombinedContext$toString$lambda) + ']';
  };
  function _get_safeCast__5d4zbz($this) {
    return $this.safeCast_1;
  }
  function _get_topmostKey__fyvvjw($this) {
    return $this.topmostKey_1;
  }
  function AbstractCoroutineContextKey(baseKey, safeCast) {
    this.safeCast_1 = safeCast;
    var tmp = this;
    var tmp_0;
    if (baseKey instanceof AbstractCoroutineContextKey) {
      tmp_0 = baseKey.topmostKey_1;
    } else {
      tmp_0 = baseKey;
    }
    tmp.topmostKey_1 = tmp_0;
  }
  protoOf(AbstractCoroutineContextKey).tryCast_mbga6n_k$ = function (element) {
    return this.safeCast_1(element);
  };
  protoOf(AbstractCoroutineContextKey).isSubKey_4za1qh_k$ = function (key) {
    return key === this ? true : this.topmostKey_1 === key;
  };
  function get_COROUTINE_SUSPENDED() {
    return CoroutineSingletons_COROUTINE_SUSPENDED_getInstance();
  }
  var CoroutineSingletons_COROUTINE_SUSPENDED_instance;
  var CoroutineSingletons_UNDECIDED_instance;
  var CoroutineSingletons_RESUMED_instance;
  function values_4() {
    return [CoroutineSingletons_COROUTINE_SUSPENDED_getInstance(), CoroutineSingletons_UNDECIDED_getInstance(), CoroutineSingletons_RESUMED_getInstance()];
  }
  function valueOf_4(value) {
    switch (value) {
      case 'COROUTINE_SUSPENDED':
        return CoroutineSingletons_COROUTINE_SUSPENDED_getInstance();
      case 'UNDECIDED':
        return CoroutineSingletons_UNDECIDED_getInstance();
      case 'RESUMED':
        return CoroutineSingletons_RESUMED_getInstance();
      default:
        CoroutineSingletons_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_4() {
    if ($ENTRIES_4 == null)
      $ENTRIES_4 = enumEntries(values_4());
    return $ENTRIES_4;
  }
  var CoroutineSingletons_entriesInitialized;
  function CoroutineSingletons_initEntries() {
    if (CoroutineSingletons_entriesInitialized)
      return Unit_getInstance();
    CoroutineSingletons_entriesInitialized = true;
    CoroutineSingletons_COROUTINE_SUSPENDED_instance = new CoroutineSingletons('COROUTINE_SUSPENDED', 0);
    CoroutineSingletons_UNDECIDED_instance = new CoroutineSingletons('UNDECIDED', 1);
    CoroutineSingletons_RESUMED_instance = new CoroutineSingletons('RESUMED', 2);
  }
  var $ENTRIES_4;
  function CoroutineSingletons(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function CoroutineSingletons_COROUTINE_SUSPENDED_getInstance() {
    CoroutineSingletons_initEntries();
    return CoroutineSingletons_COROUTINE_SUSPENDED_instance;
  }
  function CoroutineSingletons_UNDECIDED_getInstance() {
    CoroutineSingletons_initEntries();
    return CoroutineSingletons_UNDECIDED_instance;
  }
  function CoroutineSingletons_RESUMED_getInstance() {
    CoroutineSingletons_initEntries();
    return CoroutineSingletons_RESUMED_instance;
  }
  function EnumEntries() {
  }
  function enumEntries(entries) {
    return new EnumEntriesList(entries);
  }
  function _get_entries__iz8n5($this) {
    return $this.entries_1;
  }
  function writeReplace_0($this) {
    return new EnumEntriesSerializationProxy($this.entries_1);
  }
  function EnumEntriesList(entries) {
    AbstractList.call(this);
    this.entries_1 = entries;
  }
  protoOf(EnumEntriesList).get_size_woubt6_k$ = function () {
    return this.entries_1.length;
  };
  protoOf(EnumEntriesList).get_c1px32_k$ = function (index) {
    Companion_getInstance_4().checkElementIndex_r3t1bm_k$(index, this.entries_1.length);
    return this.entries_1[index];
  };
  protoOf(EnumEntriesList).contains_qvgeh3_k$ = function (element) {
    if (element === null)
      return false;
    var target = getOrNull(this.entries_1, element.ordinal_1);
    return target === element;
  };
  protoOf(EnumEntriesList).contains_aljjnj_k$ = function (element) {
    if (!(element instanceof Enum))
      return false;
    return this.contains_qvgeh3_k$(element instanceof Enum ? element : THROW_CCE());
  };
  protoOf(EnumEntriesList).indexOf_cbd19f_k$ = function (element) {
    if (element === null)
      return -1;
    var ordinal = element.ordinal_1;
    var target = getOrNull(this.entries_1, ordinal);
    return target === element ? ordinal : -1;
  };
  protoOf(EnumEntriesList).indexOf_si1fv9_k$ = function (element) {
    if (!(element instanceof Enum))
      return -1;
    return this.indexOf_cbd19f_k$(element instanceof Enum ? element : THROW_CCE());
  };
  protoOf(EnumEntriesList).lastIndexOf_q19csz_k$ = function (element) {
    return this.indexOf_cbd19f_k$(element);
  };
  protoOf(EnumEntriesList).lastIndexOf_v2p1fv_k$ = function (element) {
    if (!(element instanceof Enum))
      return -1;
    return this.lastIndexOf_q19csz_k$(element instanceof Enum ? element : THROW_CCE());
  };
  function and(_this__u8e3s4, other) {
    return toShort(_this__u8e3s4 & other);
  }
  function or(_this__u8e3s4, other) {
    return toShort(_this__u8e3s4 | other);
  }
  function xor(_this__u8e3s4, other) {
    return toShort(_this__u8e3s4 ^ other);
  }
  function inv(_this__u8e3s4) {
    return toShort(~_this__u8e3s4);
  }
  function and_0(_this__u8e3s4, other) {
    return toByte(_this__u8e3s4 & other);
  }
  function or_0(_this__u8e3s4, other) {
    return toByte(_this__u8e3s4 | other);
  }
  function xor_0(_this__u8e3s4, other) {
    return toByte(_this__u8e3s4 ^ other);
  }
  function inv_0(_this__u8e3s4) {
    return toByte(~_this__u8e3s4);
  }
  function ExperimentalTypeInference() {
  }
  protoOf(ExperimentalTypeInference).equals = function (other) {
    if (!(other instanceof ExperimentalTypeInference))
      return false;
    other instanceof ExperimentalTypeInference || THROW_CCE();
    return true;
  };
  protoOf(ExperimentalTypeInference).hashCode = function () {
    return 0;
  };
  protoOf(ExperimentalTypeInference).toString = function () {
    return '@kotlin.experimental.ExperimentalTypeInference()';
  };
  function InlineOnly() {
  }
  protoOf(InlineOnly).equals = function (other) {
    if (!(other instanceof InlineOnly))
      return false;
    other instanceof InlineOnly || THROW_CCE();
    return true;
  };
  protoOf(InlineOnly).hashCode = function () {
    return 0;
  };
  protoOf(InlineOnly).toString = function () {
    return '@kotlin.internal.InlineOnly()';
  };
  function LowPriorityInOverloadResolution() {
  }
  protoOf(LowPriorityInOverloadResolution).equals = function (other) {
    if (!(other instanceof LowPriorityInOverloadResolution))
      return false;
    other instanceof LowPriorityInOverloadResolution || THROW_CCE();
    return true;
  };
  protoOf(LowPriorityInOverloadResolution).hashCode = function () {
    return 0;
  };
  protoOf(LowPriorityInOverloadResolution).toString = function () {
    return '@kotlin.internal.LowPriorityInOverloadResolution()';
  };
  function NoInfer() {
  }
  protoOf(NoInfer).equals = function (other) {
    if (!(other instanceof NoInfer))
      return false;
    other instanceof NoInfer || THROW_CCE();
    return true;
  };
  protoOf(NoInfer).hashCode = function () {
    return 0;
  };
  protoOf(NoInfer).toString = function () {
    return '@kotlin.internal.NoInfer()';
  };
  function DynamicExtension() {
  }
  protoOf(DynamicExtension).equals = function (other) {
    if (!(other instanceof DynamicExtension))
      return false;
    other instanceof DynamicExtension || THROW_CCE();
    return true;
  };
  protoOf(DynamicExtension).hashCode = function () {
    return 0;
  };
  protoOf(DynamicExtension).toString = function () {
    return '@kotlin.internal.DynamicExtension()';
  };
  function ContractsDsl() {
  }
  protoOf(ContractsDsl).equals = function (other) {
    if (!(other instanceof ContractsDsl))
      return false;
    other instanceof ContractsDsl || THROW_CCE();
    return true;
  };
  protoOf(ContractsDsl).hashCode = function () {
    return 0;
  };
  protoOf(ContractsDsl).toString = function () {
    return '@kotlin.internal.ContractsDsl()';
  };
  function OnlyInputTypes() {
  }
  protoOf(OnlyInputTypes).equals = function (other) {
    if (!(other instanceof OnlyInputTypes))
      return false;
    other instanceof OnlyInputTypes || THROW_CCE();
    return true;
  };
  protoOf(OnlyInputTypes).hashCode = function () {
    return 0;
  };
  protoOf(OnlyInputTypes).toString = function () {
    return '@kotlin.internal.OnlyInputTypes()';
  };
  function RequireKotlin(version, message, level, versionKind, errorCode) {
    message = message === VOID ? '' : message;
    level = level === VOID ? DeprecationLevel_ERROR_getInstance() : level;
    versionKind = versionKind === VOID ? RequireKotlinVersionKind_LANGUAGE_VERSION_getInstance() : versionKind;
    errorCode = errorCode === VOID ? -1 : errorCode;
    this.version_1 = version;
    this.message_1 = message;
    this.level_1 = level;
    this.versionKind_1 = versionKind;
    this.errorCode_1 = errorCode;
  }
  protoOf(RequireKotlin).get_version_72w4j3_k$ = function () {
    return this.version_1;
  };
  protoOf(RequireKotlin).get_message_h23axq_k$ = function () {
    return this.message_1;
  };
  protoOf(RequireKotlin).get_level_ium7h7_k$ = function () {
    return this.level_1;
  };
  protoOf(RequireKotlin).get_versionKind_pab57n_k$ = function () {
    return this.versionKind_1;
  };
  protoOf(RequireKotlin).get_errorCode_dyf6uk_k$ = function () {
    return this.errorCode_1;
  };
  protoOf(RequireKotlin).equals = function (other) {
    if (!(other instanceof RequireKotlin))
      return false;
    var tmp0_other_with_cast = other instanceof RequireKotlin ? other : THROW_CCE();
    if (!(this.version_1 === tmp0_other_with_cast.version_1))
      return false;
    if (!(this.message_1 === tmp0_other_with_cast.message_1))
      return false;
    if (!this.level_1.equals(tmp0_other_with_cast.level_1))
      return false;
    if (!this.versionKind_1.equals(tmp0_other_with_cast.versionKind_1))
      return false;
    if (!(this.errorCode_1 === tmp0_other_with_cast.errorCode_1))
      return false;
    return true;
  };
  protoOf(RequireKotlin).hashCode = function () {
    var result = imul(getStringHashCode('version'), 127) ^ getStringHashCode(this.version_1);
    result = result + (imul(getStringHashCode('message'), 127) ^ getStringHashCode(this.message_1)) | 0;
    result = result + (imul(getStringHashCode('level'), 127) ^ this.level_1.hashCode()) | 0;
    result = result + (imul(getStringHashCode('versionKind'), 127) ^ this.versionKind_1.hashCode()) | 0;
    result = result + (imul(getStringHashCode('errorCode'), 127) ^ this.errorCode_1) | 0;
    return result;
  };
  protoOf(RequireKotlin).toString = function () {
    return '@kotlin.internal.RequireKotlin(version=' + this.version_1 + ', message=' + this.message_1 + ', level=' + this.level_1 + ', versionKind=' + this.versionKind_1 + ', errorCode=' + this.errorCode_1 + ')';
  };
  var RequireKotlinVersionKind_LANGUAGE_VERSION_instance;
  var RequireKotlinVersionKind_COMPILER_VERSION_instance;
  var RequireKotlinVersionKind_API_VERSION_instance;
  function values_5() {
    return [RequireKotlinVersionKind_LANGUAGE_VERSION_getInstance(), RequireKotlinVersionKind_COMPILER_VERSION_getInstance(), RequireKotlinVersionKind_API_VERSION_getInstance()];
  }
  function valueOf_5(value) {
    switch (value) {
      case 'LANGUAGE_VERSION':
        return RequireKotlinVersionKind_LANGUAGE_VERSION_getInstance();
      case 'COMPILER_VERSION':
        return RequireKotlinVersionKind_COMPILER_VERSION_getInstance();
      case 'API_VERSION':
        return RequireKotlinVersionKind_API_VERSION_getInstance();
      default:
        RequireKotlinVersionKind_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_5() {
    if ($ENTRIES_5 == null)
      $ENTRIES_5 = enumEntries(values_5());
    return $ENTRIES_5;
  }
  var RequireKotlinVersionKind_entriesInitialized;
  function RequireKotlinVersionKind_initEntries() {
    if (RequireKotlinVersionKind_entriesInitialized)
      return Unit_getInstance();
    RequireKotlinVersionKind_entriesInitialized = true;
    RequireKotlinVersionKind_LANGUAGE_VERSION_instance = new RequireKotlinVersionKind('LANGUAGE_VERSION', 0);
    RequireKotlinVersionKind_COMPILER_VERSION_instance = new RequireKotlinVersionKind('COMPILER_VERSION', 1);
    RequireKotlinVersionKind_API_VERSION_instance = new RequireKotlinVersionKind('API_VERSION', 2);
  }
  var $ENTRIES_5;
  function RequireKotlinVersionKind(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function HidesMembers() {
  }
  protoOf(HidesMembers).equals = function (other) {
    if (!(other instanceof HidesMembers))
      return false;
    other instanceof HidesMembers || THROW_CCE();
    return true;
  };
  protoOf(HidesMembers).hashCode = function () {
    return 0;
  };
  protoOf(HidesMembers).toString = function () {
    return '@kotlin.internal.HidesMembers()';
  };
  function RequireKotlinVersionKind_LANGUAGE_VERSION_getInstance() {
    RequireKotlinVersionKind_initEntries();
    return RequireKotlinVersionKind_LANGUAGE_VERSION_instance;
  }
  function RequireKotlinVersionKind_COMPILER_VERSION_getInstance() {
    RequireKotlinVersionKind_initEntries();
    return RequireKotlinVersionKind_COMPILER_VERSION_instance;
  }
  function RequireKotlinVersionKind_API_VERSION_getInstance() {
    RequireKotlinVersionKind_initEntries();
    return RequireKotlinVersionKind_API_VERSION_instance;
  }
  function getProgressionLastElement(start, end, step) {
    var tmp;
    if (step > 0) {
      tmp = start >= end ? end : end - differenceModulo(end, start, step) | 0;
    } else if (step < 0) {
      tmp = start <= end ? end : end + differenceModulo(start, end, -step | 0) | 0;
    } else {
      throw IllegalArgumentException_init_$Create$_0('Step is zero.');
    }
    return tmp;
  }
  function getProgressionLastElement_0(start, end, step) {
    var tmp;
    if (step.compareTo_9jj042_k$(new Long(0, 0)) > 0) {
      tmp = start.compareTo_9jj042_k$(end) >= 0 ? end : end.minus_mfbszm_k$(differenceModulo_0(end, start, step));
    } else if (step.compareTo_9jj042_k$(new Long(0, 0)) < 0) {
      tmp = start.compareTo_9jj042_k$(end) <= 0 ? end : end.plus_r93sks_k$(differenceModulo_0(start, end, step.unaryMinus_6uz0qp_k$()));
    } else {
      throw IllegalArgumentException_init_$Create$_0('Step is zero.');
    }
    return tmp;
  }
  function differenceModulo(a, b, c) {
    return mod(mod(a, c) - mod(b, c) | 0, c);
  }
  function differenceModulo_0(a, b, c) {
    return mod_0(mod_0(a, c).minus_mfbszm_k$(mod_0(b, c)), c);
  }
  function mod(a, b) {
    var mod = a % b | 0;
    return mod >= 0 ? mod : mod + b | 0;
  }
  function mod_0(a, b) {
    var mod = a.rem_bsnl9o_k$(b);
    return mod.compareTo_9jj042_k$(new Long(0, 0)) >= 0 ? mod : mod.plus_r93sks_k$(b);
  }
  function get_base64EncodeMap() {
    _init_properties_Base64_kt__ymmsz3();
    return base64EncodeMap;
  }
  var base64EncodeMap;
  function get_base64DecodeMap() {
    _init_properties_Base64_kt__ymmsz3();
    return base64DecodeMap;
  }
  var base64DecodeMap;
  function get_base64UrlEncodeMap() {
    _init_properties_Base64_kt__ymmsz3();
    return base64UrlEncodeMap;
  }
  var base64UrlEncodeMap;
  function get_base64UrlDecodeMap() {
    _init_properties_Base64_kt__ymmsz3();
    return base64UrlDecodeMap;
  }
  var base64UrlDecodeMap;
  function _get_bitsPerByte__dvba0e($this) {
    return $this.bitsPerByte_1;
  }
  function _get_bitsPerSymbol__9sgpa6($this) {
    return $this.bitsPerSymbol_1;
  }
  function _get_mimeGroupsPerLine__le1g54($this) {
    return $this.mimeGroupsPerLine_1;
  }
  function encodeSize($this, sourceSize) {
    var groups = ((sourceSize + 3 | 0) - 1 | 0) / 3 | 0;
    var lineSeparators = $this.isMimeScheme_1 ? (groups - 1 | 0) / 19 | 0 : 0;
    var size = imul(groups, 4) + imul(lineSeparators, 2) | 0;
    if (size < 0) {
      throw IllegalArgumentException_init_$Create$_0('Input is too big');
    }
    return size;
  }
  function decodeImpl($this, source, destination, destinationOffset, startIndex, endIndex) {
    var decodeMap = $this.isUrlSafe_1 ? get_base64UrlDecodeMap() : get_base64DecodeMap();
    var payload = 0;
    var byteStart = -8;
    var sourceIndex = startIndex;
    var destinationIndex = destinationOffset;
    $l$loop_1: while (sourceIndex < endIndex) {
      if (byteStart === -8 ? (sourceIndex + 3 | 0) < endIndex : false) {
        var tmp0 = sourceIndex;
        sourceIndex = tmp0 + 1 | 0;
        var symbol1 = decodeMap[source[tmp0] & 255];
        var tmp1 = sourceIndex;
        sourceIndex = tmp1 + 1 | 0;
        var symbol2 = decodeMap[source[tmp1] & 255];
        var tmp2 = sourceIndex;
        sourceIndex = tmp2 + 1 | 0;
        var symbol3 = decodeMap[source[tmp2] & 255];
        var tmp3 = sourceIndex;
        sourceIndex = tmp3 + 1 | 0;
        var symbol4 = decodeMap[source[tmp3] & 255];
        var bits = symbol1 << 18 | symbol2 << 12 | symbol3 << 6 | symbol4;
        if (bits >= 0) {
          var tmp4 = destinationIndex;
          destinationIndex = tmp4 + 1 | 0;
          destination[tmp4] = toByte(bits >> 16);
          var tmp5 = destinationIndex;
          destinationIndex = tmp5 + 1 | 0;
          destination[tmp5] = toByte(bits >> 8);
          var tmp6 = destinationIndex;
          destinationIndex = tmp6 + 1 | 0;
          destination[tmp6] = toByte(bits);
          continue $l$loop_1;
        }
        sourceIndex = sourceIndex - 4 | 0;
      }
      var symbol = source[sourceIndex] & 255;
      var symbolBits = decodeMap[symbol];
      if (symbolBits < 0) {
        if (symbolBits === -2) {
          sourceIndex = handlePaddingSymbol($this, source, sourceIndex, endIndex, byteStart);
          break $l$loop_1;
        } else if ($this.isMimeScheme_1) {
          sourceIndex = sourceIndex + 1 | 0;
          continue $l$loop_1;
        } else {
          throw IllegalArgumentException_init_$Create$_0("Invalid symbol '" + toString_0(numberToChar(symbol)) + "'(" + toString(symbol, 8) + ') at index ' + sourceIndex);
        }
      } else {
        sourceIndex = sourceIndex + 1 | 0;
      }
      payload = payload << 6 | symbolBits;
      byteStart = byteStart + 6 | 0;
      if (byteStart >= 0) {
        var tmp7 = destinationIndex;
        destinationIndex = tmp7 + 1 | 0;
        destination[tmp7] = toByte(payload >>> byteStart | 0);
        payload = payload & ((1 << byteStart) - 1 | 0);
        byteStart = byteStart - 8 | 0;
      }
    }
    if (byteStart === -2) {
      throw IllegalArgumentException_init_$Create$_0('The last unit of input does not have enough bits');
    }
    sourceIndex = skipIllegalSymbolsIfMime($this, source, sourceIndex, endIndex);
    if (sourceIndex < endIndex) {
      var symbol_0 = source[sourceIndex] & 255;
      throw IllegalArgumentException_init_$Create$_0("Symbol '" + toString_0(numberToChar(symbol_0)) + "'(" + toString(symbol_0, 8) + ') at index ' + (sourceIndex - 1 | 0) + ' is prohibited after the pad character');
    }
    return destinationIndex - destinationOffset | 0;
  }
  function decodeSize($this, source, startIndex, endIndex) {
    var symbols = endIndex - startIndex | 0;
    if (symbols === 0) {
      return 0;
    }
    if (symbols === 1) {
      throw IllegalArgumentException_init_$Create$_0('Input should have at list 2 symbols for Base64 decoding, startIndex: ' + startIndex + ', endIndex: ' + endIndex);
    }
    if ($this.isMimeScheme_1) {
      var inductionVariable = startIndex;
      if (inductionVariable < endIndex)
        $l$loop: do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var symbol = source[index] & 255;
          var symbolBits = get_base64DecodeMap()[symbol];
          if (symbolBits < 0) {
            if (symbolBits === -2) {
              symbols = symbols - (endIndex - index | 0) | 0;
              break $l$loop;
            }
            symbols = symbols - 1 | 0;
          }
        }
         while (inductionVariable < endIndex);
    } else if (source[endIndex - 1 | 0] === 61) {
      symbols = symbols - 1 | 0;
      if (source[endIndex - 2 | 0] === 61) {
        symbols = symbols - 1 | 0;
      }
    }
    // Inline function 'kotlin.Long.div' call
    // Inline function 'kotlin.Long.times' call
    return toLong(symbols).times_nfzjiw_k$(toLong(6)).div_jun7gj_k$(toLong(8)).toInt_1tsl84_k$();
  }
  function handlePaddingSymbol($this, source, padIndex, endIndex, byteStart) {
    var tmp;
    switch (byteStart) {
      case -8:
        throw IllegalArgumentException_init_$Create$_0('Redundant pad character at index ' + padIndex);
      case -2:
        tmp = padIndex + 1 | 0;
        break;
      case -4:
        var secondPadIndex = skipIllegalSymbolsIfMime($this, source, padIndex + 1 | 0, endIndex);
        if (secondPadIndex === endIndex ? true : !(source[secondPadIndex] === 61)) {
          throw IllegalArgumentException_init_$Create$_0('Missing one pad character at index ' + secondPadIndex);
        }

        tmp = secondPadIndex + 1 | 0;
        break;
      case -6:
        tmp = padIndex + 1 | 0;
        break;
      default:
        var message = 'Unreachable';
        throw IllegalStateException_init_$Create$_0(toString_2(message));
    }
    return tmp;
  }
  function skipIllegalSymbolsIfMime($this, source, startIndex, endIndex) {
    if (!$this.isMimeScheme_1) {
      return startIndex;
    }
    var sourceIndex = startIndex;
    while (sourceIndex < endIndex) {
      var symbol = source[sourceIndex] & 255;
      if (!(get_base64DecodeMap()[symbol] === -1)) {
        return sourceIndex;
      }
      sourceIndex = sourceIndex + 1 | 0;
    }
    return sourceIndex;
  }
  function checkDestinationBounds($this, destinationSize, destinationOffset, capacityNeeded) {
    if (destinationOffset < 0 ? true : destinationOffset > destinationSize) {
      throw IndexOutOfBoundsException_init_$Create$_0('destination offset: ' + destinationOffset + ', destination size: ' + destinationSize);
    }
    var destinationEndIndex = destinationOffset + capacityNeeded | 0;
    if (destinationEndIndex < 0 ? true : destinationEndIndex > destinationSize) {
      throw IndexOutOfBoundsException_init_$Create$_0('The destination array does not have enough capacity, ' + ('destination offset: ' + destinationOffset + ', destination size: ' + destinationSize + ', capacity needed: ' + capacityNeeded));
    }
  }
  function Default() {
    Default_instance = this;
    Base64.call(this, false, false);
    this.bitsPerByte_1 = 8;
    this.bitsPerSymbol_1 = 6;
    this.bytesPerGroup_1 = 3;
    this.symbolsPerGroup_1 = 4;
    this.padSymbol_1 = 61;
    this.mimeLineLength_1 = 76;
    this.mimeGroupsPerLine_1 = 19;
    var tmp = this;
    // Inline function 'kotlin.byteArrayOf' call
    tmp.mimeLineSeparatorSymbols_1 = new Int8Array([13, 10]);
    this.UrlSafe_1 = new Base64(true, false);
    this.Mime_1 = new Base64(false, true);
  }
  protoOf(Default).get_bytesPerGroup_ye0ds4_k$ = function () {
    return this.bytesPerGroup_1;
  };
  protoOf(Default).get_symbolsPerGroup_yn8p70_k$ = function () {
    return this.symbolsPerGroup_1;
  };
  protoOf(Default).get_padSymbol_t12m5a_k$ = function () {
    return this.padSymbol_1;
  };
  protoOf(Default).get_mimeLineLength_a7r3c9_k$ = function () {
    return this.mimeLineLength_1;
  };
  protoOf(Default).get_mimeLineSeparatorSymbols_qujr15_k$ = function () {
    return this.mimeLineSeparatorSymbols_1;
  };
  protoOf(Default).get_UrlSafe_pzautv_k$ = function () {
    return this.UrlSafe_1;
  };
  protoOf(Default).get_Mime_wo61zx_k$ = function () {
    return this.Mime_1;
  };
  var Default_instance;
  function Default_getInstance() {
    if (Default_instance == null)
      new Default();
    return Default_instance;
  }
  function Base64(isUrlSafe, isMimeScheme) {
    Default_getInstance();
    this.isUrlSafe_1 = isUrlSafe;
    this.isMimeScheme_1 = isMimeScheme;
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(!this.isUrlSafe_1 ? true : !this.isMimeScheme_1)) {
      // Inline function 'kotlin.require.<anonymous>' call
      var message = 'Failed requirement.';
      throw IllegalArgumentException_init_$Create$_0(toString_2(message));
    }
  }
  protoOf(Base64).get_isUrlSafe_3w08t3_k$ = function () {
    return this.isUrlSafe_1;
  };
  protoOf(Base64).get_isMimeScheme_50xsek_k$ = function () {
    return this.isMimeScheme_1;
  };
  protoOf(Base64).encodeToByteArray_yar674_k$ = function (source, startIndex, endIndex) {
    // Inline function 'kotlin.io.encoding.platformEncodeToByteArray' call
    return this.encodeToByteArrayImpl_ebqasg_k$(source, startIndex, endIndex);
  };
  protoOf(Base64).encodeToByteArray$default_aer9q8_k$ = function (source, startIndex, endIndex, $super) {
    startIndex = startIndex === VOID ? 0 : startIndex;
    endIndex = endIndex === VOID ? source.length : endIndex;
    return $super === VOID ? this.encodeToByteArray_yar674_k$(source, startIndex, endIndex) : $super.encodeToByteArray_yar674_k$.call(this, source, startIndex, endIndex);
  };
  protoOf(Base64).encodeIntoByteArray_f2dbr7_k$ = function (source, destination, destinationOffset, startIndex, endIndex) {
    // Inline function 'kotlin.io.encoding.platformEncodeIntoByteArray' call
    return this.encodeIntoByteArrayImpl_lkr6v7_k$(source, destination, destinationOffset, startIndex, endIndex);
  };
  protoOf(Base64).encodeIntoByteArray$default_kjqqde_k$ = function (source, destination, destinationOffset, startIndex, endIndex, $super) {
    destinationOffset = destinationOffset === VOID ? 0 : destinationOffset;
    startIndex = startIndex === VOID ? 0 : startIndex;
    endIndex = endIndex === VOID ? source.length : endIndex;
    return $super === VOID ? this.encodeIntoByteArray_f2dbr7_k$(source, destination, destinationOffset, startIndex, endIndex) : $super.encodeIntoByteArray_f2dbr7_k$.call(this, source, destination, destinationOffset, startIndex, endIndex);
  };
  protoOf(Base64).encode_hqs3g6_k$ = function (source, startIndex, endIndex) {
    // Inline function 'kotlin.io.encoding.platformEncodeToString' call
    var byteResult = this.encodeToByteArrayImpl_ebqasg_k$(source, startIndex, endIndex);
    return this.bytesToStringImpl_fo2bjd_k$(byteResult);
  };
  protoOf(Base64).encode$default_h4nonq_k$ = function (source, startIndex, endIndex, $super) {
    startIndex = startIndex === VOID ? 0 : startIndex;
    endIndex = endIndex === VOID ? source.length : endIndex;
    return $super === VOID ? this.encode_hqs3g6_k$(source, startIndex, endIndex) : $super.encode_hqs3g6_k$.call(this, source, startIndex, endIndex);
  };
  protoOf(Base64).encodeToAppendable_lcyka2_k$ = function (source, destination, startIndex, endIndex) {
    // Inline function 'kotlin.io.encoding.platformEncodeToString' call
    var byteResult = this.encodeToByteArrayImpl_ebqasg_k$(source, startIndex, endIndex);
    var stringResult = this.bytesToStringImpl_fo2bjd_k$(byteResult);
    destination.append_jgojdo_k$(stringResult);
    return destination;
  };
  protoOf(Base64).encodeToAppendable$default_bxqfu8_k$ = function (source, destination, startIndex, endIndex, $super) {
    startIndex = startIndex === VOID ? 0 : startIndex;
    endIndex = endIndex === VOID ? source.length : endIndex;
    return $super === VOID ? this.encodeToAppendable_lcyka2_k$(source, destination, startIndex, endIndex) : $super.encodeToAppendable_lcyka2_k$.call(this, source, destination, startIndex, endIndex);
  };
  protoOf(Base64).decode_iptc9a_k$ = function (source, startIndex, endIndex) {
    this.checkSourceBounds_lu2b0w_k$(source.length, startIndex, endIndex);
    var decodeSize_0 = decodeSize(this, source, startIndex, endIndex);
    var destination = new Int8Array(decodeSize_0);
    var bytesWritten = decodeImpl(this, source, destination, 0, startIndex, endIndex);
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(bytesWritten === destination.length)) {
      // Inline function 'kotlin.check.<anonymous>' call
      var message = 'Check failed.';
      throw IllegalStateException_init_$Create$_0(toString_2(message));
    }
    return destination;
  };
  protoOf(Base64).decode$default_vlp1n6_k$ = function (source, startIndex, endIndex, $super) {
    startIndex = startIndex === VOID ? 0 : startIndex;
    endIndex = endIndex === VOID ? source.length : endIndex;
    return $super === VOID ? this.decode_iptc9a_k$(source, startIndex, endIndex) : $super.decode_iptc9a_k$.call(this, source, startIndex, endIndex);
  };
  protoOf(Base64).decodeIntoByteArray_aclq1h_k$ = function (source, destination, destinationOffset, startIndex, endIndex) {
    this.checkSourceBounds_lu2b0w_k$(source.length, startIndex, endIndex);
    checkDestinationBounds(this, destination.length, destinationOffset, decodeSize(this, source, startIndex, endIndex));
    return decodeImpl(this, source, destination, destinationOffset, startIndex, endIndex);
  };
  protoOf(Base64).decodeIntoByteArray$default_37hjje_k$ = function (source, destination, destinationOffset, startIndex, endIndex, $super) {
    destinationOffset = destinationOffset === VOID ? 0 : destinationOffset;
    startIndex = startIndex === VOID ? 0 : startIndex;
    endIndex = endIndex === VOID ? source.length : endIndex;
    return $super === VOID ? this.decodeIntoByteArray_aclq1h_k$(source, destination, destinationOffset, startIndex, endIndex) : $super.decodeIntoByteArray_aclq1h_k$.call(this, source, destination, destinationOffset, startIndex, endIndex);
  };
  protoOf(Base64).decode_lt35e9_k$ = function (source, startIndex, endIndex) {
    // Inline function 'kotlin.io.encoding.platformCharsToBytes' call
    var byteSource = this.charsToBytesImpl_xmdp06_k$(source, startIndex, endIndex);
    return this.decode$default_vlp1n6_k$(byteSource);
  };
  protoOf(Base64).decode$default_mne14l_k$ = function (source, startIndex, endIndex, $super) {
    startIndex = startIndex === VOID ? 0 : startIndex;
    endIndex = endIndex === VOID ? charSequenceLength(source) : endIndex;
    return $super === VOID ? this.decode_lt35e9_k$(source, startIndex, endIndex) : $super.decode_lt35e9_k$.call(this, source, startIndex, endIndex);
  };
  protoOf(Base64).decodeIntoByteArray_ad8mn2_k$ = function (source, destination, destinationOffset, startIndex, endIndex) {
    // Inline function 'kotlin.io.encoding.platformCharsToBytes' call
    var byteSource = this.charsToBytesImpl_xmdp06_k$(source, startIndex, endIndex);
    return this.decodeIntoByteArray$default_37hjje_k$(byteSource, destination, destinationOffset);
  };
  protoOf(Base64).decodeIntoByteArray$default_snnwgp_k$ = function (source, destination, destinationOffset, startIndex, endIndex, $super) {
    destinationOffset = destinationOffset === VOID ? 0 : destinationOffset;
    startIndex = startIndex === VOID ? 0 : startIndex;
    endIndex = endIndex === VOID ? charSequenceLength(source) : endIndex;
    return $super === VOID ? this.decodeIntoByteArray_ad8mn2_k$(source, destination, destinationOffset, startIndex, endIndex) : $super.decodeIntoByteArray_ad8mn2_k$.call(this, source, destination, destinationOffset, startIndex, endIndex);
  };
  protoOf(Base64).encodeToByteArrayImpl_ebqasg_k$ = function (source, startIndex, endIndex) {
    this.checkSourceBounds_lu2b0w_k$(source.length, startIndex, endIndex);
    var encodeSize_0 = encodeSize(this, endIndex - startIndex | 0);
    var destination = new Int8Array(encodeSize_0);
    this.encodeIntoByteArrayImpl_lkr6v7_k$(source, destination, 0, startIndex, endIndex);
    return destination;
  };
  protoOf(Base64).encodeIntoByteArrayImpl_lkr6v7_k$ = function (source, destination, destinationOffset, startIndex, endIndex) {
    this.checkSourceBounds_lu2b0w_k$(source.length, startIndex, endIndex);
    checkDestinationBounds(this, destination.length, destinationOffset, encodeSize(this, endIndex - startIndex | 0));
    var encodeMap = this.isUrlSafe_1 ? get_base64UrlEncodeMap() : get_base64EncodeMap();
    var sourceIndex = startIndex;
    var destinationIndex = destinationOffset;
    var groupsPerLine = this.isMimeScheme_1 ? 19 : IntCompanionObject_getInstance().MAX_VALUE;
    while ((sourceIndex + 2 | 0) < endIndex) {
      // Inline function 'kotlin.comparisons.minOf' call
      var a = (endIndex - sourceIndex | 0) / 3 | 0;
      var groups = Math.min(a, groupsPerLine);
      var inductionVariable = 0;
      if (inductionVariable < groups)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var tmp1 = sourceIndex;
          sourceIndex = tmp1 + 1 | 0;
          var byte1 = source[tmp1] & 255;
          var tmp2 = sourceIndex;
          sourceIndex = tmp2 + 1 | 0;
          var byte2 = source[tmp2] & 255;
          var tmp3 = sourceIndex;
          sourceIndex = tmp3 + 1 | 0;
          var byte3 = source[tmp3] & 255;
          var bits = byte1 << 16 | byte2 << 8 | byte3;
          var tmp4 = destinationIndex;
          destinationIndex = tmp4 + 1 | 0;
          destination[tmp4] = encodeMap[bits >>> 18 | 0];
          var tmp5 = destinationIndex;
          destinationIndex = tmp5 + 1 | 0;
          destination[tmp5] = encodeMap[(bits >>> 12 | 0) & 63];
          var tmp6 = destinationIndex;
          destinationIndex = tmp6 + 1 | 0;
          destination[tmp6] = encodeMap[(bits >>> 6 | 0) & 63];
          var tmp7 = destinationIndex;
          destinationIndex = tmp7 + 1 | 0;
          destination[tmp7] = encodeMap[bits & 63];
        }
         while (inductionVariable < groups);
      if (groups === groupsPerLine ? !(sourceIndex === endIndex) : false) {
        var tmp8 = destinationIndex;
        destinationIndex = tmp8 + 1 | 0;
        destination[tmp8] = Default_getInstance().mimeLineSeparatorSymbols_1[0];
        var tmp9 = destinationIndex;
        destinationIndex = tmp9 + 1 | 0;
        destination[tmp9] = Default_getInstance().mimeLineSeparatorSymbols_1[1];
      }
    }
    var tmp10_subject = endIndex - sourceIndex | 0;
    if (tmp10_subject === 1) {
      var tmp11 = sourceIndex;
      sourceIndex = tmp11 + 1 | 0;
      var byte1_0 = source[tmp11] & 255;
      var bits_0 = byte1_0 << 4;
      var tmp12 = destinationIndex;
      destinationIndex = tmp12 + 1 | 0;
      destination[tmp12] = encodeMap[bits_0 >>> 6 | 0];
      var tmp13 = destinationIndex;
      destinationIndex = tmp13 + 1 | 0;
      destination[tmp13] = encodeMap[bits_0 & 63];
      var tmp14 = destinationIndex;
      destinationIndex = tmp14 + 1 | 0;
      destination[tmp14] = 61;
      var tmp15 = destinationIndex;
      destinationIndex = tmp15 + 1 | 0;
      destination[tmp15] = 61;
    } else if (tmp10_subject === 2) {
      var tmp16 = sourceIndex;
      sourceIndex = tmp16 + 1 | 0;
      var byte1_1 = source[tmp16] & 255;
      var tmp17 = sourceIndex;
      sourceIndex = tmp17 + 1 | 0;
      var byte2_0 = source[tmp17] & 255;
      var bits_1 = byte1_1 << 10 | byte2_0 << 2;
      var tmp18 = destinationIndex;
      destinationIndex = tmp18 + 1 | 0;
      destination[tmp18] = encodeMap[bits_1 >>> 12 | 0];
      var tmp19 = destinationIndex;
      destinationIndex = tmp19 + 1 | 0;
      destination[tmp19] = encodeMap[(bits_1 >>> 6 | 0) & 63];
      var tmp20 = destinationIndex;
      destinationIndex = tmp20 + 1 | 0;
      destination[tmp20] = encodeMap[bits_1 & 63];
      var tmp21 = destinationIndex;
      destinationIndex = tmp21 + 1 | 0;
      destination[tmp21] = 61;
    }
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(sourceIndex === endIndex)) {
      // Inline function 'kotlin.check.<anonymous>' call
      var message = 'Check failed.';
      throw IllegalStateException_init_$Create$_0(toString_2(message));
    }
    return destinationIndex - destinationOffset | 0;
  };
  protoOf(Base64).charsToBytesImpl_xmdp06_k$ = function (source, startIndex, endIndex) {
    this.checkSourceBounds_lu2b0w_k$(charSequenceLength(source), startIndex, endIndex);
    var byteArray = new Int8Array(endIndex - startIndex | 0);
    var length = 0;
    var inductionVariable = startIndex;
    if (inductionVariable < endIndex)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.code' call
        var this_0 = charSequenceGet(source, index);
        var symbol = Char__toInt_impl_vasixd(this_0);
        if (symbol <= 255) {
          var tmp1 = length;
          length = tmp1 + 1 | 0;
          byteArray[tmp1] = toByte(symbol);
        } else {
          var tmp2 = length;
          length = tmp2 + 1 | 0;
          byteArray[tmp2] = 63;
        }
      }
       while (inductionVariable < endIndex);
    return byteArray;
  };
  protoOf(Base64).bytesToStringImpl_fo2bjd_k$ = function (source) {
    var stringBuilder = StringBuilder_init_$Create$(source.length);
    var inductionVariable = 0;
    var last = source.length;
    while (inductionVariable < last) {
      var byte = source[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      stringBuilder.append_am5a4z_k$(numberToChar(byte));
    }
    return stringBuilder.toString();
  };
  protoOf(Base64).checkSourceBounds_lu2b0w_k$ = function (sourceSize, startIndex, endIndex) {
    Companion_getInstance_4().checkBoundsIndexes_fu3rwb_k$(startIndex, endIndex, sourceSize);
  };
  var properties_initialized_Base64_kt_5g824v;
  function _init_properties_Base64_kt__ymmsz3() {
    if (!properties_initialized_Base64_kt_5g824v) {
      properties_initialized_Base64_kt_5g824v = true;
      // Inline function 'kotlin.byteArrayOf' call
      base64EncodeMap = new Int8Array([65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47]);
      // Inline function 'kotlin.apply' call
      var this_0 = new Int32Array(256);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlin.io.encoding.base64DecodeMap.<anonymous>' call
      fill(this_0, -1);
      this_0[61] = -2;
      // Inline function 'kotlin.collections.forEachIndexed' call
      var index = 0;
      var indexedObject = get_base64EncodeMap();
      var inductionVariable = 0;
      var last = indexedObject.length;
      while (inductionVariable < last) {
        var item = indexedObject[inductionVariable];
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.io.encoding.base64DecodeMap.<anonymous>.<anonymous>' call
        var tmp1 = index;
        index = tmp1 + 1 | 0;
        this_0[item] = tmp1;
      }
      base64DecodeMap = this_0;
      // Inline function 'kotlin.byteArrayOf' call
      base64UrlEncodeMap = new Int8Array([65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 45, 95]);
      // Inline function 'kotlin.apply' call
      var this_1 = new Int32Array(256);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlin.io.encoding.base64UrlDecodeMap.<anonymous>' call
      fill(this_1, -1);
      this_1[61] = -2;
      // Inline function 'kotlin.collections.forEachIndexed' call
      var index_0 = 0;
      var indexedObject_0 = get_base64UrlEncodeMap();
      var inductionVariable_0 = 0;
      var last_0 = indexedObject_0.length;
      while (inductionVariable_0 < last_0) {
        var item_0 = indexedObject_0[inductionVariable_0];
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        // Inline function 'kotlin.io.encoding.base64UrlDecodeMap.<anonymous>.<anonymous>' call
        var tmp1_0 = index_0;
        index_0 = tmp1_0 + 1 | 0;
        this_1[item_0] = tmp1_0;
      }
      base64UrlDecodeMap = this_1;
    }
  }
  function ExperimentalEncodingApi() {
  }
  protoOf(ExperimentalEncodingApi).equals = function (other) {
    if (!(other instanceof ExperimentalEncodingApi))
      return false;
    other instanceof ExperimentalEncodingApi || THROW_CCE();
    return true;
  };
  protoOf(ExperimentalEncodingApi).hashCode = function () {
    return 0;
  };
  protoOf(ExperimentalEncodingApi).toString = function () {
    return '@kotlin.io.encoding.ExperimentalEncodingApi()';
  };
  function Companion_8() {
    Companion_instance_8 = this;
    this.EMPTY_1 = new IntRange(1, 0);
  }
  protoOf(Companion_8).get_EMPTY_i8q41w_k$ = function () {
    return this.EMPTY_1;
  };
  var Companion_instance_8;
  function Companion_getInstance_8() {
    if (Companion_instance_8 == null)
      new Companion_8();
    return Companion_instance_8;
  }
  function IntRange(start, endInclusive) {
    Companion_getInstance_8();
    IntProgression.call(this, start, endInclusive, 1);
  }
  protoOf(IntRange).get_start_iypx6h_k$ = function () {
    return this.first_1;
  };
  protoOf(IntRange).get_endInclusive_r07xpi_k$ = function () {
    return this.last_1;
  };
  protoOf(IntRange).get_endExclusive_pmwm6k_k$ = function () {
    if (this.last_1 === IntCompanionObject_getInstance().MAX_VALUE) {
      // Inline function 'kotlin.error' call
      var message = 'Cannot return the exclusive upper bound of a range that includes MAX_VALUE.';
      throw IllegalStateException_init_$Create$_0(toString_2(message));
    }
    return this.last_1 + 1 | 0;
  };
  protoOf(IntRange).contains_7q95ev_k$ = function (value) {
    return this.first_1 <= value ? value <= this.last_1 : false;
  };
  protoOf(IntRange).contains_3tkdvy_k$ = function (value) {
    return this.contains_7q95ev_k$(typeof value === 'number' ? value : THROW_CCE());
  };
  protoOf(IntRange).isEmpty_y1axqb_k$ = function () {
    return this.first_1 > this.last_1;
  };
  protoOf(IntRange).equals = function (other) {
    var tmp;
    if (other instanceof IntRange) {
      tmp = (this.isEmpty_y1axqb_k$() ? other.isEmpty_y1axqb_k$() : false) ? true : this.first_1 === other.first_1 ? this.last_1 === other.last_1 : false;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(IntRange).hashCode = function () {
    return this.isEmpty_y1axqb_k$() ? -1 : imul(31, this.first_1) + this.last_1 | 0;
  };
  protoOf(IntRange).toString = function () {
    return '' + this.first_1 + '..' + this.last_1;
  };
  function Companion_9() {
    Companion_instance_9 = this;
    this.EMPTY_1 = new CharRange(_Char___init__impl__6a9atx(1), _Char___init__impl__6a9atx(0));
  }
  protoOf(Companion_9).get_EMPTY_i8q41w_k$ = function () {
    return this.EMPTY_1;
  };
  var Companion_instance_9;
  function Companion_getInstance_9() {
    if (Companion_instance_9 == null)
      new Companion_9();
    return Companion_instance_9;
  }
  function CharRange(start, endInclusive) {
    Companion_getInstance_9();
    CharProgression.call(this, start, endInclusive, 1);
  }
  protoOf(CharRange).get_start_qjli63_k$ = function () {
    return this.first_1;
  };
  protoOf(CharRange).get_start_iypx6h_k$ = function () {
    return new Char(this.get_start_qjli63_k$());
  };
  protoOf(CharRange).get_endInclusive_onwxgk_k$ = function () {
    return this.last_1;
  };
  protoOf(CharRange).get_endInclusive_r07xpi_k$ = function () {
    return new Char(this.get_endInclusive_onwxgk_k$());
  };
  protoOf(CharRange).get_endExclusive_umwd3i_k$ = function () {
    Companion_getInstance_1();
    if (this.last_1 === _Char___init__impl__6a9atx(65535)) {
      // Inline function 'kotlin.error' call
      var message = 'Cannot return the exclusive upper bound of a range that includes MAX_VALUE.';
      throw IllegalStateException_init_$Create$_0(toString_2(message));
    }
    return Char__plus_impl_qi7pgj(this.last_1, 1);
  };
  protoOf(CharRange).get_endExclusive_pmwm6k_k$ = function () {
    return new Char(this.get_endExclusive_umwd3i_k$());
  };
  protoOf(CharRange).contains_q699wu_k$ = function (value) {
    return Char__compareTo_impl_ypi4mb(this.first_1, value) <= 0 ? Char__compareTo_impl_ypi4mb(value, this.last_1) <= 0 : false;
  };
  protoOf(CharRange).contains_3tkdvy_k$ = function (value) {
    return this.contains_q699wu_k$(value instanceof Char ? value.value_1 : THROW_CCE());
  };
  protoOf(CharRange).isEmpty_y1axqb_k$ = function () {
    return Char__compareTo_impl_ypi4mb(this.first_1, this.last_1) > 0;
  };
  protoOf(CharRange).equals = function (other) {
    var tmp;
    if (other instanceof CharRange) {
      tmp = (this.isEmpty_y1axqb_k$() ? other.isEmpty_y1axqb_k$() : false) ? true : this.first_1 === other.first_1 ? this.last_1 === other.last_1 : false;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(CharRange).hashCode = function () {
    var tmp;
    if (this.isEmpty_y1axqb_k$()) {
      tmp = -1;
    } else {
      // Inline function 'kotlin.code' call
      var this_0 = this.first_1;
      var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
      var tmp_0 = imul(31, tmp$ret$0);
      // Inline function 'kotlin.code' call
      var this_1 = this.last_1;
      tmp = tmp_0 + Char__toInt_impl_vasixd(this_1) | 0;
    }
    return tmp;
  };
  protoOf(CharRange).toString = function () {
    return toString_0(this.first_1) + '..' + toString_0(this.last_1);
  };
  function Companion_10() {
    Companion_instance_10 = this;
    this.EMPTY_1 = new LongRange(new Long(1, 0), new Long(0, 0));
  }
  protoOf(Companion_10).get_EMPTY_i8q41w_k$ = function () {
    return this.EMPTY_1;
  };
  var Companion_instance_10;
  function Companion_getInstance_10() {
    if (Companion_instance_10 == null)
      new Companion_10();
    return Companion_instance_10;
  }
  function LongRange(start, endInclusive) {
    Companion_getInstance_10();
    LongProgression.call(this, start, endInclusive, new Long(1, 0));
  }
  protoOf(LongRange).get_start_iypx6h_k$ = function () {
    return this.first_1;
  };
  protoOf(LongRange).get_endInclusive_r07xpi_k$ = function () {
    return this.last_1;
  };
  protoOf(LongRange).get_endExclusive_pmwm6k_k$ = function () {
    Companion_getInstance_3();
    if (this.last_1.equals(new Long(-1, 2147483647))) {
      // Inline function 'kotlin.error' call
      var message = 'Cannot return the exclusive upper bound of a range that includes MAX_VALUE.';
      throw IllegalStateException_init_$Create$_0(toString_2(message));
    }
    // Inline function 'kotlin.Long.plus' call
    return this.last_1.plus_r93sks_k$(toLong(1));
  };
  protoOf(LongRange).contains_aa6tld_k$ = function (value) {
    return this.first_1.compareTo_9jj042_k$(value) <= 0 ? value.compareTo_9jj042_k$(this.last_1) <= 0 : false;
  };
  protoOf(LongRange).contains_3tkdvy_k$ = function (value) {
    return this.contains_aa6tld_k$(value instanceof Long ? value : THROW_CCE());
  };
  protoOf(LongRange).isEmpty_y1axqb_k$ = function () {
    return this.first_1.compareTo_9jj042_k$(this.last_1) > 0;
  };
  protoOf(LongRange).equals = function (other) {
    var tmp;
    if (other instanceof LongRange) {
      tmp = (this.isEmpty_y1axqb_k$() ? other.isEmpty_y1axqb_k$() : false) ? true : this.first_1.equals(other.first_1) ? this.last_1.equals(other.last_1) : false;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(LongRange).hashCode = function () {
    return this.isEmpty_y1axqb_k$() ? -1 : numberToLong(31).times_nfzjiw_k$(this.first_1.xor_qzz94j_k$(this.first_1.ushr_z7nmq8_k$(32))).plus_r93sks_k$(this.last_1.xor_qzz94j_k$(this.last_1.ushr_z7nmq8_k$(32))).toInt_1tsl84_k$();
  };
  protoOf(LongRange).toString = function () {
    return this.first_1.toString() + '..' + this.last_1.toString();
  };
  function _get_finalElement__gc6m3p($this) {
    return $this.finalElement_1;
  }
  function _set_hasNext__86v2bs($this, _set____db54di) {
    $this.hasNext_1 = _set____db54di;
  }
  function _get_hasNext__xt3cos($this) {
    return $this.hasNext_1;
  }
  function _set_next__9r2xms($this, _set____db54di) {
    $this.next_1 = _set____db54di;
  }
  function _get_next__daux88($this) {
    return $this.next_1;
  }
  function IntProgressionIterator(first, last, step) {
    IntIterator.call(this);
    this.step_1 = step;
    this.finalElement_1 = last;
    this.hasNext_1 = this.step_1 > 0 ? first <= last : first >= last;
    this.next_1 = this.hasNext_1 ? first : this.finalElement_1;
  }
  protoOf(IntProgressionIterator).get_step_woujh1_k$ = function () {
    return this.step_1;
  };
  protoOf(IntProgressionIterator).hasNext_bitz1p_k$ = function () {
    return this.hasNext_1;
  };
  protoOf(IntProgressionIterator).nextInt_ujorgc_k$ = function () {
    var value = this.next_1;
    if (value === this.finalElement_1) {
      if (!this.hasNext_1)
        throw NoSuchElementException_init_$Create$();
      this.hasNext_1 = false;
    } else {
      this.next_1 = this.next_1 + this.step_1 | 0;
    }
    return value;
  };
  function _get_finalElement__gc6m3p_0($this) {
    return $this.finalElement_1;
  }
  function _set_hasNext__86v2bs_0($this, _set____db54di) {
    $this.hasNext_1 = _set____db54di;
  }
  function _get_hasNext__xt3cos_0($this) {
    return $this.hasNext_1;
  }
  function _set_next__9r2xms_0($this, _set____db54di) {
    $this.next_1 = _set____db54di;
  }
  function _get_next__daux88_0($this) {
    return $this.next_1;
  }
  function CharProgressionIterator(first, last, step) {
    CharIterator.call(this);
    this.step_1 = step;
    var tmp = this;
    // Inline function 'kotlin.code' call
    tmp.finalElement_1 = Char__toInt_impl_vasixd(last);
    this.hasNext_1 = this.step_1 > 0 ? Char__compareTo_impl_ypi4mb(first, last) <= 0 : Char__compareTo_impl_ypi4mb(first, last) >= 0;
    var tmp_0 = this;
    var tmp_1;
    if (this.hasNext_1) {
      // Inline function 'kotlin.code' call
      tmp_1 = Char__toInt_impl_vasixd(first);
    } else {
      tmp_1 = this.finalElement_1;
    }
    tmp_0.next_1 = tmp_1;
  }
  protoOf(CharProgressionIterator).get_step_woujh1_k$ = function () {
    return this.step_1;
  };
  protoOf(CharProgressionIterator).hasNext_bitz1p_k$ = function () {
    return this.hasNext_1;
  };
  protoOf(CharProgressionIterator).nextChar_yvnk6j_k$ = function () {
    var value = this.next_1;
    if (value === this.finalElement_1) {
      if (!this.hasNext_1)
        throw NoSuchElementException_init_$Create$();
      this.hasNext_1 = false;
    } else {
      this.next_1 = this.next_1 + this.step_1 | 0;
    }
    return numberToChar(value);
  };
  function _get_finalElement__gc6m3p_1($this) {
    return $this.finalElement_1;
  }
  function _set_hasNext__86v2bs_1($this, _set____db54di) {
    $this.hasNext_1 = _set____db54di;
  }
  function _get_hasNext__xt3cos_1($this) {
    return $this.hasNext_1;
  }
  function _set_next__9r2xms_1($this, _set____db54di) {
    $this.next_1 = _set____db54di;
  }
  function _get_next__daux88_1($this) {
    return $this.next_1;
  }
  function LongProgressionIterator(first, last, step) {
    LongIterator.call(this);
    this.step_1 = step;
    this.finalElement_1 = last;
    this.hasNext_1 = this.step_1.compareTo_9jj042_k$(new Long(0, 0)) > 0 ? first.compareTo_9jj042_k$(last) <= 0 : first.compareTo_9jj042_k$(last) >= 0;
    this.next_1 = this.hasNext_1 ? first : this.finalElement_1;
  }
  protoOf(LongProgressionIterator).get_step_woujh1_k$ = function () {
    return this.step_1;
  };
  protoOf(LongProgressionIterator).hasNext_bitz1p_k$ = function () {
    return this.hasNext_1;
  };
  protoOf(LongProgressionIterator).nextLong_njwv0v_k$ = function () {
    var value = this.next_1;
    if (value.equals(this.finalElement_1)) {
      if (!this.hasNext_1)
        throw NoSuchElementException_init_$Create$();
      this.hasNext_1 = false;
    } else {
      this.next_1 = this.next_1.plus_r93sks_k$(this.step_1);
    }
    return value;
  };
  function Companion_11() {
    Companion_instance_11 = this;
  }
  protoOf(Companion_11).fromClosedRange_y6bqsv_k$ = function (rangeStart, rangeEnd, step) {
    return new IntProgression(rangeStart, rangeEnd, step);
  };
  var Companion_instance_11;
  function Companion_getInstance_11() {
    if (Companion_instance_11 == null)
      new Companion_11();
    return Companion_instance_11;
  }
  function IntProgression(start, endInclusive, step) {
    Companion_getInstance_11();
    if (step === 0)
      throw IllegalArgumentException_init_$Create$_0('Step must be non-zero.');
    if (step === IntCompanionObject_getInstance().MIN_VALUE)
      throw IllegalArgumentException_init_$Create$_0('Step must be greater than Int.MIN_VALUE to avoid overflow on negation.');
    this.first_1 = start;
    this.last_1 = getProgressionLastElement(start, endInclusive, step);
    this.step_1 = step;
  }
  protoOf(IntProgression).get_first_irdx8n_k$ = function () {
    return this.first_1;
  };
  protoOf(IntProgression).get_last_wopotb_k$ = function () {
    return this.last_1;
  };
  protoOf(IntProgression).get_step_woujh1_k$ = function () {
    return this.step_1;
  };
  protoOf(IntProgression).iterator_jk1svi_k$ = function () {
    return new IntProgressionIterator(this.first_1, this.last_1, this.step_1);
  };
  protoOf(IntProgression).isEmpty_y1axqb_k$ = function () {
    return this.step_1 > 0 ? this.first_1 > this.last_1 : this.first_1 < this.last_1;
  };
  protoOf(IntProgression).equals = function (other) {
    var tmp;
    if (other instanceof IntProgression) {
      tmp = (this.isEmpty_y1axqb_k$() ? other.isEmpty_y1axqb_k$() : false) ? true : (this.first_1 === other.first_1 ? this.last_1 === other.last_1 : false) ? this.step_1 === other.step_1 : false;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(IntProgression).hashCode = function () {
    return this.isEmpty_y1axqb_k$() ? -1 : imul(31, imul(31, this.first_1) + this.last_1 | 0) + this.step_1 | 0;
  };
  protoOf(IntProgression).toString = function () {
    return this.step_1 > 0 ? '' + this.first_1 + '..' + this.last_1 + ' step ' + this.step_1 : '' + this.first_1 + ' downTo ' + this.last_1 + ' step ' + (-this.step_1 | 0);
  };
  function Companion_12() {
    Companion_instance_12 = this;
  }
  protoOf(Companion_12).fromClosedRange_iu4wj5_k$ = function (rangeStart, rangeEnd, step) {
    return new CharProgression(rangeStart, rangeEnd, step);
  };
  var Companion_instance_12;
  function Companion_getInstance_12() {
    if (Companion_instance_12 == null)
      new Companion_12();
    return Companion_instance_12;
  }
  function CharProgression(start, endInclusive, step) {
    Companion_getInstance_12();
    if (step === 0)
      throw IllegalArgumentException_init_$Create$_0('Step must be non-zero.');
    if (step === IntCompanionObject_getInstance().MIN_VALUE)
      throw IllegalArgumentException_init_$Create$_0('Step must be greater than Int.MIN_VALUE to avoid overflow on negation.');
    this.first_1 = start;
    var tmp = this;
    // Inline function 'kotlin.code' call
    var tmp_0 = Char__toInt_impl_vasixd(start);
    // Inline function 'kotlin.code' call
    var tmp$ret$1 = Char__toInt_impl_vasixd(endInclusive);
    tmp.last_1 = numberToChar(getProgressionLastElement(tmp_0, tmp$ret$1, step));
    this.step_1 = step;
  }
  protoOf(CharProgression).get_first_enpj7t_k$ = function () {
    return this.first_1;
  };
  protoOf(CharProgression).get_last_rplkv5_k$ = function () {
    return this.last_1;
  };
  protoOf(CharProgression).get_step_woujh1_k$ = function () {
    return this.step_1;
  };
  protoOf(CharProgression).iterator_jk1svi_k$ = function () {
    return new CharProgressionIterator(this.first_1, this.last_1, this.step_1);
  };
  protoOf(CharProgression).isEmpty_y1axqb_k$ = function () {
    return this.step_1 > 0 ? Char__compareTo_impl_ypi4mb(this.first_1, this.last_1) > 0 : Char__compareTo_impl_ypi4mb(this.first_1, this.last_1) < 0;
  };
  protoOf(CharProgression).equals = function (other) {
    var tmp;
    if (other instanceof CharProgression) {
      tmp = (this.isEmpty_y1axqb_k$() ? other.isEmpty_y1axqb_k$() : false) ? true : (this.first_1 === other.first_1 ? this.last_1 === other.last_1 : false) ? this.step_1 === other.step_1 : false;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(CharProgression).hashCode = function () {
    var tmp;
    if (this.isEmpty_y1axqb_k$()) {
      tmp = -1;
    } else {
      // Inline function 'kotlin.code' call
      var this_0 = this.first_1;
      var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
      var tmp_0 = imul(31, tmp$ret$0);
      // Inline function 'kotlin.code' call
      var this_1 = this.last_1;
      var tmp$ret$1 = Char__toInt_impl_vasixd(this_1);
      tmp = imul(31, tmp_0 + tmp$ret$1 | 0) + this.step_1 | 0;
    }
    return tmp;
  };
  protoOf(CharProgression).toString = function () {
    return this.step_1 > 0 ? toString_0(this.first_1) + '..' + toString_0(this.last_1) + ' step ' + this.step_1 : toString_0(this.first_1) + ' downTo ' + toString_0(this.last_1) + ' step ' + (-this.step_1 | 0);
  };
  function Companion_13() {
    Companion_instance_13 = this;
  }
  protoOf(Companion_13).fromClosedRange_brhbh5_k$ = function (rangeStart, rangeEnd, step) {
    return new LongProgression(rangeStart, rangeEnd, step);
  };
  var Companion_instance_13;
  function Companion_getInstance_13() {
    if (Companion_instance_13 == null)
      new Companion_13();
    return Companion_instance_13;
  }
  function LongProgression(start, endInclusive, step) {
    Companion_getInstance_13();
    if (step.equals(new Long(0, 0)))
      throw IllegalArgumentException_init_$Create$_0('Step must be non-zero.');
    Companion_getInstance_3();
    if (step.equals(new Long(0, -2147483648)))
      throw IllegalArgumentException_init_$Create$_0('Step must be greater than Long.MIN_VALUE to avoid overflow on negation.');
    this.first_1 = start;
    this.last_1 = getProgressionLastElement_0(start, endInclusive, step);
    this.step_1 = step;
  }
  protoOf(LongProgression).get_first_irdx8n_k$ = function () {
    return this.first_1;
  };
  protoOf(LongProgression).get_last_wopotb_k$ = function () {
    return this.last_1;
  };
  protoOf(LongProgression).get_step_woujh1_k$ = function () {
    return this.step_1;
  };
  protoOf(LongProgression).iterator_jk1svi_k$ = function () {
    return new LongProgressionIterator(this.first_1, this.last_1, this.step_1);
  };
  protoOf(LongProgression).isEmpty_y1axqb_k$ = function () {
    return this.step_1.compareTo_9jj042_k$(new Long(0, 0)) > 0 ? this.first_1.compareTo_9jj042_k$(this.last_1) > 0 : this.first_1.compareTo_9jj042_k$(this.last_1) < 0;
  };
  protoOf(LongProgression).equals = function (other) {
    var tmp;
    if (other instanceof LongProgression) {
      tmp = (this.isEmpty_y1axqb_k$() ? other.isEmpty_y1axqb_k$() : false) ? true : (this.first_1.equals(other.first_1) ? this.last_1.equals(other.last_1) : false) ? this.step_1.equals(other.step_1) : false;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(LongProgression).hashCode = function () {
    return this.isEmpty_y1axqb_k$() ? -1 : numberToLong(31).times_nfzjiw_k$(numberToLong(31).times_nfzjiw_k$(this.first_1.xor_qzz94j_k$(this.first_1.ushr_z7nmq8_k$(32))).plus_r93sks_k$(this.last_1.xor_qzz94j_k$(this.last_1.ushr_z7nmq8_k$(32)))).plus_r93sks_k$(this.step_1.xor_qzz94j_k$(this.step_1.ushr_z7nmq8_k$(32))).toInt_1tsl84_k$();
  };
  protoOf(LongProgression).toString = function () {
    return this.step_1.compareTo_9jj042_k$(new Long(0, 0)) > 0 ? this.first_1.toString() + '..' + this.last_1.toString() + ' step ' + this.step_1.toString() : this.first_1.toString() + ' downTo ' + this.last_1.toString() + ' step ' + this.step_1.unaryMinus_6uz0qp_k$().toString();
  };
  function ClosedRange() {
  }
  function OpenEndRange() {
  }
  function checkStepIsPositive(isPositive, step) {
    if (!isPositive)
      throw IllegalArgumentException_init_$Create$_0('Step must be positive, was: ' + toString_2(step) + '.');
  }
  function KClassifier() {
  }
  function KTypeParameter() {
  }
  function Companion_14() {
    Companion_instance_14 = this;
    this.star_1 = new KTypeProjection(null, null);
  }
  protoOf(Companion_14).get_star_woujdn_k$ = function () {
    return this.star_1;
  };
  protoOf(Companion_14).get_STAR_wo9fa3_k$ = function () {
    return this.star_1;
  };
  protoOf(Companion_14).invariant_a4yrrz_k$ = function (type) {
    return new KTypeProjection(KVariance_INVARIANT_getInstance(), type);
  };
  protoOf(Companion_14).contravariant_bkjggt_k$ = function (type) {
    return new KTypeProjection(KVariance_IN_getInstance(), type);
  };
  protoOf(Companion_14).covariant_daguew_k$ = function (type) {
    return new KTypeProjection(KVariance_OUT_getInstance(), type);
  };
  var Companion_instance_14;
  function Companion_getInstance_14() {
    if (Companion_instance_14 == null)
      new Companion_14();
    return Companion_instance_14;
  }
  function KTypeProjection(variance, type) {
    Companion_getInstance_14();
    this.variance_1 = variance;
    this.type_1 = type;
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(this.variance_1 == null === (this.type_1 == null))) {
      // Inline function 'kotlin.reflect.KTypeProjection.<anonymous>' call
      var message = this.variance_1 == null ? 'Star projection must have no type specified.' : 'The projection variance ' + this.variance_1 + ' requires type to be specified.';
      throw IllegalArgumentException_init_$Create$_0(toString_2(message));
    }
  }
  protoOf(KTypeProjection).get_variance_ik7ku2_k$ = function () {
    return this.variance_1;
  };
  protoOf(KTypeProjection).get_type_wovaf7_k$ = function () {
    return this.type_1;
  };
  protoOf(KTypeProjection).toString = function () {
    var tmp0_subject = this.variance_1;
    var tmp;
    switch (tmp0_subject == null ? -1 : tmp0_subject.ordinal_1) {
      case -1:
        tmp = '*';
        break;
      case 0:
        tmp = toString_1(this.type_1);
        break;
      case 1:
        tmp = 'in ' + this.type_1;
        break;
      case 2:
        tmp = 'out ' + this.type_1;
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  };
  protoOf(KTypeProjection).component1_7eebsc_k$ = function () {
    return this.variance_1;
  };
  protoOf(KTypeProjection).component2_7eebsb_k$ = function () {
    return this.type_1;
  };
  protoOf(KTypeProjection).copy_3t4q9q_k$ = function (variance, type) {
    return new KTypeProjection(variance, type);
  };
  protoOf(KTypeProjection).copy$default_dyrb1k_k$ = function (variance, type, $super) {
    variance = variance === VOID ? this.variance_1 : variance;
    type = type === VOID ? this.type_1 : type;
    return $super === VOID ? this.copy_3t4q9q_k$(variance, type) : $super.copy_3t4q9q_k$.call(this, variance, type);
  };
  protoOf(KTypeProjection).hashCode = function () {
    var result = this.variance_1 == null ? 0 : this.variance_1.hashCode();
    result = imul(result, 31) + (this.type_1 == null ? 0 : hashCode(this.type_1)) | 0;
    return result;
  };
  protoOf(KTypeProjection).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof KTypeProjection))
      return false;
    var tmp0_other_with_cast = other instanceof KTypeProjection ? other : THROW_CCE();
    if (!equals(this.variance_1, tmp0_other_with_cast.variance_1))
      return false;
    if (!equals(this.type_1, tmp0_other_with_cast.type_1))
      return false;
    return true;
  };
  var KVariance_INVARIANT_instance;
  var KVariance_IN_instance;
  var KVariance_OUT_instance;
  function values_6() {
    return [KVariance_INVARIANT_getInstance(), KVariance_IN_getInstance(), KVariance_OUT_getInstance()];
  }
  function valueOf_6(value) {
    switch (value) {
      case 'INVARIANT':
        return KVariance_INVARIANT_getInstance();
      case 'IN':
        return KVariance_IN_getInstance();
      case 'OUT':
        return KVariance_OUT_getInstance();
      default:
        KVariance_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries_6() {
    if ($ENTRIES_6 == null)
      $ENTRIES_6 = enumEntries(values_6());
    return $ENTRIES_6;
  }
  var KVariance_entriesInitialized;
  function KVariance_initEntries() {
    if (KVariance_entriesInitialized)
      return Unit_getInstance();
    KVariance_entriesInitialized = true;
    KVariance_INVARIANT_instance = new KVariance('INVARIANT', 0);
    KVariance_IN_instance = new KVariance('IN', 1);
    KVariance_OUT_instance = new KVariance('OUT', 2);
  }
  var $ENTRIES_6;
  function KVariance(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function KVariance_INVARIANT_getInstance() {
    KVariance_initEntries();
    return KVariance_INVARIANT_instance;
  }
  function KVariance_IN_getInstance() {
    KVariance_initEntries();
    return KVariance_IN_instance;
  }
  function KVariance_OUT_getInstance() {
    KVariance_initEntries();
    return KVariance_OUT_instance;
  }
  function appendElement(_this__u8e3s4, element, transform) {
    if (!(transform == null)) {
      _this__u8e3s4.append_jgojdo_k$(transform(element));
    } else {
      if (element == null ? true : isCharSequence(element)) {
        _this__u8e3s4.append_jgojdo_k$(element);
      } else {
        if (element instanceof Char) {
          _this__u8e3s4.append_am5a4z_k$(element.value_1);
        } else {
          _this__u8e3s4.append_jgojdo_k$(toString_1(element));
        }
      }
    }
  }
  function get_HEX_DIGITS_TO_DECIMAL() {
    _init_properties_HexExtensions_kt__wu8rc3();
    return HEX_DIGITS_TO_DECIMAL;
  }
  var HEX_DIGITS_TO_DECIMAL;
  function get_LOWER_CASE_HEX_DIGITS() {
    return LOWER_CASE_HEX_DIGITS;
  }
  var LOWER_CASE_HEX_DIGITS;
  function get_UPPER_CASE_HEX_DIGITS() {
    return UPPER_CASE_HEX_DIGITS;
  }
  var UPPER_CASE_HEX_DIGITS;
  var properties_initialized_HexExtensions_kt_h16sbl;
  function _init_properties_HexExtensions_kt__wu8rc3() {
    if (!properties_initialized_HexExtensions_kt_h16sbl) {
      properties_initialized_HexExtensions_kt_h16sbl = true;
      // Inline function 'kotlin.apply' call
      var tmp = 0;
      var tmp_0 = new Int32Array(128);
      while (tmp < 128) {
        tmp_0[tmp] = -1;
        tmp = tmp + 1 | 0;
      }
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlin.text.HEX_DIGITS_TO_DECIMAL.<anonymous>' call
      // Inline function 'kotlin.text.forEachIndexed' call
      var index = 0;
      var indexedObject = '0123456789abcdef';
      var inductionVariable = 0;
      while (inductionVariable < charSequenceLength(indexedObject)) {
        var item = charSequenceGet(indexedObject, inductionVariable);
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.text.HEX_DIGITS_TO_DECIMAL.<anonymous>.<anonymous>' call
        var tmp1 = index;
        index = tmp1 + 1 | 0;
        // Inline function 'kotlin.code' call
        tmp_0[Char__toInt_impl_vasixd(item)] = tmp1;
      }
      // Inline function 'kotlin.text.forEachIndexed' call
      var index_0 = 0;
      var indexedObject_0 = '0123456789ABCDEF';
      var inductionVariable_0 = 0;
      while (inductionVariable_0 < charSequenceLength(indexedObject_0)) {
        var item_0 = charSequenceGet(indexedObject_0, inductionVariable_0);
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        // Inline function 'kotlin.text.HEX_DIGITS_TO_DECIMAL.<anonymous>.<anonymous>' call
        var tmp1_0 = index_0;
        index_0 = tmp1_0 + 1 | 0;
        // Inline function 'kotlin.code' call
        tmp_0[Char__toInt_impl_vasixd(item_0)] = tmp1_0;
      }
      HEX_DIGITS_TO_DECIMAL = tmp_0;
    }
  }
  function isEmpty_5(_this__u8e3s4) {
    return charSequenceLength(_this__u8e3s4) === 0;
  }
  function iterator_0(_this__u8e3s4) {
    return new iterator$1(_this__u8e3s4);
  }
  function get_lastIndex_7(_this__u8e3s4) {
    return charSequenceLength(_this__u8e3s4) - 1 | 0;
  }
  function _set_index__fyfqnn_0($this, _set____db54di) {
    $this.index_1 = _set____db54di;
  }
  function _get_index__g2optt_1($this) {
    return $this.index_1;
  }
  function iterator$1($this_iterator) {
    this.$this_iterator_1 = $this_iterator;
    CharIterator.call(this);
    this.index_1 = 0;
  }
  protoOf(iterator$1).nextChar_yvnk6j_k$ = function () {
    var tmp1 = this.index_1;
    this.index_1 = tmp1 + 1 | 0;
    return charSequenceGet(this.$this_iterator_1, tmp1);
  };
  protoOf(iterator$1).hasNext_bitz1p_k$ = function () {
    return this.index_1 < charSequenceLength(this.$this_iterator_1);
  };
  function get_UNDEFINED_RESULT() {
    _init_properties_DeepRecursive_kt__zbwcac();
    return UNDEFINED_RESULT;
  }
  var UNDEFINED_RESULT;
  var properties_initialized_DeepRecursive_kt_5z0al2;
  function _init_properties_DeepRecursive_kt__zbwcac() {
    if (!properties_initialized_DeepRecursive_kt_5z0al2) {
      properties_initialized_DeepRecursive_kt_5z0al2 = true;
      // Inline function 'kotlin.Companion.success' call
      Companion_getInstance_15();
      var value = get_COROUTINE_SUSPENDED();
      UNDEFINED_RESULT = _Result___init__impl__xyqfz8(value);
    }
  }
  function hashCode_1(_this__u8e3s4) {
    var tmp1_elvis_lhs = _this__u8e3s4 == null ? null : hashCode(_this__u8e3s4);
    return tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
  }
  function check(value) {
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!value) {
      // Inline function 'kotlin.check.<anonymous>' call
      var message = 'Check failed.';
      throw IllegalStateException_init_$Create$_0(toString_2(message));
    }
  }
  function require_0(value) {
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!value) {
      // Inline function 'kotlin.require.<anonymous>' call
      var message = 'Failed requirement.';
      throw IllegalArgumentException_init_$Create$_0(toString_2(message));
    }
  }
  function error(message) {
    throw IllegalStateException_init_$Create$_0(toString_2(message));
  }
  function check_0(value, lazyMessage) {
    // Inline function 'kotlin.contracts.contract' call
    if (!value) {
      var message = lazyMessage();
      throw IllegalStateException_init_$Create$_0(toString_2(message));
    }
  }
  function require_1(value, lazyMessage) {
    // Inline function 'kotlin.contracts.contract' call
    if (!value) {
      var message = lazyMessage();
      throw IllegalArgumentException_init_$Create$_0(toString_2(message));
    }
  }
  function _Result___init__impl__xyqfz8(value) {
    return value;
  }
  function _Result___get_value__impl__bjfvqg($this) {
    return $this;
  }
  function _Result___get_isSuccess__impl__sndoy8($this) {
    var tmp = _Result___get_value__impl__bjfvqg($this);
    return !(tmp instanceof Failure);
  }
  function _Result___get_isFailure__impl__jpiriv($this) {
    var tmp = _Result___get_value__impl__bjfvqg($this);
    return tmp instanceof Failure;
  }
  function Result__getOrNull_impl_x6tyqe($this) {
    var tmp;
    if (_Result___get_isFailure__impl__jpiriv($this)) {
      tmp = null;
    } else {
      var tmp_0 = _Result___get_value__impl__bjfvqg($this);
      tmp = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    }
    return tmp;
  }
  function Result__exceptionOrNull_impl_p6xea9($this) {
    var tmp;
    if (_Result___get_value__impl__bjfvqg($this) instanceof Failure) {
      tmp = _Result___get_value__impl__bjfvqg($this).exception_1;
    } else {
      tmp = null;
    }
    return tmp;
  }
  function Result__toString_impl_yu5r8k($this) {
    var tmp;
    if (_Result___get_value__impl__bjfvqg($this) instanceof Failure) {
      tmp = toString_2(_Result___get_value__impl__bjfvqg($this));
    } else {
      tmp = 'Success(' + toString_1(_Result___get_value__impl__bjfvqg($this)) + ')';
    }
    return tmp;
  }
  function Companion_15() {
    Companion_instance_15 = this;
  }
  protoOf(Companion_15).success_e7oken_k$ = function (value) {
    return _Result___init__impl__xyqfz8(value);
  };
  protoOf(Companion_15).failure_vz4kdm_k$ = function (exception) {
    return _Result___init__impl__xyqfz8(createFailure(exception));
  };
  var Companion_instance_15;
  function Companion_getInstance_15() {
    if (Companion_instance_15 == null)
      new Companion_15();
    return Companion_instance_15;
  }
  function Failure(exception) {
    this.exception_1 = exception;
  }
  protoOf(Failure).get_exception_x0n6w6_k$ = function () {
    return this.exception_1;
  };
  protoOf(Failure).equals = function (other) {
    var tmp;
    if (other instanceof Failure) {
      tmp = equals(this.exception_1, other.exception_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(Failure).hashCode = function () {
    return hashCode(this.exception_1);
  };
  protoOf(Failure).toString = function () {
    return 'Failure(' + this.exception_1 + ')';
  };
  function Result__hashCode_impl_d2zufp($this) {
    return $this == null ? 0 : hashCode($this);
  }
  function Result__equals_impl_bxgmep($this, other) {
    if (!(other instanceof Result))
      return false;
    var tmp0_other_with_cast = other instanceof Result ? other.value_1 : THROW_CCE();
    if (!equals($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function Result(value) {
    Companion_getInstance_15();
    this.value_1 = value;
  }
  protoOf(Result).toString = function () {
    return Result__toString_impl_yu5r8k(this.value_1);
  };
  protoOf(Result).hashCode = function () {
    return Result__hashCode_impl_d2zufp(this.value_1);
  };
  protoOf(Result).equals = function (other) {
    return Result__equals_impl_bxgmep(this.value_1, other);
  };
  function getOrThrow(_this__u8e3s4) {
    throwOnFailure(_this__u8e3s4);
    var tmp = _Result___get_value__impl__bjfvqg(_this__u8e3s4);
    return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
  }
  function createFailure(exception) {
    return new Failure(exception);
  }
  function throwOnFailure(_this__u8e3s4) {
    var tmp = _Result___get_value__impl__bjfvqg(_this__u8e3s4);
    if (tmp instanceof Failure)
      throw _Result___get_value__impl__bjfvqg(_this__u8e3s4).exception_1;
  }
  function run(block) {
    // Inline function 'kotlin.contracts.contract' call
    return block();
  }
  function let_0(_this__u8e3s4, block) {
    // Inline function 'kotlin.contracts.contract' call
    return block(_this__u8e3s4);
  }
  function apply(_this__u8e3s4, block) {
    // Inline function 'kotlin.contracts.contract' call
    block(_this__u8e3s4);
    return _this__u8e3s4;
  }
  function TODO() {
    throw new NotImplementedError();
  }
  function NotImplementedError(message) {
    message = message === VOID ? 'An operation is not implemented.' : message;
    Error_init_$Init$_0(message, this);
    captureStack(this, NotImplementedError);
  }
  function also(_this__u8e3s4, block) {
    // Inline function 'kotlin.contracts.contract' call
    block(_this__u8e3s4);
    return _this__u8e3s4;
  }
  function repeat(times, action) {
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        action(index);
      }
       while (inductionVariable < times);
  }
  function with_0(receiver, block) {
    // Inline function 'kotlin.contracts.contract' call
    return block(receiver);
  }
  function run_0(_this__u8e3s4, block) {
    // Inline function 'kotlin.contracts.contract' call
    return block(_this__u8e3s4);
  }
  function Pair(first, second) {
    this.first_1 = first;
    this.second_1 = second;
  }
  protoOf(Pair).get_first_irdx8n_k$ = function () {
    return this.first_1;
  };
  protoOf(Pair).get_second_jf7fjx_k$ = function () {
    return this.second_1;
  };
  protoOf(Pair).toString = function () {
    return '(' + this.first_1 + ', ' + this.second_1 + ')';
  };
  protoOf(Pair).component1_7eebsc_k$ = function () {
    return this.first_1;
  };
  protoOf(Pair).component2_7eebsb_k$ = function () {
    return this.second_1;
  };
  protoOf(Pair).copy_uni6vi_k$ = function (first, second) {
    return new Pair(first, second);
  };
  protoOf(Pair).copy$default_iufz9c_k$ = function (first, second, $super) {
    first = first === VOID ? this.first_1 : first;
    second = second === VOID ? this.second_1 : second;
    return $super === VOID ? this.copy_uni6vi_k$(first, second) : $super.copy_uni6vi_k$.call(this, first, second);
  };
  protoOf(Pair).hashCode = function () {
    var result = this.first_1 == null ? 0 : hashCode(this.first_1);
    result = imul(result, 31) + (this.second_1 == null ? 0 : hashCode(this.second_1)) | 0;
    return result;
  };
  protoOf(Pair).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Pair))
      return false;
    var tmp0_other_with_cast = other instanceof Pair ? other : THROW_CCE();
    if (!equals(this.first_1, tmp0_other_with_cast.first_1))
      return false;
    if (!equals(this.second_1, tmp0_other_with_cast.second_1))
      return false;
    return true;
  };
  function Triple(first, second, third) {
    this.first_1 = first;
    this.second_1 = second;
    this.third_1 = third;
  }
  protoOf(Triple).get_first_irdx8n_k$ = function () {
    return this.first_1;
  };
  protoOf(Triple).get_second_jf7fjx_k$ = function () {
    return this.second_1;
  };
  protoOf(Triple).get_third_iz27um_k$ = function () {
    return this.third_1;
  };
  protoOf(Triple).toString = function () {
    return '(' + this.first_1 + ', ' + this.second_1 + ', ' + this.third_1 + ')';
  };
  protoOf(Triple).component1_7eebsc_k$ = function () {
    return this.first_1;
  };
  protoOf(Triple).component2_7eebsb_k$ = function () {
    return this.second_1;
  };
  protoOf(Triple).component3_7eebsa_k$ = function () {
    return this.third_1;
  };
  protoOf(Triple).copy_w6rl66_k$ = function (first, second, third) {
    return new Triple(first, second, third);
  };
  protoOf(Triple).copy$default_wmtbyu_k$ = function (first, second, third, $super) {
    first = first === VOID ? this.first_1 : first;
    second = second === VOID ? this.second_1 : second;
    third = third === VOID ? this.third_1 : third;
    return $super === VOID ? this.copy_w6rl66_k$(first, second, third) : $super.copy_w6rl66_k$.call(this, first, second, third);
  };
  protoOf(Triple).hashCode = function () {
    var result = this.first_1 == null ? 0 : hashCode(this.first_1);
    result = imul(result, 31) + (this.second_1 == null ? 0 : hashCode(this.second_1)) | 0;
    result = imul(result, 31) + (this.third_1 == null ? 0 : hashCode(this.third_1)) | 0;
    return result;
  };
  protoOf(Triple).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Triple))
      return false;
    var tmp0_other_with_cast = other instanceof Triple ? other : THROW_CCE();
    if (!equals(this.first_1, tmp0_other_with_cast.first_1))
      return false;
    if (!equals(this.second_1, tmp0_other_with_cast.second_1))
      return false;
    if (!equals(this.third_1, tmp0_other_with_cast.third_1))
      return false;
    return true;
  };
  function to(_this__u8e3s4, that) {
    return new Pair(_this__u8e3s4, that);
  }
  function _UByte___init__impl__g9hnc4(data) {
    return data;
  }
  function _UByte___get_data__impl__jof9qr($this) {
    return $this;
  }
  function Companion_16() {
    Companion_instance_16 = this;
    this.MIN_VALUE_1 = _UByte___init__impl__g9hnc4(0);
    this.MAX_VALUE_1 = _UByte___init__impl__g9hnc4(-1);
    this.SIZE_BYTES_1 = 1;
    this.SIZE_BITS_1 = 8;
  }
  protoOf(Companion_16).get_MIN_VALUE_phf8xi_k$ = function () {
    return this.MIN_VALUE_1;
  };
  protoOf(Companion_16).get_MAX_VALUE_53rlic_k$ = function () {
    return this.MAX_VALUE_1;
  };
  protoOf(Companion_16).get_SIZE_BYTES_qphg4q_k$ = function () {
    return this.SIZE_BYTES_1;
  };
  protoOf(Companion_16).get_SIZE_BITS_7qhjj9_k$ = function () {
    return this.SIZE_BITS_1;
  };
  var Companion_instance_16;
  function Companion_getInstance_16() {
    if (Companion_instance_16 == null)
      new Companion_16();
    return Companion_instance_16;
  }
  function UByte__compareTo_impl_5w5192($this, other) {
    // Inline function 'kotlin.UByte.toInt' call
    var tmp = _UByte___get_data__impl__jof9qr($this) & 255;
    // Inline function 'kotlin.UByte.toInt' call
    var tmp$ret$1 = _UByte___get_data__impl__jof9qr(other) & 255;
    return compareTo_0(tmp, tmp$ret$1);
  }
  function UByte__compareTo_impl_5w5192_0($this, other) {
    return UByte__compareTo_impl_5w5192($this.data_1, other instanceof UByte ? other.data_1 : THROW_CCE());
  }
  function UByte__compareTo_impl_5w5192_1($this, other) {
    // Inline function 'kotlin.UByte.toInt' call
    var tmp = _UByte___get_data__impl__jof9qr($this) & 255;
    // Inline function 'kotlin.UShort.toInt' call
    var tmp$ret$1 = _UShort___get_data__impl__g0245(other) & 65535;
    return compareTo_0(tmp, tmp$ret$1);
  }
  function UByte__compareTo_impl_5w5192_2($this, other) {
    // Inline function 'kotlin.UInt.compareTo' call
    // Inline function 'kotlin.UByte.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr($this) & 255);
    return uintCompare(_UInt___get_data__impl__f0vqqw(this_0), _UInt___get_data__impl__f0vqqw(other));
  }
  function UByte__compareTo_impl_5w5192_3($this, other) {
    // Inline function 'kotlin.ULong.compareTo' call
    // Inline function 'kotlin.UByte.toULong' call
    var this_0 = _ULong___init__impl__c78o9k(toLong(_UByte___get_data__impl__jof9qr($this)).and_4spn93_k$(new Long(255, 0)));
    return ulongCompare(_ULong___get_data__impl__fggpzb(this_0), _ULong___get_data__impl__fggpzb(other));
  }
  function UByte__plus_impl_y9dsom($this, other) {
    // Inline function 'kotlin.UInt.plus' call
    // Inline function 'kotlin.UByte.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr($this) & 255);
    // Inline function 'kotlin.UByte.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(other) & 255);
    return _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(this_0) + _UInt___get_data__impl__f0vqqw(other_0) | 0);
  }
  function UByte__plus_impl_y9dsom_0($this, other) {
    // Inline function 'kotlin.UInt.plus' call
    // Inline function 'kotlin.UByte.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr($this) & 255);
    // Inline function 'kotlin.UShort.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(other) & 65535);
    return _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(this_0) + _UInt___get_data__impl__f0vqqw(other_0) | 0);
  }
  function UByte__plus_impl_y9dsom_1($this, other) {
    // Inline function 'kotlin.UInt.plus' call
    // Inline function 'kotlin.UByte.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr($this) & 255);
    return _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(this_0) + _UInt___get_data__impl__f0vqqw(other) | 0);
  }
  function UByte__plus_impl_y9dsom_2($this, other) {
    // Inline function 'kotlin.ULong.plus' call
    // Inline function 'kotlin.UByte.toULong' call
    var this_0 = _ULong___init__impl__c78o9k(toLong(_UByte___get_data__impl__jof9qr($this)).and_4spn93_k$(new Long(255, 0)));
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_0).plus_r93sks_k$(_ULong___get_data__impl__fggpzb(other)));
  }
  function UByte__minus_impl_qw5fay($this, other) {
    // Inline function 'kotlin.UInt.minus' call
    // Inline function 'kotlin.UByte.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr($this) & 255);
    // Inline function 'kotlin.UByte.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(other) & 255);
    return _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(this_0) - _UInt___get_data__impl__f0vqqw(other_0) | 0);
  }
  function UByte__minus_impl_qw5fay_0($this, other) {
    // Inline function 'kotlin.UInt.minus' call
    // Inline function 'kotlin.UByte.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr($this) & 255);
    // Inline function 'kotlin.UShort.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(other) & 65535);
    return _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(this_0) - _UInt___get_data__impl__f0vqqw(other_0) | 0);
  }
  function UByte__minus_impl_qw5fay_1($this, other) {
    // Inline function 'kotlin.UInt.minus' call
    // Inline function 'kotlin.UByte.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr($this) & 255);
    return _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(this_0) - _UInt___get_data__impl__f0vqqw(other) | 0);
  }
  function UByte__minus_impl_qw5fay_2($this, other) {
    // Inline function 'kotlin.ULong.minus' call
    // Inline function 'kotlin.UByte.toULong' call
    var this_0 = _ULong___init__impl__c78o9k(toLong(_UByte___get_data__impl__jof9qr($this)).and_4spn93_k$(new Long(255, 0)));
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_0).minus_mfbszm_k$(_ULong___get_data__impl__fggpzb(other)));
  }
  function UByte__times_impl_olmv1g($this, other) {
    // Inline function 'kotlin.UInt.times' call
    // Inline function 'kotlin.UByte.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr($this) & 255);
    // Inline function 'kotlin.UByte.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(other) & 255);
    return _UInt___init__impl__l7qpdl(imul(_UInt___get_data__impl__f0vqqw(this_0), _UInt___get_data__impl__f0vqqw(other_0)));
  }
  function UByte__times_impl_olmv1g_0($this, other) {
    // Inline function 'kotlin.UInt.times' call
    // Inline function 'kotlin.UByte.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr($this) & 255);
    // Inline function 'kotlin.UShort.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(other) & 65535);
    return _UInt___init__impl__l7qpdl(imul(_UInt___get_data__impl__f0vqqw(this_0), _UInt___get_data__impl__f0vqqw(other_0)));
  }
  function UByte__times_impl_olmv1g_1($this, other) {
    // Inline function 'kotlin.UInt.times' call
    // Inline function 'kotlin.UByte.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr($this) & 255);
    return _UInt___init__impl__l7qpdl(imul(_UInt___get_data__impl__f0vqqw(this_0), _UInt___get_data__impl__f0vqqw(other)));
  }
  function UByte__times_impl_olmv1g_2($this, other) {
    // Inline function 'kotlin.ULong.times' call
    // Inline function 'kotlin.UByte.toULong' call
    var this_0 = _ULong___init__impl__c78o9k(toLong(_UByte___get_data__impl__jof9qr($this)).and_4spn93_k$(new Long(255, 0)));
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_0).times_nfzjiw_k$(_ULong___get_data__impl__fggpzb(other)));
  }
  function UByte__div_impl_fvt4lj($this, other) {
    // Inline function 'kotlin.UInt.div' call
    // Inline function 'kotlin.UByte.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr($this) & 255);
    // Inline function 'kotlin.UByte.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(other) & 255);
    return uintDivide(this_0, other_0);
  }
  function UByte__div_impl_fvt4lj_0($this, other) {
    // Inline function 'kotlin.UInt.div' call
    // Inline function 'kotlin.UByte.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr($this) & 255);
    // Inline function 'kotlin.UShort.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(other) & 65535);
    return uintDivide(this_0, other_0);
  }
  function UByte__div_impl_fvt4lj_1($this, other) {
    // Inline function 'kotlin.UInt.div' call
    // Inline function 'kotlin.UByte.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr($this) & 255);
    return uintDivide(this_0, other);
  }
  function UByte__div_impl_fvt4lj_2($this, other) {
    // Inline function 'kotlin.ULong.div' call
    // Inline function 'kotlin.UByte.toULong' call
    var this_0 = _ULong___init__impl__c78o9k(toLong(_UByte___get_data__impl__jof9qr($this)).and_4spn93_k$(new Long(255, 0)));
    return ulongDivide(this_0, other);
  }
  function UByte__rem_impl_uhmi28($this, other) {
    // Inline function 'kotlin.UInt.rem' call
    // Inline function 'kotlin.UByte.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr($this) & 255);
    // Inline function 'kotlin.UByte.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(other) & 255);
    return uintRemainder(this_0, other_0);
  }
  function UByte__rem_impl_uhmi28_0($this, other) {
    // Inline function 'kotlin.UInt.rem' call
    // Inline function 'kotlin.UByte.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr($this) & 255);
    // Inline function 'kotlin.UShort.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(other) & 65535);
    return uintRemainder(this_0, other_0);
  }
  function UByte__rem_impl_uhmi28_1($this, other) {
    // Inline function 'kotlin.UInt.rem' call
    // Inline function 'kotlin.UByte.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr($this) & 255);
    return uintRemainder(this_0, other);
  }
  function UByte__rem_impl_uhmi28_2($this, other) {
    // Inline function 'kotlin.ULong.rem' call
    // Inline function 'kotlin.UByte.toULong' call
    var this_0 = _ULong___init__impl__c78o9k(toLong(_UByte___get_data__impl__jof9qr($this)).and_4spn93_k$(new Long(255, 0)));
    return ulongRemainder(this_0, other);
  }
  function UByte__floorDiv_impl_twf9fv($this, other) {
    // Inline function 'kotlin.UInt.floorDiv' call
    // Inline function 'kotlin.UByte.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr($this) & 255);
    // Inline function 'kotlin.UByte.toUInt' call
    // Inline function 'kotlin.UInt.div' call
    var other_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(other) & 255);
    return uintDivide(this_0, other_0);
  }
  function UByte__floorDiv_impl_twf9fv_0($this, other) {
    // Inline function 'kotlin.UInt.floorDiv' call
    // Inline function 'kotlin.UByte.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr($this) & 255);
    // Inline function 'kotlin.UShort.toUInt' call
    // Inline function 'kotlin.UInt.div' call
    var other_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(other) & 65535);
    return uintDivide(this_0, other_0);
  }
  function UByte__floorDiv_impl_twf9fv_1($this, other) {
    // Inline function 'kotlin.UInt.floorDiv' call
    // Inline function 'kotlin.UByte.toUInt' call
    // Inline function 'kotlin.UInt.div' call
    var this_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr($this) & 255);
    return uintDivide(this_0, other);
  }
  function UByte__floorDiv_impl_twf9fv_2($this, other) {
    // Inline function 'kotlin.ULong.floorDiv' call
    // Inline function 'kotlin.UByte.toULong' call
    // Inline function 'kotlin.ULong.div' call
    var this_0 = _ULong___init__impl__c78o9k(toLong(_UByte___get_data__impl__jof9qr($this)).and_4spn93_k$(new Long(255, 0)));
    return ulongDivide(this_0, other);
  }
  function UByte__mod_impl_w36moo($this, other) {
    // Inline function 'kotlin.UInt.toUByte' call
    // Inline function 'kotlin.UInt.mod' call
    // Inline function 'kotlin.UByte.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr($this) & 255);
    // Inline function 'kotlin.UByte.toUInt' call
    // Inline function 'kotlin.UInt.rem' call
    var other_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(other) & 255);
    var this_1 = uintRemainder(this_0, other_0);
    // Inline function 'kotlin.toUByte' call
    var this_2 = _UInt___get_data__impl__f0vqqw(this_1);
    return _UByte___init__impl__g9hnc4(toByte(this_2));
  }
  function UByte__mod_impl_w36moo_0($this, other) {
    // Inline function 'kotlin.UInt.toUShort' call
    // Inline function 'kotlin.UInt.mod' call
    // Inline function 'kotlin.UByte.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr($this) & 255);
    // Inline function 'kotlin.UShort.toUInt' call
    // Inline function 'kotlin.UInt.rem' call
    var other_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(other) & 65535);
    var this_1 = uintRemainder(this_0, other_0);
    // Inline function 'kotlin.toUShort' call
    var this_2 = _UInt___get_data__impl__f0vqqw(this_1);
    return _UShort___init__impl__jigrne(toShort(this_2));
  }
  function UByte__mod_impl_w36moo_1($this, other) {
    // Inline function 'kotlin.UInt.mod' call
    // Inline function 'kotlin.UByte.toUInt' call
    // Inline function 'kotlin.UInt.rem' call
    var this_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr($this) & 255);
    return uintRemainder(this_0, other);
  }
  function UByte__mod_impl_w36moo_2($this, other) {
    // Inline function 'kotlin.ULong.mod' call
    // Inline function 'kotlin.UByte.toULong' call
    // Inline function 'kotlin.ULong.rem' call
    var this_0 = _ULong___init__impl__c78o9k(toLong(_UByte___get_data__impl__jof9qr($this)).and_4spn93_k$(new Long(255, 0)));
    return ulongRemainder(this_0, other);
  }
  function UByte__inc_impl_kgwblg($this) {
    return _UByte___init__impl__g9hnc4(numberToByte(_UByte___get_data__impl__jof9qr($this) + 1));
  }
  function UByte__dec_impl_ck5108($this) {
    return _UByte___init__impl__g9hnc4(numberToByte(_UByte___get_data__impl__jof9qr($this) - 1));
  }
  function UByte__rangeTo_impl_pp550u($this, other) {
    // Inline function 'kotlin.UByte.toUInt' call
    var tmp = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr($this) & 255);
    // Inline function 'kotlin.UByte.toUInt' call
    var tmp$ret$1 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(other) & 255);
    return new UIntRange(tmp, tmp$ret$1);
  }
  function UByte__rangeUntil_impl_1g69sf($this, other) {
    // Inline function 'kotlin.UByte.toUInt' call
    var tmp = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr($this) & 255);
    // Inline function 'kotlin.UByte.toUInt' call
    var tmp$ret$1 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(other) & 255);
    return until_16(tmp, tmp$ret$1);
  }
  function UByte__and_impl_xjlq7n($this, other) {
    // Inline function 'kotlin.experimental.and' call
    var this_0 = _UByte___get_data__impl__jof9qr($this);
    var other_0 = _UByte___get_data__impl__jof9qr(other);
    var tmp$ret$0 = toByte(this_0 & other_0);
    return _UByte___init__impl__g9hnc4(tmp$ret$0);
  }
  function UByte__or_impl_hh1w25($this, other) {
    // Inline function 'kotlin.experimental.or' call
    var this_0 = _UByte___get_data__impl__jof9qr($this);
    var other_0 = _UByte___get_data__impl__jof9qr(other);
    var tmp$ret$0 = toByte(this_0 | other_0);
    return _UByte___init__impl__g9hnc4(tmp$ret$0);
  }
  function UByte__xor_impl_7gv2lr($this, other) {
    // Inline function 'kotlin.experimental.xor' call
    var this_0 = _UByte___get_data__impl__jof9qr($this);
    var other_0 = _UByte___get_data__impl__jof9qr(other);
    var tmp$ret$0 = toByte(this_0 ^ other_0);
    return _UByte___init__impl__g9hnc4(tmp$ret$0);
  }
  function UByte__inv_impl_bh1i3r($this) {
    // Inline function 'kotlin.experimental.inv' call
    var this_0 = _UByte___get_data__impl__jof9qr($this);
    var tmp$ret$0 = toByte(~this_0);
    return _UByte___init__impl__g9hnc4(tmp$ret$0);
  }
  function UByte__toByte_impl_h2o6a5($this) {
    return _UByte___get_data__impl__jof9qr($this);
  }
  function UByte__toShort_impl_3us8xj($this) {
    // Inline function 'kotlin.experimental.and' call
    var this_0 = _UByte___get_data__impl__jof9qr($this);
    return toShort(this_0 & 255);
  }
  function UByte__toInt_impl_5nso52($this) {
    return _UByte___get_data__impl__jof9qr($this) & 255;
  }
  function UByte__toLong_impl_hwyqzr($this) {
    return toLong(_UByte___get_data__impl__jof9qr($this)).and_4spn93_k$(new Long(255, 0));
  }
  function UByte__toUByte_impl_fekj48($this) {
    return $this;
  }
  function UByte__toUShort_impl_ff6uy6($this) {
    // Inline function 'kotlin.experimental.and' call
    var this_0 = _UByte___get_data__impl__jof9qr($this);
    var tmp$ret$0 = toShort(this_0 & 255);
    return _UShort___init__impl__jigrne(tmp$ret$0);
  }
  function UByte__toUInt_impl_qgytr9($this) {
    return _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr($this) & 255);
  }
  function UByte__toULong_impl_jl2e5o($this) {
    return _ULong___init__impl__c78o9k(toLong(_UByte___get_data__impl__jof9qr($this)).and_4spn93_k$(new Long(255, 0)));
  }
  function UByte__toFloat_impl_ogkoa1($this) {
    // Inline function 'kotlin.UByte.toInt' call
    return _UByte___get_data__impl__jof9qr($this) & 255;
  }
  function UByte__toDouble_impl_2n4zfg($this) {
    // Inline function 'kotlin.UByte.toInt' call
    return _UByte___get_data__impl__jof9qr($this) & 255;
  }
  function UByte__toString_impl_v72jg($this) {
    // Inline function 'kotlin.UByte.toInt' call
    return (_UByte___get_data__impl__jof9qr($this) & 255).toString();
  }
  function UByte__hashCode_impl_mmczcb($this) {
    return $this;
  }
  function UByte__equals_impl_nvqtsf($this, other) {
    if (!(other instanceof UByte))
      return false;
    if (!($this === (other instanceof UByte ? other.data_1 : THROW_CCE())))
      return false;
    return true;
  }
  function UByte(data) {
    Companion_getInstance_16();
    this.data_1 = data;
  }
  protoOf(UByte).compareTo_ubn76t_k$ = function (other) {
    return UByte__compareTo_impl_5w5192(this.data_1, other);
  };
  protoOf(UByte).compareTo_hpufkf_k$ = function (other) {
    return UByte__compareTo_impl_5w5192_0(this, other);
  };
  protoOf(UByte).toString = function () {
    return UByte__toString_impl_v72jg(this.data_1);
  };
  protoOf(UByte).hashCode = function () {
    return UByte__hashCode_impl_mmczcb(this.data_1);
  };
  protoOf(UByte).equals = function (other) {
    return UByte__equals_impl_nvqtsf(this.data_1, other);
  };
  function toUByte(_this__u8e3s4) {
    return _UByte___init__impl__g9hnc4(toByte(_this__u8e3s4));
  }
  function toUByte_0(_this__u8e3s4) {
    return _UByte___init__impl__g9hnc4(toByte(_this__u8e3s4));
  }
  function toUByte_1(_this__u8e3s4) {
    return _UByte___init__impl__g9hnc4(_this__u8e3s4.toByte_edm0nx_k$());
  }
  function toUByte_2(_this__u8e3s4) {
    return _UByte___init__impl__g9hnc4(_this__u8e3s4);
  }
  function _get_array__jslnqg_0($this) {
    return $this.array_1;
  }
  function _set_index__fyfqnn_1($this, _set____db54di) {
    $this.index_1 = _set____db54di;
  }
  function _get_index__g2optt_2($this) {
    return $this.index_1;
  }
  function _UByteArray___init__impl__ip4y9n(storage) {
    return storage;
  }
  function _UByteArray___get_storage__impl__d4kctt($this) {
    return $this;
  }
  function _UByteArray___init__impl__ip4y9n_0(size) {
    return _UByteArray___init__impl__ip4y9n(new Int8Array(size));
  }
  function UByteArray__get_impl_t5f3hv($this, index) {
    // Inline function 'kotlin.toUByte' call
    var this_0 = _UByteArray___get_storage__impl__d4kctt($this)[index];
    return _UByte___init__impl__g9hnc4(this_0);
  }
  function UByteArray__set_impl_jvcicn($this, index, value) {
    var tmp = _UByteArray___get_storage__impl__d4kctt($this);
    // Inline function 'kotlin.UByte.toByte' call
    tmp[index] = _UByte___get_data__impl__jof9qr(value);
  }
  function _UByteArray___get_size__impl__h6pkdv($this) {
    return _UByteArray___get_storage__impl__d4kctt($this).length;
  }
  function UByteArray__iterator_impl_509y1p($this) {
    return new Iterator_0(_UByteArray___get_storage__impl__d4kctt($this));
  }
  function Iterator_0(array) {
    this.array_1 = array;
    this.index_1 = 0;
  }
  protoOf(Iterator_0).hasNext_bitz1p_k$ = function () {
    return this.index_1 < this.array_1.length;
  };
  protoOf(Iterator_0).next_mib1ya_k$ = function () {
    var tmp;
    if (this.index_1 < this.array_1.length) {
      // Inline function 'kotlin.toUByte' call
      var tmp1 = this.index_1;
      this.index_1 = tmp1 + 1 | 0;
      var this_0 = this.array_1[tmp1];
      tmp = _UByte___init__impl__g9hnc4(this_0);
    } else {
      throw NoSuchElementException_init_$Create$_0(this.index_1.toString());
    }
    return tmp;
  };
  protoOf(Iterator_0).next_20eer_k$ = function () {
    return new UByte(this.next_mib1ya_k$());
  };
  function UByteArray__contains_impl_njh19q($this, element) {
    var tmp = !(new UByte(element) == null) ? new UByte(element) : THROW_CCE();
    if (!(tmp instanceof UByte))
      return false;
    var tmp_0 = _UByteArray___get_storage__impl__d4kctt($this);
    // Inline function 'kotlin.UByte.toByte' call
    var tmp$ret$0 = _UByte___get_data__impl__jof9qr(element);
    return contains_1(tmp_0, tmp$ret$0);
  }
  function UByteArray__contains_impl_njh19q_0($this, element) {
    if (!(element instanceof UByte))
      return false;
    return UByteArray__contains_impl_njh19q($this.storage_1, element instanceof UByte ? element.data_1 : THROW_CCE());
  }
  function UByteArray__containsAll_impl_v9s6dj($this, elements) {
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlin.collections.all' call
      var this_0 = isInterface(elements, Collection) ? elements : THROW_CCE();
      var tmp;
      if (isInterface(this_0, Collection)) {
        tmp = this_0.isEmpty_y1axqb_k$();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = true;
        break $l$block_0;
      }
      var tmp0_iterator = this_0.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'kotlin.UByteArray.containsAll.<anonymous>' call
        var tmp_0;
        if (element instanceof UByte) {
          var tmp_1 = _UByteArray___get_storage__impl__d4kctt($this);
          // Inline function 'kotlin.UByte.toByte' call
          var this_1 = element.data_1;
          var tmp$ret$1 = _UByte___get_data__impl__jof9qr(this_1);
          tmp_0 = contains_1(tmp_1, tmp$ret$1);
        } else {
          tmp_0 = false;
        }
        if (!tmp_0) {
          tmp$ret$0 = false;
          break $l$block_0;
        }
      }
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  }
  function UByteArray__containsAll_impl_v9s6dj_0($this, elements) {
    return UByteArray__containsAll_impl_v9s6dj($this.storage_1, elements);
  }
  function UByteArray__isEmpty_impl_nbfqsa($this) {
    return _UByteArray___get_storage__impl__d4kctt($this).length === 0;
  }
  function UByteArray__toString_impl_ukpl97($this) {
    return 'UByteArray(storage=' + toString_2($this) + ')';
  }
  function UByteArray__hashCode_impl_ip8jx2($this) {
    return hashCode($this);
  }
  function UByteArray__equals_impl_roka4u($this, other) {
    if (!(other instanceof UByteArray))
      return false;
    var tmp0_other_with_cast = other instanceof UByteArray ? other.storage_1 : THROW_CCE();
    if (!equals($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function UByteArray(storage) {
    this.storage_1 = storage;
  }
  protoOf(UByteArray).get_size_woubt6_k$ = function () {
    return _UByteArray___get_size__impl__h6pkdv(this.storage_1);
  };
  protoOf(UByteArray).iterator_jk1svi_k$ = function () {
    return UByteArray__iterator_impl_509y1p(this.storage_1);
  };
  protoOf(UByteArray).contains_h1c0bq_k$ = function (element) {
    return UByteArray__contains_impl_njh19q(this.storage_1, element);
  };
  protoOf(UByteArray).contains_aljjnj_k$ = function (element) {
    return UByteArray__contains_impl_njh19q_0(this, element);
  };
  protoOf(UByteArray).containsAll_fivw2r_k$ = function (elements) {
    return UByteArray__containsAll_impl_v9s6dj(this.storage_1, elements);
  };
  protoOf(UByteArray).containsAll_xk45sd_k$ = function (elements) {
    return UByteArray__containsAll_impl_v9s6dj_0(this, elements);
  };
  protoOf(UByteArray).isEmpty_y1axqb_k$ = function () {
    return UByteArray__isEmpty_impl_nbfqsa(this.storage_1);
  };
  protoOf(UByteArray).toString = function () {
    return UByteArray__toString_impl_ukpl97(this.storage_1);
  };
  protoOf(UByteArray).hashCode = function () {
    return UByteArray__hashCode_impl_ip8jx2(this.storage_1);
  };
  protoOf(UByteArray).equals = function (other) {
    return UByteArray__equals_impl_roka4u(this.storage_1, other);
  };
  function _UInt___init__impl__l7qpdl(data) {
    return data;
  }
  function _UInt___get_data__impl__f0vqqw($this) {
    return $this;
  }
  function Companion_17() {
    Companion_instance_17 = this;
    this.MIN_VALUE_1 = _UInt___init__impl__l7qpdl(0);
    this.MAX_VALUE_1 = _UInt___init__impl__l7qpdl(-1);
    this.SIZE_BYTES_1 = 4;
    this.SIZE_BITS_1 = 32;
  }
  protoOf(Companion_17).get_MIN_VALUE_9zjqdd_k$ = function () {
    return this.MIN_VALUE_1;
  };
  protoOf(Companion_17).get_MAX_VALUE_bmdakz_k$ = function () {
    return this.MAX_VALUE_1;
  };
  protoOf(Companion_17).get_SIZE_BYTES_qphg4q_k$ = function () {
    return this.SIZE_BYTES_1;
  };
  protoOf(Companion_17).get_SIZE_BITS_7qhjj9_k$ = function () {
    return this.SIZE_BITS_1;
  };
  var Companion_instance_17;
  function Companion_getInstance_17() {
    if (Companion_instance_17 == null)
      new Companion_17();
    return Companion_instance_17;
  }
  function UInt__compareTo_impl_yacclj($this, other) {
    // Inline function 'kotlin.UInt.compareTo' call
    // Inline function 'kotlin.UByte.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(other) & 255);
    return uintCompare(_UInt___get_data__impl__f0vqqw($this), _UInt___get_data__impl__f0vqqw(other_0));
  }
  function UInt__compareTo_impl_yacclj_0($this, other) {
    // Inline function 'kotlin.UInt.compareTo' call
    // Inline function 'kotlin.UShort.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(other) & 65535);
    return uintCompare(_UInt___get_data__impl__f0vqqw($this), _UInt___get_data__impl__f0vqqw(other_0));
  }
  function UInt__compareTo_impl_yacclj_1($this, other) {
    return uintCompare(_UInt___get_data__impl__f0vqqw($this), _UInt___get_data__impl__f0vqqw(other));
  }
  function UInt__compareTo_impl_yacclj_2($this, other) {
    return UInt__compareTo_impl_yacclj_1($this.data_1, other instanceof UInt ? other.data_1 : THROW_CCE());
  }
  function UInt__compareTo_impl_yacclj_3($this, other) {
    // Inline function 'kotlin.ULong.compareTo' call
    // Inline function 'kotlin.UInt.toULong' call
    var this_0 = _ULong___init__impl__c78o9k(toLong(_UInt___get_data__impl__f0vqqw($this)).and_4spn93_k$(new Long(-1, 0)));
    return ulongCompare(_ULong___get_data__impl__fggpzb(this_0), _ULong___get_data__impl__fggpzb(other));
  }
  function UInt__plus_impl_gmhu6f($this, other) {
    // Inline function 'kotlin.UInt.plus' call
    // Inline function 'kotlin.UByte.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(other) & 255);
    return _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw($this) + _UInt___get_data__impl__f0vqqw(other_0) | 0);
  }
  function UInt__plus_impl_gmhu6f_0($this, other) {
    // Inline function 'kotlin.UInt.plus' call
    // Inline function 'kotlin.UShort.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(other) & 65535);
    return _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw($this) + _UInt___get_data__impl__f0vqqw(other_0) | 0);
  }
  function UInt__plus_impl_gmhu6f_1($this, other) {
    return _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw($this) + _UInt___get_data__impl__f0vqqw(other) | 0);
  }
  function UInt__plus_impl_gmhu6f_2($this, other) {
    // Inline function 'kotlin.ULong.plus' call
    // Inline function 'kotlin.UInt.toULong' call
    var this_0 = _ULong___init__impl__c78o9k(toLong(_UInt___get_data__impl__f0vqqw($this)).and_4spn93_k$(new Long(-1, 0)));
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_0).plus_r93sks_k$(_ULong___get_data__impl__fggpzb(other)));
  }
  function UInt__minus_impl_c4dy1j($this, other) {
    // Inline function 'kotlin.UInt.minus' call
    // Inline function 'kotlin.UByte.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(other) & 255);
    return _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw($this) - _UInt___get_data__impl__f0vqqw(other_0) | 0);
  }
  function UInt__minus_impl_c4dy1j_0($this, other) {
    // Inline function 'kotlin.UInt.minus' call
    // Inline function 'kotlin.UShort.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(other) & 65535);
    return _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw($this) - _UInt___get_data__impl__f0vqqw(other_0) | 0);
  }
  function UInt__minus_impl_c4dy1j_1($this, other) {
    return _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw($this) - _UInt___get_data__impl__f0vqqw(other) | 0);
  }
  function UInt__minus_impl_c4dy1j_2($this, other) {
    // Inline function 'kotlin.ULong.minus' call
    // Inline function 'kotlin.UInt.toULong' call
    var this_0 = _ULong___init__impl__c78o9k(toLong(_UInt___get_data__impl__f0vqqw($this)).and_4spn93_k$(new Long(-1, 0)));
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_0).minus_mfbszm_k$(_ULong___get_data__impl__fggpzb(other)));
  }
  function UInt__times_impl_9tvds1($this, other) {
    // Inline function 'kotlin.UInt.times' call
    // Inline function 'kotlin.UByte.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(other) & 255);
    return _UInt___init__impl__l7qpdl(imul(_UInt___get_data__impl__f0vqqw($this), _UInt___get_data__impl__f0vqqw(other_0)));
  }
  function UInt__times_impl_9tvds1_0($this, other) {
    // Inline function 'kotlin.UInt.times' call
    // Inline function 'kotlin.UShort.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(other) & 65535);
    return _UInt___init__impl__l7qpdl(imul(_UInt___get_data__impl__f0vqqw($this), _UInt___get_data__impl__f0vqqw(other_0)));
  }
  function UInt__times_impl_9tvds1_1($this, other) {
    return _UInt___init__impl__l7qpdl(imul(_UInt___get_data__impl__f0vqqw($this), _UInt___get_data__impl__f0vqqw(other)));
  }
  function UInt__times_impl_9tvds1_2($this, other) {
    // Inline function 'kotlin.ULong.times' call
    // Inline function 'kotlin.UInt.toULong' call
    var this_0 = _ULong___init__impl__c78o9k(toLong(_UInt___get_data__impl__f0vqqw($this)).and_4spn93_k$(new Long(-1, 0)));
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_0).times_nfzjiw_k$(_ULong___get_data__impl__fggpzb(other)));
  }
  function UInt__div_impl_xkbbl6($this, other) {
    // Inline function 'kotlin.UInt.div' call
    // Inline function 'kotlin.UByte.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(other) & 255);
    return uintDivide($this, other_0);
  }
  function UInt__div_impl_xkbbl6_0($this, other) {
    // Inline function 'kotlin.UInt.div' call
    // Inline function 'kotlin.UShort.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(other) & 65535);
    return uintDivide($this, other_0);
  }
  function UInt__div_impl_xkbbl6_1($this, other) {
    return uintDivide($this, other);
  }
  function UInt__div_impl_xkbbl6_2($this, other) {
    // Inline function 'kotlin.ULong.div' call
    // Inline function 'kotlin.UInt.toULong' call
    var this_0 = _ULong___init__impl__c78o9k(toLong(_UInt___get_data__impl__f0vqqw($this)).and_4spn93_k$(new Long(-1, 0)));
    return ulongDivide(this_0, other);
  }
  function UInt__rem_impl_muzcx9($this, other) {
    // Inline function 'kotlin.UInt.rem' call
    // Inline function 'kotlin.UByte.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(other) & 255);
    return uintRemainder($this, other_0);
  }
  function UInt__rem_impl_muzcx9_0($this, other) {
    // Inline function 'kotlin.UInt.rem' call
    // Inline function 'kotlin.UShort.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(other) & 65535);
    return uintRemainder($this, other_0);
  }
  function UInt__rem_impl_muzcx9_1($this, other) {
    return uintRemainder($this, other);
  }
  function UInt__rem_impl_muzcx9_2($this, other) {
    // Inline function 'kotlin.ULong.rem' call
    // Inline function 'kotlin.UInt.toULong' call
    var this_0 = _ULong___init__impl__c78o9k(toLong(_UInt___get_data__impl__f0vqqw($this)).and_4spn93_k$(new Long(-1, 0)));
    return ulongRemainder(this_0, other);
  }
  function UInt__floorDiv_impl_hg5qxa($this, other) {
    // Inline function 'kotlin.UInt.floorDiv' call
    // Inline function 'kotlin.UByte.toUInt' call
    // Inline function 'kotlin.UInt.div' call
    var other_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(other) & 255);
    return uintDivide($this, other_0);
  }
  function UInt__floorDiv_impl_hg5qxa_0($this, other) {
    // Inline function 'kotlin.UInt.floorDiv' call
    // Inline function 'kotlin.UShort.toUInt' call
    // Inline function 'kotlin.UInt.div' call
    var other_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(other) & 65535);
    return uintDivide($this, other_0);
  }
  function UInt__floorDiv_impl_hg5qxa_1($this, other) {
    // Inline function 'kotlin.UInt.div' call
    return uintDivide($this, other);
  }
  function UInt__floorDiv_impl_hg5qxa_2($this, other) {
    // Inline function 'kotlin.ULong.floorDiv' call
    // Inline function 'kotlin.UInt.toULong' call
    // Inline function 'kotlin.ULong.div' call
    var this_0 = _ULong___init__impl__c78o9k(toLong(_UInt___get_data__impl__f0vqqw($this)).and_4spn93_k$(new Long(-1, 0)));
    return ulongDivide(this_0, other);
  }
  function UInt__mod_impl_l9f8at($this, other) {
    // Inline function 'kotlin.UInt.toUByte' call
    // Inline function 'kotlin.UInt.mod' call
    // Inline function 'kotlin.UByte.toUInt' call
    // Inline function 'kotlin.UInt.rem' call
    var other_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(other) & 255);
    var this_0 = uintRemainder($this, other_0);
    // Inline function 'kotlin.toUByte' call
    var this_1 = _UInt___get_data__impl__f0vqqw(this_0);
    return _UByte___init__impl__g9hnc4(toByte(this_1));
  }
  function UInt__mod_impl_l9f8at_0($this, other) {
    // Inline function 'kotlin.UInt.toUShort' call
    // Inline function 'kotlin.UInt.mod' call
    // Inline function 'kotlin.UShort.toUInt' call
    // Inline function 'kotlin.UInt.rem' call
    var other_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(other) & 65535);
    var this_0 = uintRemainder($this, other_0);
    // Inline function 'kotlin.toUShort' call
    var this_1 = _UInt___get_data__impl__f0vqqw(this_0);
    return _UShort___init__impl__jigrne(toShort(this_1));
  }
  function UInt__mod_impl_l9f8at_1($this, other) {
    // Inline function 'kotlin.UInt.rem' call
    return uintRemainder($this, other);
  }
  function UInt__mod_impl_l9f8at_2($this, other) {
    // Inline function 'kotlin.ULong.mod' call
    // Inline function 'kotlin.UInt.toULong' call
    // Inline function 'kotlin.ULong.rem' call
    var this_0 = _ULong___init__impl__c78o9k(toLong(_UInt___get_data__impl__f0vqqw($this)).and_4spn93_k$(new Long(-1, 0)));
    return ulongRemainder(this_0, other);
  }
  function UInt__inc_impl_wvpje1($this) {
    return _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw($this) + 1 | 0);
  }
  function UInt__dec_impl_u8n7zv($this) {
    return _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw($this) - 1 | 0);
  }
  function UInt__rangeTo_impl_en5yc1($this, other) {
    return new UIntRange($this, other);
  }
  function UInt__rangeUntil_impl_vivsfi($this, other) {
    return until_16($this, other);
  }
  function UInt__shl_impl_o7n0a8($this, bitCount) {
    return _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw($this) << bitCount);
  }
  function UInt__shr_impl_r1wqne($this, bitCount) {
    return _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw($this) >>> bitCount | 0);
  }
  function UInt__and_impl_fv3j80($this, other) {
    return _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw($this) & _UInt___get_data__impl__f0vqqw(other));
  }
  function UInt__or_impl_nrzdg0($this, other) {
    return _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw($this) | _UInt___get_data__impl__f0vqqw(other));
  }
  function UInt__xor_impl_a7n4dw($this, other) {
    return _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw($this) ^ _UInt___get_data__impl__f0vqqw(other));
  }
  function UInt__inv_impl_t5jp3e($this) {
    return _UInt___init__impl__l7qpdl(~_UInt___get_data__impl__f0vqqw($this));
  }
  function UInt__toByte_impl_enbcz4($this) {
    return toByte(_UInt___get_data__impl__f0vqqw($this));
  }
  function UInt__toShort_impl_776xra($this) {
    return toShort(_UInt___get_data__impl__f0vqqw($this));
  }
  function UInt__toInt_impl_93yt4d($this) {
    return _UInt___get_data__impl__f0vqqw($this);
  }
  function UInt__toLong_impl_le5rq4($this) {
    return toLong(_UInt___get_data__impl__f0vqqw($this)).and_4spn93_k$(new Long(-1, 0));
  }
  function UInt__toUByte_impl_qgjpt1($this) {
    // Inline function 'kotlin.toUByte' call
    var this_0 = _UInt___get_data__impl__f0vqqw($this);
    return _UByte___init__impl__g9hnc4(toByte(this_0));
  }
  function UInt__toUShort_impl_2yxcfl($this) {
    // Inline function 'kotlin.toUShort' call
    var this_0 = _UInt___get_data__impl__f0vqqw($this);
    return _UShort___init__impl__jigrne(toShort(this_0));
  }
  function UInt__toUInt_impl_cu5oym($this) {
    return $this;
  }
  function UInt__toULong_impl_8j37gv($this) {
    return _ULong___init__impl__c78o9k(toLong(_UInt___get_data__impl__f0vqqw($this)).and_4spn93_k$(new Long(-1, 0)));
  }
  function UInt__toFloat_impl_zijuyu($this) {
    // Inline function 'kotlin.UInt.toDouble' call
    return uintToDouble(_UInt___get_data__impl__f0vqqw($this));
  }
  function UInt__toDouble_impl_f3ehy1($this) {
    return uintToDouble(_UInt___get_data__impl__f0vqqw($this));
  }
  function UInt__toString_impl_dbgl21($this) {
    // Inline function 'kotlin.UInt.toLong' call
    return toLong(_UInt___get_data__impl__f0vqqw($this)).and_4spn93_k$(new Long(-1, 0)).toString();
  }
  function UInt__hashCode_impl_z2mhuw($this) {
    return $this;
  }
  function UInt__equals_impl_ffdoxg($this, other) {
    if (!(other instanceof UInt))
      return false;
    if (!($this === (other instanceof UInt ? other.data_1 : THROW_CCE())))
      return false;
    return true;
  }
  function UInt(data) {
    Companion_getInstance_17();
    this.data_1 = data;
  }
  protoOf(UInt).compareTo_xshxy3_k$ = function (other) {
    return UInt__compareTo_impl_yacclj_1(this.data_1, other);
  };
  protoOf(UInt).compareTo_hpufkf_k$ = function (other) {
    return UInt__compareTo_impl_yacclj_2(this, other);
  };
  protoOf(UInt).toString = function () {
    return UInt__toString_impl_dbgl21(this.data_1);
  };
  protoOf(UInt).hashCode = function () {
    return UInt__hashCode_impl_z2mhuw(this.data_1);
  };
  protoOf(UInt).equals = function (other) {
    return UInt__equals_impl_ffdoxg(this.data_1, other);
  };
  function toUInt(_this__u8e3s4) {
    return _UInt___init__impl__l7qpdl(_this__u8e3s4.toInt_1tsl84_k$());
  }
  function toUInt_0(_this__u8e3s4) {
    return _UInt___init__impl__l7qpdl(_this__u8e3s4);
  }
  function toUInt_1(_this__u8e3s4) {
    return _UInt___init__impl__l7qpdl(_this__u8e3s4);
  }
  function toUInt_2(_this__u8e3s4) {
    return doubleToUInt(_this__u8e3s4);
  }
  function toUInt_3(_this__u8e3s4) {
    return doubleToUInt(_this__u8e3s4);
  }
  function toUInt_4(_this__u8e3s4) {
    return _UInt___init__impl__l7qpdl(_this__u8e3s4);
  }
  function _get_array__jslnqg_1($this) {
    return $this.array_1;
  }
  function _set_index__fyfqnn_2($this, _set____db54di) {
    $this.index_1 = _set____db54di;
  }
  function _get_index__g2optt_3($this) {
    return $this.index_1;
  }
  function _UIntArray___init__impl__ghjpc6(storage) {
    return storage;
  }
  function _UIntArray___get_storage__impl__92a0v0($this) {
    return $this;
  }
  function _UIntArray___init__impl__ghjpc6_0(size) {
    return _UIntArray___init__impl__ghjpc6(new Int32Array(size));
  }
  function UIntArray__get_impl_gp5kza($this, index) {
    // Inline function 'kotlin.toUInt' call
    var this_0 = _UIntArray___get_storage__impl__92a0v0($this)[index];
    return _UInt___init__impl__l7qpdl(this_0);
  }
  function UIntArray__set_impl_7f2zu2($this, index, value) {
    var tmp = _UIntArray___get_storage__impl__92a0v0($this);
    // Inline function 'kotlin.UInt.toInt' call
    tmp[index] = _UInt___get_data__impl__f0vqqw(value);
  }
  function _UIntArray___get_size__impl__r6l8ci($this) {
    return _UIntArray___get_storage__impl__92a0v0($this).length;
  }
  function UIntArray__iterator_impl_tkdv7k($this) {
    return new Iterator_1(_UIntArray___get_storage__impl__92a0v0($this));
  }
  function Iterator_1(array) {
    this.array_1 = array;
    this.index_1 = 0;
  }
  protoOf(Iterator_1).hasNext_bitz1p_k$ = function () {
    return this.index_1 < this.array_1.length;
  };
  protoOf(Iterator_1).next_30mexz_k$ = function () {
    var tmp;
    if (this.index_1 < this.array_1.length) {
      // Inline function 'kotlin.toUInt' call
      var tmp1 = this.index_1;
      this.index_1 = tmp1 + 1 | 0;
      var this_0 = this.array_1[tmp1];
      tmp = _UInt___init__impl__l7qpdl(this_0);
    } else {
      throw NoSuchElementException_init_$Create$_0(this.index_1.toString());
    }
    return tmp;
  };
  protoOf(Iterator_1).next_20eer_k$ = function () {
    return new UInt(this.next_30mexz_k$());
  };
  function UIntArray__contains_impl_b16rzj($this, element) {
    var tmp = !(new UInt(element) == null) ? new UInt(element) : THROW_CCE();
    if (!(tmp instanceof UInt))
      return false;
    var tmp_0 = _UIntArray___get_storage__impl__92a0v0($this);
    // Inline function 'kotlin.UInt.toInt' call
    var tmp$ret$0 = _UInt___get_data__impl__f0vqqw(element);
    return contains_3(tmp_0, tmp$ret$0);
  }
  function UIntArray__contains_impl_b16rzj_0($this, element) {
    if (!(element instanceof UInt))
      return false;
    return UIntArray__contains_impl_b16rzj($this.storage_1, element instanceof UInt ? element.data_1 : THROW_CCE());
  }
  function UIntArray__containsAll_impl_414g22($this, elements) {
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlin.collections.all' call
      var this_0 = isInterface(elements, Collection) ? elements : THROW_CCE();
      var tmp;
      if (isInterface(this_0, Collection)) {
        tmp = this_0.isEmpty_y1axqb_k$();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = true;
        break $l$block_0;
      }
      var tmp0_iterator = this_0.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'kotlin.UIntArray.containsAll.<anonymous>' call
        var tmp_0;
        if (element instanceof UInt) {
          var tmp_1 = _UIntArray___get_storage__impl__92a0v0($this);
          // Inline function 'kotlin.UInt.toInt' call
          var this_1 = element.data_1;
          var tmp$ret$1 = _UInt___get_data__impl__f0vqqw(this_1);
          tmp_0 = contains_3(tmp_1, tmp$ret$1);
        } else {
          tmp_0 = false;
        }
        if (!tmp_0) {
          tmp$ret$0 = false;
          break $l$block_0;
        }
      }
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  }
  function UIntArray__containsAll_impl_414g22_0($this, elements) {
    return UIntArray__containsAll_impl_414g22($this.storage_1, elements);
  }
  function UIntArray__isEmpty_impl_vd8j4n($this) {
    return _UIntArray___get_storage__impl__92a0v0($this).length === 0;
  }
  function UIntArray__toString_impl_3zy802($this) {
    return 'UIntArray(storage=' + toString_2($this) + ')';
  }
  function UIntArray__hashCode_impl_hr7ost($this) {
    return hashCode($this);
  }
  function UIntArray__equals_impl_flcmof($this, other) {
    if (!(other instanceof UIntArray))
      return false;
    var tmp0_other_with_cast = other instanceof UIntArray ? other.storage_1 : THROW_CCE();
    if (!equals($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function UIntArray(storage) {
    this.storage_1 = storage;
  }
  protoOf(UIntArray).get_size_woubt6_k$ = function () {
    return _UIntArray___get_size__impl__r6l8ci(this.storage_1);
  };
  protoOf(UIntArray).iterator_jk1svi_k$ = function () {
    return UIntArray__iterator_impl_tkdv7k(this.storage_1);
  };
  protoOf(UIntArray).contains_of2a8q_k$ = function (element) {
    return UIntArray__contains_impl_b16rzj(this.storage_1, element);
  };
  protoOf(UIntArray).contains_aljjnj_k$ = function (element) {
    return UIntArray__contains_impl_b16rzj_0(this, element);
  };
  protoOf(UIntArray).containsAll_tt2ity_k$ = function (elements) {
    return UIntArray__containsAll_impl_414g22(this.storage_1, elements);
  };
  protoOf(UIntArray).containsAll_xk45sd_k$ = function (elements) {
    return UIntArray__containsAll_impl_414g22_0(this, elements);
  };
  protoOf(UIntArray).isEmpty_y1axqb_k$ = function () {
    return UIntArray__isEmpty_impl_vd8j4n(this.storage_1);
  };
  protoOf(UIntArray).toString = function () {
    return UIntArray__toString_impl_3zy802(this.storage_1);
  };
  protoOf(UIntArray).hashCode = function () {
    return UIntArray__hashCode_impl_hr7ost(this.storage_1);
  };
  protoOf(UIntArray).equals = function (other) {
    return UIntArray__equals_impl_flcmof(this.storage_1, other);
  };
  function Companion_18() {
    Companion_instance_18 = this;
    var tmp = this;
    Companion_getInstance_17();
    var tmp_0 = _UInt___init__impl__l7qpdl(-1);
    Companion_getInstance_17();
    tmp.EMPTY_1 = new UIntRange(tmp_0, _UInt___init__impl__l7qpdl(0));
  }
  protoOf(Companion_18).get_EMPTY_i8q41w_k$ = function () {
    return this.EMPTY_1;
  };
  var Companion_instance_18;
  function Companion_getInstance_18() {
    if (Companion_instance_18 == null)
      new Companion_18();
    return Companion_instance_18;
  }
  function UIntRange(start, endInclusive) {
    Companion_getInstance_18();
    UIntProgression.call(this, start, endInclusive, 1);
  }
  protoOf(UIntRange).get_start_qjwd9b_k$ = function () {
    return this.first_1;
  };
  protoOf(UIntRange).get_start_iypx6h_k$ = function () {
    return new UInt(this.get_start_qjwd9b_k$());
  };
  protoOf(UIntRange).get_endInclusive_onm2dc_k$ = function () {
    return this.last_1;
  };
  protoOf(UIntRange).get_endInclusive_r07xpi_k$ = function () {
    return new UInt(this.get_endInclusive_onm2dc_k$());
  };
  protoOf(UIntRange).get_endExclusive_un786q_k$ = function () {
    Companion_getInstance_17();
    if (this.last_1 === _UInt___init__impl__l7qpdl(-1)) {
      // Inline function 'kotlin.error' call
      var message = 'Cannot return the exclusive upper bound of a range that includes MAX_VALUE.';
      throw IllegalStateException_init_$Create$_0(toString_2(message));
    }
    // Inline function 'kotlin.UInt.plus' call
    var this_0 = this.last_1;
    var other = _UInt___init__impl__l7qpdl(1);
    return _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(this_0) + _UInt___get_data__impl__f0vqqw(other) | 0);
  };
  protoOf(UIntRange).get_endExclusive_pmwm6k_k$ = function () {
    return new UInt(this.get_endExclusive_un786q_k$());
  };
  protoOf(UIntRange).contains_of2a8q_k$ = function (value) {
    var tmp;
    // Inline function 'kotlin.UInt.compareTo' call
    var this_0 = this.first_1;
    if (uintCompare(_UInt___get_data__impl__f0vqqw(this_0), _UInt___get_data__impl__f0vqqw(value)) <= 0) {
      // Inline function 'kotlin.UInt.compareTo' call
      var other = this.last_1;
      tmp = uintCompare(_UInt___get_data__impl__f0vqqw(value), _UInt___get_data__impl__f0vqqw(other)) <= 0;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(UIntRange).contains_3tkdvy_k$ = function (value) {
    return this.contains_of2a8q_k$(value instanceof UInt ? value.data_1 : THROW_CCE());
  };
  protoOf(UIntRange).isEmpty_y1axqb_k$ = function () {
    // Inline function 'kotlin.UInt.compareTo' call
    var this_0 = this.first_1;
    var other = this.last_1;
    return uintCompare(_UInt___get_data__impl__f0vqqw(this_0), _UInt___get_data__impl__f0vqqw(other)) > 0;
  };
  protoOf(UIntRange).equals = function (other) {
    var tmp;
    if (other instanceof UIntRange) {
      tmp = (this.isEmpty_y1axqb_k$() ? other.isEmpty_y1axqb_k$() : false) ? true : this.first_1 === other.first_1 ? this.last_1 === other.last_1 : false;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(UIntRange).hashCode = function () {
    var tmp;
    if (this.isEmpty_y1axqb_k$()) {
      tmp = -1;
    } else {
      // Inline function 'kotlin.UInt.toInt' call
      var this_0 = this.first_1;
      var tmp$ret$0 = _UInt___get_data__impl__f0vqqw(this_0);
      var tmp_0 = imul(31, tmp$ret$0);
      // Inline function 'kotlin.UInt.toInt' call
      var this_1 = this.last_1;
      tmp = tmp_0 + _UInt___get_data__impl__f0vqqw(this_1) | 0;
    }
    return tmp;
  };
  protoOf(UIntRange).toString = function () {
    return '' + new UInt(this.first_1) + '..' + new UInt(this.last_1);
  };
  function Companion_19() {
    Companion_instance_19 = this;
  }
  protoOf(Companion_19).fromClosedRange_cp9k1d_k$ = function (rangeStart, rangeEnd, step) {
    return new UIntProgression(rangeStart, rangeEnd, step);
  };
  var Companion_instance_19;
  function Companion_getInstance_19() {
    if (Companion_instance_19 == null)
      new Companion_19();
    return Companion_instance_19;
  }
  function UIntProgression(start, endInclusive, step) {
    Companion_getInstance_19();
    if (step === 0)
      throw IllegalArgumentException_init_$Create$_0('Step must be non-zero.');
    if (step === IntCompanionObject_getInstance().MIN_VALUE)
      throw IllegalArgumentException_init_$Create$_0('Step must be greater than Int.MIN_VALUE to avoid overflow on negation.');
    this.first_1 = start;
    this.last_1 = getProgressionLastElement_1(start, endInclusive, step);
    this.step_1 = step;
  }
  protoOf(UIntProgression).get_first_eo0eb1_k$ = function () {
    return this.first_1;
  };
  protoOf(UIntProgression).get_last_rpwfyd_k$ = function () {
    return this.last_1;
  };
  protoOf(UIntProgression).get_step_woujh1_k$ = function () {
    return this.step_1;
  };
  protoOf(UIntProgression).iterator_jk1svi_k$ = function () {
    return new UIntProgressionIterator(this.first_1, this.last_1, this.step_1);
  };
  protoOf(UIntProgression).isEmpty_y1axqb_k$ = function () {
    var tmp;
    if (this.step_1 > 0) {
      // Inline function 'kotlin.UInt.compareTo' call
      var this_0 = this.first_1;
      var other = this.last_1;
      tmp = uintCompare(_UInt___get_data__impl__f0vqqw(this_0), _UInt___get_data__impl__f0vqqw(other)) > 0;
    } else {
      // Inline function 'kotlin.UInt.compareTo' call
      var this_1 = this.first_1;
      var other_0 = this.last_1;
      tmp = uintCompare(_UInt___get_data__impl__f0vqqw(this_1), _UInt___get_data__impl__f0vqqw(other_0)) < 0;
    }
    return tmp;
  };
  protoOf(UIntProgression).equals = function (other) {
    var tmp;
    if (other instanceof UIntProgression) {
      tmp = (this.isEmpty_y1axqb_k$() ? other.isEmpty_y1axqb_k$() : false) ? true : (this.first_1 === other.first_1 ? this.last_1 === other.last_1 : false) ? this.step_1 === other.step_1 : false;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(UIntProgression).hashCode = function () {
    var tmp;
    if (this.isEmpty_y1axqb_k$()) {
      tmp = -1;
    } else {
      // Inline function 'kotlin.UInt.toInt' call
      var this_0 = this.first_1;
      var tmp$ret$0 = _UInt___get_data__impl__f0vqqw(this_0);
      var tmp_0 = imul(31, tmp$ret$0);
      // Inline function 'kotlin.UInt.toInt' call
      var this_1 = this.last_1;
      var tmp$ret$1 = _UInt___get_data__impl__f0vqqw(this_1);
      tmp = imul(31, tmp_0 + tmp$ret$1 | 0) + this.step_1 | 0;
    }
    return tmp;
  };
  protoOf(UIntProgression).toString = function () {
    return this.step_1 > 0 ? '' + new UInt(this.first_1) + '..' + new UInt(this.last_1) + ' step ' + this.step_1 : '' + new UInt(this.first_1) + ' downTo ' + new UInt(this.last_1) + ' step ' + (-this.step_1 | 0);
  };
  function _get_finalElement__gc6m3p_2($this) {
    return $this.finalElement_1;
  }
  function _set_hasNext__86v2bs_2($this, _set____db54di) {
    $this.hasNext_1 = _set____db54di;
  }
  function _get_hasNext__xt3cos_2($this) {
    return $this.hasNext_1;
  }
  function _get_step__ddv2tb($this) {
    return $this.step_1;
  }
  function _set_next__9r2xms_2($this, _set____db54di) {
    $this.next_1 = _set____db54di;
  }
  function _get_next__daux88_2($this) {
    return $this.next_1;
  }
  function UIntProgressionIterator(first, last, step) {
    this.finalElement_1 = last;
    var tmp = this;
    var tmp_0;
    if (step > 0) {
      // Inline function 'kotlin.UInt.compareTo' call
      tmp_0 = uintCompare(_UInt___get_data__impl__f0vqqw(first), _UInt___get_data__impl__f0vqqw(last)) <= 0;
    } else {
      // Inline function 'kotlin.UInt.compareTo' call
      tmp_0 = uintCompare(_UInt___get_data__impl__f0vqqw(first), _UInt___get_data__impl__f0vqqw(last)) >= 0;
    }
    tmp.hasNext_1 = tmp_0;
    var tmp_1 = this;
    // Inline function 'kotlin.toUInt' call
    tmp_1.step_1 = _UInt___init__impl__l7qpdl(step);
    this.next_1 = this.hasNext_1 ? first : this.finalElement_1;
  }
  protoOf(UIntProgressionIterator).hasNext_bitz1p_k$ = function () {
    return this.hasNext_1;
  };
  protoOf(UIntProgressionIterator).next_30mexz_k$ = function () {
    var value = this.next_1;
    if (value === this.finalElement_1) {
      if (!this.hasNext_1)
        throw NoSuchElementException_init_$Create$();
      this.hasNext_1 = false;
    } else {
      var tmp = this;
      // Inline function 'kotlin.UInt.plus' call
      var this_0 = this.next_1;
      var other = this.step_1;
      tmp.next_1 = _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(this_0) + _UInt___get_data__impl__f0vqqw(other) | 0);
    }
    return value;
  };
  protoOf(UIntProgressionIterator).next_20eer_k$ = function () {
    return new UInt(this.next_30mexz_k$());
  };
  function _ULong___init__impl__c78o9k(data) {
    return data;
  }
  function _ULong___get_data__impl__fggpzb($this) {
    return $this;
  }
  function Companion_20() {
    Companion_instance_20 = this;
    this.MIN_VALUE_1 = _ULong___init__impl__c78o9k(new Long(0, 0));
    this.MAX_VALUE_1 = _ULong___init__impl__c78o9k(new Long(-1, -1));
    this.SIZE_BYTES_1 = 8;
    this.SIZE_BITS_1 = 64;
  }
  protoOf(Companion_20).get_MIN_VALUE_phlf8q_k$ = function () {
    return this.MIN_VALUE_1;
  };
  protoOf(Companion_20).get_MAX_VALUE_53xrtk_k$ = function () {
    return this.MAX_VALUE_1;
  };
  protoOf(Companion_20).get_SIZE_BYTES_qphg4q_k$ = function () {
    return this.SIZE_BYTES_1;
  };
  protoOf(Companion_20).get_SIZE_BITS_7qhjj9_k$ = function () {
    return this.SIZE_BITS_1;
  };
  var Companion_instance_20;
  function Companion_getInstance_20() {
    if (Companion_instance_20 == null)
      new Companion_20();
    return Companion_instance_20;
  }
  function ULong__compareTo_impl_38i7tu($this, other) {
    // Inline function 'kotlin.ULong.compareTo' call
    // Inline function 'kotlin.UByte.toULong' call
    var other_0 = _ULong___init__impl__c78o9k(toLong(_UByte___get_data__impl__jof9qr(other)).and_4spn93_k$(new Long(255, 0)));
    return ulongCompare(_ULong___get_data__impl__fggpzb($this), _ULong___get_data__impl__fggpzb(other_0));
  }
  function ULong__compareTo_impl_38i7tu_0($this, other) {
    // Inline function 'kotlin.ULong.compareTo' call
    // Inline function 'kotlin.UShort.toULong' call
    var other_0 = _ULong___init__impl__c78o9k(toLong(_UShort___get_data__impl__g0245(other)).and_4spn93_k$(new Long(65535, 0)));
    return ulongCompare(_ULong___get_data__impl__fggpzb($this), _ULong___get_data__impl__fggpzb(other_0));
  }
  function ULong__compareTo_impl_38i7tu_1($this, other) {
    // Inline function 'kotlin.ULong.compareTo' call
    // Inline function 'kotlin.UInt.toULong' call
    var other_0 = _ULong___init__impl__c78o9k(toLong(_UInt___get_data__impl__f0vqqw(other)).and_4spn93_k$(new Long(-1, 0)));
    return ulongCompare(_ULong___get_data__impl__fggpzb($this), _ULong___get_data__impl__fggpzb(other_0));
  }
  function ULong__compareTo_impl_38i7tu_2($this, other) {
    return ulongCompare(_ULong___get_data__impl__fggpzb($this), _ULong___get_data__impl__fggpzb(other));
  }
  function ULong__compareTo_impl_38i7tu_3($this, other) {
    return ULong__compareTo_impl_38i7tu_2($this.data_1, other instanceof ULong ? other.data_1 : THROW_CCE());
  }
  function ULong__plus_impl_plxuny($this, other) {
    // Inline function 'kotlin.ULong.plus' call
    // Inline function 'kotlin.UByte.toULong' call
    var other_0 = _ULong___init__impl__c78o9k(toLong(_UByte___get_data__impl__jof9qr(other)).and_4spn93_k$(new Long(255, 0)));
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb($this).plus_r93sks_k$(_ULong___get_data__impl__fggpzb(other_0)));
  }
  function ULong__plus_impl_plxuny_0($this, other) {
    // Inline function 'kotlin.ULong.plus' call
    // Inline function 'kotlin.UShort.toULong' call
    var other_0 = _ULong___init__impl__c78o9k(toLong(_UShort___get_data__impl__g0245(other)).and_4spn93_k$(new Long(65535, 0)));
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb($this).plus_r93sks_k$(_ULong___get_data__impl__fggpzb(other_0)));
  }
  function ULong__plus_impl_plxuny_1($this, other) {
    // Inline function 'kotlin.ULong.plus' call
    // Inline function 'kotlin.UInt.toULong' call
    var other_0 = _ULong___init__impl__c78o9k(toLong(_UInt___get_data__impl__f0vqqw(other)).and_4spn93_k$(new Long(-1, 0)));
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb($this).plus_r93sks_k$(_ULong___get_data__impl__fggpzb(other_0)));
  }
  function ULong__plus_impl_plxuny_2($this, other) {
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb($this).plus_r93sks_k$(_ULong___get_data__impl__fggpzb(other)));
  }
  function ULong__minus_impl_hq1qum($this, other) {
    // Inline function 'kotlin.ULong.minus' call
    // Inline function 'kotlin.UByte.toULong' call
    var other_0 = _ULong___init__impl__c78o9k(toLong(_UByte___get_data__impl__jof9qr(other)).and_4spn93_k$(new Long(255, 0)));
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb($this).minus_mfbszm_k$(_ULong___get_data__impl__fggpzb(other_0)));
  }
  function ULong__minus_impl_hq1qum_0($this, other) {
    // Inline function 'kotlin.ULong.minus' call
    // Inline function 'kotlin.UShort.toULong' call
    var other_0 = _ULong___init__impl__c78o9k(toLong(_UShort___get_data__impl__g0245(other)).and_4spn93_k$(new Long(65535, 0)));
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb($this).minus_mfbszm_k$(_ULong___get_data__impl__fggpzb(other_0)));
  }
  function ULong__minus_impl_hq1qum_1($this, other) {
    // Inline function 'kotlin.ULong.minus' call
    // Inline function 'kotlin.UInt.toULong' call
    var other_0 = _ULong___init__impl__c78o9k(toLong(_UInt___get_data__impl__f0vqqw(other)).and_4spn93_k$(new Long(-1, 0)));
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb($this).minus_mfbszm_k$(_ULong___get_data__impl__fggpzb(other_0)));
  }
  function ULong__minus_impl_hq1qum_2($this, other) {
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb($this).minus_mfbszm_k$(_ULong___get_data__impl__fggpzb(other)));
  }
  function ULong__times_impl_ffj6l4($this, other) {
    // Inline function 'kotlin.ULong.times' call
    // Inline function 'kotlin.UByte.toULong' call
    var other_0 = _ULong___init__impl__c78o9k(toLong(_UByte___get_data__impl__jof9qr(other)).and_4spn93_k$(new Long(255, 0)));
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb($this).times_nfzjiw_k$(_ULong___get_data__impl__fggpzb(other_0)));
  }
  function ULong__times_impl_ffj6l4_0($this, other) {
    // Inline function 'kotlin.ULong.times' call
    // Inline function 'kotlin.UShort.toULong' call
    var other_0 = _ULong___init__impl__c78o9k(toLong(_UShort___get_data__impl__g0245(other)).and_4spn93_k$(new Long(65535, 0)));
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb($this).times_nfzjiw_k$(_ULong___get_data__impl__fggpzb(other_0)));
  }
  function ULong__times_impl_ffj6l4_1($this, other) {
    // Inline function 'kotlin.ULong.times' call
    // Inline function 'kotlin.UInt.toULong' call
    var other_0 = _ULong___init__impl__c78o9k(toLong(_UInt___get_data__impl__f0vqqw(other)).and_4spn93_k$(new Long(-1, 0)));
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb($this).times_nfzjiw_k$(_ULong___get_data__impl__fggpzb(other_0)));
  }
  function ULong__times_impl_ffj6l4_2($this, other) {
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb($this).times_nfzjiw_k$(_ULong___get_data__impl__fggpzb(other)));
  }
  function ULong__div_impl_iugpv1($this, other) {
    // Inline function 'kotlin.ULong.div' call
    // Inline function 'kotlin.UByte.toULong' call
    var other_0 = _ULong___init__impl__c78o9k(toLong(_UByte___get_data__impl__jof9qr(other)).and_4spn93_k$(new Long(255, 0)));
    return ulongDivide($this, other_0);
  }
  function ULong__div_impl_iugpv1_0($this, other) {
    // Inline function 'kotlin.ULong.div' call
    // Inline function 'kotlin.UShort.toULong' call
    var other_0 = _ULong___init__impl__c78o9k(toLong(_UShort___get_data__impl__g0245(other)).and_4spn93_k$(new Long(65535, 0)));
    return ulongDivide($this, other_0);
  }
  function ULong__div_impl_iugpv1_1($this, other) {
    // Inline function 'kotlin.ULong.div' call
    // Inline function 'kotlin.UInt.toULong' call
    var other_0 = _ULong___init__impl__c78o9k(toLong(_UInt___get_data__impl__f0vqqw(other)).and_4spn93_k$(new Long(-1, 0)));
    return ulongDivide($this, other_0);
  }
  function ULong__div_impl_iugpv1_2($this, other) {
    return ulongDivide($this, other);
  }
  function ULong__rem_impl_48ncec($this, other) {
    // Inline function 'kotlin.ULong.rem' call
    // Inline function 'kotlin.UByte.toULong' call
    var other_0 = _ULong___init__impl__c78o9k(toLong(_UByte___get_data__impl__jof9qr(other)).and_4spn93_k$(new Long(255, 0)));
    return ulongRemainder($this, other_0);
  }
  function ULong__rem_impl_48ncec_0($this, other) {
    // Inline function 'kotlin.ULong.rem' call
    // Inline function 'kotlin.UShort.toULong' call
    var other_0 = _ULong___init__impl__c78o9k(toLong(_UShort___get_data__impl__g0245(other)).and_4spn93_k$(new Long(65535, 0)));
    return ulongRemainder($this, other_0);
  }
  function ULong__rem_impl_48ncec_1($this, other) {
    // Inline function 'kotlin.ULong.rem' call
    // Inline function 'kotlin.UInt.toULong' call
    var other_0 = _ULong___init__impl__c78o9k(toLong(_UInt___get_data__impl__f0vqqw(other)).and_4spn93_k$(new Long(-1, 0)));
    return ulongRemainder($this, other_0);
  }
  function ULong__rem_impl_48ncec_2($this, other) {
    return ulongRemainder($this, other);
  }
  function ULong__floorDiv_impl_p06vs9($this, other) {
    // Inline function 'kotlin.ULong.floorDiv' call
    // Inline function 'kotlin.UByte.toULong' call
    // Inline function 'kotlin.ULong.div' call
    var other_0 = _ULong___init__impl__c78o9k(toLong(_UByte___get_data__impl__jof9qr(other)).and_4spn93_k$(new Long(255, 0)));
    return ulongDivide($this, other_0);
  }
  function ULong__floorDiv_impl_p06vs9_0($this, other) {
    // Inline function 'kotlin.ULong.floorDiv' call
    // Inline function 'kotlin.UShort.toULong' call
    // Inline function 'kotlin.ULong.div' call
    var other_0 = _ULong___init__impl__c78o9k(toLong(_UShort___get_data__impl__g0245(other)).and_4spn93_k$(new Long(65535, 0)));
    return ulongDivide($this, other_0);
  }
  function ULong__floorDiv_impl_p06vs9_1($this, other) {
    // Inline function 'kotlin.ULong.floorDiv' call
    // Inline function 'kotlin.UInt.toULong' call
    // Inline function 'kotlin.ULong.div' call
    var other_0 = _ULong___init__impl__c78o9k(toLong(_UInt___get_data__impl__f0vqqw(other)).and_4spn93_k$(new Long(-1, 0)));
    return ulongDivide($this, other_0);
  }
  function ULong__floorDiv_impl_p06vs9_2($this, other) {
    // Inline function 'kotlin.ULong.div' call
    return ulongDivide($this, other);
  }
  function ULong__mod_impl_2n37rw($this, other) {
    // Inline function 'kotlin.ULong.toUByte' call
    // Inline function 'kotlin.ULong.mod' call
    // Inline function 'kotlin.UByte.toULong' call
    // Inline function 'kotlin.ULong.rem' call
    var other_0 = _ULong___init__impl__c78o9k(toLong(_UByte___get_data__impl__jof9qr(other)).and_4spn93_k$(new Long(255, 0)));
    var this_0 = ulongRemainder($this, other_0);
    // Inline function 'kotlin.toUByte' call
    var this_1 = _ULong___get_data__impl__fggpzb(this_0);
    return _UByte___init__impl__g9hnc4(this_1.toByte_edm0nx_k$());
  }
  function ULong__mod_impl_2n37rw_0($this, other) {
    // Inline function 'kotlin.ULong.toUShort' call
    // Inline function 'kotlin.ULong.mod' call
    // Inline function 'kotlin.UShort.toULong' call
    // Inline function 'kotlin.ULong.rem' call
    var other_0 = _ULong___init__impl__c78o9k(toLong(_UShort___get_data__impl__g0245(other)).and_4spn93_k$(new Long(65535, 0)));
    var this_0 = ulongRemainder($this, other_0);
    // Inline function 'kotlin.toUShort' call
    var this_1 = _ULong___get_data__impl__fggpzb(this_0);
    return _UShort___init__impl__jigrne(this_1.toShort_ja8oqn_k$());
  }
  function ULong__mod_impl_2n37rw_1($this, other) {
    // Inline function 'kotlin.ULong.toUInt' call
    // Inline function 'kotlin.ULong.mod' call
    // Inline function 'kotlin.UInt.toULong' call
    // Inline function 'kotlin.ULong.rem' call
    var other_0 = _ULong___init__impl__c78o9k(toLong(_UInt___get_data__impl__f0vqqw(other)).and_4spn93_k$(new Long(-1, 0)));
    var this_0 = ulongRemainder($this, other_0);
    // Inline function 'kotlin.toUInt' call
    var this_1 = _ULong___get_data__impl__fggpzb(this_0);
    return _UInt___init__impl__l7qpdl(this_1.toInt_1tsl84_k$());
  }
  function ULong__mod_impl_2n37rw_2($this, other) {
    // Inline function 'kotlin.ULong.rem' call
    return ulongRemainder($this, other);
  }
  function ULong__inc_impl_e9div4($this) {
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb($this).inc_28ke_k$());
  }
  function ULong__dec_impl_m64tgc($this) {
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb($this).dec_24n6_k$());
  }
  function ULong__rangeTo_impl_tre43e($this, other) {
    return new ULongRange($this, other);
  }
  function ULong__rangeUntil_impl_crpjx7($this, other) {
    return until_17($this, other);
  }
  function ULong__shl_impl_5lazrb($this, bitCount) {
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb($this).shl_bg8if3_k$(bitCount));
  }
  function ULong__shr_impl_8fkq4h($this, bitCount) {
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb($this).ushr_z7nmq8_k$(bitCount));
  }
  function ULong__and_impl_2r8hax($this, other) {
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb($this).and_4spn93_k$(_ULong___get_data__impl__fggpzb(other)));
  }
  function ULong__or_impl_mne2xz($this, other) {
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb($this).or_v7fvkl_k$(_ULong___get_data__impl__fggpzb(other)));
  }
  function ULong__xor_impl_stz4wt($this, other) {
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb($this).xor_qzz94j_k$(_ULong___get_data__impl__fggpzb(other)));
  }
  function ULong__inv_impl_n98cct($this) {
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb($this).inv_28kx_k$());
  }
  function ULong__toByte_impl_gxyc49($this) {
    return _ULong___get_data__impl__fggpzb($this).toByte_edm0nx_k$();
  }
  function ULong__toShort_impl_7x1803($this) {
    return _ULong___get_data__impl__fggpzb($this).toShort_ja8oqn_k$();
  }
  function ULong__toInt_impl_3ib0ba($this) {
    return _ULong___get_data__impl__fggpzb($this).toInt_1tsl84_k$();
  }
  function ULong__toLong_impl_i1ol5n($this) {
    return _ULong___get_data__impl__fggpzb($this);
  }
  function ULong__toUByte_impl_bcbk1o($this) {
    // Inline function 'kotlin.toUByte' call
    var this_0 = _ULong___get_data__impl__fggpzb($this);
    return _UByte___init__impl__g9hnc4(this_0.toByte_edm0nx_k$());
  }
  function ULong__toUShort_impl_vjorp6($this) {
    // Inline function 'kotlin.toUShort' call
    var this_0 = _ULong___get_data__impl__fggpzb($this);
    return _UShort___init__impl__jigrne(this_0.toShort_ja8oqn_k$());
  }
  function ULong__toUInt_impl_qlonx5($this) {
    // Inline function 'kotlin.toUInt' call
    var this_0 = _ULong___get_data__impl__fggpzb($this);
    return _UInt___init__impl__l7qpdl(this_0.toInt_1tsl84_k$());
  }
  function ULong__toULong_impl_nnbd88($this) {
    return $this;
  }
  function ULong__toFloat_impl_kebp7h($this) {
    // Inline function 'kotlin.ULong.toDouble' call
    return ulongToDouble(_ULong___get_data__impl__fggpzb($this));
  }
  function ULong__toDouble_impl_dhcxbk($this) {
    return ulongToDouble(_ULong___get_data__impl__fggpzb($this));
  }
  function ULong__toString_impl_f9au7k($this) {
    return ulongToString(_ULong___get_data__impl__fggpzb($this));
  }
  function ULong__hashCode_impl_6hv2lb($this) {
    return $this.hashCode();
  }
  function ULong__equals_impl_o0gnyb($this, other) {
    if (!(other instanceof ULong))
      return false;
    var tmp0_other_with_cast = other instanceof ULong ? other.data_1 : THROW_CCE();
    if (!$this.equals(tmp0_other_with_cast))
      return false;
    return true;
  }
  function ULong(data) {
    Companion_getInstance_20();
    this.data_1 = data;
  }
  protoOf(ULong).compareTo_zaxduj_k$ = function (other) {
    return ULong__compareTo_impl_38i7tu_2(this.data_1, other);
  };
  protoOf(ULong).compareTo_hpufkf_k$ = function (other) {
    return ULong__compareTo_impl_38i7tu_3(this, other);
  };
  protoOf(ULong).toString = function () {
    return ULong__toString_impl_f9au7k(this.data_1);
  };
  protoOf(ULong).hashCode = function () {
    return ULong__hashCode_impl_6hv2lb(this.data_1);
  };
  protoOf(ULong).equals = function (other) {
    return ULong__equals_impl_o0gnyb(this.data_1, other);
  };
  function toULong(_this__u8e3s4) {
    return _ULong___init__impl__c78o9k(_this__u8e3s4);
  }
  function toULong_0(_this__u8e3s4) {
    return _ULong___init__impl__c78o9k(toLong(_this__u8e3s4));
  }
  function toULong_1(_this__u8e3s4) {
    return doubleToULong(_this__u8e3s4);
  }
  function toULong_2(_this__u8e3s4) {
    return doubleToULong(_this__u8e3s4);
  }
  function toULong_3(_this__u8e3s4) {
    return _ULong___init__impl__c78o9k(toLong(_this__u8e3s4));
  }
  function toULong_4(_this__u8e3s4) {
    return _ULong___init__impl__c78o9k(toLong(_this__u8e3s4));
  }
  function _get_array__jslnqg_2($this) {
    return $this.array_1;
  }
  function _set_index__fyfqnn_3($this, _set____db54di) {
    $this.index_1 = _set____db54di;
  }
  function _get_index__g2optt_4($this) {
    return $this.index_1;
  }
  function _ULongArray___init__impl__twm1l3(storage) {
    return storage;
  }
  function _ULongArray___get_storage__impl__28e64j($this) {
    return $this;
  }
  function _ULongArray___init__impl__twm1l3_0(size) {
    return _ULongArray___init__impl__twm1l3(longArray(size));
  }
  function ULongArray__get_impl_pr71q9($this, index) {
    // Inline function 'kotlin.toULong' call
    var this_0 = _ULongArray___get_storage__impl__28e64j($this)[index];
    return _ULong___init__impl__c78o9k(this_0);
  }
  function ULongArray__set_impl_z19mvh($this, index, value) {
    var tmp = _ULongArray___get_storage__impl__28e64j($this);
    // Inline function 'kotlin.ULong.toLong' call
    tmp[index] = _ULong___get_data__impl__fggpzb(value);
  }
  function _ULongArray___get_size__impl__ju6dtr($this) {
    return _ULongArray___get_storage__impl__28e64j($this).length;
  }
  function ULongArray__iterator_impl_cq4d2h($this) {
    return new Iterator_2(_ULongArray___get_storage__impl__28e64j($this));
  }
  function Iterator_2(array) {
    this.array_1 = array;
    this.index_1 = 0;
  }
  protoOf(Iterator_2).hasNext_bitz1p_k$ = function () {
    return this.index_1 < this.array_1.length;
  };
  protoOf(Iterator_2).next_mi4vn2_k$ = function () {
    var tmp;
    if (this.index_1 < this.array_1.length) {
      // Inline function 'kotlin.toULong' call
      var tmp1 = this.index_1;
      this.index_1 = tmp1 + 1 | 0;
      var this_0 = this.array_1[tmp1];
      tmp = _ULong___init__impl__c78o9k(this_0);
    } else {
      throw NoSuchElementException_init_$Create$_0(this.index_1.toString());
    }
    return tmp;
  };
  protoOf(Iterator_2).next_20eer_k$ = function () {
    return new ULong(this.next_mi4vn2_k$());
  };
  function ULongArray__contains_impl_v9bgai($this, element) {
    var tmp = !(new ULong(element) == null) ? new ULong(element) : THROW_CCE();
    if (!(tmp instanceof ULong))
      return false;
    var tmp_0 = _ULongArray___get_storage__impl__28e64j($this);
    // Inline function 'kotlin.ULong.toLong' call
    var tmp$ret$0 = _ULong___get_data__impl__fggpzb(element);
    return contains_4(tmp_0, tmp$ret$0);
  }
  function ULongArray__contains_impl_v9bgai_0($this, element) {
    if (!(element instanceof ULong))
      return false;
    return ULongArray__contains_impl_v9bgai($this.storage_1, element instanceof ULong ? element.data_1 : THROW_CCE());
  }
  function ULongArray__containsAll_impl_xx8ztf($this, elements) {
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlin.collections.all' call
      var this_0 = isInterface(elements, Collection) ? elements : THROW_CCE();
      var tmp;
      if (isInterface(this_0, Collection)) {
        tmp = this_0.isEmpty_y1axqb_k$();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = true;
        break $l$block_0;
      }
      var tmp0_iterator = this_0.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'kotlin.ULongArray.containsAll.<anonymous>' call
        var tmp_0;
        if (element instanceof ULong) {
          var tmp_1 = _ULongArray___get_storage__impl__28e64j($this);
          // Inline function 'kotlin.ULong.toLong' call
          var this_1 = element.data_1;
          var tmp$ret$1 = _ULong___get_data__impl__fggpzb(this_1);
          tmp_0 = contains_4(tmp_1, tmp$ret$1);
        } else {
          tmp_0 = false;
        }
        if (!tmp_0) {
          tmp$ret$0 = false;
          break $l$block_0;
        }
      }
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  }
  function ULongArray__containsAll_impl_xx8ztf_0($this, elements) {
    return ULongArray__containsAll_impl_xx8ztf($this.storage_1, elements);
  }
  function ULongArray__isEmpty_impl_c3yngu($this) {
    return _ULongArray___get_storage__impl__28e64j($this).length === 0;
  }
  function ULongArray__toString_impl_wqk1p5($this) {
    return 'ULongArray(storage=' + toString_2($this) + ')';
  }
  function ULongArray__hashCode_impl_aze4wa($this) {
    return hashCode($this);
  }
  function ULongArray__equals_impl_vwitwa($this, other) {
    if (!(other instanceof ULongArray))
      return false;
    var tmp0_other_with_cast = other instanceof ULongArray ? other.storage_1 : THROW_CCE();
    if (!equals($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function ULongArray(storage) {
    this.storage_1 = storage;
  }
  protoOf(ULongArray).get_size_woubt6_k$ = function () {
    return _ULongArray___get_size__impl__ju6dtr(this.storage_1);
  };
  protoOf(ULongArray).iterator_jk1svi_k$ = function () {
    return ULongArray__iterator_impl_cq4d2h(this.storage_1);
  };
  protoOf(ULongArray).contains_mfvh9i_k$ = function (element) {
    return ULongArray__contains_impl_v9bgai(this.storage_1, element);
  };
  protoOf(ULongArray).contains_aljjnj_k$ = function (element) {
    return ULongArray__contains_impl_v9bgai_0(this, element);
  };
  protoOf(ULongArray).containsAll_ks3xcn_k$ = function (elements) {
    return ULongArray__containsAll_impl_xx8ztf(this.storage_1, elements);
  };
  protoOf(ULongArray).containsAll_xk45sd_k$ = function (elements) {
    return ULongArray__containsAll_impl_xx8ztf_0(this, elements);
  };
  protoOf(ULongArray).isEmpty_y1axqb_k$ = function () {
    return ULongArray__isEmpty_impl_c3yngu(this.storage_1);
  };
  protoOf(ULongArray).toString = function () {
    return ULongArray__toString_impl_wqk1p5(this.storage_1);
  };
  protoOf(ULongArray).hashCode = function () {
    return ULongArray__hashCode_impl_aze4wa(this.storage_1);
  };
  protoOf(ULongArray).equals = function (other) {
    return ULongArray__equals_impl_vwitwa(this.storage_1, other);
  };
  function Companion_21() {
    Companion_instance_21 = this;
    var tmp = this;
    Companion_getInstance_20();
    var tmp_0 = _ULong___init__impl__c78o9k(new Long(-1, -1));
    Companion_getInstance_20();
    tmp.EMPTY_1 = new ULongRange(tmp_0, _ULong___init__impl__c78o9k(new Long(0, 0)));
  }
  protoOf(Companion_21).get_EMPTY_i8q41w_k$ = function () {
    return this.EMPTY_1;
  };
  var Companion_instance_21;
  function Companion_getInstance_21() {
    if (Companion_instance_21 == null)
      new Companion_21();
    return Companion_instance_21;
  }
  function ULongRange(start, endInclusive) {
    Companion_getInstance_21();
    ULongProgression.call(this, start, endInclusive, new Long(1, 0));
  }
  protoOf(ULongRange).get_start_t8fb1w_k$ = function () {
    return this.first_1;
  };
  protoOf(ULongRange).get_start_iypx6h_k$ = function () {
    return new ULong(this.get_start_t8fb1w_k$());
  };
  protoOf(ULongRange).get_endInclusive_h0ahvv_k$ = function () {
    return this.last_1;
  };
  protoOf(ULongRange).get_endInclusive_r07xpi_k$ = function () {
    return new ULong(this.get_endInclusive_h0ahvv_k$());
  };
  protoOf(ULongRange).get_endExclusive_qkt9qx_k$ = function () {
    Companion_getInstance_20();
    if (equals(this.last_1, _ULong___init__impl__c78o9k(new Long(-1, -1)))) {
      // Inline function 'kotlin.error' call
      var message = 'Cannot return the exclusive upper bound of a range that includes MAX_VALUE.';
      throw IllegalStateException_init_$Create$_0(toString_2(message));
    }
    // Inline function 'kotlin.ULong.plus' call
    var this_0 = this.last_1;
    // Inline function 'kotlin.ULong.plus' call
    // Inline function 'kotlin.UInt.toULong' call
    var this_1 = _UInt___init__impl__l7qpdl(1);
    var other = _ULong___init__impl__c78o9k(toLong(_UInt___get_data__impl__f0vqqw(this_1)).and_4spn93_k$(new Long(-1, 0)));
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_0).plus_r93sks_k$(_ULong___get_data__impl__fggpzb(other)));
  };
  protoOf(ULongRange).get_endExclusive_pmwm6k_k$ = function () {
    return new ULong(this.get_endExclusive_qkt9qx_k$());
  };
  protoOf(ULongRange).contains_mfvh9i_k$ = function (value) {
    var tmp;
    // Inline function 'kotlin.ULong.compareTo' call
    var this_0 = this.first_1;
    if (ulongCompare(_ULong___get_data__impl__fggpzb(this_0), _ULong___get_data__impl__fggpzb(value)) <= 0) {
      // Inline function 'kotlin.ULong.compareTo' call
      var other = this.last_1;
      tmp = ulongCompare(_ULong___get_data__impl__fggpzb(value), _ULong___get_data__impl__fggpzb(other)) <= 0;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(ULongRange).contains_3tkdvy_k$ = function (value) {
    return this.contains_mfvh9i_k$(value instanceof ULong ? value.data_1 : THROW_CCE());
  };
  protoOf(ULongRange).isEmpty_y1axqb_k$ = function () {
    // Inline function 'kotlin.ULong.compareTo' call
    var this_0 = this.first_1;
    var other = this.last_1;
    return ulongCompare(_ULong___get_data__impl__fggpzb(this_0), _ULong___get_data__impl__fggpzb(other)) > 0;
  };
  protoOf(ULongRange).equals = function (other) {
    var tmp;
    if (other instanceof ULongRange) {
      tmp = (this.isEmpty_y1axqb_k$() ? other.isEmpty_y1axqb_k$() : false) ? true : equals(this.first_1, other.first_1) ? equals(this.last_1, other.last_1) : false;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(ULongRange).hashCode = function () {
    var tmp;
    if (this.isEmpty_y1axqb_k$()) {
      tmp = -1;
    } else {
      // Inline function 'kotlin.ULong.toInt' call
      // Inline function 'kotlin.ULong.xor' call
      var this_0 = this.first_1;
      // Inline function 'kotlin.ULong.shr' call
      var this_1 = this.first_1;
      var other = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_1).ushr_z7nmq8_k$(32));
      var this_2 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_0).xor_qzz94j_k$(_ULong___get_data__impl__fggpzb(other)));
      var tmp$ret$2 = _ULong___get_data__impl__fggpzb(this_2).toInt_1tsl84_k$();
      var tmp_0 = imul(31, tmp$ret$2);
      // Inline function 'kotlin.ULong.toInt' call
      // Inline function 'kotlin.ULong.xor' call
      var this_3 = this.last_1;
      // Inline function 'kotlin.ULong.shr' call
      var this_4 = this.last_1;
      var other_0 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_4).ushr_z7nmq8_k$(32));
      var this_5 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_3).xor_qzz94j_k$(_ULong___get_data__impl__fggpzb(other_0)));
      tmp = tmp_0 + _ULong___get_data__impl__fggpzb(this_5).toInt_1tsl84_k$() | 0;
    }
    return tmp;
  };
  protoOf(ULongRange).toString = function () {
    return '' + new ULong(this.first_1) + '..' + new ULong(this.last_1);
  };
  function Companion_22() {
    Companion_instance_22 = this;
  }
  protoOf(Companion_22).fromClosedRange_e578op_k$ = function (rangeStart, rangeEnd, step) {
    return new ULongProgression(rangeStart, rangeEnd, step);
  };
  var Companion_instance_22;
  function Companion_getInstance_22() {
    if (Companion_instance_22 == null)
      new Companion_22();
    return Companion_instance_22;
  }
  function ULongProgression(start, endInclusive, step) {
    Companion_getInstance_22();
    if (step.equals(new Long(0, 0)))
      throw IllegalArgumentException_init_$Create$_0('Step must be non-zero.');
    Companion_getInstance_3();
    if (step.equals(new Long(0, -2147483648)))
      throw IllegalArgumentException_init_$Create$_0('Step must be greater than Long.MIN_VALUE to avoid overflow on negation.');
    this.first_1 = start;
    this.last_1 = getProgressionLastElement_2(start, endInclusive, step);
    this.step_1 = step;
  }
  protoOf(ULongProgression).get_first_shpxa6_k$ = function () {
    return this.first_1;
  };
  protoOf(ULongProgression).get_last_6xn0iu_k$ = function () {
    return this.last_1;
  };
  protoOf(ULongProgression).get_step_woujh1_k$ = function () {
    return this.step_1;
  };
  protoOf(ULongProgression).iterator_jk1svi_k$ = function () {
    return new ULongProgressionIterator(this.first_1, this.last_1, this.step_1);
  };
  protoOf(ULongProgression).isEmpty_y1axqb_k$ = function () {
    var tmp;
    if (this.step_1.compareTo_9jj042_k$(new Long(0, 0)) > 0) {
      // Inline function 'kotlin.ULong.compareTo' call
      var this_0 = this.first_1;
      var other = this.last_1;
      tmp = ulongCompare(_ULong___get_data__impl__fggpzb(this_0), _ULong___get_data__impl__fggpzb(other)) > 0;
    } else {
      // Inline function 'kotlin.ULong.compareTo' call
      var this_1 = this.first_1;
      var other_0 = this.last_1;
      tmp = ulongCompare(_ULong___get_data__impl__fggpzb(this_1), _ULong___get_data__impl__fggpzb(other_0)) < 0;
    }
    return tmp;
  };
  protoOf(ULongProgression).equals = function (other) {
    var tmp;
    if (other instanceof ULongProgression) {
      tmp = (this.isEmpty_y1axqb_k$() ? other.isEmpty_y1axqb_k$() : false) ? true : (equals(this.first_1, other.first_1) ? equals(this.last_1, other.last_1) : false) ? this.step_1.equals(other.step_1) : false;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(ULongProgression).hashCode = function () {
    var tmp;
    if (this.isEmpty_y1axqb_k$()) {
      tmp = -1;
    } else {
      // Inline function 'kotlin.ULong.toInt' call
      // Inline function 'kotlin.ULong.xor' call
      var this_0 = this.first_1;
      // Inline function 'kotlin.ULong.shr' call
      var this_1 = this.first_1;
      var other = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_1).ushr_z7nmq8_k$(32));
      var this_2 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_0).xor_qzz94j_k$(_ULong___get_data__impl__fggpzb(other)));
      var tmp$ret$2 = _ULong___get_data__impl__fggpzb(this_2).toInt_1tsl84_k$();
      var tmp_0 = imul(31, tmp$ret$2);
      // Inline function 'kotlin.ULong.toInt' call
      // Inline function 'kotlin.ULong.xor' call
      var this_3 = this.last_1;
      // Inline function 'kotlin.ULong.shr' call
      var this_4 = this.last_1;
      var other_0 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_4).ushr_z7nmq8_k$(32));
      var this_5 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_3).xor_qzz94j_k$(_ULong___get_data__impl__fggpzb(other_0)));
      var tmp$ret$5 = _ULong___get_data__impl__fggpzb(this_5).toInt_1tsl84_k$();
      tmp = imul(31, tmp_0 + tmp$ret$5 | 0) + this.step_1.xor_qzz94j_k$(this.step_1.ushr_z7nmq8_k$(32)).toInt_1tsl84_k$() | 0;
    }
    return tmp;
  };
  protoOf(ULongProgression).toString = function () {
    return this.step_1.compareTo_9jj042_k$(new Long(0, 0)) > 0 ? '' + new ULong(this.first_1) + '..' + new ULong(this.last_1) + ' step ' + this.step_1.toString() : '' + new ULong(this.first_1) + ' downTo ' + new ULong(this.last_1) + ' step ' + this.step_1.unaryMinus_6uz0qp_k$().toString();
  };
  function _get_finalElement__gc6m3p_3($this) {
    return $this.finalElement_1;
  }
  function _set_hasNext__86v2bs_3($this, _set____db54di) {
    $this.hasNext_1 = _set____db54di;
  }
  function _get_hasNext__xt3cos_3($this) {
    return $this.hasNext_1;
  }
  function _get_step__ddv2tb_0($this) {
    return $this.step_1;
  }
  function _set_next__9r2xms_3($this, _set____db54di) {
    $this.next_1 = _set____db54di;
  }
  function _get_next__daux88_3($this) {
    return $this.next_1;
  }
  function ULongProgressionIterator(first, last, step) {
    this.finalElement_1 = last;
    var tmp = this;
    var tmp_0;
    if (step.compareTo_9jj042_k$(new Long(0, 0)) > 0) {
      // Inline function 'kotlin.ULong.compareTo' call
      tmp_0 = ulongCompare(_ULong___get_data__impl__fggpzb(first), _ULong___get_data__impl__fggpzb(last)) <= 0;
    } else {
      // Inline function 'kotlin.ULong.compareTo' call
      tmp_0 = ulongCompare(_ULong___get_data__impl__fggpzb(first), _ULong___get_data__impl__fggpzb(last)) >= 0;
    }
    tmp.hasNext_1 = tmp_0;
    var tmp_1 = this;
    // Inline function 'kotlin.toULong' call
    tmp_1.step_1 = _ULong___init__impl__c78o9k(step);
    this.next_1 = this.hasNext_1 ? first : this.finalElement_1;
  }
  protoOf(ULongProgressionIterator).hasNext_bitz1p_k$ = function () {
    return this.hasNext_1;
  };
  protoOf(ULongProgressionIterator).next_mi4vn2_k$ = function () {
    var value = this.next_1;
    if (equals(value, this.finalElement_1)) {
      if (!this.hasNext_1)
        throw NoSuchElementException_init_$Create$();
      this.hasNext_1 = false;
    } else {
      var tmp = this;
      // Inline function 'kotlin.ULong.plus' call
      var this_0 = this.next_1;
      var other = this.step_1;
      tmp.next_1 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_0).plus_r93sks_k$(_ULong___get_data__impl__fggpzb(other)));
    }
    return value;
  };
  protoOf(ULongProgressionIterator).next_20eer_k$ = function () {
    return new ULong(this.next_mi4vn2_k$());
  };
  function getProgressionLastElement_1(start, end, step) {
    var tmp;
    if (step > 0) {
      var tmp_0;
      // Inline function 'kotlin.UInt.compareTo' call
      if (uintCompare(_UInt___get_data__impl__f0vqqw(start), _UInt___get_data__impl__f0vqqw(end)) >= 0) {
        tmp_0 = end;
      } else {
        // Inline function 'kotlin.UInt.minus' call
        // Inline function 'kotlin.toUInt' call
        var tmp$ret$1 = _UInt___init__impl__l7qpdl(step);
        var other = differenceModulo_1(end, start, tmp$ret$1);
        tmp_0 = _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(end) - _UInt___get_data__impl__f0vqqw(other) | 0);
      }
      tmp = tmp_0;
    } else if (step < 0) {
      var tmp_1;
      // Inline function 'kotlin.UInt.compareTo' call
      if (uintCompare(_UInt___get_data__impl__f0vqqw(start), _UInt___get_data__impl__f0vqqw(end)) <= 0) {
        tmp_1 = end;
      } else {
        // Inline function 'kotlin.UInt.plus' call
        // Inline function 'kotlin.toUInt' call
        var this_0 = -step | 0;
        var tmp$ret$4 = _UInt___init__impl__l7qpdl(this_0);
        var other_0 = differenceModulo_1(start, end, tmp$ret$4);
        tmp_1 = _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(end) + _UInt___get_data__impl__f0vqqw(other_0) | 0);
      }
      tmp = tmp_1;
    } else {
      throw IllegalArgumentException_init_$Create$_0('Step is zero.');
    }
    return tmp;
  }
  function getProgressionLastElement_2(start, end, step) {
    var tmp;
    if (step.compareTo_9jj042_k$(new Long(0, 0)) > 0) {
      var tmp_0;
      // Inline function 'kotlin.ULong.compareTo' call
      if (ulongCompare(_ULong___get_data__impl__fggpzb(start), _ULong___get_data__impl__fggpzb(end)) >= 0) {
        tmp_0 = end;
      } else {
        // Inline function 'kotlin.ULong.minus' call
        // Inline function 'kotlin.toULong' call
        var tmp$ret$1 = _ULong___init__impl__c78o9k(step);
        var other = differenceModulo_2(end, start, tmp$ret$1);
        tmp_0 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(end).minus_mfbszm_k$(_ULong___get_data__impl__fggpzb(other)));
      }
      tmp = tmp_0;
    } else if (step.compareTo_9jj042_k$(new Long(0, 0)) < 0) {
      var tmp_1;
      // Inline function 'kotlin.ULong.compareTo' call
      if (ulongCompare(_ULong___get_data__impl__fggpzb(start), _ULong___get_data__impl__fggpzb(end)) <= 0) {
        tmp_1 = end;
      } else {
        // Inline function 'kotlin.ULong.plus' call
        // Inline function 'kotlin.toULong' call
        var this_0 = step.unaryMinus_6uz0qp_k$();
        var tmp$ret$4 = _ULong___init__impl__c78o9k(this_0);
        var other_0 = differenceModulo_2(start, end, tmp$ret$4);
        tmp_1 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(end).plus_r93sks_k$(_ULong___get_data__impl__fggpzb(other_0)));
      }
      tmp = tmp_1;
    } else {
      throw IllegalArgumentException_init_$Create$_0('Step is zero.');
    }
    return tmp;
  }
  function differenceModulo_1(a, b, c) {
    // Inline function 'kotlin.UInt.rem' call
    var ac = uintRemainder(a, c);
    // Inline function 'kotlin.UInt.rem' call
    var bc = uintRemainder(b, c);
    var tmp;
    // Inline function 'kotlin.UInt.compareTo' call
    if (uintCompare(_UInt___get_data__impl__f0vqqw(ac), _UInt___get_data__impl__f0vqqw(bc)) >= 0) {
      // Inline function 'kotlin.UInt.minus' call
      tmp = _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(ac) - _UInt___get_data__impl__f0vqqw(bc) | 0);
    } else {
      // Inline function 'kotlin.UInt.plus' call
      // Inline function 'kotlin.UInt.minus' call
      var this_0 = _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(ac) - _UInt___get_data__impl__f0vqqw(bc) | 0);
      tmp = _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(this_0) + _UInt___get_data__impl__f0vqqw(c) | 0);
    }
    return tmp;
  }
  function differenceModulo_2(a, b, c) {
    // Inline function 'kotlin.ULong.rem' call
    var ac = ulongRemainder(a, c);
    // Inline function 'kotlin.ULong.rem' call
    var bc = ulongRemainder(b, c);
    var tmp;
    // Inline function 'kotlin.ULong.compareTo' call
    if (ulongCompare(_ULong___get_data__impl__fggpzb(ac), _ULong___get_data__impl__fggpzb(bc)) >= 0) {
      // Inline function 'kotlin.ULong.minus' call
      tmp = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(ac).minus_mfbszm_k$(_ULong___get_data__impl__fggpzb(bc)));
    } else {
      // Inline function 'kotlin.ULong.plus' call
      // Inline function 'kotlin.ULong.minus' call
      var this_0 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(ac).minus_mfbszm_k$(_ULong___get_data__impl__fggpzb(bc)));
      tmp = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_0).plus_r93sks_k$(_ULong___get_data__impl__fggpzb(c)));
    }
    return tmp;
  }
  function _UShort___init__impl__jigrne(data) {
    return data;
  }
  function _UShort___get_data__impl__g0245($this) {
    return $this;
  }
  function Companion_23() {
    Companion_instance_23 = this;
    this.MIN_VALUE_1 = _UShort___init__impl__jigrne(0);
    this.MAX_VALUE_1 = _UShort___init__impl__jigrne(-1);
    this.SIZE_BYTES_1 = 2;
    this.SIZE_BITS_1 = 16;
  }
  protoOf(Companion_23).get_MIN_VALUE_8wxn4e_k$ = function () {
    return this.MIN_VALUE_1;
  };
  protoOf(Companion_23).get_MAX_VALUE_gfkyu8_k$ = function () {
    return this.MAX_VALUE_1;
  };
  protoOf(Companion_23).get_SIZE_BYTES_qphg4q_k$ = function () {
    return this.SIZE_BYTES_1;
  };
  protoOf(Companion_23).get_SIZE_BITS_7qhjj9_k$ = function () {
    return this.SIZE_BITS_1;
  };
  var Companion_instance_23;
  function Companion_getInstance_23() {
    if (Companion_instance_23 == null)
      new Companion_23();
    return Companion_instance_23;
  }
  function UShort__compareTo_impl_1pfgyc($this, other) {
    // Inline function 'kotlin.UShort.toInt' call
    var tmp = _UShort___get_data__impl__g0245($this) & 65535;
    // Inline function 'kotlin.UByte.toInt' call
    var tmp$ret$1 = _UByte___get_data__impl__jof9qr(other) & 255;
    return compareTo_0(tmp, tmp$ret$1);
  }
  function UShort__compareTo_impl_1pfgyc_0($this, other) {
    // Inline function 'kotlin.UShort.toInt' call
    var tmp = _UShort___get_data__impl__g0245($this) & 65535;
    // Inline function 'kotlin.UShort.toInt' call
    var tmp$ret$1 = _UShort___get_data__impl__g0245(other) & 65535;
    return compareTo_0(tmp, tmp$ret$1);
  }
  function UShort__compareTo_impl_1pfgyc_1($this, other) {
    return UShort__compareTo_impl_1pfgyc_0($this.data_1, other instanceof UShort ? other.data_1 : THROW_CCE());
  }
  function UShort__compareTo_impl_1pfgyc_2($this, other) {
    // Inline function 'kotlin.UInt.compareTo' call
    // Inline function 'kotlin.UShort.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245($this) & 65535);
    return uintCompare(_UInt___get_data__impl__f0vqqw(this_0), _UInt___get_data__impl__f0vqqw(other));
  }
  function UShort__compareTo_impl_1pfgyc_3($this, other) {
    // Inline function 'kotlin.ULong.compareTo' call
    // Inline function 'kotlin.UShort.toULong' call
    var this_0 = _ULong___init__impl__c78o9k(toLong(_UShort___get_data__impl__g0245($this)).and_4spn93_k$(new Long(65535, 0)));
    return ulongCompare(_ULong___get_data__impl__fggpzb(this_0), _ULong___get_data__impl__fggpzb(other));
  }
  function UShort__plus_impl_s0k2d0($this, other) {
    // Inline function 'kotlin.UInt.plus' call
    // Inline function 'kotlin.UShort.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245($this) & 65535);
    // Inline function 'kotlin.UByte.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(other) & 255);
    return _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(this_0) + _UInt___get_data__impl__f0vqqw(other_0) | 0);
  }
  function UShort__plus_impl_s0k2d0_0($this, other) {
    // Inline function 'kotlin.UInt.plus' call
    // Inline function 'kotlin.UShort.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245($this) & 65535);
    // Inline function 'kotlin.UShort.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(other) & 65535);
    return _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(this_0) + _UInt___get_data__impl__f0vqqw(other_0) | 0);
  }
  function UShort__plus_impl_s0k2d0_1($this, other) {
    // Inline function 'kotlin.UInt.plus' call
    // Inline function 'kotlin.UShort.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245($this) & 65535);
    return _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(this_0) + _UInt___get_data__impl__f0vqqw(other) | 0);
  }
  function UShort__plus_impl_s0k2d0_2($this, other) {
    // Inline function 'kotlin.ULong.plus' call
    // Inline function 'kotlin.UShort.toULong' call
    var this_0 = _ULong___init__impl__c78o9k(toLong(_UShort___get_data__impl__g0245($this)).and_4spn93_k$(new Long(65535, 0)));
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_0).plus_r93sks_k$(_ULong___get_data__impl__fggpzb(other)));
  }
  function UShort__minus_impl_e61690($this, other) {
    // Inline function 'kotlin.UInt.minus' call
    // Inline function 'kotlin.UShort.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245($this) & 65535);
    // Inline function 'kotlin.UByte.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(other) & 255);
    return _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(this_0) - _UInt___get_data__impl__f0vqqw(other_0) | 0);
  }
  function UShort__minus_impl_e61690_0($this, other) {
    // Inline function 'kotlin.UInt.minus' call
    // Inline function 'kotlin.UShort.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245($this) & 65535);
    // Inline function 'kotlin.UShort.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(other) & 65535);
    return _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(this_0) - _UInt___get_data__impl__f0vqqw(other_0) | 0);
  }
  function UShort__minus_impl_e61690_1($this, other) {
    // Inline function 'kotlin.UInt.minus' call
    // Inline function 'kotlin.UShort.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245($this) & 65535);
    return _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(this_0) - _UInt___get_data__impl__f0vqqw(other) | 0);
  }
  function UShort__minus_impl_e61690_2($this, other) {
    // Inline function 'kotlin.ULong.minus' call
    // Inline function 'kotlin.UShort.toULong' call
    var this_0 = _ULong___init__impl__c78o9k(toLong(_UShort___get_data__impl__g0245($this)).and_4spn93_k$(new Long(65535, 0)));
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_0).minus_mfbszm_k$(_ULong___get_data__impl__fggpzb(other)));
  }
  function UShort__times_impl_bvilzi($this, other) {
    // Inline function 'kotlin.UInt.times' call
    // Inline function 'kotlin.UShort.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245($this) & 65535);
    // Inline function 'kotlin.UByte.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(other) & 255);
    return _UInt___init__impl__l7qpdl(imul(_UInt___get_data__impl__f0vqqw(this_0), _UInt___get_data__impl__f0vqqw(other_0)));
  }
  function UShort__times_impl_bvilzi_0($this, other) {
    // Inline function 'kotlin.UInt.times' call
    // Inline function 'kotlin.UShort.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245($this) & 65535);
    // Inline function 'kotlin.UShort.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(other) & 65535);
    return _UInt___init__impl__l7qpdl(imul(_UInt___get_data__impl__f0vqqw(this_0), _UInt___get_data__impl__f0vqqw(other_0)));
  }
  function UShort__times_impl_bvilzi_1($this, other) {
    // Inline function 'kotlin.UInt.times' call
    // Inline function 'kotlin.UShort.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245($this) & 65535);
    return _UInt___init__impl__l7qpdl(imul(_UInt___get_data__impl__f0vqqw(this_0), _UInt___get_data__impl__f0vqqw(other)));
  }
  function UShort__times_impl_bvilzi_2($this, other) {
    // Inline function 'kotlin.ULong.times' call
    // Inline function 'kotlin.UShort.toULong' call
    var this_0 = _ULong___init__impl__c78o9k(toLong(_UShort___get_data__impl__g0245($this)).and_4spn93_k$(new Long(65535, 0)));
    return _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_0).times_nfzjiw_k$(_ULong___get_data__impl__fggpzb(other)));
  }
  function UShort__div_impl_b0o0rh($this, other) {
    // Inline function 'kotlin.UInt.div' call
    // Inline function 'kotlin.UShort.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245($this) & 65535);
    // Inline function 'kotlin.UByte.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(other) & 255);
    return uintDivide(this_0, other_0);
  }
  function UShort__div_impl_b0o0rh_0($this, other) {
    // Inline function 'kotlin.UInt.div' call
    // Inline function 'kotlin.UShort.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245($this) & 65535);
    // Inline function 'kotlin.UShort.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(other) & 65535);
    return uintDivide(this_0, other_0);
  }
  function UShort__div_impl_b0o0rh_1($this, other) {
    // Inline function 'kotlin.UInt.div' call
    // Inline function 'kotlin.UShort.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245($this) & 65535);
    return uintDivide(this_0, other);
  }
  function UShort__div_impl_b0o0rh_2($this, other) {
    // Inline function 'kotlin.ULong.div' call
    // Inline function 'kotlin.UShort.toULong' call
    var this_0 = _ULong___init__impl__c78o9k(toLong(_UShort___get_data__impl__g0245($this)).and_4spn93_k$(new Long(65535, 0)));
    return ulongDivide(this_0, other);
  }
  function UShort__rem_impl_pmhe86($this, other) {
    // Inline function 'kotlin.UInt.rem' call
    // Inline function 'kotlin.UShort.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245($this) & 65535);
    // Inline function 'kotlin.UByte.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(other) & 255);
    return uintRemainder(this_0, other_0);
  }
  function UShort__rem_impl_pmhe86_0($this, other) {
    // Inline function 'kotlin.UInt.rem' call
    // Inline function 'kotlin.UShort.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245($this) & 65535);
    // Inline function 'kotlin.UShort.toUInt' call
    var other_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(other) & 65535);
    return uintRemainder(this_0, other_0);
  }
  function UShort__rem_impl_pmhe86_1($this, other) {
    // Inline function 'kotlin.UInt.rem' call
    // Inline function 'kotlin.UShort.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245($this) & 65535);
    return uintRemainder(this_0, other);
  }
  function UShort__rem_impl_pmhe86_2($this, other) {
    // Inline function 'kotlin.ULong.rem' call
    // Inline function 'kotlin.UShort.toULong' call
    var this_0 = _ULong___init__impl__c78o9k(toLong(_UShort___get_data__impl__g0245($this)).and_4spn93_k$(new Long(65535, 0)));
    return ulongRemainder(this_0, other);
  }
  function UShort__floorDiv_impl_gebnkx($this, other) {
    // Inline function 'kotlin.UInt.floorDiv' call
    // Inline function 'kotlin.UShort.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245($this) & 65535);
    // Inline function 'kotlin.UByte.toUInt' call
    // Inline function 'kotlin.UInt.div' call
    var other_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(other) & 255);
    return uintDivide(this_0, other_0);
  }
  function UShort__floorDiv_impl_gebnkx_0($this, other) {
    // Inline function 'kotlin.UInt.floorDiv' call
    // Inline function 'kotlin.UShort.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245($this) & 65535);
    // Inline function 'kotlin.UShort.toUInt' call
    // Inline function 'kotlin.UInt.div' call
    var other_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(other) & 65535);
    return uintDivide(this_0, other_0);
  }
  function UShort__floorDiv_impl_gebnkx_1($this, other) {
    // Inline function 'kotlin.UInt.floorDiv' call
    // Inline function 'kotlin.UShort.toUInt' call
    // Inline function 'kotlin.UInt.div' call
    var this_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245($this) & 65535);
    return uintDivide(this_0, other);
  }
  function UShort__floorDiv_impl_gebnkx_2($this, other) {
    // Inline function 'kotlin.ULong.floorDiv' call
    // Inline function 'kotlin.UShort.toULong' call
    // Inline function 'kotlin.ULong.div' call
    var this_0 = _ULong___init__impl__c78o9k(toLong(_UShort___get_data__impl__g0245($this)).and_4spn93_k$(new Long(65535, 0)));
    return ulongDivide(this_0, other);
  }
  function UShort__mod_impl_r81ium($this, other) {
    // Inline function 'kotlin.UInt.toUByte' call
    // Inline function 'kotlin.UInt.mod' call
    // Inline function 'kotlin.UShort.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245($this) & 65535);
    // Inline function 'kotlin.UByte.toUInt' call
    // Inline function 'kotlin.UInt.rem' call
    var other_0 = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(other) & 255);
    var this_1 = uintRemainder(this_0, other_0);
    // Inline function 'kotlin.toUByte' call
    var this_2 = _UInt___get_data__impl__f0vqqw(this_1);
    return _UByte___init__impl__g9hnc4(toByte(this_2));
  }
  function UShort__mod_impl_r81ium_0($this, other) {
    // Inline function 'kotlin.UInt.toUShort' call
    // Inline function 'kotlin.UInt.mod' call
    // Inline function 'kotlin.UShort.toUInt' call
    var this_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245($this) & 65535);
    // Inline function 'kotlin.UShort.toUInt' call
    // Inline function 'kotlin.UInt.rem' call
    var other_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(other) & 65535);
    var this_1 = uintRemainder(this_0, other_0);
    // Inline function 'kotlin.toUShort' call
    var this_2 = _UInt___get_data__impl__f0vqqw(this_1);
    return _UShort___init__impl__jigrne(toShort(this_2));
  }
  function UShort__mod_impl_r81ium_1($this, other) {
    // Inline function 'kotlin.UInt.mod' call
    // Inline function 'kotlin.UShort.toUInt' call
    // Inline function 'kotlin.UInt.rem' call
    var this_0 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245($this) & 65535);
    return uintRemainder(this_0, other);
  }
  function UShort__mod_impl_r81ium_2($this, other) {
    // Inline function 'kotlin.ULong.mod' call
    // Inline function 'kotlin.UShort.toULong' call
    // Inline function 'kotlin.ULong.rem' call
    var this_0 = _ULong___init__impl__c78o9k(toLong(_UShort___get_data__impl__g0245($this)).and_4spn93_k$(new Long(65535, 0)));
    return ulongRemainder(this_0, other);
  }
  function UShort__inc_impl_flr7re($this) {
    return _UShort___init__impl__jigrne(numberToShort(_UShort___get_data__impl__g0245($this) + 1));
  }
  function UShort__dec_impl_7ozx66($this) {
    return _UShort___init__impl__jigrne(numberToShort(_UShort___get_data__impl__g0245($this) - 1));
  }
  function UShort__rangeTo_impl_xfunss($this, other) {
    // Inline function 'kotlin.UShort.toUInt' call
    var tmp = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245($this) & 65535);
    // Inline function 'kotlin.UShort.toUInt' call
    var tmp$ret$1 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(other) & 65535);
    return new UIntRange(tmp, tmp$ret$1);
  }
  function UShort__rangeUntil_impl_nxhs85($this, other) {
    // Inline function 'kotlin.UShort.toUInt' call
    var tmp = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245($this) & 65535);
    // Inline function 'kotlin.UShort.toUInt' call
    var tmp$ret$1 = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(other) & 65535);
    return until_16(tmp, tmp$ret$1);
  }
  function UShort__and_impl_wmd7xf($this, other) {
    // Inline function 'kotlin.experimental.and' call
    var this_0 = _UShort___get_data__impl__g0245($this);
    var other_0 = _UShort___get_data__impl__g0245(other);
    var tmp$ret$0 = toShort(this_0 & other_0);
    return _UShort___init__impl__jigrne(tmp$ret$0);
  }
  function UShort__or_impl_uhj9st($this, other) {
    // Inline function 'kotlin.experimental.or' call
    var this_0 = _UShort___get_data__impl__g0245($this);
    var other_0 = _UShort___get_data__impl__g0245(other);
    var tmp$ret$0 = toShort(this_0 | other_0);
    return _UShort___init__impl__jigrne(tmp$ret$0);
  }
  function UShort__xor_impl_cc06ft($this, other) {
    // Inline function 'kotlin.experimental.xor' call
    var this_0 = _UShort___get_data__impl__g0245($this);
    var other_0 = _UShort___get_data__impl__g0245(other);
    var tmp$ret$0 = toShort(this_0 ^ other_0);
    return _UShort___init__impl__jigrne(tmp$ret$0);
  }
  function UShort__inv_impl_6lwe9p($this) {
    // Inline function 'kotlin.experimental.inv' call
    var this_0 = _UShort___get_data__impl__g0245($this);
    var tmp$ret$0 = toShort(~this_0);
    return _UShort___init__impl__jigrne(tmp$ret$0);
  }
  function UShort__toByte_impl_m9fcil($this) {
    return toByte(_UShort___get_data__impl__g0245($this));
  }
  function UShort__toShort_impl_fqwi31($this) {
    return _UShort___get_data__impl__g0245($this);
  }
  function UShort__toInt_impl_72bkww($this) {
    return _UShort___get_data__impl__g0245($this) & 65535;
  }
  function UShort__toLong_impl_ds1s6n($this) {
    return toLong(_UShort___get_data__impl__g0245($this)).and_4spn93_k$(new Long(65535, 0));
  }
  function UShort__toUByte_impl_3ig9yq($this) {
    // Inline function 'kotlin.toUByte' call
    var this_0 = _UShort___get_data__impl__g0245($this);
    return _UByte___init__impl__g9hnc4(toByte(this_0));
  }
  function UShort__toUShort_impl_1x3938($this) {
    return $this;
  }
  function UShort__toUInt_impl_581pf5($this) {
    return _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245($this) & 65535);
  }
  function UShort__toULong_impl_vh6nb6($this) {
    return _ULong___init__impl__c78o9k(toLong(_UShort___get_data__impl__g0245($this)).and_4spn93_k$(new Long(65535, 0)));
  }
  function UShort__toFloat_impl_ckgf4j($this) {
    // Inline function 'kotlin.UShort.toInt' call
    return _UShort___get_data__impl__g0245($this) & 65535;
  }
  function UShort__toDouble_impl_g58lae($this) {
    // Inline function 'kotlin.UShort.toInt' call
    return _UShort___get_data__impl__g0245($this) & 65535;
  }
  function UShort__toString_impl_edaoee($this) {
    // Inline function 'kotlin.UShort.toInt' call
    return (_UShort___get_data__impl__g0245($this) & 65535).toString();
  }
  function UShort__hashCode_impl_ywngrv($this) {
    return $this;
  }
  function UShort__equals_impl_7t9pdz($this, other) {
    if (!(other instanceof UShort))
      return false;
    if (!($this === (other instanceof UShort ? other.data_1 : THROW_CCE())))
      return false;
    return true;
  }
  function UShort(data) {
    Companion_getInstance_23();
    this.data_1 = data;
  }
  protoOf(UShort).compareTo_k5z7qt_k$ = function (other) {
    return UShort__compareTo_impl_1pfgyc_0(this.data_1, other);
  };
  protoOf(UShort).compareTo_hpufkf_k$ = function (other) {
    return UShort__compareTo_impl_1pfgyc_1(this, other);
  };
  protoOf(UShort).toString = function () {
    return UShort__toString_impl_edaoee(this.data_1);
  };
  protoOf(UShort).hashCode = function () {
    return UShort__hashCode_impl_ywngrv(this.data_1);
  };
  protoOf(UShort).equals = function (other) {
    return UShort__equals_impl_7t9pdz(this.data_1, other);
  };
  function toUShort(_this__u8e3s4) {
    return _UShort___init__impl__jigrne(toShort(_this__u8e3s4));
  }
  function toUShort_0(_this__u8e3s4) {
    return _UShort___init__impl__jigrne(_this__u8e3s4.toShort_ja8oqn_k$());
  }
  function toUShort_1(_this__u8e3s4) {
    return _UShort___init__impl__jigrne(_this__u8e3s4);
  }
  function _get_array__jslnqg_3($this) {
    return $this.array_1;
  }
  function _set_index__fyfqnn_4($this, _set____db54di) {
    $this.index_1 = _set____db54di;
  }
  function _get_index__g2optt_5($this) {
    return $this.index_1;
  }
  function _UShortArray___init__impl__9b26ef(storage) {
    return storage;
  }
  function _UShortArray___get_storage__impl__t2jpv5($this) {
    return $this;
  }
  function _UShortArray___init__impl__9b26ef_0(size) {
    return _UShortArray___init__impl__9b26ef(new Int16Array(size));
  }
  function UShortArray__get_impl_fnbhmx($this, index) {
    // Inline function 'kotlin.toUShort' call
    var this_0 = _UShortArray___get_storage__impl__t2jpv5($this)[index];
    return _UShort___init__impl__jigrne(this_0);
  }
  function UShortArray__set_impl_6d8whp($this, index, value) {
    var tmp = _UShortArray___get_storage__impl__t2jpv5($this);
    // Inline function 'kotlin.UShort.toShort' call
    tmp[index] = _UShort___get_data__impl__g0245(value);
  }
  function _UShortArray___get_size__impl__jqto1b($this) {
    return _UShortArray___get_storage__impl__t2jpv5($this).length;
  }
  function UShortArray__iterator_impl_ktpenn($this) {
    return new Iterator_3(_UShortArray___get_storage__impl__t2jpv5($this));
  }
  function Iterator_3(array) {
    this.array_1 = array;
    this.index_1 = 0;
  }
  protoOf(Iterator_3).hasNext_bitz1p_k$ = function () {
    return this.index_1 < this.array_1.length;
  };
  protoOf(Iterator_3).next_csnf8m_k$ = function () {
    var tmp;
    if (this.index_1 < this.array_1.length) {
      // Inline function 'kotlin.toUShort' call
      var tmp1 = this.index_1;
      this.index_1 = tmp1 + 1 | 0;
      var this_0 = this.array_1[tmp1];
      tmp = _UShort___init__impl__jigrne(this_0);
    } else {
      throw NoSuchElementException_init_$Create$_0(this.index_1.toString());
    }
    return tmp;
  };
  protoOf(Iterator_3).next_20eer_k$ = function () {
    return new UShort(this.next_csnf8m_k$());
  };
  function UShortArray__contains_impl_vo7k3g($this, element) {
    var tmp = !(new UShort(element) == null) ? new UShort(element) : THROW_CCE();
    if (!(tmp instanceof UShort))
      return false;
    var tmp_0 = _UShortArray___get_storage__impl__t2jpv5($this);
    // Inline function 'kotlin.UShort.toShort' call
    var tmp$ret$0 = _UShort___get_data__impl__g0245(element);
    return contains_2(tmp_0, tmp$ret$0);
  }
  function UShortArray__contains_impl_vo7k3g_0($this, element) {
    if (!(element instanceof UShort))
      return false;
    return UShortArray__contains_impl_vo7k3g($this.storage_1, element instanceof UShort ? element.data_1 : THROW_CCE());
  }
  function UShortArray__containsAll_impl_vlaaxp($this, elements) {
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlin.collections.all' call
      var this_0 = isInterface(elements, Collection) ? elements : THROW_CCE();
      var tmp;
      if (isInterface(this_0, Collection)) {
        tmp = this_0.isEmpty_y1axqb_k$();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = true;
        break $l$block_0;
      }
      var tmp0_iterator = this_0.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'kotlin.UShortArray.containsAll.<anonymous>' call
        var tmp_0;
        if (element instanceof UShort) {
          var tmp_1 = _UShortArray___get_storage__impl__t2jpv5($this);
          // Inline function 'kotlin.UShort.toShort' call
          var this_1 = element.data_1;
          var tmp$ret$1 = _UShort___get_data__impl__g0245(this_1);
          tmp_0 = contains_2(tmp_1, tmp$ret$1);
        } else {
          tmp_0 = false;
        }
        if (!tmp_0) {
          tmp$ret$0 = false;
          break $l$block_0;
        }
      }
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  }
  function UShortArray__containsAll_impl_vlaaxp_0($this, elements) {
    return UShortArray__containsAll_impl_vlaaxp($this.storage_1, elements);
  }
  function UShortArray__isEmpty_impl_cdd9l0($this) {
    return _UShortArray___get_storage__impl__t2jpv5($this).length === 0;
  }
  function UShortArray__toString_impl_omz03z($this) {
    return 'UShortArray(storage=' + toString_2($this) + ')';
  }
  function UShortArray__hashCode_impl_2vt3b4($this) {
    return hashCode($this);
  }
  function UShortArray__equals_impl_tyc3mk($this, other) {
    if (!(other instanceof UShortArray))
      return false;
    var tmp0_other_with_cast = other instanceof UShortArray ? other.storage_1 : THROW_CCE();
    if (!equals($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function UShortArray(storage) {
    this.storage_1 = storage;
  }
  protoOf(UShortArray).get_size_woubt6_k$ = function () {
    return _UShortArray___get_size__impl__jqto1b(this.storage_1);
  };
  protoOf(UShortArray).iterator_jk1svi_k$ = function () {
    return UShortArray__iterator_impl_ktpenn(this.storage_1);
  };
  protoOf(UShortArray).contains_2ufjxw_k$ = function (element) {
    return UShortArray__contains_impl_vo7k3g(this.storage_1, element);
  };
  protoOf(UShortArray).contains_aljjnj_k$ = function (element) {
    return UShortArray__contains_impl_vo7k3g_0(this, element);
  };
  protoOf(UShortArray).containsAll_e9sgm5_k$ = function (elements) {
    return UShortArray__containsAll_impl_vlaaxp(this.storage_1, elements);
  };
  protoOf(UShortArray).containsAll_xk45sd_k$ = function (elements) {
    return UShortArray__containsAll_impl_vlaaxp_0(this, elements);
  };
  protoOf(UShortArray).isEmpty_y1axqb_k$ = function () {
    return UShortArray__isEmpty_impl_cdd9l0(this.storage_1);
  };
  protoOf(UShortArray).toString = function () {
    return UShortArray__toString_impl_omz03z(this.storage_1);
  };
  protoOf(UShortArray).hashCode = function () {
    return UShortArray__hashCode_impl_2vt3b4(this.storage_1);
  };
  protoOf(UShortArray).equals = function (other) {
    return UShortArray__equals_impl_tyc3mk(this.storage_1, other);
  };
  function uintCompare(v1, v2) {
    return compareTo_0(v1 ^ IntCompanionObject_getInstance().MIN_VALUE, v2 ^ IntCompanionObject_getInstance().MIN_VALUE);
  }
  function uintDivide(v1, v2) {
    // Inline function 'kotlin.toUInt' call
    // Inline function 'kotlin.UInt.toLong' call
    var tmp = toLong(_UInt___get_data__impl__f0vqqw(v1)).and_4spn93_k$(new Long(-1, 0));
    // Inline function 'kotlin.UInt.toLong' call
    var tmp$ret$1 = toLong(_UInt___get_data__impl__f0vqqw(v2)).and_4spn93_k$(new Long(-1, 0));
    var this_0 = tmp.div_jun7gj_k$(tmp$ret$1);
    return _UInt___init__impl__l7qpdl(this_0.toInt_1tsl84_k$());
  }
  function uintRemainder(v1, v2) {
    // Inline function 'kotlin.toUInt' call
    // Inline function 'kotlin.UInt.toLong' call
    var tmp = toLong(_UInt___get_data__impl__f0vqqw(v1)).and_4spn93_k$(new Long(-1, 0));
    // Inline function 'kotlin.UInt.toLong' call
    var tmp$ret$1 = toLong(_UInt___get_data__impl__f0vqqw(v2)).and_4spn93_k$(new Long(-1, 0));
    var this_0 = tmp.rem_bsnl9o_k$(tmp$ret$1);
    return _UInt___init__impl__l7qpdl(this_0.toInt_1tsl84_k$());
  }
  function uintToDouble(v) {
    return (v & IntCompanionObject_getInstance().MAX_VALUE) + ((v >>> 31 | 0) << 30) * 2;
  }
  function ulongCompare(v1, v2) {
    Companion_getInstance_3();
    var tmp = v1.xor_qzz94j_k$(new Long(0, -2147483648));
    Companion_getInstance_3();
    return tmp.compareTo_9jj042_k$(v2.xor_qzz94j_k$(new Long(0, -2147483648)));
  }
  function ulongDivide(v1, v2) {
    // Inline function 'kotlin.ULong.toLong' call
    var dividend = _ULong___get_data__impl__fggpzb(v1);
    // Inline function 'kotlin.ULong.toLong' call
    var divisor = _ULong___get_data__impl__fggpzb(v2);
    if (divisor.compareTo_9jj042_k$(new Long(0, 0)) < 0) {
      var tmp;
      // Inline function 'kotlin.ULong.compareTo' call
      if (ulongCompare(_ULong___get_data__impl__fggpzb(v1), _ULong___get_data__impl__fggpzb(v2)) < 0) {
        tmp = _ULong___init__impl__c78o9k(new Long(0, 0));
      } else {
        tmp = _ULong___init__impl__c78o9k(new Long(1, 0));
      }
      return tmp;
    }
    if (dividend.compareTo_9jj042_k$(new Long(0, 0)) >= 0) {
      return _ULong___init__impl__c78o9k(dividend.div_jun7gj_k$(divisor));
    }
    var quotient = dividend.ushr_z7nmq8_k$(1).div_jun7gj_k$(divisor).shl_bg8if3_k$(1);
    var rem = dividend.minus_mfbszm_k$(quotient.times_nfzjiw_k$(divisor));
    // Inline function 'kotlin.Long.plus' call
    var tmp_0;
    // Inline function 'kotlin.ULong.compareTo' call
    var this_0 = _ULong___init__impl__c78o9k(rem);
    var other = _ULong___init__impl__c78o9k(divisor);
    if (ulongCompare(_ULong___get_data__impl__fggpzb(this_0), _ULong___get_data__impl__fggpzb(other)) >= 0) {
      tmp_0 = 1;
    } else {
      tmp_0 = 0;
    }
    var other_0 = tmp_0;
    var tmp$ret$4 = quotient.plus_r93sks_k$(toLong(other_0));
    return _ULong___init__impl__c78o9k(tmp$ret$4);
  }
  function ulongRemainder(v1, v2) {
    // Inline function 'kotlin.ULong.toLong' call
    var dividend = _ULong___get_data__impl__fggpzb(v1);
    // Inline function 'kotlin.ULong.toLong' call
    var divisor = _ULong___get_data__impl__fggpzb(v2);
    if (divisor.compareTo_9jj042_k$(new Long(0, 0)) < 0) {
      var tmp;
      // Inline function 'kotlin.ULong.compareTo' call
      if (ulongCompare(_ULong___get_data__impl__fggpzb(v1), _ULong___get_data__impl__fggpzb(v2)) < 0) {
        tmp = v1;
      } else {
        // Inline function 'kotlin.ULong.minus' call
        tmp = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(v1).minus_mfbszm_k$(_ULong___get_data__impl__fggpzb(v2)));
      }
      return tmp;
    }
    if (dividend.compareTo_9jj042_k$(new Long(0, 0)) >= 0) {
      return _ULong___init__impl__c78o9k(dividend.rem_bsnl9o_k$(divisor));
    }
    var quotient = dividend.ushr_z7nmq8_k$(1).div_jun7gj_k$(divisor).shl_bg8if3_k$(1);
    var rem = dividend.minus_mfbszm_k$(quotient.times_nfzjiw_k$(divisor));
    var tmp_0;
    // Inline function 'kotlin.ULong.compareTo' call
    var this_0 = _ULong___init__impl__c78o9k(rem);
    var other = _ULong___init__impl__c78o9k(divisor);
    if (ulongCompare(_ULong___get_data__impl__fggpzb(this_0), _ULong___get_data__impl__fggpzb(other)) >= 0) {
      tmp_0 = divisor;
    } else {
      tmp_0 = new Long(0, 0);
    }
    return _ULong___init__impl__c78o9k(rem.minus_mfbszm_k$(tmp_0));
  }
  function ulongToDouble(v) {
    return v.ushr_z7nmq8_k$(11).toDouble_ygsx0s_k$() * 2048 + v.and_4spn93_k$(new Long(2047, 0)).toDouble_ygsx0s_k$();
  }
  function ulongToString(v) {
    return ulongToString_0(v, 10);
  }
  function ulongToString_0(v, base) {
    if (v.compareTo_9jj042_k$(new Long(0, 0)) >= 0)
      return toString_3(v, base);
    // Inline function 'kotlin.Long.div' call
    var quotient = v.ushr_z7nmq8_k$(1).div_jun7gj_k$(toLong(base)).shl_bg8if3_k$(1);
    // Inline function 'kotlin.Long.times' call
    var tmp$ret$1 = quotient.times_nfzjiw_k$(toLong(base));
    var rem = v.minus_mfbszm_k$(tmp$ret$1);
    if (rem.compareTo_9jj042_k$(toLong(base)) >= 0) {
      // Inline function 'kotlin.Long.minus' call
      rem = rem.minus_mfbszm_k$(toLong(base));
      // Inline function 'kotlin.Long.plus' call
      quotient = quotient.plus_r93sks_k$(toLong(1));
    }
    return toString_3(quotient, base) + toString_3(rem, base);
  }
  function doubleToUInt(v) {
    var tmp;
    if (isNaN_0(v)) {
      tmp = _UInt___init__impl__l7qpdl(0);
    } else {
      // Inline function 'kotlin.UInt.toDouble' call
      Companion_getInstance_17();
      var this_0 = _UInt___init__impl__l7qpdl(0);
      if (v <= uintToDouble(_UInt___get_data__impl__f0vqqw(this_0))) {
        Companion_getInstance_17();
        tmp = _UInt___init__impl__l7qpdl(0);
      } else {
        // Inline function 'kotlin.UInt.toDouble' call
        Companion_getInstance_17();
        var this_1 = _UInt___init__impl__l7qpdl(-1);
        if (v >= uintToDouble(_UInt___get_data__impl__f0vqqw(this_1))) {
          Companion_getInstance_17();
          tmp = _UInt___init__impl__l7qpdl(-1);
        } else {
          if (v <= IntCompanionObject_getInstance().MAX_VALUE) {
            // Inline function 'kotlin.toUInt' call
            var this_2 = numberToInt(v);
            tmp = _UInt___init__impl__l7qpdl(this_2);
          } else {
            // Inline function 'kotlin.UInt.plus' call
            // Inline function 'kotlin.toUInt' call
            var this_3 = numberToInt(v - IntCompanionObject_getInstance().MAX_VALUE);
            var this_4 = _UInt___init__impl__l7qpdl(this_3);
            // Inline function 'kotlin.toUInt' call
            var this_5 = IntCompanionObject_getInstance().MAX_VALUE;
            var other = _UInt___init__impl__l7qpdl(this_5);
            tmp = _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(this_4) + _UInt___get_data__impl__f0vqqw(other) | 0);
          }
        }
      }
    }
    return tmp;
  }
  function doubleToULong(v) {
    var tmp;
    if (isNaN_0(v)) {
      tmp = _ULong___init__impl__c78o9k(new Long(0, 0));
    } else {
      // Inline function 'kotlin.ULong.toDouble' call
      Companion_getInstance_20();
      var this_0 = _ULong___init__impl__c78o9k(new Long(0, 0));
      if (v <= ulongToDouble(_ULong___get_data__impl__fggpzb(this_0))) {
        Companion_getInstance_20();
        tmp = _ULong___init__impl__c78o9k(new Long(0, 0));
      } else {
        // Inline function 'kotlin.ULong.toDouble' call
        Companion_getInstance_20();
        var this_1 = _ULong___init__impl__c78o9k(new Long(-1, -1));
        if (v >= ulongToDouble(_ULong___get_data__impl__fggpzb(this_1))) {
          Companion_getInstance_20();
          tmp = _ULong___init__impl__c78o9k(new Long(-1, -1));
        } else {
          Companion_getInstance_3();
          if (v < (new Long(-1, 2147483647)).toDouble_ygsx0s_k$()) {
            // Inline function 'kotlin.toULong' call
            var this_2 = numberToLong(v);
            tmp = _ULong___init__impl__c78o9k(this_2);
          } else {
            // Inline function 'kotlin.ULong.plus' call
            // Inline function 'kotlin.toULong' call
            var this_3 = numberToLong(v - 9.223372036854776E18);
            var this_4 = _ULong___init__impl__c78o9k(this_3);
            var other = _ULong___init__impl__c78o9k(new Long(0, -2147483648));
            tmp = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_4).plus_r93sks_k$(_ULong___get_data__impl__fggpzb(other)));
          }
        }
      }
    }
    return tmp;
  }
  function ExperimentalUnsignedTypes() {
  }
  protoOf(ExperimentalUnsignedTypes).equals = function (other) {
    if (!(other instanceof ExperimentalUnsignedTypes))
      return false;
    other instanceof ExperimentalUnsignedTypes || THROW_CCE();
    return true;
  };
  protoOf(ExperimentalUnsignedTypes).hashCode = function () {
    return 0;
  };
  protoOf(ExperimentalUnsignedTypes).toString = function () {
    return '@kotlin.ExperimentalUnsignedTypes()';
  };
  function Imagem(w, h, px) {
    this.w_1 = w;
    this.h_1 = h;
    this.px_1 = px;
  }
  protoOf(Imagem).get_w_1mhr66_k$ = function () {
    return this.w_1;
  };
  protoOf(Imagem).get_h_1mhr5r_k$ = function () {
    return this.h_1;
  };
  protoOf(Imagem).get_px_kntnqn_k$ = function () {
    return this.px_1;
  };
  function _get_max__e6co8d($this) {
    return $this.max_1;
  }
  function _get_m__7mloqs($this) {
    return $this.m_1;
  }
  function _get_c__7mloi6($this) {
    return $this.c_1;
  }
  function _get_centro__m8eo8q($this) {
    return $this.centro_1;
  }
  function _get_escala__dkmlnu($this) {
    return $this.escala_1;
  }
  function sam$pt_decisaoessencial_digitalizador_CorrecaoPaginas_Lado$0(function_0) {
    this.function_1 = function_0;
  }
  protoOf(sam$pt_decisaoessencial_digitalizador_CorrecaoPaginas_Lado$0).x_rqsusy_k$ = function (y) {
    return this.function_1(y);
  };
  function medir$bordo(f, ytop, alt, ybot, h, w, lab, maior, gx, ladoEsquerdo, janela) {
    var ys = ArrayList_init_$Create$();
    var xsE = ArrayList_init_$Create$();
    var ysM = ArrayList_init_$Create$();
    var xsM = ArrayList_init_$Create$();
    // Inline function 'kotlin.math.max' call
    var b = roundToInt(40 * f);
    var passo = Math.max(10, b);
    // Inline function 'kotlin.math.max' call
    var b_0 = roundToInt(60 * f);
    var banda = Math.max(10, b_0);
    var y0 = ytop + numberToInt(0.15 * alt) | 0;
    while (y0 < (ybot - numberToInt(0.15 * alt) | 0)) {
      // Inline function 'kotlin.math.min' call
      var a = h - 1 | 0;
      var b_1 = y0 + (banda / 2 | 0) | 0;
      var yc = Math.min(a, b_1);
      var le = -1;
      var ld = -1;
      var inductionVariable = 0;
      if (inductionVariable < w)
        do {
          var x = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (lab[imul(yc, w) + x | 0] === maior.id_1) {
            if (le < 0)
              le = x;
            ld = x;
          }
        }
         while (inductionVariable < w);
      if (le >= 0) {
        var p = new Float64Array(w);
        // Inline function 'kotlin.math.max' call
        var b_2 = ladoEsquerdo ? le : (ld - janela | 0) - numberToInt(80 * f) | 0;
        var lo = Math.max(1, b_2);
        // Inline function 'kotlin.math.min' call
        var a_0 = w - 2 | 0;
        var b_3 = ladoEsquerdo ? (le + janela | 0) + numberToInt(80 * f) | 0 : ld;
        var hi = Math.min(a_0, b_3);
        var inductionVariable_0 = lo;
        if (inductionVariable_0 <= hi)
          do {
            var x_0 = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            var s = 0.0;
            var inductionVariable_1 = y0;
            // Inline function 'kotlin.math.min' call
            var b_4 = y0 + banda | 0;
            var last = Math.min(h, b_4);
            if (inductionVariable_1 < last)
              do {
                var y = inductionVariable_1;
                inductionVariable_1 = inductionVariable_1 + 1 | 0;
                s = s + gx[imul(y, w) + x_0 | 0];
              }
               while (inductionVariable_1 < last);
            p[x_0] = s / banda;
          }
           while (!(x_0 === hi));
        var pm = new Float64Array(w);
        var inductionVariable_2 = lo + 2 | 0;
        var last_0 = hi - 2 | 0;
        if (inductionVariable_2 <= last_0)
          do {
            var x_1 = inductionVariable_2;
            inductionVariable_2 = inductionVariable_2 + 1 | 0;
            pm[x_1] = (p[x_1 - 2 | 0] + p[x_1 - 1 | 0] + p[x_1] + p[x_1 + 1 | 0] + p[x_1 + 2 | 0]) / 5;
          }
           while (!(x_1 === last_0));
        if (ladoEsquerdo) {
          var tmp = CorrecaoPaginas_getInstance();
          var tmp_0 = 0;
          // Inline function 'kotlin.math.max' call
          var b_5 = numberToInt(80 * f);
          var tmp_1 = Math.max(1, b_5);
          var tmp_2 = new Float64Array(tmp_1);
          while (tmp_0 < tmp_1) {
            var tmp_3 = tmp_0;
            // Inline function 'kotlin.math.min' call
            var a_1 = hi - 2 | 0;
            var b_6 = (le + janela | 0) + tmp_3 | 0;
            tmp_2[tmp_3] = pm[Math.min(a_1, b_6)];
            tmp_0 = tmp_0 + 1 | 0;
          }
          var bs = mediana_0(tmp, tmp_2);
          // Inline function 'kotlin.math.max' call
          var b_7 = 4 * bs;
          var lim = Math.max(3.0, b_7);
          var ult = -1;
          var inductionVariable_3 = le;
          // Inline function 'kotlin.math.min' call
          var b_8 = le + janela | 0;
          var last_1 = Math.min(w, b_8);
          if (inductionVariable_3 < last_1)
            do {
              var x_2 = inductionVariable_3;
              inductionVariable_3 = inductionVariable_3 + 1 | 0;
              if (pm[x_2] > lim)
                ult = x_2;
            }
             while (inductionVariable_3 < last_1);
          if (ult >= 0) {
            ys.add_utx5q5_k$(yc);
            xsE.add_utx5q5_k$(ult);
          }
          ysM.add_utx5q5_k$(yc);
          xsM.add_utx5q5_k$(le);
        } else {
          var tmp_4 = CorrecaoPaginas_getInstance();
          var tmp_5 = 0;
          // Inline function 'kotlin.math.max' call
          var b_9 = numberToInt(80 * f);
          var tmp_6 = Math.max(1, b_9);
          var tmp_7 = new Float64Array(tmp_6);
          while (tmp_5 < tmp_6) {
            var tmp_8 = tmp_5;
            // Inline function 'kotlin.math.max' call
            var a_2 = lo + 2 | 0;
            var b_10 = ((ld - janela | 0) - 1 | 0) - tmp_8 | 0;
            tmp_7[tmp_8] = pm[Math.max(a_2, b_10)];
            tmp_5 = tmp_5 + 1 | 0;
          }
          var bs_0 = mediana_0(tmp_4, tmp_7);
          // Inline function 'kotlin.math.max' call
          var b_11 = 4 * bs_0;
          var lim_0 = Math.max(3.0, b_11);
          var pri = -1;
          // Inline function 'kotlin.math.max' call
          var b_12 = ld - janela | 0;
          var inductionVariable_4 = Math.max(0, b_12);
          var last_2 = ld;
          if (inductionVariable_4 < last_2)
            $l$loop: do {
              var x_3 = inductionVariable_4;
              inductionVariable_4 = inductionVariable_4 + 1 | 0;
              if (pm[x_3] > lim_0) {
                pri = x_3;
                break $l$loop;
              }
            }
             while (inductionVariable_4 < last_2);
          if (pri >= 0) {
            ys.add_utx5q5_k$(yc);
            xsE.add_utx5q5_k$(pri);
          }
          ysM.add_utx5q5_k$(yc);
          xsM.add_utx5q5_k$(ld);
        }
      }
      y0 = y0 + passo | 0;
    }
    var p_0 = ys.get_size_woubt6_k$() >= 4 ? ajustarRobusto(CorrecaoPaginas_getInstance(), toDoubleArray(ys), toDoubleArray(xsE), 1, 3.0, 2.0) : ajustarRobusto(CorrecaoPaginas_getInstance(), toDoubleArray(ysM), toDoubleArray(xsM), 1, 3.0, 2.0);
    var tmp_9 = CorrecaoPaginas$Geometria$Companion$medir$bordo$lambda(p_0);
    return new sam$pt_decisaoessencial_digitalizador_CorrecaoPaginas_Lado$0(tmp_9);
  }
  function CorrecaoPaginas$Geometria$Companion$medir$lambda($spD, $f) {
    return function (it) {
      return $spD - 10 * $f;
    };
  }
  function CorrecaoPaginas$Geometria$Companion$medir$lambda_0($spD, $f) {
    return function (it) {
      return $spD + 10 * $f;
    };
  }
  function CorrecaoPaginas$Geometria$Companion$medir$bordo$lambda($p) {
    return function (y) {
      return $p.v_w1w1cg_k$(y);
    };
  }
  function Companion_24() {
    Companion_instance_24 = this;
  }
  protoOf(Companion_24).medir_bikrrs_k$ = function (img) {
    var w = img.w_1;
    var h = img.h_1;
    // Inline function 'kotlin.math.max' call
    var f = Math.max(w, h) / 2048.0;
    var tmp = 0;
    var tmp_0 = imul(w, h) / 16 | 0;
    var tmp_1 = new Float64Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      tmp_1[tmp_2] = brilho(CorrecaoPaginas_getInstance(), img.px_1[imul(tmp_2, 16) % imul(w, h) | 0]);
      tmp = tmp + 1 | 0;
    }
    var brilhos = tmp_1;
    // Inline function 'kotlin.math.min' call
    var b = 0.75 * percentil(CorrecaoPaginas_getInstance(), brilhos, 90.0);
    var limV = Math.min(170.0, b);
    var tmp_3 = 0;
    var tmp_4 = imul(w, h);
    var tmp_5 = new Int32Array(tmp_4);
    while (tmp_3 < tmp_4) {
      var tmp_6 = tmp_3;
      var c = img.px_1[tmp_6];
      tmp_5[tmp_6] = (sat(CorrecaoPaginas_getInstance(), c) < 28 ? brilho(CorrecaoPaginas_getInstance(), c) > limV : false) ? 1 : 0;
      tmp_3 = tmp_3 + 1 | 0;
    }
    var m = tmp_5;
    // Inline function 'kotlin.math.max' call
    var b_0 = roundToInt(20 * f);
    var rf = Math.max(3, b_0);
    m = fechar(CorrecaoPaginas_getInstance(), m, w, h, rf, rf);
    var tmp0_container = componentes(CorrecaoPaginas_getInstance(), m, w, h);
    var lab = tmp0_container.component1_7eebsc_k$();
    var comps = tmp0_container.component2_7eebsb_k$();
    var tmp$ret$5;
    $l$block_0: {
      // Inline function 'kotlin.collections.maxByOrNull' call
      var iterator = comps.iterator_jk1svi_k$();
      if (!iterator.hasNext_bitz1p_k$()) {
        tmp$ret$5 = null;
        break $l$block_0;
      }
      var maxElem = iterator.next_20eer_k$();
      if (!iterator.hasNext_bitz1p_k$()) {
        tmp$ret$5 = maxElem;
        break $l$block_0;
      }
      // Inline function 'pt.decisaoessencial.digitalizador.Companion.medir.<anonymous>' call
      var maxValue = maxElem.area_1;
      do {
        var e = iterator.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.Companion.medir.<anonymous>' call
        var v = e.area_1;
        if (compareTo_0(maxValue, v) < 0) {
          maxElem = e;
          maxValue = v;
        }
      }
       while (iterator.hasNext_bitz1p_k$());
      tmp$ret$5 = maxElem;
    }
    var tmp1_elvis_lhs = tmp$ret$5;
    var tmp_7;
    if (tmp1_elvis_lhs == null) {
      return null;
    } else {
      tmp_7 = tmp1_elvis_lhs;
    }
    var maior = tmp_7;
    if (maior.area_1 < 0.15 * w * h)
      return null;
    var top = new Float64Array(w);
    var bot = new Float64Array(w);
    var col = new Int32Array(w);
    var inductionVariable = 0;
    if (inductionVariable < w)
      do {
        var x = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var t = -1;
        var b_1 = -1;
        var inductionVariable_0 = 0;
        if (inductionVariable_0 < h)
          do {
            var y = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            if (lab[imul(y, w) + x | 0] === maior.id_1) {
              if (t < 0)
                t = y;
              b_1 = y;
              col[x] = col[x] + 1 | 0;
            }
          }
           while (inductionVariable_0 < h);
        top[x] = t;
        bot[x] = b_1;
      }
       while (inductionVariable < w);
    var cmax = max_2(col);
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var this_0 = until(0, w);
    var destination = ArrayList_init_$Create$();
    var tmp0_iterator = this_0.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.Companion.medir.<anonymous>' call
      if (col[element] > 0.5 * cmax) {
        destination.add_utx5q5_k$(element);
      }
    }
    var xs = destination;
    if (xs.get_size_woubt6_k$() < 20)
      return null;
    var x0 = first_0(xs);
    var x1 = last_0(xs);
    var tmp_8 = CorrecaoPaginas_getInstance();
    var tmp_9 = 0;
    var tmp_10 = x1 - x0 | 0;
    var tmp_11 = new Float64Array(tmp_10);
    while (tmp_9 < tmp_10) {
      var tmp_12 = tmp_9;
      tmp_11[tmp_12] = top[x0 + tmp_12 | 0];
      tmp_9 = tmp_9 + 1 | 0;
    }
    var ytop = numberToInt(mediana_0(tmp_8, tmp_11));
    var tmp_13 = CorrecaoPaginas_getInstance();
    var tmp_14 = 0;
    var tmp_15 = x1 - x0 | 0;
    var tmp_16 = new Float64Array(tmp_15);
    while (tmp_14 < tmp_15) {
      var tmp_17 = tmp_14;
      tmp_16[tmp_17] = bot[x0 + tmp_17 | 0];
      tmp_14 = tmp_14 + 1 | 0;
    }
    var ybot = numberToInt(mediana_0(tmp_13, tmp_16));
    var alt = ybot - ytop | 0;
    if (alt < 50)
      return null;
    var ts = suavizar(CorrecaoPaginas_getInstance(), top, 7 * f);
    var a = numberToInt(x0 + 0.4 * (x1 - x0 | 0));
    var b_2 = numberToInt(x0 + 0.6 * (x1 - x0 | 0));
    var sp = a;
    var inductionVariable_1 = a;
    if (inductionVariable_1 < b_2)
      do {
        var x_0 = inductionVariable_1;
        inductionVariable_1 = inductionVariable_1 + 1 | 0;
        if (ts[x_0] > ts[sp])
          sp = x_0;
      }
       while (inductionVariable_1 < b_2);
    var q1 = numberToInt(x0 + 0.25 * (x1 - x0 | 0));
    var q3 = numberToInt(x0 + 0.75 * (x1 - x0 | 0));
    var tmp_18 = ts[sp];
    // Inline function 'kotlin.math.max' call
    var a_0 = ts[q1];
    var b_3 = ts[q3];
    var prof = tmp_18 - Math.max(a_0, b_3);
    var duplo = prof > 0.015 * h ? (x1 - x0 | 0) > 1.15 * alt : false;
    if (!duplo ? (x1 - x0 | 0) > 1.15 * alt : false) {
      var tmp_19 = 0;
      var tmp_20 = new Float64Array(w);
      while (tmp_19 < w) {
        var tmp_21 = tmp_19;
        var s = 0.0;
        var progression = step(until(ytop, ybot), 4);
        var inductionVariable_2 = progression.first_1;
        var last = progression.last_1;
        var step_0 = progression.step_1;
        if ((step_0 > 0 ? inductionVariable_2 <= last : false) ? true : step_0 < 0 ? last <= inductionVariable_2 : false)
          do {
            var y_0 = inductionVariable_2;
            inductionVariable_2 = inductionVariable_2 + step_0 | 0;
            s = s + cinz(CorrecaoPaginas_getInstance(), img.px_1[imul(y_0, w) + tmp_21 | 0]);
          }
           while (!(y_0 === last));
        tmp_20[tmp_21] = s;
        tmp_19 = tmp_19 + 1 | 0;
      }
      var colBrilho = tmp_20;
      var cs = suavizar(CorrecaoPaginas_getInstance(), colBrilho, 5 * f);
      var mn = a;
      var inductionVariable_3 = a;
      if (inductionVariable_3 < b_2)
        do {
          var x_1 = inductionVariable_3;
          inductionVariable_3 = inductionVariable_3 + 1 | 0;
          if (cs[x_1] < cs[mn])
            mn = x_1;
        }
         while (inductionVariable_3 < b_2);
      var tmp_22 = cs[mn];
      var tmp_23 = CorrecaoPaginas_getInstance();
      var tmp_24 = 0;
      var tmp_25 = x1 - x0 | 0;
      var tmp_26 = new Float64Array(tmp_25);
      while (tmp_24 < tmp_25) {
        var tmp_27 = tmp_24;
        tmp_26[tmp_27] = cs[x0 + tmp_27 | 0];
        tmp_24 = tmp_24 + 1 | 0;
      }
      if (tmp_22 < 0.85 * mediana_0(tmp_23, tmp_26)) {
        sp = mn;
        duplo = true;
      }
    }
    var tmp_28 = 0;
    var tmp_29 = imul(w, h);
    var tmp_30 = new Float32Array(tmp_29);
    while (tmp_28 < tmp_29) {
      var tmp_31 = tmp_28;
      tmp_30[tmp_31] = cinz(CorrecaoPaginas_getInstance(), img.px_1[tmp_31]);
      tmp_28 = tmp_28 + 1 | 0;
    }
    var g = tmp_30;
    var gb = somaJanelaF(CorrecaoPaginas_getInstance(), g, w, h, 1, roundToInt(20 * f));
    var gx = new Float32Array(imul(w, h));
    var inductionVariable_4 = 0;
    if (inductionVariable_4 < h)
      do {
        var y_1 = inductionVariable_4;
        inductionVariable_4 = inductionVariable_4 + 1 | 0;
        var inductionVariable_5 = 1;
        var last_1 = w - 1 | 0;
        if (inductionVariable_5 < last_1)
          do {
            var x_2 = inductionVariable_5;
            inductionVariable_5 = inductionVariable_5 + 1 | 0;
            var tmp_32 = imul(y_1, w) + x_2 | 0;
            // Inline function 'kotlin.math.abs' call
            var x_3 = gb[(imul(y_1, w) + x_2 | 0) + 1 | 0] - gb[(imul(y_1, w) + x_2 | 0) - 1 | 0];
            gx[tmp_32] = 4.0 * Math.abs(x_3) / imul(3, imul(2, roundToInt(20 * f)) + 1 | 0);
          }
           while (inductionVariable_5 < last_1);
      }
       while (inductionVariable_4 < h);
    var tmp_33;
    if (duplo) {
      var spD = sp;
      var tmp_34 = medir$bordo(f, ytop, alt, ybot, h, w, lab, maior, gx, true, numberToInt(0.15 * (sp - x0 | 0)));
      var tmp_35 = CorrecaoPaginas$Geometria$Companion$medir$lambda(spD, f);
      var tmp_36 = new Pagina(tmp_34, new sam$pt_decisaoessencial_digitalizador_CorrecaoPaginas_Lado$0(tmp_35), true);
      var tmp_37 = CorrecaoPaginas$Geometria$Companion$medir$lambda_0(spD, f);
      tmp_33 = listOf_0([tmp_36, new Pagina(new sam$pt_decisaoessencial_digitalizador_CorrecaoPaginas_Lado$0(tmp_37), medir$bordo(f, ytop, alt, ybot, h, w, lab, maior, gx, false, numberToInt(0.15 * (x1 - sp | 0))), false)]);
    } else {
      tmp_33 = listOf(new Pagina(medir$bordo(f, ytop, alt, ybot, h, w, lab, maior, gx, true, numberToInt(0.12 * (x1 - x0 | 0))), medir$bordo(f, ytop, alt, ybot, h, w, lab, maior, gx, false, numberToInt(0.12 * (x1 - x0 | 0))), null));
    }
    var paginas = tmp_33;
    return new Geometria(top, bot, paginas, duplo ? sp : null);
  };
  var Companion_instance_24;
  function Companion_getInstance_24() {
    if (Companion_instance_24 == null)
      new Companion_24();
    return Companion_instance_24;
  }
  function _get_MARGEM_INT__x2j4ru($this) {
    return $this.MARGEM_INT_1;
  }
  function _get_MARGEM_EXT__x2gs8o($this) {
    return $this.MARGEM_EXT_1;
  }
  function _get_MARGEM_SUP__x2pnqj($this) {
    return $this.MARGEM_SUP_1;
  }
  function _get_MARGEM_INF__x2j4fs($this) {
    return $this.MARGEM_INF_1;
  }
  function _get_LADO_TRABALHO__djmvj5($this) {
    return $this.LADO_TRABALHO_1;
  }
  function ladoDaLombada($this, img) {
    var p = reduzir($this, img, 800);
    var w = p.w_1;
    var h = p.h_1;
    var m = mascaraPapel($this, p, true);
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var this_0 = until(0, w);
    var destination = ArrayList_init_$Create$();
    var tmp0_iterator = this_0.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.ladoDaLombada.<anonymous>' call
      var tmp$ret$0;
      $l$block: {
        // Inline function 'kotlin.collections.count' call
        var this_1 = step(until(h / 5 | 0, imul(4, h) / 5 | 0), 4);
        var tmp;
        if (isInterface(this_1, Collection)) {
          tmp = this_1.isEmpty_y1axqb_k$();
        } else {
          tmp = false;
        }
        if (tmp) {
          tmp$ret$0 = 0;
          break $l$block;
        }
        var count = 0;
        var tmp0_iterator_0 = this_1.iterator_jk1svi_k$();
        while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
          var element_0 = tmp0_iterator_0.next_20eer_k$();
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.ladoDaLombada.<anonymous>.<anonymous>' call
          if (m[imul(element_0, w) + element | 0] === 1) {
            count = count + 1 | 0;
            checkCountOverflow(count);
          }
        }
        tmp$ret$0 = count;
      }
      if (tmp$ret$0 > 0.5 * (imul(3, h) / 5 | 0) / 4) {
        destination.add_utx5q5_k$(element);
      }
    }
    var cols = destination;
    if (cols.get_size_woubt6_k$() < 0.3 * w)
      return null;
    var a = first_0(cols);
    var b = last_0(cols);
    // Inline function 'kotlin.math.max' call
    var b_0 = numberToInt(0.08 * (b - a | 0));
    var fx = Math.max(3, b_0);
    var le = ladoDaLombada$lum(h, m, w, p, a, a + fx | 0);
    var ld = ladoDaLombada$lum(h, m, w, p, b - fx | 0, b);
    var tmp_0;
    if (isNaN_0(le) ? true : isNaN_0(ld)) {
      tmp_0 = true;
    } else {
      // Inline function 'kotlin.math.abs' call
      var x = le - ld;
      tmp_0 = Math.abs(x) < 10.0;
    }
    if (tmp_0)
      return null;
    return ld < le;
  }
  function BlocoPlano(t, wBloco, hBloco, ox, oy) {
    this.t_1 = t;
    this.wBloco_1 = wBloco;
    this.hBloco_1 = hBloco;
    this.ox_1 = ox;
    this.oy_1 = oy;
  }
  protoOf(BlocoPlano).get_t_1mhr63_k$ = function () {
    return this.t_1;
  };
  protoOf(BlocoPlano).get_wBloco_ksauzn_k$ = function () {
    return this.wBloco_1;
  };
  protoOf(BlocoPlano).get_hBloco_domj2q_k$ = function () {
    return this.hBloco_1;
  };
  protoOf(BlocoPlano).get_ox_kntnri_k$ = function () {
    return this.ox_1;
  };
  protoOf(BlocoPlano).get_oy_kntnrh_k$ = function () {
    return this.oy_1;
  };
  function blocoPlano($this, img, mEsq, mDir, mSup, mInf) {
    var p = reduzirAltura($this, img, 1200);
    var sc = img.h_1 / p.h_1;
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var this_0 = elementos($this, p, 20.0);
    var destination = ArrayList_init_$Create$();
    var tmp0_iterator = this_0.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.blocoPlano.<anonymous>' call
      if (element.tipo_1 === 0 ? element.xs_1.length >= 8 : false) {
        destination.add_utx5q5_k$(element);
      }
    }
    var todas = destination;
    if (todas.get_size_woubt6_k$() < 6)
      return null;
    // Inline function 'kotlin.collections.maxOf' call
    var iterator = todas.iterator_jk1svi_k$();
    if (!iterator.hasNext_bitz1p_k$())
      throw NoSuchElementException_init_$Create$();
    // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.blocoPlano.<anonymous>' call
    var it = iterator.next_20eer_k$();
    var maxValue = it.x1__1 - it.x0__1 | 0;
    while (iterator.hasNext_bitz1p_k$()) {
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.blocoPlano.<anonymous>' call
      var it_0 = iterator.next_20eer_k$();
      var v = it_0.x1__1 - it_0.x0__1 | 0;
      if (compareTo_0(maxValue, v) < 0) {
        maxValue = v;
      }
    }
    var lmax = maxValue;
    // Inline function 'kotlin.collections.sortedBy' call
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var destination_0 = ArrayList_init_$Create$();
    var tmp0_iterator_0 = todas.iterator_jk1svi_k$();
    while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
      var element_0 = tmp0_iterator_0.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.blocoPlano.<anonymous>' call
      if ((element_0.x1__1 - element_0.x0__1 | 0) >= 0.6 * lmax) {
        destination_0.add_utx5q5_k$(element_0);
      }
    }
    // Inline function 'kotlin.comparisons.compareBy' call
    var tmp = CorrecaoPaginas$blocoPlano$lambda;
    var tmp$ret$9 = new sam$kotlin_Comparator$0_3(tmp);
    var linhas = sortedWith(destination_0, tmp$ret$9);
    if (linhas.get_size_woubt6_k$() < 5)
      return null;
    var topo = blocoPlano$ajusta(first_0(linhas));
    var base = blocoPlano$ajusta(last_0(linhas));
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination_1 = ArrayList_init_$Create$_0(collectionSizeOrDefault(linhas, 10));
    var tmp0_iterator_1 = linhas.iterator_jk1svi_k$();
    while (tmp0_iterator_1.hasNext_bitz1p_k$()) {
      var item = tmp0_iterator_1.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.blocoPlano.<anonymous>' call
      // Inline function 'kotlin.doubleArrayOf' call
      var tmp$ret$12 = new Float64Array([first(item.xs_1), first(item.ys_1)]);
      destination_1.add_utx5q5_k$(tmp$ret$12);
    }
    var ini = destination_1;
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination_2 = ArrayList_init_$Create$_0(collectionSizeOrDefault(linhas, 10));
    var tmp0_iterator_2 = linhas.iterator_jk1svi_k$();
    while (tmp0_iterator_2.hasNext_bitz1p_k$()) {
      var item_0 = tmp0_iterator_2.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.blocoPlano.<anonymous>' call
      // Inline function 'kotlin.doubleArrayOf' call
      var tmp$ret$16 = new Float64Array([last(item_0.xs_1), last(item_0.ys_1)]);
      destination_2.add_utx5q5_k$(tmp$ret$16);
    }
    var fim = destination_2;
    var tmp_0 = 0;
    var tmp_1 = ini.get_size_woubt6_k$();
    var tmp_2 = new Float64Array(tmp_1);
    while (tmp_0 < tmp_1) {
      var tmp_3 = tmp_0;
      tmp_2[tmp_3] = ini.get_c1px32_k$(tmp_3)[0];
      tmp_0 = tmp_0 + 1 | 0;
    }
    var medIni = mediana_0($this, tmp_2);
    var tmp_4 = 0;
    var tmp_5 = fim.get_size_woubt6_k$();
    var tmp_6 = new Float64Array(tmp_5);
    while (tmp_4 < tmp_5) {
      var tmp_7 = tmp_4;
      tmp_6[tmp_7] = fim.get_c1px32_k$(tmp_7)[0];
      tmp_4 = tmp_4 + 1 | 0;
    }
    var medFim = mediana_0($this, tmp_6);
    var tol = 0.04 * lmax;
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var destination_3 = ArrayList_init_$Create$();
    var tmp0_iterator_3 = ini.iterator_jk1svi_k$();
    while (tmp0_iterator_3.hasNext_bitz1p_k$()) {
      var element_1 = tmp0_iterator_3.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.blocoPlano.<anonymous>' call
      // Inline function 'kotlin.math.abs' call
      var x = element_1[0] - medIni;
      if (Math.abs(x) < 3 * tol) {
        destination_3.add_utx5q5_k$(element_1);
      }
    }
    var iniOk = destination_3;
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var destination_4 = ArrayList_init_$Create$();
    var tmp0_iterator_4 = fim.iterator_jk1svi_k$();
    while (tmp0_iterator_4.hasNext_bitz1p_k$()) {
      var element_2 = tmp0_iterator_4.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.blocoPlano.<anonymous>' call
      // Inline function 'kotlin.math.abs' call
      var x_0 = element_2[0] - medFim;
      if (Math.abs(x_0) < 3 * tol) {
        destination_4.add_utx5q5_k$(element_2);
      }
    }
    var fimOk = destination_4;
    if (iniOk.get_size_woubt6_k$() < 4 ? true : fimOk.get_size_woubt6_k$() < 4)
      return null;
    // Inline function 'kotlin.math.min' call
    var b = iniOk.get_size_woubt6_k$() / 4 | 0;
    var gE = Math.min(2, b);
    // Inline function 'kotlin.math.min' call
    var b_0 = fimOk.get_size_woubt6_k$() / 4 | 0;
    var gD = Math.min(2, b_0);
    var tmp_8 = 0;
    var tmp_9 = iniOk.get_size_woubt6_k$();
    var tmp_10 = new Float64Array(tmp_9);
    while (tmp_8 < tmp_9) {
      var tmp_11 = tmp_8;
      tmp_10[tmp_11] = iniOk.get_c1px32_k$(tmp_11)[1];
      tmp_8 = tmp_8 + 1 | 0;
    }
    var tmp_12 = 0;
    var tmp_13 = iniOk.get_size_woubt6_k$();
    var tmp_14 = new Float64Array(tmp_13);
    while (tmp_12 < tmp_13) {
      var tmp_15 = tmp_12;
      tmp_14[tmp_15] = iniOk.get_c1px32_k$(tmp_15)[0];
      tmp_12 = tmp_12 + 1 | 0;
    }
    var esq = ajustarRobusto$default($this, tmp_10, tmp_14, gE, 2.0);
    var tmp_16 = 0;
    var tmp_17 = fimOk.get_size_woubt6_k$();
    var tmp_18 = new Float64Array(tmp_17);
    while (tmp_16 < tmp_17) {
      var tmp_19 = tmp_16;
      tmp_18[tmp_19] = fimOk.get_c1px32_k$(tmp_19)[1];
      tmp_16 = tmp_16 + 1 | 0;
    }
    var tmp_20 = 0;
    var tmp_21 = fimOk.get_size_woubt6_k$();
    var tmp_22 = new Float64Array(tmp_21);
    while (tmp_20 < tmp_21) {
      var tmp_23 = tmp_20;
      tmp_22[tmp_23] = fimOk.get_c1px32_k$(tmp_23)[0];
      tmp_20 = tmp_20 + 1 | 0;
    }
    var dir = ajustarRobusto$default($this, tmp_18, tmp_22, gD, 2.0);
    var tl = blocoPlano$canto(esq, topo, first(first_0(linhas).ys_1));
    var tr = blocoPlano$canto(dir, topo, last(first_0(linhas).ys_1));
    var bl = blocoPlano$canto(esq, base, first(last_0(linhas).ys_1));
    var br = blocoPlano$canto(dir, base, last(last_0(linhas).ys_1));
    // Inline function 'kotlin.math.hypot' call
    var x_1 = tr[0] - tl[0];
    var y = tr[1] - tl[1];
    var wT = hypot(x_1, y);
    // Inline function 'kotlin.math.hypot' call
    var x_2 = br[0] - bl[0];
    var y_0 = br[1] - bl[1];
    var wBx = hypot(x_2, y_0);
    // Inline function 'kotlin.math.hypot' call
    var x_3 = bl[0] - tl[0];
    var y_1 = bl[1] - tl[1];
    var hL = hypot(x_3, y_1);
    // Inline function 'kotlin.math.hypot' call
    var x_4 = br[0] - tr[0];
    var y_2 = br[1] - tr[1];
    var hR = hypot(x_4, y_2);
    var tmp_24;
    // Inline function 'kotlin.math.abs' call
    var x_5 = wT - wBx;
    var tmp_25 = Math.abs(x_5);
    // Inline function 'kotlin.math.max' call
    if (tmp_25 > 0.25 * Math.max(wT, wBx)) {
      tmp_24 = true;
    } else {
      // Inline function 'kotlin.math.abs' call
      var x_6 = hL - hR;
      var tmp_26 = Math.abs(x_6);
      // Inline function 'kotlin.math.max' call
      tmp_24 = tmp_26 > 0.25 * Math.max(hL, hR);
    }
    if (tmp_24)
      return null;
    var wB = (wT + wBx) / 2;
    var hB = (hL + hR) / 2;
    if (wB < 0.3 * p.w_1 ? true : hB < 0.15 * p.h_1)
      return null;
    var wo = wB * (1 + mEsq + mDir);
    var ho = hB + wB * (mSup + mInf);
    var ox = wB * mEsq;
    var oy = wB * mSup;
    // Inline function 'kotlin.math.max' call
    var b_1 = roundToInt(wo * sc);
    var wOut = Math.max(2, b_1);
    // Inline function 'kotlin.math.max' call
    var b_2 = roundToInt(ho * sc);
    var hOut = Math.max(2, b_2);
    var t = new Transf(wOut, hOut, CorrecaoPaginas$blocoPlano$lambda_0(sc, ox, wB, oy, hB, tl, tr, topo, bl, br, base, esq, dir, img));
    return new BlocoPlano(t, wB * sc, hB * sc, ox * sc, oy * sc);
  }
  function Contorno(t, w, h, xEsq, xDir, ySup, yInf) {
    var tmp;
    if (xEsq === VOID) {
      DoubleCompanionObject_getInstance();
      tmp = NaN;
    } else {
      tmp = xEsq;
    }
    xEsq = tmp;
    var tmp_0;
    if (xDir === VOID) {
      DoubleCompanionObject_getInstance();
      tmp_0 = NaN;
    } else {
      tmp_0 = xDir;
    }
    xDir = tmp_0;
    var tmp_1;
    if (ySup === VOID) {
      DoubleCompanionObject_getInstance();
      tmp_1 = NaN;
    } else {
      tmp_1 = ySup;
    }
    ySup = tmp_1;
    var tmp_2;
    if (yInf === VOID) {
      DoubleCompanionObject_getInstance();
      tmp_2 = NaN;
    } else {
      tmp_2 = yInf;
    }
    yInf = tmp_2;
    this.t_1 = t;
    this.w_1 = w;
    this.h_1 = h;
    this.xEsq_1 = xEsq;
    this.xDir_1 = xDir;
    this.ySup_1 = ySup;
    this.yInf_1 = yInf;
  }
  protoOf(Contorno).get_t_1mhr63_k$ = function () {
    return this.t_1;
  };
  protoOf(Contorno).get_w_1mhr66_k$ = function () {
    return this.w_1;
  };
  protoOf(Contorno).get_h_1mhr5r_k$ = function () {
    return this.h_1;
  };
  protoOf(Contorno).get_xEsq_wowrw4_k$ = function () {
    return this.xEsq_1;
  };
  protoOf(Contorno).get_xDir_wowqwu_k$ = function () {
    return this.xDir_1;
  };
  protoOf(Contorno).get_ySup_woxpb2_k$ = function () {
    return this.ySup_1;
  };
  protoOf(Contorno).get_yInf_woxhpt_k$ = function () {
    return this.yInf_1;
  };
  function contornoPagina($this, img) {
    var p = reduzir($this, img, 900);
    var w = p.w_1;
    var h = p.h_1;
    var sc = img.w_1 / w;
    var m0 = mascaraPapel$default($this, p);
    var tmp0_container = componentes($this, m0, w, h);
    var lab = tmp0_container.component1_7eebsc_k$();
    var comps = tmp0_container.component2_7eebsb_k$();
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlin.collections.maxByOrNull' call
      var iterator = comps.iterator_jk1svi_k$();
      if (!iterator.hasNext_bitz1p_k$()) {
        tmp$ret$0 = null;
        break $l$block_0;
      }
      var maxElem = iterator.next_20eer_k$();
      if (!iterator.hasNext_bitz1p_k$()) {
        tmp$ret$0 = maxElem;
        break $l$block_0;
      }
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.contornoPagina.<anonymous>' call
      var maxValue = maxElem.area_1;
      do {
        var e = iterator.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.contornoPagina.<anonymous>' call
        var v = e.area_1;
        if (compareTo_0(maxValue, v) < 0) {
          maxElem = e;
          maxValue = v;
        }
      }
       while (iterator.hasNext_bitz1p_k$());
      tmp$ret$0 = maxElem;
    }
    var tmp1_elvis_lhs = tmp$ret$0;
    var tmp;
    if (tmp1_elvis_lhs == null) {
      return null;
    } else {
      tmp = tmp1_elvis_lhs;
    }
    var maior = tmp;
    if (maior.area_1 < 0.25 * w * h)
      return null;
    var tmp_0 = 0;
    var tmp_1 = imul(w, h);
    var tmp_2 = new Int32Array(tmp_1);
    while (tmp_0 < tmp_1) {
      var tmp_3 = tmp_0;
      tmp_2[tmp_3] = lab[tmp_3] === maior.id_1 ? 1 : 0;
      tmp_0 = tmp_0 + 1 | 0;
    }
    var m = tmp_2;
    var ys = ArrayList_init_$Create$();
    var xl = ArrayList_init_$Create$();
    var xr = ArrayList_init_$Create$();
    var ya = maior.y0__1 + numberToInt(0.15 * (maior.y1__1 - maior.y0__1 | 0)) | 0;
    var yb = maior.y1__1 - numberToInt(0.15 * (maior.y1__1 - maior.y0__1 | 0)) | 0;
    var inductionVariable = ya;
    var last = getProgressionLastElement(ya, yb, 2);
    if (inductionVariable <= last)
      do {
        var y = inductionVariable;
        inductionVariable = inductionVariable + 2 | 0;
        var a = -1;
        var b = -1;
        var inductionVariable_0 = 0;
        if (inductionVariable_0 < w)
          do {
            var x = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            if (m[imul(y, w) + x | 0] === 1) {
              if (a < 0)
                a = x;
              b = x;
            }
          }
           while (inductionVariable_0 < w);
        if (a >= 0 ? (b - a | 0) > 0.3 * w : false) {
          ys.add_utx5q5_k$(y);
          xl.add_utx5q5_k$(a);
          xr.add_utx5q5_k$(b);
        }
      }
       while (!(y === last));
    if (ys.get_size_woubt6_k$() < 20)
      return null;
    var yA = toDoubleArray(ys);
    var esq = ajustarRobusto$default($this, yA, toDoubleArray(xl), 1, 2.0);
    var dir = ajustarRobusto$default($this, yA, toDoubleArray(xr), 1, 2.0);
    var xm0 = numberToInt(esq.v_w1w1cg_k$((ya + yb | 0) / 2.0));
    var xm1 = numberToInt(dir.v_w1w1cg_k$((ya + yb | 0) / 2.0));
    if ((xm1 - xm0 | 0) < 0.3 * w)
      return null;
    var margem = numberToInt(0.04 * (xm1 - xm0 | 0));
    var xs = ArrayList_init_$Create$();
    var yt = ArrayList_init_$Create$();
    var yb2 = ArrayList_init_$Create$();
    var nestedFirst = xm0 + margem | 0;
    var nestedLast = xm1 - margem | 0;
    var inductionVariable_1 = nestedFirst;
    var last_0 = getProgressionLastElement(nestedFirst, nestedLast, 2);
    if (inductionVariable_1 <= last_0)
      do {
        var x_0 = inductionVariable_1;
        inductionVariable_1 = inductionVariable_1 + 2 | 0;
        var a_0 = -1;
        var b_0 = -1;
        var inductionVariable_2 = 0;
        if (inductionVariable_2 < h)
          do {
            var y_0 = inductionVariable_2;
            inductionVariable_2 = inductionVariable_2 + 1 | 0;
            if (m[imul(y_0, w) + x_0 | 0] === 1) {
              if (a_0 < 0)
                a_0 = y_0;
              b_0 = y_0;
            }
          }
           while (inductionVariable_2 < h);
        if (a_0 >= 0 ? (b_0 - a_0 | 0) > 0.3 * h : false) {
          xs.add_utx5q5_k$(x_0);
          yt.add_utx5q5_k$(a_0);
          yb2.add_utx5q5_k$(b_0);
        }
      }
       while (!(x_0 === last_0));
    if (xs.get_size_woubt6_k$() < 20)
      return null;
    var xA = toDoubleArray(xs);
    var sup = ajustarRobusto$default($this, xA, toDoubleArray(yt), 4, 2.0);
    var inf = ajustarRobusto$default($this, xA, toDoubleArray(yb2), 4, 2.0);
    var tl = contornoPagina$canto(ya, yb, esq, sup);
    var tr = contornoPagina$canto(ya, yb, dir, sup);
    var bl = contornoPagina$canto(ya, yb, esq, inf);
    var br = contornoPagina$canto(ya, yb, dir, inf);
    var n = 600;
    var ct = contornoPagina$curva(n, tl[0], tr[0], sup);
    var cb = contornoPagina$curva(n, bl[0], br[0], inf);
    // Inline function 'kotlin.math.hypot' call
    var x_1 = bl[0] - tl[0];
    var y_1 = bl[1] - tl[1];
    var lenL = hypot(x_1, y_1);
    // Inline function 'kotlin.math.hypot' call
    var x_2 = br[0] - tr[0];
    var y_2 = br[1] - tr[1];
    var lenR = hypot(x_2, y_2);
    var wPag = (ct[3][0] + cb[3][0]) / 2 * sc;
    var hPag = (lenL + lenR) / 2 * sc;
    var asp = hPag / wPag;
    if (((wPag < 0.3 * img.w_1 ? true : hPag < 0.3 * img.h_1) ? true : asp < 0.9) ? true : asp > 2.0)
      return null;
    // Inline function 'kotlin.math.max' call
    var b_1 = roundToInt(wPag);
    var wo = Math.max(2, b_1);
    // Inline function 'kotlin.math.max' call
    var b_2 = roundToInt(hPag);
    var ho = Math.max(2, b_2);
    var k = 400;
    var txs = new Float64Array(k + 1 | 0);
    var tys = new Float64Array(k + 1 | 0);
    var bxs = new Float64Array(k + 1 | 0);
    var bys = new Float64Array(k + 1 | 0);
    var inductionVariable_3 = 0;
    if (inductionVariable_3 <= k)
      do {
        var i = inductionVariable_3;
        inductionVariable_3 = inductionVariable_3 + 1 | 0;
        var u = i / k;
        txs[i] = interp($this, u, ct[2], ct[0]);
        tys[i] = interp($this, u, ct[2], ct[1]);
        bxs[i] = interp($this, u, cb[2], cb[0]);
        bys[i] = interp($this, u, cb[2], cb[1]);
      }
       while (!(i === k));
    var ins = 0.004;
    var t = new Transf(wo, ho, CorrecaoPaginas$contornoPagina$lambda(ins, wo, ho, k, txs, tys, bxs, bys, tl, bl, tr, br, sc));
    var ym = (ya + yb | 0) / 2.0;
    var xm = (xm0 + xm1 | 0) / 2.0;
    return new Contorno(t, wPag, hPag, esq.v_w1w1cg_k$(ym) * sc, dir.v_w1w1cg_k$(ym) * sc, sup.v_w1w1cg_k$(xm) * sc, inf.v_w1w1cg_k$(xm) * sc);
  }
  function tEscala($this, wc, hc, wp, hp) {
    return new Transf(wc, hc, CorrecaoPaginas$tEscala$lambda(wp, wc, hp, hc));
  }
  function refinarPagina($this, p0) {
    var img = p0.img_1;
    var cadeia = ArrayList_init_$Create$_1(p0.cadeia_1);
    var med = medidas($this, img);
    var inductionVariable = 0;
    if (inductionVariable < 3)
      $l$loop_0: do {
        var k = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
        var tmp;
        try {
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.refinarPagina.<anonymous>' call
          tmp = campo(CorrecaoPaginas_getInstance(), reduzirAltura(CorrecaoPaginas_getInstance(), img, 1200));
        } catch ($p) {
          var tmp_0;
          if ($p instanceof Exception) {
            var e = $p;
            tmp_0 = null;
          } else {
            if ($p instanceof Error) {
              var e_0 = $p;
              tmp_0 = null;
            } else {
              throw $p;
            }
          }
          tmp = tmp_0;
        }
        var tmp1_elvis_lhs = tmp;
        var tmp_1;
        if (tmp1_elvis_lhs == null) {
          break $l$loop_0;
        } else {
          tmp_1 = tmp1_elvis_lhs;
        }
        var c = tmp_1;
        var t = tCampo($this, c, img.w_1, img.h_1);
        var prova = renderizarMedir$default($this, img, t);
        var m = medidas($this, prova);
        if (m.cobertura_1 < 0.97 * med.cobertura_1 ? true : m.curvatura_1 > med.curvatura_1 * 0.95)
          break $l$loop_0;
        img = (prova.w_1 === t.wOut_1 ? prova.h_1 === t.hOut_1 : false) ? prova : renderizarTrabalho($this, img, t);
        cadeia.add_utx5q5_k$(t);
        med = m;
      }
       while (inductionVariable < 3);
    var lado = p0.lombadaADireita_1;
    if (!(lado == null)) {
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
      var tmp_2;
      try {
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.refinarPagina.<anonymous>' call
        tmp_2 = tLombada(CorrecaoPaginas_getInstance(), img, lado);
      } catch ($p) {
        var tmp_3;
        if ($p instanceof Exception) {
          var e_1 = $p;
          tmp_3 = null;
        } else {
          if ($p instanceof Error) {
            var e_2 = $p;
            tmp_3 = null;
          } else {
            throw $p;
          }
        }
        tmp_2 = tmp_3;
      }
      var t_0 = tmp_2;
      if (!(t_0 == null)) {
        var prova_0 = renderizarMedir$default($this, img, t_0);
        var antes = curvaturaLombada($this, img, lado);
        var depois = curvaturaLombada($this, prova_0, lado);
        if (!isNaN_0(depois) ? isNaN_0(antes) ? true : depois < 0.85 * antes : false) {
          img = (prova_0.w_1 === t_0.wOut_1 ? prova_0.h_1 === t_0.hOut_1 : false) ? prova_0 : renderizarTrabalho($this, img, t_0);
          cadeia.add_utx5q5_k$(t_0);
        }
      }
    }
    return new Pag(img, cadeia, p0.lombadaADireita_1);
  }
  function Analise(rot, confRot, duplo, lombadaFrac, forca, podeSerDuplo, larguras, alturas, margens, largPorPagina, tamanhos, blocos, proporcoes, linha) {
    proporcoes = proporcoes === VOID ? emptyList() : proporcoes;
    linha = linha === VOID ? null : linha;
    this.rot_1 = rot;
    this.confRot_1 = confRot;
    this.duplo_1 = duplo;
    this.lombadaFrac_1 = lombadaFrac;
    this.forca_1 = forca;
    this.podeSerDuplo_1 = podeSerDuplo;
    this.larguras_1 = larguras;
    this.alturas_1 = alturas;
    this.margens_1 = margens;
    this.largPorPagina_1 = largPorPagina;
    this.tamanhos_1 = tamanhos;
    this.blocos_1 = blocos;
    this.proporcoes_1 = proporcoes;
    this.linha_1 = linha;
  }
  protoOf(Analise).get_rot_18iwsy_k$ = function () {
    return this.rot_1;
  };
  protoOf(Analise).get_confRot_gzt7vu_k$ = function () {
    return this.confRot_1;
  };
  protoOf(Analise).set_duplo_cuql9s_k$ = function (_set____db54di) {
    this.duplo_1 = _set____db54di;
  };
  protoOf(Analise).get_duplo_iqhy8p_k$ = function () {
    return this.duplo_1;
  };
  protoOf(Analise).get_lombadaFrac_vbtrth_k$ = function () {
    return this.lombadaFrac_1;
  };
  protoOf(Analise).get_forca_irhqri_k$ = function () {
    return this.forca_1;
  };
  protoOf(Analise).get_podeSerDuplo_gq2eln_k$ = function () {
    return this.podeSerDuplo_1;
  };
  protoOf(Analise).get_larguras_efoblu_k$ = function () {
    return this.larguras_1;
  };
  protoOf(Analise).get_alturas_doj7zl_k$ = function () {
    return this.alturas_1;
  };
  protoOf(Analise).get_margens_f55g2g_k$ = function () {
    return this.margens_1;
  };
  protoOf(Analise).get_largPorPagina_siywu2_k$ = function () {
    return this.largPorPagina_1;
  };
  protoOf(Analise).get_tamanhos_tgoenc_k$ = function () {
    return this.tamanhos_1;
  };
  protoOf(Analise).get_blocos_bhhtzf_k$ = function () {
    return this.blocos_1;
  };
  protoOf(Analise).get_proporcoes_urg447_k$ = function () {
    return this.proporcoes_1;
  };
  protoOf(Analise).get_linha_iuolk1_k$ = function () {
    return this.linha_1;
  };
  function Modelo(largura, altura, mSup, mInf, mInt, mExt) {
    this.largura_1 = largura;
    this.altura_1 = altura;
    this.mSup_1 = mSup;
    this.mInf_1 = mInf;
    this.mInt_1 = mInt;
    this.mExt_1 = mExt;
  }
  protoOf(Modelo).get_largura_grhsh_k$ = function () {
    return this.largura_1;
  };
  protoOf(Modelo).get_altura_b0jrxg_k$ = function () {
    return this.altura_1;
  };
  protoOf(Modelo).get_mSup_woq1gq_k$ = function () {
    return this.mSup_1;
  };
  protoOf(Modelo).get_mInf_woptvh_k$ = function () {
    return this.mInf_1;
  };
  protoOf(Modelo).get_mInt_woptvv_k$ = function () {
    return this.mInt_1;
  };
  protoOf(Modelo).get_mExt_wopr5p_k$ = function () {
    return this.mExt_1;
  };
  function Bloco(x0, x1, y0, y1, linhas, cx0, cx1) {
    this.x0__1 = x0;
    this.x1__1 = x1;
    this.y0__1 = y0;
    this.y1__1 = y1;
    this.linhas_1 = linhas;
    this.cx0__1 = cx0;
    this.cx1__1 = cx1;
  }
  protoOf(Bloco).get_x0_kntnlr_k$ = function () {
    return this.x0__1;
  };
  protoOf(Bloco).get_x1_kntnlq_k$ = function () {
    return this.x1__1;
  };
  protoOf(Bloco).get_y0_kntnkw_k$ = function () {
    return this.y0__1;
  };
  protoOf(Bloco).get_y1_kntnkv_k$ = function () {
    return this.y1__1;
  };
  protoOf(Bloco).get_linhas_g6a4j6_k$ = function () {
    return this.linhas_1;
  };
  protoOf(Bloco).get_cx0_18j7ri_k$ = function () {
    return this.cx0__1;
  };
  protoOf(Bloco).get_cx1_18j7rh_k$ = function () {
    return this.cx1__1;
  };
  protoOf(Bloco).get_largura_grhsh_k$ = function () {
    return this.x1__1 - this.x0__1;
  };
  function blocoTexto($this, img) {
    var p = reduzirAltura($this, img, 1200);
    var sc = img.h_1 / p.h_1;
    var pm = mascaraPapel$default($this, p);
    // Inline function 'kotlin.math.max' call
    var b = roundToInt(imul(6, p.h_1) / 1200.0);
    var d = Math.max(3, b);
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var this_0 = elementos($this, p, 20.0);
    var destination = ArrayList_init_$Create$();
    var tmp0_iterator = this_0.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.blocoTexto.<anonymous>' call
      var tmp;
      if (element.tipo_1 === 0) {
        var tmp$ret$1;
        $l$block: {
          // Inline function 'kotlin.collections.count' call
          var this_1 = get_indices_4(element.xs_1);
          var tmp_0;
          if (isInterface(this_1, Collection)) {
            tmp_0 = this_1.isEmpty_y1axqb_k$();
          } else {
            tmp_0 = false;
          }
          if (tmp_0) {
            tmp$ret$1 = 0;
            break $l$block;
          }
          var count = 0;
          var tmp0_iterator_0 = this_1.iterator_jk1svi_k$();
          while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
            var element_0 = tmp0_iterator_0.next_20eer_k$();
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.blocoTexto.<anonymous>.<anonymous>' call
            var x = numberToInt(element.xs_1[element_0]);
            var y = numberToInt(element.ys_1[element_0]);
            if (blocoTexto$papel(p, pm, x, y - imul(2, d) | 0) ? blocoTexto$papel(p, pm, x, y + imul(2, d) | 0) : false) {
              count = count + 1 | 0;
              checkCountOverflow(count);
            }
          }
          tmp$ret$1 = count;
        }
        tmp = tmp$ret$1 >= 0.7 * element.xs_1.length;
      } else {
        tmp = false;
      }
      if (tmp) {
        destination.add_utx5q5_k$(element);
      }
    }
    var t = destination;
    if (t.get_size_woubt6_k$() < 4)
      return null;
    var tmp_1 = 0;
    var tmp_2 = t.get_size_woubt6_k$();
    var tmp_3 = new Float64Array(tmp_2);
    while (tmp_1 < tmp_2) {
      var tmp_4 = tmp_1;
      tmp_3[tmp_4] = t.get_c1px32_k$(tmp_4).x0__1;
      tmp_1 = tmp_1 + 1 | 0;
    }
    var x0 = percentil($this, tmp_3, 10.0);
    var tmp_5 = 0;
    var tmp_6 = t.get_size_woubt6_k$();
    var tmp_7 = new Float64Array(tmp_6);
    while (tmp_5 < tmp_6) {
      var tmp_8 = tmp_5;
      tmp_7[tmp_8] = t.get_c1px32_k$(tmp_8).x1__1;
      tmp_5 = tmp_5 + 1 | 0;
    }
    var x1 = percentil($this, tmp_7, 90.0);
    var q = reduzir($this, img, 1600);
    var sq = img.w_1 / q.w_1;
    var tmp0_elvis_lhs = caixaConteudo($this, q);
    var tmp_9;
    if (tmp0_elvis_lhs == null) {
      return null;
    } else {
      tmp_9 = tmp0_elvis_lhs;
    }
    var cx = tmp_9;
    return new Bloco(x0 * sc, x1 * sc, cx[1] * sq, cx[3] * sq, t.get_size_woubt6_k$(), cx[0] * sq, cx[2] * sq);
  }
  function margensPapel($this, img, b) {
    var w = img.w_1;
    var h = img.h_1;
    var pm = mascaraPapel$default($this, img);
    var xc0 = coerceIn_0(numberToInt(b.x0__1), 0, w - 1 | 0);
    var xc1 = coerceIn_0(numberToInt(b.x1__1), 0, w - 1 | 0);
    var yc0 = coerceIn_0(numberToInt(b.y0__1), 0, h - 1 | 0);
    var yc1 = coerceIn_0(numberToInt(b.y1__1), 0, h - 1 | 0);
    var top = yc0;
    while (top > 0 ? margensPapel$fracLinha(xc0, xc1, pm, w, top - 1 | 0) > 0.6 : false) {
      top = top - 1 | 0;
    }
    var bot = yc1;
    while (bot < (h - 1 | 0) ? margensPapel$fracLinha(xc0, xc1, pm, w, bot + 1 | 0) > 0.6 : false) {
      bot = bot + 1 | 0;
    }
    var esq = xc0;
    while (esq > 0 ? margensPapel$fracCol(yc0, yc1, pm, w, esq - 1 | 0) > 0.6 : false) {
      esq = esq - 1 | 0;
    }
    var dir = xc1;
    while (dir < (w - 1 | 0) ? margensPapel$fracCol(yc0, yc1, pm, w, dir + 1 | 0) > 0.6 : false) {
      dir = dir + 1 | 0;
    }
    // Inline function 'kotlin.doubleArrayOf' call
    var tmp;
    if (top <= 1) {
      DoubleCompanionObject_getInstance();
      tmp = NaN;
    } else {
      tmp = b.y0__1 - top;
    }
    var tmp_0 = tmp;
    var tmp_1;
    if (bot >= (h - 2 | 0)) {
      DoubleCompanionObject_getInstance();
      tmp_1 = NaN;
    } else {
      tmp_1 = bot - b.y1__1;
    }
    var tmp_2 = tmp_1;
    var tmp_3;
    if (esq <= 1) {
      DoubleCompanionObject_getInstance();
      tmp_3 = NaN;
    } else {
      tmp_3 = b.x0__1 - esq;
    }
    var tmp_4 = tmp_3;
    var tmp_5;
    if (dir >= (w - 2 | 0)) {
      DoubleCompanionObject_getInstance();
      tmp_5 = NaN;
    } else {
      tmp_5 = dir - b.x1__1;
    }
    return new Float64Array([tmp_0, tmp_2, tmp_4, tmp_5]);
  }
  function rodarCodigo($this, img, cod) {
    switch (cod) {
      case 1:
        return rodar90($this, img, true);
      case 2:
        return rodar90($this, img, false);
      case 3:
        return rodar180($this, img);
      default:
        return img;
    }
  }
  function verticesLivro($this, img) {
    var p = reduzir($this, img, 1600);
    var w = p.w_1;
    var h = p.h_1;
    var sc = img.w_1 / w;
    var m0 = mascaraPapel$default($this, p);
    var tmp0_container = componentes($this, m0, w, h);
    var lab = tmp0_container.component1_7eebsc_k$();
    var comps = tmp0_container.component2_7eebsb_k$();
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlin.collections.maxByOrNull' call
      var iterator = comps.iterator_jk1svi_k$();
      if (!iterator.hasNext_bitz1p_k$()) {
        tmp$ret$0 = null;
        break $l$block_0;
      }
      var maxElem = iterator.next_20eer_k$();
      if (!iterator.hasNext_bitz1p_k$()) {
        tmp$ret$0 = maxElem;
        break $l$block_0;
      }
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.verticesLivro.<anonymous>' call
      var maxValue = maxElem.area_1;
      do {
        var e = iterator.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.verticesLivro.<anonymous>' call
        var v = e.area_1;
        if (compareTo_0(maxValue, v) < 0) {
          maxElem = e;
          maxValue = v;
        }
      }
       while (iterator.hasNext_bitz1p_k$());
      tmp$ret$0 = maxElem;
    }
    var tmp1_elvis_lhs = tmp$ret$0;
    var tmp;
    if (tmp1_elvis_lhs == null) {
      return null;
    } else {
      tmp = tmp1_elvis_lhs;
    }
    var maior = tmp;
    if (maior.area_1 < 0.2 * w * h)
      return null;
    var tmp_0 = 0;
    var tmp_1 = new Float64Array(w);
    while (tmp_0 < w) {
      var tmp_2 = tmp_0;
      DoubleCompanionObject_getInstance();
      tmp_1[tmp_2] = NaN;
      tmp_0 = tmp_0 + 1 | 0;
    }
    var cima = tmp_1;
    var tmp_3 = 0;
    var tmp_4 = new Float64Array(w);
    while (tmp_3 < w) {
      var tmp_5 = tmp_3;
      DoubleCompanionObject_getInstance();
      tmp_4[tmp_5] = NaN;
      tmp_3 = tmp_3 + 1 | 0;
    }
    var baixo = tmp_4;
    var cols = ArrayList_init_$Create$();
    var inductionVariable = 0;
    if (inductionVariable < w)
      do {
        var x = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var a = -1;
        var b = -1;
        var n = 0;
        var inductionVariable_0 = 0;
        if (inductionVariable_0 < h)
          do {
            var y = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            if (lab[imul(y, w) + x | 0] === maior.id_1) {
              if (a < 0)
                a = y;
              b = y;
              n = n + 1 | 0;
            }
          }
           while (inductionVariable_0 < h);
        if (n > 0.2 * h) {
          cima[x] = a;
          baixo[x] = b;
          cols.add_utx5q5_k$(x);
        }
      }
       while (inductionVariable < w);
    if (cols.get_size_woubt6_k$() < 0.3 * w)
      return null;
    var x0 = first_0(cols);
    var x1 = last_0(cols);
    var bw = x1 - x0 | 0;
    var c = verticesLivro$suaviza(w, cima);
    var b_0 = verticesLivro$suaviza(w, baixo);
    var tmp5_elvis_lhs = verticesLivro$vertice(x0, bw, w, h, c, 1.0);
    var tmp_6;
    if (tmp5_elvis_lhs == null) {
      return null;
    } else {
      tmp_6 = tmp5_elvis_lhs;
    }
    var vc = tmp_6;
    var tmp6_elvis_lhs = verticesLivro$vertice(x0, bw, w, h, b_0, -1.0);
    var tmp_7;
    if (tmp6_elvis_lhs == null) {
      return null;
    } else {
      tmp_7 = tmp6_elvis_lhs;
    }
    var vb = tmp_7;
    // Inline function 'kotlin.math.abs' call
    var x_0 = vc[0] - vb[0];
    if (Math.abs(x_0) > 0.1 * bw)
      return null;
    // Inline function 'kotlin.doubleArrayOf' call
    return new Float64Array([vc[0] * sc, vc[1] * sc, vb[0] * sc, vb[1] * sc]);
  }
  function cortarPelaLinha($this, img, xc, yc, xb, yb, manterEsquerda) {
    // Inline function 'kotlin.collections.copyOf' call
    // Inline function 'kotlin.js.asDynamic' call
    var out = img.px_1.slice();
    var inductionVariable = 0;
    var last = img.h_1;
    if (inductionVariable < last)
      do {
        var y = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var t = !(yb === yc) ? coerceIn((y - yc) / (yb - yc), -0.5, 1.5) : 0.0;
        var xl = xc + (xb - xc) * t;
        var inductionVariable_0 = 0;
        var last_0 = img.w_1;
        if (inductionVariable_0 < last_0)
          do {
            var x = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            if ((manterEsquerda ? x > xl : false) ? true : !manterEsquerda ? x < xl : false) {
              out[imul(y, img.w_1) + x | 0] = -16777216;
            }
          }
           while (inductionVariable_0 < last_0);
      }
       while (inductionVariable < last);
    return new Imagem(img.w_1, img.h_1, out);
  }
  function analisar($this, img, rotForcada) {
    var tmp;
    if (!(rotForcada == null)) {
      tmp = to(rotForcada, 1.0);
    } else {
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
      var padrao = to(0, 0.0);
      var tmp_0;
      try {
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.analisar.<anonymous>' call
        tmp_0 = orientacaoComConfianca(CorrecaoPaginas_getInstance(), img);
      } catch ($p) {
        var tmp_1;
        if ($p instanceof Exception) {
          var e = $p;
          tmp_1 = padrao;
        } else {
          if ($p instanceof Error) {
            var e_0 = $p;
            tmp_1 = padrao;
          } else {
            throw $p;
          }
        }
        tmp_0 = tmp_1;
      }
      tmp = tmp_0;
    }
    var tmp0_container = tmp;
    var cod = tmp0_container.component1_7eebsc_k$();
    var conf = tmp0_container.component2_7eebsb_k$();
    var r = rodarCodigo($this, img, cod);
    // Inline function 'kotlin.math.max' call
    var a = r.w_1;
    var b = r.h_1;
    var L = Math.max(a, b);
    // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
    var tmp_2;
    try {
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.analisar.<anonymous>' call
      tmp_2 = lombadaPelaLuz(CorrecaoPaginas_getInstance(), r);
    } catch ($p) {
      var tmp_3;
      if ($p instanceof Exception) {
        var e_1 = $p;
        tmp_3 = null;
      } else {
        if ($p instanceof Error) {
          var e_2 = $p;
          tmp_3 = null;
        } else {
          throw $p;
        }
      }
      tmp_2 = tmp_3;
    }
    var luz0 = tmp_2;
    // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
    var tmp_4;
    try {
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.analisar.<anonymous>' call
      tmp_4 = verticesLivro(CorrecaoPaginas_getInstance(), r);
    } catch ($p) {
      var tmp_5;
      if ($p instanceof Exception) {
        var e_3 = $p;
        tmp_5 = null;
      } else {
        if ($p instanceof Error) {
          var e_4 = $p;
          tmp_5 = null;
        } else {
          throw $p;
        }
      }
      tmp_4 = tmp_5;
    }
    var vert0 = tmp_4;
    var tmp_6;
    if (vert0 == null) {
      tmp_6 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.analisar.<anonymous>' call
      var meio = (vert0[0] + vert0[2]) / 2;
      var tmp_7;
      var tmp_8;
      if (!(luz0 == null)) {
        // Inline function 'kotlin.math.abs' call
        var x = luz0.x_1 - meio;
        tmp_8 = Math.abs(x) < 0.03 * r.w_1;
      } else {
        tmp_8 = false;
      }
      if (tmp_8) {
        tmp_7 = luz0.x_1;
      } else {
        tmp_7 = meio;
      }
      var xs = tmp_7;
      // Inline function 'kotlin.doubleArrayOf' call
      tmp_6 = new Float64Array([vert0[0] + xs - meio, vert0[1], vert0[2] + xs - meio, vert0[3]]);
    }
    var vert = tmp_6;
    var tmp_9;
    if (vert == null) {
      tmp_9 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.analisar.<anonymous>' call
      // Inline function 'kotlin.doubleArrayOf' call
      tmp_9 = new Float64Array([vert[0] / r.w_1, vert[1] / r.h_1, vert[2] / r.w_1, vert[3] / r.h_1]);
    }
    var linha = tmp_9;
    var tmp_10;
    if (!(vert == null)) {
      var tmp_11 = (vert[0] + vert[2]) / 2;
      // Inline function 'kotlin.math.max' call
      var tmp4_elvis_lhs = luz0 == null ? null : luz0.forca_1;
      var b_0 = tmp4_elvis_lhs == null ? 0.0 : tmp4_elvis_lhs;
      var tmp_12 = Math.max(15.0, b_0);
      var tmp6_elvis_lhs = luz0 == null ? null : luz0.tintaVizinha_1;
      tmp_10 = new Lombada(tmp_11, tmp_12, tmp6_elvis_lhs == null ? 0.0 : tmp6_elvis_lhs);
    } else {
      tmp_10 = luz0;
    }
    var luz = tmp_10;
    var podeSerDuplo = (!(luz == null) ? luz.forca_1 >= 6.0 : false) ? r.w_1 > 1.15 * r.h_1 : false;
    var larg = ArrayList_init_$Create$();
    var alt = ArrayList_init_$Create$();
    var marg = ArrayList_init_$Create$();
    var porPagina = ArrayList_init_$Create$();
    var tamanhos = ArrayList_init_$Create$();
    var blocos = ArrayList_init_$Create$();
    var proporcoes = ArrayList_init_$Create$();
    var duplo = false;
    if (podeSerDuplo) {
      var x_0 = coerceIn_0(roundToInt(ensureNotNull(luz).x_1), 1, r.w_1 - 1 | 0);
      var e_5 = recortar($this, r, 0, 0, x_0, r.h_1);
      var d = recortar($this, r, x_0, 0, r.w_1, r.h_1);
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
      var tmp_13;
      try {
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.analisar.<anonymous>' call
        tmp_13 = blocoTexto(CorrecaoPaginas_getInstance(), e_5);
      } catch ($p) {
        var tmp_14;
        if ($p instanceof Exception) {
          var e_6 = $p;
          tmp_14 = null;
        } else {
          if ($p instanceof Error) {
            var e_7 = $p;
            tmp_14 = null;
          } else {
            throw $p;
          }
        }
        tmp_13 = tmp_14;
      }
      var be = tmp_13;
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
      var tmp_15;
      try {
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.analisar.<anonymous>' call
        tmp_15 = blocoTexto(CorrecaoPaginas_getInstance(), d);
      } catch ($p) {
        var tmp_16;
        if ($p instanceof Exception) {
          var e_8 = $p;
          tmp_16 = null;
        } else {
          if ($p instanceof Error) {
            var e_9 = $p;
            tmp_16 = null;
          } else {
            throw $p;
          }
        }
        tmp_15 = tmp_16;
      }
      var bd = tmp_15;
      var tmp_17;
      var tmp_18;
      var tmp_19;
      if (((!(be == null) ? !(bd == null) : false) ? be.linhas_1 >= 4 : false) ? bd.linhas_1 >= 4 : false) {
        // Inline function 'kotlin.math.min' call
        var a_0 = be.get_largura_grhsh_k$();
        var b_1 = bd.get_largura_grhsh_k$();
        var tmp_20 = Math.min(a_0, b_1);
        // Inline function 'kotlin.math.max' call
        var a_1 = be.get_largura_grhsh_k$();
        var b_2 = bd.get_largura_grhsh_k$();
        tmp_19 = tmp_20 / Math.max(a_1, b_2) >= 0.75;
      } else {
        tmp_19 = false;
      }
      if (tmp_19) {
        tmp_18 = be.get_largura_grhsh_k$() > 0.25 * e_5.w_1;
      } else {
        tmp_18 = false;
      }
      if (tmp_18) {
        tmp_17 = bd.get_largura_grhsh_k$() > 0.25 * d.w_1;
      } else {
        tmp_17 = false;
      }
      var geometria = tmp_17;
      duplo = ((!(vert == null) ? true : geometria) ? true : luz.forca_1 >= 15.0) ? true : (luz.forca_1 >= 9.0 ? r.w_1 > 1.3 * r.h_1 : false) ? luz.tintaVizinha_1 < 0.15 : false;
      if (duplo) {
        var tmp7_iterator = listOf_0([new Triple(e_5, be, true), new Triple(d, bd, false)]).iterator_jk1svi_k$();
        $l$loop: while (tmp7_iterator.hasNext_bitz1p_k$()) {
          var tmp8_loop_parameter = tmp7_iterator.next_20eer_k$();
          var pg = tmp8_loop_parameter.component1_7eebsc_k$();
          var b_3 = tmp8_loop_parameter.component2_7eebsb_k$();
          var esquerda = tmp8_loop_parameter.component3_7eebsa_k$();
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
          var tmp_21;
          try {
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.analisar.<anonymous>' call
            tmp_21 = contornoPagina(CorrecaoPaginas_getInstance(), pg);
          } catch ($p) {
            var tmp_22;
            if ($p instanceof Exception) {
              var e_10 = $p;
              tmp_22 = null;
            } else {
              if ($p instanceof Error) {
                var e_11 = $p;
                tmp_22 = null;
              } else {
                throw $p;
              }
            }
            tmp_21 = tmp_22;
          }
          var ct = tmp_21;
          if (ct == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            // Inline function 'kotlin.contracts.contract' call
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.analisar.<anonymous>' call
            // Inline function 'kotlin.doubleArrayOf' call
            var tmp$ret$23 = new Float64Array([ct.w_1 / L, ct.h_1 / L]);
            tamanhos.add_utx5q5_k$(tmp$ret$23);
          }
          analisar$proporcao(proporcoes, pg, b_3, ct, esquerda);
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
          var tmp_23;
          try {
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.analisar.<anonymous>' call
            tmp_23 = blocoPlano(CorrecaoPaginas_getInstance(), pg, 0.15, 0.15, 0.12, 0.15);
          } catch ($p) {
            var tmp_24;
            if ($p instanceof Exception) {
              var e_12 = $p;
              tmp_24 = null;
            } else {
              if ($p instanceof Error) {
                var e_13 = $p;
                tmp_24 = null;
              } else {
                throw $p;
              }
            }
            tmp_23 = tmp_24;
          }
          var tmp10_safe_receiver = tmp_23;
          if (tmp10_safe_receiver == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            // Inline function 'kotlin.contracts.contract' call
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.analisar.<anonymous>' call
            // Inline function 'kotlin.doubleArrayOf' call
            var tmp$ret$28 = new Float64Array([tmp10_safe_receiver.wBloco_1 / L, tmp10_safe_receiver.hBloco_1 / L]);
            blocos.add_utx5q5_k$(tmp$ret$28);
          }
          porPagina.add_utx5q5_k$((!(b_3 == null) ? b_3.linhas_1 >= 6 : false) ? b_3.get_largura_grhsh_k$() / L : null);
          if (b_3 == null ? true : b_3.linhas_1 < 6)
            continue $l$loop;
          larg.add_utx5q5_k$(b_3.get_largura_grhsh_k$() / L);
          alt.add_utx5q5_k$((b_3.y1__1 - b_3.y0__1) / L);
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
          var tmp_25;
          try {
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.analisar.<anonymous>' call
            tmp_25 = margensPapel(CorrecaoPaginas_getInstance(), pg, b_3);
          } catch ($p) {
            var tmp_26;
            if ($p instanceof Exception) {
              var e_14 = $p;
              tmp_26 = null;
            } else {
              if ($p instanceof Error) {
                var e_15 = $p;
                tmp_26 = null;
              } else {
                throw $p;
              }
            }
            tmp_25 = tmp_26;
          }
          var tmp11_safe_receiver = tmp_25;
          if (tmp11_safe_receiver == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            // Inline function 'kotlin.contracts.contract' call
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.analisar.<anonymous>' call
            var interior = esquerda ? (pg.w_1 - 1 | 0) - b_3.x1__1 : b_3.x0__1;
            // Inline function 'kotlin.doubleArrayOf' call
            var tmp$ret$33 = new Float64Array([tmp11_safe_receiver[0] / L, tmp11_safe_receiver[1] / L, interior / L, (esquerda ? tmp11_safe_receiver[2] : tmp11_safe_receiver[3]) / L]);
            marg.add_utx5q5_k$(tmp$ret$33);
          }
        }
      }
    }
    if (!duplo) {
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
      var tmp_27;
      try {
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.analisar.<anonymous>' call
        tmp_27 = blocoTexto(CorrecaoPaginas_getInstance(), r);
      } catch ($p) {
        var tmp_28;
        if ($p instanceof Exception) {
          var e_16 = $p;
          tmp_28 = null;
        } else {
          if ($p instanceof Error) {
            var e_17 = $p;
            tmp_28 = null;
          } else {
            throw $p;
          }
        }
        tmp_27 = tmp_28;
      }
      var b_4 = tmp_27;
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
      var tmp_29;
      try {
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.analisar.<anonymous>' call
        tmp_29 = contornoPagina(CorrecaoPaginas_getInstance(), r);
      } catch ($p) {
        var tmp_30;
        if ($p instanceof Exception) {
          var e_18 = $p;
          tmp_30 = null;
        } else {
          if ($p instanceof Error) {
            var e_19 = $p;
            tmp_30 = null;
          } else {
            throw $p;
          }
        }
        tmp_29 = tmp_30;
      }
      var tmp12_safe_receiver = tmp_29;
      if (tmp12_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.analisar.<anonymous>' call
        // Inline function 'kotlin.doubleArrayOf' call
        var tmp$ret$40 = new Float64Array([tmp12_safe_receiver.w_1 / L, tmp12_safe_receiver.h_1 / L]);
        tamanhos.add_utx5q5_k$(tmp$ret$40);
      }
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
      var tmp_31;
      try {
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.analisar.<anonymous>' call
        tmp_31 = blocoPlano(CorrecaoPaginas_getInstance(), r, 0.15, 0.15, 0.12, 0.15);
      } catch ($p) {
        var tmp_32;
        if ($p instanceof Exception) {
          var e_20 = $p;
          tmp_32 = null;
        } else {
          if ($p instanceof Error) {
            var e_21 = $p;
            tmp_32 = null;
          } else {
            throw $p;
          }
        }
        tmp_31 = tmp_32;
      }
      var tmp13_safe_receiver = tmp_31;
      if (tmp13_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.analisar.<anonymous>' call
        // Inline function 'kotlin.doubleArrayOf' call
        var tmp$ret$45 = new Float64Array([tmp13_safe_receiver.wBloco_1 / L, tmp13_safe_receiver.hBloco_1 / L]);
        blocos.add_utx5q5_k$(tmp$ret$45);
      }
      porPagina.add_utx5q5_k$((!(b_4 == null) ? b_4.linhas_1 >= 6 : false) ? b_4.get_largura_grhsh_k$() / L : null);
      if (!(b_4 == null) ? b_4.linhas_1 >= 6 : false) {
        larg.add_utx5q5_k$(b_4.get_largura_grhsh_k$() / L);
        alt.add_utx5q5_k$((b_4.y1__1 - b_4.y0__1) / L);
      }
    }
    var tmp_33 = duplo;
    var tmp15_elvis_lhs = luz == null ? null : luz.x_1;
    var tmp_34 = (tmp15_elvis_lhs == null ? 0.0 : tmp15_elvis_lhs) / r.w_1;
    var tmp17_elvis_lhs = luz == null ? null : luz.forca_1;
    return new Analise(cod, conf, tmp_33, tmp_34, tmp17_elvis_lhs == null ? 0.0 : tmp17_elvis_lhs, podeSerDuplo, larg, alt, marg, porPagina, tamanhos, blocos, proporcoes, linha);
  }
  function mediana($this, v) {
    var tmp;
    if (v.isEmpty_y1axqb_k$()) {
      DoubleCompanionObject_getInstance();
      tmp = NaN;
    } else {
      tmp = mediana_0($this, toDoubleArray(v));
    }
    return tmp;
  }
  function ajustarTamanho($this, img, wF, hF) {
    if ((wF < 10 ? true : hF < 10) ? true : img.w_1 === wF ? img.h_1 === hF : false)
      return img;
    // Inline function 'kotlin.math.min' call
    var a = wF / img.w_1;
    var b = hF / img.h_1;
    var esc = Math.min(a, b);
    // Inline function 'kotlin.math.max' call
    var b_0 = roundToInt(img.w_1 * esc);
    var nw = Math.max(1, b_0);
    // Inline function 'kotlin.math.max' call
    var b_1 = roundToInt(img.h_1 * esc);
    var nh = Math.max(1, b_1);
    var r = (nw === img.w_1 ? nh === img.h_1 : false) ? img : redimensionar($this, img, nw, nh);
    var tmp = 0;
    var tmp_0 = imul(wF, hF);
    var tmp_1 = new Int32Array(tmp_0);
    while (tmp < tmp_0) {
      tmp_1[tmp] = -1;
      tmp = tmp + 1 | 0;
    }
    var out = tmp_1;
    var ox = (wF - nw | 0) / 2 | 0;
    var oy = (hF - nh | 0) / 2 | 0;
    var inductionVariable = 0;
    if (inductionVariable < nh)
      do {
        var y = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.copyInto' call
        var this_0 = r.px_1;
        var destinationOffset = imul(y + oy | 0, wF) + ox | 0;
        var startIndex = imul(y, nw);
        var tmp_2 = imul(y, nw);
        // Inline function 'kotlin.math.min' call
        var b_2 = wF - ox | 0;
        var endIndex = tmp_2 + Math.min(nw, b_2) | 0;
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        var tmp_3 = this_0;
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        arrayCopy(tmp_3, out, destinationOffset, startIndex, endIndex);
      }
       while (inductionVariable < nh);
    return new Imagem(wF, hF, out);
  }
  function paginasFinais($this, orig, a, modelo, folha, blocoComum, propExt, propSup) {
    var trab0 = reduzir($this, orig, 2000);
    var s0 = orig.w_1 / trab0.w_1;
    var trab = trab0;
    var base = ArrayList_init_$Create$();
    var tmp1_elvis_lhs = a == null ? null : a.rot_1;
    var cod = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    if (!(cod === 0)) {
      var t = tRodar($this, trab.w_1, trab.h_1, cod);
      trab = renderizarTrabalho($this, trab, t);
      base.add_utx5q5_k$(t);
    }
    var tmp;
    var tmp_0;
    if ((!(a == null) ? a.duplo_1 : false) ? !(a.linha_1 == null) : false) {
      // Inline function 'kotlin.math.abs' call
      var x = a.linha_1[0] - a.linha_1[2];
      tmp_0 = Math.abs(x) > 0.02;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      var xc = a.linha_1[0] * trab.w_1;
      var yc = a.linha_1[1] * trab.h_1;
      var xb = a.linha_1[2] * trab.w_1;
      var yb = a.linha_1[3] * trab.h_1;
      // Inline function 'kotlin.math.max' call
      var tmp$ret$1 = Math.max(xc, xb);
      var xMax = coerceIn_0(roundToInt(tmp$ret$1 + 2), 1, trab.w_1 - 1 | 0);
      // Inline function 'kotlin.math.min' call
      var tmp$ret$2 = Math.min(xc, xb);
      var xMin = coerceIn_0(roundToInt(tmp$ret$2 - 2), 1, trab.w_1 - 1 | 0);
      var esq = cortarPelaLinha($this, recortar($this, trab, 0, 0, xMax, trab.h_1), xc, yc, xb, yb, true);
      var dir = cortarPelaLinha($this, recortar($this, trab, xMin, 0, trab.w_1, trab.h_1), xc - xMin, yc, xb - xMin, yb, false);
      tmp = listOf_0([new Pag(esq, plus_1(base, tRecorte($this, 0, 0, xMax, trab.h_1)), true), new Pag(dir, plus_1(base, tRecorte($this, xMin, 0, trab.w_1 - xMin | 0, trab.h_1)), false)]);
    } else {
      if (!(a == null) ? a.duplo_1 : false) {
        var x_0 = coerceIn_0(roundToInt(a.lombadaFrac_1 * trab.w_1), 1, trab.w_1 - 1 | 0);
        tmp = listOf_0([new Pag(recortar($this, trab, 0, 0, x_0, trab.h_1), plus_1(base, tRecorte($this, 0, 0, x_0, trab.h_1)), true), new Pag(recortar($this, trab, x_0, 0, trab.w_1, trab.h_1), plus_1(base, tRecorte($this, x_0, 0, trab.w_1 - x_0 | 0, trab.h_1)), false)]);
      } else {
        tmp = listOf(new Pag(trab, base, ladoDaLombada($this, trab)));
      }
    }
    var pags = tmp;
    // Inline function 'kotlin.math.max' call
    var a_0 = orig.w_1;
    var b = orig.h_1;
    var L = Math.max(a_0, b);
    // Inline function 'kotlin.collections.mapIndexed' call
    // Inline function 'kotlin.collections.mapIndexedTo' call
    var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(pags, 10));
    var index = 0;
    var tmp0_iterator = pags.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var item = tmp0_iterator.next_20eer_k$();
      var tmp$ret$35;
      $l$block_0: {
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paginasFinais.<anonymous>' call
        var tmp1 = index;
        index = tmp1 + 1 | 0;
        var idx = checkIndexOverflow(tmp1);
        var tmp_1;
        switch (item.lombadaADireita_1) {
          case true:
            tmp_1 = to(0.17, 0.13);
            break;
          case false:
            tmp_1 = to(0.13, 0.17);
            break;
          case null:
            tmp_1 = to(0.13, 0.13);
            break;
          default:
            noWhenBranchMatchedException();
            break;
        }
        var tmp1_container = tmp_1;
        var mE = tmp1_container.component1_7eebsc_k$();
        var mD = tmp1_container.component2_7eebsb_k$();
        var bp = null;
        var usarBloco = false;
        var plBloco = null;
        if (!(bp == null)) {
          plBloco = renderizarTrabalho(CorrecaoPaginas_getInstance(), item.img_1, bp.t_1);
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
          CorrecaoPaginas_getInstance();
          var tmp_2;
          try {
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paginasFinais.<anonymous>.<anonymous>' call
            tmp_2 = contornoPagina(CorrecaoPaginas_getInstance(), item.img_1);
          } catch ($p) {
            var tmp_3;
            if ($p instanceof Exception) {
              var e = $p;
              tmp_3 = null;
            } else {
              if ($p instanceof Error) {
                var e_0 = $p;
                tmp_3 = null;
              } else {
                throw $p;
              }
            }
            tmp_2 = tmp_3;
          }
          var cont = tmp_2;
          if (!(cont == null)) {
            var mb = medidas(CorrecaoPaginas_getInstance(), plBloco);
            var mc = medidas(CorrecaoPaginas_getInstance(), renderizarMedir$default(CorrecaoPaginas_getInstance(), item.img_1, cont.t_1));
            usarBloco = mb.curvatura_1 <= mc.curvatura_1 * 1.5 + 0.5 ? mb.cobertura_1 >= 0.75 * mc.cobertura_1 : false;
          } else {
            var mb_0 = medidas(CorrecaoPaginas_getInstance(), plBloco);
            var m0 = medidas(CorrecaoPaginas_getInstance(), item.img_1);
            usarBloco = mb_0.curvatura_1 <= m0.curvatura_1 * 1.2 + 0.3 ? mb_0.cobertura_1 >= 0.75 * m0.cobertura_1 : false;
          }
        }
        if ((usarBloco ? !(bp == null) : false) ? !(plBloco == null) : false) {
          var tmp3_elvis_lhs = blocoComum == null ? null : blocoComum[0];
          var tmp_4;
          if (tmp3_elvis_lhs == null) {
            // Inline function 'kotlin.math.max' call
            var a_1 = trab.w_1;
            var b_0 = trab.h_1;
            var tmp$ret$6 = Math.max(a_1, b_0);
            tmp_4 = bp.wBloco_1 / tmp$ret$6;
          } else {
            tmp_4 = tmp3_elvis_lhs;
          }
          var wC = tmp_4 * L;
          var tmp5_elvis_lhs = blocoComum == null ? null : blocoComum[1];
          var tmp_5;
          if (tmp5_elvis_lhs == null) {
            // Inline function 'kotlin.math.max' call
            var a_2 = trab.w_1;
            var b_1 = trab.h_1;
            var tmp$ret$7 = Math.max(a_2, b_1);
            tmp_5 = bp.hBloco_1 / tmp$ret$7;
          } else {
            tmp_5 = tmp5_elvis_lhs;
          }
          var hC = tmp_5 * L;
          var k = wC / (bp.wBloco_1 * s0);
          var tmp7_safe_receiver = folha == null ? null : folha[0];
          var tmp8_elvis_lhs = tmp7_safe_receiver == null ? null : tmp7_safe_receiver * L;
          var wPag = tmp8_elvis_lhs == null ? wC * 1.2999999999999998 : tmp8_elvis_lhs;
          var tmp10_safe_receiver = folha == null ? null : folha[1];
          var tmp11_elvis_lhs = tmp10_safe_receiver == null ? null : tmp10_safe_receiver * L;
          var hPag = tmp11_elvis_lhs == null ? hC + wC * 0.28 : tmp11_elvis_lhs;
          // Inline function 'kotlin.math.max' call
          var b_2 = wPag - wC;
          var sobraH = Math.max(0.0, b_2);
          // Inline function 'kotlin.math.max' call
          var b_3 = hPag - hC;
          var sobraV = Math.max(0.0, b_3);
          var tmp_6;
          switch (item.lombadaADireita_1) {
            case true:
              tmp_6 = propExt;
              break;
            case false:
              tmp_6 = 1 - propExt;
              break;
            case null:
              tmp_6 = 0.5;
              break;
            default:
              noWhenBranchMatchedException();
              break;
          }
          var esqPx = sobraH * tmp_6;
          var supPx = sobraV * propSup;
          var p = refinarPagina(CorrecaoPaginas_getInstance(), new Pag(plBloco, plus_1(item.cadeia_1, bp.t_1), item.lombadaADireita_1));
          var q = reduzir(CorrecaoPaginas_getInstance(), p.img_1, 1600);
          var sq = p.img_1.w_1 / q.w_1;
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
          CorrecaoPaginas_getInstance();
          var tmp_7;
          try {
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paginasFinais.<anonymous>.<anonymous>' call
            tmp_7 = caixaConteudo(CorrecaoPaginas_getInstance(), q);
          } catch ($p) {
            var tmp_8;
            if ($p instanceof Exception) {
              var e_1 = $p;
              tmp_8 = null;
            } else {
              if ($p instanceof Error) {
                var e_2 = $p;
                tmp_8 = null;
              } else {
                throw $p;
              }
            }
            tmp_7 = tmp_8;
          }
          var tmp13_safe_receiver = tmp_7;
          var tmp_9;
          if (tmp13_safe_receiver == null) {
            tmp_9 = null;
          } else {
            // Inline function 'kotlin.let' call
            // Inline function 'kotlin.contracts.contract' call
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paginasFinais.<anonymous>.<anonymous>' call
            var tmp_10 = 0;
            var tmp_11 = new Float64Array(4);
            while (tmp_10 < 4) {
              var tmp_12 = tmp_10;
              tmp_11[tmp_12] = tmp13_safe_receiver[tmp_12] * sq;
              tmp_10 = tmp_10 + 1 | 0;
            }
            tmp_9 = tmp_11;
          }
          var caixa = tmp_9;
          if (caixa == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            // Inline function 'kotlin.contracts.contract' call
            var cx0 = caixa[0];
            var cy0 = caixa[1];
            var cx1 = caixa[2];
            var cy1 = caixa[3];
            // Inline function 'kotlin.math.min' call
            var tmp_13 = 0.98 * wPag;
            // Inline function 'kotlin.math.max' call
            var b_4 = (cx1 - cx0) * s0;
            var a_3 = tmp_13 / Math.max(1.0, b_4);
            var tmp_14 = 0.98 * hPag;
            // Inline function 'kotlin.math.max' call
            var b_5 = (cy1 - cy0) * s0;
            var b_6 = tmp_14 / Math.max(1.0, b_5);
            var kMax = Math.min(a_3, b_6);
            if (k > kMax)
              k = kMax;
            var g = k * s0;
            var xa = esqPx + (cx0 - bp.ox_1) * g;
            var xb_0 = esqPx + (cx1 - bp.ox_1) * g;
            var ya = supPx + (cy0 - bp.oy_1) * g;
            var yb_0 = supPx + (cy1 - bp.oy_1) * g;
            if (xa < 0.01 * wPag)
              esqPx = esqPx + (0.01 * wPag - xa);
            else if (xb_0 > 0.99 * wPag)
              esqPx = esqPx - (xb_0 - 0.99 * wPag);
            var tmp_15;
            if (ya < 0.01 * hPag) {
              supPx = supPx + (0.01 * hPag - ya);
              tmp_15 = Unit_getInstance();
            } else if (yb_0 > 0.99 * hPag) {
              supPx = supPx - (yb_0 - 0.99 * hPag);
              tmp_15 = Unit_getInstance();
            }
          }
          // Inline function 'kotlin.math.max' call
          var b_7 = roundToInt(wPag / s0);
          var wc = Math.max(2, b_7);
          // Inline function 'kotlin.math.max' call
          var b_8 = roundToInt(hPag / s0);
          var hc = Math.max(2, b_8);
          var kf = k;
          var ef = esqPx;
          var sf = supPx;
          var pad = 0.01 * p.img_1.w_1;
          var fq = reduzir(CorrecaoPaginas_getInstance(), p.img_1, 800);
          var fsx = fq.w_1 / p.img_1.w_1;
          var fsy = fq.h_1 / p.img_1.h_1;
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
          CorrecaoPaginas_getInstance();
          var tmp_16;
          try {
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paginasFinais.<anonymous>.<anonymous>' call
            tmp_16 = mascaraFundo(CorrecaoPaginas_getInstance(), fq);
          } catch ($p) {
            var tmp_17;
            if ($p instanceof Exception) {
              var e_3 = $p;
              tmp_17 = null;
            } else {
              if ($p instanceof Error) {
                var e_4 = $p;
                tmp_17 = null;
              } else {
                throw $p;
              }
            }
            tmp_16 = tmp_17;
          }
          var fundo = tmp_16;
          var escala = new Transf(wc, hc, CorrecaoPaginas$paginasFinais$lambda(bp, s0, ef, kf, sf, fundo, fsx, fsy, fq, item, caixa, pad));
          var cadeia = ArrayList_init_$Create$_1(p.cadeia_1);
          cadeia.add_utx5q5_k$(escala);
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentar' call
          CorrecaoPaginas_getInstance();
          var tmp_18;
          try {
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paginasFinais.<anonymous>.<anonymous>' call
            tmp_18 = renderizarFinal(CorrecaoPaginas_getInstance(), orig, s0, cadeia);
          } catch ($p) {
            var tmp_19;
            if ($p instanceof Exception) {
              var e_5 = $p;
              tmp_19 = orig;
            } else {
              if ($p instanceof Error) {
                var e_6 = $p;
                tmp_19 = orig;
              } else {
                throw $p;
              }
            }
            tmp_18 = tmp_19;
          }
          var r = tmp_18;
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentar' call
          CorrecaoPaginas_getInstance();
          var img = r;
          var tmp_20;
          try {
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paginasFinais.<anonymous>.<anonymous>' call
            tmp_20 = limparFundo(CorrecaoPaginas_getInstance(), img);
          } catch ($p) {
            var tmp_21;
            if ($p instanceof Exception) {
              var e_7 = $p;
              tmp_21 = img;
            } else {
              if ($p instanceof Error) {
                var e_8 = $p;
                tmp_21 = img;
              } else {
                throw $p;
              }
            }
            tmp_20 = tmp_21;
          }
          r = tmp_20;
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentar' call
          CorrecaoPaginas_getInstance();
          var img_0 = r;
          var tmp_22;
          try {
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paginasFinais.<anonymous>.<anonymous>' call
            tmp_22 = normalizar(CorrecaoPaginas_getInstance(), img_0);
          } catch ($p) {
            var tmp_23;
            if ($p instanceof Exception) {
              var e_9 = $p;
              tmp_23 = img_0;
            } else {
              if ($p instanceof Error) {
                var e_10 = $p;
                tmp_23 = img_0;
              } else {
                throw $p;
              }
            }
            tmp_22 = tmp_23;
          }
          r = tmp_22;
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentar' call
          CorrecaoPaginas_getInstance();
          var img_1 = r;
          var tmp_24;
          try {
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paginasFinais.<anonymous>.<anonymous>' call
            tmp_24 = apagarRiscas(CorrecaoPaginas_getInstance(), img_1);
          } catch ($p) {
            var tmp_25;
            if ($p instanceof Exception) {
              var e_11 = $p;
              tmp_25 = img_1;
            } else {
              if ($p instanceof Error) {
                var e_12 = $p;
                tmp_25 = img_1;
              } else {
                throw $p;
              }
            }
            tmp_24 = tmp_25;
          }
          r = tmp_24;
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentar' call
          CorrecaoPaginas_getInstance();
          var img_2 = r;
          var tmp_26;
          try {
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paginasFinais.<anonymous>.<anonymous>' call
            tmp_26 = limparMargens(CorrecaoPaginas_getInstance(), img_2);
          } catch ($p) {
            var tmp_27;
            if ($p instanceof Exception) {
              var e_13 = $p;
              tmp_27 = img_2;
            } else {
              if ($p instanceof Error) {
                var e_14 = $p;
                tmp_27 = img_2;
              } else {
                throw $p;
              }
            }
            tmp_26 = tmp_27;
          }
          r = tmp_26;
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentar' call
          CorrecaoPaginas_getInstance();
          var img_3 = r;
          var tmp_28;
          try {
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paginasFinais.<anonymous>.<anonymous>' call
            tmp_28 = limparPaginaBranca(CorrecaoPaginas_getInstance(), img_3);
          } catch ($p) {
            var tmp_29;
            if ($p instanceof Exception) {
              var e_15 = $p;
              tmp_29 = img_3;
            } else {
              if ($p instanceof Error) {
                var e_16 = $p;
                tmp_29 = img_3;
              } else {
                throw $p;
              }
            }
            tmp_28 = tmp_29;
          }
          r = tmp_28;
          tmp$ret$35 = r;
          break $l$block_0;
        }
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
        CorrecaoPaginas_getInstance();
        var tmp_30;
        try {
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paginasFinais.<anonymous>.<anonymous>' call
          tmp_30 = contornoPagina(CorrecaoPaginas_getInstance(), item.img_1);
        } catch ($p) {
          var tmp_31;
          if ($p instanceof Exception) {
            var e_17 = $p;
            tmp_31 = null;
          } else {
            if ($p instanceof Error) {
              var e_18 = $p;
              tmp_31 = null;
            } else {
              throw $p;
            }
          }
          tmp_30 = tmp_31;
        }
        var cont_0 = tmp_30;
        if (!(cont_0 == null)) {
          var pl = renderizarTrabalho(CorrecaoPaginas_getInstance(), item.img_1, cont_0.t_1);
          var p_0 = refinarPagina(CorrecaoPaginas_getInstance(), new Pag(pl, plus_1(item.cadeia_1, cont_0.t_1), item.lombadaADireita_1));
          var cadeia_0 = ArrayList_init_$Create$_1(p_0.cadeia_1);
          var tmp16_elvis_lhs = folha == null ? null : folha[0];
          var tmp_32;
          if (tmp16_elvis_lhs == null) {
            // Inline function 'kotlin.math.max' call
            var a_4 = trab.w_1;
            var b_9 = trab.h_1;
            var tmp$ret$38 = Math.max(a_4, b_9);
            tmp_32 = cont_0.w_1 / tmp$ret$38;
          } else {
            tmp_32 = tmp16_elvis_lhs;
          }
          var wF = tmp_32 * L;
          var tmp18_elvis_lhs = folha == null ? null : folha[1];
          var tmp_33;
          if (tmp18_elvis_lhs == null) {
            // Inline function 'kotlin.math.max' call
            var a_5 = trab.w_1;
            var b_10 = trab.h_1;
            var tmp$ret$39 = Math.max(a_5, b_10);
            tmp_33 = cont_0.h_1 / tmp$ret$39;
          } else {
            tmp_33 = tmp18_elvis_lhs;
          }
          var hF = tmp_33 * L;
          var tmp_34 = CorrecaoPaginas_getInstance();
          // Inline function 'kotlin.math.max' call
          var b_11 = roundToInt(wF / s0);
          var tmp_35 = Math.max(2, b_11);
          // Inline function 'kotlin.math.max' call
          var b_12 = roundToInt(hF / s0);
          var tmp$ret$41 = Math.max(2, b_12);
          cadeia_0.add_utx5q5_k$(tEscala(tmp_34, tmp_35, tmp$ret$41, p_0.img_1.w_1, p_0.img_1.h_1));
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentar' call
          CorrecaoPaginas_getInstance();
          var tmp_36;
          try {
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paginasFinais.<anonymous>.<anonymous>' call
            tmp_36 = renderizarFinal(CorrecaoPaginas_getInstance(), orig, s0, cadeia_0);
          } catch ($p) {
            var tmp_37;
            if ($p instanceof Exception) {
              var e_19 = $p;
              tmp_37 = orig;
            } else {
              if ($p instanceof Error) {
                var e_20 = $p;
                tmp_37 = orig;
              } else {
                throw $p;
              }
            }
            tmp_36 = tmp_37;
          }
          var r_0 = tmp_36;
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentar' call
          CorrecaoPaginas_getInstance();
          var img_4 = r_0;
          var tmp_38;
          try {
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paginasFinais.<anonymous>.<anonymous>' call
            tmp_38 = normalizar(CorrecaoPaginas_getInstance(), img_4);
          } catch ($p) {
            var tmp_39;
            if ($p instanceof Exception) {
              var e_21 = $p;
              tmp_39 = img_4;
            } else {
              if ($p instanceof Error) {
                var e_22 = $p;
                tmp_39 = img_4;
              } else {
                throw $p;
              }
            }
            tmp_38 = tmp_39;
          }
          r_0 = tmp_38;
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentar' call
          CorrecaoPaginas_getInstance();
          var img_5 = r_0;
          var tmp_40;
          try {
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paginasFinais.<anonymous>.<anonymous>' call
            tmp_40 = apagarRiscas(CorrecaoPaginas_getInstance(), img_5);
          } catch ($p) {
            var tmp_41;
            if ($p instanceof Exception) {
              var e_23 = $p;
              tmp_41 = img_5;
            } else {
              if ($p instanceof Error) {
                var e_24 = $p;
                tmp_41 = img_5;
              } else {
                throw $p;
              }
            }
            tmp_40 = tmp_41;
          }
          r_0 = tmp_40;
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentar' call
          CorrecaoPaginas_getInstance();
          var img_6 = r_0;
          var tmp_42;
          try {
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paginasFinais.<anonymous>.<anonymous>' call
            tmp_42 = limparMargens(CorrecaoPaginas_getInstance(), img_6);
          } catch ($p) {
            var tmp_43;
            if ($p instanceof Exception) {
              var e_25 = $p;
              tmp_43 = img_6;
            } else {
              if ($p instanceof Error) {
                var e_26 = $p;
                tmp_43 = img_6;
              } else {
                throw $p;
              }
            }
            tmp_42 = tmp_43;
          }
          r_0 = tmp_42;
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentar' call
          CorrecaoPaginas_getInstance();
          var img_7 = r_0;
          var tmp_44;
          try {
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paginasFinais.<anonymous>.<anonymous>' call
            tmp_44 = limparPaginaBranca(CorrecaoPaginas_getInstance(), img_7);
          } catch ($p) {
            var tmp_45;
            if ($p instanceof Exception) {
              var e_27 = $p;
              tmp_45 = img_7;
            } else {
              if ($p instanceof Error) {
                var e_28 = $p;
                tmp_45 = img_7;
              } else {
                throw $p;
              }
            }
            tmp_44 = tmp_45;
          }
          r_0 = tmp_44;
          tmp$ret$35 = r_0;
          break $l$block_0;
        }
        var tmp19_safe_receiver = CorrecaoPaginas_getInstance().depurar_1;
        if (tmp19_safe_receiver == null)
          null;
        else
          tmp19_safe_receiver('antes', item.img_1);
        var p_1 = corrigirPagina(CorrecaoPaginas_getInstance(), item);
        var tmp20_safe_receiver = CorrecaoPaginas_getInstance().depurar_1;
        if (tmp20_safe_receiver == null)
          null;
        else
          tmp20_safe_receiver('depois', p_1.img_1);
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
        CorrecaoPaginas_getInstance();
        var tmp_46;
        try {
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paginasFinais.<anonymous>.<anonymous>' call
          tmp_46 = blocoTexto(CorrecaoPaginas_getInstance(), p_1.img_1);
        } catch ($p) {
          var tmp_47;
          if ($p instanceof Exception) {
            var e_29 = $p;
            tmp_47 = null;
          } else {
            if ($p instanceof Error) {
              var e_30 = $p;
              tmp_47 = null;
            } else {
              throw $p;
            }
          }
          tmp_46 = tmp_47;
        }
        var b_13 = tmp_46;
        var q_0 = reduzir(CorrecaoPaginas_getInstance(), p_1.img_1, 1600);
        var sq_0 = p_1.img_1.w_1 / q_0.w_1;
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
        CorrecaoPaginas_getInstance();
        var tmp_48;
        try {
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paginasFinais.<anonymous>.<anonymous>' call
          tmp_48 = caixaConteudo(CorrecaoPaginas_getInstance(), q_0);
        } catch ($p) {
          var tmp_49;
          if ($p instanceof Exception) {
            var e_31 = $p;
            tmp_49 = null;
          } else {
            if ($p instanceof Error) {
              var e_32 = $p;
              tmp_49 = null;
            } else {
              throw $p;
            }
          }
          tmp_48 = tmp_49;
        }
        var tmp21_safe_receiver = tmp_48;
        var tmp_50;
        if (tmp21_safe_receiver == null) {
          tmp_50 = null;
        } else {
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paginasFinais.<anonymous>.<anonymous>' call
          var tmp_51 = 0;
          var tmp_52 = new Float64Array(4);
          while (tmp_51 < 4) {
            var tmp_53 = tmp_51;
            tmp_52[tmp_53] = tmp21_safe_receiver[tmp_53] * sq_0;
            tmp_51 = tmp_51 + 1 | 0;
          }
          tmp_50 = tmp_52;
        }
        var tmp22_elvis_lhs = tmp_50;
        var tmp_54;
        if (tmp22_elvis_lhs == null) {
          // Inline function 'kotlin.doubleArrayOf' call
          tmp_54 = new Float64Array([0.0, 0.0, p_1.img_1.w_1 - 1 | 0, p_1.img_1.h_1 - 1 | 0]);
        } else {
          tmp_54 = tmp22_elvis_lhs;
        }
        var cx = tmp_54;
        var cadeia_1 = ArrayList_init_$Create$_1(p_1.cadeia_1);
        var colocar = !(modelo == null);
        if (colocar) {
          var tmp_55 = CorrecaoPaginas_getInstance();
          var tmp_56 = ensureNotNull(modelo);
          var tmp24_safe_receiver = a == null ? null : a.largPorPagina_1;
          cadeia_1.add_utx5q5_k$(tColocacao(tmp_55, p_1, b_13, cx, tmp_56, L, s0, tmp24_safe_receiver == null ? null : getOrNull_0(tmp24_safe_receiver, idx)));
        }
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentar' call
        CorrecaoPaginas_getInstance();
        var tmp_57;
        try {
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paginasFinais.<anonymous>.<anonymous>' call
          tmp_57 = renderizarFinal(CorrecaoPaginas_getInstance(), orig, s0, cadeia_1);
        } catch ($p) {
          var tmp_58;
          if ($p instanceof Exception) {
            var e_33 = $p;
            tmp_58 = orig;
          } else {
            if ($p instanceof Error) {
              var e_34 = $p;
              tmp_58 = orig;
            } else {
              throw $p;
            }
          }
          tmp_57 = tmp_58;
        }
        var r_1 = tmp_57;
        if (!colocar) {
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentar' call
          CorrecaoPaginas_getInstance();
          var img_8 = r_1;
          var tmp_59;
          try {
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paginasFinais.<anonymous>.<anonymous>' call
            tmp_59 = limparFundo(CorrecaoPaginas_getInstance(), img_8);
          } catch ($p) {
            var tmp_60;
            if ($p instanceof Exception) {
              var e_35 = $p;
              tmp_60 = img_8;
            } else {
              if ($p instanceof Error) {
                var e_36 = $p;
                tmp_60 = img_8;
              } else {
                throw $p;
              }
            }
            tmp_59 = tmp_60;
          }
          r_1 = tmp_59;
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentar' call
          CorrecaoPaginas_getInstance();
          var img_9 = r_1;
          var tmp_61;
          try {
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paginasFinais.<anonymous>.<anonymous>' call
            tmp_61 = aparar(CorrecaoPaginas_getInstance(), img_9);
          } catch ($p) {
            var tmp_62;
            if ($p instanceof Exception) {
              var e_37 = $p;
              tmp_62 = img_9;
            } else {
              if ($p instanceof Error) {
                var e_38 = $p;
                tmp_62 = img_9;
              } else {
                throw $p;
              }
            }
            tmp_61 = tmp_62;
          }
          r_1 = tmp_61;
        }
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentar' call
        CorrecaoPaginas_getInstance();
        var img_10 = r_1;
        var tmp_63;
        try {
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paginasFinais.<anonymous>.<anonymous>' call
          tmp_63 = normalizar(CorrecaoPaginas_getInstance(), img_10);
        } catch ($p) {
          var tmp_64;
          if ($p instanceof Exception) {
            var e_39 = $p;
            tmp_64 = img_10;
          } else {
            if ($p instanceof Error) {
              var e_40 = $p;
              tmp_64 = img_10;
            } else {
              throw $p;
            }
          }
          tmp_63 = tmp_64;
        }
        r_1 = tmp_63;
        if (!colocar) {
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentar' call
          CorrecaoPaginas_getInstance();
          var img_11 = r_1;
          var tmp_65;
          try {
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paginasFinais.<anonymous>.<anonymous>' call
            tmp_65 = enquadrar(CorrecaoPaginas_getInstance(), img_11);
          } catch ($p) {
            var tmp_66;
            if ($p instanceof Exception) {
              var e_41 = $p;
              tmp_66 = img_11;
            } else {
              if ($p instanceof Error) {
                var e_42 = $p;
                tmp_66 = img_11;
              } else {
                throw $p;
              }
            }
            tmp_65 = tmp_66;
          }
          r_1 = tmp_65;
        }
        tmp$ret$35 = r_1;
      }
      destination.add_utx5q5_k$(tmp$ret$35);
    }
    return destination;
  }
  function paginasFinais$default($this, orig, a, modelo, folha, blocoComum, propExt, propSup, $super) {
    folha = folha === VOID ? null : folha;
    blocoComum = blocoComum === VOID ? null : blocoComum;
    propExt = propExt === VOID ? 0.58 : propExt;
    propSup = propSup === VOID ? 0.45 : propSup;
    return paginasFinais($this, orig, a, modelo, folha, blocoComum, propExt, propSup);
  }
  function tColocacao($this, p, b, cx, m, L, s0, larguraAnalise) {
    var wTexto = m.largura_1 * L;
    var wPag = wTexto + (m.mInt_1 + m.mExt_1) * L;
    var hPag = m.altura_1 * L + (m.mSup_1 + m.mInf_1) * L;
    var tmp;
    switch (p.lombadaADireita_1) {
      case true:
        tmp = m.mExt_1 * L;
        break;
      case false:
        tmp = m.mInt_1 * L;
        break;
      case null:
        tmp = (m.mInt_1 + m.mExt_1) / 2 * L;
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    var esq = tmp;
    var sup = m.mSup_1 * L;
    var fator = coerceIn(!(larguraAnalise == null) ? m.largura_1 / larguraAnalise : 1.0, 0.85, 1.15);
    var k = {_v: s0 * fator};
    // Inline function 'kotlin.math.min' call
    var a = (wPag - 0.02 * wPag) / (cx[2] - cx[0]);
    var b_0 = (hPag - sup * 0.5) / (cx[3] - cx[1]);
    var cabeK = Math.min(a, b_0);
    if (k._v > cabeK) {
      k._v = cabeK;
    }
    var tmp_0;
    if (!(b == null) ? b.linhas_1 >= 8 : false) {
      // Inline function 'kotlin.math.abs' call
      var x = b.get_largura_grhsh_k$() * k._v - wTexto;
      tmp_0 = Math.abs(x) < 0.15 * wTexto;
    } else {
      tmp_0 = false;
    }
    var ancoraTexto = tmp_0;
    var x0 = {_v: ancoraTexto ? ensureNotNull(b).x0__1 : (cx[0] + cx[2]) / 2 - wTexto / 2 / k._v};
    var esqC = (cx[0] - x0._v) * k._v + esq;
    var dirC = (cx[2] - x0._v) * k._v + esq;
    if (esqC < 0.0) {
      x0._v = x0._v + esqC / k._v;
    } else if (dirC > wPag) {
      x0._v = x0._v + (dirC - wPag) / k._v;
    }
    var supEf = {_v: sup};
    var baixoC = (cx[3] - cx[1]) * k._v + sup;
    if (baixoC > hPag) {
      // Inline function 'kotlin.math.max' call
      var b_1 = hPag - (cx[3] - cx[1]) * k._v;
      supEf._v = Math.max(0.0, b_1);
    }
    var pad = 6.0;
    // Inline function 'kotlin.math.max' call
    var b_2 = roundToInt(wPag / s0);
    var wc = Math.max(1, b_2);
    // Inline function 'kotlin.math.max' call
    var b_3 = roundToInt(hPag / s0);
    var hc = Math.max(1, b_3);
    return new Transf(wc, hc, CorrecaoPaginas$tColocacao$lambda(s0, x0, esq, k, cx, supEf, pad, p));
  }
  function Transf(wOut, hOut, f) {
    this.wOut_1 = wOut;
    this.hOut_1 = hOut;
    this.f_1 = f;
  }
  protoOf(Transf).get_wOut_wowcdc_k$ = function () {
    return this.wOut_1;
  };
  protoOf(Transf).get_hOut_womrkf_k$ = function () {
    return this.hOut_1;
  };
  protoOf(Transf).get_f_1mhr5p_k$ = function () {
    return this.f_1;
  };
  function Pag(img, cadeia, lombadaADireita) {
    this.img_1 = img;
    this.cadeia_1 = cadeia;
    this.lombadaADireita_1 = lombadaADireita;
  }
  protoOf(Pag).get_img_18j3ja_k$ = function () {
    return this.img_1;
  };
  protoOf(Pag).get_cadeia_bsaqbk_k$ = function () {
    return this.cadeia_1;
  };
  protoOf(Pag).get_lombadaADireita_59i2nu_k$ = function () {
    return this.lombadaADireita_1;
  };
  function renderizarTrabalho($this, img, t) {
    var o = new Float64Array(2);
    var out = new Int32Array(imul(t.wOut_1, t.hOut_1));
    var inductionVariable = 0;
    var last = t.hOut_1;
    if (inductionVariable < last)
      do {
        var y = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var inductionVariable_0 = 0;
        var last_0 = t.wOut_1;
        if (inductionVariable_0 < last_0)
          do {
            var x = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            t.f_1(x, y, o);
            out[imul(y, t.wOut_1) + x | 0] = (isNaN_0(o[0]) ? true : isNaN_0(o[1])) ? -1 : amostrar($this, img.px_1, img.w_1, img.h_1, o[0], o[1]);
          }
           while (inductionVariable_0 < last_0);
      }
       while (inductionVariable < last);
    return new Imagem(t.wOut_1, t.hOut_1, out);
  }
  function renderizarMedir($this, img, t, alt) {
    // Inline function 'kotlin.math.min' call
    var b = alt / t.hOut_1;
    var f = Math.min(1.0, b);
    if (f >= 1.0)
      return renderizarTrabalho($this, img, t);
    // Inline function 'kotlin.math.max' call
    var b_0 = roundToInt(t.wOut_1 * f);
    var wo = Math.max(1, b_0);
    // Inline function 'kotlin.math.max' call
    var b_1 = roundToInt(t.hOut_1 * f);
    var ho = Math.max(1, b_1);
    var o = new Float64Array(2);
    var out = new Int32Array(imul(wo, ho));
    var inductionVariable = 0;
    if (inductionVariable < ho)
      do {
        var y = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var inductionVariable_0 = 0;
        if (inductionVariable_0 < wo)
          do {
            var x = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            t.f_1(x / f, y / f, o);
            out[imul(y, wo) + x | 0] = isNaN_0(o[0]) ? -1 : amostrar($this, img.px_1, img.w_1, img.h_1, o[0], o[1]);
          }
           while (inductionVariable_0 < wo);
      }
       while (inductionVariable < ho);
    return new Imagem(wo, ho, out);
  }
  function renderizarMedir$default($this, img, t, alt, $super) {
    alt = alt === VOID ? 1200 : alt;
    return renderizarMedir($this, img, t, alt);
  }
  function renderizarFinal($this, orig, s0, cadeia) {
    if (cadeia.isEmpty_y1axqb_k$())
      return orig;
    var ult = last_0(cadeia);
    // Inline function 'kotlin.math.max' call
    var b = roundToInt(ult.wOut_1 * s0);
    var wF = Math.max(1, b);
    // Inline function 'kotlin.math.max' call
    var b_0 = roundToInt(ult.hOut_1 * s0);
    var hF = Math.max(1, b_0);
    var g = 4;
    var gw = (wF / g | 0) + 2 | 0;
    var gh = (hF / g | 0) + 2 | 0;
    var gx = new Float32Array(imul(gw, gh));
    var gy = new Float32Array(imul(gw, gh));
    var o = new Float64Array(2);
    var inductionVariable = 0;
    if (inductionVariable < gh)
      do {
        var j = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var inductionVariable_0 = 0;
        if (inductionVariable_0 < gw)
          do {
            var i = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            var x = imul(i, g) / s0;
            var y = imul(j, g) / s0;
            var inductionVariable_1 = cadeia.get_size_woubt6_k$() - 1 | 0;
            if (0 <= inductionVariable_1)
              $l$loop: do {
                var k = inductionVariable_1;
                inductionVariable_1 = inductionVariable_1 + -1 | 0;
                cadeia.get_c1px32_k$(k).f_1(x, y, o);
                x = o[0];
                y = o[1];
                if (isNaN_0(x))
                  break $l$loop;
              }
               while (0 <= inductionVariable_1);
            var tmp = imul(j, gw) + i | 0;
            var tmp_0;
            if (isNaN_0(x)) {
              FloatCompanionObject_getInstance();
              tmp_0 = NaN;
            } else {
              tmp_0 = x * s0;
            }
            gx[tmp] = tmp_0;
            gy[imul(j, gw) + i | 0] = y * s0;
          }
           while (inductionVariable_0 < gw);
      }
       while (inductionVariable < gh);
    var out = new Int32Array(imul(wF, hF));
    var inductionVariable_2 = 0;
    if (inductionVariable_2 < hF)
      do {
        var y_0 = inductionVariable_2;
        inductionVariable_2 = inductionVariable_2 + 1 | 0;
        var fy = y_0 / g;
        var j0 = numberToInt(fy);
        var ty = fy - j0;
        var inductionVariable_3 = 0;
        if (inductionVariable_3 < wF)
          $l$loop_0: do {
            var x_0 = inductionVariable_3;
            inductionVariable_3 = inductionVariable_3 + 1 | 0;
            var fx = x_0 / g;
            var i0 = numberToInt(fx);
            var tx = fx - i0;
            var a = imul(j0, gw) + i0 | 0;
            if (((isNaN_1(gx[a]) ? true : isNaN_1(gx[a + 1 | 0])) ? true : isNaN_1(gx[a + gw | 0])) ? true : isNaN_1(gx[(a + gw | 0) + 1 | 0])) {
              out[imul(y_0, wF) + x_0 | 0] = -1;
              continue $l$loop_0;
            }
            var sx = (gx[a] * (1 - tx) + gx[a + 1 | 0] * tx) * (1 - ty) + (gx[a + gw | 0] * (1 - tx) + gx[(a + gw | 0) + 1 | 0] * tx) * ty;
            var sy = (gy[a] * (1 - tx) + gy[a + 1 | 0] * tx) * (1 - ty) + (gy[a + gw | 0] * (1 - tx) + gy[(a + gw | 0) + 1 | 0] * tx) * ty;
            out[imul(y_0, wF) + x_0 | 0] = amostrarBicubico($this, orig.px_1, orig.w_1, orig.h_1, sx, sy);
          }
           while (inductionVariable_3 < wF);
      }
       while (inductionVariable_2 < hF);
    return new Imagem(wF, hF, out);
  }
  function tRodar($this, w, h, codigo) {
    var tmp;
    switch (codigo) {
      case 1:
        tmp = new Transf(h, w, CorrecaoPaginas$tRodar$lambda(h));
        break;
      case 2:
        tmp = new Transf(h, w, CorrecaoPaginas$tRodar$lambda_0(w));
        break;
      default:
        tmp = new Transf(w, h, CorrecaoPaginas$tRodar$lambda_1(w, h));
        break;
    }
    return tmp;
  }
  function tRecorte($this, x0, y0, w, h) {
    return new Transf(w, h, CorrecaoPaginas$tRecorte$lambda(x0, y0));
  }
  function tAngulo($this, w, h, graus) {
    var rad = graus * get_PI() / 180;
    // Inline function 'kotlin.math.cos' call
    var cs = Math.cos(rad);
    // Inline function 'kotlin.math.sin' call
    var sn = Math.sin(rad);
    var cx = w / 2.0;
    var cy = h / 2.0;
    return new Transf(w, h, CorrecaoPaginas$tAngulo$lambda(cx, cy, cs, sn));
  }
  function tCampo($this, c, w, h) {
    var sx = c.w_1 / w;
    var sy = c.h_1 / h;
    var esc = 1.0 / sy;
    var nc = c.dgs_1.length;
    return new Transf(w, h, CorrecaoPaginas$tCampo$lambda(sy, c, sx, nc, esc));
  }
  function processar($this, orig, modoLivro) {
    var trab0 = reduzir($this, orig, 2000);
    var s0 = orig.w_1 / trab0.w_1;
    var trab = trab0;
    var base = ArrayList_init_$Create$();
    // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
    var tmp;
    try {
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processar.<anonymous>' call
      tmp = orientacao(CorrecaoPaginas_getInstance(), trab);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Exception) {
        var e = $p;
        tmp_0 = 0;
      } else {
        if ($p instanceof Error) {
          var e_0 = $p;
          tmp_0 = 0;
        } else {
          throw $p;
        }
      }
      tmp = tmp_0;
    }
    var cod = tmp;
    if (!(cod === 0)) {
      var t = tRodar($this, trab.w_1, trab.h_1, cod);
      trab = renderizarTrabalho($this, trab, t);
      base.add_utx5q5_k$(t);
    }
    // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
    var tmp_1;
    try {
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processar.<anonymous>' call
      tmp_1 = lombadaPelaLuz(CorrecaoPaginas_getInstance(), trab);
    } catch ($p) {
      var tmp_2;
      if ($p instanceof Exception) {
        var e_1 = $p;
        tmp_2 = null;
      } else {
        if ($p instanceof Error) {
          var e_2 = $p;
          tmp_2 = null;
        } else {
          throw $p;
        }
      }
      tmp_1 = tmp_2;
    }
    var luz = tmp_1;
    var duplo = !(luz == null) ? modoLivro ? luz.forca_1 >= 8.0 ? trab.w_1 > 1.15 * trab.h_1 : false : (luz.forca_1 >= 12.0 ? luz.tintaVizinha_1 < 0.3 : false) ? trab.w_1 > 1.25 * trab.h_1 : false : false;
    var paginas = ArrayList_init_$Create$();
    if (duplo) {
      var x = coerceIn_0(roundToInt(ensureNotNull(luz).x_1), 1, trab.w_1 - 1 | 0);
      var metades = listOf_0([new Pag(recortar($this, trab, 0, 0, x, trab.h_1), plus_1(base, tRecorte($this, 0, 0, x, trab.h_1)), true), new Pag(recortar($this, trab, x, 0, trab.w_1, trab.h_1), plus_1(base, tRecorte($this, x, 0, trab.w_1 - x | 0, trab.h_1)), false)]);
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
      var padrao = listOf_0([null, null]);
      var tmp_3;
      try {
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processar.<anonymous>' call
        var g = Companion_getInstance_24().medir_bikrrs_k$(trab);
        var tmp_4;
        var tmp_5;
        if (!(g == null) ? !(g.lombada_1 == null) : false) {
          // Inline function 'kotlin.math.abs' call
          var x_0 = g.lombada_1 - luz.x_1;
          tmp_5 = Math.abs(x_0) < 0.03 * trab.w_1;
        } else {
          tmp_5 = false;
        }
        if (tmp_5) {
          // Inline function 'kotlin.collections.map' call
          var this_0 = g.paginas_1;
          // Inline function 'kotlin.collections.mapTo' call
          var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
          var tmp0_iterator = this_0.iterator_jk1svi_k$();
          while (tmp0_iterator.hasNext_bitz1p_k$()) {
            var item = tmp0_iterator.next_20eer_k$();
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processar.<anonymous>.<anonymous>' call
            var tmp0_safe_receiver = planificarT(CorrecaoPaginas_getInstance(), trab, g, item);
            var tmp_6;
            if (tmp0_safe_receiver == null) {
              tmp_6 = null;
            } else {
              // Inline function 'kotlin.let' call
              // Inline function 'kotlin.contracts.contract' call
              // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processar.<anonymous>.<anonymous>.<anonymous>' call
              var img = tmp0_safe_receiver.component1_7eebsc_k$();
              var t_0 = tmp0_safe_receiver.component2_7eebsb_k$();
              tmp_6 = new Pag(img, plus_1(base, t_0), item.lombadaADireita_1);
            }
            var tmp$ret$7 = tmp_6;
            destination.add_utx5q5_k$(tmp$ret$7);
          }
          tmp_4 = destination;
        } else {
          tmp_4 = listOf_0([null, null]);
        }
        tmp_3 = tmp_4;
      } catch ($p) {
        var tmp_7;
        if ($p instanceof Exception) {
          var e_3 = $p;
          tmp_7 = padrao;
        } else {
          if ($p instanceof Error) {
            var e_4 = $p;
            tmp_7 = padrao;
          } else {
            throw $p;
          }
        }
        tmp_3 = tmp_7;
      }
      var geo = tmp_3;
      var inductionVariable = 0;
      if (inductionVariable <= 1)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var txt = corrigirPagina($this, metades.get_c1px32_k$(i));
          var tmp1_safe_receiver = getOrNull_0(geo, i);
          var tmp_8;
          if (tmp1_safe_receiver == null) {
            tmp_8 = null;
          } else {
            // Inline function 'kotlin.let' call
            // Inline function 'kotlin.contracts.contract' call
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processar.<anonymous>' call
            tmp_8 = corrigirPagina(CorrecaoPaginas_getInstance(), tmp1_safe_receiver);
          }
          var gp = tmp_8;
          paginas.add_utx5q5_k$(gp == null ? txt : escolher($this, txt, gp));
        }
         while (inductionVariable <= 1);
    } else if (modoLivro) {
      paginas.add_utx5q5_k$(corrigirPagina($this, new Pag(trab, base, null)));
    } else {
      var p = new Pag(trab, base, null);
      var pequena = reduzirAltura($this, trab, 1200);
      var antes = curvatura($this, elementos$default($this, pequena), pequena.h_1 / 1200.0);
      if (!isNaN_0(antes) ? antes >= 1.5 : false) {
        var c = corrigirPagina($this, p);
        var cp = reduzirAltura($this, c.img_1, 1200);
        var depois = curvatura($this, elementos$default($this, cp), cp.h_1 / 1200.0);
        if (!isNaN_0(depois) ? depois < 0.8 * antes : false) {
          paginas.add_utx5q5_k$(c);
        }
      }
      if (paginas.isEmpty_y1axqb_k$())
        return !(cod === 0) ? listOf(renderizarFinal($this, orig, s0, base)) : null;
    }
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(paginas, 10));
    var tmp0_iterator_0 = paginas.iterator_jk1svi_k$();
    while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
      var item_0 = tmp0_iterator_0.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processar.<anonymous>' call
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentar' call
      CorrecaoPaginas_getInstance();
      var tmp_9;
      try {
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processar.<anonymous>.<anonymous>' call
        tmp_9 = renderizarFinal(CorrecaoPaginas_getInstance(), orig, s0, item_0.cadeia_1);
      } catch ($p) {
        var tmp_10;
        if ($p instanceof Exception) {
          var e_5 = $p;
          tmp_10 = orig;
        } else {
          if ($p instanceof Error) {
            var e_6 = $p;
            tmp_10 = orig;
          } else {
            throw $p;
          }
        }
        tmp_9 = tmp_10;
      }
      var r = tmp_9;
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentar' call
      CorrecaoPaginas_getInstance();
      var img_0 = r;
      var tmp_11;
      try {
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processar.<anonymous>.<anonymous>' call
        tmp_11 = limparFundo(CorrecaoPaginas_getInstance(), img_0);
      } catch ($p) {
        var tmp_12;
        if ($p instanceof Exception) {
          var e_7 = $p;
          tmp_12 = img_0;
        } else {
          if ($p instanceof Error) {
            var e_8 = $p;
            tmp_12 = img_0;
          } else {
            throw $p;
          }
        }
        tmp_11 = tmp_12;
      }
      r = tmp_11;
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentar' call
      CorrecaoPaginas_getInstance();
      var img_1 = r;
      var tmp_13;
      try {
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processar.<anonymous>.<anonymous>' call
        tmp_13 = aparar(CorrecaoPaginas_getInstance(), img_1);
      } catch ($p) {
        var tmp_14;
        if ($p instanceof Exception) {
          var e_9 = $p;
          tmp_14 = img_1;
        } else {
          if ($p instanceof Error) {
            var e_10 = $p;
            tmp_14 = img_1;
          } else {
            throw $p;
          }
        }
        tmp_13 = tmp_14;
      }
      r = tmp_13;
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentar' call
      CorrecaoPaginas_getInstance();
      var img_2 = r;
      var tmp_15;
      try {
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processar.<anonymous>.<anonymous>' call
        tmp_15 = normalizar(CorrecaoPaginas_getInstance(), img_2);
      } catch ($p) {
        var tmp_16;
        if ($p instanceof Exception) {
          var e_11 = $p;
          tmp_16 = img_2;
        } else {
          if ($p instanceof Error) {
            var e_12 = $p;
            tmp_16 = img_2;
          } else {
            throw $p;
          }
        }
        tmp_15 = tmp_16;
      }
      r = tmp_15;
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentar' call
      CorrecaoPaginas_getInstance();
      var img_3 = r;
      var tmp_17;
      try {
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processar.<anonymous>.<anonymous>' call
        tmp_17 = enquadrar(CorrecaoPaginas_getInstance(), img_3);
      } catch ($p) {
        var tmp_18;
        if ($p instanceof Exception) {
          var e_13 = $p;
          tmp_18 = img_3;
        } else {
          if ($p instanceof Error) {
            var e_14 = $p;
            tmp_18 = img_3;
          } else {
            throw $p;
          }
        }
        tmp_17 = tmp_18;
      }
      var tmp$ret$24 = tmp_17;
      destination_0.add_utx5q5_k$(tmp$ret$24);
    }
    return destination_0;
  }
  function corrigirPagina($this, p0) {
    // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentar' call
    var img = p0.img_1;
    var tmp;
    try {
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.corrigirPagina.<anonymous>' call
      tmp = limparFundo(CorrecaoPaginas_getInstance(), img);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Exception) {
        var e = $p;
        tmp_0 = img;
      } else {
        if ($p instanceof Error) {
          var e_0 = $p;
          tmp_0 = img;
        } else {
          throw $p;
        }
      }
      tmp = tmp_0;
    }
    var img_0 = tmp;
    var cadeia = ArrayList_init_$Create$_1(p0.cadeia_1);
    // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
    var tmp_1;
    try {
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.corrigirPagina.<anonymous>' call
      tmp_1 = anguloInclinacao(CorrecaoPaginas_getInstance(), img_0);
    } catch ($p) {
      var tmp_2;
      if ($p instanceof Exception) {
        var e_1 = $p;
        tmp_2 = 0.0;
      } else {
        if ($p instanceof Error) {
          var e_2 = $p;
          tmp_2 = 0.0;
        } else {
          throw $p;
        }
      }
      tmp_1 = tmp_2;
    }
    var ang = tmp_1;
    if (!(ang === 0.0)) {
      var t = tAngulo($this, img_0.w_1, img_0.h_1, ang);
      img_0 = renderizarTrabalho($this, img_0, t);
      cadeia.add_utx5q5_k$(t);
    }
    var med = medidas($this, img_0);
    var inductionVariable = 0;
    if (inductionVariable < 4)
      $l$loop_0: do {
        var k = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
        var tmp_3;
        try {
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.corrigirPagina.<anonymous>' call
          tmp_3 = campo(CorrecaoPaginas_getInstance(), reduzirAltura(CorrecaoPaginas_getInstance(), img_0, 1200));
        } catch ($p) {
          var tmp_4;
          if ($p instanceof Exception) {
            var e_3 = $p;
            tmp_4 = null;
          } else {
            if ($p instanceof Error) {
              var e_4 = $p;
              tmp_4 = null;
            } else {
              throw $p;
            }
          }
          tmp_3 = tmp_4;
        }
        var tmp1_elvis_lhs = tmp_3;
        var tmp_5;
        if (tmp1_elvis_lhs == null) {
          break $l$loop_0;
        } else {
          tmp_5 = tmp1_elvis_lhs;
        }
        var c = tmp_5;
        var t_0 = tCampo($this, c, img_0.w_1, img_0.h_1);
        var nova = renderizarTrabalho($this, img_0, t_0);
        var m = medidas($this, nova);
        if (m.cobertura_1 < 0.95 * med.cobertura_1 ? true : m.curvatura_1 > med.curvatura_1 * 1.1 + 0.2)
          break $l$loop_0;
        img_0 = nova;
        cadeia.add_utx5q5_k$(t_0);
        med = m;
      }
       while (inductionVariable < 4);
    var lado = p0.lombadaADireita_1;
    if (!(lado == null)) {
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
      var tmp_6;
      try {
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.corrigirPagina.<anonymous>' call
        tmp_6 = tLombada(CorrecaoPaginas_getInstance(), img_0, lado);
      } catch ($p) {
        var tmp_7;
        if ($p instanceof Exception) {
          var e_5 = $p;
          tmp_7 = null;
        } else {
          if ($p instanceof Error) {
            var e_6 = $p;
            tmp_7 = null;
          } else {
            throw $p;
          }
        }
        tmp_6 = tmp_7;
      }
      var t_1 = tmp_6;
      if (!(t_1 == null)) {
        var nova_0 = renderizarTrabalho($this, img_0, t_1);
        var antes = curvaturaLombada($this, img_0, lado);
        var depois = curvaturaLombada($this, nova_0, lado);
        if (!isNaN_0(depois) ? isNaN_0(antes) ? true : depois < 0.85 * antes : false) {
          img_0 = nova_0;
          cadeia.add_utx5q5_k$(t_1);
        }
      }
    }
    return new Pag(img_0, cadeia, p0.lombadaADireita_1);
  }
  function curvaturaLombada($this, img, lombadaADireita) {
    var p = reduzirAltura($this, img, 1200);
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var this_0 = elementos($this, p, 20.0);
    var destination = ArrayList_init_$Create$();
    var tmp0_iterator = this_0.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.curvaturaLombada.<anonymous>' call
      if (element.tipo_1 === 0 ? element.xs_1.length >= 10 : false) {
        destination.add_utx5q5_k$(element);
      }
    }
    // Inline function 'kotlin.collections.mapTo' call
    var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(destination, 10));
    var tmp0_iterator_0 = destination.iterator_jk1svi_k$();
    while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
      var item = tmp0_iterator_0.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.curvaturaLombada.<anonymous>' call
      var n = item.ys_1.length;
      var tmp = CorrecaoPaginas_getInstance();
      var tmp_0 = 0;
      var tmp_1 = n / 3 | 0;
      var tmp_2 = new Float64Array(tmp_1);
      while (tmp_0 < tmp_1) {
        var tmp_3 = tmp_0;
        tmp_2[tmp_3] = item.ys_1[(n / 3 | 0) + tmp_3 | 0];
        tmp_0 = tmp_0 + 1 | 0;
      }
      var meio = mediana_0(tmp, tmp_2);
      var fimR = lombadaADireita ? until(n - (n / 4 | 0) | 0, n) : until(0, n / 4 | 0);
      // Inline function 'kotlin.collections.maxOf' call
      var iterator = fimR.iterator_jk1svi_k$();
      if (!iterator.hasNext_bitz1p_k$())
        throw NoSuchElementException_init_$Create$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.curvaturaLombada.<anonymous>.<anonymous>' call
      var it = iterator.next_20eer_k$();
      // Inline function 'kotlin.math.abs' call
      var x = item.ys_1[it] - meio;
      var maxValue = Math.abs(x);
      while (iterator.hasNext_bitz1p_k$()) {
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.curvaturaLombada.<anonymous>.<anonymous>' call
        var it_0 = iterator.next_20eer_k$();
        // Inline function 'kotlin.math.abs' call
        var x_0 = item.ys_1[it_0] - meio;
        var v = Math.abs(x_0);
        // Inline function 'kotlin.comparisons.maxOf' call
        var a = maxValue;
        maxValue = Math.max(a, v);
      }
      var tmp$ret$10 = maxValue;
      destination_0.add_utx5q5_k$(tmp$ret$10);
    }
    var dev = destination_0;
    var tmp_4;
    if (dev.get_size_woubt6_k$() < 3) {
      DoubleCompanionObject_getInstance();
      tmp_4 = NaN;
    } else {
      tmp_4 = average_0(dev);
    }
    return tmp_4;
  }
  function tLombada($this, img, lombadaADireita) {
    var w = img.w_1;
    var h = img.h_1;
    var t = textoBinario($this, img, 30.0);
    var tintaCol = new Int32Array(w);
    var inductionVariable = 0;
    if (inductionVariable < h)
      do {
        var y = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var inductionVariable_0 = 0;
        if (inductionVariable_0 < w)
          do {
            var x = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            tintaCol[x] = tintaCol[x] + t[imul(y, w) + x | 0] | 0;
          }
           while (inductionVariable_0 < w);
      }
       while (inductionVariable < h);
    // Inline function 'kotlin.math.max' call
    var b = numberToInt(0.01 * h);
    var limCol = Math.max(2, b);
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var this_0 = until(0, w);
    var destination = ArrayList_init_$Create$();
    var tmp0_iterator = this_0.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tLombada.<anonymous>' call
      if (tintaCol[element] >= limCol) {
        destination.add_utx5q5_k$(element);
      }
    }
    var cols = destination;
    if (cols.get_size_woubt6_k$() < 0.2 * w)
      return null;
    var tx0 = first_0(cols);
    var tx1 = last_0(cols);
    var larg = tx1 - tx0 | 0;
    // Inline function 'kotlin.math.max' call
    var b_0 = w / 90 | 0;
    var faixa = Math.max(6, b_0);
    var inicio = lombadaADireita ? tx0 + numberToInt(0.62 * larg) | 0 : tx1 - numberToInt(0.62 * larg) | 0;
    var fim = lombadaADireita ? w - 1 | 0 : 0;
    var passo = lombadaADireita ? faixa : -faixa | 0;
    var nPassos = abs_0(fim - inicio | 0) / faixa | 0;
    if (nPassos < 3)
      return null;
    var nb = 4;
    var bandaH = h / nb | 0;
    // Inline function 'kotlin.math.max' call
    var b_1 = faixa / 2 | 0;
    var maxD = Math.max(2, b_1);
    var limTotal = 0.08 * h;
    var tmp = 0;
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_0 = fillArrayVal(Array(nb), null);
    while (tmp < nb) {
      tmp_0[tmp] = new Float64Array(nPassos + 1 | 0);
      tmp = tmp + 1 | 0;
    }
    var desvios = tmp_0;
    var inductionVariable_1 = 0;
    if (inductionVariable_1 < nb)
      do {
        var b_2 = inductionVariable_1;
        inductionVariable_1 = inductionVariable_1 + 1 | 0;
        var y0 = imul(b_2, bandaH);
        // Inline function 'kotlin.math.min' call
        var b_3 = y0 + bandaH | 0;
        var y1 = Math.min(h, b_3);
        var ref = tLombada$perfil(h, passo, w, y0, faixa, y1, t, inicio);
        var acum = 0.0;
        var inductionVariable_2 = 1;
        if (inductionVariable_2 <= nPassos)
          $l$loop_0: do {
            var k = inductionVariable_2;
            inductionVariable_2 = inductionVariable_2 + 1 | 0;
            var xc = inicio + imul(k, passo) | 0;
            if (xc < 0 ? true : xc >= w) {
              desvios[b_2][k] = acum;
              continue $l$loop_0;
            }
            var p = tLombada$perfil(h, passo, w, y0, faixa, y1, t, xc);
            // Inline function 'kotlin.collections.sumOf' call
            var sum = 0.0;
            var tmp0_iterator_0 = until(y0, y1).iterator_jk1svi_k$();
            while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
              var element_0 = tmp0_iterator_0.next_20eer_k$();
              var tmp_1 = sum;
              // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tLombada.<anonymous>' call
              sum = tmp_1 + p[element_0];
            }
            var tinta = sum;
            if (tinta < imul(3, faixa)) {
              desvios[b_2][k] = acum;
              continue $l$loop_0;
            }
            var melhor = 0;
            DoubleCompanionObject_getInstance();
            var mv = -Infinity;
            var inductionVariable_3 = -maxD | 0;
            if (inductionVariable_3 <= maxD)
              do {
                var d = inductionVariable_3;
                inductionVariable_3 = inductionVariable_3 + 1 | 0;
                var sc = 0.0;
                var inductionVariable_4 = y0;
                if (inductionVariable_4 < y1)
                  do {
                    var y_0 = inductionVariable_4;
                    inductionVariable_4 = inductionVariable_4 + 1 | 0;
                    var yy = roundToInt(y_0 + acum + d);
                    if (0 <= yy ? yy < h : false)
                      sc = sc + ref[y_0] * p[yy];
                  }
                   while (inductionVariable_4 < y1);
                if (sc > mv) {
                  mv = sc;
                  melhor = d;
                }
              }
               while (!(d === maxD));
            acum = coerceIn(acum + melhor, -limTotal, limTotal);
            desvios[b_2][k] = acum;
            var nova = new Float64Array(h);
            var inductionVariable_5 = 0;
            if (inductionVariable_5 < h)
              do {
                var y_1 = inductionVariable_5;
                inductionVariable_5 = inductionVariable_5 + 1 | 0;
                var yy_0 = roundToInt(y_1 + acum);
                if (0 <= yy_0 ? yy_0 < h : false) {
                  nova[y_1] = p[yy_0];
                }
              }
               while (inductionVariable_5 < h);
            ref = nova;
          }
           while (!(k === nPassos));
        desvios[b_2] = suavizar($this, desvios[b_2], 1.5);
      }
       while (inductionVariable_1 < nb);
    var tmp$ret$15;
    $l$block_0: {
      // Inline function 'kotlin.collections.all' call
      var inductionVariable_6 = 0;
      var last = desvios.length;
      while (inductionVariable_6 < last) {
        var element_1 = desvios[inductionVariable_6];
        inductionVariable_6 = inductionVariable_6 + 1 | 0;
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tLombada.<anonymous>' call
        var tmp$ret$13;
        $l$block: {
          // Inline function 'kotlin.collections.all' call
          var inductionVariable_7 = 0;
          var last_1 = element_1.length;
          while (inductionVariable_7 < last_1) {
            var element_2 = element_1[inductionVariable_7];
            inductionVariable_7 = inductionVariable_7 + 1 | 0;
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tLombada.<anonymous>.<anonymous>' call
            // Inline function 'kotlin.math.abs' call
            if (!(Math.abs(element_2) < 1.0)) {
              tmp$ret$13 = false;
              break $l$block;
            }
          }
          tmp$ret$13 = true;
        }
        if (!tmp$ret$13) {
          tmp$ret$15 = false;
          break $l$block_0;
        }
      }
      tmp$ret$15 = true;
    }
    if (tmp$ret$15)
      return null;
    return new Transf(w, h, CorrecaoPaginas$tLombada$lambda(inicio, passo, nPassos, bandaH, nb, desvios));
  }
  function Medidas(cobertura, curvatura) {
    this.cobertura_1 = cobertura;
    this.curvatura_1 = curvatura;
  }
  protoOf(Medidas).get_cobertura_vuaoru_k$ = function () {
    return this.cobertura_1;
  };
  protoOf(Medidas).get_curvatura_l84tgy_k$ = function () {
    return this.curvatura_1;
  };
  function medidas($this, img) {
    var p = reduzirAltura($this, img, 1200);
    var e = elementos$default($this, p);
    // Inline function 'kotlin.collections.sumOf' call
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var destination = ArrayList_init_$Create$();
    var tmp0_iterator = e.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.medidas.<anonymous>' call
      if (element.tipo_1 === 0) {
        destination.add_utx5q5_k$(element);
      }
    }
    var sum = 0.0;
    var tmp0_iterator_0 = destination.iterator_jk1svi_k$();
    while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
      var element_0 = tmp0_iterator_0.next_20eer_k$();
      var tmp = sum;
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.medidas.<anonymous>' call
      sum = tmp + (last(element_0.xs_1) - first(element_0.xs_1));
    }
    var cob = sum / p.w_1;
    var c = curvatura($this, e, p.h_1 / 1200.0);
    return new Medidas(cob, isNaN_0(c) ? 99.0 : c);
  }
  function escolher($this, txt, geo) {
    var ct = cobertura($this, txt.img_1);
    var cg = cobertura($this, geo.img_1);
    return ct > 1.15 * cg ? txt : (ct >= 0.7 * cg ? inclinacaoMargem($this, txt.img_1) + 10 < 0.5 * inclinacaoMargem($this, geo.img_1) : false) ? txt : geo;
  }
  function cobertura($this, img) {
    var p = reduzirAltura($this, img, 1200);
    // Inline function 'kotlin.collections.sumOf' call
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var this_0 = elementos$default($this, p);
    var destination = ArrayList_init_$Create$();
    var tmp0_iterator = this_0.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.cobertura.<anonymous>' call
      if (element.tipo_1 === 0) {
        destination.add_utx5q5_k$(element);
      }
    }
    var sum = 0.0;
    var tmp0_iterator_0 = destination.iterator_jk1svi_k$();
    while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
      var element_0 = tmp0_iterator_0.next_20eer_k$();
      var tmp = sum;
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.cobertura.<anonymous>' call
      sum = tmp + (last(element_0.xs_1) - first(element_0.xs_1));
    }
    return sum / p.w_1;
  }
  function inclinacaoMargem($this, img) {
    var p = reduzirAltura($this, img, 1200);
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var this_0 = elementos$default($this, p);
    var destination = ArrayList_init_$Create$();
    var tmp0_iterator = this_0.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.inclinacaoMargem.<anonymous>' call
      if (element.tipo_1 === 0) {
        destination.add_utx5q5_k$(element);
      }
    }
    var t = destination;
    if (t.get_size_woubt6_k$() < 6)
      return 0.0;
    var tmp = 0;
    var tmp_0 = t.get_size_woubt6_k$();
    var tmp_1 = new Float64Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      tmp_1[tmp_2] = t.get_c1px32_k$(tmp_2).x0__1;
      tmp = tmp + 1 | 0;
    }
    var x0 = tmp_1;
    var med = mediana_0($this, x0);
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var this_1 = get_indices_6(t);
    var destination_0 = ArrayList_init_$Create$();
    var tmp0_iterator_0 = this_1.iterator_jk1svi_k$();
    while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
      var element_0 = tmp0_iterator_0.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.inclinacaoMargem.<anonymous>' call
      // Inline function 'kotlin.math.abs' call
      var x = x0[element_0] - med;
      if (Math.abs(x) < 40.0) {
        destination_0.add_utx5q5_k$(element_0);
      }
    }
    var sel = destination_0;
    if (sel.get_size_woubt6_k$() < 5)
      return 0.0;
    var tmp_3 = 0;
    var tmp_4 = sel.get_size_woubt6_k$();
    var tmp_5 = new Float64Array(tmp_4);
    while (tmp_3 < tmp_4) {
      var tmp_6 = tmp_3;
      tmp_5[tmp_6] = average(t.get_c1px32_k$(sel.get_c1px32_k$(tmp_6)).ys_1);
      tmp_3 = tmp_3 + 1 | 0;
    }
    var ys = tmp_5;
    var tmp_7 = 0;
    var tmp_8 = sel.get_size_woubt6_k$();
    var tmp_9 = new Float64Array(tmp_8);
    while (tmp_7 < tmp_8) {
      var tmp_10 = tmp_7;
      tmp_9[tmp_10] = x0[sel.get_c1px32_k$(tmp_10)];
      tmp_7 = tmp_7 + 1 | 0;
    }
    var xs = tmp_9;
    var pr = ajustarRobusto$default($this, ys, xs, 1, 3.0);
    // Inline function 'kotlin.math.abs' call
    var x_0 = pr.v_w1w1cg_k$(p.h_1) - pr.v_w1w1cg_k$(0.0);
    return Math.abs(x_0);
  }
  function tentar($this, img, passo) {
    var tmp;
    try {
      tmp = passo(img);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Exception) {
        var e = $p;
        tmp_0 = img;
      } else {
        if ($p instanceof Error) {
          var e_0 = $p;
          tmp_0 = img;
        } else {
          throw $p;
        }
      }
      tmp = tmp_0;
    }
    return tmp;
  }
  function tentarValor($this, padrao, calc) {
    var tmp;
    try {
      tmp = calc();
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Exception) {
        var e = $p;
        tmp_0 = padrao;
      } else {
        if ($p instanceof Error) {
          var e_0 = $p;
          tmp_0 = padrao;
        } else {
          throw $p;
        }
      }
      tmp = tmp_0;
    }
    return tmp;
  }
  function cinz($this, c) {
    return 0.299 * (c >> 16 & 255) + 0.587 * (c >> 8 & 255) + 0.114 * (c & 255);
  }
  function sat($this, c) {
    var r = c >> 16 & 255;
    var g = c >> 8 & 255;
    var b = c & 255;
    // Inline function 'kotlin.math.max' call
    // Inline function 'kotlin.math.max' call
    var b_0 = Math.max(g, b);
    var mx = Math.max(r, b_0);
    // Inline function 'kotlin.math.min' call
    // Inline function 'kotlin.math.min' call
    var b_1 = Math.min(g, b);
    var mn = Math.min(r, b_1);
    return mx === 0 ? 0 : imul(mx - mn | 0, 255) / mx | 0;
  }
  function brilho($this, c) {
    // Inline function 'kotlin.math.max' call
    var a = c >> 16 & 255;
    // Inline function 'kotlin.math.max' call
    var a_0 = c >> 8 & 255;
    var b = c & 255;
    var b_0 = Math.max(a_0, b);
    return Math.max(a, b_0);
  }
  function amostrar($this, src, w, h, x, y) {
    var xc = coerceIn_1(x, 0.0, w - 1 | 0);
    var yc = coerceIn_1(y, 0.0, h - 1 | 0);
    var x0 = numberToInt(xc);
    var y0 = numberToInt(yc);
    // Inline function 'kotlin.math.min' call
    var a = x0 + 1 | 0;
    var b = w - 1 | 0;
    var x1 = Math.min(a, b);
    // Inline function 'kotlin.math.min' call
    var a_0 = y0 + 1 | 0;
    var b_0 = h - 1 | 0;
    var y1 = Math.min(a_0, b_0);
    var fx = xc - x0;
    var fy = yc - y0;
    var a_1 = src[imul(y0, w) + x0 | 0];
    var b_1 = src[imul(y0, w) + x1 | 0];
    var c = src[imul(y1, w) + x0 | 0];
    var d = src[imul(y1, w) + x1 | 0];
    return -16777216 | amostrar$canal(a_1, b_1, c, d, fx, fy, 16) << 16 | amostrar$canal(a_1, b_1, c, d, fx, fy, 8) << 8 | amostrar$canal(a_1, b_1, c, d, fx, fy, 0);
  }
  function amostrarBicubico($this, src, w, h, x, y) {
    var xc = coerceIn_1(x, 0.0, w - 1 | 0);
    var yc = coerceIn_1(y, 0.0, h - 1 | 0);
    var ix = numberToInt(xc);
    var iy = numberToInt(yc);
    var fx = xc - ix;
    var fy = yc - iy;
    var wx = amostrarBicubico$pesos(fx);
    var wy = amostrarBicubico$pesos(fy);
    var r = 0.0;
    var g = 0.0;
    var b = 0.0;
    var inductionVariable = 0;
    if (inductionVariable <= 3)
      do {
        var j = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var yy = coerceIn_0((iy - 1 | 0) + j | 0, 0, h - 1 | 0);
        var rr = 0.0;
        var gg = 0.0;
        var bb = 0.0;
        var inductionVariable_0 = 0;
        if (inductionVariable_0 <= 3)
          do {
            var i = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            var c = src[imul(yy, w) + coerceIn_0((ix - 1 | 0) + i | 0, 0, w - 1 | 0) | 0];
            rr = rr + wx[i] * (c >> 16 & 255);
            gg = gg + wx[i] * (c >> 8 & 255);
            bb = bb + wx[i] * (c & 255);
          }
           while (inductionVariable_0 <= 3);
        r = r + wy[j] * rr;
        g = g + wy[j] * gg;
        b = b + wy[j] * bb;
      }
       while (inductionVariable <= 3);
    return -16777216 | coerceIn_0(numberToInt(r + 0.5), 0, 255) << 16 | coerceIn_0(numberToInt(g + 0.5), 0, 255) << 8 | coerceIn_0(numberToInt(b + 0.5), 0, 255);
  }
  function redimensionar($this, img, nw, nh) {
    var sx = img.w_1 / nw;
    var sy = img.h_1 / nh;
    var out = new Int32Array(imul(nw, nh));
    var inductionVariable = 0;
    if (inductionVariable < nh)
      do {
        var y = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var inductionVariable_0 = 0;
        if (inductionVariable_0 < nw)
          do {
            var x = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            var cx = (x + 0.5) * sx - 0.5;
            var cy = (y + 0.5) * sy - 0.5;
            out[imul(y, nw) + x | 0] = amostrar($this, img.px_1, img.w_1, img.h_1, cx, cy);
          }
           while (inductionVariable_0 < nw);
      }
       while (inductionVariable < nh);
    return new Imagem(nw, nh, out);
  }
  function Cache(max) {
    this.max_1 = max;
    this.m_1 = LinkedHashMap_init_$Create$();
  }
  protoOf(Cache).obter_ub8zb8_k$ = function (chave, calc) {
    var tmp0_elvis_lhs = this.m_1.get_wei43m_k$(chave);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.also' call
      var this_0 = calc();
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'pt.decisaoessencial.digitalizador.Cache.obter.<anonymous>' call
      // Inline function 'kotlin.collections.set' call
      this.m_1.put_4fpzoq_k$(chave, this_0);
      if (this.m_1.get_size_woubt6_k$() > this.max_1) {
        this.m_1.remove_gppy8k_k$(first_1(this.m_1.get_keys_wop4xp_k$()));
      }
      tmp = this_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(Cache).limpar_y98ngf_k$ = function () {
    return this.m_1.clear_j9egeb_k$();
  };
  function Id(o, extra) {
    this.o_1 = o;
    this.extra_1 = extra;
  }
  protoOf(Id).get_o_1mhr5y_k$ = function () {
    return this.o_1;
  };
  protoOf(Id).get_extra_ir3qw7_k$ = function () {
    return this.extra_1;
  };
  protoOf(Id).equals = function (other) {
    var tmp;
    var tmp_0;
    if (other instanceof Id) {
      tmp_0 = other.o_1 === this.o_1;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = equals(other.extra_1, this.extra_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(Id).hashCode = function () {
    return imul(hashCode(this.o_1), 31) + hashCode(this.extra_1) | 0;
  };
  function _get_cReduzir__y429o1($this) {
    return $this.cReduzir_1;
  }
  function _get_cElementos__ijno2a($this) {
    return $this.cElementos_1;
  }
  function _get_cPapel__wdkvw8($this) {
    return $this.cPapel_1;
  }
  function esquecer($this) {
    $this.cReduzir_1.limpar_y98ngf_k$();
    $this.cElementos_1.limpar_y98ngf_k$();
    $this.cPapel_1.limpar_y98ngf_k$();
  }
  function reduzir($this, img, ladoMax) {
    // Inline function 'kotlin.math.max' call
    var a = img.w_1;
    var b = img.h_1;
    var longo = Math.max(a, b);
    if (longo <= ladoMax)
      return img;
    var f = ladoMax / longo;
    var tmp = new Id(img, 'l' + ladoMax);
    return $this.cReduzir_1.obter_ub8zb8_k$(tmp, CorrecaoPaginas$reduzir$lambda(img, f));
  }
  function reduzirAltura($this, img, alt) {
    if (img.h_1 <= alt)
      return img;
    var f = alt / img.h_1;
    var tmp = new Id(img, 'a' + alt);
    return $this.cReduzir_1.obter_ub8zb8_k$(tmp, CorrecaoPaginas$reduzirAltura$lambda(img, f, alt));
  }
  function somaJanela($this, v, w, h, rx, ry) {
    var tmp = new Int32Array(imul(w, h));
    var inductionVariable = 0;
    if (inductionVariable < h)
      do {
        var y = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var o = imul(y, w);
        var s = 0;
        var inductionVariable_0 = 0;
        // Inline function 'kotlin.math.min' call
        var b = w - 1 | 0;
        var last = Math.min(rx, b);
        if (inductionVariable_0 <= last)
          do {
            var x = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            s = s + v[o + x | 0] | 0;
          }
           while (!(x === last));
        var inductionVariable_1 = 0;
        if (inductionVariable_1 < w)
          do {
            var x_0 = inductionVariable_1;
            inductionVariable_1 = inductionVariable_1 + 1 | 0;
            tmp[o + x_0 | 0] = s;
            var ad = (x_0 + rx | 0) + 1 | 0;
            if (ad < w)
              s = s + v[o + ad | 0] | 0;
            var rm = x_0 - rx | 0;
            if (rm >= 0)
              s = s - v[o + rm | 0] | 0;
          }
           while (inductionVariable_1 < w);
      }
       while (inductionVariable < h);
    var out = new Int32Array(imul(w, h));
    var inductionVariable_2 = 0;
    if (inductionVariable_2 < w)
      do {
        var x_1 = inductionVariable_2;
        inductionVariable_2 = inductionVariable_2 + 1 | 0;
        var s_0 = 0;
        var inductionVariable_3 = 0;
        // Inline function 'kotlin.math.min' call
        var b_0 = h - 1 | 0;
        var last_0 = Math.min(ry, b_0);
        if (inductionVariable_3 <= last_0)
          do {
            var y_0 = inductionVariable_3;
            inductionVariable_3 = inductionVariable_3 + 1 | 0;
            s_0 = s_0 + tmp[imul(y_0, w) + x_1 | 0] | 0;
          }
           while (!(y_0 === last_0));
        var inductionVariable_4 = 0;
        if (inductionVariable_4 < h)
          do {
            var y_1 = inductionVariable_4;
            inductionVariable_4 = inductionVariable_4 + 1 | 0;
            out[imul(y_1, w) + x_1 | 0] = s_0;
            var ad_0 = (y_1 + ry | 0) + 1 | 0;
            if (ad_0 < h)
              s_0 = s_0 + tmp[imul(ad_0, w) + x_1 | 0] | 0;
            var rm_0 = y_1 - ry | 0;
            if (rm_0 >= 0)
              s_0 = s_0 - tmp[imul(rm_0, w) + x_1 | 0] | 0;
          }
           while (inductionVariable_4 < h);
      }
       while (inductionVariable_2 < w);
    return out;
  }
  function somaJanelaF($this, v, w, h, rx, ry) {
    var tmp = new Float32Array(imul(w, h));
    var inductionVariable = 0;
    if (inductionVariable < h)
      do {
        var y = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var o = imul(y, w);
        var s = 0.0;
        var inductionVariable_0 = 0;
        // Inline function 'kotlin.math.min' call
        var b = w - 1 | 0;
        var last = Math.min(rx, b);
        if (inductionVariable_0 <= last)
          do {
            var x = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            s = s + v[o + x | 0];
          }
           while (!(x === last));
        var inductionVariable_1 = 0;
        if (inductionVariable_1 < w)
          do {
            var x_0 = inductionVariable_1;
            inductionVariable_1 = inductionVariable_1 + 1 | 0;
            tmp[o + x_0 | 0] = s;
            var ad = (x_0 + rx | 0) + 1 | 0;
            if (ad < w)
              s = s + v[o + ad | 0];
            var rm = x_0 - rx | 0;
            if (rm >= 0)
              s = s - v[o + rm | 0];
          }
           while (inductionVariable_1 < w);
      }
       while (inductionVariable < h);
    var out = new Float32Array(imul(w, h));
    var inductionVariable_2 = 0;
    if (inductionVariable_2 < w)
      do {
        var x_1 = inductionVariable_2;
        inductionVariable_2 = inductionVariable_2 + 1 | 0;
        var s_0 = 0.0;
        var inductionVariable_3 = 0;
        // Inline function 'kotlin.math.min' call
        var b_0 = h - 1 | 0;
        var last_0 = Math.min(ry, b_0);
        if (inductionVariable_3 <= last_0)
          do {
            var y_0 = inductionVariable_3;
            inductionVariable_3 = inductionVariable_3 + 1 | 0;
            s_0 = s_0 + tmp[imul(y_0, w) + x_1 | 0];
          }
           while (!(y_0 === last_0));
        var inductionVariable_4 = 0;
        if (inductionVariable_4 < h)
          do {
            var y_1 = inductionVariable_4;
            inductionVariable_4 = inductionVariable_4 + 1 | 0;
            out[imul(y_1, w) + x_1 | 0] = s_0;
            var ad_0 = (y_1 + ry | 0) + 1 | 0;
            if (ad_0 < h)
              s_0 = s_0 + tmp[imul(ad_0, w) + x_1 | 0];
            var rm_0 = y_1 - ry | 0;
            if (rm_0 >= 0)
              s_0 = s_0 - tmp[imul(rm_0, w) + x_1 | 0];
          }
           while (inductionVariable_4 < h);
      }
       while (inductionVariable_2 < w);
    return out;
  }
  function area($this, x, y, w, h, rx, ry) {
    // Inline function 'kotlin.math.min' call
    var a = x + rx | 0;
    var b = w - 1 | 0;
    var tmp = Math.min(a, b);
    // Inline function 'kotlin.math.max' call
    var a_0 = x - rx | 0;
    var tmp_0 = (tmp - Math.max(a_0, 0) | 0) + 1 | 0;
    // Inline function 'kotlin.math.min' call
    var a_1 = y + ry | 0;
    var b_0 = h - 1 | 0;
    var tmp_1 = Math.min(a_1, b_0);
    // Inline function 'kotlin.math.max' call
    var a_2 = y - ry | 0;
    var tmp$ret$3 = Math.max(a_2, 0);
    return imul(tmp_0, (tmp_1 - tmp$ret$3 | 0) + 1 | 0);
  }
  function dilatar($this, m, w, h, rx, ry) {
    var s = somaJanela($this, m, w, h, rx, ry);
    var tmp = 0;
    var tmp_0 = imul(w, h);
    var tmp_1 = new Int32Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      tmp_1[tmp_2] = s[tmp_2] > 0 ? 1 : 0;
      tmp = tmp + 1 | 0;
    }
    return tmp_1;
  }
  function erodir($this, m, w, h, rx, ry) {
    var s = somaJanela($this, m, w, h, rx, ry);
    var tmp = 0;
    var tmp_0 = imul(w, h);
    var tmp_1 = new Int32Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      tmp_1[tmp_2] = s[tmp_2] === area(CorrecaoPaginas_getInstance(), tmp_2 % w | 0, tmp_2 / w | 0, w, h, rx, ry) ? 1 : 0;
      tmp = tmp + 1 | 0;
    }
    return tmp_1;
  }
  function fechar($this, m, w, h, rx, ry) {
    return erodir($this, dilatar($this, m, w, h, rx, ry), w, h, rx, ry);
  }
  function abrir($this, m, w, h, rx, ry) {
    return dilatar($this, erodir($this, m, w, h, rx, ry), w, h, rx, ry);
  }
  function mediaLocal($this, g, w, h, r) {
    var s = somaJanelaF($this, g, w, h, r, r);
    var tmp = 0;
    var tmp_0 = imul(w, h);
    var tmp_1 = new Float32Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      tmp_1[tmp_2] = s[tmp_2] / area(CorrecaoPaginas_getInstance(), tmp_2 % w | 0, tmp_2 / w | 0, w, h, r, r);
      tmp = tmp + 1 | 0;
    }
    return tmp_1;
  }
  function Comp(id, x0, y0, x1, y1, area) {
    this.id_1 = id;
    this.x0__1 = x0;
    this.y0__1 = y0;
    this.x1__1 = x1;
    this.y1__1 = y1;
    this.area_1 = area;
    this.sx_1 = new Long(0, 0);
    this.sy_1 = new Long(0, 0);
  }
  protoOf(Comp).get_id_kntnx8_k$ = function () {
    return this.id_1;
  };
  protoOf(Comp).set_x0_6ow0ct_k$ = function (_set____db54di) {
    this.x0__1 = _set____db54di;
  };
  protoOf(Comp).get_x0_kntnlr_k$ = function () {
    return this.x0__1;
  };
  protoOf(Comp).set_y0_mhs5ak_k$ = function (_set____db54di) {
    this.y0__1 = _set____db54di;
  };
  protoOf(Comp).get_y0_kntnkw_k$ = function () {
    return this.y0__1;
  };
  protoOf(Comp).set_x1_tgk55e_k$ = function (_set____db54di) {
    this.x1__1 = _set____db54di;
  };
  protoOf(Comp).get_x1_kntnlq_k$ = function () {
    return this.x1__1;
  };
  protoOf(Comp).set_y1_dno07n_k$ = function (_set____db54di) {
    this.y1__1 = _set____db54di;
  };
  protoOf(Comp).get_y1_kntnkv_k$ = function () {
    return this.y1__1;
  };
  protoOf(Comp).set_area_iw5mo2_k$ = function (_set____db54di) {
    this.area_1 = _set____db54di;
  };
  protoOf(Comp).get_area_woj07q_k$ = function () {
    return this.area_1;
  };
  protoOf(Comp).set_sx_hqy9w_k$ = function (_set____db54di) {
    this.sx_1 = _set____db54di;
  };
  protoOf(Comp).get_sx_kntno2_k$ = function () {
    return this.sx_1;
  };
  protoOf(Comp).set_sy_6ud6hn_k$ = function (_set____db54di) {
    this.sy_1 = _set____db54di;
  };
  protoOf(Comp).get_sy_kntno1_k$ = function () {
    return this.sy_1;
  };
  protoOf(Comp).get_cx_knto1u_k$ = function () {
    return this.sx_1.toDouble_ygsx0s_k$() / this.area_1;
  };
  protoOf(Comp).get_cy_knto1t_k$ = function () {
    return this.sy_1.toDouble_ygsx0s_k$() / this.area_1;
  };
  function componentes($this, m, w, h) {
    var lab = new Int32Array(imul(w, h));
    var fila = new Int32Array(imul(w, h));
    var comps = ArrayList_init_$Create$();
    var n = 0;
    var inductionVariable = 0;
    var last = imul(w, h);
    if (inductionVariable < last)
      $l$loop: do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (m[i] === 0 ? true : !(lab[i] === 0))
          continue $l$loop;
        n = n + 1 | 0;
        var c = new Comp(n, i % w | 0, i / w | 0, i % w | 0, i / w | 0, 0);
        var ini = 0;
        var fim = 0;
        var tmp2 = fim;
        fim = tmp2 + 1 | 0;
        fila[tmp2] = i;
        lab[i] = n;
        while (ini < fim) {
          var tmp3 = ini;
          ini = tmp3 + 1 | 0;
          var p = fila[tmp3];
          var x = p % w | 0;
          var y = p / w | 0;
          c.area_1 = c.area_1 + 1 | 0;
          var tmp = c;
          // Inline function 'kotlin.Long.plus' call
          tmp.sx_1 = c.sx_1.plus_r93sks_k$(toLong(x));
          var tmp_0 = c;
          // Inline function 'kotlin.Long.plus' call
          tmp_0.sy_1 = c.sy_1.plus_r93sks_k$(toLong(y));
          if (x < c.x0__1)
            c.x0__1 = x;
          if (x > c.x1__1)
            c.x1__1 = x;
          if (y < c.y0__1)
            c.y0__1 = y;
          if (y > c.y1__1)
            c.y1__1 = y;
          var inductionVariable_0 = -1;
          if (inductionVariable_0 <= 1)
            do {
              var dy = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0 + 1 | 0;
              var inductionVariable_1 = -1;
              if (inductionVariable_1 <= 1)
                $l$loop_0: do {
                  var dx = inductionVariable_1;
                  inductionVariable_1 = inductionVariable_1 + 1 | 0;
                  var nx = x + dx | 0;
                  var ny = y + dy | 0;
                  if (((nx < 0 ? true : ny < 0) ? true : nx >= w) ? true : ny >= h)
                    continue $l$loop_0;
                  var q = imul(ny, w) + nx | 0;
                  if (!(m[q] === 0) ? lab[q] === 0 : false) {
                    lab[q] = n;
                    var tmp10 = fim;
                    fim = tmp10 + 1 | 0;
                    fila[tmp10] = q;
                  }
                }
                 while (inductionVariable_1 <= 1);
            }
             while (inductionVariable_0 <= 1);
        }
        comps.add_utx5q5_k$(c);
      }
       while (inductionVariable < last);
    return to(lab, comps);
  }
  function _get_linear__ub5ny2($this) {
    return $this.linear_1;
  }
  function fLab($this, t) {
    var tmp;
    if (t > 0.008856) {
      // Inline function 'kotlin.math.cbrt' call
      tmp = Math.cbrt(t);
    } else {
      tmp = 7.787 * t + 0.13793103448275862;
    }
    return tmp;
  }
  function labLB($this, c, o) {
    var r = $this.linear_1[c >> 16 & 255];
    var g = $this.linear_1[c >> 8 & 255];
    var b = $this.linear_1[c & 255];
    var y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    var z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.089;
    var fy = fLab($this, y);
    o[0] = 116.0 * fy - 16.0;
    o[1] = 200.0 * (fy - fLab($this, z));
  }
  function mascaraPapel($this, img, soCor) {
    var tmp = new Id(img, soCor);
    return $this.cPapel_1.obter_ub8zb8_k$(tmp, CorrecaoPaginas$mascaraPapel$lambda(img, soCor));
  }
  function mascaraPapel$default($this, img, soCor, $super) {
    soCor = soCor === VOID ? false : soCor;
    return mascaraPapel($this, img, soCor);
  }
  function mascaraPapelCalc($this, img, soCor) {
    var w = img.w_1;
    var h = img.h_1;
    var lv = new Float32Array(imul(w, h));
    var bv = new Float32Array(imul(w, h));
    var o = new Float32Array(2);
    var inductionVariable = 0;
    var last = imul(w, h);
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        labLB($this, img.px_1[i], o);
        lv[i] = o[0];
        bv[i] = o[1];
      }
       while (inductionVariable < last);
    var bc = ArrayList_init_$Create$();
    var lc = ArrayList_init_$Create$();
    var progression = step(until(h / 3 | 0, imul(2, h) / 3 | 0), 3);
    var inductionVariable_0 = progression.first_1;
    var last_0 = progression.last_1;
    var step_0 = progression.step_1;
    if ((step_0 > 0 ? inductionVariable_0 <= last_0 : false) ? true : step_0 < 0 ? last_0 <= inductionVariable_0 : false)
      do {
        var y = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + step_0 | 0;
        var progression_0 = step(until(w / 4 | 0, imul(3, w) / 4 | 0), 3);
        var inductionVariable_1 = progression_0.first_1;
        var last_1 = progression_0.last_1;
        var step_1 = progression_0.step_1;
        if ((step_1 > 0 ? inductionVariable_1 <= last_1 : false) ? true : step_1 < 0 ? last_1 <= inductionVariable_1 : false)
          do {
            var x = inductionVariable_1;
            inductionVariable_1 = inductionVariable_1 + step_1 | 0;
            bc.add_utx5q5_k$(bv[imul(y, w) + x | 0]);
            lc.add_utx5q5_k$(lv[imul(y, w) + x | 0]);
          }
           while (!(x === last_1));
      }
       while (!(y === last_0));
    var bRef = mediana_0($this, toDoubleArray(bc));
    var lRef = percentil($this, toDoubleArray(lc), 90.0);
    var tmp = 0;
    var tmp_0 = imul(w, h);
    var tmp_1 = new Int32Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      tmp_1[tmp_2] = ((bv[tmp_2] < bRef + 4.5 ? soCor ? true : lv[tmp_2] > 0.72 * lRef : false) ? true : soCor ? lv[tmp_2] > 0.9 * lRef : false) ? 1 : 0;
      tmp = tmp + 1 | 0;
    }
    var m = tmp_1;
    // Inline function 'kotlin.math.max' call
    // Inline function 'kotlin.math.min' call
    var tmp$ret$1 = Math.min(w, h);
    var b = roundToInt(tmp$ret$1 / 400.0);
    var r1 = Math.max(1, b);
    // Inline function 'kotlin.math.max' call
    // Inline function 'kotlin.math.min' call
    var tmp$ret$3 = Math.min(w, h);
    var b_0 = roundToInt(tmp$ret$3 / 70.0);
    var r2 = Math.max(3, b_0);
    m = abrir($this, m, w, h, r1, r1);
    m = fechar($this, m, w, h, r2, r2);
    var tmp3_container = componentes($this, m, w, h);
    var lab = tmp3_container.component1_7eebsc_k$();
    var comps = tmp3_container.component2_7eebsb_k$();
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var destination = ArrayList_init_$Create$();
    var tmp0_iterator = comps.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.mascaraPapelCalc.<anonymous>' call
      if (element.area_1 > 0.05 * w * h) {
        destination.add_utx5q5_k$(element);
      }
    }
    // Inline function 'kotlin.collections.mapTo' call
    var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(destination, 10));
    var tmp0_iterator_0 = destination.iterator_jk1svi_k$();
    while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
      var item = tmp0_iterator_0.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.mascaraPapelCalc.<anonymous>' call
      var tmp$ret$8 = item.id_1;
      destination_0.add_utx5q5_k$(tmp$ret$8);
    }
    var manter = toHashSet(destination_0);
    var tmp_3 = 0;
    var tmp_4 = imul(w, h);
    var tmp_5 = new Int32Array(tmp_4);
    while (tmp_3 < tmp_4) {
      var tmp_6 = tmp_3;
      tmp_5[tmp_6] = manter.contains_aljjnj_k$(lab[tmp_6]) ? 1 : 0;
      tmp_3 = tmp_3 + 1 | 0;
    }
    return tmp_5;
  }
  function mediana_0($this, v) {
    return percentil($this, v, 50.0);
  }
  function percentil($this, v, p) {
    // Inline function 'kotlin.collections.isEmpty' call
    if (v.length === 0) {
      DoubleCompanionObject_getInstance();
      return NaN;
    }
    var s = sortedArray(v);
    var k = p / 100.0 * (s.length - 1 | 0);
    // Inline function 'kotlin.math.floor' call
    var tmp$ret$1 = Math.floor(k);
    var i = numberToInt(tmp$ret$1);
    // Inline function 'kotlin.math.min' call
    var a = i + 1 | 0;
    var b = s.length - 1 | 0;
    var j = Math.min(a, b);
    return s[i] + (s[j] - s[i]) * (k - i);
  }
  function Poli(c, centro, escala) {
    this.c_1 = c;
    this.centro_1 = centro;
    this.escala_1 = escala;
  }
  protoOf(Poli).v_w1w1cg_k$ = function (x) {
    var t = (x - this.centro_1) / this.escala_1;
    var r = 0.0;
    var inductionVariable = this.c_1.length - 1 | 0;
    if (0 <= inductionVariable)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + -1 | 0;
        r = r * t + this.c_1[i];
      }
       while (0 <= inductionVariable);
    return r;
  };
  function ajustar($this, xs, ys, grau) {
    var n = xs.length;
    // Inline function 'kotlin.math.min' call
    // Inline function 'kotlin.math.max' call
    var b = n - 1 | 0;
    var b_0 = Math.max(0, b);
    var g = Math.min(grau, b_0);
    var k = g + 1 | 0;
    var centro = average(xs);
    // Inline function 'kotlin.math.max' call
    // Inline function 'kotlin.collections.maxOf' call
    // Inline function 'kotlin.collections.isEmpty' call
    if (xs.length === 0)
      throw NoSuchElementException_init_$Create$();
    // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.ajustar.<anonymous>' call
    // Inline function 'kotlin.math.abs' call
    var x = xs[0] - centro;
    var maxValue = Math.abs(x);
    var inductionVariable = 1;
    var last = get_lastIndex_4(xs);
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.ajustar.<anonymous>' call
        // Inline function 'kotlin.math.abs' call
        var x_0 = xs[i] - centro;
        var v = Math.abs(x_0);
        // Inline function 'kotlin.comparisons.maxOf' call
        var a = maxValue;
        maxValue = Math.max(a, v);
      }
       while (!(i === last));
    var b_1 = maxValue;
    var escala = Math.max(1.0E-9, b_1);
    var tmp = 0;
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_0 = fillArrayVal(Array(k), null);
    while (tmp < k) {
      tmp_0[tmp] = new Float64Array(k);
      tmp = tmp + 1 | 0;
    }
    var a_0 = tmp_0;
    var b_2 = new Float64Array(k);
    var pot = new Float64Array(imul(2, k) - 1 | 0);
    var inductionVariable_0 = 0;
    if (inductionVariable_0 < n)
      do {
        var i_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        var t = (xs[i_0] - centro) / escala;
        pot[0] = 1.0;
        var inductionVariable_1 = 1;
        var last_0 = imul(2, k) - 1 | 0;
        if (inductionVariable_1 < last_0)
          do {
            var j = inductionVariable_1;
            inductionVariable_1 = inductionVariable_1 + 1 | 0;
            pot[j] = pot[j - 1 | 0] * t;
          }
           while (inductionVariable_1 < last_0);
        var inductionVariable_2 = 0;
        if (inductionVariable_2 < k)
          do {
            var r = inductionVariable_2;
            inductionVariable_2 = inductionVariable_2 + 1 | 0;
            b_2[r] = b_2[r] + pot[r] * ys[i_0];
            var inductionVariable_3 = 0;
            if (inductionVariable_3 < k)
              do {
                var s = inductionVariable_3;
                inductionVariable_3 = inductionVariable_3 + 1 | 0;
                var tmp6_array = a_0[r];
                tmp6_array[s] = tmp6_array[s] + pot[r + s | 0];
              }
               while (inductionVariable_3 < k);
          }
           while (inductionVariable_2 < k);
      }
       while (inductionVariable_0 < n);
    var inductionVariable_4 = 0;
    if (inductionVariable_4 < k)
      $l$loop: do {
        var col = inductionVariable_4;
        inductionVariable_4 = inductionVariable_4 + 1 | 0;
        var piv = col;
        var inductionVariable_5 = col + 1 | 0;
        if (inductionVariable_5 < k)
          do {
            var r_0 = inductionVariable_5;
            inductionVariable_5 = inductionVariable_5 + 1 | 0;
            // Inline function 'kotlin.math.abs' call
            var x_1 = a_0[r_0][col];
            var tmp_1 = Math.abs(x_1);
            // Inline function 'kotlin.math.abs' call
            var x_2 = a_0[piv][col];
            if (tmp_1 > Math.abs(x_2))
              piv = r_0;
          }
           while (inductionVariable_5 < k);
        var ta = a_0[col];
        a_0[col] = a_0[piv];
        a_0[piv] = ta;
        var tb = b_2[col];
        b_2[col] = b_2[piv];
        b_2[piv] = tb;
        // Inline function 'kotlin.math.abs' call
        var x_3 = a_0[col][col];
        if (Math.abs(x_3) < 1.0E-12)
          continue $l$loop;
        var inductionVariable_6 = col + 1 | 0;
        if (inductionVariable_6 < k)
          do {
            var r_1 = inductionVariable_6;
            inductionVariable_6 = inductionVariable_6 + 1 | 0;
            var f = a_0[r_1][col] / a_0[col][col];
            var inductionVariable_7 = col;
            if (inductionVariable_7 < k)
              do {
                var s_0 = inductionVariable_7;
                inductionVariable_7 = inductionVariable_7 + 1 | 0;
                var tmp12_array = a_0[r_1];
                tmp12_array[s_0] = tmp12_array[s_0] - f * a_0[col][s_0];
              }
               while (inductionVariable_7 < k);
            b_2[r_1] = b_2[r_1] - f * b_2[col];
          }
           while (inductionVariable_6 < k);
      }
       while (inductionVariable_4 < k);
    var sol = new Float64Array(k);
    var inductionVariable_8 = k - 1 | 0;
    if (0 <= inductionVariable_8)
      do {
        var r_2 = inductionVariable_8;
        inductionVariable_8 = inductionVariable_8 + -1 | 0;
        var s_1 = b_2[r_2];
        var inductionVariable_9 = r_2 + 1 | 0;
        if (inductionVariable_9 < k)
          do {
            var j_0 = inductionVariable_9;
            inductionVariable_9 = inductionVariable_9 + 1 | 0;
            s_1 = s_1 - a_0[r_2][j_0] * sol[j_0];
          }
           while (inductionVariable_9 < k);
        var tmp_2;
        // Inline function 'kotlin.math.abs' call
        var x_4 = a_0[r_2][r_2];
        if (Math.abs(x_4) < 1.0E-12) {
          tmp_2 = 0.0;
        } else {
          tmp_2 = s_1 / a_0[r_2][r_2];
        }
        sol[r_2] = tmp_2;
      }
       while (0 <= inductionVariable_8);
    return new Poli(sol, centro, escala);
  }
  function ajustarRobusto($this, xs, ys, grau, tolMin, fator) {
    var p = ajustar($this, xs, ys, grau);
    // Inline function 'kotlin.repeat' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    if (inductionVariable < 3)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.ajustarRobusto.<anonymous>' call
        var tmp = 0;
        var tmp_0 = xs.length;
        var tmp_1 = new Float64Array(tmp_0);
        while (tmp < tmp_0) {
          var tmp_2 = tmp;
          // Inline function 'kotlin.math.abs' call
          var x = p.v_w1w1cg_k$(xs[tmp_2]) - ys[tmp_2];
          tmp_1[tmp_2] = Math.abs(x);
          tmp = tmp + 1 | 0;
        }
        var r = tmp_1;
        // Inline function 'kotlin.math.max' call
        var b = fator * mediana_0(CorrecaoPaginas_getInstance(), r);
        var lim = Math.max(tolMin, b);
        // Inline function 'kotlin.collections.filter' call
        // Inline function 'kotlin.collections.filterTo' call
        var this_0 = get_indices_4(r);
        var destination = ArrayList_init_$Create$();
        var tmp0_iterator = this_0.iterator_jk1svi_k$();
        while (tmp0_iterator.hasNext_bitz1p_k$()) {
          var element = tmp0_iterator.next_20eer_k$();
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.ajustarRobusto.<anonymous>.<anonymous>' call
          if (r[element] <= lim) {
            destination.add_utx5q5_k$(element);
          }
        }
        var ok = destination;
        if (ok.get_size_woubt6_k$() >= (grau + 2 | 0)) {
          var tmp_3 = CorrecaoPaginas_getInstance();
          var tmp_4 = 0;
          var tmp_5 = ok.get_size_woubt6_k$();
          var tmp_6 = new Float64Array(tmp_5);
          while (tmp_4 < tmp_5) {
            var tmp_7 = tmp_4;
            tmp_6[tmp_7] = xs[ok.get_c1px32_k$(tmp_7)];
            tmp_4 = tmp_4 + 1 | 0;
          }
          var tmp_8 = 0;
          var tmp_9 = ok.get_size_woubt6_k$();
          var tmp_10 = new Float64Array(tmp_9);
          while (tmp_8 < tmp_9) {
            var tmp_11 = tmp_8;
            tmp_10[tmp_11] = ys[ok.get_c1px32_k$(tmp_11)];
            tmp_8 = tmp_8 + 1 | 0;
          }
          p = ajustar(tmp_3, tmp_6, tmp_10, grau);
        }
      }
       while (inductionVariable < 3);
    return p;
  }
  function ajustarRobusto$default($this, xs, ys, grau, tolMin, fator, $super) {
    fator = fator === VOID ? 2.5 : fator;
    return ajustarRobusto($this, xs, ys, grau, tolMin, fator);
  }
  function interp($this, x, xs, ys) {
    // Inline function 'kotlin.collections.isEmpty' call
    if (xs.length === 0)
      return 0.0;
    if (x <= xs[0])
      return ys[0];
    if (x >= xs[xs.length - 1 | 0])
      return ys[ys.length - 1 | 0];
    var lo = 0;
    var hi = xs.length - 1 | 0;
    while ((hi - lo | 0) > 1) {
      var m = (lo + hi | 0) / 2 | 0;
      if (xs[m] <= x)
        lo = m;
      else
        hi = m;
    }
    var tmp = x - xs[lo];
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.interp.<anonymous>' call
    var it = xs[hi] - xs[lo];
    var t = tmp / (it === 0.0 ? 1.0 : it);
    return ys[lo] + (ys[hi] - ys[lo]) * t;
  }
  function suavizar($this, v, sigma) {
    // Inline function 'kotlin.math.max' call
    var b = roundToInt(sigma);
    var r = Math.max(1, b);
    var a = v;
    // Inline function 'kotlin.repeat' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    if (inductionVariable < 3)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.suavizar.<anonymous>' call
        var b_0 = new Float64Array(a.length);
        var s = 0.0;
        var n = 0;
        var inductionVariable_0 = 0;
        // Inline function 'kotlin.math.min' call
        var b_1 = a.length - 1 | 0;
        var last = Math.min(r, b_1);
        if (inductionVariable_0 <= last)
          do {
            var i = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            s = s + a[i];
            n = n + 1 | 0;
          }
           while (!(i === last));
        var inductionVariable_1 = 0;
        var last_0 = a.length - 1 | 0;
        if (inductionVariable_1 <= last_0)
          do {
            var i_0 = inductionVariable_1;
            inductionVariable_1 = inductionVariable_1 + 1 | 0;
            b_0[i_0] = s / n;
            var ad = (i_0 + r | 0) + 1 | 0;
            if (ad < a.length) {
              s = s + a[ad];
              n = n + 1 | 0;
            }
            var rm = i_0 - r | 0;
            if (rm >= 0) {
              s = s - a[rm];
              n = n - 1 | 0;
            }
          }
           while (inductionVariable_1 <= last_0);
        a = b_0;
      }
       while (inductionVariable < 3);
    return a;
  }
  function Lado() {
  }
  function Pagina(esq, dir, lombadaADireita) {
    this.esq_1 = esq;
    this.dir_1 = dir;
    this.lombadaADireita_1 = lombadaADireita;
  }
  protoOf(Pagina).get_esq_18j6cm_k$ = function () {
    return this.esq_1;
  };
  protoOf(Pagina).get_dir_18j7bw_k$ = function () {
    return this.dir_1;
  };
  protoOf(Pagina).get_lombadaADireita_59i2nu_k$ = function () {
    return this.lombadaADireita_1;
  };
  function Geometria(top, bot, paginas, lombada) {
    Companion_getInstance_24();
    this.top_1 = top;
    this.bot_1 = bot;
    this.paginas_1 = paginas;
    this.lombada_1 = lombada;
  }
  protoOf(Geometria).get_top_18ivbo_k$ = function () {
    return this.top_1;
  };
  protoOf(Geometria).get_bot_18j8o2_k$ = function () {
    return this.bot_1;
  };
  protoOf(Geometria).get_paginas_c0s1fg_k$ = function () {
    return this.paginas_1;
  };
  protoOf(Geometria).get_lombada_70jm8t_k$ = function () {
    return this.lombada_1;
  };
  function planificarT($this, foto, g, p) {
    var top = g.top_1;
    var bot = g.bot_1;
    var wD = top.length;
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var this_0 = until(0, wD);
    var destination = ArrayList_init_$Create$();
    var tmp0_iterator = this_0.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.planificarT.<anonymous>' call
      if (top[element] >= 0.0 ? bot[element] > top[element] : false) {
        destination.add_utx5q5_k$(element);
      }
    }
    var validos = destination;
    if (validos.isEmpty_y1axqb_k$())
      return null;
    var tmp = 0;
    var tmp_0 = validos.get_size_woubt6_k$();
    var tmp_1 = new Float64Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      tmp_1[tmp_2] = (top[validos.get_c1px32_k$(tmp_2)] + bot[validos.get_c1px32_k$(tmp_2)]) / 2;
      tmp = tmp + 1 | 0;
    }
    var ymeio = mediana_0($this, tmp_1);
    var xa = coerceIn_0(numberToInt(p.esq_1.x_rqsusy_k$(ymeio) + 8), 0, wD - 1 | 0);
    var xb = coerceIn_0(numberToInt(p.dir_1.x_rqsusy_k$(ymeio) - 8), 0, wD - 1 | 0);
    if ((xb - xa | 0) < 50)
      return null;
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var this_1 = until(xa, xb);
    var destination_0 = ArrayList_init_$Create$();
    var tmp0_iterator_0 = this_1.iterator_jk1svi_k$();
    while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
      var element_0 = tmp0_iterator_0.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.planificarT.<anonymous>' call
      if (top[element_0] >= 0.0) {
        destination_0.add_utx5q5_k$(element_0);
      }
    }
    // Inline function 'kotlin.collections.mapTo' call
    var destination_1 = ArrayList_init_$Create$_0(collectionSizeOrDefault(destination_0, 10));
    var tmp0_iterator_1 = destination_0.iterator_jk1svi_k$();
    while (tmp0_iterator_1.hasNext_bitz1p_k$()) {
      var item = tmp0_iterator_1.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.planificarT.<anonymous>' call
      destination_1.add_utx5q5_k$(item);
    }
    var xs = toDoubleArray(destination_1);
    var tmp_3 = 0;
    var tmp_4 = xs.length;
    var tmp_5 = new Float64Array(tmp_4);
    while (tmp_3 < tmp_4) {
      var tmp_6 = tmp_3;
      tmp_5[tmp_6] = top[numberToInt(xs[tmp_6])];
      tmp_3 = tmp_3 + 1 | 0;
    }
    var pt = ajustarRobusto$default($this, xs, tmp_5, 4, 2.0);
    var tmp_7 = 0;
    var tmp_8 = xs.length;
    var tmp_9 = new Float64Array(tmp_8);
    while (tmp_7 < tmp_8) {
      var tmp_10 = tmp_7;
      tmp_9[tmp_10] = bot[numberToInt(xs[tmp_10])];
      tmp_7 = tmp_7 + 1 | 0;
    }
    var pb = ajustarRobusto$default($this, xs, tmp_9, 4, 2.0);
    var xtl = planificarT$canto(ymeio, p.esq_1, pt);
    var xtr = planificarT$canto(ymeio, p.dir_1, pt);
    var xbl = planificarT$canto(ymeio, p.esq_1, pb);
    var xbr = planificarT$canto(ymeio, p.dir_1, pb);
    var n = 2000;
    var ct = planificarT$curva(n, xtl, xtr, pt);
    var cb = planificarT$curva(n, xbl, xbr, pb);
    var wo = roundToInt((ct[3][0] + cb[3][0]) / 2);
    var tmp_11 = 0;
    var tmp_12 = new Float64Array(n);
    while (tmp_11 < n) {
      var tmp_13 = tmp_11;
      tmp_12[tmp_13] = cb[1][tmp_13] - ct[1][tmp_13];
      tmp_11 = tmp_11 + 1 | 0;
    }
    var ho = roundToInt(mediana_0($this, tmp_12));
    if (wo < 50 ? true : ho < 50)
      return null;
    var xt = new Float64Array(wo);
    var yt = new Float64Array(wo);
    var xbA = new Float64Array(wo);
    var ybA = new Float64Array(wo);
    var inductionVariable = 0;
    if (inductionVariable < wo)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var u = i / (wo - 1 | 0);
        xt[i] = interp($this, u, ct[2], ct[0]);
        yt[i] = interp($this, u, ct[2], ct[1]);
        xbA[i] = interp($this, u, cb[2], cb[0]);
        ybA[i] = interp($this, u, cb[2], cb[1]);
      }
       while (inductionVariable < wo);
    var t = new Transf(wo, ho, CorrecaoPaginas$planificarT$lambda(wo, ho, xt, yt, xbA, ybA));
    return to(renderizarTrabalho($this, foto, t), t);
  }
  function Elemento(xs, ys, x0, x1, tipo, altura) {
    altura = altura === VOID ? 0 : altura;
    this.xs_1 = xs;
    this.ys_1 = ys;
    this.x0__1 = x0;
    this.x1__1 = x1;
    this.tipo_1 = tipo;
    this.altura_1 = altura;
  }
  protoOf(Elemento).get_xs_kntnjw_k$ = function () {
    return this.xs_1;
  };
  protoOf(Elemento).get_ys_kntnj1_k$ = function () {
    return this.ys_1;
  };
  protoOf(Elemento).get_x0_kntnlr_k$ = function () {
    return this.x0__1;
  };
  protoOf(Elemento).get_x1_kntnlq_k$ = function () {
    return this.x1__1;
  };
  protoOf(Elemento).get_tipo_wouykd_k$ = function () {
    return this.tipo_1;
  };
  protoOf(Elemento).get_altura_b0jrxg_k$ = function () {
    return this.altura_1;
  };
  function amostrarComp($this, lab, w, c, passo) {
    var xs = ArrayList_init_$Create$();
    var ys = ArrayList_init_$Create$();
    var cx = c.x0__1;
    while (cx <= c.x1__1) {
      var mn = -1;
      var mx = -1;
      var inductionVariable = c.y0__1;
      var last = c.y1__1;
      if (inductionVariable <= last)
        do {
          var y = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (lab[imul(y, w) + cx | 0] === c.id_1) {
            if (mn < 0)
              mn = y;
            mx = y;
          }
        }
         while (!(y === last));
      if (mn >= 0) {
        xs.add_utx5q5_k$(cx);
        ys.add_utx5q5_k$((mn + mx | 0) / 2.0);
      }
      cx = cx + passo | 0;
    }
    return to(toDoubleArray(xs), toDoubleArray(ys));
  }
  function elementos($this, img, contraste) {
    var tmp = new Id(img, contraste);
    return $this.cElementos_1.obter_ub8zb8_k$(tmp, CorrecaoPaginas$elementos$lambda(img, contraste));
  }
  function elementos$default($this, img, contraste, $super) {
    contraste = contraste === VOID ? 12.0 : contraste;
    return elementos($this, img, contraste);
  }
  function elementosCalc($this, img, contraste) {
    var w = img.w_1;
    var h = img.h_1;
    var f = h / 1200.0;
    var tmp = 0;
    var tmp_0 = imul(w, h);
    var tmp_1 = new Float32Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      tmp_1[tmp_2] = cinz(CorrecaoPaginas_getInstance(), img.px_1[tmp_2]);
      tmp = tmp + 1 | 0;
    }
    var g = tmp_1;
    // Inline function 'kotlin.math.max' call
    var b = roundToInt(15 * f);
    var tmp$ret$1 = Math.max(5, b);
    var media = mediaLocal($this, g, w, h, tmp$ret$1);
    // Inline function 'kotlin.math.max' call
    var b_0 = roundToInt(8 * f);
    var bz = Math.max(2, b_0);
    var res = ArrayList_init_$Create$();
    var t2 = elementosCalc$limiar(w, h, bz, g, media, 8.0);
    var comp = numberToInt(0.08 * w);
    var lin = new Int32Array(imul(w, h));
    var inductionVariable = 0;
    if (inductionVariable < h)
      do {
        var y = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var x = 0;
        $l$loop: while (x < w) {
          if (t2[imul(y, w) + x | 0] === 0) {
            x = x + 1 | 0;
            continue $l$loop;
          }
          var e = x;
          while (e < w ? t2[imul(y, w) + e | 0] === 1 : false) {
            e = e + 1 | 0;
          }
          if ((e - x | 0) >= comp) {
            var inductionVariable_0 = x;
            var last = e;
            if (inductionVariable_0 < last)
              do {
                var k = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                lin[imul(y, w) + k | 0] = 1;
              }
               while (inductionVariable_0 < last);
          }
          x = e;
        }
      }
       while (inductionVariable < h);
    // Inline function 'kotlin.math.max' call
    var b_1 = roundToInt(20 * f);
    var tmp_3 = Math.max(3, b_1);
    // Inline function 'kotlin.math.max' call
    var b_2 = roundToInt(2 * f);
    var tmp$ret$4 = Math.max(1, b_2);
    var lin2 = fechar($this, lin, w, h, tmp_3, tmp$ret$4);
    var tmp4_container = componentes($this, lin2, w, h);
    var labF = tmp4_container.component1_7eebsc_k$();
    var compsF = tmp4_container.component2_7eebsb_k$();
    var tmp5_iterator = compsF.iterator_jk1svi_k$();
    $l$loop_1: while (tmp5_iterator.hasNext_bitz1p_k$()) {
      var c = tmp5_iterator.next_20eer_k$();
      var cw = (c.x1__1 - c.x0__1 | 0) + 1 | 0;
      var ch = (c.y1__1 - c.y0__1 | 0) + 1 | 0;
      if (cw < 0.3 * w ? true : ch > 12 * f)
        continue $l$loop_1;
      var tmp6_container = amostrarComp($this, labF, w, c, 5);
      var xs = tmp6_container.component1_7eebsc_k$();
      var ys = tmp6_container.component2_7eebsb_k$();
      if (xs.length < 6)
        continue $l$loop_1;
      var p = ajustar($this, xs, ys, 3);
      var tmp_4 = 0;
      var tmp_5 = xs.length;
      var tmp_6 = new Float64Array(tmp_5);
      while (tmp_4 < tmp_5) {
        var tmp_7 = tmp_4;
        tmp_6[tmp_7] = p.v_w1w1cg_k$(xs[tmp_7]);
        tmp_4 = tmp_4 + 1 | 0;
      }
      res.add_utx5q5_k$(new Elemento(xs, tmp_6, c.x0__1, c.x1__1, 2));
    }
    var t = elementosCalc$limiar(w, h, bz, g, media, contraste);
    // Inline function 'kotlin.math.max' call
    var b_3 = roundToInt(12 * f);
    var tmp_8 = Math.max(3, b_3);
    // Inline function 'kotlin.math.max' call
    var b_4 = roundToInt(2 * f);
    var tmp$ret$7 = Math.max(1, b_4);
    var blob = fechar($this, t, w, h, tmp_8, tmp$ret$7);
    var tmp7_container = componentes($this, blob, w, h);
    var lab = tmp7_container.component1_7eebsc_k$();
    var comps = tmp7_container.component2_7eebsb_k$();
    var tmp8_iterator = comps.iterator_jk1svi_k$();
    $l$loop_4: while (tmp8_iterator.hasNext_bitz1p_k$()) {
      var c_0 = tmp8_iterator.next_20eer_k$();
      var cw_0 = (c_0.x1__1 - c_0.x0__1 | 0) + 1 | 0;
      var ch_0 = (c_0.y1__1 - c_0.y0__1 | 0) + 1 | 0;
      var cabec = ((c_0.y0__1 < 0.12 * h ? cw_0 > 0.05 * w : false) ? ch_0 >= 6 * f : false) ? ch_0 <= 40 * f : false;
      var texto = (cw_0 > 0.12 * w ? ch_0 >= 8 * f : false) ? ch_0 <= 60 * f : false;
      if (!cabec ? !texto : false)
        continue $l$loop_4;
      // Inline function 'kotlin.math.max' call
      var b_5 = roundToInt(5 * f);
      var tmp$ret$8 = Math.max(3, b_5);
      var tmp9_container = amostrarComp($this, lab, w, c_0, tmp$ret$8);
      var xs_0 = tmp9_container.component1_7eebsc_k$();
      var ys_0 = tmp9_container.component2_7eebsb_k$();
      if (xs_0.length < 6)
        continue $l$loop_4;
      // Inline function 'kotlin.math.min' call
      // Inline function 'kotlin.math.max' call
      var b_6 = xs_0.length / 15 | 0;
      var b_7 = Math.max(1, b_6);
      var gr = Math.min(4, b_7);
      var p_0 = ajustar($this, xs_0, ys_0, gr);
      var tmp_9 = 0;
      var tmp_10 = xs_0.length;
      var tmp_11 = new Float64Array(tmp_10);
      while (tmp_9 < tmp_10) {
        var tmp_12 = tmp_9;
        // Inline function 'kotlin.math.abs' call
        var x_0 = p_0.v_w1w1cg_k$(xs_0[tmp_12]) - ys_0[tmp_12];
        tmp_11[tmp_12] = Math.abs(x_0);
        tmp_9 = tmp_9 + 1 | 0;
      }
      var r = tmp_11;
      // Inline function 'kotlin.math.max' call
      var a = 1.5 * f;
      var b_8 = 2.5 * mediana_0($this, r);
      var lim = Math.max(a, b_8);
      // Inline function 'kotlin.collections.filter' call
      // Inline function 'kotlin.collections.filterTo' call
      var this_0 = get_indices_4(r);
      var destination = ArrayList_init_$Create$();
      var tmp0_iterator = this_0.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.elementosCalc.<anonymous>' call
        if (r[element] < lim) {
          destination.add_utx5q5_k$(element);
        }
      }
      var ok = destination;
      if (ok.get_size_woubt6_k$() < 6)
        continue $l$loop_4;
      var tmp_13 = 0;
      var tmp_14 = ok.get_size_woubt6_k$();
      var tmp_15 = new Float64Array(tmp_14);
      while (tmp_13 < tmp_14) {
        var tmp_16 = tmp_13;
        tmp_15[tmp_16] = xs_0[ok.get_c1px32_k$(tmp_16)];
        tmp_13 = tmp_13 + 1 | 0;
      }
      var xo = tmp_15;
      var tmp_17 = 0;
      var tmp_18 = ok.get_size_woubt6_k$();
      var tmp_19 = new Float64Array(tmp_18);
      while (tmp_17 < tmp_18) {
        var tmp_20 = tmp_17;
        tmp_19[tmp_20] = ys_0[ok.get_c1px32_k$(tmp_20)];
        tmp_17 = tmp_17 + 1 | 0;
      }
      p_0 = ajustar($this, xo, tmp_19, gr);
      var tmp_21 = 0;
      var tmp_22 = xo.length;
      var tmp_23 = new Float64Array(tmp_22);
      while (tmp_21 < tmp_22) {
        var tmp_24 = tmp_21;
        tmp_23[tmp_24] = p_0.v_w1w1cg_k$(xo[tmp_24]);
        tmp_21 = tmp_21 + 1 | 0;
      }
      res.add_utx5q5_k$(new Elemento(xo, tmp_23, c_0.x0__1, c_0.x1__1, texto ? 0 : 1, ch_0));
    }
    return filtrarFundidas($this, res, lab, comps, w);
  }
  function filtrarFundidas($this, res, lab, comps, w) {
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var destination = ArrayList_init_$Create$();
    var tmp0_iterator = res.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.filtrarFundidas.<anonymous>' call
      if (element.tipo_1 === 0) {
        destination.add_utx5q5_k$(element);
      }
    }
    var texto = destination;
    if (texto.get_size_woubt6_k$() < 5)
      return res;
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(texto, 10));
    var tmp0_iterator_0 = texto.iterator_jk1svi_k$();
    while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
      var item = tmp0_iterator_0.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.filtrarFundidas.<anonymous>' call
      var tmp$ret$3 = item.altura_1;
      destination_0.add_utx5q5_k$(tmp$ret$3);
    }
    var alt = toDoubleArray(destination_0);
    var med = mediana_0($this, alt);
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var destination_1 = ArrayList_init_$Create$();
    var tmp0_iterator_1 = res.iterator_jk1svi_k$();
    while (tmp0_iterator_1.hasNext_bitz1p_k$()) {
      var element_0 = tmp0_iterator_1.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.filtrarFundidas.<anonymous>' call
      if (!(element_0.tipo_1 === 0) ? true : element_0.altura_1 <= 1.7 * med) {
        destination_1.add_utx5q5_k$(element_0);
      }
    }
    return destination_1;
  }
  function curvatura($this, e, f) {
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var destination = ArrayList_init_$Create$();
    var tmp0_iterator = e.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.curvatura.<anonymous>' call
      if (element.tipo_1 === 0) {
        destination.add_utx5q5_k$(element);
      }
    }
    var t = destination;
    if (t.get_size_woubt6_k$() < 3) {
      DoubleCompanionObject_getInstance();
      return NaN;
    }
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(t, 10));
    var tmp0_iterator_0 = t.iterator_jk1svi_k$();
    while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
      var item = tmp0_iterator_0.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.curvatura.<anonymous>' call
      var m = mediana_0(CorrecaoPaginas_getInstance(), item.ys_1);
      // Inline function 'kotlin.collections.maxOf' call
      var this_0 = item.ys_1;
      // Inline function 'kotlin.collections.isEmpty' call
      if (this_0.length === 0)
        throw NoSuchElementException_init_$Create$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.curvatura.<anonymous>.<anonymous>' call
      // Inline function 'kotlin.math.abs' call
      var x = this_0[0] - m;
      var maxValue = Math.abs(x);
      var inductionVariable = 1;
      var last = get_lastIndex_4(this_0);
      if (inductionVariable <= last)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.curvatura.<anonymous>.<anonymous>' call
          // Inline function 'kotlin.math.abs' call
          var x_0 = this_0[i] - m;
          var v = Math.abs(x_0);
          // Inline function 'kotlin.comparisons.maxOf' call
          var a = maxValue;
          maxValue = Math.max(a, v);
        }
         while (!(i === last));
      var tmp$ret$10 = maxValue;
      destination_0.add_utx5q5_k$(tmp$ret$10);
    }
    return average_0(destination_0) / f;
  }
  function Campo(w, h, passo, dgs, ei, ef, mi, mf) {
    this.w_1 = w;
    this.h_1 = h;
    this.passo_1 = passo;
    this.dgs_1 = dgs;
    this.ei_1 = ei;
    this.ef_1 = ef;
    this.mi_1 = mi;
    this.mf_1 = mf;
  }
  protoOf(Campo).get_w_1mhr66_k$ = function () {
    return this.w_1;
  };
  protoOf(Campo).get_h_1mhr5r_k$ = function () {
    return this.h_1;
  };
  protoOf(Campo).get_passo_iwqs0l_k$ = function () {
    return this.passo_1;
  };
  protoOf(Campo).get_dgs_18j7dl_k$ = function () {
    return this.dgs_1;
  };
  protoOf(Campo).get_ei_knto0j_k$ = function () {
    return this.ei_1;
  };
  protoOf(Campo).get_ef_knto0m_k$ = function () {
    return this.ef_1;
  };
  protoOf(Campo).get_mi_kntntn_k$ = function () {
    return this.mi_1;
  };
  protoOf(Campo).get_mf_kntntq_k$ = function () {
    return this.mf_1;
  };
  function campo($this, img) {
    var w = img.w_1;
    var h = img.h_1;
    var f = h / 1200.0;
    var e = elementos$default($this, img);
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlin.collections.count' call
      var tmp;
      if (isInterface(e, Collection)) {
        tmp = e.isEmpty_y1axqb_k$();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = 0;
        break $l$block;
      }
      var count = 0;
      var tmp0_iterator = e.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.campo.<anonymous>' call
        if (element.tipo_1 === 0) {
          count = count + 1 | 0;
          checkCountOverflow(count);
        }
      }
      tmp$ret$0 = count;
    }
    if (tmp$ret$0 < 3)
      return null;
    var passo = 5;
    var nc = ((w + passo | 0) - 1 | 0) / passo | 0;
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(e, 10));
    var tmp0_iterator_0 = e.iterator_jk1svi_k$();
    while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
      var item = tmp0_iterator_0.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.campo.<anonymous>' call
      var tmp$ret$2 = average(item.ys_1);
      destination.add_utx5q5_k$(tmp$ret$2);
    }
    var medias = destination;
    var tmp_0 = 0;
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_1 = fillArrayVal(Array(nc), null);
    while (tmp_0 < nc) {
      tmp_1[tmp_0] = new Float32Array(0);
      tmp_0 = tmp_0 + 1 | 0;
    }
    var dg = tmp_1;
    var valida = booleanArray(nc);
    var inductionVariable = 0;
    if (inductionVariable < nc)
      $l$loop: do {
        var j = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var x = imul(j, passo);
        var pts = ArrayList_init_$Create$();
        // Inline function 'kotlin.collections.forEachIndexed' call
        var index = 0;
        var tmp0_iterator_1 = e.iterator_jk1svi_k$();
        while (tmp0_iterator_1.hasNext_bitz1p_k$()) {
          var item_0 = tmp0_iterator_1.next_20eer_k$();
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.campo.<anonymous>' call
          var tmp1 = index;
          index = tmp1 + 1 | 0;
          var k = checkIndexOverflow(tmp1);
          if (x >= first(item_0.xs_1) ? x <= last(item_0.xs_1) : false) {
            var y = interp(CorrecaoPaginas_getInstance(), x, item_0.xs_1, item_0.ys_1);
            pts.add_utx5q5_k$(to(y, y - medias.get_c1px32_k$(k)));
          }
        }
        if (pts.isEmpty_y1axqb_k$())
          continue $l$loop;
        // Inline function 'kotlin.collections.sortBy' call
        if (pts.get_size_woubt6_k$() > 1) {
          // Inline function 'kotlin.comparisons.compareBy' call
          var tmp_2 = CorrecaoPaginas$campo$lambda;
          var tmp$ret$7 = new sam$kotlin_Comparator$0_4(tmp_2);
          sortWith(pts, tmp$ret$7);
        }
        var tmp_3 = 0;
        var tmp_4 = pts.get_size_woubt6_k$();
        var tmp_5 = new Float64Array(tmp_4);
        while (tmp_3 < tmp_4) {
          var tmp_6 = tmp_3;
          tmp_5[tmp_6] = pts.get_c1px32_k$(tmp_6).first_1;
          tmp_3 = tmp_3 + 1 | 0;
        }
        var py = tmp_5;
        var tmp_7 = 0;
        var tmp_8 = pts.get_size_woubt6_k$();
        var tmp_9 = new Float64Array(tmp_8);
        while (tmp_7 < tmp_8) {
          var tmp_10 = tmp_7;
          tmp_9[tmp_10] = pts.get_c1px32_k$(tmp_10).second_1;
          tmp_7 = tmp_7 + 1 | 0;
        }
        var pd = tmp_9;
        var tmp_11 = 0;
        var tmp_12 = new Float64Array(h);
        while (tmp_11 < h) {
          var tmp_13 = tmp_11;
          tmp_12[tmp_13] = interp(CorrecaoPaginas_getInstance(), tmp_13, py, pd);
          tmp_11 = tmp_11 + 1 | 0;
        }
        var col = tmp_12;
        col = suavizar($this, col, 12 * f);
        var tmp_14 = 0;
        var tmp_15 = new Float32Array(h);
        while (tmp_14 < h) {
          var tmp_16 = tmp_14;
          tmp_15[tmp_16] = coerceIn_1(col[tmp_16], -120 * f, 120 * f);
          tmp_14 = tmp_14 + 1 | 0;
        }
        dg[j] = tmp_15;
        valida[j] = true;
      }
       while (inductionVariable < nc);
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var this_0 = until(0, nc);
    var destination_0 = ArrayList_init_$Create$();
    var tmp0_iterator_2 = this_0.iterator_jk1svi_k$();
    while (tmp0_iterator_2.hasNext_bitz1p_k$()) {
      var element_0 = tmp0_iterator_2.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.campo.<anonymous>' call
      if (valida[element_0]) {
        destination_0.add_utx5q5_k$(element_0);
      }
    }
    var idx = destination_0;
    if (idx.isEmpty_y1axqb_k$())
      return null;
    var inductionVariable_0 = 0;
    if (inductionVariable_0 < nc)
      do {
        var j_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        if (!valida[j_0]) {
          var tmp$ret$15;
          $l$block_1: {
            // Inline function 'kotlin.collections.minByOrNull' call
            var iterator = idx.iterator_jk1svi_k$();
            if (!iterator.hasNext_bitz1p_k$()) {
              tmp$ret$15 = null;
              break $l$block_1;
            }
            var minElem = iterator.next_20eer_k$();
            if (!iterator.hasNext_bitz1p_k$()) {
              tmp$ret$15 = minElem;
              break $l$block_1;
            }
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.campo.<anonymous>' call
            var it = minElem;
            var minValue = abs_0(it - j_0 | 0);
            do {
              var e_0 = iterator.next_20eer_k$();
              // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.campo.<anonymous>' call
              var v = abs_0(e_0 - j_0 | 0);
              if (compareTo_0(minValue, v) > 0) {
                minElem = e_0;
                minValue = v;
              }
            }
             while (iterator.hasNext_bitz1p_k$());
            tmp$ret$15 = minElem;
          }
          dg[j_0] = dg[ensureNotNull(tmp$ret$15)];
        }
      }
       while (inductionVariable_0 < nc);
    var tmp_17 = 0;
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_18 = fillArrayVal(Array(nc), null);
    while (tmp_17 < nc) {
      tmp_18[tmp_17] = new Float32Array(h);
      tmp_17 = tmp_17 + 1 | 0;
    }
    var dgs = tmp_18;
    var inductionVariable_1 = 0;
    if (inductionVariable_1 < h)
      do {
        var y_0 = inductionVariable_1;
        inductionVariable_1 = inductionVariable_1 + 1 | 0;
        var tmp_19 = 0;
        var tmp_20 = new Float64Array(nc);
        while (tmp_19 < nc) {
          var tmp_21 = tmp_19;
          tmp_20[tmp_21] = dg[tmp_21][y_0];
          tmp_19 = tmp_19 + 1 | 0;
        }
        var linha = suavizar($this, tmp_20, 3.0);
        var inductionVariable_2 = 0;
        if (inductionVariable_2 < nc)
          do {
            var j_1 = inductionVariable_2;
            inductionVariable_2 = inductionVariable_2 + 1 | 0;
            dgs[j_1][y_0] = linha[j_1];
          }
           while (inductionVariable_2 < nc);
      }
       while (inductionVariable_1 < h);
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var destination_1 = ArrayList_init_$Create$();
    var tmp0_iterator_3 = e.iterator_jk1svi_k$();
    while (tmp0_iterator_3.hasNext_bitz1p_k$()) {
      var element_1 = tmp0_iterator_3.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.campo.<anonymous>' call
      if (element_1.tipo_1 === 0) {
        destination_1.add_utx5q5_k$(element_1);
      }
    }
    var txt = destination_1;
    var tmp_22 = 0;
    var tmp_23 = txt.get_size_woubt6_k$();
    var tmp_24 = new Float64Array(tmp_23);
    while (tmp_22 < tmp_23) {
      var tmp_25 = tmp_22;
      tmp_24[tmp_25] = txt.get_c1px32_k$(tmp_25).x0__1;
      tmp_22 = tmp_22 + 1 | 0;
    }
    var ini = tmp_24;
    var tmp_26 = 0;
    var tmp_27 = txt.get_size_woubt6_k$();
    var tmp_28 = new Float64Array(tmp_27);
    while (tmp_26 < tmp_27) {
      var tmp_29 = tmp_26;
      tmp_28[tmp_29] = txt.get_c1px32_k$(tmp_29).x1__1;
      tmp_26 = tmp_26 + 1 | 0;
    }
    var fim = tmp_28;
    var mi = mediana_0($this, ini);
    var p40 = percentil($this, fim, 40.0);
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var destination_2 = ArrayList_init_$Create$();
    var inductionVariable_3 = 0;
    var last_0 = fim.length;
    while (inductionVariable_3 < last_0) {
      var element_2 = fim[inductionVariable_3];
      inductionVariable_3 = inductionVariable_3 + 1 | 0;
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.campo.<anonymous>' call
      if (element_2 >= p40) {
        destination_2.add_utx5q5_k$(element_2);
      }
    }
    var mf = mediana_0($this, toDoubleArray(destination_2));
    var tmp$ret$29;
    $l$block_2: {
      // Inline function 'kotlin.collections.count' call
      var tmp_30;
      if (isInterface(txt, Collection)) {
        tmp_30 = txt.isEmpty_y1axqb_k$();
      } else {
        tmp_30 = false;
      }
      if (tmp_30) {
        tmp$ret$29 = 0;
        break $l$block_2;
      }
      var count_0 = 0;
      var tmp0_iterator_4 = txt.iterator_jk1svi_k$();
      while (tmp0_iterator_4.hasNext_bitz1p_k$()) {
        var element_3 = tmp0_iterator_4.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.campo.<anonymous>' call
        // Inline function 'kotlin.math.abs' call
        var x_0 = element_3.x0__1 - mi;
        if (Math.abs(x_0) < 12 * f) {
          count_0 = count_0 + 1 | 0;
          checkCountOverflow(count_0);
        }
      }
      tmp$ret$29 = count_0;
    }
    var fracIni = tmp$ret$29 / txt.get_size_woubt6_k$();
    var tmp$ret$32;
    $l$block_3: {
      // Inline function 'kotlin.collections.count' call
      var tmp_31;
      if (isInterface(txt, Collection)) {
        tmp_31 = txt.isEmpty_y1axqb_k$();
      } else {
        tmp_31 = false;
      }
      if (tmp_31) {
        tmp$ret$32 = 0;
        break $l$block_3;
      }
      var count_1 = 0;
      var tmp0_iterator_5 = txt.iterator_jk1svi_k$();
      while (tmp0_iterator_5.hasNext_bitz1p_k$()) {
        var element_4 = tmp0_iterator_5.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.campo.<anonymous>' call
        // Inline function 'kotlin.math.abs' call
        var x_1 = element_4.x1__1 - mf;
        if (Math.abs(x_1) < 12 * f) {
          count_1 = count_1 + 1 | 0;
          checkCountOverflow(count_1);
        }
      }
      tmp$ret$32 = count_1;
    }
    var fracFim = tmp$ret$32 / txt.get_size_woubt6_k$();
    var usarFim = (mf < w - 25 * f ? mf > mi + 20 : false) ? fracFim >= 0.4 : false;
    var usarIni = mi > 25 * f ? fracIni >= 0.5 : false;
    var tmp_32;
    if (usarIni) {
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.filter' call
      // Inline function 'kotlin.collections.filterTo' call
      var destination_3 = ArrayList_init_$Create$();
      var tmp0_iterator_6 = txt.iterator_jk1svi_k$();
      while (tmp0_iterator_6.hasNext_bitz1p_k$()) {
        var element_5 = tmp0_iterator_6.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.campo.<anonymous>' call
        // Inline function 'kotlin.math.abs' call
        var x_2 = element_5.x0__1 - mi;
        if (Math.abs(x_2) < 12 * f) {
          destination_3.add_utx5q5_k$(element_5);
        }
      }
      // Inline function 'kotlin.collections.mapTo' call
      var destination_4 = ArrayList_init_$Create$_0(collectionSizeOrDefault(destination_3, 10));
      var tmp0_iterator_7 = destination_3.iterator_jk1svi_k$();
      while (tmp0_iterator_7.hasNext_bitz1p_k$()) {
        var item_1 = tmp0_iterator_7.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.campo.<anonymous>' call
        var tmp$ret$39 = to(item_1, item_1.x0__1);
        destination_4.add_utx5q5_k$(tmp$ret$39);
      }
      tmp_32 = campo$perfil(h, f, destination_4, mi);
    } else {
      tmp_32 = new Float64Array(h);
    }
    var ei = tmp_32;
    var tmp_33;
    if (usarFim) {
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.filter' call
      // Inline function 'kotlin.collections.filterTo' call
      var destination_5 = ArrayList_init_$Create$();
      var tmp0_iterator_8 = txt.iterator_jk1svi_k$();
      while (tmp0_iterator_8.hasNext_bitz1p_k$()) {
        var element_6 = tmp0_iterator_8.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.campo.<anonymous>' call
        // Inline function 'kotlin.math.abs' call
        var x_3 = element_6.x1__1 - mf;
        if (Math.abs(x_3) < 12 * f) {
          destination_5.add_utx5q5_k$(element_6);
        }
      }
      // Inline function 'kotlin.collections.mapTo' call
      var destination_6 = ArrayList_init_$Create$_0(collectionSizeOrDefault(destination_5, 10));
      var tmp0_iterator_9 = destination_5.iterator_jk1svi_k$();
      while (tmp0_iterator_9.hasNext_bitz1p_k$()) {
        var item_2 = tmp0_iterator_9.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.campo.<anonymous>' call
        var tmp$ret$46 = to(item_2, item_2.x1__1);
        destination_6.add_utx5q5_k$(tmp$ret$46);
      }
      tmp_33 = campo$perfil(h, f, destination_6, mf);
    } else {
      tmp_33 = new Float64Array(h);
    }
    var ef = tmp_33;
    if (!usarFim)
      mf = w - 1 | 0;
    // Inline function 'kotlin.math.max' call
    var miS = Math.max(1.0, mi);
    // Inline function 'kotlin.math.min' call
    var a = w - 2 | 0;
    // Inline function 'kotlin.math.max' call
    var a_0 = miS + 1;
    var b = mf;
    var b_0 = Math.max(a_0, b);
    var mfS = Math.min(a, b_0);
    return new Campo(w, h, passo, dgs, ei, ef, miS, mfS);
  }
  function recortar($this, img, x0, y0, x1, y1) {
    var w = x1 - x0 | 0;
    var h = y1 - y0 | 0;
    var tmp = 0;
    var tmp_0 = imul(w, h);
    var tmp_1 = new Int32Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      tmp_1[tmp_2] = img.px_1[(imul(y0 + (tmp_2 / w | 0) | 0, img.w_1) + x0 | 0) + (tmp_2 % w | 0) | 0];
      tmp = tmp + 1 | 0;
    }
    return new Imagem(w, h, tmp_1);
  }
  function rodar90($this, img, horario) {
    var w = img.w_1;
    var h = img.h_1;
    var out = new Int32Array(imul(w, h));
    var inductionVariable = 0;
    if (inductionVariable < h)
      do {
        var y = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var inductionVariable_0 = 0;
        if (inductionVariable_0 < w)
          do {
            var x = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            var nx = horario ? (h - 1 | 0) - y | 0 : y;
            var ny = horario ? x : (w - 1 | 0) - x | 0;
            out[imul(ny, h) + nx | 0] = img.px_1[imul(y, w) + x | 0];
          }
           while (inductionVariable_0 < w);
      }
       while (inductionVariable < h);
    return new Imagem(h, w, out);
  }
  function rodar180($this, img) {
    return new Imagem(img.w_1, img.h_1, reversedArray(img.px_1));
  }
  function textoBinario($this, img, c) {
    var tmp = 0;
    var tmp_0 = imul(img.w_1, img.h_1);
    var tmp_1 = new Float32Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      tmp_1[tmp_2] = cinz(CorrecaoPaginas_getInstance(), img.px_1[tmp_2]);
      tmp = tmp + 1 | 0;
    }
    var g = tmp_1;
    var m = mediaLocal($this, g, img.w_1, img.h_1, 15);
    var tmp_3 = 0;
    var tmp_4 = imul(img.w_1, img.h_1);
    var tmp_5 = new Int32Array(tmp_4);
    while (tmp_3 < tmp_4) {
      var tmp_6 = tmp_3;
      tmp_5[tmp_6] = g[tmp_6] < m[tmp_6] - c ? 1 : 0;
      tmp_3 = tmp_3 + 1 | 0;
    }
    return tmp_5;
  }
  function caracteres($this, t, w, h) {
    var comps = componentes($this, t, w, h).component2_7eebsb_k$();
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var destination = ArrayList_init_$Create$();
    var tmp0_iterator = comps.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.caracteres.<anonymous>' call
      var cw = (element.x1__1 - element.x0__1 | 0) + 1 | 0;
      var ch = (element.y1__1 - element.y0__1 | 0) + 1 | 0;
      if ((element.area_1 > 8 ? 2 <= cw ? cw <= 39 : false : false) ? 2 <= ch ? ch <= 39 : false : false) {
        destination.add_utx5q5_k$(element);
      }
    }
    return destination;
  }
  function vizinhos($this, c, acao) {
    var cel = 30.0;
    var grelha = HashMap_init_$Create$_0();
    // Inline function 'kotlin.collections.forEachIndexed' call
    var index = 0;
    var tmp0_iterator = c.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var item = tmp0_iterator.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.vizinhos.<anonymous>' call
      var tmp1 = index;
      index = tmp1 + 1 | 0;
      var k = checkIndexOverflow(tmp1);
      // Inline function 'kotlin.collections.getOrPut' call
      var key = vizinhos$chave(numberToInt(item.get_cx_knto1u_k$() / cel), numberToInt(item.get_cy_knto1t_k$() / cel));
      var value = grelha.get_wei43m_k$(key);
      var tmp;
      if (value == null) {
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.vizinhos.<anonymous>.<anonymous>' call
        var answer = ArrayList_init_$Create$();
        grelha.put_4fpzoq_k$(key, answer);
        tmp = answer;
      } else {
        tmp = value;
      }
      tmp.add_utx5q5_k$(k);
    }
    var iterator = c.iterator_jk1svi_k$();
    var index_0 = 0;
    while (iterator.hasNext_bitz1p_k$()) {
      var k_0 = index_0;
      index_0 = index_0 + 1 | 0;
      var p = iterator.next_20eer_k$();
      var ci = numberToInt(p.get_cx_knto1u_k$() / cel);
      var cj = numberToInt(p.get_cy_knto1t_k$() / cel);
      var b1 = -1;
      DoubleCompanionObject_getInstance();
      var d1 = 1.7976931348623157E308;
      var b2 = -1;
      DoubleCompanionObject_getInstance();
      var d2 = 1.7976931348623157E308;
      var inductionVariable = -1;
      if (inductionVariable <= 1)
        do {
          var di = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var inductionVariable_0 = -1;
          if (inductionVariable_0 <= 1)
            $l$loop: do {
              var dj = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0 + 1 | 0;
              var tmp4_elvis_lhs = grelha.get_wei43m_k$(vizinhos$chave(ci + di | 0, cj + dj | 0));
              var tmp_0;
              if (tmp4_elvis_lhs == null) {
                continue $l$loop;
              } else {
                tmp_0 = tmp4_elvis_lhs;
              }
              var lista = tmp_0;
              var tmp5_iterator = lista.iterator_jk1svi_k$();
              $l$loop_0: while (tmp5_iterator.hasNext_bitz1p_k$()) {
                var q = tmp5_iterator.next_20eer_k$();
                if (q === k_0)
                  continue $l$loop_0;
                var dx = c.get_c1px32_k$(q).get_cx_knto1u_k$() - p.get_cx_knto1u_k$();
                var dy = c.get_c1px32_k$(q).get_cy_knto1t_k$() - p.get_cy_knto1t_k$();
                var d = dx * dx + dy * dy;
                if (d < d1) {
                  d2 = d1;
                  b2 = b1;
                  d1 = d;
                  b1 = q;
                } else if (d < d2) {
                  d2 = d;
                  b2 = q;
                }
              }
            }
             while (inductionVariable_0 <= 1);
        }
         while (inductionVariable <= 1);
      if (b1 >= 0 ? d1 < cel * cel : false)
        acao(p, c.get_c1px32_k$(b1));
      if (b2 >= 0 ? d2 < cel * cel : false)
        acao(p, c.get_c1px32_k$(b2));
    }
  }
  function votosLeitura($this, img) {
    var w = img.w_1;
    var h = img.h_1;
    var t = textoBinario($this, img, 15.0);
    var tmp0_container = componentes($this, fechar($this, t, w, h, 7, 0), w, h);
    var lab = tmp0_container.component1_7eebsc_k$();
    var comps = tmp0_container.component2_7eebsb_k$();
    var votos = 0;
    var tmp1_iterator = comps.iterator_jk1svi_k$();
    $l$loop: while (tmp1_iterator.hasNext_bitz1p_k$()) {
      var c = tmp1_iterator.next_20eer_k$();
      var cw = (c.x1__1 - c.x0__1 | 0) + 1 | 0;
      var ch = (c.y1__1 - c.y0__1 | 0) + 1 | 0;
      if ((cw < imul(3, ch) ? true : ch < 6) ? true : ch > 60)
        continue $l$loop;
      var x0 = c.x0__1;
      while ((x0 + 40 | 0) <= (c.x1__1 + 1 | 0)) {
        var perfil = new Int32Array(ch);
        var inductionVariable = 0;
        if (inductionVariable < ch)
          do {
            var y = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var inductionVariable_0 = x0;
            var last = x0 + 40 | 0;
            if (inductionVariable_0 < last)
              do {
                var x = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                var i = imul(c.y0__1 + y | 0, w) + x | 0;
                if (t[i] === 1 ? lab[i] === c.id_1 : false) {
                  perfil[y] = perfil[y] + 1 | 0;
                }
              }
               while (inductionVariable_0 < last);
          }
           while (inductionVariable < ch);
        var mx = max_2(perfil);
        if (mx >= 3) {
          // Inline function 'kotlin.collections.filter' call
          // Inline function 'kotlin.collections.filterTo' call
          var this_0 = get_indices_1(perfil);
          var destination = ArrayList_init_$Create$();
          var tmp0_iterator = this_0.iterator_jk1svi_k$();
          while (tmp0_iterator.hasNext_bitz1p_k$()) {
            var element = tmp0_iterator.next_20eer_k$();
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.votosLeitura.<anonymous>' call
            if (perfil[element] >= 0.5 * mx) {
              destination.add_utx5q5_k$(element);
            }
          }
          var nucleo = destination;
          // Inline function 'kotlin.collections.sumOf' call
          var sum = 0;
          var tmp0_iterator_0 = until(0, first_0(nucleo)).iterator_jk1svi_k$();
          while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
            var element_0 = tmp0_iterator_0.next_20eer_k$();
            var tmp = sum;
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.votosLeitura.<anonymous>' call
            sum = tmp + perfil[element_0] | 0;
          }
          var a = sum;
          // Inline function 'kotlin.collections.sumOf' call
          var sum_0 = 0;
          var tmp0_iterator_1 = until(last_0(nucleo) + 1 | 0, ch).iterator_jk1svi_k$();
          while (tmp0_iterator_1.hasNext_bitz1p_k$()) {
            var element_1 = tmp0_iterator_1.next_20eer_k$();
            var tmp_0 = sum_0;
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.votosLeitura.<anonymous>' call
            sum_0 = tmp_0 + perfil[element_1] | 0;
          }
          var b = sum_0;
          if (a > b) {
            votos = votos + 1 | 0;
          } else if (b > a) {
            votos = votos - 1 | 0;
          }
        }
        x0 = x0 + 40 | 0;
      }
    }
    return votos;
  }
  function orientacao($this, img) {
    return orientacaoComConfianca($this, img).first_1;
  }
  function orientacaoComConfianca($this, img) {
    var p = reduzir($this, img, 1400);
    var t = textoBinario($this, p, 15.0);
    var comps = componentes($this, t, p.w_1, p.h_1).component2_7eebsb_k$();
    // Inline function 'kotlin.math.max' call
    var b = (p.w_1 + p.h_1 | 0) / 900 | 0;
    var r = Math.max(2, b);
    var hor = orientacaoComConfianca$alongados(p, fechar($this, t, p.w_1, p.h_1, r, 0), true);
    var ver = orientacaoComConfianca$alongados(p, fechar($this, t, p.w_1, p.h_1, 0, r), false);
    var vertical = ((hor + ver | 0) >= 40 ? ver > 1.6 * hor : false) ? true : ((hor + ver | 0) >= 40 ? hor > 1.6 * ver : false) ? false : null;
    if (vertical === true) {
      var xa = p.w_1 / 4 | 0;
      var xb = imul(3, p.w_1) / 4 | 0;
      var ya = p.h_1 / 4 | 0;
      var yb = imul(3, p.h_1) / 4 | 0;
      var tmp$ret$1;
      $l$block: {
        // Inline function 'kotlin.collections.count' call
        var this_0 = step(until(ya, yb), 2);
        var tmp;
        if (isInterface(this_0, Collection)) {
          tmp = this_0.isEmpty_y1axqb_k$();
        } else {
          tmp = false;
        }
        if (tmp) {
          tmp$ret$1 = 0;
          break $l$block;
        }
        var count = 0;
        var tmp0_iterator = this_0.iterator_jk1svi_k$();
        while (tmp0_iterator.hasNext_bitz1p_k$()) {
          var element = tmp0_iterator.next_20eer_k$();
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.orientacaoComConfianca.<anonymous>' call
          var tmp_0 = xb - xa | 0;
          if (orientacaoComConfianca$maiorTroco(tmp_0, CorrecaoPaginas$orientacaoComConfianca$lambda(t, element, p, xa)) >= 0.3 * (xb - xa | 0)) {
            count = count + 1 | 0;
            checkCountOverflow(count);
          }
        }
        tmp$ret$1 = count;
      }
      var linhasH = tmp$ret$1;
      var tmp$ret$3;
      $l$block_0: {
        // Inline function 'kotlin.collections.count' call
        var this_1 = step(until(xa, xb), 2);
        var tmp_1;
        if (isInterface(this_1, Collection)) {
          tmp_1 = this_1.isEmpty_y1axqb_k$();
        } else {
          tmp_1 = false;
        }
        if (tmp_1) {
          tmp$ret$3 = 0;
          break $l$block_0;
        }
        var count_0 = 0;
        var tmp0_iterator_0 = this_1.iterator_jk1svi_k$();
        while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
          var element_0 = tmp0_iterator_0.next_20eer_k$();
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.orientacaoComConfianca.<anonymous>' call
          var tmp_2 = yb - ya | 0;
          if (orientacaoComConfianca$maiorTroco(tmp_2, CorrecaoPaginas$orientacaoComConfianca$lambda_0(t, ya, p, element_0)) >= 0.3 * (yb - ya | 0)) {
            count_0 = count_0 + 1 | 0;
            checkCountOverflow(count_0);
          }
        }
        tmp$ret$3 = count_0;
      }
      var linhasV = tmp$ret$3;
      if (linhasH >= 8 ? linhasH > imul(3, linhasV) : false)
        vertical = false;
    }
    if (vertical == null) {
      // Inline function 'kotlin.collections.filter' call
      // Inline function 'kotlin.collections.filterTo' call
      var destination = ArrayList_init_$Create$();
      var tmp0_iterator_1 = comps.iterator_jk1svi_k$();
      while (tmp0_iterator_1.hasNext_bitz1p_k$()) {
        var element_1 = tmp0_iterator_1.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.orientacaoComConfianca.<anonymous>' call
        var cw = (element_1.x1__1 - element_1.x0__1 | 0) + 1 | 0;
        var ch = (element_1.y1__1 - element_1.y0__1 | 0) + 1 | 0;
        if ((element_1.area_1 > 8 ? 2 <= cw ? cw <= 39 : false : false) ? 2 <= ch ? ch <= 39 : false : false) {
          destination.add_utx5q5_k$(element_1);
        }
      }
      var chars = destination;
      if (chars.get_size_woubt6_k$() < 20)
        return to(0, 0.0);
      var h2 = {_v: 0};
      var v2 = {_v: 0};
      vizinhos($this, chars, CorrecaoPaginas$orientacaoComConfianca$lambda_1(h2, v2));
      vertical = v2._v > 1.5 * h2._v ? v2._v >= 15 : false;
    }
    var tmp_3;
    if (vertical) {
      var rh = rodar90($this, p, true);
      var vl = votosLeitura($this, rh);
      var d = abs_0(vl) >= 30 ? imul(2, vl) : pontuacaoLeitura($this, rh) - pontuacaoLeitura($this, rodar90($this, p, false)) | 0;
      var tmp_4;
      if (abs_0(d) < 6) {
        tmp_4 = to(0, 0.0);
      } else {
        var tmp_5 = d >= 0 ? 1 : 2;
        // Inline function 'kotlin.math.min' call
        var b_0 = abs_0(d) / 60.0;
        var tmp$ret$8 = Math.min(1.0, b_0);
        tmp_4 = to(tmp_5, tmp$ret$8);
      }
      tmp_3 = tmp_4;
    } else {
      var v0 = pontuacaoLeitura($this, p);
      var v180 = pontuacaoLeitura($this, rodar180($this, p));
      var tmp_6;
      if ((v180 - v0 | 0) > 8) {
        // Inline function 'kotlin.math.min' call
        var b_1 = (v180 - v0 | 0) / 60.0;
        var tmp$ret$9 = Math.min(1.0, b_1);
        tmp_6 = to(3, tmp$ret$9);
      } else {
        // Inline function 'kotlin.math.min' call
        // Inline function 'kotlin.math.max' call
        var b_2 = (v0 - v180 | 0) + 10 | 0;
        var b_3 = Math.max(0, b_2) / 60.0;
        var tmp$ret$11 = Math.min(1.0, b_3);
        tmp_6 = to(0, tmp$ret$11);
      }
      tmp_3 = tmp_6;
    }
    return tmp_3;
  }
  function pontuacaoLeitura($this, img) {
    var v = votosLeitura($this, img);
    if (img.w_1 > 1.15 * img.h_1) {
      var m = img.w_1 / 2 | 0;
      return (v + paragrafos($this, recortar($this, img, 0, 0, m, img.h_1)) | 0) + paragrafos($this, recortar($this, img, m, 0, img.w_1, img.h_1)) | 0;
    }
    return v + paragrafos($this, img) | 0;
  }
  function paragrafos($this, img) {
    var v = 0;
    var q = reduzirAltura($this, img, 1200);
    // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
    var padrao = emptyList();
    var tmp;
    try {
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paragrafos.<anonymous>' call
      // Inline function 'kotlin.collections.filter' call
      // Inline function 'kotlin.collections.filterTo' call
      var this_0 = elementos(CorrecaoPaginas_getInstance(), q, 20.0);
      var destination = ArrayList_init_$Create$();
      var tmp0_iterator = this_0.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paragrafos.<anonymous>.<anonymous>' call
        if (element.tipo_1 === 0 ? element.xs_1.length >= 4 : false) {
          destination.add_utx5q5_k$(element);
        }
      }
      tmp = destination;
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Exception) {
        var e = $p;
        tmp_0 = padrao;
      } else {
        if ($p instanceof Error) {
          var e_0 = $p;
          tmp_0 = padrao;
        } else {
          throw $p;
        }
      }
      tmp = tmp_0;
    }
    var ls = tmp;
    if (ls.get_size_woubt6_k$() < 6)
      return v;
    var tmp_1 = 0;
    var tmp_2 = ls.get_size_woubt6_k$();
    var tmp_3 = new Float64Array(tmp_2);
    while (tmp_1 < tmp_2) {
      var tmp_4 = tmp_1;
      tmp_3[tmp_4] = ls.get_c1px32_k$(tmp_4).x0__1;
      tmp_1 = tmp_1 + 1 | 0;
    }
    var esq = percentil($this, tmp_3, 10.0);
    var tmp_5 = 0;
    var tmp_6 = ls.get_size_woubt6_k$();
    var tmp_7 = new Float64Array(tmp_6);
    while (tmp_5 < tmp_6) {
      var tmp_8 = tmp_5;
      tmp_7[tmp_8] = ls.get_c1px32_k$(tmp_8).x1__1;
      tmp_5 = tmp_5 + 1 | 0;
    }
    var dir = percentil($this, tmp_7, 90.0);
    var w = dir - esq;
    if (w < 0.2 * q.w_1)
      return v;
    var tmp$ret$7;
    $l$block: {
      // Inline function 'kotlin.collections.count' call
      var tmp_9;
      if (isInterface(ls, Collection)) {
        tmp_9 = ls.isEmpty_y1axqb_k$();
      } else {
        tmp_9 = false;
      }
      if (tmp_9) {
        tmp$ret$7 = 0;
        break $l$block;
      }
      var count = 0;
      var tmp0_iterator_0 = ls.iterator_jk1svi_k$();
      while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
        var element_0 = tmp0_iterator_0.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.paragrafos.<anonymous>' call
        if ((element_0.x1__1 - element_0.x0__1 | 0) > 0.85 * w) {
          count = count + 1 | 0;
          checkCountOverflow(count);
        }
      }
      tmp$ret$7 = count;
    }
    if (tmp$ret$7 < 0.5 * ls.get_size_woubt6_k$())
      return v;
    var dirOk = 0;
    var inv = 0;
    var tmp0_iterator_1 = ls.iterator_jk1svi_k$();
    $l$loop: while (tmp0_iterator_1.hasNext_bitz1p_k$()) {
      var e_1 = tmp0_iterator_1.next_20eer_k$();
      if ((e_1.x1__1 - e_1.x0__1 | 0) > 0.85 * w)
        continue $l$loop;
      if (e_1.x0__1 < esq + 0.04 * w ? e_1.x1__1 < dir - 0.15 * w : false) {
        dirOk = dirOk + 1 | 0;
      }
      if (e_1.x1__1 > dir - 0.04 * w ? e_1.x0__1 > esq + 0.15 * w : false) {
        inv = inv + 1 | 0;
      }
    }
    return v + imul(3, dirOk - inv | 0) | 0;
  }
  function Lombada(x, forca, tintaVizinha) {
    this.x_1 = x;
    this.forca_1 = forca;
    this.tintaVizinha_1 = tintaVizinha;
  }
  protoOf(Lombada).get_x_1mhr67_k$ = function () {
    return this.x_1;
  };
  protoOf(Lombada).get_forca_irhqri_k$ = function () {
    return this.forca_1;
  };
  protoOf(Lombada).get_tintaVizinha_qd2dw8_k$ = function () {
    return this.tintaVizinha_1;
  };
  function lombadaPelaLuz($this, img) {
    var p = reduzir($this, img, 1400);
    var w = p.w_1;
    var h = p.h_1;
    if (w < 200)
      return null;
    var t = textoBinario($this, p, 15.0);
    var y0 = numberToInt(0.25 * h);
    var y1 = numberToInt(0.75 * h);
    var tinta = new Float64Array(w);
    var col = new Float64Array(w);
    var inductionVariable = 0;
    if (inductionVariable < w)
      do {
        var x = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var s = 0;
        var b = 0.0;
        var inductionVariable_0 = y0;
        if (inductionVariable_0 < y1)
          do {
            var y = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            s = s + t[imul(y, w) + x | 0] | 0;
            b = b + cinz($this, p.px_1[imul(y, w) + x | 0]);
          }
           while (inductionVariable_0 < y1);
        tinta[x] = s / (y1 - y0 | 0);
        col[x] = b / (y1 - y0 | 0);
      }
       while (inductionVariable < w);
    var tmp = 0;
    var tmp_0 = new Float64Array(w);
    while (tmp < w) {
      var tmp_1 = tmp;
      var s_0 = 0.0;
      var n = 0;
      // Inline function 'kotlin.math.max' call
      var b_0 = tmp_1 - 1 | 0;
      var inductionVariable_1 = Math.max(0, b_0);
      // Inline function 'kotlin.math.min' call
      var a = w - 1 | 0;
      var b_1 = tmp_1 + 1 | 0;
      var last = Math.min(a, b_1);
      if (inductionVariable_1 <= last)
        do {
          var k = inductionVariable_1;
          inductionVariable_1 = inductionVariable_1 + 1 | 0;
          s_0 = s_0 + col[k];
          n = n + 1 | 0;
        }
         while (!(k === last));
      tmp_0[tmp_1] = s_0 / n;
      tmp = tmp + 1 | 0;
    }
    var bri = tmp_0;
    var pm = mascaraPapel($this, p, true);
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var this_0 = until(0, w);
    var destination = ArrayList_init_$Create$();
    var tmp0_iterator = this_0.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.lombadaPelaLuz.<anonymous>' call
      var c = 0;
      var progression = step(until(y0, y1), 4);
      var inductionVariable_2 = progression.first_1;
      var last_1 = progression.last_1;
      var step_0 = progression.step_1;
      if ((step_0 > 0 ? inductionVariable_2 <= last_1 : false) ? true : step_0 < 0 ? last_1 <= inductionVariable_2 : false)
        do {
          var y_0 = inductionVariable_2;
          inductionVariable_2 = inductionVariable_2 + step_0 | 0;
          c = c + pm[imul(y_0, w) + element | 0] | 0;
        }
         while (!(y_0 === last_1));
      if (c > 0.5 * (y1 - y0 | 0) / 4) {
        destination.add_utx5q5_k$(element);
      }
    }
    var colPapel = destination;
    var tmp2_container = colPapel.get_size_woubt6_k$() > 0.3 * w ? to(first_0(colPapel), last_0(colPapel)) : to(0, w - 1 | 0);
    var lx0 = tmp2_container.component1_7eebsc_k$();
    var lx1 = tmp2_container.component2_7eebsb_k$();
    var a_0 = lx0 + numberToInt(0.38 * (lx1 - lx0 | 0)) | 0;
    var b_2 = lx0 + numberToInt(0.62 * (lx1 - lx0 | 0)) | 0;
    var melhor = -1;
    var mx = 0.0;
    // Inline function 'kotlin.math.max' call
    var inductionVariable_3 = Math.max(a_0, 10);
    // Inline function 'kotlin.math.min' call
    var b_3 = w - 10 | 0;
    var last_2 = Math.min(b_2, b_3);
    if (inductionVariable_3 < last_2)
      do {
        var x_0 = inductionVariable_3;
        inductionVariable_3 = inductionVariable_3 + 1 | 0;
        var sc = 0.0;
        // Inline function 'kotlin.intArrayOf' call
        var indexedObject = new Int32Array([3, 6, 10]);
        var inductionVariable_4 = 0;
        var last_3 = indexedObject.length;
        while (inductionVariable_4 < last_3) {
          var k_0 = indexedObject[inductionVariable_4];
          inductionVariable_4 = inductionVariable_4 + 1 | 0;
          // Inline function 'kotlin.math.max' call
          var a_1 = sc;
          // Inline function 'kotlin.math.abs' call
          var x_1 = bri[x_0 + k_0 | 0] - bri[x_0 - k_0 | 0];
          var b_4 = Math.abs(x_1) * 0.5;
          sc = Math.max(a_1, b_4);
          // Inline function 'kotlin.math.max' call
          var a_2 = sc;
          var b_5 = (bri[x_0 - k_0 | 0] + bri[x_0 + k_0 | 0]) / 2 - bri[x_0];
          sc = Math.max(a_2, b_5);
        }
        var tl = 0.0;
        // Inline function 'kotlin.math.max' call
        var b_6 = x_0 - 3 | 0;
        var inductionVariable_5 = Math.max(0, b_6);
        // Inline function 'kotlin.math.min' call
        var a_3 = w - 1 | 0;
        var b_7 = x_0 + 3 | 0;
        var last_4 = Math.min(a_3, b_7);
        if (inductionVariable_5 <= last_4)
          do {
            var k_1 = inductionVariable_5;
            inductionVariable_5 = inductionVariable_5 + 1 | 0;
            tl = tl + tinta[k_1];
          }
           while (!(k_1 === last_4));
        tl = tl / 7;
        var centro = (lx0 + lx1 | 0) / 2.0;
        // Inline function 'kotlin.math.max' call
        var b_8 = (lx1 - lx0 | 0) / 2.0;
        var meia = Math.max(1.0, b_8);
        var tmp_2 = sc;
        // Inline function 'kotlin.math.min' call
        var b_9 = tl * 5;
        var tmp_3 = 1 - Math.min(1.0, b_9);
        // Inline function 'kotlin.math.abs' call
        var x_2 = x_0 - centro;
        sc = tmp_2 * (tmp_3 * (1 - 0.5 * Math.abs(x_2) / meia));
        if (sc > mx) {
          mx = sc;
          melhor = x_0;
        }
      }
       while (inductionVariable_3 < last_2);
    // Inline function 'kotlin.run' call
    // Inline function 'kotlin.contracts.contract' call
    var limite = 0.012;
    var melhorFaixa = null;
    DoubleCompanionObject_getInstance();
    var melhorDist = 1.7976931348623157E308;
    // Inline function 'kotlin.math.max' call
    var x_3 = Math.max(a_0, 10);
    $l$loop_0: while (true) {
      var tmp_4 = x_3;
      // Inline function 'kotlin.math.min' call
      var b_10 = w - 10 | 0;
      if (!(tmp_4 < Math.min(b_2, b_10))) {
        break $l$loop_0;
      }
      if (tinta[x_3] > limite) {
        x_3 = x_3 + 1 | 0;
        continue $l$loop_0;
      }
      // Inline function 'kotlin.math.max' call
      var b_11 = numberToInt(0.012 * (lx1 - lx0 | 0));
      var falhaMax = Math.max(3, b_11);
      var f = x_3;
      $l$loop_1: while (true) {
        while ((f + 1 | 0) < w ? tinta[f + 1 | 0] <= limite : false) {
          f = f + 1 | 0;
        }
        var g = f + 1 | 0;
        while ((g < w ? tinta[g] > limite : false) ? (g - f | 0) <= falhaMax : false) {
          g = g + 1 | 0;
        }
        if ((g < w ? (g - f | 0) <= falhaMax : false) ? tinta[g] <= limite : false)
          f = g;
        else
          break $l$loop_1;
      }
      var larg = (f - x_3 | 0) + 1 | 0;
      var centroF = (x_3 + f | 0) / 2.0;
      var centroL = (lx0 + lx1 | 0) / 2.0;
      var tmp_5;
      // Inline function 'kotlin.math.max' call
      var b_12 = numberToInt(0.008 * (lx1 - lx0 | 0));
      if (larg >= Math.max(3, b_12)) {
        // Inline function 'kotlin.math.abs' call
        var x_4 = centroF - centroL;
        tmp_5 = Math.abs(x_4) < melhorDist;
      } else {
        tmp_5 = false;
      }
      if (tmp_5) {
        // Inline function 'kotlin.math.abs' call
        var x_5 = centroF - centroL;
        melhorDist = Math.abs(x_5);
        // Inline function 'kotlin.intArrayOf' call
        melhorFaixa = new Int32Array([x_3, f]);
      }
      x_3 = f + 1 | 0;
    }
    var fx = melhorFaixa;
    var tmp_6;
    if (!(fx == null)) {
      // Inline function 'kotlin.math.max' call
      var b_13 = numberToInt(0.012 * (lx1 - lx0 | 0));
      var falha = Math.max(3, b_13);
      // Inline function 'kotlin.math.max' call
      var b_14 = fx[0] - falha | 0;
      var ini = Math.max(10, b_14);
      // Inline function 'kotlin.math.min' call
      var a_4 = w - 11 | 0;
      var b_15 = fx[1] + falha | 0;
      var fim = Math.min(a_4, b_15);
      var larguraRel = ((fx[1] - fx[0] | 0) + 1 | 0) / (lx1 - lx0 | 0);
      var tmp_7;
      if (ini <= melhor ? melhor <= fim : false) {
        // Inline function 'kotlin.math.max' call
        var a_5 = mx;
        var b_16 = 8.0 + 200 * larguraRel;
        mx = Math.max(a_5, b_16);
        tmp_7 = Unit_getInstance();
      } else {
        var mxF = -1.0;
        var xF = (fx[0] + fx[1] | 0) / 2 | 0;
        var inductionVariable_6 = ini;
        if (inductionVariable_6 <= fim)
          do {
            var xx = inductionVariable_6;
            inductionVariable_6 = inductionVariable_6 + 1 | 0;
            var sc_0 = 0.0;
            // Inline function 'kotlin.intArrayOf' call
            var indexedObject_0 = new Int32Array([3, 6, 10]);
            var inductionVariable_7 = 0;
            var last_5 = indexedObject_0.length;
            while (inductionVariable_7 < last_5) {
              var k_2 = indexedObject_0[inductionVariable_7];
              inductionVariable_7 = inductionVariable_7 + 1 | 0;
              // Inline function 'kotlin.math.max' call
              var a_6 = sc_0;
              var b_17 = (bri[xx - k_2 | 0] + bri[xx + k_2 | 0]) / 2 - bri[xx];
              sc_0 = Math.max(a_6, b_17);
            }
            if (sc_0 > mxF) {
              mxF = sc_0;
              xF = xx;
            }
          }
           while (!(xx === fim));
        if (mxF < 2.0)
          xF = (fx[0] + fx[1] | 0) / 2 | 0;
        melhor = xF;
        // Inline function 'kotlin.math.max' call
        var a_7 = mxF;
        var b_18 = 8.0 + 200 * larguraRel;
        mx = Math.max(a_7, b_18);
        tmp_7 = Unit_getInstance();
      }
      tmp_6 = tmp_7;
    }
    if (melhor < 0)
      return null;
    // Inline function 'kotlin.math.max' call
    var b_19 = roundToInt(0.015 * w);
    var viz = Math.max(2, b_19);
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.math.max' call
    var b_20 = melhor - viz | 0;
    var tmp_8 = Math.max(0, b_20);
    // Inline function 'kotlin.math.min' call
    var a_8 = w - 1 | 0;
    var b_21 = melhor + viz | 0;
    var tmp$ret$34 = Math.min(a_8, b_21);
    var this_1 = numberRangeToNumber(tmp_8, tmp$ret$34);
    // Inline function 'kotlin.collections.mapTo' call
    var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_1, 10));
    var tmp0_iterator_0 = this_1.iterator_jk1svi_k$();
    while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
      var item = tmp0_iterator_0.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.lombadaPelaLuz.<anonymous>' call
      var tmp$ret$35 = tinta[item];
      destination_0.add_utx5q5_k$(tmp$ret$35);
    }
    var tv = average_0(destination_0);
    return new Lombada(melhor * img.w_1 / w, mx, tv);
  }
  function anguloInclinacao($this, img) {
    var p = reduzir($this, img, 1400);
    var chars = caracteres($this, textoBinario($this, p, 15.0), p.w_1, p.h_1);
    if (chars.get_size_woubt6_k$() < 30)
      return 0.0;
    var ang = ArrayList_init_$Create$();
    vizinhos($this, chars, CorrecaoPaginas$anguloInclinacao$lambda(ang));
    if (ang.get_size_woubt6_k$() < 20)
      return 0.0;
    var graus = mediana_0($this, toDoubleArray(ang));
    var tmp;
    var tmp_0;
    // Inline function 'kotlin.math.abs' call
    if (Math.abs(graus) < 0.3) {
      tmp_0 = true;
    } else {
      // Inline function 'kotlin.math.abs' call
      tmp_0 = Math.abs(graus) > 25.0;
    }
    if (tmp_0) {
      tmp = 0.0;
    } else {
      tmp = graus;
    }
    return tmp;
  }
  function limparMargens($this, img) {
    var p = reduzir($this, img, 1000);
    var w = p.w_1;
    var h = p.h_1;
    var t = textoBinario($this, p, 15.0);
    var comps = componentes($this, t, w, h).component2_7eebsb_k$();
    // Inline function 'kotlin.math.max' call
    var b = numberToInt(0.01 * w);
    var bx = Math.max(2, b);
    // Inline function 'kotlin.math.max' call
    var b_0 = numberToInt(0.01 * h);
    var by = Math.max(2, b_0);
    var xs = ArrayList_init_$Create$();
    var ys = ArrayList_init_$Create$();
    var fx0 = w;
    var fy0 = h;
    var fx1 = -1;
    var fy1 = -1;
    var tmp1_iterator = comps.iterator_jk1svi_k$();
    $l$loop: while (tmp1_iterator.hasNext_bitz1p_k$()) {
      var c = tmp1_iterator.next_20eer_k$();
      var cw = (c.x1__1 - c.x0__1 | 0) + 1 | 0;
      var ch = (c.y1__1 - c.y0__1 | 0) + 1 | 0;
      var longeBordo = ((c.x0__1 > bx ? c.y0__1 > by : false) ? c.x1__1 < ((w - 1 | 0) - bx | 0) : false) ? c.y1__1 < ((h - 1 | 0) - by | 0) : false;
      if (((((c.area_1 >= 6 ? 3 <= ch ? ch <= numberToInt(0.12 * h) : false : false) ? cw >= 2 : false) ? cw <= imul(6, ch) : false) ? ch <= imul(5, cw) : false) ? c.area_1 >= 0.15 * cw * ch : false) {
        xs.add_utx5q5_k$(c.x0__1);
        xs.add_utx5q5_k$(c.x1__1);
        ys.add_utx5q5_k$(c.y0__1);
        ys.add_utx5q5_k$(c.y1__1);
        continue $l$loop;
      }
      var tmp;
      if (longeBordo ? c.area_1 >= 3.0E-4 * w * h : false) {
        // Inline function 'kotlin.math.min' call
        var tmp_0 = Math.min(cw, ch);
        // Inline function 'kotlin.math.min' call
        tmp = tmp_0 >= 0.006 * Math.min(w, h);
      } else {
        tmp = false;
      }
      if (tmp) {
        // Inline function 'kotlin.math.min' call
        var a = fx0;
        var b_1 = c.x0__1;
        fx0 = Math.min(a, b_1);
        // Inline function 'kotlin.math.min' call
        var a_0 = fy0;
        var b_2 = c.y0__1;
        fy0 = Math.min(a_0, b_2);
        // Inline function 'kotlin.math.max' call
        var a_1 = fx1;
        var b_3 = c.x1__1;
        fx1 = Math.max(a_1, b_3);
        // Inline function 'kotlin.math.max' call
        var a_2 = fy1;
        var b_4 = c.y1__1;
        fy1 = Math.max(a_2, b_4);
      }
    }
    if (xs.get_size_woubt6_k$() < 60)
      return img;
    var xa = toDoubleArray(xs);
    var ya = toDoubleArray(ys);
    var k0 = percentil($this, xa, 0.1);
    var k1 = percentil($this, xa, 99.9);
    var k2 = percentil($this, ya, 0.1);
    var k3 = percentil($this, ya, 99.9);
    if (fx1 >= 0) {
      // Inline function 'kotlin.math.min' call
      var a_3 = k0;
      var b_5 = fx0;
      k0 = Math.min(a_3, b_5);
      // Inline function 'kotlin.math.max' call
      var a_4 = k1;
      var b_6 = fx1;
      k1 = Math.max(a_4, b_6);
      // Inline function 'kotlin.math.min' call
      var a_5 = k2;
      var b_7 = fy0;
      k2 = Math.min(a_5, b_7);
      // Inline function 'kotlin.math.max' call
      var a_6 = k3;
      var b_8 = fy1;
      k3 = Math.max(a_6, b_8);
    }
    var tmp_1 = 0;
    var tmp_2 = imul(w, h);
    var tmp_3 = new Float32Array(tmp_2);
    while (tmp_1 < tmp_2) {
      var tmp_4 = tmp_1;
      tmp_3[tmp_4] = cinz(CorrecaoPaginas_getInstance(), p.px_1[tmp_4]);
      tmp_1 = tmp_1 + 1 | 0;
    }
    var g = tmp_3;
    var med = mediaLocal($this, g, w, h, 6);
    var cx0 = coerceIn_0(numberToInt(k0), 0, w - 1 | 0);
    var cx1 = coerceIn_0(numberToInt(k1), 0, w - 1 | 0);
    var cy0 = coerceIn_0(numberToInt(k2), 0, h - 1 | 0);
    var cy1 = coerceIn_0(numberToInt(k3), 0, h - 1 | 0);
    var tmp_5 = cx0 - 1 | 0;
    var bE = limparMargens$bordo(tmp_5, -1, -1, CorrecaoPaginas$limparMargens$cobCol$ref(cy0, cy1, g, w, med), w);
    var tmp_6 = cx1 + 1 | 0;
    var bD = limparMargens$bordo(tmp_6, w, 1, CorrecaoPaginas$limparMargens$cobCol$ref_0(cy0, cy1, g, w, med), w);
    var tmp_7 = cy0 - 1 | 0;
    var bS = limparMargens$bordo(tmp_7, -1, -1, CorrecaoPaginas$limparMargens$cobLin$ref(cx0, cx1, g, w, med), h);
    var tmp_8 = cy1 + 1 | 0;
    var bI = limparMargens$bordo(tmp_8, h, 1, CorrecaoPaginas$limparMargens$cobLin$ref_0(cx0, cx1, g, w, med), h);
    var px = 0.02 * w;
    var py = 0.015 * h;
    // Inline function 'kotlin.math.max' call
    var a_7 = k0 - px;
    var b_9 = (bE == null ? -1 : bE) + 1.0;
    k0 = Math.max(a_7, b_9);
    // Inline function 'kotlin.math.min' call
    var a_8 = k1 + px;
    var b_10 = (bD == null ? w : bD) - 1;
    k1 = Math.min(a_8, b_10);
    // Inline function 'kotlin.math.max' call
    var a_9 = k2 - py;
    var b_11 = (bS == null ? -1 : bS) + 1.0;
    k2 = Math.max(a_9, b_11);
    // Inline function 'kotlin.math.min' call
    var a_10 = k3 + py;
    var b_12 = (bI == null ? h : bI) - 1;
    k3 = Math.min(a_10, b_12);
    if ((k1 - k0) * (k3 - k2) < 0.3 * w * h)
      return img;
    if (((k0 <= 0.0 ? k2 <= 0.0 : false) ? k1 >= (w - 1 | 0) : false) ? k3 >= (h - 1 | 0) : false)
      return img;
    var sx = img.w_1 / w;
    var sy = img.h_1 / h;
    var x0 = numberToInt(k0 * sx);
    var x1 = numberToInt(k1 * sx);
    var y0 = numberToInt(k2 * sy);
    var y1 = numberToInt(k3 * sy);
    // Inline function 'kotlin.collections.copyOf' call
    // Inline function 'kotlin.js.asDynamic' call
    var out = img.px_1.slice();
    var inductionVariable = 0;
    var last = img.h_1;
    if (inductionVariable < last)
      do {
        var y = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var inductionVariable_0 = 0;
        var last_0 = img.w_1;
        if (inductionVariable_0 < last_0)
          do {
            var x = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            if (((x < x0 ? true : x > x1) ? true : y < y0) ? true : y > y1) {
              out[imul(y, img.w_1) + x | 0] = -1;
            }
          }
           while (inductionVariable_0 < last_0);
      }
       while (inductionVariable < last);
    return new Imagem(img.w_1, img.h_1, out);
  }
  function apagarRiscas($this, img) {
    var p = reduzir($this, img, 1000);
    var w = p.w_1;
    var h = p.h_1;
    var tmp = 0;
    var tmp_0 = imul(w, h);
    var tmp_1 = new Float32Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      tmp_1[tmp_2] = cinz(CorrecaoPaginas_getInstance(), p.px_1[tmp_2]);
      tmp = tmp + 1 | 0;
    }
    var g = tmp_1;
    var m = mediaLocal($this, g, w, h, 6);
    var tmp_3 = 0;
    var tmp_4 = imul(w, h);
    var tmp_5 = new Int32Array(tmp_4);
    while (tmp_3 < tmp_4) {
      var tmp_6 = tmp_3;
      tmp_5[tmp_6] = g[tmp_6] < m[tmp_6] - 12.0 ? 1 : 0;
      tmp_3 = tmp_3 + 1 | 0;
    }
    var escuro = tmp_5;
    var t = textoBinario($this, p, 30.0);
    var comps = componentes($this, t, w, h).component2_7eebsb_k$();
    var xs = ArrayList_init_$Create$();
    var ys = ArrayList_init_$Create$();
    var tmp1_iterator = comps.iterator_jk1svi_k$();
    $l$loop_1: while (tmp1_iterator.hasNext_bitz1p_k$()) {
      var c = tmp1_iterator.next_20eer_k$();
      var cw = (c.x1__1 - c.x0__1 | 0) + 1 | 0;
      var ch = (c.y1__1 - c.y0__1 | 0) + 1 | 0;
      if (((c.area_1 < 6 ? true : ch > 0.04 * h) ? true : cw > 0.3 * w) ? true : ch < 3)
        continue $l$loop_1;
      if ((cw < 2 ? true : cw > imul(6, ch)) ? true : ch > imul(5, cw))
        continue $l$loop_1;
      if (c.area_1 < 0.15 * cw * ch)
        continue $l$loop_1;
      xs.add_utx5q5_k$(c.x0__1);
      xs.add_utx5q5_k$(c.x1__1);
      ys.add_utx5q5_k$(c.y0__1);
      ys.add_utx5q5_k$(c.y1__1);
    }
    if (xs.get_size_woubt6_k$() < 60)
      return img;
    var xa = toDoubleArray(xs);
    var ya = toDoubleArray(ys);
    var tx0 = numberToInt(percentil($this, xa, 0.3));
    var tx1 = numberToInt(percentil($this, xa, 99.7));
    var ty0 = numberToInt(percentil($this, ya, 0.3));
    var ty1 = numberToInt(percentil($this, ya, 99.7));
    if (tx1 <= tx0 ? true : ty1 <= ty0)
      return img;
    var minV = numberToInt(0.2 * h);
    var minH = numberToInt(0.2 * w);
    var cortaE = -1;
    var cortaD = w;
    var cortaS = -1;
    var cortaI = h;
    var inductionVariable = 0;
    if (inductionVariable < w)
      $l$loop_3: do {
        var x = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var containsLower = tx0 - 3 | 0;
        if (x <= (tx1 + 3 | 0) ? containsLower <= x : false)
          continue $l$loop_3;
        var at = CorrecaoPaginas$apagarRiscas$lambda(escuro, w, x);
        if (!apagarRiscas$nosVertices(h, at))
          continue $l$loop_3;
        var longeTexto = x < tx0 - 0.012 * w ? true : x > tx1 + 0.012 * w;
        if (apagarRiscas$troco(h, at) >= minV ? true : longeTexto ? apagarRiscas$linha(h, at) : false) {
          if (x < tx0) {
            // Inline function 'kotlin.math.max' call
            var a = cortaE;
            cortaE = Math.max(a, x);
          } else {
            // Inline function 'kotlin.math.min' call
            var a_0 = cortaD;
            cortaD = Math.min(a_0, x);
          }
        }
      }
       while (inductionVariable < w);
    var inductionVariable_0 = 0;
    if (inductionVariable_0 < h)
      $l$loop_5: do {
        var y = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        var containsLower_0 = ty0 - 3 | 0;
        if (y <= (ty1 + 3 | 0) ? containsLower_0 <= y : false)
          continue $l$loop_5;
        var at_0 = CorrecaoPaginas$apagarRiscas$lambda_0(escuro, y, w, h);
        if (!apagarRiscas$nosVertices(w, at_0))
          continue $l$loop_5;
        if (apagarRiscas$troco(w, at_0) >= minH) {
          if (y < ty0) {
            // Inline function 'kotlin.math.max' call
            var a_1 = cortaS;
            cortaS = Math.max(a_1, y);
          } else {
            // Inline function 'kotlin.math.min' call
            var a_2 = cortaI;
            cortaI = Math.min(a_2, y);
          }
        }
      }
       while (inductionVariable_0 < h);
    if (((cortaE < 0 ? cortaD >= w : false) ? cortaS < 0 : false) ? cortaI >= h : false)
      return img;
    var sx = img.w_1 / w;
    var sy = img.h_1 / h;
    var e = numberToInt((cortaE + 3 | 0) * sx);
    var d = numberToInt((cortaD - 3 | 0) * sx);
    var sup = numberToInt((cortaS + 3 | 0) * sy);
    var inf = numberToInt((cortaI - 3 | 0) * sy);
    // Inline function 'kotlin.collections.copyOf' call
    // Inline function 'kotlin.js.asDynamic' call
    var out = img.px_1.slice();
    var inductionVariable_1 = 0;
    var last = img.h_1;
    if (inductionVariable_1 < last)
      do {
        var y_0 = inductionVariable_1;
        inductionVariable_1 = inductionVariable_1 + 1 | 0;
        var inductionVariable_2 = 0;
        var last_0 = img.w_1;
        if (inductionVariable_2 < last_0)
          do {
            var x_0 = inductionVariable_2;
            inductionVariable_2 = inductionVariable_2 + 1 | 0;
            if ((((cortaE >= 0 ? x_0 <= e : false) ? true : cortaD < w ? x_0 >= d : false) ? true : cortaS >= 0 ? y_0 <= sup : false) ? true : cortaI < h ? y_0 >= inf : false) {
              out[imul(y_0, img.w_1) + x_0 | 0] = -1;
            }
          }
           while (inductionVariable_2 < last_0);
      }
       while (inductionVariable_1 < last);
    return new Imagem(img.w_1, img.h_1, out);
  }
  function mascaraFundo($this, p) {
    var w = p.w_1;
    var h = p.h_1;
    var papel = mascaraPapel($this, p, true);
    var o = new Float32Array(2);
    var tmp = 0;
    var tmp_0 = imul(w, h);
    var tmp_1 = new Float32Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      labLB(CorrecaoPaginas_getInstance(), p.px_1[tmp_2], o);
      tmp_1[tmp_2] = o[0];
      tmp = tmp + 1 | 0;
    }
    var lv = tmp_1;
    var tmp_3 = 0;
    var tmp_4 = (imul(w, h) / 7 | 0) + 1 | 0;
    var tmp_5 = new Float64Array(tmp_4);
    while (tmp_3 < tmp_4) {
      var tmp_6 = tmp_3;
      tmp_5[tmp_6] = lv[imul(tmp_6, 7) % imul(w, h) | 0];
      tmp_3 = tmp_3 + 1 | 0;
    }
    var lRef = percentil($this, tmp_5, 90.0);
    var tmp_7 = 0;
    var tmp_8 = imul(w, h);
    var tmp_9 = new Int32Array(tmp_8);
    while (tmp_7 < tmp_8) {
      var tmp_10 = tmp_7;
      tmp_9[tmp_10] = (papel[tmp_10] === 0 ? true : lv[tmp_10] < 0.8 * lRef) ? 1 : 0;
      tmp_7 = tmp_7 + 1 | 0;
    }
    var fundo = tmp_9;
    var tmp0_container = componentes($this, fundo, w, h);
    var lab = tmp0_container.component1_7eebsc_k$();
    var comps = tmp0_container.component2_7eebsb_k$();
    var apagar = new Int32Array(imul(w, h));
    var tmp1_iterator = comps.iterator_jk1svi_k$();
    while (tmp1_iterator.hasNext_bitz1p_k$()) {
      var c = tmp1_iterator.next_20eer_k$();
      if (c.area_1 > 0.002 * w * h ? ((c.x0__1 === 0 ? true : c.x1__1 === (w - 1 | 0)) ? true : c.y0__1 === 0) ? true : c.y1__1 === (h - 1 | 0) : false) {
        var inductionVariable = 0;
        var last = imul(w, h);
        if (inductionVariable < last)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (lab[i] === c.id_1) {
              apagar[i] = 1;
            }
          }
           while (inductionVariable < last);
      }
    }
    // Inline function 'kotlin.math.max' call
    var b = w / 150 | 0;
    var r = Math.max(2, b);
    return dilatar($this, apagar, w, h, r, r);
  }
  function limparFundo($this, img) {
    var p = reduzir($this, img, 1000);
    var w = p.w_1;
    var h = p.h_1;
    var papel = mascaraPapel($this, p, true);
    var tmp = 0;
    var tmp_0 = imul(w, h);
    var tmp_1 = new Int32Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      tmp_1[tmp_2] = 1 - papel[tmp_2] | 0;
      tmp = tmp + 1 | 0;
    }
    var fundo = tmp_1;
    var tmp0_container = componentes($this, fundo, w, h);
    var lab = tmp0_container.component1_7eebsc_k$();
    var comps = tmp0_container.component2_7eebsb_k$();
    var apagar = new Int32Array(imul(w, h));
    var algum = false;
    var tmp1_iterator = comps.iterator_jk1svi_k$();
    while (tmp1_iterator.hasNext_bitz1p_k$()) {
      var c = tmp1_iterator.next_20eer_k$();
      if (c.area_1 > 100 ? ((c.x0__1 === 0 ? true : c.y0__1 === 0) ? true : c.x1__1 === (w - 1 | 0)) ? true : c.y1__1 === (h - 1 | 0) : false) {
        var inductionVariable = 0;
        var last = imul(w, h);
        if (inductionVariable < last)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (lab[i] === c.id_1) {
              apagar[i] = 1;
            }
          }
           while (inductionVariable < last);
        algum = true;
      }
    }
    if (!algum)
      return img;
    var dil = dilatar($this, apagar, w, h, 2, 2);
    // Inline function 'kotlin.collections.copyOf' call
    // Inline function 'kotlin.js.asDynamic' call
    var out = img.px_1.slice();
    var sx = w / img.w_1;
    var sy = h / img.h_1;
    var inductionVariable_0 = 0;
    var last_0 = img.h_1;
    if (inductionVariable_0 < last_0)
      do {
        var y = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        var inductionVariable_1 = 0;
        var last_1 = img.w_1;
        if (inductionVariable_1 < last_1)
          do {
            var x = inductionVariable_1;
            inductionVariable_1 = inductionVariable_1 + 1 | 0;
            // Inline function 'kotlin.math.min' call
            var a = h - 1 | 0;
            var b = numberToInt(y * sy);
            var tmp$ret$3 = Math.min(a, b);
            var tmp_3 = imul(tmp$ret$3, w);
            // Inline function 'kotlin.math.min' call
            var a_0 = w - 1 | 0;
            var b_0 = numberToInt(x * sx);
            if (dil[tmp_3 + Math.min(a_0, b_0) | 0] === 1) {
              out[imul(y, img.w_1) + x | 0] = -1;
            }
          }
           while (inductionVariable_1 < last_1);
      }
       while (inductionVariable_0 < last_0);
    return new Imagem(img.w_1, img.h_1, out);
  }
  function equilibrarBrancos($this, img) {
    var n = img.px_1.length;
    // Inline function 'kotlin.math.max' call
    var b = n / 60000 | 0;
    var passo = Math.max(1, b);
    var hl = new Int32Array(256);
    var tot = 0;
    var i = 0;
    while (i < n) {
      var c = img.px_1[i];
      var r = c >> 16 & 255;
      var g = c >> 8 & 255;
      var b_0 = c & 255;
      if (!((r >= 254 ? g >= 254 : false) ? b_0 >= 254 : false)) {
        var tmp1_index0 = ((imul(r, 299) + imul(g, 587) | 0) + imul(b_0, 114) | 0) / 1000 | 0;
        hl[tmp1_index0] = hl[tmp1_index0] + 1 | 0;
        tot = tot + 1 | 0;
      }
      i = i + passo | 0;
    }
    if (tot < 500)
      return img;
    var acc = 0;
    var limiar = 255;
    var inductionVariable = 0;
    if (inductionVariable <= 255)
      $l$loop: do {
        var v = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        acc = acc + hl[v] | 0;
        if (acc >= 0.7 * tot) {
          limiar = v;
          break $l$loop;
        }
      }
       while (inductionVariable <= 255);
    var hr = new Int32Array(256);
    var hg = new Int32Array(256);
    var hb = new Int32Array(256);
    var ns = {_v: 0};
    i = 0;
    while (i < n) {
      var c_0 = img.px_1[i];
      var r_0 = c_0 >> 16 & 255;
      var g_0 = c_0 >> 8 & 255;
      var b_1 = c_0 & 255;
      if (!((r_0 >= 254 ? g_0 >= 254 : false) ? b_1 >= 254 : false) ? (((imul(r_0, 299) + imul(g_0, 587) | 0) + imul(b_1, 114) | 0) / 1000 | 0) >= limiar : false) {
        hr[r_0] = hr[r_0] + 1 | 0;
        hg[g_0] = hg[g_0] + 1 | 0;
        hb[b_1] = hb[b_1] + 1 | 0;
        ns._v = ns._v + 1 | 0;
      }
      i = i + passo | 0;
    }
    var mr = equilibrarBrancos$med(ns, hr);
    var mg = equilibrarBrancos$med(ns, hg);
    var mb = equilibrarBrancos$med(ns, hb);
    var ml = (mr + mg + mb) / 3;
    if (ml < 60.0)
      return img;
    // Inline function 'kotlin.math.max' call
    var tmp$ret$1 = Math.max(1.0, mr);
    var gr = coerceIn(ml / tmp$ret$1, 0.85, 1.18);
    // Inline function 'kotlin.math.max' call
    var tmp$ret$2 = Math.max(1.0, mg);
    var gg = coerceIn(ml / tmp$ret$2, 0.85, 1.18);
    // Inline function 'kotlin.math.max' call
    var tmp$ret$3 = Math.max(1.0, mb);
    var gb = coerceIn(ml / tmp$ret$3, 0.85, 1.18);
    var tmp;
    var tmp_0;
    // Inline function 'kotlin.math.abs' call
    var x = gr - 1;
    if (Math.abs(x) < 0.01) {
      // Inline function 'kotlin.math.abs' call
      var x_0 = gg - 1;
      tmp_0 = Math.abs(x_0) < 0.01;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      // Inline function 'kotlin.math.abs' call
      var x_1 = gb - 1;
      tmp = Math.abs(x_1) < 0.01;
    } else {
      tmp = false;
    }
    if (tmp)
      return img;
    var tmp_1 = 0;
    var tmp_2 = new Int32Array(256);
    while (tmp_1 < 256) {
      var tmp_3 = tmp_1;
      tmp_2[tmp_3] = coerceIn_0(numberToInt(tmp_3 * gr), 0, 255);
      tmp_1 = tmp_1 + 1 | 0;
    }
    var tr = tmp_2;
    var tmp_4 = 0;
    var tmp_5 = new Int32Array(256);
    while (tmp_4 < 256) {
      var tmp_6 = tmp_4;
      tmp_5[tmp_6] = coerceIn_0(numberToInt(tmp_6 * gg), 0, 255);
      tmp_4 = tmp_4 + 1 | 0;
    }
    var tg = tmp_5;
    var tmp_7 = 0;
    var tmp_8 = new Int32Array(256);
    while (tmp_7 < 256) {
      var tmp_9 = tmp_7;
      tmp_8[tmp_9] = coerceIn_0(numberToInt(tmp_9 * gb), 0, 255);
      tmp_7 = tmp_7 + 1 | 0;
    }
    var tb = tmp_8;
    var tmp_10 = 0;
    var tmp_11 = new Int32Array(n);
    while (tmp_10 < n) {
      var tmp_12 = tmp_10;
      var c_1 = img.px_1[tmp_12];
      var r_1 = c_1 >> 16 & 255;
      var g_1 = c_1 >> 8 & 255;
      var b_2 = c_1 & 255;
      tmp_11[tmp_12] = ((r_1 >= 254 ? g_1 >= 254 : false) ? b_2 >= 254 : false) ? c_1 : -16777216 | tr[r_1] << 16 | tg[g_1] << 8 | tb[b_2];
      tmp_10 = tmp_10 + 1 | 0;
    }
    var out = tmp_11;
    return new Imagem(img.w_1, img.h_1, out);
  }
  function limparPaginaBranca($this, img) {
    var n = img.px_1.length;
    // Inline function 'kotlin.math.max' call
    var b = n / 200000 | 0;
    var passo = Math.max(1, b);
    var hist = new Int32Array(256);
    var total = 0;
    var i = 0;
    while (i < n) {
      var tmp1_index0 = coerceIn_0(numberToInt(cinz($this, img.px_1[i])), 0, 255);
      hist[tmp1_index0] = hist[tmp1_index0] + 1 | 0;
      total = total + 1 | 0;
      i = i + passo | 0;
    }
    var acc = 0;
    var papel = 255;
    var inductionVariable = 0;
    if (inductionVariable <= 255)
      $l$loop: do {
        var v = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        acc = acc + hist[v] | 0;
        if (acc >= 0.9 * total) {
          papel = v;
          break $l$loop;
        }
      }
       while (inductionVariable <= 255);
    var limite = papel - 60 | 0;
    var tinta = 0;
    var inductionVariable_0 = 0;
    // Inline function 'kotlin.math.max' call
    var last = Math.max(0, limite);
    if (inductionVariable_0 < last)
      do {
        var v_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        tinta = tinta + hist[v_0] | 0;
      }
       while (inductionVariable_0 < last);
    if (tinta > 0.005 * total)
      return img;
    var tmp = 0;
    var tmp_0 = new Int32Array(n);
    while (tmp < n) {
      var tmp_1 = tmp;
      tmp_0[tmp_1] = cinz(CorrecaoPaginas_getInstance(), img.px_1[tmp_1]) > limite ? -1 : img.px_1[tmp_1];
      tmp = tmp + 1 | 0;
    }
    var out = tmp_0;
    return new Imagem(img.w_1, img.h_1, out);
  }
  function normalizar($this, img0) {
    var img = equilibrarBrancos($this, img0);
    var w = img.w_1;
    var h = img.h_1;
    // Inline function 'kotlin.math.max' call
    var b = w / 8 | 0;
    var pw = Math.max(1, b);
    // Inline function 'kotlin.math.max' call
    var b_0 = h / 8 | 0;
    var ph = Math.max(1, b_0);
    var p = redimensionar($this, img, pw, ph);
    var tmp = 0;
    var tmp_0 = imul(pw, ph);
    var tmp_1 = new Float32Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      tmp_1[tmp_2] = cinz(CorrecaoPaginas_getInstance(), p.px_1[tmp_2]);
      tmp = tmp + 1 | 0;
    }
    var g = tmp_1;
    var mx = new Float32Array(imul(pw, ph));
    var inductionVariable = 0;
    if (inductionVariable < ph)
      do {
        var y = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var inductionVariable_0 = 0;
        if (inductionVariable_0 < pw)
          do {
            var x = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            var m = 0.0;
            var inductionVariable_1 = -2;
            if (inductionVariable_1 <= 2)
              do {
                var dy = inductionVariable_1;
                inductionVariable_1 = inductionVariable_1 + 1 | 0;
                var inductionVariable_2 = -2;
                if (inductionVariable_2 <= 2)
                  do {
                    var dx = inductionVariable_2;
                    inductionVariable_2 = inductionVariable_2 + 1 | 0;
                    var xx = coerceIn_0(x + dx | 0, 0, pw - 1 | 0);
                    var yy = coerceIn_0(y + dy | 0, 0, ph - 1 | 0);
                    // Inline function 'kotlin.math.max' call
                    var a = m;
                    var b_1 = g[imul(yy, pw) + xx | 0];
                    m = Math.max(a, b_1);
                  }
                   while (inductionVariable_2 <= 2);
              }
               while (inductionVariable_1 <= 2);
            mx[imul(y, pw) + x | 0] = m;
          }
           while (inductionVariable_0 < pw);
      }
       while (inductionVariable < ph);
    var ordenados = sortedArray_0(mx);
    var ref = ordenados[numberToInt(0.9 * (ordenados.length - 1 | 0))];
    var tmp_3 = 0;
    var tmp_4 = imul(pw, ph);
    var tmp_5 = booleanArray(tmp_4);
    while (tmp_3 < tmp_4) {
      var tmp_6 = tmp_3;
      tmp_5[tmp_6] = mx[tmp_6] >= 0.75 * ref;
      tmp_3 = tmp_3 + 1 | 0;
    }
    var valido = tmp_5;
    // Inline function 'kotlin.repeat' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable_3 = 0;
    if (inductionVariable_3 < 40)
      do {
        var index = inductionVariable_3;
        inductionVariable_3 = inductionVariable_3 + 1 | 0;
        $l$block_0: {
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.normalizar.<anonymous>' call
          var tmp$ret$6;
          $l$block: {
            // Inline function 'kotlin.collections.all' call
            var indexedObject = valido;
            var inductionVariable_4 = 0;
            var last = indexedObject.length;
            while (inductionVariable_4 < last) {
              var element = indexedObject[inductionVariable_4];
              inductionVariable_4 = inductionVariable_4 + 1 | 0;
              // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.normalizar.<anonymous>.<anonymous>' call
              if (!element) {
                tmp$ret$6 = false;
                break $l$block;
              }
            }
            tmp$ret$6 = true;
          }
          if (tmp$ret$6) {
            break $l$block_0;
          }
          var novo = copyOf_5(valido);
          var inductionVariable_5 = 0;
          if (inductionVariable_5 < ph)
            do {
              var y_0 = inductionVariable_5;
              inductionVariable_5 = inductionVariable_5 + 1 | 0;
              var inductionVariable_6 = 0;
              if (inductionVariable_6 < pw)
                $l$loop: do {
                  var x_0 = inductionVariable_6;
                  inductionVariable_6 = inductionVariable_6 + 1 | 0;
                  var i = imul(y_0, pw) + x_0 | 0;
                  if (valido[i])
                    continue $l$loop;
                  var sm = 0.0;
                  var n = 0;
                  var inductionVariable_7 = -1;
                  if (inductionVariable_7 <= 1)
                    do {
                      var dy_0 = inductionVariable_7;
                      inductionVariable_7 = inductionVariable_7 + 1 | 0;
                      var inductionVariable_8 = -1;
                      if (inductionVariable_8 <= 1)
                        do {
                          var dx_0 = inductionVariable_8;
                          inductionVariable_8 = inductionVariable_8 + 1 | 0;
                          var xx_0 = x_0 + dx_0 | 0;
                          var yy_0 = y_0 + dy_0 | 0;
                          if (((0 <= xx_0 ? xx_0 < pw : false) ? 0 <= yy_0 ? yy_0 < ph : false : false) ? valido[imul(yy_0, pw) + xx_0 | 0] : false) {
                            sm = sm + mx[imul(yy_0, pw) + xx_0 | 0];
                            n = n + 1 | 0;
                          }
                        }
                         while (inductionVariable_8 <= 1);
                    }
                     while (inductionVariable_7 <= 1);
                  if (n > 0) {
                    mx[i] = sm / n;
                    novo[i] = true;
                  }
                }
                 while (inductionVariable_6 < pw);
            }
             while (inductionVariable_5 < ph);
          valido = novo;
        }
      }
       while (inductionVariable_3 < 40);
    var inductionVariable_9 = 0;
    var last_0 = mx.length - 1 | 0;
    if (inductionVariable_9 <= last_0)
      do {
        var i_0 = inductionVariable_9;
        inductionVariable_9 = inductionVariable_9 + 1 | 0;
        if (!valido[i_0]) {
          mx[i_0] = ref;
        }
      }
       while (inductionVariable_9 <= last_0);
    var soma = somaJanelaF($this, mx, pw, ph, 4, 4);
    var tmp_7 = 0;
    var tmp_8 = imul(pw, ph);
    var tmp_9 = new Float32Array(tmp_8);
    while (tmp_7 < tmp_8) {
      var tmp_10 = tmp_7;
      tmp_9[tmp_10] = soma[tmp_10] / area(CorrecaoPaginas_getInstance(), tmp_10 % pw | 0, tmp_10 / pw | 0, pw, ph, 4, 4);
      tmp_7 = tmp_7 + 1 | 0;
    }
    var bg = tmp_9;
    var out = new Int32Array(imul(w, h));
    var inductionVariable_10 = 0;
    if (inductionVariable_10 < h)
      do {
        var y_1 = inductionVariable_10;
        inductionVariable_10 = inductionVariable_10 + 1 | 0;
        var fy = coerceIn_1((y_1 + 0.5) / 8.0 - 0.5, 0.0, ph - 1 | 0);
        var y0 = numberToInt(fy);
        // Inline function 'kotlin.math.min' call
        var a_0 = ph - 1 | 0;
        var b_2 = y0 + 1 | 0;
        var y1 = Math.min(a_0, b_2);
        var ty = fy - y0;
        var inductionVariable_11 = 0;
        if (inductionVariable_11 < w)
          do {
            var x_1 = inductionVariable_11;
            inductionVariable_11 = inductionVariable_11 + 1 | 0;
            var fx = coerceIn_1((x_1 + 0.5) / 8.0 - 0.5, 0.0, pw - 1 | 0);
            var x0 = numberToInt(fx);
            // Inline function 'kotlin.math.min' call
            var a_1 = pw - 1 | 0;
            var b_3 = x0 + 1 | 0;
            var x1 = Math.min(a_1, b_3);
            var tx = fx - x0;
            var b_4 = (bg[imul(y0, pw) + x0 | 0] * (1 - tx) + bg[imul(y0, pw) + x1 | 0] * tx) * (1 - ty) + (bg[imul(y1, pw) + x0 | 0] * (1 - tx) + bg[imul(y1, pw) + x1 | 0] * tx) * ty;
            // Inline function 'kotlin.math.max' call
            var f = 262.65000000000003 / Math.max(b_4, 90.0);
            var c = img.px_1[imul(y_1, w) + x_1 | 0];
            out[imul(y_1, w) + x_1 | 0] = -16777216 | normalizar$canal(f, c >> 16 & 255) << 16 | normalizar$canal(f, c >> 8 & 255) << 8 | normalizar$canal(f, c & 255);
          }
           while (inductionVariable_11 < w);
      }
       while (inductionVariable_10 < h);
    return new Imagem(w, h, out);
  }
  function caixaConteudo($this, img) {
    var w = img.w_1;
    var h = img.h_1;
    var t = textoBinario($this, img, 35.0);
    var comps = componentes($this, t, w, h).component2_7eebsb_k$();
    var tmp = 0;
    var tmp_0 = imul(w, h);
    var tmp_1 = new Float32Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      tmp_1[tmp_2] = cinz(CorrecaoPaginas_getInstance(), img.px_1[tmp_2]);
      tmp = tmp + 1 | 0;
    }
    var g = tmp_1;
    var papelM = mascaraPapel($this, img, true);
    var m = 3;
    var x0 = IntCompanionObject_getInstance().MAX_VALUE;
    var y0 = IntCompanionObject_getInstance().MAX_VALUE;
    var x1 = -1;
    var y1 = -1;
    var aceites = ArrayList_init_$Create$();
    var tmp1_iterator = comps.iterator_jk1svi_k$();
    $l$loop_5: while (tmp1_iterator.hasNext_bitz1p_k$()) {
      var c = tmp1_iterator.next_20eer_k$();
      var cw = (c.x1__1 - c.x0__1 | 0) + 1 | 0;
      var ch = (c.y1__1 - c.y0__1 | 0) + 1 | 0;
      if (c.area_1 < 4)
        continue $l$loop_5;
      if (((c.x0__1 <= m ? true : c.y0__1 <= m) ? true : c.x1__1 >= ((w - 1 | 0) - m | 0)) ? true : c.y1__1 >= ((h - 1 | 0) - m | 0))
        continue $l$loop_5;
      if (ch > 0.25 * h ? true : cw > 0.9 * w)
        continue $l$loop_5;
      if (ch > imul(8, cw) ? ch > 30 : false)
        continue $l$loop_5;
      var tmp_3;
      var tmp_4;
      // Inline function 'kotlin.math.max' call
      var b = w / 400 | 0;
      if (cw <= Math.max(2, b)) {
        tmp_4 = ch > imul(4, cw);
      } else {
        tmp_4 = false;
      }
      if (tmp_4) {
        tmp_3 = c.area_1 < imul(3, ch);
      } else {
        tmp_3 = false;
      }
      if (tmp_3)
        continue $l$loop_5;
      var tmp_5;
      var tmp_6;
      // Inline function 'kotlin.math.max' call
      var b_0 = h / 400 | 0;
      if (ch <= Math.max(2, b_0)) {
        tmp_6 = cw > imul(12, ch);
      } else {
        tmp_6 = false;
      }
      if (tmp_6) {
        tmp_5 = cw > 0.1 * w;
      } else {
        tmp_5 = false;
      }
      if (tmp_5)
        continue $l$loop_5;
      if (papelM[imul((c.y0__1 + c.y1__1 | 0) / 2 | 0, w) + ((c.x0__1 + c.x1__1 | 0) / 2 | 0) | 0] === 0)
        continue $l$loop_5;
      aceites.add_utx5q5_k$(c);
    }
    if (aceites.isEmpty_y1axqb_k$())
      return null;
    var ocup = new Int32Array(h);
    var tmp2_iterator = aceites.iterator_jk1svi_k$();
    while (tmp2_iterator.hasNext_bitz1p_k$()) {
      var c_0 = tmp2_iterator.next_20eer_k$();
      var inductionVariable = c_0.y0__1;
      var last = c_0.y1__1;
      if (inductionVariable <= last)
        do {
          var y = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var tmp5_index0 = y;
          ocup[tmp5_index0] = ocup[tmp5_index0] + c_0.area_1 | 0;
        }
         while (!(y === last));
    }
    var salto = numberToInt(0.06 * h);
    var blocos = ArrayList_init_$Create$();
    var y_0 = 0;
    $l$loop_6: while (y_0 < h) {
      if (ocup[y_0] === 0) {
        y_0 = y_0 + 1 | 0;
        continue $l$loop_6;
      }
      var fim = y_0;
      var areaB = 0;
      var vazio = 0;
      var k = y_0;
      while (k < h ? vazio <= salto : false) {
        if (ocup[k] > 0) {
          fim = k;
          vazio = 0;
          areaB = areaB + ocup[k] | 0;
        } else {
          vazio = vazio + 1 | 0;
        }
        k = k + 1 | 0;
      }
      // Inline function 'kotlin.intArrayOf' call
      var tmp$ret$3 = new Int32Array([y_0, fim, areaB]);
      blocos.add_utx5q5_k$(tmp$ret$3);
      y_0 = fim + 1 | 0;
    }
    // Inline function 'kotlin.collections.maxOf' call
    var iterator = blocos.iterator_jk1svi_k$();
    if (!iterator.hasNext_bitz1p_k$())
      throw NoSuchElementException_init_$Create$();
    // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.caixaConteudo.<anonymous>' call
    var maxValue = iterator.next_20eer_k$()[2];
    while (iterator.hasNext_bitz1p_k$()) {
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.caixaConteudo.<anonymous>' call
      var v = iterator.next_20eer_k$()[2];
      if (compareTo_0(maxValue, v) < 0) {
        maxValue = v;
      }
    }
    var principal = maxValue;
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var destination = ArrayList_init_$Create$();
    var tmp0_iterator = blocos.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.caixaConteudo.<anonymous>' call
      if (element[2] >= 0.04 * principal) {
        destination.add_utx5q5_k$(element);
      }
    }
    var validos = destination;
    // Inline function 'kotlin.collections.minOf' call
    var iterator_0 = validos.iterator_jk1svi_k$();
    if (!iterator_0.hasNext_bitz1p_k$())
      throw NoSuchElementException_init_$Create$();
    // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.caixaConteudo.<anonymous>' call
    var minValue = iterator_0.next_20eer_k$()[0];
    while (iterator_0.hasNext_bitz1p_k$()) {
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.caixaConteudo.<anonymous>' call
      var v_0 = iterator_0.next_20eer_k$()[0];
      if (compareTo_0(minValue, v_0) > 0) {
        minValue = v_0;
      }
    }
    var yMin = minValue;
    // Inline function 'kotlin.collections.maxOf' call
    var iterator_1 = validos.iterator_jk1svi_k$();
    if (!iterator_1.hasNext_bitz1p_k$())
      throw NoSuchElementException_init_$Create$();
    // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.caixaConteudo.<anonymous>' call
    var maxValue_0 = iterator_1.next_20eer_k$()[1];
    while (iterator_1.hasNext_bitz1p_k$()) {
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.caixaConteudo.<anonymous>' call
      var v_1 = iterator_1.next_20eer_k$()[1];
      if (compareTo_0(maxValue_0, v_1) < 0) {
        maxValue_0 = v_1;
      }
    }
    var yMax = maxValue_0;
    var tmp9_iterator = aceites.iterator_jk1svi_k$();
    $l$loop_7: while (tmp9_iterator.hasNext_bitz1p_k$()) {
      var c_1 = tmp9_iterator.next_20eer_k$();
      if (c_1.y1__1 < yMin ? true : c_1.y0__1 > yMax)
        continue $l$loop_7;
      // Inline function 'kotlin.math.min' call
      var a = x0;
      var b_1 = c_1.x0__1;
      x0 = Math.min(a, b_1);
      // Inline function 'kotlin.math.min' call
      var a_0 = y0;
      var b_2 = c_1.y0__1;
      y0 = Math.min(a_0, b_2);
      // Inline function 'kotlin.math.max' call
      var a_1 = x1;
      var b_3 = c_1.x1__1;
      x1 = Math.max(a_1, b_3);
      // Inline function 'kotlin.math.max' call
      var a_2 = y1;
      var b_4 = c_1.y1__1;
      y1 = Math.max(a_2, b_4);
    }
    if ((x1 < 0 ? true : (x1 - x0 | 0) < 0.2 * w) ? true : (y1 - y0 | 0) < 0.1 * h)
      return null;
    // Inline function 'kotlin.intArrayOf' call
    return new Int32Array([x0, y0, x1, y1]);
  }
  function enquadrar($this, img) {
    var p = reduzir($this, img, 1600);
    var sc = img.w_1 / p.w_1;
    var tmp0_elvis_lhs = caixaConteudo($this, p);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return img;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var cx = tmp;
    var pad = roundToInt(4 * sc);
    var x0 = roundToInt(cx[0] * sc);
    var y0 = roundToInt(cx[1] * sc);
    // Inline function 'kotlin.math.min' call
    var a = img.w_1 - 1 | 0;
    var b = roundToInt(cx[2] * sc);
    var x1 = Math.min(a, b);
    // Inline function 'kotlin.math.min' call
    var a_0 = img.h_1 - 1 | 0;
    var b_0 = roundToInt(cx[3] * sc);
    var y1 = Math.min(a_0, b_0);
    var bw = (x1 - x0 | 0) + 1 | 0;
    var bh = (y1 - y0 | 0) + 1 | 0;
    var mx = roundToInt(0.09 * bw);
    var my = roundToInt(0.07 * bh);
    var nw = bw + imul(2, mx) | 0;
    var nh = bh + imul(2, my) | 0;
    // Inline function 'kotlin.math.max' call
    var b_1 = x0 - pad | 0;
    var rx0 = Math.max(0, b_1);
    // Inline function 'kotlin.math.max' call
    var b_2 = y0 - pad | 0;
    var ry0 = Math.max(0, b_2);
    // Inline function 'kotlin.math.min' call
    var a_1 = img.w_1 - 1 | 0;
    var b_3 = x1 + pad | 0;
    var rx1 = Math.min(a_1, b_3);
    // Inline function 'kotlin.math.min' call
    var a_2 = img.h_1 - 1 | 0;
    var b_4 = y1 + pad | 0;
    var ry1 = Math.min(a_2, b_4);
    var tmp_0 = numberToInt(rx0 / sc);
    var tmp_1 = numberToInt(ry0 / sc);
    // Inline function 'kotlin.math.min' call
    var a_3 = p.w_1;
    var b_5 = numberToInt(rx1 / sc) + 1 | 0;
    var tmp_2 = Math.min(a_3, b_5);
    // Inline function 'kotlin.math.min' call
    var a_4 = p.h_1;
    var b_6 = numberToInt(ry1 / sc) + 1 | 0;
    var tmp$ret$7 = Math.min(a_4, b_6);
    var manchas = mascaraManchas($this, recortar($this, p, tmp_0, tmp_1, tmp_2, tmp$ret$7));
    var tmp_3 = 0;
    var tmp_4 = imul(nw, nh);
    var tmp_5 = new Int32Array(tmp_4);
    while (tmp_3 < tmp_4) {
      tmp_5[tmp_3] = -1;
      tmp_3 = tmp_3 + 1 | 0;
    }
    var out = tmp_5;
    var inductionVariable = ry0;
    if (inductionVariable <= ry1)
      do {
        var y = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var inductionVariable_0 = rx0;
        if (inductionVariable_0 <= rx1)
          $l$loop_0: do {
            var x = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            var ox = (x - x0 | 0) + mx | 0;
            var oy = (y - y0 | 0) + my | 0;
            if (!(0 <= ox ? ox < nw : false) ? true : !(0 <= oy ? oy < nh : false))
              continue $l$loop_0;
            if (!(manchas == null)) {
              // Inline function 'kotlin.math.min' call
              var a_5 = manchas.second_1 - 1 | 0;
              var b_7 = numberToInt((x - rx0 | 0) / sc);
              var mxp = Math.min(a_5, b_7);
              // Inline function 'kotlin.math.min' call
              var a_6 = manchas.third_1 - 1 | 0;
              var b_8 = numberToInt((y - ry0 | 0) / sc);
              var myp = Math.min(a_6, b_8);
              if (manchas.first_1[imul(myp, manchas.second_1) + mxp | 0] === 1)
                continue $l$loop_0;
            }
            out[imul(oy, nw) + ox | 0] = img.px_1[imul(y, img.w_1) + x | 0];
          }
           while (!(x === rx1));
      }
       while (!(y === ry1));
    return new Imagem(nw, nh, out);
  }
  function mascaraManchas($this, img) {
    var w = img.w_1;
    var h = img.h_1;
    if (w < 10 ? true : h < 10)
      return null;
    var tmp = 0;
    var tmp_0 = imul(w, h);
    var tmp_1 = new Int32Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      tmp_1[tmp_2] = cinz(CorrecaoPaginas_getInstance(), img.px_1[tmp_2]) < 228.0 ? 1 : 0;
      tmp = tmp + 1 | 0;
    }
    var m = tmp_1;
    // Inline function 'kotlin.math.max' call
    // Inline function 'kotlin.math.min' call
    var tmp$ret$1 = Math.min(w, h);
    var b = roundToInt(tmp$ret$1 / 200.0);
    var r = Math.max(3, b);
    m = abrir($this, m, w, h, r, r);
    var tmp0_container = componentes($this, m, w, h);
    var lab = tmp0_container.component1_7eebsc_k$();
    var comps = tmp0_container.component2_7eebsb_k$();
    var apagar = new Int32Array(imul(w, h));
    var algum = false;
    var tmp1_iterator = comps.iterator_jk1svi_k$();
    while (tmp1_iterator.hasNext_bitz1p_k$()) {
      var c = tmp1_iterator.next_20eer_k$();
      if (c.area_1 > 150 ? ((c.x0__1 === 0 ? true : c.y0__1 === 0) ? true : c.x1__1 === (w - 1 | 0)) ? true : c.y1__1 === (h - 1 | 0) : false) {
        var inductionVariable = 0;
        var last = imul(w, h);
        if (inductionVariable < last)
          do {
            var k = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (lab[k] === c.id_1) {
              apagar[k] = 1;
            }
          }
           while (inductionVariable < last);
        algum = true;
      }
    }
    if (!algum)
      return null;
    return new Triple(dilatar($this, apagar, w, h, r, r), w, h);
  }
  function aparar($this, img) {
    var w = img.w_1;
    var h = img.h_1;
    var f = h / 1200.0;
    var lim = numberToInt(40 * f);
    var t = {_v: 0};
    var b = {_v: h};
    var l = {_v: 0};
    var r = {_v: w};
    while (t._v < lim ? aparar$fracLinha(l, r, img, w, t._v) > 0.02 : false) {
      t._v = t._v + 1 | 0;
    }
    while ((h - b._v | 0) < lim ? aparar$fracLinha(l, r, img, w, b._v - 1 | 0) > 0.02 : false) {
      b._v = b._v - 1 | 0;
    }
    while (l._v < lim ? aparar$fracCol(t, b, img, w, l._v) > 0.02 : false) {
      l._v = l._v + 1 | 0;
    }
    while ((w - r._v | 0) < lim ? aparar$fracCol(t, b, img, w, r._v - 1 | 0) > 0.02 : false) {
      r._v = r._v - 1 | 0;
    }
    if (((t._v === 0 ? b._v === h : false) ? l._v === 0 : false) ? r._v === w : false)
      return img;
    var nw = r._v - l._v | 0;
    var nh = b._v - t._v | 0;
    var tmp = 0;
    var tmp_0 = imul(nw, nh);
    var tmp_1 = new Int32Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      tmp_1[tmp_2] = img.px_1[(imul(t._v + (tmp_2 / nw | 0) | 0, w) + l._v | 0) + (tmp_2 % nw | 0) | 0];
      tmp = tmp + 1 | 0;
    }
    return new Imagem(nw, nh, tmp_1);
  }
  function sam$kotlin_Comparator$0_3(function_0) {
    this.function_1 = function_0;
  }
  protoOf(sam$kotlin_Comparator$0_3).compare_bczr_k$ = function (a, b) {
    return this.function_1(a, b);
  };
  protoOf(sam$kotlin_Comparator$0_3).compare = function (a, b) {
    return this.compare_bczr_k$(a, b);
  };
  function sam$kotlin_Comparator$0_4(function_0) {
    this.function_1 = function_0;
  }
  protoOf(sam$kotlin_Comparator$0_4).compare_bczr_k$ = function (a, b) {
    return this.function_1(a, b);
  };
  protoOf(sam$kotlin_Comparator$0_4).compare = function (a, b) {
    return this.compare_bczr_k$(a, b);
  };
  function ladoDaLombada$lum(h, m, w, p, x0, x1) {
    var s = 0.0;
    var n = 0;
    var progression = step(until(h / 5 | 0, imul(4, h) / 5 | 0), 2);
    var inductionVariable = progression.first_1;
    var last = progression.last_1;
    var step_0 = progression.step_1;
    if ((step_0 > 0 ? inductionVariable <= last : false) ? true : step_0 < 0 ? last <= inductionVariable : false)
      do {
        var y = inductionVariable;
        inductionVariable = inductionVariable + step_0 | 0;
        var inductionVariable_0 = x0;
        if (inductionVariable_0 < x1)
          do {
            var x = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            if (m[imul(y, w) + x | 0] === 1) {
              s = s + brilho(CorrecaoPaginas_getInstance(), p.px_1[imul(y, w) + x | 0]);
              n = n + 1 | 0;
            }
          }
           while (inductionVariable_0 < x1);
      }
       while (!(y === last));
    var tmp;
    if (n > 50) {
      tmp = s / n;
    } else {
      DoubleCompanionObject_getInstance();
      tmp = NaN;
    }
    return tmp;
  }
  function blocoPlano$ajusta(e) {
    var tmp = CorrecaoPaginas_getInstance();
    // Inline function 'kotlin.math.min' call
    // Inline function 'kotlin.math.max' call
    var b = e.xs_1.length / 5 | 0;
    var b_0 = Math.max(1, b);
    var tmp$ret$1 = Math.min(4, b_0);
    return ajustarRobusto$default(tmp, e.xs_1, e.ys_1, tmp$ret$1, 2.0);
  }
  function blocoPlano$canto(lat, c, y0) {
    var y = y0;
    // Inline function 'kotlin.repeat' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    if (inductionVariable < 12)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.blocoPlano.canto.<anonymous>' call
        y = c.v_w1w1cg_k$(lat.v_w1w1cg_k$(y));
      }
       while (inductionVariable < 12);
    // Inline function 'kotlin.doubleArrayOf' call
    return new Float64Array([lat.v_w1w1cg_k$(y), y]);
  }
  function contornoPagina$canto(ya, yb, lat, c) {
    var y = c.v_w1w1cg_k$(lat.v_w1w1cg_k$((ya + yb | 0) / 2.0));
    // Inline function 'kotlin.repeat' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    if (inductionVariable < 12)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.contornoPagina.canto.<anonymous>' call
        y = c.v_w1w1cg_k$(lat.v_w1w1cg_k$(y));
      }
       while (inductionVariable < 12);
    // Inline function 'kotlin.doubleArrayOf' call
    return new Float64Array([lat.v_w1w1cg_k$(y), y]);
  }
  function contornoPagina$curva(n, x0, x1, c) {
    var tmp = 0;
    var tmp_0 = new Float64Array(n);
    while (tmp < n) {
      var tmp_1 = tmp;
      tmp_0[tmp_1] = x0 + (x1 - x0) * tmp_1 / (n - 1 | 0);
      tmp = tmp + 1 | 0;
    }
    var cx = tmp_0;
    var tmp_2 = 0;
    var tmp_3 = new Float64Array(n);
    while (tmp_2 < n) {
      var tmp_4 = tmp_2;
      tmp_3[tmp_4] = c.v_w1w1cg_k$(cx[tmp_4]);
      tmp_2 = tmp_2 + 1 | 0;
    }
    var cy = tmp_3;
    var cum = new Float64Array(n);
    var inductionVariable = 1;
    if (inductionVariable < n)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp_5 = cum[i - 1 | 0];
        // Inline function 'kotlin.math.sqrt' call
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.contornoPagina.curva.<anonymous>' call
        var it = cx[i] - cx[i - 1 | 0];
        var tmp_6 = it * it;
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.contornoPagina.curva.<anonymous>' call
        var it_0 = cy[i] - cy[i - 1 | 0];
        var x = tmp_6 + it_0 * it_0;
        cum[i] = tmp_5 + Math.sqrt(x);
      }
       while (inductionVariable < n);
    // Inline function 'kotlin.math.max' call
    var b = cum[n - 1 | 0];
    var tot = Math.max(1.0E-6, b);
    // Inline function 'kotlin.arrayOf' call
    var tmp_7 = 0;
    var tmp_8 = new Float64Array(n);
    while (tmp_7 < n) {
      var tmp_9 = tmp_7;
      tmp_8[tmp_9] = cum[tmp_9] / tot;
      tmp_7 = tmp_7 + 1 | 0;
    }
    // Inline function 'kotlin.doubleArrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [cx, cy, tmp_8, new Float64Array([tot])];
  }
  function blocoTexto$papel(p, pm, x, y) {
    return (((x >= 0 ? y >= 0 : false) ? x < p.w_1 : false) ? y < p.h_1 : false) ? pm[imul(y, p.w_1) + x | 0] === 1 : false;
  }
  function margensPapel$papel(pm, w, x, y) {
    return pm[imul(y, w) + x | 0] === 1;
  }
  function margensPapel$fracLinha(xc0, xc1, pm, w, y) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlin.collections.count' call
      var this_0 = step(numberRangeToNumber(xc0, xc1), 4);
      var tmp;
      if (isInterface(this_0, Collection)) {
        tmp = this_0.isEmpty_y1axqb_k$();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = 0;
        break $l$block;
      }
      var count = 0;
      var tmp0_iterator = this_0.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.margensPapel.fracLinha.<anonymous>' call
        if (margensPapel$papel(pm, w, element, y)) {
          count = count + 1 | 0;
          checkCountOverflow(count);
        }
      }
      tmp$ret$0 = count;
    }
    return tmp$ret$0 / (((xc1 - xc0 | 0) / 4 | 0) + 1 | 0);
  }
  function margensPapel$fracCol(yc0, yc1, pm, w, x) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlin.collections.count' call
      var this_0 = step(numberRangeToNumber(yc0, yc1), 4);
      var tmp;
      if (isInterface(this_0, Collection)) {
        tmp = this_0.isEmpty_y1axqb_k$();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = 0;
        break $l$block;
      }
      var count = 0;
      var tmp0_iterator = this_0.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.margensPapel.fracCol.<anonymous>' call
        if (margensPapel$papel(pm, w, x, element)) {
          count = count + 1 | 0;
          checkCountOverflow(count);
        }
      }
      tmp$ret$0 = count;
    }
    return tmp$ret$0 / (((yc1 - yc0 | 0) / 4 | 0) + 1 | 0);
  }
  function verticesLivro$suaviza(w, v) {
    var tmp = 0;
    var tmp_0 = new Float64Array(w);
    while (tmp < w) {
      var tmp_1 = tmp;
      // Inline function 'kotlin.collections.filter' call
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.math.max' call
      var b = tmp_1 - 9 | 0;
      var tmp_2 = Math.max(0, b);
      // Inline function 'kotlin.math.min' call
      var a = w - 1 | 0;
      var b_0 = tmp_1 + 9 | 0;
      var tmp$ret$1 = Math.min(a, b_0);
      var this_0 = numberRangeToNumber(tmp_2, tmp$ret$1);
      // Inline function 'kotlin.collections.mapTo' call
      var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
      var tmp0_iterator = this_0.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var item = tmp0_iterator.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.verticesLivro.suaviza.<anonymous>' call
        var tmp$ret$2 = v[item];
        destination.add_utx5q5_k$(tmp$ret$2);
      }
      // Inline function 'kotlin.collections.filterTo' call
      var destination_0 = ArrayList_init_$Create$();
      var tmp0_iterator_0 = destination.iterator_jk1svi_k$();
      while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator_0.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.verticesLivro.suaviza.<anonymous>' call
        if (!isNaN_0(element)) {
          destination_0.add_utx5q5_k$(element);
        }
      }
      var viz = destination_0;
      var tmp_3;
      if (viz.isEmpty_y1axqb_k$()) {
        DoubleCompanionObject_getInstance();
        tmp_3 = NaN;
      } else {
        tmp_3 = mediana_0(CorrecaoPaginas_getInstance(), toDoubleArray(viz));
      }
      tmp_0[tmp_1] = tmp_3;
      tmp = tmp + 1 | 0;
    }
    return tmp_0;
  }
  function verticesLivro$vertice(x0, bw, w, h, v, sinal) {
    var melhor = null;
    var prof = 0.0;
    var inductionVariable = numberToInt(x0 + 0.35 * bw);
    var last = numberToInt(x0 + 0.65 * bw);
    if (inductionVariable < last)
      $l$loop_0: do {
        var x = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (isNaN_0(v[x]))
          continue $l$loop_0;
        // Inline function 'kotlin.collections.filter' call
        // Inline function 'kotlin.collections.map' call
        // Inline function 'kotlin.collections.filter' call
        // Inline function 'kotlin.collections.filterTo' call
        var this_0 = until(numberToInt(x - 0.15 * bw), numberToInt(x - 0.04 * bw));
        var destination = ArrayList_init_$Create$();
        var tmp0_iterator = this_0.iterator_jk1svi_k$();
        while (tmp0_iterator.hasNext_bitz1p_k$()) {
          var element = tmp0_iterator.next_20eer_k$();
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.verticesLivro.vertice.<anonymous>' call
          if (0 <= element ? element < w : false) {
            destination.add_utx5q5_k$(element);
          }
        }
        // Inline function 'kotlin.collections.mapTo' call
        var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(destination, 10));
        var tmp0_iterator_0 = destination.iterator_jk1svi_k$();
        while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
          var item = tmp0_iterator_0.next_20eer_k$();
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.verticesLivro.vertice.<anonymous>' call
          var tmp$ret$3 = v[item];
          destination_0.add_utx5q5_k$(tmp$ret$3);
        }
        // Inline function 'kotlin.collections.filterTo' call
        var destination_1 = ArrayList_init_$Create$();
        var tmp0_iterator_1 = destination_0.iterator_jk1svi_k$();
        while (tmp0_iterator_1.hasNext_bitz1p_k$()) {
          var element_0 = tmp0_iterator_1.next_20eer_k$();
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.verticesLivro.vertice.<anonymous>' call
          if (!isNaN_0(element_0)) {
            destination_1.add_utx5q5_k$(element_0);
          }
        }
        var esq = destination_1;
        // Inline function 'kotlin.collections.filter' call
        // Inline function 'kotlin.collections.map' call
        // Inline function 'kotlin.collections.filter' call
        // Inline function 'kotlin.collections.filterTo' call
        var this_1 = until(numberToInt(x + 0.04 * bw), numberToInt(x + 0.15 * bw));
        var destination_2 = ArrayList_init_$Create$();
        var tmp0_iterator_2 = this_1.iterator_jk1svi_k$();
        while (tmp0_iterator_2.hasNext_bitz1p_k$()) {
          var element_1 = tmp0_iterator_2.next_20eer_k$();
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.verticesLivro.vertice.<anonymous>' call
          if (0 <= element_1 ? element_1 < w : false) {
            destination_2.add_utx5q5_k$(element_1);
          }
        }
        // Inline function 'kotlin.collections.mapTo' call
        var destination_3 = ArrayList_init_$Create$_0(collectionSizeOrDefault(destination_2, 10));
        var tmp0_iterator_3 = destination_2.iterator_jk1svi_k$();
        while (tmp0_iterator_3.hasNext_bitz1p_k$()) {
          var item_0 = tmp0_iterator_3.next_20eer_k$();
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.verticesLivro.vertice.<anonymous>' call
          var tmp$ret$12 = v[item_0];
          destination_3.add_utx5q5_k$(tmp$ret$12);
        }
        // Inline function 'kotlin.collections.filterTo' call
        var destination_4 = ArrayList_init_$Create$();
        var tmp0_iterator_4 = destination_3.iterator_jk1svi_k$();
        while (tmp0_iterator_4.hasNext_bitz1p_k$()) {
          var element_2 = tmp0_iterator_4.next_20eer_k$();
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.verticesLivro.vertice.<anonymous>' call
          if (!isNaN_0(element_2)) {
            destination_4.add_utx5q5_k$(element_2);
          }
        }
        var dir = destination_4;
        if (esq.get_size_woubt6_k$() < 5 ? true : dir.get_size_woubt6_k$() < 5)
          continue $l$loop_0;
        var me = mediana_0(CorrecaoPaginas_getInstance(), toDoubleArray(esq));
        var md = mediana_0(CorrecaoPaginas_getInstance(), toDoubleArray(dir));
        var pr = sinal * (v[x] - mediana_0(CorrecaoPaginas_getInstance(), toDoubleArray(plus_0(esq, dir))));
        if (((pr > 0.008 * h ? sinal * (v[x] - me) > 0.004 * h : false) ? sinal * (v[x] - md) > 0.004 * h : false) ? pr > prof : false) {
          prof = pr;
          // Inline function 'kotlin.doubleArrayOf' call
          melhor = new Float64Array([x, v[x]]);
        }
      }
       while (inductionVariable < last);
    return melhor;
  }
  function analisar$proporcao(proporcoes, pg, b, c, lombadaADireita) {
    if (((b == null ? true : c == null) ? true : isNaN_0(c.xEsq_1)) ? true : b.linhas_1 < 6)
      return Unit_getInstance();
    var ext = lombadaADireita ? b.x0__1 - c.xEsq_1 : c.xDir_1 - b.x1__1;
    var int = lombadaADireita ? c.xDir_1 - b.x1__1 : b.x0__1 - c.xEsq_1;
    var sup = b.y0__1 - c.ySup_1;
    var inf = c.yInf_1 - b.y1__1;
    if (((ext > 0.0 ? int > 0.0 : false) ? sup > 0.0 : false) ? inf > 0.0 : false) {
      // Inline function 'kotlin.doubleArrayOf' call
      var tmp$ret$0 = new Float64Array([ext / (ext + int), sup / (sup + inf)]);
      proporcoes.add_utx5q5_k$(tmp$ret$0);
    }
  }
  function processarDocumento$margem(validas, lw, k, padrao) {
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.flatMap' call
    // Inline function 'kotlin.collections.flatMapTo' call
    var destination = ArrayList_init_$Create$();
    var tmp0_iterator = validas.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var element = tmp0_iterator.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.margem.<anonymous>' call
      var list = element.margens_1;
      addAll(destination, list);
    }
    // Inline function 'kotlin.collections.mapTo' call
    var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(destination, 10));
    var tmp0_iterator_0 = destination.iterator_jk1svi_k$();
    while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
      var item = tmp0_iterator_0.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.margem.<anonymous>' call
      var tmp$ret$3 = item[k];
      destination_0.add_utx5q5_k$(tmp$ret$3);
    }
    // Inline function 'kotlin.collections.filterTo' call
    var destination_1 = ArrayList_init_$Create$();
    var tmp0_iterator_1 = destination_0.iterator_jk1svi_k$();
    while (tmp0_iterator_1.hasNext_bitz1p_k$()) {
      var element_0 = tmp0_iterator_1.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.margem.<anonymous>' call
      if (!isNaN_0(element_0) ? element_0 > 0.0 : false) {
        destination_1.add_utx5q5_k$(element_0);
      }
    }
    var v = destination_1;
    return coerceIn(v.get_size_woubt6_k$() >= 2 ? mediana(CorrecaoPaginas_getInstance(), v) : padrao * lw, 0.03 * lw, 0.35 * lw);
  }
  function tLombada$perfil(h, passo, w, y0, faixa, y1, t, xc) {
    var p = new Float64Array(h);
    // Inline function 'kotlin.math.max' call
    // Inline function 'kotlin.math.min' call
    var b = xc + passo | 0;
    var b_0 = Math.min(xc, b);
    var xa = Math.max(0, b_0);
    // Inline function 'kotlin.math.min' call
    var a = w - 1 | 0;
    // Inline function 'kotlin.math.max' call
    var b_1 = xc + passo | 0;
    var b_2 = Math.max(xc, b_1);
    var xb = Math.min(a, b_2);
    // Inline function 'kotlin.math.max' call
    var b_3 = y0 - imul(2, faixa) | 0;
    var inductionVariable = Math.max(0, b_3);
    // Inline function 'kotlin.math.min' call
    var b_4 = y1 + imul(2, faixa) | 0;
    var last = Math.min(h, b_4);
    if (inductionVariable < last)
      do {
        var y = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var s = 0;
        var inductionVariable_0 = xa;
        if (inductionVariable_0 <= xb)
          do {
            var x = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            s = s + t[imul(y, w) + x | 0] | 0;
          }
           while (!(x === xb));
        p[y] = s;
      }
       while (inductionVariable < last);
    return p;
  }
  function amostrar$canal(a, b, c, d, fx, fy, s) {
    var va = a >> s & 255;
    var vb = b >> s & 255;
    var vc = c >> s & 255;
    var vd = d >> s & 255;
    var top = va + (vb - va | 0) * fx;
    var bot = vc + (vd - vc | 0) * fx;
    return coerceIn_0(numberToInt(top + (bot - top) * fy + 0.5), 0, 255);
  }
  function amostrarBicubico$pesos(t) {
    // Inline function 'kotlin.floatArrayOf' call
    return new Float32Array([((-0.5 * t + 1.0) * t - 0.5) * t, (1.5 * t - 2.5) * t * t + 1.0, ((-1.5 * t + 2.0) * t + 0.5) * t, (0.5 * t - 0.5) * t * t]);
  }
  function planificarT$canto(ymeio, lado, c) {
    var y = c.v_w1w1cg_k$(lado.x_rqsusy_k$(ymeio));
    // Inline function 'kotlin.repeat' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    if (inductionVariable < 10)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.planificarT.canto.<anonymous>' call
        y = c.v_w1w1cg_k$(lado.x_rqsusy_k$(y));
      }
       while (inductionVariable < 10);
    return lado.x_rqsusy_k$(y);
  }
  function planificarT$curva(n, xi, xf, c) {
    var tmp = 0;
    var tmp_0 = new Float64Array(n);
    while (tmp < n) {
      var tmp_1 = tmp;
      tmp_0[tmp_1] = xi + (xf - xi) * tmp_1 / (n - 1 | 0);
      tmp = tmp + 1 | 0;
    }
    var cx = tmp_0;
    var tmp_2 = 0;
    var tmp_3 = new Float64Array(n);
    while (tmp_2 < n) {
      var tmp_4 = tmp_2;
      tmp_3[tmp_4] = c.v_w1w1cg_k$(cx[tmp_4]);
      tmp_2 = tmp_2 + 1 | 0;
    }
    var cy = tmp_3;
    var cum = new Float64Array(n);
    var inductionVariable = 1;
    if (inductionVariable < n)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp_5 = cum[i - 1 | 0];
        // Inline function 'kotlin.math.sqrt' call
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.planificarT.curva.<anonymous>' call
        var it = cx[i] - cx[i - 1 | 0];
        var tmp_6 = it * it;
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.planificarT.curva.<anonymous>' call
        var it_0 = cy[i] - cy[i - 1 | 0];
        var x = tmp_6 + it_0 * it_0;
        cum[i] = tmp_5 + Math.sqrt(x);
      }
       while (inductionVariable < n);
    var tot = cum[n - 1 | 0];
    // Inline function 'kotlin.arrayOf' call
    var tmp_7 = 0;
    var tmp_8 = new Float64Array(n);
    while (tmp_7 < n) {
      var tmp_9 = tmp_7;
      tmp_8[tmp_9] = cum[tmp_9] / tot;
      tmp_7 = tmp_7 + 1 | 0;
    }
    // Inline function 'kotlin.doubleArrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [cx, cy, tmp_8, new Float64Array([tot])];
  }
  function elementosCalc$limiar(w, h, bz, g, media, c) {
    var tmp = 0;
    var tmp_0 = imul(w, h);
    var tmp_1 = new Int32Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      var x = tmp_2 % w | 0;
      var y = tmp_2 / w | 0;
      tmp_1[tmp_2] = (((x < bz ? true : y < bz) ? true : x >= (w - bz | 0)) ? true : y >= (h - bz | 0)) ? 0 : g[tmp_2] < media[tmp_2] - c ? 1 : 0;
      tmp = tmp + 1 | 0;
    }
    return tmp_1;
  }
  function campo$perfil(h, f, sel, alvo) {
    // Inline function 'kotlin.collections.sortedBy' call
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(sel, 10));
    var tmp0_iterator = sel.iterator_jk1svi_k$();
    while (tmp0_iterator.hasNext_bitz1p_k$()) {
      var item = tmp0_iterator.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.campo.perfil.<anonymous>' call
      var el = item.component1_7eebsc_k$();
      var p = item.component2_7eebsb_k$();
      var tmp$ret$0 = to(interp(CorrecaoPaginas_getInstance(), p, el.xs_1, el.ys_1), p - alvo);
      destination.add_utx5q5_k$(tmp$ret$0);
    }
    // Inline function 'kotlin.comparisons.compareBy' call
    var tmp = CorrecaoPaginas$campo$perfil$lambda;
    var tmp$ret$3 = new sam$kotlin_Comparator$0_4(tmp);
    var pts = sortedWith(destination, tmp$ret$3);
    if (pts.get_size_woubt6_k$() < 3)
      return new Float64Array(h);
    var tmp_0 = 0;
    var tmp_1 = new Float64Array(h);
    while (tmp_0 < h) {
      var tmp_2 = tmp_0;
      var tmp_3 = CorrecaoPaginas_getInstance();
      var tmp_4 = tmp_2;
      var tmp_5 = 0;
      var tmp_6 = pts.get_size_woubt6_k$();
      var tmp_7 = new Float64Array(tmp_6);
      while (tmp_5 < tmp_6) {
        var tmp_8 = tmp_5;
        tmp_7[tmp_8] = pts.get_c1px32_k$(tmp_8).first_1;
        tmp_5 = tmp_5 + 1 | 0;
      }
      var tmp_9 = 0;
      var tmp_10 = pts.get_size_woubt6_k$();
      var tmp_11 = new Float64Array(tmp_10);
      while (tmp_9 < tmp_10) {
        var tmp_12 = tmp_9;
        tmp_11[tmp_12] = pts.get_c1px32_k$(tmp_12).second_1;
        tmp_9 = tmp_9 + 1 | 0;
      }
      tmp_1[tmp_2] = interp(tmp_3, tmp_4, tmp_7, tmp_11);
      tmp_0 = tmp_0 + 1 | 0;
    }
    var v = tmp_1;
    // Inline function 'kotlin.collections.map' call
    var this_0 = suavizar(CorrecaoPaginas_getInstance(), v, 25 * f);
    // Inline function 'kotlin.collections.mapTo' call
    var destination_0 = ArrayList_init_$Create$_0(this_0.length);
    var inductionVariable = 0;
    var last = this_0.length;
    while (inductionVariable < last) {
      var item_0 = this_0[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.campo.perfil.<anonymous>' call
      var tmp$ret$8 = coerceIn(item_0, -25 * f, 25 * f);
      destination_0.add_utx5q5_k$(tmp$ret$8);
    }
    return toDoubleArray(destination_0);
  }
  function vizinhos$chave(i, j) {
    // Inline function 'kotlin.Long.plus' call
    return toLong(i).times_nfzjiw_k$(new Long(100000, 0)).plus_r93sks_k$(toLong(j));
  }
  function orientacaoComConfianca$alongados(p, m, horizontal) {
    var cs = componentes(CorrecaoPaginas_getInstance(), m, p.w_1, p.h_1).component2_7eebsb_k$();
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlin.collections.count' call
      var tmp;
      if (isInterface(cs, Collection)) {
        tmp = cs.isEmpty_y1axqb_k$();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = 0;
        break $l$block;
      }
      var count = 0;
      var tmp0_iterator = cs.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.orientacaoComConfianca.alongados.<anonymous>' call
        var cw = (element.x1__1 - element.x0__1 | 0) + 1 | 0;
        var ch = (element.y1__1 - element.y0__1 | 0) + 1 | 0;
        if (((element.area_1 > 10 ? cw < 0.5 * p.w_1 : false) ? ch < 0.5 * p.h_1 : false) ? horizontal ? cw > 2.5 * ch : ch > 2.5 * cw : false) {
          count = count + 1 | 0;
          checkCountOverflow(count);
        }
      }
      tmp$ret$0 = count;
    }
    return tmp$ret$0;
  }
  function orientacaoComConfianca$maiorTroco(len, at) {
    var b = 0;
    var c = 0;
    var inductionVariable = 0;
    if (inductionVariable < len)
      do {
        var k = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (at(k) === 1) {
          c = c + 1 | 0;
          if (c > b)
            b = c;
        } else
          c = 0;
      }
       while (inductionVariable < len);
    return b;
  }
  function limparMargens$escuro(g, w, med, x, y) {
    return g[imul(y, w) + x | 0] < med[imul(y, w) + x | 0] - 12.0;
  }
  function limparMargens$cobCol(cy0, cy1, g, w, med, x) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlin.collections.count' call
      var this_0 = step(numberRangeToNumber(cy0, cy1), 2);
      var tmp;
      if (isInterface(this_0, Collection)) {
        tmp = this_0.isEmpty_y1axqb_k$();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = 0;
        break $l$block;
      }
      var count = 0;
      var tmp0_iterator = this_0.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.limparMargens.cobCol.<anonymous>' call
        if (limparMargens$escuro(g, w, med, x, element)) {
          count = count + 1 | 0;
          checkCountOverflow(count);
        }
      }
      tmp$ret$0 = count;
    }
    return tmp$ret$0 / (((cy1 - cy0 | 0) / 2 | 0) + 1 | 0);
  }
  function limparMargens$cobLin(cx0, cx1, g, w, med, y) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlin.collections.count' call
      var this_0 = step(numberRangeToNumber(cx0, cx1), 2);
      var tmp;
      if (isInterface(this_0, Collection)) {
        tmp = this_0.isEmpty_y1axqb_k$();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = 0;
        break $l$block;
      }
      var count = 0;
      var tmp0_iterator = this_0.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.limparMargens.cobLin.<anonymous>' call
        if (limparMargens$escuro(g, w, med, element, y)) {
          count = count + 1 | 0;
          checkCountOverflow(count);
        }
      }
      tmp$ret$0 = count;
    }
    return tmp$ret$0 / (((cx1 - cx0 | 0) / 2 | 0) + 1 | 0);
  }
  function limparMargens$bordo(inicio, fim, passo, cob, total) {
    // Inline function 'kotlin.math.max' call
    var b = numberToInt(0.006 * total);
    var faixaMin = Math.max(2, b);
    var brancas = 0;
    var k = inicio;
    while (!(k === fim)) {
      var c = cob(k);
      if (c < 0.03) {
        brancas = brancas + 1 | 0;
      } else if (c >= 0.2 ? brancas >= faixaMin : false)
        return k;
      else if (c >= 0.03)
        brancas = 0;
      k = k + passo | 0;
    }
    return null;
  }
  function apagarRiscas$linha(len, at) {
    var n = 0;
    var a = -1;
    var b = -1;
    var trocos = 0;
    var ant = 0;
    var inductionVariable = 0;
    if (inductionVariable < len)
      do {
        var k = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var v = at(k);
        if (v === 1) {
          n = n + 1 | 0;
          if (a < 0)
            a = k;
          b = k;
          if (ant === 0) {
            trocos = trocos + 1 | 0;
          }
        }
        ant = v;
      }
       while (inductionVariable < len);
    if (a < 0)
      return false;
    var tmp = n;
    // Inline function 'kotlin.math.max' call
    var b_0 = trocos;
    if (tmp / Math.max(1, b_0) < 0.006 * len)
      return false;
    return (!CorrecaoPaginas_getInstance().CONTINUA_SO_1 ? n >= 0.12 * len : false) ? (b - a | 0) >= 0.5 * len : false;
  }
  function apagarRiscas$troco(len, at) {
    var best = 0;
    var cur = 0;
    var falha = 0;
    var inductionVariable = 0;
    if (inductionVariable < len)
      do {
        var k = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (at(k) === 1) {
          cur = cur + 1 | 0;
          falha = 0;
        } else {
          falha = falha + 1 | 0;
          if (falha > 2) {
            cur = 0;
            falha = 0;
          }
        }
        if (cur > best)
          best = cur;
      }
       while (inductionVariable < len);
    return best;
  }
  function apagarRiscas$nosVertices(len, at) {
    // Inline function 'kotlin.math.max' call
    var b = numberToInt(0.12 * len);
    var faixa = Math.max(4, b);
    var a = 0;
    var b_0 = 0;
    var inductionVariable = 0;
    if (inductionVariable < faixa)
      do {
        var k = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        a = a + at(k) | 0;
        b_0 = b_0 + at((len - 1 | 0) - k | 0) | 0;
      }
       while (inductionVariable < faixa);
    return a >= 0.4 * faixa ? true : b_0 >= 0.4 * faixa;
  }
  function equilibrarBrancos$med(ns, h) {
    var a2 = 0;
    var inductionVariable = 0;
    if (inductionVariable <= 255)
      do {
        var v = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        a2 = a2 + h[v] | 0;
        if (a2 >= (ns._v / 2 | 0))
          return v;
      }
       while (inductionVariable <= 255);
    return 255.0;
  }
  function normalizar$canal(f, v) {
    // Inline function 'kotlin.math.min' call
    var b = v * f;
    var n = Math.min(255.0, b);
    return numberToInt(coerceIn_1(255.0 - (255.0 - n) * 1.12, 0.0, 255.0));
  }
  function aparar$fundo($img, w, x, y) {
    return sat(CorrecaoPaginas_getInstance(), $img.px_1[imul(y, w) + x | 0]) >= 30;
  }
  function aparar$fracLinha(l, r, $img, w, y) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlin.collections.count' call
      var this_0 = until(l._v, r._v);
      var tmp;
      if (isInterface(this_0, Collection)) {
        tmp = this_0.isEmpty_y1axqb_k$();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = 0;
        break $l$block;
      }
      var count = 0;
      var tmp0_iterator = this_0.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.aparar.fracLinha.<anonymous>' call
        if (aparar$fundo($img, w, element, y)) {
          count = count + 1 | 0;
          checkCountOverflow(count);
        }
      }
      tmp$ret$0 = count;
    }
    var tmp_0 = tmp$ret$0;
    // Inline function 'kotlin.math.max' call
    var b = r._v - l._v | 0;
    return tmp_0 / Math.max(1, b);
  }
  function aparar$fracCol(t, b, $img, w, x) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlin.collections.count' call
      var this_0 = until(t._v, b._v);
      var tmp;
      if (isInterface(this_0, Collection)) {
        tmp = this_0.isEmpty_y1axqb_k$();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = 0;
        break $l$block;
      }
      var count = 0;
      var tmp0_iterator = this_0.iterator_jk1svi_k$();
      while (tmp0_iterator.hasNext_bitz1p_k$()) {
        var element = tmp0_iterator.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.aparar.fracCol.<anonymous>' call
        if (aparar$fundo($img, w, x, element)) {
          count = count + 1 | 0;
          checkCountOverflow(count);
        }
      }
      tmp$ret$0 = count;
    }
    var tmp_0 = tmp$ret$0;
    // Inline function 'kotlin.math.max' call
    var b_0 = b._v - t._v | 0;
    return tmp_0 / Math.max(1, b_0);
  }
  function CorrecaoPaginas$processarLivro$lambda($orig) {
    return function (_anonymous_parameter_0__qggqh8, lado) {
      return reduzir(CorrecaoPaginas_getInstance(), $orig, lado);
    };
  }
  function CorrecaoPaginas$processarLivro$lambda_0($res) {
    return function (it) {
      $res.add_utx5q5_k$(it);
      return Unit_getInstance();
    };
  }
  function CorrecaoPaginas$blocoPlano$lambda(a, b) {
    // Inline function 'kotlin.comparisons.compareValuesBy' call
    // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.blocoPlano.<anonymous>' call
    var tmp = average(a.ys_1);
    // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.blocoPlano.<anonymous>' call
    var tmp$ret$1 = average(b.ys_1);
    return compareValues(tmp, tmp$ret$1);
  }
  function CorrecaoPaginas$blocoPlano$lambda_0($sc, $ox, $wB, $oy, $hB, $tl, $tr, $topo, $bl, $br, $base, $esq, $dir, $img) {
    return function (x, y, o) {
      var u = (x / $sc - $ox) / $wB;
      var v = (y / $sc - $oy) / $hB;
      var txX = $tl[0] + ($tr[0] - $tl[0]) * u;
      var tY = $topo.v_w1w1cg_k$(txX);
      var bxX = $bl[0] + ($br[0] - $bl[0]) * u;
      var bY = $base.v_w1w1cg_k$(bxX);
      var lyY = $tl[1] + ($bl[1] - $tl[1]) * v;
      var lX = $esq.v_w1w1cg_k$(lyY);
      var ryY = $tr[1] + ($br[1] - $tr[1]) * v;
      var rX = $dir.v_w1w1cg_k$(ryY);
      var px = (1 - v) * txX + v * bxX + (1 - u) * lX + u * rX - ((1 - u) * (1 - v) * $tl[0] + u * (1 - v) * $tr[0] + (1 - u) * v * $bl[0] + u * v * $br[0]);
      var py = (1 - v) * tY + v * bY + (1 - u) * lyY + u * ryY - ((1 - u) * (1 - v) * $tl[1] + u * (1 - v) * $tr[1] + (1 - u) * v * $bl[1] + u * v * $br[1]);
      var ix = px * $sc;
      var iy = py * $sc;
      var tmp;
      if (((ix < 0.0 ? true : iy < 0.0) ? true : ix > ($img.w_1 - 1 | 0)) ? true : iy > ($img.h_1 - 1 | 0)) {
        DoubleCompanionObject_getInstance();
        o[0] = NaN;
        DoubleCompanionObject_getInstance();
        o[1] = NaN;
        tmp = Unit_getInstance();
      } else {
        o[0] = ix;
        o[1] = iy;
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function CorrecaoPaginas$contornoPagina$lambda($ins, $wo, $ho, $k, $txs, $tys, $bxs, $bys, $tl, $bl, $tr, $br, $sc) {
    return function (x, y, o) {
      var u = $ins + (1 - 2 * $ins) * coerceIn(x / ($wo - 1 | 0), 0.0, 1.0);
      var v = $ins + (1 - 2 * $ins) * coerceIn(y / ($ho - 1 | 0), 0.0, 1.0);
      var fi = u * $k;
      // Inline function 'kotlin.math.min' call
      var a = $k - 1 | 0;
      var b = numberToInt(fi);
      var i0 = Math.min(a, b);
      var f = fi - i0;
      var tX = $txs[i0] + ($txs[i0 + 1 | 0] - $txs[i0]) * f;
      var tY = $tys[i0] + ($tys[i0 + 1 | 0] - $tys[i0]) * f;
      var bX = $bxs[i0] + ($bxs[i0 + 1 | 0] - $bxs[i0]) * f;
      var bY = $bys[i0] + ($bys[i0 + 1 | 0] - $bys[i0]) * f;
      var lX = $tl[0] + ($bl[0] - $tl[0]) * v;
      var lY = $tl[1] + ($bl[1] - $tl[1]) * v;
      var rX = $tr[0] + ($br[0] - $tr[0]) * v;
      var rY = $tr[1] + ($br[1] - $tr[1]) * v;
      var px = (1 - v) * tX + v * bX + (1 - u) * lX + u * rX - ((1 - u) * (1 - v) * $tl[0] + u * (1 - v) * $tr[0] + (1 - u) * v * $bl[0] + u * v * $br[0]);
      var py = (1 - v) * tY + v * bY + (1 - u) * lY + u * rY - ((1 - u) * (1 - v) * $tl[1] + u * (1 - v) * $tr[1] + (1 - u) * v * $bl[1] + u * v * $br[1]);
      o[0] = px * $sc;
      o[1] = py * $sc;
      return Unit_getInstance();
    };
  }
  function CorrecaoPaginas$tEscala$lambda($wp, $wc, $hp, $hc) {
    return function (x, y, o) {
      var tmp = x * ($wp - 1 | 0);
      // Inline function 'kotlin.math.max' call
      var b = $wc - 1 | 0;
      o[0] = tmp / Math.max(1, b);
      var tmp_0 = y * ($hp - 1 | 0);
      // Inline function 'kotlin.math.max' call
      var b_0 = $hc - 1 | 0;
      o[1] = tmp_0 / Math.max(1, b_0);
      return Unit_getInstance();
    };
  }
  function CorrecaoPaginas$processarDocumento$lambda(_anonymous_parameter_0__qggqh8, _anonymous_parameter_1__qggqgd) {
    return Unit_getInstance();
  }
  function CorrecaoPaginas$paginasFinais$lambda($bp, $s0, $ef, $kf, $sf, $fundo, $fsx, $fsy, $fq, $p0, $caixa, $pad) {
    return function (x, y, o) {
      var xp = $bp.ox_1 + (x * $s0 - $ef) / ($kf * $s0);
      var yp = $bp.oy_1 + (y * $s0 - $sf) / ($kf * $s0);
      var tmp;
      if (!($fundo == null)) {
        var ix = numberToInt(xp * $fsx);
        var iy = numberToInt(yp * $fsy);
        var tmp_0;
        if (((0 <= ix ? ix < $fq.w_1 : false) ? 0 <= iy ? iy < $fq.h_1 : false : false) ? $fundo[imul(iy, $fq.w_1) + ix | 0] === 1 : false) {
          DoubleCompanionObject_getInstance();
          o[0] = NaN;
          DoubleCompanionObject_getInstance();
          o[1] = NaN;
          return Unit_getInstance();
        }
        tmp = tmp_0;
      }
      var tmp_1;
      switch ($p0.lombadaADireita_1) {
        case true:
          tmp_1 = xp > $bp.ox_1 + $bp.wBloco_1 * 1.12;
          break;
        case false:
          tmp_1 = xp < $bp.ox_1 - $bp.wBloco_1 * 0.12;
          break;
        case null:
          tmp_1 = false;
          break;
        default:
          noWhenBranchMatchedException();
          break;
      }
      var foraLombada = tmp_1;
      var tmp_2;
      if (foraLombada ? true : !($caixa == null) ? ((xp < $caixa[0] - $pad ? true : xp > $caixa[2] + $pad) ? true : yp < $caixa[1] - $pad) ? true : yp > $caixa[3] + $pad : false) {
        DoubleCompanionObject_getInstance();
        o[0] = NaN;
        DoubleCompanionObject_getInstance();
        o[1] = NaN;
        tmp_2 = Unit_getInstance();
      } else {
        o[0] = xp;
        o[1] = yp;
        tmp_2 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function CorrecaoPaginas$tColocacao$lambda($s0, $x0, $esq, $k, $cx, $supEf, $pad, $p) {
    return function (x, y, o) {
      var px = x * $s0;
      var py = y * $s0;
      var xw = $x0._v + (px - $esq) / $k._v;
      var yw = $cx[1] + (py - $supEf._v) / $k._v;
      var tmp;
      if (((((((xw < $cx[0] - $pad ? true : xw > $cx[2] + $pad) ? true : yw < $cx[1] - $pad) ? true : yw > $cx[3] + $pad) ? true : xw < 0.0) ? true : yw < 0.0) ? true : xw > ($p.img_1.w_1 - 1 | 0)) ? true : yw > ($p.img_1.h_1 - 1 | 0)) {
        DoubleCompanionObject_getInstance();
        o[0] = NaN;
        DoubleCompanionObject_getInstance();
        o[1] = NaN;
        tmp = Unit_getInstance();
      } else {
        o[0] = xw;
        o[1] = yw;
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function CorrecaoPaginas$tRodar$lambda($h) {
    return function (x, y, o) {
      o[0] = y;
      o[1] = ($h - 1 | 0) - x;
      return Unit_getInstance();
    };
  }
  function CorrecaoPaginas$tRodar$lambda_0($w) {
    return function (x, y, o) {
      o[0] = ($w - 1 | 0) - y;
      o[1] = x;
      return Unit_getInstance();
    };
  }
  function CorrecaoPaginas$tRodar$lambda_1($w, $h) {
    return function (x, y, o) {
      o[0] = ($w - 1 | 0) - x;
      o[1] = ($h - 1 | 0) - y;
      return Unit_getInstance();
    };
  }
  function CorrecaoPaginas$tRecorte$lambda($x0, $y0) {
    return function (x, y, o) {
      o[0] = x + $x0;
      o[1] = y + $y0;
      return Unit_getInstance();
    };
  }
  function CorrecaoPaginas$tAngulo$lambda($cx, $cy, $cs, $sn) {
    return function (x, y, o) {
      var dx = x - $cx;
      var dy = y - $cy;
      o[0] = $cx + dx * $cs - dy * $sn;
      o[1] = $cy + dx * $sn + dy * $cs;
      return Unit_getInstance();
    };
  }
  function CorrecaoPaginas$tCampo$lambda($sy, $c, $sx, $nc, $esc) {
    return function (x, y, o) {
      var yc = coerceIn(y * $sy, 0.0, $c.h_1 - 1 | 0);
      var y0 = numberToInt(yc);
      // Inline function 'kotlin.math.min' call
      var a = $c.h_1 - 1 | 0;
      var b = y0 + 1 | 0;
      var y1 = Math.min(a, b);
      var ty = yc - y0;
      var ei = $c.ei_1[y0] + ($c.ei_1[y1] - $c.ei_1[y0]) * ty;
      var ef = $c.ef_1[y0] + ($c.ef_1[y1] - $c.ef_1[y0]) * ty;
      var xc = coerceIn(x * $sx, 0.0, $c.w_1 - 1 | 0);
      var cj = xc / $c.passo_1;
      // Inline function 'kotlin.math.min' call
      var a_0 = $nc - 1 | 0;
      var b_0 = numberToInt(cj);
      var j0 = Math.min(a_0, b_0);
      // Inline function 'kotlin.math.min' call
      var a_1 = $nc - 1 | 0;
      var b_1 = j0 + 1 | 0;
      var j1 = Math.min(a_1, b_1);
      var tx = cj - j0;
      var d0 = $c.dgs_1[j0][y0] + ($c.dgs_1[j0][y1] - $c.dgs_1[j0][y0]) * ty;
      var d1 = $c.dgs_1[j1][y0] + ($c.dgs_1[j1][y1] - $c.dgs_1[j1][y0]) * ty;
      var d = (d0 * (1 - tx) + d1 * tx) * $esc;
      var tmp;
      if (xc <= $c.mi_1) {
        tmp = ei * xc / $c.mi_1;
      } else if (xc <= $c.mf_1) {
        tmp = ei + (ef - ei) * (xc - $c.mi_1) / ($c.mf_1 - $c.mi_1);
      } else {
        var tmp_0 = ef * (($c.w_1 - 1 | 0) - xc);
        // Inline function 'kotlin.math.max' call
        var b_2 = ($c.w_1 - 1 | 0) - $c.mf_1;
        tmp = tmp_0 / Math.max(1.0, b_2);
      }
      var ex = tmp * $esc;
      o[0] = x + ex;
      o[1] = y + d;
      return Unit_getInstance();
    };
  }
  function invoke$d(desvios, k0, tk, k1, b) {
    return desvios[b][k0] * (1 - tk) + desvios[b][k1] * tk;
  }
  function CorrecaoPaginas$tLombada$lambda($inicio, $passo, $nPassos, $bandaH, $nb, $desvios) {
    return function (x, y, o) {
      var dist = (x - $inicio) / $passo;
      var tmp;
      if (dist <= 0.0) {
        o[0] = x;
        o[1] = y;
        return Unit_getInstance();
      }
      // Inline function 'kotlin.math.min' call
      var a = $nPassos;
      var b = numberToInt(dist);
      var k0 = Math.min(a, b);
      // Inline function 'kotlin.math.min' call
      var a_0 = $nPassos;
      var b_0 = k0 + 1 | 0;
      var k1 = Math.min(a_0, b_0);
      var tk = dist - k0;
      var fb = coerceIn(y / $bandaH - 0.5, 0.0, $nb - 1 | 0);
      var b0 = numberToInt(fb);
      // Inline function 'kotlin.math.min' call
      var a_1 = $nb - 1 | 0;
      var b_1 = b0 + 1 | 0;
      var b1 = Math.min(a_1, b_1);
      var tb = fb - b0;
      o[0] = x;
      o[1] = y + invoke$d($desvios, k0, tk, k1, b0) * (1 - tb) + invoke$d($desvios, k0, tk, k1, b1) * tb;
      return Unit_getInstance();
    };
  }
  function CorrecaoPaginas$reduzir$lambda($img, $f) {
    return function () {
      return redimensionar(CorrecaoPaginas_getInstance(), $img, roundToInt($img.w_1 * $f), roundToInt($img.h_1 * $f));
    };
  }
  function CorrecaoPaginas$reduzirAltura$lambda($img, $f, $alt) {
    return function () {
      var tmp = CorrecaoPaginas_getInstance();
      // Inline function 'kotlin.math.max' call
      var b = roundToInt($img.w_1 * $f);
      var tmp$ret$0 = Math.max(1, b);
      return redimensionar(tmp, $img, tmp$ret$0, $alt);
    };
  }
  function CorrecaoPaginas$mascaraPapel$lambda($img, $soCor) {
    return function () {
      return mascaraPapelCalc(CorrecaoPaginas_getInstance(), $img, $soCor);
    };
  }
  function CorrecaoPaginas$planificarT$lambda($wo, $ho, $xt, $yt, $xbA, $ybA) {
    return function (x, y, o) {
      var xi = coerceIn(x, 0.0, $wo - 1 | 0);
      var i0 = numberToInt(xi);
      // Inline function 'kotlin.math.min' call
      var a = $wo - 1 | 0;
      var b = i0 + 1 | 0;
      var i1 = Math.min(a, b);
      var tx = xi - i0;
      var v = coerceIn(y / ($ho - 1 | 0), 0.0, 1.0);
      var ax = $xt[i0] + ($xt[i1] - $xt[i0]) * tx;
      var ay = $yt[i0] + ($yt[i1] - $yt[i0]) * tx;
      var bx = $xbA[i0] + ($xbA[i1] - $xbA[i0]) * tx;
      var by = $ybA[i0] + ($ybA[i1] - $ybA[i0]) * tx;
      o[0] = ax * (1 - v) + bx * v;
      o[1] = ay * (1 - v) + by * v;
      return Unit_getInstance();
    };
  }
  function CorrecaoPaginas$elementos$lambda($img, $contraste) {
    return function () {
      return elementosCalc(CorrecaoPaginas_getInstance(), $img, $contraste);
    };
  }
  function CorrecaoPaginas$campo$lambda(a, b) {
    // Inline function 'kotlin.comparisons.compareValuesBy' call
    // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.campo.<anonymous>' call
    var tmp = a.first_1;
    // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.campo.<anonymous>' call
    var tmp$ret$1 = b.first_1;
    return compareValues(tmp, tmp$ret$1);
  }
  function CorrecaoPaginas$orientacaoComConfianca$lambda($t, $y, $p, $xa) {
    return function (x) {
      return $t[(imul($y, $p.w_1) + $xa | 0) + x | 0];
    };
  }
  function CorrecaoPaginas$orientacaoComConfianca$lambda_0($t, $ya, $p, $x) {
    return function (y) {
      return $t[imul($ya + y | 0, $p.w_1) + $x | 0];
    };
  }
  function CorrecaoPaginas$orientacaoComConfianca$lambda_1($h2, $v2) {
    return function (a2, b2) {
      // Inline function 'kotlin.math.abs' call
      var x = b2.get_cx_knto1u_k$() - a2.get_cx_knto1u_k$();
      var dx = Math.abs(x);
      // Inline function 'kotlin.math.abs' call
      var x_0 = b2.get_cy_knto1t_k$() - a2.get_cy_knto1t_k$();
      var dy = Math.abs(x_0);
      var tmp;
      if (dx > 2 * dy) {
        var tmp0 = $h2._v;
        $h2._v = tmp0 + 1 | 0;
        tmp = Unit_getInstance();
      } else if (dy > 2 * dx) {
        var tmp1 = $v2._v;
        $v2._v = tmp1 + 1 | 0;
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function CorrecaoPaginas$anguloInclinacao$lambda($ang) {
    return function (a, b) {
      var dx = b.get_cx_knto1u_k$() - a.get_cx_knto1u_k$();
      var dy = b.get_cy_knto1t_k$() - a.get_cy_knto1t_k$();
      var tmp;
      // Inline function 'kotlin.math.abs' call
      var x = dx;
      var tmp_0 = Math.abs(x);
      // Inline function 'kotlin.math.abs' call
      var x_0 = dy;
      if (tmp_0 > Math.abs(x_0)) {
        if (dx < 0.0) {
          dx = -dx;
          dy = -dy;
        }
        // Inline function 'kotlin.math.atan2' call
        var y = dy;
        var x_1 = dx;
        var tmp$ret$2 = Math.atan2(y, x_1);
        $ang.add_utx5q5_k$(tmp$ret$2 * 180 / get_PI());
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function CorrecaoPaginas$limparMargens$cobCol$ref($cy0, $cy1, $g, $w, $med) {
    var l = function (p0) {
      return limparMargens$cobCol($cy0, $cy1, $g, $w, $med, p0);
    };
    l.callableName = 'cobCol';
    return l;
  }
  function CorrecaoPaginas$limparMargens$cobCol$ref_0($cy0, $cy1, $g, $w, $med) {
    var l = function (p0) {
      return limparMargens$cobCol($cy0, $cy1, $g, $w, $med, p0);
    };
    l.callableName = 'cobCol';
    return l;
  }
  function CorrecaoPaginas$limparMargens$cobLin$ref($cx0, $cx1, $g, $w, $med) {
    var l = function (p0) {
      return limparMargens$cobLin($cx0, $cx1, $g, $w, $med, p0);
    };
    l.callableName = 'cobLin';
    return l;
  }
  function CorrecaoPaginas$limparMargens$cobLin$ref_0($cx0, $cx1, $g, $w, $med) {
    var l = function (p0) {
      return limparMargens$cobLin($cx0, $cx1, $g, $w, $med, p0);
    };
    l.callableName = 'cobLin';
    return l;
  }
  function CorrecaoPaginas$apagarRiscas$lambda($escuro, $w, $x) {
    return function (y) {
      // Inline function 'kotlin.math.max' call
      var a = $escuro[imul(y, $w) + $x | 0];
      var b = ($x + 1 | 0) < $w ? $escuro[(imul(y, $w) + $x | 0) + 1 | 0] : 0;
      return Math.max(a, b);
    };
  }
  function CorrecaoPaginas$apagarRiscas$lambda_0($escuro, $y, $w, $h) {
    return function (x) {
      // Inline function 'kotlin.math.max' call
      var a = $escuro[imul($y, $w) + x | 0];
      var b = ($y + 1 | 0) < $h ? $escuro[imul($y + 1 | 0, $w) + x | 0] : 0;
      return Math.max(a, b);
    };
  }
  function CorrecaoPaginas$campo$perfil$lambda(a, b) {
    // Inline function 'kotlin.comparisons.compareValuesBy' call
    // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.campo.perfil.<anonymous>' call
    var tmp = a.first_1;
    // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.campo.perfil.<anonymous>' call
    var tmp$ret$1 = b.first_1;
    return compareValues(tmp, tmp$ret$1);
  }
  function CorrecaoPaginas() {
    CorrecaoPaginas_instance = this;
    this.CONTINUA_SO_1 = false;
    this.depurar_1 = null;
    this.MARGEM_INT_1 = 0.13;
    this.MARGEM_EXT_1 = 0.17;
    this.MARGEM_SUP_1 = 0.12;
    this.MARGEM_INF_1 = 0.16;
    this.LADO_TRABALHO_1 = 2000;
    this.cReduzir_1 = new Cache(8);
    this.cElementos_1 = new Cache(8);
    this.cPapel_1 = new Cache(6);
    var tmp = this;
    var tmp_0 = 0;
    var tmp_1 = new Float32Array(256);
    while (tmp_0 < 256) {
      var tmp_2 = tmp_0;
      var c = tmp_2 / 255.0;
      var tmp_3;
      if (c <= 0.04045) {
        tmp_3 = c / 12.92;
      } else {
        // Inline function 'kotlin.math.pow' call
        var this_0 = (c + 0.055) / 1.055;
        tmp_3 = Math.pow(this_0, 2.4);
      }
      tmp_1[tmp_2] = tmp_3;
      tmp_0 = tmp_0 + 1 | 0;
    }
    tmp.linear_1 = tmp_1;
  }
  protoOf(CorrecaoPaginas).set_CONTINUA_SO_idnyee_k$ = function (_set____db54di) {
    this.CONTINUA_SO_1 = _set____db54di;
  };
  protoOf(CorrecaoPaginas).get_CONTINUA_SO_urljbj_k$ = function () {
    return this.CONTINUA_SO_1;
  };
  protoOf(CorrecaoPaginas).orientacaoTeste_750d4h_k$ = function (img) {
    var tmp0_container = orientacaoComConfianca(this, img);
    var c = tmp0_container.component1_7eebsc_k$();
    var conf = tmp0_container.component2_7eebsb_k$();
    var p = reduzir(this, img, 1400);
    return '' + c + ' ' + roundToInt(conf * 100) / 100.0 + ' ' + (pontuacaoLeitura(this, rodar180(this, p)) - pontuacaoLeitura(this, p) | 0);
  };
  protoOf(CorrecaoPaginas).limparMargensTeste_m5n8s6_k$ = function (img) {
    return limparMargens(this, img);
  };
  protoOf(CorrecaoPaginas).limparRiscas_o1bcyr_k$ = function (img) {
    return apagarRiscas(this, img);
  };
  protoOf(CorrecaoPaginas).set_depurar_u4rkm2_k$ = function (_set____db54di) {
    this.depurar_1 = _set____db54di;
  };
  protoOf(CorrecaoPaginas).get_depurar_qz53jo_k$ = function () {
    return this.depurar_1;
  };
  protoOf(CorrecaoPaginas).processarLivro_k6jlhl_k$ = function (orig) {
    var res = ArrayList_init_$Create$();
    var tmp = CorrecaoPaginas$processarLivro$lambda(orig);
    this.processarDocumento$default_k23moh_k$(1, tmp, CorrecaoPaginas$processarLivro$lambda_0(res));
    return res.isEmpty_y1axqb_k$() ? listOf(orig) : res;
  };
  protoOf(CorrecaoPaginas).corrigirDigitalizacao_kyut3t_k$ = function (orig) {
    return processar(this, orig, false);
  };
  protoOf(CorrecaoPaginas).processarDocumento_9cj1a2_k$ = function (n, carregar, entregar, progresso) {
    // Inline function 'kotlin.arrayOfNulls' call
    var an = fillArrayVal(Array(n), null);
    var inductionVariable = 0;
    if (inductionVariable < n)
      $l$loop: do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        progresso(i, imul(2, n));
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
        var tmp;
        try {
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
          tmp = carregar(i, 1600);
        } catch ($p) {
          var tmp_0;
          if ($p instanceof Exception) {
            var e = $p;
            tmp_0 = null;
          } else {
            if ($p instanceof Error) {
              var e_0 = $p;
              tmp_0 = null;
            } else {
              throw $p;
            }
          }
          tmp = tmp_0;
        }
        var tmp1_elvis_lhs = tmp;
        var tmp_1;
        if (tmp1_elvis_lhs == null) {
          continue $l$loop;
        } else {
          tmp_1 = tmp1_elvis_lhs;
        }
        var img = tmp_1;
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
        var tmp_2;
        try {
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
          tmp_2 = analisar(CorrecaoPaginas_getInstance(), img, null);
        } catch ($p) {
          var tmp_3;
          if ($p instanceof Exception) {
            var e_1 = $p;
            tmp_3 = null;
          } else {
            if ($p instanceof Error) {
              var e_2 = $p;
              tmp_3 = null;
            } else {
              throw $p;
            }
          }
          tmp_2 = tmp_3;
        }
        an[i] = tmp_2;
        esquecer(this);
      }
       while (inductionVariable < n);
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$_0(an.length);
    var inductionVariable_0 = 0;
    var last = an.length;
    while (inductionVariable_0 < last) {
      var item = an[inductionVariable_0];
      inductionVariable_0 = inductionVariable_0 + 1 | 0;
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
      var tmp$ret$5 = item == null ? null : item.rot_1;
      destination.add_utx5q5_k$(tmp$ret$5);
    }
    var rotOrig = destination;
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination_0 = ArrayList_init_$Create$_0(an.length);
    var inductionVariable_1 = 0;
    var last_0 = an.length;
    while (inductionVariable_1 < last_0) {
      var item_0 = an[inductionVariable_1];
      inductionVariable_1 = inductionVariable_1 + 1 | 0;
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
      var tmp1_elvis_lhs_0 = item_0 == null ? null : item_0.confRot_1;
      var tmp$ret$8 = tmp1_elvis_lhs_0 == null ? 0.0 : tmp1_elvis_lhs_0;
      destination_0.add_utx5q5_k$(tmp$ret$8);
    }
    var confOrig = destination_0;
    var inductionVariable_2 = 0;
    if (inductionVariable_2 < n)
      $l$loop_1: do {
        var i_0 = inductionVariable_2;
        inductionVariable_2 = inductionVariable_2 + 1 | 0;
        var tmp3_elvis_lhs = an[i_0];
        var tmp_4;
        if (tmp3_elvis_lhs == null) {
          continue $l$loop_1;
        } else {
          tmp_4 = tmp3_elvis_lhs;
        }
        var a = tmp_4;
        // Inline function 'kotlin.collections.filter' call
        // Inline function 'kotlin.collections.filterTo' call
        var this_0 = listOf_0([i_0 - 1 | 0, i_0 + 1 | 0]);
        var destination_1 = ArrayList_init_$Create$();
        var tmp0_iterator = this_0.iterator_jk1svi_k$();
        while (tmp0_iterator.hasNext_bitz1p_k$()) {
          var element = tmp0_iterator.next_20eer_k$();
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
          if ((0 <= element ? element < n : false) ? !(rotOrig.get_c1px32_k$(element) == null) : false) {
            destination_1.add_utx5q5_k$(element);
          }
        }
        var viz = destination_1;
        var tmp_5;
        var tmp_6;
        if ((viz.get_size_woubt6_k$() === 2 ? rotOrig.get_c1px32_k$(viz.get_c1px32_k$(0)) == rotOrig.get_c1px32_k$(viz.get_c1px32_k$(1)) : false) ? !(rotOrig.get_c1px32_k$(viz.get_c1px32_k$(0)) === a.rot_1) : false) {
          // Inline function 'kotlin.math.min' call
          var a_0 = confOrig.get_c1px32_k$(viz.get_c1px32_k$(0));
          var b = confOrig.get_c1px32_k$(viz.get_c1px32_k$(1));
          var tmp$ret$14 = Math.min(a_0, b);
          tmp_6 = a.confRot_1 < tmp$ret$14;
        } else {
          tmp_6 = false;
        }
        if (tmp_6) {
          tmp_5 = rotOrig.get_c1px32_k$(viz.get_c1px32_k$(0));
        } else {
          if (((viz.get_size_woubt6_k$() === 1 ? !(rotOrig.get_c1px32_k$(viz.get_c1px32_k$(0)) === a.rot_1) : false) ? confOrig.get_c1px32_k$(viz.get_c1px32_k$(0)) >= 0.9 : false) ? a.confRot_1 < 0.6 : false) {
            tmp_5 = rotOrig.get_c1px32_k$(viz.get_c1px32_k$(0));
          } else {
            if (((viz.get_size_woubt6_k$() === 2 ? a.confRot_1 < 0.15 : false) ? !(rotOrig.get_c1px32_k$(viz.get_c1px32_k$(0)) === a.rot_1) : false) ? confOrig.get_c1px32_k$(viz.get_c1px32_k$(0)) >= confOrig.get_c1px32_k$(viz.get_c1px32_k$(1)) : false) {
              tmp_5 = rotOrig.get_c1px32_k$(viz.get_c1px32_k$(0));
            } else {
              if ((viz.get_size_woubt6_k$() === 2 ? a.confRot_1 < 0.15 : false) ? !(rotOrig.get_c1px32_k$(viz.get_c1px32_k$(1)) === a.rot_1) : false) {
                tmp_5 = rotOrig.get_c1px32_k$(viz.get_c1px32_k$(1));
              } else {
                tmp_5 = null;
              }
            }
          }
        }
        var alvo = tmp_5;
        if (!(alvo == null)) {
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
          var tmp_7;
          try {
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
            tmp_7 = carregar(i_0, 1600);
          } catch ($p) {
            var tmp_8;
            if ($p instanceof Exception) {
              var e_3 = $p;
              tmp_8 = null;
            } else {
              if ($p instanceof Error) {
                var e_4 = $p;
                tmp_8 = null;
              } else {
                throw $p;
              }
            }
            tmp_7 = tmp_8;
          }
          var tmp4_elvis_lhs = tmp_7;
          var tmp_9;
          if (tmp4_elvis_lhs == null) {
            continue $l$loop_1;
          } else {
            tmp_9 = tmp4_elvis_lhs;
          }
          var img_0 = tmp_9;
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
          var tmp_10;
          try {
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
            tmp_10 = analisar(CorrecaoPaginas_getInstance(), img_0, alvo);
          } catch ($p) {
            var tmp_11;
            if ($p instanceof Exception) {
              var e_5 = $p;
              tmp_11 = null;
            } else {
              if ($p instanceof Error) {
                var e_6 = $p;
                tmp_11 = null;
              } else {
                throw $p;
              }
            }
            tmp_10 = tmp_11;
          }
          var tmp5_elvis_lhs = tmp_10;
          an[i_0] = tmp5_elvis_lhs == null ? a : tmp5_elvis_lhs;
        }
      }
       while (inductionVariable_2 < n);
    var validas = filterNotNull(an);
    var tmp_12;
    if (validas.get_size_woubt6_k$() >= 3) {
      var tmp$ret$19;
      $l$block: {
        // Inline function 'kotlin.collections.count' call
        var tmp_13;
        if (isInterface(validas, Collection)) {
          tmp_13 = validas.isEmpty_y1axqb_k$();
        } else {
          tmp_13 = false;
        }
        if (tmp_13) {
          tmp$ret$19 = 0;
          break $l$block;
        }
        var count = 0;
        var tmp0_iterator_0 = validas.iterator_jk1svi_k$();
        while (tmp0_iterator_0.hasNext_bitz1p_k$()) {
          var element_0 = tmp0_iterator_0.next_20eer_k$();
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
          if (element_0.duplo_1) {
            count = count + 1 | 0;
            checkCountOverflow(count);
          }
        }
        tmp$ret$19 = count;
      }
      tmp_12 = tmp$ret$19 > (validas.get_size_woubt6_k$() / 2 | 0);
    } else {
      tmp_12 = false;
    }
    if (tmp_12) {
      var tmp6_iterator = validas.iterator_jk1svi_k$();
      while (tmp6_iterator.hasNext_bitz1p_k$()) {
        var a_1 = tmp6_iterator.next_20eer_k$();
        if (!a_1.duplo_1 ? a_1.podeSerDuplo_1 : false)
          a_1.duplo_1 = true;
      }
    }
    // Inline function 'kotlin.collections.flatMap' call
    // Inline function 'kotlin.collections.flatMapTo' call
    var destination_2 = ArrayList_init_$Create$();
    var tmp0_iterator_1 = validas.iterator_jk1svi_k$();
    while (tmp0_iterator_1.hasNext_bitz1p_k$()) {
      var element_1 = tmp0_iterator_1.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
      var list = element_1.larguras_1;
      addAll(destination_2, list);
    }
    var larguras = destination_2;
    var tmp_14;
    if (larguras.get_size_woubt6_k$() >= 2) {
      var lw = mediana(this, larguras);
      // Inline function 'kotlin.collections.flatMap' call
      // Inline function 'kotlin.collections.flatMapTo' call
      var destination_3 = ArrayList_init_$Create$();
      var tmp0_iterator_2 = validas.iterator_jk1svi_k$();
      while (tmp0_iterator_2.hasNext_bitz1p_k$()) {
        var element_2 = tmp0_iterator_2.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
        var list_0 = element_2.alturas_1;
        addAll(destination_3, list_0);
      }
      var alts = destination_3;
      var ht = alts.isEmpty_y1axqb_k$() ? lw * 1.55 : max_3(alts) * 1.02;
      var mi = coerceAtLeast_0(processarDocumento$margem(validas, lw, 2, 0.12), 0.12 * lw);
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.collections.filter' call
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.flatMap' call
      // Inline function 'kotlin.collections.flatMapTo' call
      var destination_4 = ArrayList_init_$Create$();
      var tmp0_iterator_3 = validas.iterator_jk1svi_k$();
      while (tmp0_iterator_3.hasNext_bitz1p_k$()) {
        var element_3 = tmp0_iterator_3.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
        var list_1 = element_3.margens_1;
        addAll(destination_4, list_1);
      }
      // Inline function 'kotlin.collections.mapTo' call
      var destination_5 = ArrayList_init_$Create$_0(collectionSizeOrDefault(destination_4, 10));
      var tmp0_iterator_4 = destination_4.iterator_jk1svi_k$();
      while (tmp0_iterator_4.hasNext_bitz1p_k$()) {
        var item_1 = tmp0_iterator_4.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
        var tmp$ret$30 = item_1[3];
        destination_5.add_utx5q5_k$(tmp$ret$30);
      }
      // Inline function 'kotlin.collections.filterTo' call
      var destination_6 = ArrayList_init_$Create$();
      var tmp0_iterator_5 = destination_5.iterator_jk1svi_k$();
      while (tmp0_iterator_5.hasNext_bitz1p_k$()) {
        var element_4 = tmp0_iterator_5.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
        if (!isNaN_0(element_4) ? element_4 > 0.0 : false) {
          destination_6.add_utx5q5_k$(element_4);
        }
      }
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
      var tmp$ret$37 = destination_6.get_size_woubt6_k$() >= 2 ? mediana(CorrecaoPaginas_getInstance(), destination_6) * 0.9 : 0.16 * lw;
      var me = coerceIn(tmp$ret$37, mi, 0.8 * lw);
      tmp_14 = new Modelo(lw, ht, processarDocumento$margem(validas, lw, 0, 0.1), processarDocumento$margem(validas, lw, 1, 0.14), mi, me);
    } else {
      tmp_14 = null;
    }
    var modelo = tmp_14;
    // Inline function 'kotlin.collections.flatMap' call
    // Inline function 'kotlin.collections.flatMapTo' call
    var destination_7 = ArrayList_init_$Create$();
    var tmp0_iterator_6 = validas.iterator_jk1svi_k$();
    while (tmp0_iterator_6.hasNext_bitz1p_k$()) {
      var element_5 = tmp0_iterator_6.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
      var list_2 = element_5.tamanhos_1;
      addAll(destination_7, list_2);
    }
    var tams = destination_7;
    var tmp_15;
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!tams.isEmpty_y1axqb_k$()) {
      // Inline function 'kotlin.doubleArrayOf' call
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination_8 = ArrayList_init_$Create$_0(collectionSizeOrDefault(tams, 10));
      var tmp0_iterator_7 = tams.iterator_jk1svi_k$();
      while (tmp0_iterator_7.hasNext_bitz1p_k$()) {
        var item_2 = tmp0_iterator_7.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
        var tmp$ret$42 = item_2[0];
        destination_8.add_utx5q5_k$(tmp$ret$42);
      }
      var tmp_16 = mediana(this, destination_8);
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination_9 = ArrayList_init_$Create$_0(collectionSizeOrDefault(tams, 10));
      var tmp0_iterator_8 = tams.iterator_jk1svi_k$();
      while (tmp0_iterator_8.hasNext_bitz1p_k$()) {
        var item_3 = tmp0_iterator_8.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
        var tmp$ret$45 = item_3[1];
        destination_9.add_utx5q5_k$(tmp$ret$45);
      }
      tmp_15 = new Float64Array([tmp_16, mediana(this, destination_9)]);
    } else {
      tmp_15 = null;
    }
    var folha = tmp_15;
    // Inline function 'kotlin.collections.flatMap' call
    // Inline function 'kotlin.collections.flatMapTo' call
    var destination_10 = ArrayList_init_$Create$();
    var tmp0_iterator_9 = validas.iterator_jk1svi_k$();
    while (tmp0_iterator_9.hasNext_bitz1p_k$()) {
      var element_6 = tmp0_iterator_9.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
      var list_3 = element_6.blocos_1;
      addAll(destination_10, list_3);
    }
    var bls = destination_10;
    var tmp_17;
    if (bls.get_size_woubt6_k$() >= 1) {
      // Inline function 'kotlin.collections.maxOf' call
      var iterator = bls.iterator_jk1svi_k$();
      if (!iterator.hasNext_bitz1p_k$())
        throw NoSuchElementException_init_$Create$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
      var maxValue = iterator.next_20eer_k$()[1];
      while (iterator.hasNext_bitz1p_k$()) {
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
        var v = iterator.next_20eer_k$()[1];
        // Inline function 'kotlin.comparisons.maxOf' call
        var a_2 = maxValue;
        maxValue = Math.max(a_2, v);
      }
      var hMax = maxValue;
      // Inline function 'kotlin.doubleArrayOf' call
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination_11 = ArrayList_init_$Create$_0(collectionSizeOrDefault(bls, 10));
      var tmp0_iterator_10 = bls.iterator_jk1svi_k$();
      while (tmp0_iterator_10.hasNext_bitz1p_k$()) {
        var item_4 = tmp0_iterator_10.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
        var tmp$ret$56 = item_4[0];
        destination_11.add_utx5q5_k$(tmp$ret$56);
      }
      var tmp_18 = mediana(this, destination_11);
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.filter' call
      // Inline function 'kotlin.collections.filterTo' call
      var destination_12 = ArrayList_init_$Create$();
      var tmp0_iterator_11 = bls.iterator_jk1svi_k$();
      while (tmp0_iterator_11.hasNext_bitz1p_k$()) {
        var element_7 = tmp0_iterator_11.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
        if (element_7[1] >= 0.85 * hMax) {
          destination_12.add_utx5q5_k$(element_7);
        }
      }
      // Inline function 'kotlin.collections.mapTo' call
      var destination_13 = ArrayList_init_$Create$_0(collectionSizeOrDefault(destination_12, 10));
      var tmp0_iterator_12 = destination_12.iterator_jk1svi_k$();
      while (tmp0_iterator_12.hasNext_bitz1p_k$()) {
        var item_5 = tmp0_iterator_12.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
        var tmp$ret$62 = item_5[1];
        destination_13.add_utx5q5_k$(tmp$ret$62);
      }
      tmp_17 = new Float64Array([tmp_18, mediana(this, destination_13)]);
    } else {
      tmp_17 = null;
    }
    var blocoComum = tmp_17;
    // Inline function 'kotlin.collections.flatMap' call
    // Inline function 'kotlin.collections.flatMapTo' call
    var destination_14 = ArrayList_init_$Create$();
    var tmp0_iterator_13 = validas.iterator_jk1svi_k$();
    while (tmp0_iterator_13.hasNext_bitz1p_k$()) {
      var element_8 = tmp0_iterator_13.next_20eer_k$();
      // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
      var list_4 = element_8.proporcoes_1;
      addAll(destination_14, list_4);
    }
    var props = destination_14;
    var tmp_19;
    if (props.get_size_woubt6_k$() >= 2) {
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination_15 = ArrayList_init_$Create$_0(collectionSizeOrDefault(props, 10));
      var tmp0_iterator_14 = props.iterator_jk1svi_k$();
      while (tmp0_iterator_14.hasNext_bitz1p_k$()) {
        var item_6 = tmp0_iterator_14.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
        var tmp$ret$69 = item_6[0];
        destination_15.add_utx5q5_k$(tmp$ret$69);
      }
      tmp_19 = coerceIn(mediana(this, destination_15), 0.3, 0.8);
    } else {
      tmp_19 = 0.58;
    }
    var propExt = tmp_19;
    var tmp_20;
    if (props.get_size_woubt6_k$() >= 2) {
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination_16 = ArrayList_init_$Create$_0(collectionSizeOrDefault(props, 10));
      var tmp0_iterator_15 = props.iterator_jk1svi_k$();
      while (tmp0_iterator_15.hasNext_bitz1p_k$()) {
        var item_7 = tmp0_iterator_15.next_20eer_k$();
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
        var tmp$ret$72 = item_7[1];
        destination_16.add_utx5q5_k$(tmp$ret$72);
      }
      tmp_20 = coerceIn(mediana(this, destination_16), 0.25, 0.7);
    } else {
      tmp_20 = 0.45;
    }
    var propSup = tmp_20;
    var tmp_21;
    if (!(folha == null) ? !(blocoComum == null) : false) {
      // Inline function 'kotlin.doubleArrayOf' call
      // Inline function 'kotlin.math.max' call
      var a_3 = folha[0];
      var b_0 = blocoComum[0] * 1.05;
      var tmp_22 = Math.max(a_3, b_0);
      // Inline function 'kotlin.math.max' call
      var a_4 = folha[1];
      var b_1 = blocoComum[1] * 1.05;
      var tmp$ret$76 = Math.max(a_4, b_1);
      tmp_21 = new Float64Array([tmp_22, tmp$ret$76]);
    } else if (!(folha == null)) {
      tmp_21 = folha;
    } else if (!(blocoComum == null)) {
      // Inline function 'kotlin.doubleArrayOf' call
      tmp_21 = new Float64Array([blocoComum[0] * 1.2999999999999998, blocoComum[1] + blocoComum[0] * 0.28]);
    } else {
      tmp_21 = null;
    }
    var folhaFinal = tmp_21;
    var inductionVariable_3 = 0;
    if (inductionVariable_3 < n)
      $l$loop_2: do {
        var i_1 = inductionVariable_3;
        inductionVariable_3 = inductionVariable_3 + 1 | 0;
        progresso(n + i_1 | 0, imul(2, n));
        var a_5 = an[i_1];
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
        var tmp_23;
        try {
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
          tmp_23 = carregar(i_1, 4000);
        } catch ($p) {
          var tmp_24;
          if ($p instanceof Exception) {
            var e_7 = $p;
            tmp_24 = null;
          } else {
            if ($p instanceof Error) {
              var e_8 = $p;
              tmp_24 = null;
            } else {
              throw $p;
            }
          }
          tmp_23 = tmp_24;
        }
        var tmp8_elvis_lhs = tmp_23;
        var tmp_25;
        if (tmp8_elvis_lhs == null) {
          continue $l$loop_2;
        } else {
          tmp_25 = tmp8_elvis_lhs;
        }
        var orig = tmp_25;
        // Inline function 'kotlin.math.max' call
        var a_6 = orig.w_1;
        var b_2 = orig.h_1;
        var L = Math.max(a_6, b_2);
        // Inline function 'kotlin.collections.map' call
        // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentarValor' call
        var padrao = emptyList();
        var tmp_26;
        try {
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
          tmp_26 = paginasFinais(CorrecaoPaginas_getInstance(), orig, a_5, modelo, folhaFinal, blocoComum, propExt, propSup);
        } catch ($p) {
          var tmp_27;
          if ($p instanceof Exception) {
            var e_9 = $p;
            tmp_27 = padrao;
          } else {
            if ($p instanceof Error) {
              var e_10 = $p;
              tmp_27 = padrao;
            } else {
              throw $p;
            }
          }
          tmp_26 = tmp_27;
        }
        var this_1 = tmp_26;
        // Inline function 'kotlin.collections.mapTo' call
        var destination_17 = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_1, 10));
        var tmp0_iterator_16 = this_1.iterator_jk1svi_k$();
        while (tmp0_iterator_16.hasNext_bitz1p_k$()) {
          var item_8 = tmp0_iterator_16.next_20eer_k$();
          // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>' call
          var tmp_28;
          if (folhaFinal == null) {
            tmp_28 = item_8;
          } else {
            // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.tentar' call
            CorrecaoPaginas_getInstance();
            var tmp_29;
            try {
              // Inline function 'pt.decisaoessencial.digitalizador.CorrecaoPaginas.processarDocumento.<anonymous>.<anonymous>' call
              tmp_29 = ajustarTamanho(CorrecaoPaginas_getInstance(), item_8, roundToInt(folhaFinal[0] * L), roundToInt(folhaFinal[1] * L));
            } catch ($p) {
              var tmp_30;
              if ($p instanceof Exception) {
                var e_11 = $p;
                tmp_30 = item_8;
              } else {
                if ($p instanceof Error) {
                  var e_12 = $p;
                  tmp_30 = item_8;
                } else {
                  throw $p;
                }
              }
              tmp_29 = tmp_30;
            }
            tmp_28 = tmp_29;
          }
          var tmp$ret$86 = tmp_28;
          destination_17.add_utx5q5_k$(tmp$ret$86);
        }
        var paginas = destination_17;
        esquecer(this);
        if (paginas.isEmpty_y1axqb_k$())
          entregar(orig);
        else {
          // Inline function 'kotlin.collections.forEach' call
          var tmp0_iterator_17 = paginas.iterator_jk1svi_k$();
          while (tmp0_iterator_17.hasNext_bitz1p_k$()) {
            var element_9 = tmp0_iterator_17.next_20eer_k$();
            entregar(element_9);
          }
        }
      }
       while (inductionVariable_3 < n);
  };
  protoOf(CorrecaoPaginas).processarDocumento$default_k23moh_k$ = function (n, carregar, entregar, progresso, $super) {
    var tmp;
    if (progresso === VOID) {
      tmp = CorrecaoPaginas$processarDocumento$lambda;
    } else {
      tmp = progresso;
    }
    progresso = tmp;
    var tmp_0;
    if ($super === VOID) {
      this.processarDocumento_9cj1a2_k$(n, carregar, entregar, progresso);
      tmp_0 = Unit_getInstance();
    } else {
      tmp_0 = $super.processarDocumento_9cj1a2_k$.call(this, n, carregar, entregar, progresso);
    }
    return tmp_0;
  };
  var CorrecaoPaginas_instance;
  function CorrecaoPaginas_getInstance() {
    if (CorrecaoPaginas_instance == null)
      new CorrecaoPaginas();
    return CorrecaoPaginas_instance;
  }
  function ImagemJs(w, h, px) {
    this.w = w;
    this.h = h;
    this.px = px;
  }
  protoOf(ImagemJs).get_w_1mhr66_k$ = function () {
    return this.w;
  };
  protoOf(ImagemJs).get_h_1mhr5r_k$ = function () {
    return this.h;
  };
  protoOf(ImagemJs).get_px_kntnqn_k$ = function () {
    return this.px;
  };
  function processarDocumento(n, carregar, entregar, progresso) {
    var tmp = CorrecaoPaginas_getInstance();
    var tmp_0 = processarDocumento$lambda(carregar);
    var tmp_1 = processarDocumento$lambda_0(entregar);
    tmp.processarDocumento_9cj1a2_k$(n, tmp_0, tmp_1, processarDocumento$lambda_1(progresso));
  }
  function processarDocumento$lambda($carregar) {
    return function (i, lado) {
      var tmp0_safe_receiver = $carregar(i, lado);
      var tmp;
      if (tmp0_safe_receiver == null) {
        tmp = null;
      } else {
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'pt.decisaoessencial.digitalizador.processarDocumento.<anonymous>.<anonymous>' call
        tmp = new Imagem(tmp0_safe_receiver.w, tmp0_safe_receiver.h, tmp0_safe_receiver.px);
      }
      return tmp;
    };
  }
  function processarDocumento$lambda_0($entregar) {
    return function (p) {
      $entregar(new ImagemJs(p.w_1, p.h_1, p.px_1));
      return Unit_getInstance();
    };
  }
  function processarDocumento$lambda_1($progresso) {
    return function (a, b) {
      $progresso(a, b);
      return Unit_getInstance();
    };
  }
  //region block: post-declaration
  protoOf(InternalHashMap).containsAllEntries_5fw0no_k$ = containsAllEntries;
  protoOf(CombinedContext).plus_s13ygv_k$ = plus;
  //endregion
  //region block: init
  _stableSortingIsSupported = null;
  PI = 3.141592653589793;
  OBJECT_HASH_CODE_PROPERTY_NAME = 'kotlinHashCodeValue$';
  POW_2_32 = 4.294967296E9;
  TWO_PWR_32_DBL_ = 4.294967296E9;
  TWO_PWR_63_DBL_ = 9.223372036854776E18;
  LOWER_CASE_HEX_DIGITS = '0123456789abcdef';
  UPPER_CASE_HEX_DIGITS = '0123456789ABCDEF';
  //endregion
  //region block: exports
  function $jsExportAll$(_) {
    var $pt = _.pt || (_.pt = {});
    var $pt$decisaoessencial = $pt.decisaoessencial || ($pt.decisaoessencial = {});
    var $pt$decisaoessencial$digitalizador = $pt$decisaoessencial.digitalizador || ($pt$decisaoessencial.digitalizador = {});
    $pt$decisaoessencial$digitalizador.ImagemJs = ImagemJs;
    $pt$decisaoessencial$digitalizador.processarDocumento = processarDocumento;
  }
  $jsExportAll$(_);
  //endregion
  return _;
}));
