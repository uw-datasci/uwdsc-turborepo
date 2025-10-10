
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Application
 * 
 */
export type Application = $Result.DefaultSelection<Prisma.$ApplicationPayload>
/**
 * Model ApplicationAnswer
 * 
 */
export type ApplicationAnswer = $Result.DefaultSelection<Prisma.$ApplicationAnswerPayload>
/**
 * Model Event
 * 
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>
/**
 * Model EventAttendance
 * 
 */
export type EventAttendance = $Result.DefaultSelection<Prisma.$EventAttendancePayload>
/**
 * Model Question
 * 
 */
export type Question = $Result.DefaultSelection<Prisma.$QuestionPayload>
/**
 * Model Term
 * 
 */
export type Term = $Result.DefaultSelection<Prisma.$TermPayload>
/**
 * Model Profile
 * 
 */
export type Profile = $Result.DefaultSelection<Prisma.$ProfilePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserStatus: {
  member: 'member',
  admin: 'admin',
  exec: 'exec'
};

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]


export const Faculty: {
  math: 'math',
  engineering: 'engineering',
  science: 'science',
  arts: 'arts',
  health: 'health',
  environment: 'environment',
  other_non_waterloo: 'other_non_waterloo'
};

export type Faculty = (typeof Faculty)[keyof typeof Faculty]


export const PaymentMethod: {
  cash: 'cash',
  online: 'online',
  math_soc: 'math_soc'
};

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod]


export const ApplicationStatus: {
  draft: 'draft',
  submitted: 'submitted',
  under_review: 'under_review',
  accepted: 'accepted',
  rejected: 'rejected',
  waitlisted: 'waitlisted'
};

export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus]


export const Role: {
  events_exec: 'events_exec',
  events_co_vp: 'events_co_vp',
  design_exec: 'design_exec',
  education_exec: 'education_exec',
  internal_exec: 'internal_exec',
  outreach_exec: 'outreach_exec',
  outreach_co_vp: 'outreach_co_vp',
  development_exec: 'development_exec',
  development_co_vp: 'development_co_vp',
  social_media_exec: 'social_media_exec',
  social_media_vp: 'social_media_vp',
  project_lead: 'project_lead',
  workshop_lead: 'workshop_lead',
  cxc_co_vp: 'cxc_co_vp',
  cxc_exec: 'cxc_exec',
  general: 'general',
  supplementary: 'supplementary'
};

export type Role = (typeof Role)[keyof typeof Role]


export const QuestionType: {
  text: 'text',
  textarea: 'textarea',
  multiple_choice: 'multiple_choice',
  file_upload: 'file_upload',
  checkbox: 'checkbox',
  date: 'date',
  number: 'number'
};

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType]

}

export type UserStatus = $Enums.UserStatus

export const UserStatus: typeof $Enums.UserStatus

export type Faculty = $Enums.Faculty

export const Faculty: typeof $Enums.Faculty

export type PaymentMethod = $Enums.PaymentMethod

export const PaymentMethod: typeof $Enums.PaymentMethod

export type ApplicationStatus = $Enums.ApplicationStatus

export const ApplicationStatus: typeof $Enums.ApplicationStatus

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type QuestionType = $Enums.QuestionType

export const QuestionType: typeof $Enums.QuestionType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Applications
 * const applications = await prisma.application.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Applications
   * const applications = await prisma.application.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.application`: Exposes CRUD operations for the **Application** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Applications
    * const applications = await prisma.application.findMany()
    * ```
    */
  get application(): Prisma.ApplicationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.applicationAnswer`: Exposes CRUD operations for the **ApplicationAnswer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApplicationAnswers
    * const applicationAnswers = await prisma.applicationAnswer.findMany()
    * ```
    */
  get applicationAnswer(): Prisma.ApplicationAnswerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eventAttendance`: Exposes CRUD operations for the **EventAttendance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EventAttendances
    * const eventAttendances = await prisma.eventAttendance.findMany()
    * ```
    */
  get eventAttendance(): Prisma.EventAttendanceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.question`: Exposes CRUD operations for the **Question** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Questions
    * const questions = await prisma.question.findMany()
    * ```
    */
  get question(): Prisma.QuestionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.term`: Exposes CRUD operations for the **Term** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Terms
    * const terms = await prisma.term.findMany()
    * ```
    */
  get term(): Prisma.TermDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.1
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Application: 'Application',
    ApplicationAnswer: 'ApplicationAnswer',
    Event: 'Event',
    EventAttendance: 'EventAttendance',
    Question: 'Question',
    Term: 'Term',
    Profile: 'Profile'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "application" | "applicationAnswer" | "event" | "eventAttendance" | "question" | "term" | "profile"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Application: {
        payload: Prisma.$ApplicationPayload<ExtArgs>
        fields: Prisma.ApplicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApplicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApplicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          findFirst: {
            args: Prisma.ApplicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApplicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          findMany: {
            args: Prisma.ApplicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>[]
          }
          create: {
            args: Prisma.ApplicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          createMany: {
            args: Prisma.ApplicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApplicationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>[]
          }
          delete: {
            args: Prisma.ApplicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          update: {
            args: Prisma.ApplicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          deleteMany: {
            args: Prisma.ApplicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApplicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApplicationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>[]
          }
          upsert: {
            args: Prisma.ApplicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          aggregate: {
            args: Prisma.ApplicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApplication>
          }
          groupBy: {
            args: Prisma.ApplicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApplicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApplicationCountArgs<ExtArgs>
            result: $Utils.Optional<ApplicationCountAggregateOutputType> | number
          }
        }
      }
      ApplicationAnswer: {
        payload: Prisma.$ApplicationAnswerPayload<ExtArgs>
        fields: Prisma.ApplicationAnswerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApplicationAnswerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationAnswerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApplicationAnswerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationAnswerPayload>
          }
          findFirst: {
            args: Prisma.ApplicationAnswerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationAnswerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApplicationAnswerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationAnswerPayload>
          }
          findMany: {
            args: Prisma.ApplicationAnswerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationAnswerPayload>[]
          }
          create: {
            args: Prisma.ApplicationAnswerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationAnswerPayload>
          }
          createMany: {
            args: Prisma.ApplicationAnswerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApplicationAnswerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationAnswerPayload>[]
          }
          delete: {
            args: Prisma.ApplicationAnswerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationAnswerPayload>
          }
          update: {
            args: Prisma.ApplicationAnswerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationAnswerPayload>
          }
          deleteMany: {
            args: Prisma.ApplicationAnswerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApplicationAnswerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApplicationAnswerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationAnswerPayload>[]
          }
          upsert: {
            args: Prisma.ApplicationAnswerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationAnswerPayload>
          }
          aggregate: {
            args: Prisma.ApplicationAnswerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApplicationAnswer>
          }
          groupBy: {
            args: Prisma.ApplicationAnswerGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApplicationAnswerGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApplicationAnswerCountArgs<ExtArgs>
            result: $Utils.Optional<ApplicationAnswerCountAggregateOutputType> | number
          }
        }
      }
      Event: {
        payload: Prisma.$EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          createMany: {
            args: Prisma.EventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
      EventAttendance: {
        payload: Prisma.$EventAttendancePayload<ExtArgs>
        fields: Prisma.EventAttendanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventAttendanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAttendancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventAttendanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAttendancePayload>
          }
          findFirst: {
            args: Prisma.EventAttendanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAttendancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventAttendanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAttendancePayload>
          }
          findMany: {
            args: Prisma.EventAttendanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAttendancePayload>[]
          }
          create: {
            args: Prisma.EventAttendanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAttendancePayload>
          }
          createMany: {
            args: Prisma.EventAttendanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventAttendanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAttendancePayload>[]
          }
          delete: {
            args: Prisma.EventAttendanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAttendancePayload>
          }
          update: {
            args: Prisma.EventAttendanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAttendancePayload>
          }
          deleteMany: {
            args: Prisma.EventAttendanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventAttendanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventAttendanceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAttendancePayload>[]
          }
          upsert: {
            args: Prisma.EventAttendanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAttendancePayload>
          }
          aggregate: {
            args: Prisma.EventAttendanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEventAttendance>
          }
          groupBy: {
            args: Prisma.EventAttendanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventAttendanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventAttendanceCountArgs<ExtArgs>
            result: $Utils.Optional<EventAttendanceCountAggregateOutputType> | number
          }
        }
      }
      Question: {
        payload: Prisma.$QuestionPayload<ExtArgs>
        fields: Prisma.QuestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          findFirst: {
            args: Prisma.QuestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          findMany: {
            args: Prisma.QuestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          create: {
            args: Prisma.QuestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          createMany: {
            args: Prisma.QuestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          delete: {
            args: Prisma.QuestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          update: {
            args: Prisma.QuestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          deleteMany: {
            args: Prisma.QuestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuestionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          upsert: {
            args: Prisma.QuestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          aggregate: {
            args: Prisma.QuestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestion>
          }
          groupBy: {
            args: Prisma.QuestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuestionCountArgs<ExtArgs>
            result: $Utils.Optional<QuestionCountAggregateOutputType> | number
          }
        }
      }
      Term: {
        payload: Prisma.$TermPayload<ExtArgs>
        fields: Prisma.TermFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TermFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TermPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TermFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TermPayload>
          }
          findFirst: {
            args: Prisma.TermFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TermPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TermFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TermPayload>
          }
          findMany: {
            args: Prisma.TermFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TermPayload>[]
          }
          create: {
            args: Prisma.TermCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TermPayload>
          }
          createMany: {
            args: Prisma.TermCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TermCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TermPayload>[]
          }
          delete: {
            args: Prisma.TermDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TermPayload>
          }
          update: {
            args: Prisma.TermUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TermPayload>
          }
          deleteMany: {
            args: Prisma.TermDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TermUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TermUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TermPayload>[]
          }
          upsert: {
            args: Prisma.TermUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TermPayload>
          }
          aggregate: {
            args: Prisma.TermAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTerm>
          }
          groupBy: {
            args: Prisma.TermGroupByArgs<ExtArgs>
            result: $Utils.Optional<TermGroupByOutputType>[]
          }
          count: {
            args: Prisma.TermCountArgs<ExtArgs>
            result: $Utils.Optional<TermCountAggregateOutputType> | number
          }
        }
      }
      Profile: {
        payload: Prisma.$ProfilePayload<ExtArgs>
        fields: Prisma.ProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findFirst: {
            args: Prisma.ProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findMany: {
            args: Prisma.ProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          create: {
            args: Prisma.ProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          createMany: {
            args: Prisma.ProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          delete: {
            args: Prisma.ProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          update: {
            args: Prisma.ProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          deleteMany: {
            args: Prisma.ProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          upsert: {
            args: Prisma.ProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.ProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    application?: ApplicationOmit
    applicationAnswer?: ApplicationAnswerOmit
    event?: EventOmit
    eventAttendance?: EventAttendanceOmit
    question?: QuestionOmit
    term?: TermOmit
    profile?: ProfileOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ApplicationCountOutputType
   */

  export type ApplicationCountOutputType = {
    answers: number
  }

  export type ApplicationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answers?: boolean | ApplicationCountOutputTypeCountAnswersArgs
  }

  // Custom InputTypes
  /**
   * ApplicationCountOutputType without action
   */
  export type ApplicationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicationCountOutputType
     */
    select?: ApplicationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ApplicationCountOutputType without action
   */
  export type ApplicationCountOutputTypeCountAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationAnswerWhereInput
  }


  /**
   * Count Type EventCountOutputType
   */

  export type EventCountOutputType = {
    attendances: number
  }

  export type EventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendances?: boolean | EventCountOutputTypeCountAttendancesArgs
  }

  // Custom InputTypes
  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCountOutputType
     */
    select?: EventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountAttendancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventAttendanceWhereInput
  }


  /**
   * Count Type QuestionCountOutputType
   */

  export type QuestionCountOutputType = {
    answers: number
  }

  export type QuestionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answers?: boolean | QuestionCountOutputTypeCountAnswersArgs
  }

  // Custom InputTypes
  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionCountOutputType
     */
    select?: QuestionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeCountAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationAnswerWhereInput
  }


  /**
   * Count Type TermCountOutputType
   */

  export type TermCountOutputType = {
    applications: number
    questions: number
  }

  export type TermCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | TermCountOutputTypeCountApplicationsArgs
    questions?: boolean | TermCountOutputTypeCountQuestionsArgs
  }

  // Custom InputTypes
  /**
   * TermCountOutputType without action
   */
  export type TermCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TermCountOutputType
     */
    select?: TermCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TermCountOutputType without action
   */
  export type TermCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationWhereInput
  }

  /**
   * TermCountOutputType without action
   */
  export type TermCountOutputTypeCountQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionWhereInput
  }


  /**
   * Count Type ProfileCountOutputType
   */

  export type ProfileCountOutputType = {
    applications: number
    event_attendances: number
  }

  export type ProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | ProfileCountOutputTypeCountApplicationsArgs
    event_attendances?: boolean | ProfileCountOutputTypeCountEvent_attendancesArgs
  }

  // Custom InputTypes
  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCountOutputType
     */
    select?: ProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountEvent_attendancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventAttendanceWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Application
   */

  export type AggregateApplication = {
    _count: ApplicationCountAggregateOutputType | null
    _avg: ApplicationAvgAggregateOutputType | null
    _sum: ApplicationSumAggregateOutputType | null
    _min: ApplicationMinAggregateOutputType | null
    _max: ApplicationMaxAggregateOutputType | null
  }

  export type ApplicationAvgAggregateOutputType = {
    id: number | null
    term_id: number | null
  }

  export type ApplicationSumAggregateOutputType = {
    id: bigint | null
    term_id: bigint | null
  }

  export type ApplicationMinAggregateOutputType = {
    id: bigint | null
    profile_id: string | null
    term_id: bigint | null
    resume_path: string | null
    status: $Enums.ApplicationStatus | null
    comments: string | null
    created_at: Date | null
    updated_at: Date | null
    submitted_at: Date | null
  }

  export type ApplicationMaxAggregateOutputType = {
    id: bigint | null
    profile_id: string | null
    term_id: bigint | null
    resume_path: string | null
    status: $Enums.ApplicationStatus | null
    comments: string | null
    created_at: Date | null
    updated_at: Date | null
    submitted_at: Date | null
  }

  export type ApplicationCountAggregateOutputType = {
    id: number
    profile_id: number
    term_id: number
    roles_applying_for: number
    resume_path: number
    status: number
    comments: number
    created_at: number
    updated_at: number
    submitted_at: number
    _all: number
  }


  export type ApplicationAvgAggregateInputType = {
    id?: true
    term_id?: true
  }

  export type ApplicationSumAggregateInputType = {
    id?: true
    term_id?: true
  }

  export type ApplicationMinAggregateInputType = {
    id?: true
    profile_id?: true
    term_id?: true
    resume_path?: true
    status?: true
    comments?: true
    created_at?: true
    updated_at?: true
    submitted_at?: true
  }

  export type ApplicationMaxAggregateInputType = {
    id?: true
    profile_id?: true
    term_id?: true
    resume_path?: true
    status?: true
    comments?: true
    created_at?: true
    updated_at?: true
    submitted_at?: true
  }

  export type ApplicationCountAggregateInputType = {
    id?: true
    profile_id?: true
    term_id?: true
    roles_applying_for?: true
    resume_path?: true
    status?: true
    comments?: true
    created_at?: true
    updated_at?: true
    submitted_at?: true
    _all?: true
  }

  export type ApplicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Application to aggregate.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Applications
    **/
    _count?: true | ApplicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ApplicationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ApplicationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApplicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApplicationMaxAggregateInputType
  }

  export type GetApplicationAggregateType<T extends ApplicationAggregateArgs> = {
        [P in keyof T & keyof AggregateApplication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApplication[P]>
      : GetScalarType<T[P], AggregateApplication[P]>
  }




  export type ApplicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationWhereInput
    orderBy?: ApplicationOrderByWithAggregationInput | ApplicationOrderByWithAggregationInput[]
    by: ApplicationScalarFieldEnum[] | ApplicationScalarFieldEnum
    having?: ApplicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApplicationCountAggregateInputType | true
    _avg?: ApplicationAvgAggregateInputType
    _sum?: ApplicationSumAggregateInputType
    _min?: ApplicationMinAggregateInputType
    _max?: ApplicationMaxAggregateInputType
  }

  export type ApplicationGroupByOutputType = {
    id: bigint
    profile_id: string
    term_id: bigint
    roles_applying_for: $Enums.Role[]
    resume_path: string | null
    status: $Enums.ApplicationStatus
    comments: string | null
    created_at: Date
    updated_at: Date
    submitted_at: Date | null
    _count: ApplicationCountAggregateOutputType | null
    _avg: ApplicationAvgAggregateOutputType | null
    _sum: ApplicationSumAggregateOutputType | null
    _min: ApplicationMinAggregateOutputType | null
    _max: ApplicationMaxAggregateOutputType | null
  }

  type GetApplicationGroupByPayload<T extends ApplicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApplicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApplicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApplicationGroupByOutputType[P]>
            : GetScalarType<T[P], ApplicationGroupByOutputType[P]>
        }
      >
    >


  export type ApplicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profile_id?: boolean
    term_id?: boolean
    roles_applying_for?: boolean
    resume_path?: boolean
    status?: boolean
    comments?: boolean
    created_at?: boolean
    updated_at?: boolean
    submitted_at?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    term?: boolean | TermDefaultArgs<ExtArgs>
    answers?: boolean | Application$answersArgs<ExtArgs>
    _count?: boolean | ApplicationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["application"]>

  export type ApplicationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profile_id?: boolean
    term_id?: boolean
    roles_applying_for?: boolean
    resume_path?: boolean
    status?: boolean
    comments?: boolean
    created_at?: boolean
    updated_at?: boolean
    submitted_at?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    term?: boolean | TermDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["application"]>

  export type ApplicationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profile_id?: boolean
    term_id?: boolean
    roles_applying_for?: boolean
    resume_path?: boolean
    status?: boolean
    comments?: boolean
    created_at?: boolean
    updated_at?: boolean
    submitted_at?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    term?: boolean | TermDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["application"]>

  export type ApplicationSelectScalar = {
    id?: boolean
    profile_id?: boolean
    term_id?: boolean
    roles_applying_for?: boolean
    resume_path?: boolean
    status?: boolean
    comments?: boolean
    created_at?: boolean
    updated_at?: boolean
    submitted_at?: boolean
  }

  export type ApplicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profile_id" | "term_id" | "roles_applying_for" | "resume_path" | "status" | "comments" | "created_at" | "updated_at" | "submitted_at", ExtArgs["result"]["application"]>
  export type ApplicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    term?: boolean | TermDefaultArgs<ExtArgs>
    answers?: boolean | Application$answersArgs<ExtArgs>
    _count?: boolean | ApplicationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ApplicationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    term?: boolean | TermDefaultArgs<ExtArgs>
  }
  export type ApplicationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    term?: boolean | TermDefaultArgs<ExtArgs>
  }

  export type $ApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Application"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
      term: Prisma.$TermPayload<ExtArgs>
      answers: Prisma.$ApplicationAnswerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      profile_id: string
      term_id: bigint
      roles_applying_for: $Enums.Role[]
      resume_path: string | null
      status: $Enums.ApplicationStatus
      comments: string | null
      created_at: Date
      updated_at: Date
      submitted_at: Date | null
    }, ExtArgs["result"]["application"]>
    composites: {}
  }

  type ApplicationGetPayload<S extends boolean | null | undefined | ApplicationDefaultArgs> = $Result.GetResult<Prisma.$ApplicationPayload, S>

  type ApplicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApplicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApplicationCountAggregateInputType | true
    }

  export interface ApplicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Application'], meta: { name: 'Application' } }
    /**
     * Find zero or one Application that matches the filter.
     * @param {ApplicationFindUniqueArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApplicationFindUniqueArgs>(args: SelectSubset<T, ApplicationFindUniqueArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Application that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApplicationFindUniqueOrThrowArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApplicationFindUniqueOrThrowArgs>(args: SelectSubset<T, ApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Application that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindFirstArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApplicationFindFirstArgs>(args?: SelectSubset<T, ApplicationFindFirstArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Application that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindFirstOrThrowArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApplicationFindFirstOrThrowArgs>(args?: SelectSubset<T, ApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Applications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Applications
     * const applications = await prisma.application.findMany()
     * 
     * // Get first 10 Applications
     * const applications = await prisma.application.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const applicationWithIdOnly = await prisma.application.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApplicationFindManyArgs>(args?: SelectSubset<T, ApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Application.
     * @param {ApplicationCreateArgs} args - Arguments to create a Application.
     * @example
     * // Create one Application
     * const Application = await prisma.application.create({
     *   data: {
     *     // ... data to create a Application
     *   }
     * })
     * 
     */
    create<T extends ApplicationCreateArgs>(args: SelectSubset<T, ApplicationCreateArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Applications.
     * @param {ApplicationCreateManyArgs} args - Arguments to create many Applications.
     * @example
     * // Create many Applications
     * const application = await prisma.application.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApplicationCreateManyArgs>(args?: SelectSubset<T, ApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Applications and returns the data saved in the database.
     * @param {ApplicationCreateManyAndReturnArgs} args - Arguments to create many Applications.
     * @example
     * // Create many Applications
     * const application = await prisma.application.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Applications and only return the `id`
     * const applicationWithIdOnly = await prisma.application.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApplicationCreateManyAndReturnArgs>(args?: SelectSubset<T, ApplicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Application.
     * @param {ApplicationDeleteArgs} args - Arguments to delete one Application.
     * @example
     * // Delete one Application
     * const Application = await prisma.application.delete({
     *   where: {
     *     // ... filter to delete one Application
     *   }
     * })
     * 
     */
    delete<T extends ApplicationDeleteArgs>(args: SelectSubset<T, ApplicationDeleteArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Application.
     * @param {ApplicationUpdateArgs} args - Arguments to update one Application.
     * @example
     * // Update one Application
     * const application = await prisma.application.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApplicationUpdateArgs>(args: SelectSubset<T, ApplicationUpdateArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Applications.
     * @param {ApplicationDeleteManyArgs} args - Arguments to filter Applications to delete.
     * @example
     * // Delete a few Applications
     * const { count } = await prisma.application.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApplicationDeleteManyArgs>(args?: SelectSubset<T, ApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Applications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Applications
     * const application = await prisma.application.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApplicationUpdateManyArgs>(args: SelectSubset<T, ApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Applications and returns the data updated in the database.
     * @param {ApplicationUpdateManyAndReturnArgs} args - Arguments to update many Applications.
     * @example
     * // Update many Applications
     * const application = await prisma.application.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Applications and only return the `id`
     * const applicationWithIdOnly = await prisma.application.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ApplicationUpdateManyAndReturnArgs>(args: SelectSubset<T, ApplicationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Application.
     * @param {ApplicationUpsertArgs} args - Arguments to update or create a Application.
     * @example
     * // Update or create a Application
     * const application = await prisma.application.upsert({
     *   create: {
     *     // ... data to create a Application
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Application we want to update
     *   }
     * })
     */
    upsert<T extends ApplicationUpsertArgs>(args: SelectSubset<T, ApplicationUpsertArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Applications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationCountArgs} args - Arguments to filter Applications to count.
     * @example
     * // Count the number of Applications
     * const count = await prisma.application.count({
     *   where: {
     *     // ... the filter for the Applications we want to count
     *   }
     * })
    **/
    count<T extends ApplicationCountArgs>(
      args?: Subset<T, ApplicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApplicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Application.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApplicationAggregateArgs>(args: Subset<T, ApplicationAggregateArgs>): Prisma.PrismaPromise<GetApplicationAggregateType<T>>

    /**
     * Group by Application.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApplicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApplicationGroupByArgs['orderBy'] }
        : { orderBy?: ApplicationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Application model
   */
  readonly fields: ApplicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Application.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApplicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    term<T extends TermDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TermDefaultArgs<ExtArgs>>): Prisma__TermClient<$Result.GetResult<Prisma.$TermPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    answers<T extends Application$answersArgs<ExtArgs> = {}>(args?: Subset<T, Application$answersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Application model
   */
  interface ApplicationFieldRefs {
    readonly id: FieldRef<"Application", 'BigInt'>
    readonly profile_id: FieldRef<"Application", 'String'>
    readonly term_id: FieldRef<"Application", 'BigInt'>
    readonly roles_applying_for: FieldRef<"Application", 'Role[]'>
    readonly resume_path: FieldRef<"Application", 'String'>
    readonly status: FieldRef<"Application", 'ApplicationStatus'>
    readonly comments: FieldRef<"Application", 'String'>
    readonly created_at: FieldRef<"Application", 'DateTime'>
    readonly updated_at: FieldRef<"Application", 'DateTime'>
    readonly submitted_at: FieldRef<"Application", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Application findUnique
   */
  export type ApplicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application findUniqueOrThrow
   */
  export type ApplicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application findFirst
   */
  export type ApplicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Applications.
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Applications.
     */
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Application findFirstOrThrow
   */
  export type ApplicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Applications.
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Applications.
     */
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Application findMany
   */
  export type ApplicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Applications to fetch.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Applications.
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Application create
   */
  export type ApplicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * The data needed to create a Application.
     */
    data: XOR<ApplicationCreateInput, ApplicationUncheckedCreateInput>
  }

  /**
   * Application createMany
   */
  export type ApplicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Applications.
     */
    data: ApplicationCreateManyInput | ApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Application createManyAndReturn
   */
  export type ApplicationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * The data used to create many Applications.
     */
    data: ApplicationCreateManyInput | ApplicationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Application update
   */
  export type ApplicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * The data needed to update a Application.
     */
    data: XOR<ApplicationUpdateInput, ApplicationUncheckedUpdateInput>
    /**
     * Choose, which Application to update.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application updateMany
   */
  export type ApplicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Applications.
     */
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyInput>
    /**
     * Filter which Applications to update
     */
    where?: ApplicationWhereInput
    /**
     * Limit how many Applications to update.
     */
    limit?: number
  }

  /**
   * Application updateManyAndReturn
   */
  export type ApplicationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * The data used to update Applications.
     */
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyInput>
    /**
     * Filter which Applications to update
     */
    where?: ApplicationWhereInput
    /**
     * Limit how many Applications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Application upsert
   */
  export type ApplicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * The filter to search for the Application to update in case it exists.
     */
    where: ApplicationWhereUniqueInput
    /**
     * In case the Application found by the `where` argument doesn't exist, create a new Application with this data.
     */
    create: XOR<ApplicationCreateInput, ApplicationUncheckedCreateInput>
    /**
     * In case the Application was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApplicationUpdateInput, ApplicationUncheckedUpdateInput>
  }

  /**
   * Application delete
   */
  export type ApplicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter which Application to delete.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application deleteMany
   */
  export type ApplicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Applications to delete
     */
    where?: ApplicationWhereInput
    /**
     * Limit how many Applications to delete.
     */
    limit?: number
  }

  /**
   * Application.answers
   */
  export type Application$answersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicationAnswer
     */
    select?: ApplicationAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicationAnswer
     */
    omit?: ApplicationAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationAnswerInclude<ExtArgs> | null
    where?: ApplicationAnswerWhereInput
    orderBy?: ApplicationAnswerOrderByWithRelationInput | ApplicationAnswerOrderByWithRelationInput[]
    cursor?: ApplicationAnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApplicationAnswerScalarFieldEnum | ApplicationAnswerScalarFieldEnum[]
  }

  /**
   * Application without action
   */
  export type ApplicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
  }


  /**
   * Model ApplicationAnswer
   */

  export type AggregateApplicationAnswer = {
    _count: ApplicationAnswerCountAggregateOutputType | null
    _avg: ApplicationAnswerAvgAggregateOutputType | null
    _sum: ApplicationAnswerSumAggregateOutputType | null
    _min: ApplicationAnswerMinAggregateOutputType | null
    _max: ApplicationAnswerMaxAggregateOutputType | null
  }

  export type ApplicationAnswerAvgAggregateOutputType = {
    id: number | null
    application_id: number | null
    question_id: number | null
  }

  export type ApplicationAnswerSumAggregateOutputType = {
    id: bigint | null
    application_id: bigint | null
    question_id: bigint | null
  }

  export type ApplicationAnswerMinAggregateOutputType = {
    id: bigint | null
    application_id: bigint | null
    question_id: bigint | null
    answer_text: string | null
    answer_option: string | null
    answer_file: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ApplicationAnswerMaxAggregateOutputType = {
    id: bigint | null
    application_id: bigint | null
    question_id: bigint | null
    answer_text: string | null
    answer_option: string | null
    answer_file: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ApplicationAnswerCountAggregateOutputType = {
    id: number
    application_id: number
    question_id: number
    answer_text: number
    answer_option: number
    answer_options: number
    answer_file: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ApplicationAnswerAvgAggregateInputType = {
    id?: true
    application_id?: true
    question_id?: true
  }

  export type ApplicationAnswerSumAggregateInputType = {
    id?: true
    application_id?: true
    question_id?: true
  }

  export type ApplicationAnswerMinAggregateInputType = {
    id?: true
    application_id?: true
    question_id?: true
    answer_text?: true
    answer_option?: true
    answer_file?: true
    created_at?: true
    updated_at?: true
  }

  export type ApplicationAnswerMaxAggregateInputType = {
    id?: true
    application_id?: true
    question_id?: true
    answer_text?: true
    answer_option?: true
    answer_file?: true
    created_at?: true
    updated_at?: true
  }

  export type ApplicationAnswerCountAggregateInputType = {
    id?: true
    application_id?: true
    question_id?: true
    answer_text?: true
    answer_option?: true
    answer_options?: true
    answer_file?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ApplicationAnswerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApplicationAnswer to aggregate.
     */
    where?: ApplicationAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApplicationAnswers to fetch.
     */
    orderBy?: ApplicationAnswerOrderByWithRelationInput | ApplicationAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApplicationAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApplicationAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApplicationAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApplicationAnswers
    **/
    _count?: true | ApplicationAnswerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ApplicationAnswerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ApplicationAnswerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApplicationAnswerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApplicationAnswerMaxAggregateInputType
  }

  export type GetApplicationAnswerAggregateType<T extends ApplicationAnswerAggregateArgs> = {
        [P in keyof T & keyof AggregateApplicationAnswer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApplicationAnswer[P]>
      : GetScalarType<T[P], AggregateApplicationAnswer[P]>
  }




  export type ApplicationAnswerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationAnswerWhereInput
    orderBy?: ApplicationAnswerOrderByWithAggregationInput | ApplicationAnswerOrderByWithAggregationInput[]
    by: ApplicationAnswerScalarFieldEnum[] | ApplicationAnswerScalarFieldEnum
    having?: ApplicationAnswerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApplicationAnswerCountAggregateInputType | true
    _avg?: ApplicationAnswerAvgAggregateInputType
    _sum?: ApplicationAnswerSumAggregateInputType
    _min?: ApplicationAnswerMinAggregateInputType
    _max?: ApplicationAnswerMaxAggregateInputType
  }

  export type ApplicationAnswerGroupByOutputType = {
    id: bigint
    application_id: bigint
    question_id: bigint
    answer_text: string | null
    answer_option: string | null
    answer_options: string[]
    answer_file: string | null
    created_at: Date
    updated_at: Date
    _count: ApplicationAnswerCountAggregateOutputType | null
    _avg: ApplicationAnswerAvgAggregateOutputType | null
    _sum: ApplicationAnswerSumAggregateOutputType | null
    _min: ApplicationAnswerMinAggregateOutputType | null
    _max: ApplicationAnswerMaxAggregateOutputType | null
  }

  type GetApplicationAnswerGroupByPayload<T extends ApplicationAnswerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApplicationAnswerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApplicationAnswerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApplicationAnswerGroupByOutputType[P]>
            : GetScalarType<T[P], ApplicationAnswerGroupByOutputType[P]>
        }
      >
    >


  export type ApplicationAnswerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    application_id?: boolean
    question_id?: boolean
    answer_text?: boolean
    answer_option?: boolean
    answer_options?: boolean
    answer_file?: boolean
    created_at?: boolean
    updated_at?: boolean
    application?: boolean | ApplicationDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["applicationAnswer"]>

  export type ApplicationAnswerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    application_id?: boolean
    question_id?: boolean
    answer_text?: boolean
    answer_option?: boolean
    answer_options?: boolean
    answer_file?: boolean
    created_at?: boolean
    updated_at?: boolean
    application?: boolean | ApplicationDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["applicationAnswer"]>

  export type ApplicationAnswerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    application_id?: boolean
    question_id?: boolean
    answer_text?: boolean
    answer_option?: boolean
    answer_options?: boolean
    answer_file?: boolean
    created_at?: boolean
    updated_at?: boolean
    application?: boolean | ApplicationDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["applicationAnswer"]>

  export type ApplicationAnswerSelectScalar = {
    id?: boolean
    application_id?: boolean
    question_id?: boolean
    answer_text?: boolean
    answer_option?: boolean
    answer_options?: boolean
    answer_file?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ApplicationAnswerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "application_id" | "question_id" | "answer_text" | "answer_option" | "answer_options" | "answer_file" | "created_at" | "updated_at", ExtArgs["result"]["applicationAnswer"]>
  export type ApplicationAnswerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    application?: boolean | ApplicationDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }
  export type ApplicationAnswerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    application?: boolean | ApplicationDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }
  export type ApplicationAnswerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    application?: boolean | ApplicationDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }

  export type $ApplicationAnswerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApplicationAnswer"
    objects: {
      application: Prisma.$ApplicationPayload<ExtArgs>
      question: Prisma.$QuestionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      application_id: bigint
      question_id: bigint
      answer_text: string | null
      answer_option: string | null
      answer_options: string[]
      answer_file: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["applicationAnswer"]>
    composites: {}
  }

  type ApplicationAnswerGetPayload<S extends boolean | null | undefined | ApplicationAnswerDefaultArgs> = $Result.GetResult<Prisma.$ApplicationAnswerPayload, S>

  type ApplicationAnswerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApplicationAnswerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApplicationAnswerCountAggregateInputType | true
    }

  export interface ApplicationAnswerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApplicationAnswer'], meta: { name: 'ApplicationAnswer' } }
    /**
     * Find zero or one ApplicationAnswer that matches the filter.
     * @param {ApplicationAnswerFindUniqueArgs} args - Arguments to find a ApplicationAnswer
     * @example
     * // Get one ApplicationAnswer
     * const applicationAnswer = await prisma.applicationAnswer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApplicationAnswerFindUniqueArgs>(args: SelectSubset<T, ApplicationAnswerFindUniqueArgs<ExtArgs>>): Prisma__ApplicationAnswerClient<$Result.GetResult<Prisma.$ApplicationAnswerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApplicationAnswer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApplicationAnswerFindUniqueOrThrowArgs} args - Arguments to find a ApplicationAnswer
     * @example
     * // Get one ApplicationAnswer
     * const applicationAnswer = await prisma.applicationAnswer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApplicationAnswerFindUniqueOrThrowArgs>(args: SelectSubset<T, ApplicationAnswerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApplicationAnswerClient<$Result.GetResult<Prisma.$ApplicationAnswerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApplicationAnswer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationAnswerFindFirstArgs} args - Arguments to find a ApplicationAnswer
     * @example
     * // Get one ApplicationAnswer
     * const applicationAnswer = await prisma.applicationAnswer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApplicationAnswerFindFirstArgs>(args?: SelectSubset<T, ApplicationAnswerFindFirstArgs<ExtArgs>>): Prisma__ApplicationAnswerClient<$Result.GetResult<Prisma.$ApplicationAnswerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApplicationAnswer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationAnswerFindFirstOrThrowArgs} args - Arguments to find a ApplicationAnswer
     * @example
     * // Get one ApplicationAnswer
     * const applicationAnswer = await prisma.applicationAnswer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApplicationAnswerFindFirstOrThrowArgs>(args?: SelectSubset<T, ApplicationAnswerFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApplicationAnswerClient<$Result.GetResult<Prisma.$ApplicationAnswerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApplicationAnswers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationAnswerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApplicationAnswers
     * const applicationAnswers = await prisma.applicationAnswer.findMany()
     * 
     * // Get first 10 ApplicationAnswers
     * const applicationAnswers = await prisma.applicationAnswer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const applicationAnswerWithIdOnly = await prisma.applicationAnswer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApplicationAnswerFindManyArgs>(args?: SelectSubset<T, ApplicationAnswerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApplicationAnswer.
     * @param {ApplicationAnswerCreateArgs} args - Arguments to create a ApplicationAnswer.
     * @example
     * // Create one ApplicationAnswer
     * const ApplicationAnswer = await prisma.applicationAnswer.create({
     *   data: {
     *     // ... data to create a ApplicationAnswer
     *   }
     * })
     * 
     */
    create<T extends ApplicationAnswerCreateArgs>(args: SelectSubset<T, ApplicationAnswerCreateArgs<ExtArgs>>): Prisma__ApplicationAnswerClient<$Result.GetResult<Prisma.$ApplicationAnswerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApplicationAnswers.
     * @param {ApplicationAnswerCreateManyArgs} args - Arguments to create many ApplicationAnswers.
     * @example
     * // Create many ApplicationAnswers
     * const applicationAnswer = await prisma.applicationAnswer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApplicationAnswerCreateManyArgs>(args?: SelectSubset<T, ApplicationAnswerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApplicationAnswers and returns the data saved in the database.
     * @param {ApplicationAnswerCreateManyAndReturnArgs} args - Arguments to create many ApplicationAnswers.
     * @example
     * // Create many ApplicationAnswers
     * const applicationAnswer = await prisma.applicationAnswer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApplicationAnswers and only return the `id`
     * const applicationAnswerWithIdOnly = await prisma.applicationAnswer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApplicationAnswerCreateManyAndReturnArgs>(args?: SelectSubset<T, ApplicationAnswerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationAnswerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ApplicationAnswer.
     * @param {ApplicationAnswerDeleteArgs} args - Arguments to delete one ApplicationAnswer.
     * @example
     * // Delete one ApplicationAnswer
     * const ApplicationAnswer = await prisma.applicationAnswer.delete({
     *   where: {
     *     // ... filter to delete one ApplicationAnswer
     *   }
     * })
     * 
     */
    delete<T extends ApplicationAnswerDeleteArgs>(args: SelectSubset<T, ApplicationAnswerDeleteArgs<ExtArgs>>): Prisma__ApplicationAnswerClient<$Result.GetResult<Prisma.$ApplicationAnswerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApplicationAnswer.
     * @param {ApplicationAnswerUpdateArgs} args - Arguments to update one ApplicationAnswer.
     * @example
     * // Update one ApplicationAnswer
     * const applicationAnswer = await prisma.applicationAnswer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApplicationAnswerUpdateArgs>(args: SelectSubset<T, ApplicationAnswerUpdateArgs<ExtArgs>>): Prisma__ApplicationAnswerClient<$Result.GetResult<Prisma.$ApplicationAnswerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApplicationAnswers.
     * @param {ApplicationAnswerDeleteManyArgs} args - Arguments to filter ApplicationAnswers to delete.
     * @example
     * // Delete a few ApplicationAnswers
     * const { count } = await prisma.applicationAnswer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApplicationAnswerDeleteManyArgs>(args?: SelectSubset<T, ApplicationAnswerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApplicationAnswers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationAnswerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApplicationAnswers
     * const applicationAnswer = await prisma.applicationAnswer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApplicationAnswerUpdateManyArgs>(args: SelectSubset<T, ApplicationAnswerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApplicationAnswers and returns the data updated in the database.
     * @param {ApplicationAnswerUpdateManyAndReturnArgs} args - Arguments to update many ApplicationAnswers.
     * @example
     * // Update many ApplicationAnswers
     * const applicationAnswer = await prisma.applicationAnswer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ApplicationAnswers and only return the `id`
     * const applicationAnswerWithIdOnly = await prisma.applicationAnswer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ApplicationAnswerUpdateManyAndReturnArgs>(args: SelectSubset<T, ApplicationAnswerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationAnswerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ApplicationAnswer.
     * @param {ApplicationAnswerUpsertArgs} args - Arguments to update or create a ApplicationAnswer.
     * @example
     * // Update or create a ApplicationAnswer
     * const applicationAnswer = await prisma.applicationAnswer.upsert({
     *   create: {
     *     // ... data to create a ApplicationAnswer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApplicationAnswer we want to update
     *   }
     * })
     */
    upsert<T extends ApplicationAnswerUpsertArgs>(args: SelectSubset<T, ApplicationAnswerUpsertArgs<ExtArgs>>): Prisma__ApplicationAnswerClient<$Result.GetResult<Prisma.$ApplicationAnswerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApplicationAnswers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationAnswerCountArgs} args - Arguments to filter ApplicationAnswers to count.
     * @example
     * // Count the number of ApplicationAnswers
     * const count = await prisma.applicationAnswer.count({
     *   where: {
     *     // ... the filter for the ApplicationAnswers we want to count
     *   }
     * })
    **/
    count<T extends ApplicationAnswerCountArgs>(
      args?: Subset<T, ApplicationAnswerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApplicationAnswerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApplicationAnswer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationAnswerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApplicationAnswerAggregateArgs>(args: Subset<T, ApplicationAnswerAggregateArgs>): Prisma.PrismaPromise<GetApplicationAnswerAggregateType<T>>

    /**
     * Group by ApplicationAnswer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationAnswerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApplicationAnswerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApplicationAnswerGroupByArgs['orderBy'] }
        : { orderBy?: ApplicationAnswerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApplicationAnswerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApplicationAnswerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApplicationAnswer model
   */
  readonly fields: ApplicationAnswerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApplicationAnswer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApplicationAnswerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    application<T extends ApplicationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ApplicationDefaultArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    question<T extends QuestionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuestionDefaultArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ApplicationAnswer model
   */
  interface ApplicationAnswerFieldRefs {
    readonly id: FieldRef<"ApplicationAnswer", 'BigInt'>
    readonly application_id: FieldRef<"ApplicationAnswer", 'BigInt'>
    readonly question_id: FieldRef<"ApplicationAnswer", 'BigInt'>
    readonly answer_text: FieldRef<"ApplicationAnswer", 'String'>
    readonly answer_option: FieldRef<"ApplicationAnswer", 'String'>
    readonly answer_options: FieldRef<"ApplicationAnswer", 'String[]'>
    readonly answer_file: FieldRef<"ApplicationAnswer", 'String'>
    readonly created_at: FieldRef<"ApplicationAnswer", 'DateTime'>
    readonly updated_at: FieldRef<"ApplicationAnswer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ApplicationAnswer findUnique
   */
  export type ApplicationAnswerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicationAnswer
     */
    select?: ApplicationAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicationAnswer
     */
    omit?: ApplicationAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationAnswerInclude<ExtArgs> | null
    /**
     * Filter, which ApplicationAnswer to fetch.
     */
    where: ApplicationAnswerWhereUniqueInput
  }

  /**
   * ApplicationAnswer findUniqueOrThrow
   */
  export type ApplicationAnswerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicationAnswer
     */
    select?: ApplicationAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicationAnswer
     */
    omit?: ApplicationAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationAnswerInclude<ExtArgs> | null
    /**
     * Filter, which ApplicationAnswer to fetch.
     */
    where: ApplicationAnswerWhereUniqueInput
  }

  /**
   * ApplicationAnswer findFirst
   */
  export type ApplicationAnswerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicationAnswer
     */
    select?: ApplicationAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicationAnswer
     */
    omit?: ApplicationAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationAnswerInclude<ExtArgs> | null
    /**
     * Filter, which ApplicationAnswer to fetch.
     */
    where?: ApplicationAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApplicationAnswers to fetch.
     */
    orderBy?: ApplicationAnswerOrderByWithRelationInput | ApplicationAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApplicationAnswers.
     */
    cursor?: ApplicationAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApplicationAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApplicationAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApplicationAnswers.
     */
    distinct?: ApplicationAnswerScalarFieldEnum | ApplicationAnswerScalarFieldEnum[]
  }

  /**
   * ApplicationAnswer findFirstOrThrow
   */
  export type ApplicationAnswerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicationAnswer
     */
    select?: ApplicationAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicationAnswer
     */
    omit?: ApplicationAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationAnswerInclude<ExtArgs> | null
    /**
     * Filter, which ApplicationAnswer to fetch.
     */
    where?: ApplicationAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApplicationAnswers to fetch.
     */
    orderBy?: ApplicationAnswerOrderByWithRelationInput | ApplicationAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApplicationAnswers.
     */
    cursor?: ApplicationAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApplicationAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApplicationAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApplicationAnswers.
     */
    distinct?: ApplicationAnswerScalarFieldEnum | ApplicationAnswerScalarFieldEnum[]
  }

  /**
   * ApplicationAnswer findMany
   */
  export type ApplicationAnswerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicationAnswer
     */
    select?: ApplicationAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicationAnswer
     */
    omit?: ApplicationAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationAnswerInclude<ExtArgs> | null
    /**
     * Filter, which ApplicationAnswers to fetch.
     */
    where?: ApplicationAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApplicationAnswers to fetch.
     */
    orderBy?: ApplicationAnswerOrderByWithRelationInput | ApplicationAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApplicationAnswers.
     */
    cursor?: ApplicationAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApplicationAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApplicationAnswers.
     */
    skip?: number
    distinct?: ApplicationAnswerScalarFieldEnum | ApplicationAnswerScalarFieldEnum[]
  }

  /**
   * ApplicationAnswer create
   */
  export type ApplicationAnswerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicationAnswer
     */
    select?: ApplicationAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicationAnswer
     */
    omit?: ApplicationAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationAnswerInclude<ExtArgs> | null
    /**
     * The data needed to create a ApplicationAnswer.
     */
    data: XOR<ApplicationAnswerCreateInput, ApplicationAnswerUncheckedCreateInput>
  }

  /**
   * ApplicationAnswer createMany
   */
  export type ApplicationAnswerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApplicationAnswers.
     */
    data: ApplicationAnswerCreateManyInput | ApplicationAnswerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApplicationAnswer createManyAndReturn
   */
  export type ApplicationAnswerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicationAnswer
     */
    select?: ApplicationAnswerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicationAnswer
     */
    omit?: ApplicationAnswerOmit<ExtArgs> | null
    /**
     * The data used to create many ApplicationAnswers.
     */
    data: ApplicationAnswerCreateManyInput | ApplicationAnswerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationAnswerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApplicationAnswer update
   */
  export type ApplicationAnswerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicationAnswer
     */
    select?: ApplicationAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicationAnswer
     */
    omit?: ApplicationAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationAnswerInclude<ExtArgs> | null
    /**
     * The data needed to update a ApplicationAnswer.
     */
    data: XOR<ApplicationAnswerUpdateInput, ApplicationAnswerUncheckedUpdateInput>
    /**
     * Choose, which ApplicationAnswer to update.
     */
    where: ApplicationAnswerWhereUniqueInput
  }

  /**
   * ApplicationAnswer updateMany
   */
  export type ApplicationAnswerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApplicationAnswers.
     */
    data: XOR<ApplicationAnswerUpdateManyMutationInput, ApplicationAnswerUncheckedUpdateManyInput>
    /**
     * Filter which ApplicationAnswers to update
     */
    where?: ApplicationAnswerWhereInput
    /**
     * Limit how many ApplicationAnswers to update.
     */
    limit?: number
  }

  /**
   * ApplicationAnswer updateManyAndReturn
   */
  export type ApplicationAnswerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicationAnswer
     */
    select?: ApplicationAnswerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicationAnswer
     */
    omit?: ApplicationAnswerOmit<ExtArgs> | null
    /**
     * The data used to update ApplicationAnswers.
     */
    data: XOR<ApplicationAnswerUpdateManyMutationInput, ApplicationAnswerUncheckedUpdateManyInput>
    /**
     * Filter which ApplicationAnswers to update
     */
    where?: ApplicationAnswerWhereInput
    /**
     * Limit how many ApplicationAnswers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationAnswerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApplicationAnswer upsert
   */
  export type ApplicationAnswerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicationAnswer
     */
    select?: ApplicationAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicationAnswer
     */
    omit?: ApplicationAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationAnswerInclude<ExtArgs> | null
    /**
     * The filter to search for the ApplicationAnswer to update in case it exists.
     */
    where: ApplicationAnswerWhereUniqueInput
    /**
     * In case the ApplicationAnswer found by the `where` argument doesn't exist, create a new ApplicationAnswer with this data.
     */
    create: XOR<ApplicationAnswerCreateInput, ApplicationAnswerUncheckedCreateInput>
    /**
     * In case the ApplicationAnswer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApplicationAnswerUpdateInput, ApplicationAnswerUncheckedUpdateInput>
  }

  /**
   * ApplicationAnswer delete
   */
  export type ApplicationAnswerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicationAnswer
     */
    select?: ApplicationAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicationAnswer
     */
    omit?: ApplicationAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationAnswerInclude<ExtArgs> | null
    /**
     * Filter which ApplicationAnswer to delete.
     */
    where: ApplicationAnswerWhereUniqueInput
  }

  /**
   * ApplicationAnswer deleteMany
   */
  export type ApplicationAnswerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApplicationAnswers to delete
     */
    where?: ApplicationAnswerWhereInput
    /**
     * Limit how many ApplicationAnswers to delete.
     */
    limit?: number
  }

  /**
   * ApplicationAnswer without action
   */
  export type ApplicationAnswerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicationAnswer
     */
    select?: ApplicationAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicationAnswer
     */
    omit?: ApplicationAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationAnswerInclude<ExtArgs> | null
  }


  /**
   * Model Event
   */

  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventAvgAggregateOutputType = {
    id: number | null
    image_id: number | null
  }

  export type EventSumAggregateOutputType = {
    id: bigint | null
    image_id: bigint | null
  }

  export type EventMinAggregateOutputType = {
    id: bigint | null
    name: string | null
    registration_required: boolean | null
    description: string | null
    location: string | null
    start_time: Date | null
    buffered_start_time: Date | null
    end_time: Date | null
    buffered_end_time: Date | null
    payment_required: boolean | null
    image_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type EventMaxAggregateOutputType = {
    id: bigint | null
    name: string | null
    registration_required: boolean | null
    description: string | null
    location: string | null
    start_time: Date | null
    buffered_start_time: Date | null
    end_time: Date | null
    buffered_end_time: Date | null
    payment_required: boolean | null
    image_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type EventCountAggregateOutputType = {
    id: number
    name: number
    registration_required: number
    description: number
    location: number
    start_time: number
    buffered_start_time: number
    end_time: number
    buffered_end_time: number
    payment_required: number
    image_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type EventAvgAggregateInputType = {
    id?: true
    image_id?: true
  }

  export type EventSumAggregateInputType = {
    id?: true
    image_id?: true
  }

  export type EventMinAggregateInputType = {
    id?: true
    name?: true
    registration_required?: true
    description?: true
    location?: true
    start_time?: true
    buffered_start_time?: true
    end_time?: true
    buffered_end_time?: true
    payment_required?: true
    image_id?: true
    created_at?: true
    updated_at?: true
  }

  export type EventMaxAggregateInputType = {
    id?: true
    name?: true
    registration_required?: true
    description?: true
    location?: true
    start_time?: true
    buffered_start_time?: true
    end_time?: true
    buffered_end_time?: true
    payment_required?: true
    image_id?: true
    created_at?: true
    updated_at?: true
  }

  export type EventCountAggregateInputType = {
    id?: true
    name?: true
    registration_required?: true
    description?: true
    location?: true
    start_time?: true
    buffered_start_time?: true
    end_time?: true
    buffered_end_time?: true
    payment_required?: true
    image_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _avg?: EventAvgAggregateInputType
    _sum?: EventSumAggregateInputType
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }

  export type EventGroupByOutputType = {
    id: bigint
    name: string
    registration_required: boolean
    description: string | null
    location: string | null
    start_time: Date
    buffered_start_time: Date
    end_time: Date
    buffered_end_time: Date
    payment_required: boolean
    image_id: bigint | null
    created_at: Date
    updated_at: Date
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    registration_required?: boolean
    description?: boolean
    location?: boolean
    start_time?: boolean
    buffered_start_time?: boolean
    end_time?: boolean
    buffered_end_time?: boolean
    payment_required?: boolean
    image_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    attendances?: boolean | Event$attendancesArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    registration_required?: boolean
    description?: boolean
    location?: boolean
    start_time?: boolean
    buffered_start_time?: boolean
    end_time?: boolean
    buffered_end_time?: boolean
    payment_required?: boolean
    image_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["event"]>

  export type EventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    registration_required?: boolean
    description?: boolean
    location?: boolean
    start_time?: boolean
    buffered_start_time?: boolean
    end_time?: boolean
    buffered_end_time?: boolean
    payment_required?: boolean
    image_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["event"]>

  export type EventSelectScalar = {
    id?: boolean
    name?: boolean
    registration_required?: boolean
    description?: boolean
    location?: boolean
    start_time?: boolean
    buffered_start_time?: boolean
    end_time?: boolean
    buffered_end_time?: boolean
    payment_required?: boolean
    image_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type EventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "registration_required" | "description" | "location" | "start_time" | "buffered_start_time" | "end_time" | "buffered_end_time" | "payment_required" | "image_id" | "created_at" | "updated_at", ExtArgs["result"]["event"]>
  export type EventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendances?: boolean | Event$attendancesArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type EventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {
      attendances: Prisma.$EventAttendancePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      name: string
      registration_required: boolean
      description: string | null
      location: string | null
      start_time: Date
      buffered_start_time: Date
      end_time: Date
      buffered_end_time: Date
      payment_required: boolean
      image_id: bigint | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["event"]>
    composites: {}
  }

  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventFindUniqueArgs>(args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Event that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(args: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventFindFirstArgs>(args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventFindManyArgs>(args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
     */
    create<T extends EventCreateArgs>(args: SelectSubset<T, EventCreateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Events.
     * @param {EventCreateManyArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCreateManyArgs>(args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Events and returns the data saved in the database.
     * @param {EventCreateManyAndReturnArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventCreateManyAndReturnArgs>(args?: SelectSubset<T, EventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
     */
    delete<T extends EventDeleteArgs>(args: SelectSubset<T, EventDeleteArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventUpdateArgs>(args: SelectSubset<T, EventUpdateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDeleteManyArgs>(args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventUpdateManyArgs>(args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events and returns the data updated in the database.
     * @param {EventUpdateManyAndReturnArgs} args - Arguments to update many Events.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EventUpdateManyAndReturnArgs>(args: SelectSubset<T, EventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
     */
    upsert<T extends EventUpsertArgs>(args: SelectSubset<T, EventUpsertArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attendances<T extends Event$attendancesArgs<ExtArgs> = {}>(args?: Subset<T, Event$attendancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventAttendancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Event model
   */
  interface EventFieldRefs {
    readonly id: FieldRef<"Event", 'BigInt'>
    readonly name: FieldRef<"Event", 'String'>
    readonly registration_required: FieldRef<"Event", 'Boolean'>
    readonly description: FieldRef<"Event", 'String'>
    readonly location: FieldRef<"Event", 'String'>
    readonly start_time: FieldRef<"Event", 'DateTime'>
    readonly buffered_start_time: FieldRef<"Event", 'DateTime'>
    readonly end_time: FieldRef<"Event", 'DateTime'>
    readonly buffered_end_time: FieldRef<"Event", 'DateTime'>
    readonly payment_required: FieldRef<"Event", 'Boolean'>
    readonly image_id: FieldRef<"Event", 'BigInt'>
    readonly created_at: FieldRef<"Event", 'DateTime'>
    readonly updated_at: FieldRef<"Event", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }

  /**
   * Event createMany
   */
  export type EventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event createManyAndReturn
   */
  export type EventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event updateManyAndReturn
   */
  export type EventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }

  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to delete.
     */
    limit?: number
  }

  /**
   * Event.attendances
   */
  export type Event$attendancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttendance
     */
    select?: EventAttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttendance
     */
    omit?: EventAttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttendanceInclude<ExtArgs> | null
    where?: EventAttendanceWhereInput
    orderBy?: EventAttendanceOrderByWithRelationInput | EventAttendanceOrderByWithRelationInput[]
    cursor?: EventAttendanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventAttendanceScalarFieldEnum | EventAttendanceScalarFieldEnum[]
  }

  /**
   * Event without action
   */
  export type EventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
  }


  /**
   * Model EventAttendance
   */

  export type AggregateEventAttendance = {
    _count: EventAttendanceCountAggregateOutputType | null
    _avg: EventAttendanceAvgAggregateOutputType | null
    _sum: EventAttendanceSumAggregateOutputType | null
    _min: EventAttendanceMinAggregateOutputType | null
    _max: EventAttendanceMaxAggregateOutputType | null
  }

  export type EventAttendanceAvgAggregateOutputType = {
    id: number | null
    event_id: number | null
  }

  export type EventAttendanceSumAggregateOutputType = {
    id: bigint | null
    event_id: bigint | null
  }

  export type EventAttendanceMinAggregateOutputType = {
    id: bigint | null
    event_id: bigint | null
    profile_id: string | null
    checked_in: boolean | null
    created_at: Date | null
  }

  export type EventAttendanceMaxAggregateOutputType = {
    id: bigint | null
    event_id: bigint | null
    profile_id: string | null
    checked_in: boolean | null
    created_at: Date | null
  }

  export type EventAttendanceCountAggregateOutputType = {
    id: number
    event_id: number
    profile_id: number
    checked_in: number
    created_at: number
    _all: number
  }


  export type EventAttendanceAvgAggregateInputType = {
    id?: true
    event_id?: true
  }

  export type EventAttendanceSumAggregateInputType = {
    id?: true
    event_id?: true
  }

  export type EventAttendanceMinAggregateInputType = {
    id?: true
    event_id?: true
    profile_id?: true
    checked_in?: true
    created_at?: true
  }

  export type EventAttendanceMaxAggregateInputType = {
    id?: true
    event_id?: true
    profile_id?: true
    checked_in?: true
    created_at?: true
  }

  export type EventAttendanceCountAggregateInputType = {
    id?: true
    event_id?: true
    profile_id?: true
    checked_in?: true
    created_at?: true
    _all?: true
  }

  export type EventAttendanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventAttendance to aggregate.
     */
    where?: EventAttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventAttendances to fetch.
     */
    orderBy?: EventAttendanceOrderByWithRelationInput | EventAttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventAttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventAttendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventAttendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EventAttendances
    **/
    _count?: true | EventAttendanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventAttendanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventAttendanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventAttendanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventAttendanceMaxAggregateInputType
  }

  export type GetEventAttendanceAggregateType<T extends EventAttendanceAggregateArgs> = {
        [P in keyof T & keyof AggregateEventAttendance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEventAttendance[P]>
      : GetScalarType<T[P], AggregateEventAttendance[P]>
  }




  export type EventAttendanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventAttendanceWhereInput
    orderBy?: EventAttendanceOrderByWithAggregationInput | EventAttendanceOrderByWithAggregationInput[]
    by: EventAttendanceScalarFieldEnum[] | EventAttendanceScalarFieldEnum
    having?: EventAttendanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventAttendanceCountAggregateInputType | true
    _avg?: EventAttendanceAvgAggregateInputType
    _sum?: EventAttendanceSumAggregateInputType
    _min?: EventAttendanceMinAggregateInputType
    _max?: EventAttendanceMaxAggregateInputType
  }

  export type EventAttendanceGroupByOutputType = {
    id: bigint
    event_id: bigint
    profile_id: string
    checked_in: boolean
    created_at: Date
    _count: EventAttendanceCountAggregateOutputType | null
    _avg: EventAttendanceAvgAggregateOutputType | null
    _sum: EventAttendanceSumAggregateOutputType | null
    _min: EventAttendanceMinAggregateOutputType | null
    _max: EventAttendanceMaxAggregateOutputType | null
  }

  type GetEventAttendanceGroupByPayload<T extends EventAttendanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventAttendanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventAttendanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventAttendanceGroupByOutputType[P]>
            : GetScalarType<T[P], EventAttendanceGroupByOutputType[P]>
        }
      >
    >


  export type EventAttendanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    event_id?: boolean
    profile_id?: boolean
    checked_in?: boolean
    created_at?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventAttendance"]>

  export type EventAttendanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    event_id?: boolean
    profile_id?: boolean
    checked_in?: boolean
    created_at?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventAttendance"]>

  export type EventAttendanceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    event_id?: boolean
    profile_id?: boolean
    checked_in?: boolean
    created_at?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventAttendance"]>

  export type EventAttendanceSelectScalar = {
    id?: boolean
    event_id?: boolean
    profile_id?: boolean
    checked_in?: boolean
    created_at?: boolean
  }

  export type EventAttendanceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "event_id" | "profile_id" | "checked_in" | "created_at", ExtArgs["result"]["eventAttendance"]>
  export type EventAttendanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type EventAttendanceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type EventAttendanceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $EventAttendancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EventAttendance"
    objects: {
      event: Prisma.$EventPayload<ExtArgs>
      profile: Prisma.$ProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      event_id: bigint
      profile_id: string
      checked_in: boolean
      created_at: Date
    }, ExtArgs["result"]["eventAttendance"]>
    composites: {}
  }

  type EventAttendanceGetPayload<S extends boolean | null | undefined | EventAttendanceDefaultArgs> = $Result.GetResult<Prisma.$EventAttendancePayload, S>

  type EventAttendanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventAttendanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventAttendanceCountAggregateInputType | true
    }

  export interface EventAttendanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EventAttendance'], meta: { name: 'EventAttendance' } }
    /**
     * Find zero or one EventAttendance that matches the filter.
     * @param {EventAttendanceFindUniqueArgs} args - Arguments to find a EventAttendance
     * @example
     * // Get one EventAttendance
     * const eventAttendance = await prisma.eventAttendance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventAttendanceFindUniqueArgs>(args: SelectSubset<T, EventAttendanceFindUniqueArgs<ExtArgs>>): Prisma__EventAttendanceClient<$Result.GetResult<Prisma.$EventAttendancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EventAttendance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventAttendanceFindUniqueOrThrowArgs} args - Arguments to find a EventAttendance
     * @example
     * // Get one EventAttendance
     * const eventAttendance = await prisma.eventAttendance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventAttendanceFindUniqueOrThrowArgs>(args: SelectSubset<T, EventAttendanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventAttendanceClient<$Result.GetResult<Prisma.$EventAttendancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventAttendance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAttendanceFindFirstArgs} args - Arguments to find a EventAttendance
     * @example
     * // Get one EventAttendance
     * const eventAttendance = await prisma.eventAttendance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventAttendanceFindFirstArgs>(args?: SelectSubset<T, EventAttendanceFindFirstArgs<ExtArgs>>): Prisma__EventAttendanceClient<$Result.GetResult<Prisma.$EventAttendancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventAttendance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAttendanceFindFirstOrThrowArgs} args - Arguments to find a EventAttendance
     * @example
     * // Get one EventAttendance
     * const eventAttendance = await prisma.eventAttendance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventAttendanceFindFirstOrThrowArgs>(args?: SelectSubset<T, EventAttendanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventAttendanceClient<$Result.GetResult<Prisma.$EventAttendancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EventAttendances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAttendanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EventAttendances
     * const eventAttendances = await prisma.eventAttendance.findMany()
     * 
     * // Get first 10 EventAttendances
     * const eventAttendances = await prisma.eventAttendance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventAttendanceWithIdOnly = await prisma.eventAttendance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventAttendanceFindManyArgs>(args?: SelectSubset<T, EventAttendanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventAttendancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EventAttendance.
     * @param {EventAttendanceCreateArgs} args - Arguments to create a EventAttendance.
     * @example
     * // Create one EventAttendance
     * const EventAttendance = await prisma.eventAttendance.create({
     *   data: {
     *     // ... data to create a EventAttendance
     *   }
     * })
     * 
     */
    create<T extends EventAttendanceCreateArgs>(args: SelectSubset<T, EventAttendanceCreateArgs<ExtArgs>>): Prisma__EventAttendanceClient<$Result.GetResult<Prisma.$EventAttendancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EventAttendances.
     * @param {EventAttendanceCreateManyArgs} args - Arguments to create many EventAttendances.
     * @example
     * // Create many EventAttendances
     * const eventAttendance = await prisma.eventAttendance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventAttendanceCreateManyArgs>(args?: SelectSubset<T, EventAttendanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EventAttendances and returns the data saved in the database.
     * @param {EventAttendanceCreateManyAndReturnArgs} args - Arguments to create many EventAttendances.
     * @example
     * // Create many EventAttendances
     * const eventAttendance = await prisma.eventAttendance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EventAttendances and only return the `id`
     * const eventAttendanceWithIdOnly = await prisma.eventAttendance.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventAttendanceCreateManyAndReturnArgs>(args?: SelectSubset<T, EventAttendanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventAttendancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EventAttendance.
     * @param {EventAttendanceDeleteArgs} args - Arguments to delete one EventAttendance.
     * @example
     * // Delete one EventAttendance
     * const EventAttendance = await prisma.eventAttendance.delete({
     *   where: {
     *     // ... filter to delete one EventAttendance
     *   }
     * })
     * 
     */
    delete<T extends EventAttendanceDeleteArgs>(args: SelectSubset<T, EventAttendanceDeleteArgs<ExtArgs>>): Prisma__EventAttendanceClient<$Result.GetResult<Prisma.$EventAttendancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EventAttendance.
     * @param {EventAttendanceUpdateArgs} args - Arguments to update one EventAttendance.
     * @example
     * // Update one EventAttendance
     * const eventAttendance = await prisma.eventAttendance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventAttendanceUpdateArgs>(args: SelectSubset<T, EventAttendanceUpdateArgs<ExtArgs>>): Prisma__EventAttendanceClient<$Result.GetResult<Prisma.$EventAttendancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EventAttendances.
     * @param {EventAttendanceDeleteManyArgs} args - Arguments to filter EventAttendances to delete.
     * @example
     * // Delete a few EventAttendances
     * const { count } = await prisma.eventAttendance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventAttendanceDeleteManyArgs>(args?: SelectSubset<T, EventAttendanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventAttendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAttendanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EventAttendances
     * const eventAttendance = await prisma.eventAttendance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventAttendanceUpdateManyArgs>(args: SelectSubset<T, EventAttendanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventAttendances and returns the data updated in the database.
     * @param {EventAttendanceUpdateManyAndReturnArgs} args - Arguments to update many EventAttendances.
     * @example
     * // Update many EventAttendances
     * const eventAttendance = await prisma.eventAttendance.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EventAttendances and only return the `id`
     * const eventAttendanceWithIdOnly = await prisma.eventAttendance.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EventAttendanceUpdateManyAndReturnArgs>(args: SelectSubset<T, EventAttendanceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventAttendancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EventAttendance.
     * @param {EventAttendanceUpsertArgs} args - Arguments to update or create a EventAttendance.
     * @example
     * // Update or create a EventAttendance
     * const eventAttendance = await prisma.eventAttendance.upsert({
     *   create: {
     *     // ... data to create a EventAttendance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EventAttendance we want to update
     *   }
     * })
     */
    upsert<T extends EventAttendanceUpsertArgs>(args: SelectSubset<T, EventAttendanceUpsertArgs<ExtArgs>>): Prisma__EventAttendanceClient<$Result.GetResult<Prisma.$EventAttendancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EventAttendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAttendanceCountArgs} args - Arguments to filter EventAttendances to count.
     * @example
     * // Count the number of EventAttendances
     * const count = await prisma.eventAttendance.count({
     *   where: {
     *     // ... the filter for the EventAttendances we want to count
     *   }
     * })
    **/
    count<T extends EventAttendanceCountArgs>(
      args?: Subset<T, EventAttendanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventAttendanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EventAttendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAttendanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAttendanceAggregateArgs>(args: Subset<T, EventAttendanceAggregateArgs>): Prisma.PrismaPromise<GetEventAttendanceAggregateType<T>>

    /**
     * Group by EventAttendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAttendanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventAttendanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventAttendanceGroupByArgs['orderBy'] }
        : { orderBy?: EventAttendanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventAttendanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventAttendanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EventAttendance model
   */
  readonly fields: EventAttendanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EventAttendance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventAttendanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EventAttendance model
   */
  interface EventAttendanceFieldRefs {
    readonly id: FieldRef<"EventAttendance", 'BigInt'>
    readonly event_id: FieldRef<"EventAttendance", 'BigInt'>
    readonly profile_id: FieldRef<"EventAttendance", 'String'>
    readonly checked_in: FieldRef<"EventAttendance", 'Boolean'>
    readonly created_at: FieldRef<"EventAttendance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EventAttendance findUnique
   */
  export type EventAttendanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttendance
     */
    select?: EventAttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttendance
     */
    omit?: EventAttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttendanceInclude<ExtArgs> | null
    /**
     * Filter, which EventAttendance to fetch.
     */
    where: EventAttendanceWhereUniqueInput
  }

  /**
   * EventAttendance findUniqueOrThrow
   */
  export type EventAttendanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttendance
     */
    select?: EventAttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttendance
     */
    omit?: EventAttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttendanceInclude<ExtArgs> | null
    /**
     * Filter, which EventAttendance to fetch.
     */
    where: EventAttendanceWhereUniqueInput
  }

  /**
   * EventAttendance findFirst
   */
  export type EventAttendanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttendance
     */
    select?: EventAttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttendance
     */
    omit?: EventAttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttendanceInclude<ExtArgs> | null
    /**
     * Filter, which EventAttendance to fetch.
     */
    where?: EventAttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventAttendances to fetch.
     */
    orderBy?: EventAttendanceOrderByWithRelationInput | EventAttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventAttendances.
     */
    cursor?: EventAttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventAttendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventAttendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventAttendances.
     */
    distinct?: EventAttendanceScalarFieldEnum | EventAttendanceScalarFieldEnum[]
  }

  /**
   * EventAttendance findFirstOrThrow
   */
  export type EventAttendanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttendance
     */
    select?: EventAttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttendance
     */
    omit?: EventAttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttendanceInclude<ExtArgs> | null
    /**
     * Filter, which EventAttendance to fetch.
     */
    where?: EventAttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventAttendances to fetch.
     */
    orderBy?: EventAttendanceOrderByWithRelationInput | EventAttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventAttendances.
     */
    cursor?: EventAttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventAttendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventAttendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventAttendances.
     */
    distinct?: EventAttendanceScalarFieldEnum | EventAttendanceScalarFieldEnum[]
  }

  /**
   * EventAttendance findMany
   */
  export type EventAttendanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttendance
     */
    select?: EventAttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttendance
     */
    omit?: EventAttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttendanceInclude<ExtArgs> | null
    /**
     * Filter, which EventAttendances to fetch.
     */
    where?: EventAttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventAttendances to fetch.
     */
    orderBy?: EventAttendanceOrderByWithRelationInput | EventAttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EventAttendances.
     */
    cursor?: EventAttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventAttendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventAttendances.
     */
    skip?: number
    distinct?: EventAttendanceScalarFieldEnum | EventAttendanceScalarFieldEnum[]
  }

  /**
   * EventAttendance create
   */
  export type EventAttendanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttendance
     */
    select?: EventAttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttendance
     */
    omit?: EventAttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttendanceInclude<ExtArgs> | null
    /**
     * The data needed to create a EventAttendance.
     */
    data: XOR<EventAttendanceCreateInput, EventAttendanceUncheckedCreateInput>
  }

  /**
   * EventAttendance createMany
   */
  export type EventAttendanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EventAttendances.
     */
    data: EventAttendanceCreateManyInput | EventAttendanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EventAttendance createManyAndReturn
   */
  export type EventAttendanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttendance
     */
    select?: EventAttendanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttendance
     */
    omit?: EventAttendanceOmit<ExtArgs> | null
    /**
     * The data used to create many EventAttendances.
     */
    data: EventAttendanceCreateManyInput | EventAttendanceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttendanceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventAttendance update
   */
  export type EventAttendanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttendance
     */
    select?: EventAttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttendance
     */
    omit?: EventAttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttendanceInclude<ExtArgs> | null
    /**
     * The data needed to update a EventAttendance.
     */
    data: XOR<EventAttendanceUpdateInput, EventAttendanceUncheckedUpdateInput>
    /**
     * Choose, which EventAttendance to update.
     */
    where: EventAttendanceWhereUniqueInput
  }

  /**
   * EventAttendance updateMany
   */
  export type EventAttendanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EventAttendances.
     */
    data: XOR<EventAttendanceUpdateManyMutationInput, EventAttendanceUncheckedUpdateManyInput>
    /**
     * Filter which EventAttendances to update
     */
    where?: EventAttendanceWhereInput
    /**
     * Limit how many EventAttendances to update.
     */
    limit?: number
  }

  /**
   * EventAttendance updateManyAndReturn
   */
  export type EventAttendanceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttendance
     */
    select?: EventAttendanceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttendance
     */
    omit?: EventAttendanceOmit<ExtArgs> | null
    /**
     * The data used to update EventAttendances.
     */
    data: XOR<EventAttendanceUpdateManyMutationInput, EventAttendanceUncheckedUpdateManyInput>
    /**
     * Filter which EventAttendances to update
     */
    where?: EventAttendanceWhereInput
    /**
     * Limit how many EventAttendances to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttendanceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventAttendance upsert
   */
  export type EventAttendanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttendance
     */
    select?: EventAttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttendance
     */
    omit?: EventAttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttendanceInclude<ExtArgs> | null
    /**
     * The filter to search for the EventAttendance to update in case it exists.
     */
    where: EventAttendanceWhereUniqueInput
    /**
     * In case the EventAttendance found by the `where` argument doesn't exist, create a new EventAttendance with this data.
     */
    create: XOR<EventAttendanceCreateInput, EventAttendanceUncheckedCreateInput>
    /**
     * In case the EventAttendance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventAttendanceUpdateInput, EventAttendanceUncheckedUpdateInput>
  }

  /**
   * EventAttendance delete
   */
  export type EventAttendanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttendance
     */
    select?: EventAttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttendance
     */
    omit?: EventAttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttendanceInclude<ExtArgs> | null
    /**
     * Filter which EventAttendance to delete.
     */
    where: EventAttendanceWhereUniqueInput
  }

  /**
   * EventAttendance deleteMany
   */
  export type EventAttendanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventAttendances to delete
     */
    where?: EventAttendanceWhereInput
    /**
     * Limit how many EventAttendances to delete.
     */
    limit?: number
  }

  /**
   * EventAttendance without action
   */
  export type EventAttendanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttendance
     */
    select?: EventAttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttendance
     */
    omit?: EventAttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttendanceInclude<ExtArgs> | null
  }


  /**
   * Model Question
   */

  export type AggregateQuestion = {
    _count: QuestionCountAggregateOutputType | null
    _avg: QuestionAvgAggregateOutputType | null
    _sum: QuestionSumAggregateOutputType | null
    _min: QuestionMinAggregateOutputType | null
    _max: QuestionMaxAggregateOutputType | null
  }

  export type QuestionAvgAggregateOutputType = {
    id: number | null
    term_id: number | null
    order_num: number | null
    max_length: number | null
  }

  export type QuestionSumAggregateOutputType = {
    id: bigint | null
    term_id: bigint | null
    order_num: number | null
    max_length: number | null
  }

  export type QuestionMinAggregateOutputType = {
    id: bigint | null
    term_id: bigint | null
    question_id: string | null
    role: $Enums.Role | null
    type: $Enums.QuestionType | null
    question: string | null
    is_required: boolean | null
    order_num: number | null
    max_length: number | null
    placeholder: string | null
    help_text: string | null
  }

  export type QuestionMaxAggregateOutputType = {
    id: bigint | null
    term_id: bigint | null
    question_id: string | null
    role: $Enums.Role | null
    type: $Enums.QuestionType | null
    question: string | null
    is_required: boolean | null
    order_num: number | null
    max_length: number | null
    placeholder: string | null
    help_text: string | null
  }

  export type QuestionCountAggregateOutputType = {
    id: number
    term_id: number
    question_id: number
    role: number
    type: number
    question: number
    is_required: number
    order_num: number
    max_length: number
    placeholder: number
    help_text: number
    _all: number
  }


  export type QuestionAvgAggregateInputType = {
    id?: true
    term_id?: true
    order_num?: true
    max_length?: true
  }

  export type QuestionSumAggregateInputType = {
    id?: true
    term_id?: true
    order_num?: true
    max_length?: true
  }

  export type QuestionMinAggregateInputType = {
    id?: true
    term_id?: true
    question_id?: true
    role?: true
    type?: true
    question?: true
    is_required?: true
    order_num?: true
    max_length?: true
    placeholder?: true
    help_text?: true
  }

  export type QuestionMaxAggregateInputType = {
    id?: true
    term_id?: true
    question_id?: true
    role?: true
    type?: true
    question?: true
    is_required?: true
    order_num?: true
    max_length?: true
    placeholder?: true
    help_text?: true
  }

  export type QuestionCountAggregateInputType = {
    id?: true
    term_id?: true
    question_id?: true
    role?: true
    type?: true
    question?: true
    is_required?: true
    order_num?: true
    max_length?: true
    placeholder?: true
    help_text?: true
    _all?: true
  }

  export type QuestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Question to aggregate.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Questions
    **/
    _count?: true | QuestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuestionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuestionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuestionMaxAggregateInputType
  }

  export type GetQuestionAggregateType<T extends QuestionAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestion[P]>
      : GetScalarType<T[P], AggregateQuestion[P]>
  }




  export type QuestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionWhereInput
    orderBy?: QuestionOrderByWithAggregationInput | QuestionOrderByWithAggregationInput[]
    by: QuestionScalarFieldEnum[] | QuestionScalarFieldEnum
    having?: QuestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuestionCountAggregateInputType | true
    _avg?: QuestionAvgAggregateInputType
    _sum?: QuestionSumAggregateInputType
    _min?: QuestionMinAggregateInputType
    _max?: QuestionMaxAggregateInputType
  }

  export type QuestionGroupByOutputType = {
    id: bigint
    term_id: bigint
    question_id: string
    role: $Enums.Role
    type: $Enums.QuestionType
    question: string
    is_required: boolean
    order_num: number
    max_length: number | null
    placeholder: string | null
    help_text: string | null
    _count: QuestionCountAggregateOutputType | null
    _avg: QuestionAvgAggregateOutputType | null
    _sum: QuestionSumAggregateOutputType | null
    _min: QuestionMinAggregateOutputType | null
    _max: QuestionMaxAggregateOutputType | null
  }

  type GetQuestionGroupByPayload<T extends QuestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuestionGroupByOutputType[P]>
            : GetScalarType<T[P], QuestionGroupByOutputType[P]>
        }
      >
    >


  export type QuestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    term_id?: boolean
    question_id?: boolean
    role?: boolean
    type?: boolean
    question?: boolean
    is_required?: boolean
    order_num?: boolean
    max_length?: boolean
    placeholder?: boolean
    help_text?: boolean
    term?: boolean | TermDefaultArgs<ExtArgs>
    answers?: boolean | Question$answersArgs<ExtArgs>
    _count?: boolean | QuestionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    term_id?: boolean
    question_id?: boolean
    role?: boolean
    type?: boolean
    question?: boolean
    is_required?: boolean
    order_num?: boolean
    max_length?: boolean
    placeholder?: boolean
    help_text?: boolean
    term?: boolean | TermDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    term_id?: boolean
    question_id?: boolean
    role?: boolean
    type?: boolean
    question?: boolean
    is_required?: boolean
    order_num?: boolean
    max_length?: boolean
    placeholder?: boolean
    help_text?: boolean
    term?: boolean | TermDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectScalar = {
    id?: boolean
    term_id?: boolean
    question_id?: boolean
    role?: boolean
    type?: boolean
    question?: boolean
    is_required?: boolean
    order_num?: boolean
    max_length?: boolean
    placeholder?: boolean
    help_text?: boolean
  }

  export type QuestionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "term_id" | "question_id" | "role" | "type" | "question" | "is_required" | "order_num" | "max_length" | "placeholder" | "help_text", ExtArgs["result"]["question"]>
  export type QuestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    term?: boolean | TermDefaultArgs<ExtArgs>
    answers?: boolean | Question$answersArgs<ExtArgs>
    _count?: boolean | QuestionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QuestionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    term?: boolean | TermDefaultArgs<ExtArgs>
  }
  export type QuestionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    term?: boolean | TermDefaultArgs<ExtArgs>
  }

  export type $QuestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Question"
    objects: {
      term: Prisma.$TermPayload<ExtArgs>
      answers: Prisma.$ApplicationAnswerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      term_id: bigint
      question_id: string
      role: $Enums.Role
      type: $Enums.QuestionType
      question: string
      is_required: boolean
      order_num: number
      max_length: number | null
      placeholder: string | null
      help_text: string | null
    }, ExtArgs["result"]["question"]>
    composites: {}
  }

  type QuestionGetPayload<S extends boolean | null | undefined | QuestionDefaultArgs> = $Result.GetResult<Prisma.$QuestionPayload, S>

  type QuestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuestionCountAggregateInputType | true
    }

  export interface QuestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Question'], meta: { name: 'Question' } }
    /**
     * Find zero or one Question that matches the filter.
     * @param {QuestionFindUniqueArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuestionFindUniqueArgs>(args: SelectSubset<T, QuestionFindUniqueArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Question that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuestionFindUniqueOrThrowArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuestionFindUniqueOrThrowArgs>(args: SelectSubset<T, QuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Question that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindFirstArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuestionFindFirstArgs>(args?: SelectSubset<T, QuestionFindFirstArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Question that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindFirstOrThrowArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuestionFindFirstOrThrowArgs>(args?: SelectSubset<T, QuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Questions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Questions
     * const questions = await prisma.question.findMany()
     * 
     * // Get first 10 Questions
     * const questions = await prisma.question.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const questionWithIdOnly = await prisma.question.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuestionFindManyArgs>(args?: SelectSubset<T, QuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Question.
     * @param {QuestionCreateArgs} args - Arguments to create a Question.
     * @example
     * // Create one Question
     * const Question = await prisma.question.create({
     *   data: {
     *     // ... data to create a Question
     *   }
     * })
     * 
     */
    create<T extends QuestionCreateArgs>(args: SelectSubset<T, QuestionCreateArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Questions.
     * @param {QuestionCreateManyArgs} args - Arguments to create many Questions.
     * @example
     * // Create many Questions
     * const question = await prisma.question.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuestionCreateManyArgs>(args?: SelectSubset<T, QuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Questions and returns the data saved in the database.
     * @param {QuestionCreateManyAndReturnArgs} args - Arguments to create many Questions.
     * @example
     * // Create many Questions
     * const question = await prisma.question.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Questions and only return the `id`
     * const questionWithIdOnly = await prisma.question.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuestionCreateManyAndReturnArgs>(args?: SelectSubset<T, QuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Question.
     * @param {QuestionDeleteArgs} args - Arguments to delete one Question.
     * @example
     * // Delete one Question
     * const Question = await prisma.question.delete({
     *   where: {
     *     // ... filter to delete one Question
     *   }
     * })
     * 
     */
    delete<T extends QuestionDeleteArgs>(args: SelectSubset<T, QuestionDeleteArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Question.
     * @param {QuestionUpdateArgs} args - Arguments to update one Question.
     * @example
     * // Update one Question
     * const question = await prisma.question.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuestionUpdateArgs>(args: SelectSubset<T, QuestionUpdateArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Questions.
     * @param {QuestionDeleteManyArgs} args - Arguments to filter Questions to delete.
     * @example
     * // Delete a few Questions
     * const { count } = await prisma.question.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuestionDeleteManyArgs>(args?: SelectSubset<T, QuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Questions
     * const question = await prisma.question.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuestionUpdateManyArgs>(args: SelectSubset<T, QuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Questions and returns the data updated in the database.
     * @param {QuestionUpdateManyAndReturnArgs} args - Arguments to update many Questions.
     * @example
     * // Update many Questions
     * const question = await prisma.question.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Questions and only return the `id`
     * const questionWithIdOnly = await prisma.question.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QuestionUpdateManyAndReturnArgs>(args: SelectSubset<T, QuestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Question.
     * @param {QuestionUpsertArgs} args - Arguments to update or create a Question.
     * @example
     * // Update or create a Question
     * const question = await prisma.question.upsert({
     *   create: {
     *     // ... data to create a Question
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Question we want to update
     *   }
     * })
     */
    upsert<T extends QuestionUpsertArgs>(args: SelectSubset<T, QuestionUpsertArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionCountArgs} args - Arguments to filter Questions to count.
     * @example
     * // Count the number of Questions
     * const count = await prisma.question.count({
     *   where: {
     *     // ... the filter for the Questions we want to count
     *   }
     * })
    **/
    count<T extends QuestionCountArgs>(
      args?: Subset<T, QuestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuestionAggregateArgs>(args: Subset<T, QuestionAggregateArgs>): Prisma.PrismaPromise<GetQuestionAggregateType<T>>

    /**
     * Group by Question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuestionGroupByArgs['orderBy'] }
        : { orderBy?: QuestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Question model
   */
  readonly fields: QuestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Question.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    term<T extends TermDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TermDefaultArgs<ExtArgs>>): Prisma__TermClient<$Result.GetResult<Prisma.$TermPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    answers<T extends Question$answersArgs<ExtArgs> = {}>(args?: Subset<T, Question$answersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Question model
   */
  interface QuestionFieldRefs {
    readonly id: FieldRef<"Question", 'BigInt'>
    readonly term_id: FieldRef<"Question", 'BigInt'>
    readonly question_id: FieldRef<"Question", 'String'>
    readonly role: FieldRef<"Question", 'Role'>
    readonly type: FieldRef<"Question", 'QuestionType'>
    readonly question: FieldRef<"Question", 'String'>
    readonly is_required: FieldRef<"Question", 'Boolean'>
    readonly order_num: FieldRef<"Question", 'Int'>
    readonly max_length: FieldRef<"Question", 'Int'>
    readonly placeholder: FieldRef<"Question", 'String'>
    readonly help_text: FieldRef<"Question", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Question findUnique
   */
  export type QuestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question findUniqueOrThrow
   */
  export type QuestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question findFirst
   */
  export type QuestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question findFirstOrThrow
   */
  export type QuestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question findMany
   */
  export type QuestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Questions to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question create
   */
  export type QuestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The data needed to create a Question.
     */
    data: XOR<QuestionCreateInput, QuestionUncheckedCreateInput>
  }

  /**
   * Question createMany
   */
  export type QuestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Questions.
     */
    data: QuestionCreateManyInput | QuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Question createManyAndReturn
   */
  export type QuestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * The data used to create many Questions.
     */
    data: QuestionCreateManyInput | QuestionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Question update
   */
  export type QuestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The data needed to update a Question.
     */
    data: XOR<QuestionUpdateInput, QuestionUncheckedUpdateInput>
    /**
     * Choose, which Question to update.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question updateMany
   */
  export type QuestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Questions.
     */
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyInput>
    /**
     * Filter which Questions to update
     */
    where?: QuestionWhereInput
    /**
     * Limit how many Questions to update.
     */
    limit?: number
  }

  /**
   * Question updateManyAndReturn
   */
  export type QuestionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * The data used to update Questions.
     */
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyInput>
    /**
     * Filter which Questions to update
     */
    where?: QuestionWhereInput
    /**
     * Limit how many Questions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Question upsert
   */
  export type QuestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The filter to search for the Question to update in case it exists.
     */
    where: QuestionWhereUniqueInput
    /**
     * In case the Question found by the `where` argument doesn't exist, create a new Question with this data.
     */
    create: XOR<QuestionCreateInput, QuestionUncheckedCreateInput>
    /**
     * In case the Question was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuestionUpdateInput, QuestionUncheckedUpdateInput>
  }

  /**
   * Question delete
   */
  export type QuestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter which Question to delete.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question deleteMany
   */
  export type QuestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Questions to delete
     */
    where?: QuestionWhereInput
    /**
     * Limit how many Questions to delete.
     */
    limit?: number
  }

  /**
   * Question.answers
   */
  export type Question$answersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicationAnswer
     */
    select?: ApplicationAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicationAnswer
     */
    omit?: ApplicationAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationAnswerInclude<ExtArgs> | null
    where?: ApplicationAnswerWhereInput
    orderBy?: ApplicationAnswerOrderByWithRelationInput | ApplicationAnswerOrderByWithRelationInput[]
    cursor?: ApplicationAnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApplicationAnswerScalarFieldEnum | ApplicationAnswerScalarFieldEnum[]
  }

  /**
   * Question without action
   */
  export type QuestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
  }


  /**
   * Model Term
   */

  export type AggregateTerm = {
    _count: TermCountAggregateOutputType | null
    _avg: TermAvgAggregateOutputType | null
    _sum: TermSumAggregateOutputType | null
    _min: TermMinAggregateOutputType | null
    _max: TermMaxAggregateOutputType | null
  }

  export type TermAvgAggregateOutputType = {
    id: number | null
  }

  export type TermSumAggregateOutputType = {
    id: bigint | null
  }

  export type TermMinAggregateOutputType = {
    id: bigint | null
    term_name: string | null
    app_release_date: Date | null
    app_soft_deadline: Date | null
    app_hard_deadline: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TermMaxAggregateOutputType = {
    id: bigint | null
    term_name: string | null
    app_release_date: Date | null
    app_soft_deadline: Date | null
    app_hard_deadline: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TermCountAggregateOutputType = {
    id: number
    term_name: number
    app_release_date: number
    app_soft_deadline: number
    app_hard_deadline: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type TermAvgAggregateInputType = {
    id?: true
  }

  export type TermSumAggregateInputType = {
    id?: true
  }

  export type TermMinAggregateInputType = {
    id?: true
    term_name?: true
    app_release_date?: true
    app_soft_deadline?: true
    app_hard_deadline?: true
    created_at?: true
    updated_at?: true
  }

  export type TermMaxAggregateInputType = {
    id?: true
    term_name?: true
    app_release_date?: true
    app_soft_deadline?: true
    app_hard_deadline?: true
    created_at?: true
    updated_at?: true
  }

  export type TermCountAggregateInputType = {
    id?: true
    term_name?: true
    app_release_date?: true
    app_soft_deadline?: true
    app_hard_deadline?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type TermAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Term to aggregate.
     */
    where?: TermWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Terms to fetch.
     */
    orderBy?: TermOrderByWithRelationInput | TermOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TermWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Terms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Terms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Terms
    **/
    _count?: true | TermCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TermAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TermSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TermMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TermMaxAggregateInputType
  }

  export type GetTermAggregateType<T extends TermAggregateArgs> = {
        [P in keyof T & keyof AggregateTerm]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTerm[P]>
      : GetScalarType<T[P], AggregateTerm[P]>
  }




  export type TermGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TermWhereInput
    orderBy?: TermOrderByWithAggregationInput | TermOrderByWithAggregationInput[]
    by: TermScalarFieldEnum[] | TermScalarFieldEnum
    having?: TermScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TermCountAggregateInputType | true
    _avg?: TermAvgAggregateInputType
    _sum?: TermSumAggregateInputType
    _min?: TermMinAggregateInputType
    _max?: TermMaxAggregateInputType
  }

  export type TermGroupByOutputType = {
    id: bigint
    term_name: string
    app_release_date: Date
    app_soft_deadline: Date
    app_hard_deadline: Date
    created_at: Date
    updated_at: Date
    _count: TermCountAggregateOutputType | null
    _avg: TermAvgAggregateOutputType | null
    _sum: TermSumAggregateOutputType | null
    _min: TermMinAggregateOutputType | null
    _max: TermMaxAggregateOutputType | null
  }

  type GetTermGroupByPayload<T extends TermGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TermGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TermGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TermGroupByOutputType[P]>
            : GetScalarType<T[P], TermGroupByOutputType[P]>
        }
      >
    >


  export type TermSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    term_name?: boolean
    app_release_date?: boolean
    app_soft_deadline?: boolean
    app_hard_deadline?: boolean
    created_at?: boolean
    updated_at?: boolean
    applications?: boolean | Term$applicationsArgs<ExtArgs>
    questions?: boolean | Term$questionsArgs<ExtArgs>
    _count?: boolean | TermCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["term"]>

  export type TermSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    term_name?: boolean
    app_release_date?: boolean
    app_soft_deadline?: boolean
    app_hard_deadline?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["term"]>

  export type TermSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    term_name?: boolean
    app_release_date?: boolean
    app_soft_deadline?: boolean
    app_hard_deadline?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["term"]>

  export type TermSelectScalar = {
    id?: boolean
    term_name?: boolean
    app_release_date?: boolean
    app_soft_deadline?: boolean
    app_hard_deadline?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type TermOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "term_name" | "app_release_date" | "app_soft_deadline" | "app_hard_deadline" | "created_at" | "updated_at", ExtArgs["result"]["term"]>
  export type TermInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | Term$applicationsArgs<ExtArgs>
    questions?: boolean | Term$questionsArgs<ExtArgs>
    _count?: boolean | TermCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TermIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TermIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TermPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Term"
    objects: {
      applications: Prisma.$ApplicationPayload<ExtArgs>[]
      questions: Prisma.$QuestionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      term_name: string
      app_release_date: Date
      app_soft_deadline: Date
      app_hard_deadline: Date
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["term"]>
    composites: {}
  }

  type TermGetPayload<S extends boolean | null | undefined | TermDefaultArgs> = $Result.GetResult<Prisma.$TermPayload, S>

  type TermCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TermFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TermCountAggregateInputType | true
    }

  export interface TermDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Term'], meta: { name: 'Term' } }
    /**
     * Find zero or one Term that matches the filter.
     * @param {TermFindUniqueArgs} args - Arguments to find a Term
     * @example
     * // Get one Term
     * const term = await prisma.term.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TermFindUniqueArgs>(args: SelectSubset<T, TermFindUniqueArgs<ExtArgs>>): Prisma__TermClient<$Result.GetResult<Prisma.$TermPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Term that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TermFindUniqueOrThrowArgs} args - Arguments to find a Term
     * @example
     * // Get one Term
     * const term = await prisma.term.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TermFindUniqueOrThrowArgs>(args: SelectSubset<T, TermFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TermClient<$Result.GetResult<Prisma.$TermPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Term that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TermFindFirstArgs} args - Arguments to find a Term
     * @example
     * // Get one Term
     * const term = await prisma.term.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TermFindFirstArgs>(args?: SelectSubset<T, TermFindFirstArgs<ExtArgs>>): Prisma__TermClient<$Result.GetResult<Prisma.$TermPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Term that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TermFindFirstOrThrowArgs} args - Arguments to find a Term
     * @example
     * // Get one Term
     * const term = await prisma.term.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TermFindFirstOrThrowArgs>(args?: SelectSubset<T, TermFindFirstOrThrowArgs<ExtArgs>>): Prisma__TermClient<$Result.GetResult<Prisma.$TermPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Terms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TermFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Terms
     * const terms = await prisma.term.findMany()
     * 
     * // Get first 10 Terms
     * const terms = await prisma.term.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const termWithIdOnly = await prisma.term.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TermFindManyArgs>(args?: SelectSubset<T, TermFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TermPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Term.
     * @param {TermCreateArgs} args - Arguments to create a Term.
     * @example
     * // Create one Term
     * const Term = await prisma.term.create({
     *   data: {
     *     // ... data to create a Term
     *   }
     * })
     * 
     */
    create<T extends TermCreateArgs>(args: SelectSubset<T, TermCreateArgs<ExtArgs>>): Prisma__TermClient<$Result.GetResult<Prisma.$TermPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Terms.
     * @param {TermCreateManyArgs} args - Arguments to create many Terms.
     * @example
     * // Create many Terms
     * const term = await prisma.term.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TermCreateManyArgs>(args?: SelectSubset<T, TermCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Terms and returns the data saved in the database.
     * @param {TermCreateManyAndReturnArgs} args - Arguments to create many Terms.
     * @example
     * // Create many Terms
     * const term = await prisma.term.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Terms and only return the `id`
     * const termWithIdOnly = await prisma.term.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TermCreateManyAndReturnArgs>(args?: SelectSubset<T, TermCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TermPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Term.
     * @param {TermDeleteArgs} args - Arguments to delete one Term.
     * @example
     * // Delete one Term
     * const Term = await prisma.term.delete({
     *   where: {
     *     // ... filter to delete one Term
     *   }
     * })
     * 
     */
    delete<T extends TermDeleteArgs>(args: SelectSubset<T, TermDeleteArgs<ExtArgs>>): Prisma__TermClient<$Result.GetResult<Prisma.$TermPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Term.
     * @param {TermUpdateArgs} args - Arguments to update one Term.
     * @example
     * // Update one Term
     * const term = await prisma.term.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TermUpdateArgs>(args: SelectSubset<T, TermUpdateArgs<ExtArgs>>): Prisma__TermClient<$Result.GetResult<Prisma.$TermPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Terms.
     * @param {TermDeleteManyArgs} args - Arguments to filter Terms to delete.
     * @example
     * // Delete a few Terms
     * const { count } = await prisma.term.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TermDeleteManyArgs>(args?: SelectSubset<T, TermDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Terms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TermUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Terms
     * const term = await prisma.term.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TermUpdateManyArgs>(args: SelectSubset<T, TermUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Terms and returns the data updated in the database.
     * @param {TermUpdateManyAndReturnArgs} args - Arguments to update many Terms.
     * @example
     * // Update many Terms
     * const term = await prisma.term.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Terms and only return the `id`
     * const termWithIdOnly = await prisma.term.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TermUpdateManyAndReturnArgs>(args: SelectSubset<T, TermUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TermPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Term.
     * @param {TermUpsertArgs} args - Arguments to update or create a Term.
     * @example
     * // Update or create a Term
     * const term = await prisma.term.upsert({
     *   create: {
     *     // ... data to create a Term
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Term we want to update
     *   }
     * })
     */
    upsert<T extends TermUpsertArgs>(args: SelectSubset<T, TermUpsertArgs<ExtArgs>>): Prisma__TermClient<$Result.GetResult<Prisma.$TermPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Terms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TermCountArgs} args - Arguments to filter Terms to count.
     * @example
     * // Count the number of Terms
     * const count = await prisma.term.count({
     *   where: {
     *     // ... the filter for the Terms we want to count
     *   }
     * })
    **/
    count<T extends TermCountArgs>(
      args?: Subset<T, TermCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TermCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Term.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TermAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TermAggregateArgs>(args: Subset<T, TermAggregateArgs>): Prisma.PrismaPromise<GetTermAggregateType<T>>

    /**
     * Group by Term.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TermGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TermGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TermGroupByArgs['orderBy'] }
        : { orderBy?: TermGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TermGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTermGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Term model
   */
  readonly fields: TermFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Term.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TermClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    applications<T extends Term$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, Term$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    questions<T extends Term$questionsArgs<ExtArgs> = {}>(args?: Subset<T, Term$questionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Term model
   */
  interface TermFieldRefs {
    readonly id: FieldRef<"Term", 'BigInt'>
    readonly term_name: FieldRef<"Term", 'String'>
    readonly app_release_date: FieldRef<"Term", 'DateTime'>
    readonly app_soft_deadline: FieldRef<"Term", 'DateTime'>
    readonly app_hard_deadline: FieldRef<"Term", 'DateTime'>
    readonly created_at: FieldRef<"Term", 'DateTime'>
    readonly updated_at: FieldRef<"Term", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Term findUnique
   */
  export type TermFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Term
     */
    select?: TermSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Term
     */
    omit?: TermOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TermInclude<ExtArgs> | null
    /**
     * Filter, which Term to fetch.
     */
    where: TermWhereUniqueInput
  }

  /**
   * Term findUniqueOrThrow
   */
  export type TermFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Term
     */
    select?: TermSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Term
     */
    omit?: TermOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TermInclude<ExtArgs> | null
    /**
     * Filter, which Term to fetch.
     */
    where: TermWhereUniqueInput
  }

  /**
   * Term findFirst
   */
  export type TermFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Term
     */
    select?: TermSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Term
     */
    omit?: TermOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TermInclude<ExtArgs> | null
    /**
     * Filter, which Term to fetch.
     */
    where?: TermWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Terms to fetch.
     */
    orderBy?: TermOrderByWithRelationInput | TermOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Terms.
     */
    cursor?: TermWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Terms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Terms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Terms.
     */
    distinct?: TermScalarFieldEnum | TermScalarFieldEnum[]
  }

  /**
   * Term findFirstOrThrow
   */
  export type TermFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Term
     */
    select?: TermSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Term
     */
    omit?: TermOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TermInclude<ExtArgs> | null
    /**
     * Filter, which Term to fetch.
     */
    where?: TermWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Terms to fetch.
     */
    orderBy?: TermOrderByWithRelationInput | TermOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Terms.
     */
    cursor?: TermWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Terms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Terms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Terms.
     */
    distinct?: TermScalarFieldEnum | TermScalarFieldEnum[]
  }

  /**
   * Term findMany
   */
  export type TermFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Term
     */
    select?: TermSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Term
     */
    omit?: TermOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TermInclude<ExtArgs> | null
    /**
     * Filter, which Terms to fetch.
     */
    where?: TermWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Terms to fetch.
     */
    orderBy?: TermOrderByWithRelationInput | TermOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Terms.
     */
    cursor?: TermWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Terms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Terms.
     */
    skip?: number
    distinct?: TermScalarFieldEnum | TermScalarFieldEnum[]
  }

  /**
   * Term create
   */
  export type TermCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Term
     */
    select?: TermSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Term
     */
    omit?: TermOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TermInclude<ExtArgs> | null
    /**
     * The data needed to create a Term.
     */
    data: XOR<TermCreateInput, TermUncheckedCreateInput>
  }

  /**
   * Term createMany
   */
  export type TermCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Terms.
     */
    data: TermCreateManyInput | TermCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Term createManyAndReturn
   */
  export type TermCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Term
     */
    select?: TermSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Term
     */
    omit?: TermOmit<ExtArgs> | null
    /**
     * The data used to create many Terms.
     */
    data: TermCreateManyInput | TermCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Term update
   */
  export type TermUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Term
     */
    select?: TermSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Term
     */
    omit?: TermOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TermInclude<ExtArgs> | null
    /**
     * The data needed to update a Term.
     */
    data: XOR<TermUpdateInput, TermUncheckedUpdateInput>
    /**
     * Choose, which Term to update.
     */
    where: TermWhereUniqueInput
  }

  /**
   * Term updateMany
   */
  export type TermUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Terms.
     */
    data: XOR<TermUpdateManyMutationInput, TermUncheckedUpdateManyInput>
    /**
     * Filter which Terms to update
     */
    where?: TermWhereInput
    /**
     * Limit how many Terms to update.
     */
    limit?: number
  }

  /**
   * Term updateManyAndReturn
   */
  export type TermUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Term
     */
    select?: TermSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Term
     */
    omit?: TermOmit<ExtArgs> | null
    /**
     * The data used to update Terms.
     */
    data: XOR<TermUpdateManyMutationInput, TermUncheckedUpdateManyInput>
    /**
     * Filter which Terms to update
     */
    where?: TermWhereInput
    /**
     * Limit how many Terms to update.
     */
    limit?: number
  }

  /**
   * Term upsert
   */
  export type TermUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Term
     */
    select?: TermSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Term
     */
    omit?: TermOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TermInclude<ExtArgs> | null
    /**
     * The filter to search for the Term to update in case it exists.
     */
    where: TermWhereUniqueInput
    /**
     * In case the Term found by the `where` argument doesn't exist, create a new Term with this data.
     */
    create: XOR<TermCreateInput, TermUncheckedCreateInput>
    /**
     * In case the Term was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TermUpdateInput, TermUncheckedUpdateInput>
  }

  /**
   * Term delete
   */
  export type TermDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Term
     */
    select?: TermSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Term
     */
    omit?: TermOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TermInclude<ExtArgs> | null
    /**
     * Filter which Term to delete.
     */
    where: TermWhereUniqueInput
  }

  /**
   * Term deleteMany
   */
  export type TermDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Terms to delete
     */
    where?: TermWhereInput
    /**
     * Limit how many Terms to delete.
     */
    limit?: number
  }

  /**
   * Term.applications
   */
  export type Term$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    where?: ApplicationWhereInput
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    cursor?: ApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Term.questions
   */
  export type Term$questionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    where?: QuestionWhereInput
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    cursor?: QuestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Term without action
   */
  export type TermDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Term
     */
    select?: TermSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Term
     */
    omit?: TermOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TermInclude<ExtArgs> | null
  }


  /**
   * Model Profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileMinAggregateOutputType = {
    id: string | null
    first_name: string | null
    last_name: string | null
    user_status: $Enums.UserStatus | null
    has_paid: boolean | null
    wat_iam: string | null
    faculty: $Enums.Faculty | null
    term: string | null
    heard_from_where: string | null
    payment_method: $Enums.PaymentMethod | null
    payment_location: string | null
    verifier: string | null
    member_ideas: string | null
    is_math_soc_member: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: string | null
    first_name: string | null
    last_name: string | null
    user_status: $Enums.UserStatus | null
    has_paid: boolean | null
    wat_iam: string | null
    faculty: $Enums.Faculty | null
    term: string | null
    heard_from_where: string | null
    payment_method: $Enums.PaymentMethod | null
    payment_location: string | null
    verifier: string | null
    member_ideas: string | null
    is_math_soc_member: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    first_name: number
    last_name: number
    user_status: number
    has_paid: number
    wat_iam: number
    faculty: number
    term: number
    heard_from_where: number
    payment_method: number
    payment_location: number
    verifier: number
    member_ideas: number
    is_math_soc_member: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ProfileMinAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    user_status?: true
    has_paid?: true
    wat_iam?: true
    faculty?: true
    term?: true
    heard_from_where?: true
    payment_method?: true
    payment_location?: true
    verifier?: true
    member_ideas?: true
    is_math_soc_member?: true
    created_at?: true
    updated_at?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    user_status?: true
    has_paid?: true
    wat_iam?: true
    faculty?: true
    term?: true
    heard_from_where?: true
    payment_method?: true
    payment_location?: true
    verifier?: true
    member_ideas?: true
    is_math_soc_member?: true
    created_at?: true
    updated_at?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    user_status?: true
    has_paid?: true
    wat_iam?: true
    faculty?: true
    term?: true
    heard_from_where?: true
    payment_method?: true
    payment_location?: true
    verifier?: true
    member_ideas?: true
    is_math_soc_member?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profile to aggregate.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithAggregationInput | ProfileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    id: string
    first_name: string
    last_name: string
    user_status: $Enums.UserStatus
    has_paid: boolean
    wat_iam: string | null
    faculty: $Enums.Faculty
    term: string
    heard_from_where: string
    payment_method: $Enums.PaymentMethod
    payment_location: string | null
    verifier: string | null
    member_ideas: string | null
    is_math_soc_member: boolean
    created_at: Date
    updated_at: Date
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    first_name?: boolean
    last_name?: boolean
    user_status?: boolean
    has_paid?: boolean
    wat_iam?: boolean
    faculty?: boolean
    term?: boolean
    heard_from_where?: boolean
    payment_method?: boolean
    payment_location?: boolean
    verifier?: boolean
    member_ideas?: boolean
    is_math_soc_member?: boolean
    created_at?: boolean
    updated_at?: boolean
    applications?: boolean | Profile$applicationsArgs<ExtArgs>
    event_attendances?: boolean | Profile$event_attendancesArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    first_name?: boolean
    last_name?: boolean
    user_status?: boolean
    has_paid?: boolean
    wat_iam?: boolean
    faculty?: boolean
    term?: boolean
    heard_from_where?: boolean
    payment_method?: boolean
    payment_location?: boolean
    verifier?: boolean
    member_ideas?: boolean
    is_math_soc_member?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    first_name?: boolean
    last_name?: boolean
    user_status?: boolean
    has_paid?: boolean
    wat_iam?: boolean
    faculty?: boolean
    term?: boolean
    heard_from_where?: boolean
    payment_method?: boolean
    payment_location?: boolean
    verifier?: boolean
    member_ideas?: boolean
    is_math_soc_member?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectScalar = {
    id?: boolean
    first_name?: boolean
    last_name?: boolean
    user_status?: boolean
    has_paid?: boolean
    wat_iam?: boolean
    faculty?: boolean
    term?: boolean
    heard_from_where?: boolean
    payment_method?: boolean
    payment_location?: boolean
    verifier?: boolean
    member_ideas?: boolean
    is_math_soc_member?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "first_name" | "last_name" | "user_status" | "has_paid" | "wat_iam" | "faculty" | "term" | "heard_from_where" | "payment_method" | "payment_location" | "verifier" | "member_ideas" | "is_math_soc_member" | "created_at" | "updated_at", ExtArgs["result"]["profile"]>
  export type ProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | Profile$applicationsArgs<ExtArgs>
    event_attendances?: boolean | Profile$event_attendancesArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profile"
    objects: {
      applications: Prisma.$ApplicationPayload<ExtArgs>[]
      event_attendances: Prisma.$EventAttendancePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      first_name: string
      last_name: string
      user_status: $Enums.UserStatus
      has_paid: boolean
      wat_iam: string | null
      faculty: $Enums.Faculty
      term: string
      heard_from_where: string
      payment_method: $Enums.PaymentMethod
      payment_location: string | null
      verifier: string | null
      member_ideas: string | null
      is_math_soc_member: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type ProfileGetPayload<S extends boolean | null | undefined | ProfileDefaultArgs> = $Result.GetResult<Prisma.$ProfilePayload, S>

  type ProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface ProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profile'], meta: { name: 'Profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileFindUniqueArgs>(args: SelectSubset<T, ProfileFindUniqueArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileFindFirstArgs>(args?: SelectSubset<T, ProfileFindFirstArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileFindManyArgs>(args?: SelectSubset<T, ProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends ProfileCreateArgs>(args: SelectSubset<T, ProfileCreateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Profiles.
     * @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileCreateManyArgs>(args?: SelectSubset<T, ProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profiles and returns the data saved in the database.
     * @param {ProfileCreateManyAndReturnArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends ProfileDeleteArgs>(args: SelectSubset<T, ProfileDeleteArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileUpdateArgs>(args: SelectSubset<T, ProfileUpdateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileDeleteManyArgs>(args?: SelectSubset<T, ProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileUpdateManyArgs>(args: SelectSubset<T, ProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles and returns the data updated in the database.
     * @param {ProfileUpdateManyAndReturnArgs} args - Arguments to update many Profiles.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends ProfileUpsertArgs>(args: SelectSubset<T, ProfileUpsertArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profile model
   */
  readonly fields: ProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    applications<T extends Profile$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, Profile$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    event_attendances<T extends Profile$event_attendancesArgs<ExtArgs> = {}>(args?: Subset<T, Profile$event_attendancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventAttendancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Profile model
   */
  interface ProfileFieldRefs {
    readonly id: FieldRef<"Profile", 'String'>
    readonly first_name: FieldRef<"Profile", 'String'>
    readonly last_name: FieldRef<"Profile", 'String'>
    readonly user_status: FieldRef<"Profile", 'UserStatus'>
    readonly has_paid: FieldRef<"Profile", 'Boolean'>
    readonly wat_iam: FieldRef<"Profile", 'String'>
    readonly faculty: FieldRef<"Profile", 'Faculty'>
    readonly term: FieldRef<"Profile", 'String'>
    readonly heard_from_where: FieldRef<"Profile", 'String'>
    readonly payment_method: FieldRef<"Profile", 'PaymentMethod'>
    readonly payment_location: FieldRef<"Profile", 'String'>
    readonly verifier: FieldRef<"Profile", 'String'>
    readonly member_ideas: FieldRef<"Profile", 'String'>
    readonly is_math_soc_member: FieldRef<"Profile", 'Boolean'>
    readonly created_at: FieldRef<"Profile", 'DateTime'>
    readonly updated_at: FieldRef<"Profile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profiles to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile create
   */
  export type ProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a Profile.
     */
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }

  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile createManyAndReturn
   */
  export type ProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile update
   */
  export type ProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a Profile.
     */
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile updateManyAndReturn
   */
  export type ProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the Profile to update in case it exists.
     */
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     */
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }

  /**
   * Profile delete
   */
  export type ProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter which Profile to delete.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profiles to delete
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to delete.
     */
    limit?: number
  }

  /**
   * Profile.applications
   */
  export type Profile$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    where?: ApplicationWhereInput
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    cursor?: ApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Profile.event_attendances
   */
  export type Profile$event_attendancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttendance
     */
    select?: EventAttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttendance
     */
    omit?: EventAttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttendanceInclude<ExtArgs> | null
    where?: EventAttendanceWhereInput
    orderBy?: EventAttendanceOrderByWithRelationInput | EventAttendanceOrderByWithRelationInput[]
    cursor?: EventAttendanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventAttendanceScalarFieldEnum | EventAttendanceScalarFieldEnum[]
  }

  /**
   * Profile without action
   */
  export type ProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ApplicationScalarFieldEnum: {
    id: 'id',
    profile_id: 'profile_id',
    term_id: 'term_id',
    roles_applying_for: 'roles_applying_for',
    resume_path: 'resume_path',
    status: 'status',
    comments: 'comments',
    created_at: 'created_at',
    updated_at: 'updated_at',
    submitted_at: 'submitted_at'
  };

  export type ApplicationScalarFieldEnum = (typeof ApplicationScalarFieldEnum)[keyof typeof ApplicationScalarFieldEnum]


  export const ApplicationAnswerScalarFieldEnum: {
    id: 'id',
    application_id: 'application_id',
    question_id: 'question_id',
    answer_text: 'answer_text',
    answer_option: 'answer_option',
    answer_options: 'answer_options',
    answer_file: 'answer_file',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ApplicationAnswerScalarFieldEnum = (typeof ApplicationAnswerScalarFieldEnum)[keyof typeof ApplicationAnswerScalarFieldEnum]


  export const EventScalarFieldEnum: {
    id: 'id',
    name: 'name',
    registration_required: 'registration_required',
    description: 'description',
    location: 'location',
    start_time: 'start_time',
    buffered_start_time: 'buffered_start_time',
    end_time: 'end_time',
    buffered_end_time: 'buffered_end_time',
    payment_required: 'payment_required',
    image_id: 'image_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const EventAttendanceScalarFieldEnum: {
    id: 'id',
    event_id: 'event_id',
    profile_id: 'profile_id',
    checked_in: 'checked_in',
    created_at: 'created_at'
  };

  export type EventAttendanceScalarFieldEnum = (typeof EventAttendanceScalarFieldEnum)[keyof typeof EventAttendanceScalarFieldEnum]


  export const QuestionScalarFieldEnum: {
    id: 'id',
    term_id: 'term_id',
    question_id: 'question_id',
    role: 'role',
    type: 'type',
    question: 'question',
    is_required: 'is_required',
    order_num: 'order_num',
    max_length: 'max_length',
    placeholder: 'placeholder',
    help_text: 'help_text'
  };

  export type QuestionScalarFieldEnum = (typeof QuestionScalarFieldEnum)[keyof typeof QuestionScalarFieldEnum]


  export const TermScalarFieldEnum: {
    id: 'id',
    term_name: 'term_name',
    app_release_date: 'app_release_date',
    app_soft_deadline: 'app_soft_deadline',
    app_hard_deadline: 'app_hard_deadline',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type TermScalarFieldEnum = (typeof TermScalarFieldEnum)[keyof typeof TermScalarFieldEnum]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    first_name: 'first_name',
    last_name: 'last_name',
    user_status: 'user_status',
    has_paid: 'has_paid',
    wat_iam: 'wat_iam',
    faculty: 'faculty',
    term: 'term',
    heard_from_where: 'heard_from_where',
    payment_method: 'payment_method',
    payment_location: 'payment_location',
    verifier: 'verifier',
    member_ideas: 'member_ideas',
    is_math_soc_member: 'is_math_soc_member',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'ApplicationStatus'
   */
  export type EnumApplicationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApplicationStatus'>
    


  /**
   * Reference to a field of type 'ApplicationStatus[]'
   */
  export type ListEnumApplicationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApplicationStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'QuestionType'
   */
  export type EnumQuestionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionType'>
    


  /**
   * Reference to a field of type 'QuestionType[]'
   */
  export type ListEnumQuestionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'UserStatus'
   */
  export type EnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus'>
    


  /**
   * Reference to a field of type 'UserStatus[]'
   */
  export type ListEnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus[]'>
    


  /**
   * Reference to a field of type 'Faculty'
   */
  export type EnumFacultyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Faculty'>
    


  /**
   * Reference to a field of type 'Faculty[]'
   */
  export type ListEnumFacultyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Faculty[]'>
    


  /**
   * Reference to a field of type 'PaymentMethod'
   */
  export type EnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod'>
    


  /**
   * Reference to a field of type 'PaymentMethod[]'
   */
  export type ListEnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ApplicationWhereInput = {
    AND?: ApplicationWhereInput | ApplicationWhereInput[]
    OR?: ApplicationWhereInput[]
    NOT?: ApplicationWhereInput | ApplicationWhereInput[]
    id?: BigIntFilter<"Application"> | bigint | number
    profile_id?: UuidFilter<"Application"> | string
    term_id?: BigIntFilter<"Application"> | bigint | number
    roles_applying_for?: EnumRoleNullableListFilter<"Application">
    resume_path?: StringNullableFilter<"Application"> | string | null
    status?: EnumApplicationStatusFilter<"Application"> | $Enums.ApplicationStatus
    comments?: StringNullableFilter<"Application"> | string | null
    created_at?: DateTimeFilter<"Application"> | Date | string
    updated_at?: DateTimeFilter<"Application"> | Date | string
    submitted_at?: DateTimeNullableFilter<"Application"> | Date | string | null
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    term?: XOR<TermScalarRelationFilter, TermWhereInput>
    answers?: ApplicationAnswerListRelationFilter
  }

  export type ApplicationOrderByWithRelationInput = {
    id?: SortOrder
    profile_id?: SortOrder
    term_id?: SortOrder
    roles_applying_for?: SortOrder
    resume_path?: SortOrderInput | SortOrder
    status?: SortOrder
    comments?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    submitted_at?: SortOrderInput | SortOrder
    profile?: ProfileOrderByWithRelationInput
    term?: TermOrderByWithRelationInput
    answers?: ApplicationAnswerOrderByRelationAggregateInput
  }

  export type ApplicationWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    profile_id_term_id?: ApplicationProfile_idTerm_idCompoundUniqueInput
    AND?: ApplicationWhereInput | ApplicationWhereInput[]
    OR?: ApplicationWhereInput[]
    NOT?: ApplicationWhereInput | ApplicationWhereInput[]
    profile_id?: UuidFilter<"Application"> | string
    term_id?: BigIntFilter<"Application"> | bigint | number
    roles_applying_for?: EnumRoleNullableListFilter<"Application">
    resume_path?: StringNullableFilter<"Application"> | string | null
    status?: EnumApplicationStatusFilter<"Application"> | $Enums.ApplicationStatus
    comments?: StringNullableFilter<"Application"> | string | null
    created_at?: DateTimeFilter<"Application"> | Date | string
    updated_at?: DateTimeFilter<"Application"> | Date | string
    submitted_at?: DateTimeNullableFilter<"Application"> | Date | string | null
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    term?: XOR<TermScalarRelationFilter, TermWhereInput>
    answers?: ApplicationAnswerListRelationFilter
  }, "id" | "profile_id_term_id">

  export type ApplicationOrderByWithAggregationInput = {
    id?: SortOrder
    profile_id?: SortOrder
    term_id?: SortOrder
    roles_applying_for?: SortOrder
    resume_path?: SortOrderInput | SortOrder
    status?: SortOrder
    comments?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    submitted_at?: SortOrderInput | SortOrder
    _count?: ApplicationCountOrderByAggregateInput
    _avg?: ApplicationAvgOrderByAggregateInput
    _max?: ApplicationMaxOrderByAggregateInput
    _min?: ApplicationMinOrderByAggregateInput
    _sum?: ApplicationSumOrderByAggregateInput
  }

  export type ApplicationScalarWhereWithAggregatesInput = {
    AND?: ApplicationScalarWhereWithAggregatesInput | ApplicationScalarWhereWithAggregatesInput[]
    OR?: ApplicationScalarWhereWithAggregatesInput[]
    NOT?: ApplicationScalarWhereWithAggregatesInput | ApplicationScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Application"> | bigint | number
    profile_id?: UuidWithAggregatesFilter<"Application"> | string
    term_id?: BigIntWithAggregatesFilter<"Application"> | bigint | number
    roles_applying_for?: EnumRoleNullableListFilter<"Application">
    resume_path?: StringNullableWithAggregatesFilter<"Application"> | string | null
    status?: EnumApplicationStatusWithAggregatesFilter<"Application"> | $Enums.ApplicationStatus
    comments?: StringNullableWithAggregatesFilter<"Application"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Application"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Application"> | Date | string
    submitted_at?: DateTimeNullableWithAggregatesFilter<"Application"> | Date | string | null
  }

  export type ApplicationAnswerWhereInput = {
    AND?: ApplicationAnswerWhereInput | ApplicationAnswerWhereInput[]
    OR?: ApplicationAnswerWhereInput[]
    NOT?: ApplicationAnswerWhereInput | ApplicationAnswerWhereInput[]
    id?: BigIntFilter<"ApplicationAnswer"> | bigint | number
    application_id?: BigIntFilter<"ApplicationAnswer"> | bigint | number
    question_id?: BigIntFilter<"ApplicationAnswer"> | bigint | number
    answer_text?: StringNullableFilter<"ApplicationAnswer"> | string | null
    answer_option?: StringNullableFilter<"ApplicationAnswer"> | string | null
    answer_options?: StringNullableListFilter<"ApplicationAnswer">
    answer_file?: StringNullableFilter<"ApplicationAnswer"> | string | null
    created_at?: DateTimeFilter<"ApplicationAnswer"> | Date | string
    updated_at?: DateTimeFilter<"ApplicationAnswer"> | Date | string
    application?: XOR<ApplicationScalarRelationFilter, ApplicationWhereInput>
    question?: XOR<QuestionScalarRelationFilter, QuestionWhereInput>
  }

  export type ApplicationAnswerOrderByWithRelationInput = {
    id?: SortOrder
    application_id?: SortOrder
    question_id?: SortOrder
    answer_text?: SortOrderInput | SortOrder
    answer_option?: SortOrderInput | SortOrder
    answer_options?: SortOrder
    answer_file?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    application?: ApplicationOrderByWithRelationInput
    question?: QuestionOrderByWithRelationInput
  }

  export type ApplicationAnswerWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    application_id_question_id?: ApplicationAnswerApplication_idQuestion_idCompoundUniqueInput
    AND?: ApplicationAnswerWhereInput | ApplicationAnswerWhereInput[]
    OR?: ApplicationAnswerWhereInput[]
    NOT?: ApplicationAnswerWhereInput | ApplicationAnswerWhereInput[]
    application_id?: BigIntFilter<"ApplicationAnswer"> | bigint | number
    question_id?: BigIntFilter<"ApplicationAnswer"> | bigint | number
    answer_text?: StringNullableFilter<"ApplicationAnswer"> | string | null
    answer_option?: StringNullableFilter<"ApplicationAnswer"> | string | null
    answer_options?: StringNullableListFilter<"ApplicationAnswer">
    answer_file?: StringNullableFilter<"ApplicationAnswer"> | string | null
    created_at?: DateTimeFilter<"ApplicationAnswer"> | Date | string
    updated_at?: DateTimeFilter<"ApplicationAnswer"> | Date | string
    application?: XOR<ApplicationScalarRelationFilter, ApplicationWhereInput>
    question?: XOR<QuestionScalarRelationFilter, QuestionWhereInput>
  }, "id" | "application_id_question_id">

  export type ApplicationAnswerOrderByWithAggregationInput = {
    id?: SortOrder
    application_id?: SortOrder
    question_id?: SortOrder
    answer_text?: SortOrderInput | SortOrder
    answer_option?: SortOrderInput | SortOrder
    answer_options?: SortOrder
    answer_file?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ApplicationAnswerCountOrderByAggregateInput
    _avg?: ApplicationAnswerAvgOrderByAggregateInput
    _max?: ApplicationAnswerMaxOrderByAggregateInput
    _min?: ApplicationAnswerMinOrderByAggregateInput
    _sum?: ApplicationAnswerSumOrderByAggregateInput
  }

  export type ApplicationAnswerScalarWhereWithAggregatesInput = {
    AND?: ApplicationAnswerScalarWhereWithAggregatesInput | ApplicationAnswerScalarWhereWithAggregatesInput[]
    OR?: ApplicationAnswerScalarWhereWithAggregatesInput[]
    NOT?: ApplicationAnswerScalarWhereWithAggregatesInput | ApplicationAnswerScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"ApplicationAnswer"> | bigint | number
    application_id?: BigIntWithAggregatesFilter<"ApplicationAnswer"> | bigint | number
    question_id?: BigIntWithAggregatesFilter<"ApplicationAnswer"> | bigint | number
    answer_text?: StringNullableWithAggregatesFilter<"ApplicationAnswer"> | string | null
    answer_option?: StringNullableWithAggregatesFilter<"ApplicationAnswer"> | string | null
    answer_options?: StringNullableListFilter<"ApplicationAnswer">
    answer_file?: StringNullableWithAggregatesFilter<"ApplicationAnswer"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"ApplicationAnswer"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"ApplicationAnswer"> | Date | string
  }

  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    id?: BigIntFilter<"Event"> | bigint | number
    name?: StringFilter<"Event"> | string
    registration_required?: BoolFilter<"Event"> | boolean
    description?: StringNullableFilter<"Event"> | string | null
    location?: StringNullableFilter<"Event"> | string | null
    start_time?: DateTimeFilter<"Event"> | Date | string
    buffered_start_time?: DateTimeFilter<"Event"> | Date | string
    end_time?: DateTimeFilter<"Event"> | Date | string
    buffered_end_time?: DateTimeFilter<"Event"> | Date | string
    payment_required?: BoolFilter<"Event"> | boolean
    image_id?: BigIntNullableFilter<"Event"> | bigint | number | null
    created_at?: DateTimeFilter<"Event"> | Date | string
    updated_at?: DateTimeFilter<"Event"> | Date | string
    attendances?: EventAttendanceListRelationFilter
  }

  export type EventOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    registration_required?: SortOrder
    description?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    start_time?: SortOrder
    buffered_start_time?: SortOrder
    end_time?: SortOrder
    buffered_end_time?: SortOrder
    payment_required?: SortOrder
    image_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    attendances?: EventAttendanceOrderByRelationAggregateInput
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    name?: StringFilter<"Event"> | string
    registration_required?: BoolFilter<"Event"> | boolean
    description?: StringNullableFilter<"Event"> | string | null
    location?: StringNullableFilter<"Event"> | string | null
    start_time?: DateTimeFilter<"Event"> | Date | string
    buffered_start_time?: DateTimeFilter<"Event"> | Date | string
    end_time?: DateTimeFilter<"Event"> | Date | string
    buffered_end_time?: DateTimeFilter<"Event"> | Date | string
    payment_required?: BoolFilter<"Event"> | boolean
    image_id?: BigIntNullableFilter<"Event"> | bigint | number | null
    created_at?: DateTimeFilter<"Event"> | Date | string
    updated_at?: DateTimeFilter<"Event"> | Date | string
    attendances?: EventAttendanceListRelationFilter
  }, "id">

  export type EventOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    registration_required?: SortOrder
    description?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    start_time?: SortOrder
    buffered_start_time?: SortOrder
    end_time?: SortOrder
    buffered_end_time?: SortOrder
    payment_required?: SortOrder
    image_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: EventCountOrderByAggregateInput
    _avg?: EventAvgOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
    _sum?: EventSumOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Event"> | bigint | number
    name?: StringWithAggregatesFilter<"Event"> | string
    registration_required?: BoolWithAggregatesFilter<"Event"> | boolean
    description?: StringNullableWithAggregatesFilter<"Event"> | string | null
    location?: StringNullableWithAggregatesFilter<"Event"> | string | null
    start_time?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    buffered_start_time?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    end_time?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    buffered_end_time?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    payment_required?: BoolWithAggregatesFilter<"Event"> | boolean
    image_id?: BigIntNullableWithAggregatesFilter<"Event"> | bigint | number | null
    created_at?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Event"> | Date | string
  }

  export type EventAttendanceWhereInput = {
    AND?: EventAttendanceWhereInput | EventAttendanceWhereInput[]
    OR?: EventAttendanceWhereInput[]
    NOT?: EventAttendanceWhereInput | EventAttendanceWhereInput[]
    id?: BigIntFilter<"EventAttendance"> | bigint | number
    event_id?: BigIntFilter<"EventAttendance"> | bigint | number
    profile_id?: UuidFilter<"EventAttendance"> | string
    checked_in?: BoolFilter<"EventAttendance"> | boolean
    created_at?: DateTimeFilter<"EventAttendance"> | Date | string
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }

  export type EventAttendanceOrderByWithRelationInput = {
    id?: SortOrder
    event_id?: SortOrder
    profile_id?: SortOrder
    checked_in?: SortOrder
    created_at?: SortOrder
    event?: EventOrderByWithRelationInput
    profile?: ProfileOrderByWithRelationInput
  }

  export type EventAttendanceWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    event_id_profile_id?: EventAttendanceEvent_idProfile_idCompoundUniqueInput
    AND?: EventAttendanceWhereInput | EventAttendanceWhereInput[]
    OR?: EventAttendanceWhereInput[]
    NOT?: EventAttendanceWhereInput | EventAttendanceWhereInput[]
    event_id?: BigIntFilter<"EventAttendance"> | bigint | number
    profile_id?: UuidFilter<"EventAttendance"> | string
    checked_in?: BoolFilter<"EventAttendance"> | boolean
    created_at?: DateTimeFilter<"EventAttendance"> | Date | string
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }, "id" | "event_id_profile_id">

  export type EventAttendanceOrderByWithAggregationInput = {
    id?: SortOrder
    event_id?: SortOrder
    profile_id?: SortOrder
    checked_in?: SortOrder
    created_at?: SortOrder
    _count?: EventAttendanceCountOrderByAggregateInput
    _avg?: EventAttendanceAvgOrderByAggregateInput
    _max?: EventAttendanceMaxOrderByAggregateInput
    _min?: EventAttendanceMinOrderByAggregateInput
    _sum?: EventAttendanceSumOrderByAggregateInput
  }

  export type EventAttendanceScalarWhereWithAggregatesInput = {
    AND?: EventAttendanceScalarWhereWithAggregatesInput | EventAttendanceScalarWhereWithAggregatesInput[]
    OR?: EventAttendanceScalarWhereWithAggregatesInput[]
    NOT?: EventAttendanceScalarWhereWithAggregatesInput | EventAttendanceScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"EventAttendance"> | bigint | number
    event_id?: BigIntWithAggregatesFilter<"EventAttendance"> | bigint | number
    profile_id?: UuidWithAggregatesFilter<"EventAttendance"> | string
    checked_in?: BoolWithAggregatesFilter<"EventAttendance"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"EventAttendance"> | Date | string
  }

  export type QuestionWhereInput = {
    AND?: QuestionWhereInput | QuestionWhereInput[]
    OR?: QuestionWhereInput[]
    NOT?: QuestionWhereInput | QuestionWhereInput[]
    id?: BigIntFilter<"Question"> | bigint | number
    term_id?: BigIntFilter<"Question"> | bigint | number
    question_id?: StringFilter<"Question"> | string
    role?: EnumRoleFilter<"Question"> | $Enums.Role
    type?: EnumQuestionTypeFilter<"Question"> | $Enums.QuestionType
    question?: StringFilter<"Question"> | string
    is_required?: BoolFilter<"Question"> | boolean
    order_num?: IntFilter<"Question"> | number
    max_length?: IntNullableFilter<"Question"> | number | null
    placeholder?: StringNullableFilter<"Question"> | string | null
    help_text?: StringNullableFilter<"Question"> | string | null
    term?: XOR<TermScalarRelationFilter, TermWhereInput>
    answers?: ApplicationAnswerListRelationFilter
  }

  export type QuestionOrderByWithRelationInput = {
    id?: SortOrder
    term_id?: SortOrder
    question_id?: SortOrder
    role?: SortOrder
    type?: SortOrder
    question?: SortOrder
    is_required?: SortOrder
    order_num?: SortOrder
    max_length?: SortOrderInput | SortOrder
    placeholder?: SortOrderInput | SortOrder
    help_text?: SortOrderInput | SortOrder
    term?: TermOrderByWithRelationInput
    answers?: ApplicationAnswerOrderByRelationAggregateInput
  }

  export type QuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    term_id_question_id?: QuestionTerm_idQuestion_idCompoundUniqueInput
    AND?: QuestionWhereInput | QuestionWhereInput[]
    OR?: QuestionWhereInput[]
    NOT?: QuestionWhereInput | QuestionWhereInput[]
    term_id?: BigIntFilter<"Question"> | bigint | number
    question_id?: StringFilter<"Question"> | string
    role?: EnumRoleFilter<"Question"> | $Enums.Role
    type?: EnumQuestionTypeFilter<"Question"> | $Enums.QuestionType
    question?: StringFilter<"Question"> | string
    is_required?: BoolFilter<"Question"> | boolean
    order_num?: IntFilter<"Question"> | number
    max_length?: IntNullableFilter<"Question"> | number | null
    placeholder?: StringNullableFilter<"Question"> | string | null
    help_text?: StringNullableFilter<"Question"> | string | null
    term?: XOR<TermScalarRelationFilter, TermWhereInput>
    answers?: ApplicationAnswerListRelationFilter
  }, "id" | "term_id_question_id">

  export type QuestionOrderByWithAggregationInput = {
    id?: SortOrder
    term_id?: SortOrder
    question_id?: SortOrder
    role?: SortOrder
    type?: SortOrder
    question?: SortOrder
    is_required?: SortOrder
    order_num?: SortOrder
    max_length?: SortOrderInput | SortOrder
    placeholder?: SortOrderInput | SortOrder
    help_text?: SortOrderInput | SortOrder
    _count?: QuestionCountOrderByAggregateInput
    _avg?: QuestionAvgOrderByAggregateInput
    _max?: QuestionMaxOrderByAggregateInput
    _min?: QuestionMinOrderByAggregateInput
    _sum?: QuestionSumOrderByAggregateInput
  }

  export type QuestionScalarWhereWithAggregatesInput = {
    AND?: QuestionScalarWhereWithAggregatesInput | QuestionScalarWhereWithAggregatesInput[]
    OR?: QuestionScalarWhereWithAggregatesInput[]
    NOT?: QuestionScalarWhereWithAggregatesInput | QuestionScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Question"> | bigint | number
    term_id?: BigIntWithAggregatesFilter<"Question"> | bigint | number
    question_id?: StringWithAggregatesFilter<"Question"> | string
    role?: EnumRoleWithAggregatesFilter<"Question"> | $Enums.Role
    type?: EnumQuestionTypeWithAggregatesFilter<"Question"> | $Enums.QuestionType
    question?: StringWithAggregatesFilter<"Question"> | string
    is_required?: BoolWithAggregatesFilter<"Question"> | boolean
    order_num?: IntWithAggregatesFilter<"Question"> | number
    max_length?: IntNullableWithAggregatesFilter<"Question"> | number | null
    placeholder?: StringNullableWithAggregatesFilter<"Question"> | string | null
    help_text?: StringNullableWithAggregatesFilter<"Question"> | string | null
  }

  export type TermWhereInput = {
    AND?: TermWhereInput | TermWhereInput[]
    OR?: TermWhereInput[]
    NOT?: TermWhereInput | TermWhereInput[]
    id?: BigIntFilter<"Term"> | bigint | number
    term_name?: StringFilter<"Term"> | string
    app_release_date?: DateTimeFilter<"Term"> | Date | string
    app_soft_deadline?: DateTimeFilter<"Term"> | Date | string
    app_hard_deadline?: DateTimeFilter<"Term"> | Date | string
    created_at?: DateTimeFilter<"Term"> | Date | string
    updated_at?: DateTimeFilter<"Term"> | Date | string
    applications?: ApplicationListRelationFilter
    questions?: QuestionListRelationFilter
  }

  export type TermOrderByWithRelationInput = {
    id?: SortOrder
    term_name?: SortOrder
    app_release_date?: SortOrder
    app_soft_deadline?: SortOrder
    app_hard_deadline?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    applications?: ApplicationOrderByRelationAggregateInput
    questions?: QuestionOrderByRelationAggregateInput
  }

  export type TermWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    term_name?: string
    AND?: TermWhereInput | TermWhereInput[]
    OR?: TermWhereInput[]
    NOT?: TermWhereInput | TermWhereInput[]
    app_release_date?: DateTimeFilter<"Term"> | Date | string
    app_soft_deadline?: DateTimeFilter<"Term"> | Date | string
    app_hard_deadline?: DateTimeFilter<"Term"> | Date | string
    created_at?: DateTimeFilter<"Term"> | Date | string
    updated_at?: DateTimeFilter<"Term"> | Date | string
    applications?: ApplicationListRelationFilter
    questions?: QuestionListRelationFilter
  }, "id" | "term_name">

  export type TermOrderByWithAggregationInput = {
    id?: SortOrder
    term_name?: SortOrder
    app_release_date?: SortOrder
    app_soft_deadline?: SortOrder
    app_hard_deadline?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: TermCountOrderByAggregateInput
    _avg?: TermAvgOrderByAggregateInput
    _max?: TermMaxOrderByAggregateInput
    _min?: TermMinOrderByAggregateInput
    _sum?: TermSumOrderByAggregateInput
  }

  export type TermScalarWhereWithAggregatesInput = {
    AND?: TermScalarWhereWithAggregatesInput | TermScalarWhereWithAggregatesInput[]
    OR?: TermScalarWhereWithAggregatesInput[]
    NOT?: TermScalarWhereWithAggregatesInput | TermScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Term"> | bigint | number
    term_name?: StringWithAggregatesFilter<"Term"> | string
    app_release_date?: DateTimeWithAggregatesFilter<"Term"> | Date | string
    app_soft_deadline?: DateTimeWithAggregatesFilter<"Term"> | Date | string
    app_hard_deadline?: DateTimeWithAggregatesFilter<"Term"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"Term"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Term"> | Date | string
  }

  export type ProfileWhereInput = {
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    id?: UuidFilter<"Profile"> | string
    first_name?: StringFilter<"Profile"> | string
    last_name?: StringFilter<"Profile"> | string
    user_status?: EnumUserStatusFilter<"Profile"> | $Enums.UserStatus
    has_paid?: BoolFilter<"Profile"> | boolean
    wat_iam?: StringNullableFilter<"Profile"> | string | null
    faculty?: EnumFacultyFilter<"Profile"> | $Enums.Faculty
    term?: StringFilter<"Profile"> | string
    heard_from_where?: StringFilter<"Profile"> | string
    payment_method?: EnumPaymentMethodFilter<"Profile"> | $Enums.PaymentMethod
    payment_location?: StringNullableFilter<"Profile"> | string | null
    verifier?: StringNullableFilter<"Profile"> | string | null
    member_ideas?: StringNullableFilter<"Profile"> | string | null
    is_math_soc_member?: BoolFilter<"Profile"> | boolean
    created_at?: DateTimeFilter<"Profile"> | Date | string
    updated_at?: DateTimeFilter<"Profile"> | Date | string
    applications?: ApplicationListRelationFilter
    event_attendances?: EventAttendanceListRelationFilter
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    user_status?: SortOrder
    has_paid?: SortOrder
    wat_iam?: SortOrderInput | SortOrder
    faculty?: SortOrder
    term?: SortOrder
    heard_from_where?: SortOrder
    payment_method?: SortOrder
    payment_location?: SortOrderInput | SortOrder
    verifier?: SortOrderInput | SortOrder
    member_ideas?: SortOrderInput | SortOrder
    is_math_soc_member?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    applications?: ApplicationOrderByRelationAggregateInput
    event_attendances?: EventAttendanceOrderByRelationAggregateInput
  }

  export type ProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    first_name?: StringFilter<"Profile"> | string
    last_name?: StringFilter<"Profile"> | string
    user_status?: EnumUserStatusFilter<"Profile"> | $Enums.UserStatus
    has_paid?: BoolFilter<"Profile"> | boolean
    wat_iam?: StringNullableFilter<"Profile"> | string | null
    faculty?: EnumFacultyFilter<"Profile"> | $Enums.Faculty
    term?: StringFilter<"Profile"> | string
    heard_from_where?: StringFilter<"Profile"> | string
    payment_method?: EnumPaymentMethodFilter<"Profile"> | $Enums.PaymentMethod
    payment_location?: StringNullableFilter<"Profile"> | string | null
    verifier?: StringNullableFilter<"Profile"> | string | null
    member_ideas?: StringNullableFilter<"Profile"> | string | null
    is_math_soc_member?: BoolFilter<"Profile"> | boolean
    created_at?: DateTimeFilter<"Profile"> | Date | string
    updated_at?: DateTimeFilter<"Profile"> | Date | string
    applications?: ApplicationListRelationFilter
    event_attendances?: EventAttendanceListRelationFilter
  }, "id">

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    user_status?: SortOrder
    has_paid?: SortOrder
    wat_iam?: SortOrderInput | SortOrder
    faculty?: SortOrder
    term?: SortOrder
    heard_from_where?: SortOrder
    payment_method?: SortOrder
    payment_location?: SortOrderInput | SortOrder
    verifier?: SortOrderInput | SortOrder
    member_ideas?: SortOrderInput | SortOrder
    is_math_soc_member?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    OR?: ProfileScalarWhereWithAggregatesInput[]
    NOT?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Profile"> | string
    first_name?: StringWithAggregatesFilter<"Profile"> | string
    last_name?: StringWithAggregatesFilter<"Profile"> | string
    user_status?: EnumUserStatusWithAggregatesFilter<"Profile"> | $Enums.UserStatus
    has_paid?: BoolWithAggregatesFilter<"Profile"> | boolean
    wat_iam?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    faculty?: EnumFacultyWithAggregatesFilter<"Profile"> | $Enums.Faculty
    term?: StringWithAggregatesFilter<"Profile"> | string
    heard_from_where?: StringWithAggregatesFilter<"Profile"> | string
    payment_method?: EnumPaymentMethodWithAggregatesFilter<"Profile"> | $Enums.PaymentMethod
    payment_location?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    verifier?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    member_ideas?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    is_math_soc_member?: BoolWithAggregatesFilter<"Profile"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
  }

  export type ApplicationCreateInput = {
    id?: bigint | number
    roles_applying_for?: ApplicationCreateroles_applying_forInput | $Enums.Role[]
    resume_path?: string | null
    status?: $Enums.ApplicationStatus
    comments?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    submitted_at?: Date | string | null
    profile: ProfileCreateNestedOneWithoutApplicationsInput
    term: TermCreateNestedOneWithoutApplicationsInput
    answers?: ApplicationAnswerCreateNestedManyWithoutApplicationInput
  }

  export type ApplicationUncheckedCreateInput = {
    id?: bigint | number
    profile_id: string
    term_id: bigint | number
    roles_applying_for?: ApplicationCreateroles_applying_forInput | $Enums.Role[]
    resume_path?: string | null
    status?: $Enums.ApplicationStatus
    comments?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    submitted_at?: Date | string | null
    answers?: ApplicationAnswerUncheckedCreateNestedManyWithoutApplicationInput
  }

  export type ApplicationUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    roles_applying_for?: ApplicationUpdateroles_applying_forInput | $Enums.Role[]
    resume_path?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profile?: ProfileUpdateOneRequiredWithoutApplicationsNestedInput
    term?: TermUpdateOneRequiredWithoutApplicationsNestedInput
    answers?: ApplicationAnswerUpdateManyWithoutApplicationNestedInput
  }

  export type ApplicationUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    profile_id?: StringFieldUpdateOperationsInput | string
    term_id?: BigIntFieldUpdateOperationsInput | bigint | number
    roles_applying_for?: ApplicationUpdateroles_applying_forInput | $Enums.Role[]
    resume_path?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: ApplicationAnswerUncheckedUpdateManyWithoutApplicationNestedInput
  }

  export type ApplicationCreateManyInput = {
    id?: bigint | number
    profile_id: string
    term_id: bigint | number
    roles_applying_for?: ApplicationCreateroles_applying_forInput | $Enums.Role[]
    resume_path?: string | null
    status?: $Enums.ApplicationStatus
    comments?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    submitted_at?: Date | string | null
  }

  export type ApplicationUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    roles_applying_for?: ApplicationUpdateroles_applying_forInput | $Enums.Role[]
    resume_path?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApplicationUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    profile_id?: StringFieldUpdateOperationsInput | string
    term_id?: BigIntFieldUpdateOperationsInput | bigint | number
    roles_applying_for?: ApplicationUpdateroles_applying_forInput | $Enums.Role[]
    resume_path?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApplicationAnswerCreateInput = {
    id?: bigint | number
    answer_text?: string | null
    answer_option?: string | null
    answer_options?: ApplicationAnswerCreateanswer_optionsInput | string[]
    answer_file?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    application: ApplicationCreateNestedOneWithoutAnswersInput
    question: QuestionCreateNestedOneWithoutAnswersInput
  }

  export type ApplicationAnswerUncheckedCreateInput = {
    id?: bigint | number
    application_id: bigint | number
    question_id: bigint | number
    answer_text?: string | null
    answer_option?: string | null
    answer_options?: ApplicationAnswerCreateanswer_optionsInput | string[]
    answer_file?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ApplicationAnswerUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    answer_text?: NullableStringFieldUpdateOperationsInput | string | null
    answer_option?: NullableStringFieldUpdateOperationsInput | string | null
    answer_options?: ApplicationAnswerUpdateanswer_optionsInput | string[]
    answer_file?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    application?: ApplicationUpdateOneRequiredWithoutAnswersNestedInput
    question?: QuestionUpdateOneRequiredWithoutAnswersNestedInput
  }

  export type ApplicationAnswerUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    application_id?: BigIntFieldUpdateOperationsInput | bigint | number
    question_id?: BigIntFieldUpdateOperationsInput | bigint | number
    answer_text?: NullableStringFieldUpdateOperationsInput | string | null
    answer_option?: NullableStringFieldUpdateOperationsInput | string | null
    answer_options?: ApplicationAnswerUpdateanswer_optionsInput | string[]
    answer_file?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationAnswerCreateManyInput = {
    id?: bigint | number
    application_id: bigint | number
    question_id: bigint | number
    answer_text?: string | null
    answer_option?: string | null
    answer_options?: ApplicationAnswerCreateanswer_optionsInput | string[]
    answer_file?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ApplicationAnswerUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    answer_text?: NullableStringFieldUpdateOperationsInput | string | null
    answer_option?: NullableStringFieldUpdateOperationsInput | string | null
    answer_options?: ApplicationAnswerUpdateanswer_optionsInput | string[]
    answer_file?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationAnswerUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    application_id?: BigIntFieldUpdateOperationsInput | bigint | number
    question_id?: BigIntFieldUpdateOperationsInput | bigint | number
    answer_text?: NullableStringFieldUpdateOperationsInput | string | null
    answer_option?: NullableStringFieldUpdateOperationsInput | string | null
    answer_options?: ApplicationAnswerUpdateanswer_optionsInput | string[]
    answer_file?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventCreateInput = {
    id?: bigint | number
    name: string
    registration_required: boolean
    description?: string | null
    location?: string | null
    start_time: Date | string
    buffered_start_time: Date | string
    end_time: Date | string
    buffered_end_time: Date | string
    payment_required?: boolean
    image_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    attendances?: EventAttendanceCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateInput = {
    id?: bigint | number
    name: string
    registration_required: boolean
    description?: string | null
    location?: string | null
    start_time: Date | string
    buffered_start_time: Date | string
    end_time: Date | string
    buffered_end_time: Date | string
    payment_required?: boolean
    image_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    attendances?: EventAttendanceUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    registration_required?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    buffered_start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    buffered_end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    payment_required?: BoolFieldUpdateOperationsInput | boolean
    image_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    attendances?: EventAttendanceUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    registration_required?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    buffered_start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    buffered_end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    payment_required?: BoolFieldUpdateOperationsInput | boolean
    image_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    attendances?: EventAttendanceUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCreateManyInput = {
    id?: bigint | number
    name: string
    registration_required: boolean
    description?: string | null
    location?: string | null
    start_time: Date | string
    buffered_start_time: Date | string
    end_time: Date | string
    buffered_end_time: Date | string
    payment_required?: boolean
    image_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EventUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    registration_required?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    buffered_start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    buffered_end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    payment_required?: BoolFieldUpdateOperationsInput | boolean
    image_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    registration_required?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    buffered_start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    buffered_end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    payment_required?: BoolFieldUpdateOperationsInput | boolean
    image_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventAttendanceCreateInput = {
    id?: bigint | number
    checked_in?: boolean
    created_at?: Date | string
    event: EventCreateNestedOneWithoutAttendancesInput
    profile: ProfileCreateNestedOneWithoutEvent_attendancesInput
  }

  export type EventAttendanceUncheckedCreateInput = {
    id?: bigint | number
    event_id: bigint | number
    profile_id: string
    checked_in?: boolean
    created_at?: Date | string
  }

  export type EventAttendanceUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    checked_in?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutAttendancesNestedInput
    profile?: ProfileUpdateOneRequiredWithoutEvent_attendancesNestedInput
  }

  export type EventAttendanceUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    event_id?: BigIntFieldUpdateOperationsInput | bigint | number
    profile_id?: StringFieldUpdateOperationsInput | string
    checked_in?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventAttendanceCreateManyInput = {
    id?: bigint | number
    event_id: bigint | number
    profile_id: string
    checked_in?: boolean
    created_at?: Date | string
  }

  export type EventAttendanceUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    checked_in?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventAttendanceUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    event_id?: BigIntFieldUpdateOperationsInput | bigint | number
    profile_id?: StringFieldUpdateOperationsInput | string
    checked_in?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionCreateInput = {
    id?: bigint | number
    question_id: string
    role: $Enums.Role
    type: $Enums.QuestionType
    question: string
    is_required?: boolean
    order_num: number
    max_length?: number | null
    placeholder?: string | null
    help_text?: string | null
    term: TermCreateNestedOneWithoutQuestionsInput
    answers?: ApplicationAnswerCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateInput = {
    id?: bigint | number
    term_id: bigint | number
    question_id: string
    role: $Enums.Role
    type: $Enums.QuestionType
    question: string
    is_required?: boolean
    order_num: number
    max_length?: number | null
    placeholder?: string | null
    help_text?: string | null
    answers?: ApplicationAnswerUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    question_id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    question?: StringFieldUpdateOperationsInput | string
    is_required?: BoolFieldUpdateOperationsInput | boolean
    order_num?: IntFieldUpdateOperationsInput | number
    max_length?: NullableIntFieldUpdateOperationsInput | number | null
    placeholder?: NullableStringFieldUpdateOperationsInput | string | null
    help_text?: NullableStringFieldUpdateOperationsInput | string | null
    term?: TermUpdateOneRequiredWithoutQuestionsNestedInput
    answers?: ApplicationAnswerUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    term_id?: BigIntFieldUpdateOperationsInput | bigint | number
    question_id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    question?: StringFieldUpdateOperationsInput | string
    is_required?: BoolFieldUpdateOperationsInput | boolean
    order_num?: IntFieldUpdateOperationsInput | number
    max_length?: NullableIntFieldUpdateOperationsInput | number | null
    placeholder?: NullableStringFieldUpdateOperationsInput | string | null
    help_text?: NullableStringFieldUpdateOperationsInput | string | null
    answers?: ApplicationAnswerUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionCreateManyInput = {
    id?: bigint | number
    term_id: bigint | number
    question_id: string
    role: $Enums.Role
    type: $Enums.QuestionType
    question: string
    is_required?: boolean
    order_num: number
    max_length?: number | null
    placeholder?: string | null
    help_text?: string | null
  }

  export type QuestionUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    question_id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    question?: StringFieldUpdateOperationsInput | string
    is_required?: BoolFieldUpdateOperationsInput | boolean
    order_num?: IntFieldUpdateOperationsInput | number
    max_length?: NullableIntFieldUpdateOperationsInput | number | null
    placeholder?: NullableStringFieldUpdateOperationsInput | string | null
    help_text?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QuestionUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    term_id?: BigIntFieldUpdateOperationsInput | bigint | number
    question_id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    question?: StringFieldUpdateOperationsInput | string
    is_required?: BoolFieldUpdateOperationsInput | boolean
    order_num?: IntFieldUpdateOperationsInput | number
    max_length?: NullableIntFieldUpdateOperationsInput | number | null
    placeholder?: NullableStringFieldUpdateOperationsInput | string | null
    help_text?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TermCreateInput = {
    id?: bigint | number
    term_name: string
    app_release_date: Date | string
    app_soft_deadline: Date | string
    app_hard_deadline: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    applications?: ApplicationCreateNestedManyWithoutTermInput
    questions?: QuestionCreateNestedManyWithoutTermInput
  }

  export type TermUncheckedCreateInput = {
    id?: bigint | number
    term_name: string
    app_release_date: Date | string
    app_soft_deadline: Date | string
    app_hard_deadline: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    applications?: ApplicationUncheckedCreateNestedManyWithoutTermInput
    questions?: QuestionUncheckedCreateNestedManyWithoutTermInput
  }

  export type TermUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    term_name?: StringFieldUpdateOperationsInput | string
    app_release_date?: DateTimeFieldUpdateOperationsInput | Date | string
    app_soft_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    app_hard_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUpdateManyWithoutTermNestedInput
    questions?: QuestionUpdateManyWithoutTermNestedInput
  }

  export type TermUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    term_name?: StringFieldUpdateOperationsInput | string
    app_release_date?: DateTimeFieldUpdateOperationsInput | Date | string
    app_soft_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    app_hard_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUncheckedUpdateManyWithoutTermNestedInput
    questions?: QuestionUncheckedUpdateManyWithoutTermNestedInput
  }

  export type TermCreateManyInput = {
    id?: bigint | number
    term_name: string
    app_release_date: Date | string
    app_soft_deadline: Date | string
    app_hard_deadline: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TermUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    term_name?: StringFieldUpdateOperationsInput | string
    app_release_date?: DateTimeFieldUpdateOperationsInput | Date | string
    app_soft_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    app_hard_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TermUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    term_name?: StringFieldUpdateOperationsInput | string
    app_release_date?: DateTimeFieldUpdateOperationsInput | Date | string
    app_soft_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    app_hard_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileCreateInput = {
    id?: string
    first_name: string
    last_name: string
    user_status?: $Enums.UserStatus
    has_paid?: boolean
    wat_iam?: string | null
    faculty: $Enums.Faculty
    term: string
    heard_from_where?: string
    payment_method: $Enums.PaymentMethod
    payment_location?: string | null
    verifier?: string | null
    member_ideas?: string | null
    is_math_soc_member?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    applications?: ApplicationCreateNestedManyWithoutProfileInput
    event_attendances?: EventAttendanceCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateInput = {
    id?: string
    first_name: string
    last_name: string
    user_status?: $Enums.UserStatus
    has_paid?: boolean
    wat_iam?: string | null
    faculty: $Enums.Faculty
    term: string
    heard_from_where?: string
    payment_method: $Enums.PaymentMethod
    payment_location?: string | null
    verifier?: string | null
    member_ideas?: string | null
    is_math_soc_member?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    applications?: ApplicationUncheckedCreateNestedManyWithoutProfileInput
    event_attendances?: EventAttendanceUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    user_status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    has_paid?: BoolFieldUpdateOperationsInput | boolean
    wat_iam?: NullableStringFieldUpdateOperationsInput | string | null
    faculty?: EnumFacultyFieldUpdateOperationsInput | $Enums.Faculty
    term?: StringFieldUpdateOperationsInput | string
    heard_from_where?: StringFieldUpdateOperationsInput | string
    payment_method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    payment_location?: NullableStringFieldUpdateOperationsInput | string | null
    verifier?: NullableStringFieldUpdateOperationsInput | string | null
    member_ideas?: NullableStringFieldUpdateOperationsInput | string | null
    is_math_soc_member?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUpdateManyWithoutProfileNestedInput
    event_attendances?: EventAttendanceUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    user_status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    has_paid?: BoolFieldUpdateOperationsInput | boolean
    wat_iam?: NullableStringFieldUpdateOperationsInput | string | null
    faculty?: EnumFacultyFieldUpdateOperationsInput | $Enums.Faculty
    term?: StringFieldUpdateOperationsInput | string
    heard_from_where?: StringFieldUpdateOperationsInput | string
    payment_method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    payment_location?: NullableStringFieldUpdateOperationsInput | string | null
    verifier?: NullableStringFieldUpdateOperationsInput | string | null
    member_ideas?: NullableStringFieldUpdateOperationsInput | string | null
    is_math_soc_member?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUncheckedUpdateManyWithoutProfileNestedInput
    event_attendances?: EventAttendanceUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type ProfileCreateManyInput = {
    id?: string
    first_name: string
    last_name: string
    user_status?: $Enums.UserStatus
    has_paid?: boolean
    wat_iam?: string | null
    faculty: $Enums.Faculty
    term: string
    heard_from_where?: string
    payment_method: $Enums.PaymentMethod
    payment_location?: string | null
    verifier?: string | null
    member_ideas?: string | null
    is_math_soc_member?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    user_status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    has_paid?: BoolFieldUpdateOperationsInput | boolean
    wat_iam?: NullableStringFieldUpdateOperationsInput | string | null
    faculty?: EnumFacultyFieldUpdateOperationsInput | $Enums.Faculty
    term?: StringFieldUpdateOperationsInput | string
    heard_from_where?: StringFieldUpdateOperationsInput | string
    payment_method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    payment_location?: NullableStringFieldUpdateOperationsInput | string | null
    verifier?: NullableStringFieldUpdateOperationsInput | string | null
    member_ideas?: NullableStringFieldUpdateOperationsInput | string | null
    is_math_soc_member?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    user_status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    has_paid?: BoolFieldUpdateOperationsInput | boolean
    wat_iam?: NullableStringFieldUpdateOperationsInput | string | null
    faculty?: EnumFacultyFieldUpdateOperationsInput | $Enums.Faculty
    term?: StringFieldUpdateOperationsInput | string
    heard_from_where?: StringFieldUpdateOperationsInput | string
    payment_method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    payment_location?: NullableStringFieldUpdateOperationsInput | string | null
    verifier?: NullableStringFieldUpdateOperationsInput | string | null
    member_ideas?: NullableStringFieldUpdateOperationsInput | string | null
    is_math_soc_member?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type EnumRoleNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null
    has?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    hasSome?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumApplicationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusFilter<$PrismaModel> | $Enums.ApplicationStatus
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ProfileScalarRelationFilter = {
    is?: ProfileWhereInput
    isNot?: ProfileWhereInput
  }

  export type TermScalarRelationFilter = {
    is?: TermWhereInput
    isNot?: TermWhereInput
  }

  export type ApplicationAnswerListRelationFilter = {
    every?: ApplicationAnswerWhereInput
    some?: ApplicationAnswerWhereInput
    none?: ApplicationAnswerWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ApplicationAnswerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ApplicationProfile_idTerm_idCompoundUniqueInput = {
    profile_id: string
    term_id: bigint | number
  }

  export type ApplicationCountOrderByAggregateInput = {
    id?: SortOrder
    profile_id?: SortOrder
    term_id?: SortOrder
    roles_applying_for?: SortOrder
    resume_path?: SortOrder
    status?: SortOrder
    comments?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    submitted_at?: SortOrder
  }

  export type ApplicationAvgOrderByAggregateInput = {
    id?: SortOrder
    term_id?: SortOrder
  }

  export type ApplicationMaxOrderByAggregateInput = {
    id?: SortOrder
    profile_id?: SortOrder
    term_id?: SortOrder
    resume_path?: SortOrder
    status?: SortOrder
    comments?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    submitted_at?: SortOrder
  }

  export type ApplicationMinOrderByAggregateInput = {
    id?: SortOrder
    profile_id?: SortOrder
    term_id?: SortOrder
    resume_path?: SortOrder
    status?: SortOrder
    comments?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    submitted_at?: SortOrder
  }

  export type ApplicationSumOrderByAggregateInput = {
    id?: SortOrder
    term_id?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumApplicationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ApplicationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApplicationStatusFilter<$PrismaModel>
    _max?: NestedEnumApplicationStatusFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ApplicationScalarRelationFilter = {
    is?: ApplicationWhereInput
    isNot?: ApplicationWhereInput
  }

  export type QuestionScalarRelationFilter = {
    is?: QuestionWhereInput
    isNot?: QuestionWhereInput
  }

  export type ApplicationAnswerApplication_idQuestion_idCompoundUniqueInput = {
    application_id: bigint | number
    question_id: bigint | number
  }

  export type ApplicationAnswerCountOrderByAggregateInput = {
    id?: SortOrder
    application_id?: SortOrder
    question_id?: SortOrder
    answer_text?: SortOrder
    answer_option?: SortOrder
    answer_options?: SortOrder
    answer_file?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ApplicationAnswerAvgOrderByAggregateInput = {
    id?: SortOrder
    application_id?: SortOrder
    question_id?: SortOrder
  }

  export type ApplicationAnswerMaxOrderByAggregateInput = {
    id?: SortOrder
    application_id?: SortOrder
    question_id?: SortOrder
    answer_text?: SortOrder
    answer_option?: SortOrder
    answer_file?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ApplicationAnswerMinOrderByAggregateInput = {
    id?: SortOrder
    application_id?: SortOrder
    question_id?: SortOrder
    answer_text?: SortOrder
    answer_option?: SortOrder
    answer_file?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ApplicationAnswerSumOrderByAggregateInput = {
    id?: SortOrder
    application_id?: SortOrder
    question_id?: SortOrder
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type EventAttendanceListRelationFilter = {
    every?: EventAttendanceWhereInput
    some?: EventAttendanceWhereInput
    none?: EventAttendanceWhereInput
  }

  export type EventAttendanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    registration_required?: SortOrder
    description?: SortOrder
    location?: SortOrder
    start_time?: SortOrder
    buffered_start_time?: SortOrder
    end_time?: SortOrder
    buffered_end_time?: SortOrder
    payment_required?: SortOrder
    image_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EventAvgOrderByAggregateInput = {
    id?: SortOrder
    image_id?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    registration_required?: SortOrder
    description?: SortOrder
    location?: SortOrder
    start_time?: SortOrder
    buffered_start_time?: SortOrder
    end_time?: SortOrder
    buffered_end_time?: SortOrder
    payment_required?: SortOrder
    image_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    registration_required?: SortOrder
    description?: SortOrder
    location?: SortOrder
    start_time?: SortOrder
    buffered_start_time?: SortOrder
    end_time?: SortOrder
    buffered_end_time?: SortOrder
    payment_required?: SortOrder
    image_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EventSumOrderByAggregateInput = {
    id?: SortOrder
    image_id?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type EventScalarRelationFilter = {
    is?: EventWhereInput
    isNot?: EventWhereInput
  }

  export type EventAttendanceEvent_idProfile_idCompoundUniqueInput = {
    event_id: bigint | number
    profile_id: string
  }

  export type EventAttendanceCountOrderByAggregateInput = {
    id?: SortOrder
    event_id?: SortOrder
    profile_id?: SortOrder
    checked_in?: SortOrder
    created_at?: SortOrder
  }

  export type EventAttendanceAvgOrderByAggregateInput = {
    id?: SortOrder
    event_id?: SortOrder
  }

  export type EventAttendanceMaxOrderByAggregateInput = {
    id?: SortOrder
    event_id?: SortOrder
    profile_id?: SortOrder
    checked_in?: SortOrder
    created_at?: SortOrder
  }

  export type EventAttendanceMinOrderByAggregateInput = {
    id?: SortOrder
    event_id?: SortOrder
    profile_id?: SortOrder
    checked_in?: SortOrder
    created_at?: SortOrder
  }

  export type EventAttendanceSumOrderByAggregateInput = {
    id?: SortOrder
    event_id?: SortOrder
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type EnumQuestionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionTypeFilter<$PrismaModel> | $Enums.QuestionType
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type QuestionTerm_idQuestion_idCompoundUniqueInput = {
    term_id: bigint | number
    question_id: string
  }

  export type QuestionCountOrderByAggregateInput = {
    id?: SortOrder
    term_id?: SortOrder
    question_id?: SortOrder
    role?: SortOrder
    type?: SortOrder
    question?: SortOrder
    is_required?: SortOrder
    order_num?: SortOrder
    max_length?: SortOrder
    placeholder?: SortOrder
    help_text?: SortOrder
  }

  export type QuestionAvgOrderByAggregateInput = {
    id?: SortOrder
    term_id?: SortOrder
    order_num?: SortOrder
    max_length?: SortOrder
  }

  export type QuestionMaxOrderByAggregateInput = {
    id?: SortOrder
    term_id?: SortOrder
    question_id?: SortOrder
    role?: SortOrder
    type?: SortOrder
    question?: SortOrder
    is_required?: SortOrder
    order_num?: SortOrder
    max_length?: SortOrder
    placeholder?: SortOrder
    help_text?: SortOrder
  }

  export type QuestionMinOrderByAggregateInput = {
    id?: SortOrder
    term_id?: SortOrder
    question_id?: SortOrder
    role?: SortOrder
    type?: SortOrder
    question?: SortOrder
    is_required?: SortOrder
    order_num?: SortOrder
    max_length?: SortOrder
    placeholder?: SortOrder
    help_text?: SortOrder
  }

  export type QuestionSumOrderByAggregateInput = {
    id?: SortOrder
    term_id?: SortOrder
    order_num?: SortOrder
    max_length?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type EnumQuestionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel> | $Enums.QuestionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuestionTypeFilter<$PrismaModel>
    _max?: NestedEnumQuestionTypeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ApplicationListRelationFilter = {
    every?: ApplicationWhereInput
    some?: ApplicationWhereInput
    none?: ApplicationWhereInput
  }

  export type QuestionListRelationFilter = {
    every?: QuestionWhereInput
    some?: QuestionWhereInput
    none?: QuestionWhereInput
  }

  export type ApplicationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuestionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TermCountOrderByAggregateInput = {
    id?: SortOrder
    term_name?: SortOrder
    app_release_date?: SortOrder
    app_soft_deadline?: SortOrder
    app_hard_deadline?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TermAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TermMaxOrderByAggregateInput = {
    id?: SortOrder
    term_name?: SortOrder
    app_release_date?: SortOrder
    app_soft_deadline?: SortOrder
    app_hard_deadline?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TermMinOrderByAggregateInput = {
    id?: SortOrder
    term_name?: SortOrder
    app_release_date?: SortOrder
    app_soft_deadline?: SortOrder
    app_hard_deadline?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TermSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type EnumFacultyFilter<$PrismaModel = never> = {
    equals?: $Enums.Faculty | EnumFacultyFieldRefInput<$PrismaModel>
    in?: $Enums.Faculty[] | ListEnumFacultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Faculty[] | ListEnumFacultyFieldRefInput<$PrismaModel>
    not?: NestedEnumFacultyFilter<$PrismaModel> | $Enums.Faculty
  }

  export type EnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    user_status?: SortOrder
    has_paid?: SortOrder
    wat_iam?: SortOrder
    faculty?: SortOrder
    term?: SortOrder
    heard_from_where?: SortOrder
    payment_method?: SortOrder
    payment_location?: SortOrder
    verifier?: SortOrder
    member_ideas?: SortOrder
    is_math_soc_member?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    user_status?: SortOrder
    has_paid?: SortOrder
    wat_iam?: SortOrder
    faculty?: SortOrder
    term?: SortOrder
    heard_from_where?: SortOrder
    payment_method?: SortOrder
    payment_location?: SortOrder
    verifier?: SortOrder
    member_ideas?: SortOrder
    is_math_soc_member?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    user_status?: SortOrder
    has_paid?: SortOrder
    wat_iam?: SortOrder
    faculty?: SortOrder
    term?: SortOrder
    heard_from_where?: SortOrder
    payment_method?: SortOrder
    payment_location?: SortOrder
    verifier?: SortOrder
    member_ideas?: SortOrder
    is_math_soc_member?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type EnumFacultyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Faculty | EnumFacultyFieldRefInput<$PrismaModel>
    in?: $Enums.Faculty[] | ListEnumFacultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Faculty[] | ListEnumFacultyFieldRefInput<$PrismaModel>
    not?: NestedEnumFacultyWithAggregatesFilter<$PrismaModel> | $Enums.Faculty
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFacultyFilter<$PrismaModel>
    _max?: NestedEnumFacultyFilter<$PrismaModel>
  }

  export type EnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodFilter<$PrismaModel>
  }

  export type ApplicationCreateroles_applying_forInput = {
    set: $Enums.Role[]
  }

  export type ProfileCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<ProfileCreateWithoutApplicationsInput, ProfileUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutApplicationsInput
    connect?: ProfileWhereUniqueInput
  }

  export type TermCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<TermCreateWithoutApplicationsInput, TermUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: TermCreateOrConnectWithoutApplicationsInput
    connect?: TermWhereUniqueInput
  }

  export type ApplicationAnswerCreateNestedManyWithoutApplicationInput = {
    create?: XOR<ApplicationAnswerCreateWithoutApplicationInput, ApplicationAnswerUncheckedCreateWithoutApplicationInput> | ApplicationAnswerCreateWithoutApplicationInput[] | ApplicationAnswerUncheckedCreateWithoutApplicationInput[]
    connectOrCreate?: ApplicationAnswerCreateOrConnectWithoutApplicationInput | ApplicationAnswerCreateOrConnectWithoutApplicationInput[]
    createMany?: ApplicationAnswerCreateManyApplicationInputEnvelope
    connect?: ApplicationAnswerWhereUniqueInput | ApplicationAnswerWhereUniqueInput[]
  }

  export type ApplicationAnswerUncheckedCreateNestedManyWithoutApplicationInput = {
    create?: XOR<ApplicationAnswerCreateWithoutApplicationInput, ApplicationAnswerUncheckedCreateWithoutApplicationInput> | ApplicationAnswerCreateWithoutApplicationInput[] | ApplicationAnswerUncheckedCreateWithoutApplicationInput[]
    connectOrCreate?: ApplicationAnswerCreateOrConnectWithoutApplicationInput | ApplicationAnswerCreateOrConnectWithoutApplicationInput[]
    createMany?: ApplicationAnswerCreateManyApplicationInputEnvelope
    connect?: ApplicationAnswerWhereUniqueInput | ApplicationAnswerWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type ApplicationUpdateroles_applying_forInput = {
    set?: $Enums.Role[]
    push?: $Enums.Role | $Enums.Role[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumApplicationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ApplicationStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ProfileUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<ProfileCreateWithoutApplicationsInput, ProfileUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutApplicationsInput
    upsert?: ProfileUpsertWithoutApplicationsInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutApplicationsInput, ProfileUpdateWithoutApplicationsInput>, ProfileUncheckedUpdateWithoutApplicationsInput>
  }

  export type TermUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<TermCreateWithoutApplicationsInput, TermUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: TermCreateOrConnectWithoutApplicationsInput
    upsert?: TermUpsertWithoutApplicationsInput
    connect?: TermWhereUniqueInput
    update?: XOR<XOR<TermUpdateToOneWithWhereWithoutApplicationsInput, TermUpdateWithoutApplicationsInput>, TermUncheckedUpdateWithoutApplicationsInput>
  }

  export type ApplicationAnswerUpdateManyWithoutApplicationNestedInput = {
    create?: XOR<ApplicationAnswerCreateWithoutApplicationInput, ApplicationAnswerUncheckedCreateWithoutApplicationInput> | ApplicationAnswerCreateWithoutApplicationInput[] | ApplicationAnswerUncheckedCreateWithoutApplicationInput[]
    connectOrCreate?: ApplicationAnswerCreateOrConnectWithoutApplicationInput | ApplicationAnswerCreateOrConnectWithoutApplicationInput[]
    upsert?: ApplicationAnswerUpsertWithWhereUniqueWithoutApplicationInput | ApplicationAnswerUpsertWithWhereUniqueWithoutApplicationInput[]
    createMany?: ApplicationAnswerCreateManyApplicationInputEnvelope
    set?: ApplicationAnswerWhereUniqueInput | ApplicationAnswerWhereUniqueInput[]
    disconnect?: ApplicationAnswerWhereUniqueInput | ApplicationAnswerWhereUniqueInput[]
    delete?: ApplicationAnswerWhereUniqueInput | ApplicationAnswerWhereUniqueInput[]
    connect?: ApplicationAnswerWhereUniqueInput | ApplicationAnswerWhereUniqueInput[]
    update?: ApplicationAnswerUpdateWithWhereUniqueWithoutApplicationInput | ApplicationAnswerUpdateWithWhereUniqueWithoutApplicationInput[]
    updateMany?: ApplicationAnswerUpdateManyWithWhereWithoutApplicationInput | ApplicationAnswerUpdateManyWithWhereWithoutApplicationInput[]
    deleteMany?: ApplicationAnswerScalarWhereInput | ApplicationAnswerScalarWhereInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type ApplicationAnswerUncheckedUpdateManyWithoutApplicationNestedInput = {
    create?: XOR<ApplicationAnswerCreateWithoutApplicationInput, ApplicationAnswerUncheckedCreateWithoutApplicationInput> | ApplicationAnswerCreateWithoutApplicationInput[] | ApplicationAnswerUncheckedCreateWithoutApplicationInput[]
    connectOrCreate?: ApplicationAnswerCreateOrConnectWithoutApplicationInput | ApplicationAnswerCreateOrConnectWithoutApplicationInput[]
    upsert?: ApplicationAnswerUpsertWithWhereUniqueWithoutApplicationInput | ApplicationAnswerUpsertWithWhereUniqueWithoutApplicationInput[]
    createMany?: ApplicationAnswerCreateManyApplicationInputEnvelope
    set?: ApplicationAnswerWhereUniqueInput | ApplicationAnswerWhereUniqueInput[]
    disconnect?: ApplicationAnswerWhereUniqueInput | ApplicationAnswerWhereUniqueInput[]
    delete?: ApplicationAnswerWhereUniqueInput | ApplicationAnswerWhereUniqueInput[]
    connect?: ApplicationAnswerWhereUniqueInput | ApplicationAnswerWhereUniqueInput[]
    update?: ApplicationAnswerUpdateWithWhereUniqueWithoutApplicationInput | ApplicationAnswerUpdateWithWhereUniqueWithoutApplicationInput[]
    updateMany?: ApplicationAnswerUpdateManyWithWhereWithoutApplicationInput | ApplicationAnswerUpdateManyWithWhereWithoutApplicationInput[]
    deleteMany?: ApplicationAnswerScalarWhereInput | ApplicationAnswerScalarWhereInput[]
  }

  export type ApplicationAnswerCreateanswer_optionsInput = {
    set: string[]
  }

  export type ApplicationCreateNestedOneWithoutAnswersInput = {
    create?: XOR<ApplicationCreateWithoutAnswersInput, ApplicationUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: ApplicationCreateOrConnectWithoutAnswersInput
    connect?: ApplicationWhereUniqueInput
  }

  export type QuestionCreateNestedOneWithoutAnswersInput = {
    create?: XOR<QuestionCreateWithoutAnswersInput, QuestionUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutAnswersInput
    connect?: QuestionWhereUniqueInput
  }

  export type ApplicationAnswerUpdateanswer_optionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ApplicationUpdateOneRequiredWithoutAnswersNestedInput = {
    create?: XOR<ApplicationCreateWithoutAnswersInput, ApplicationUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: ApplicationCreateOrConnectWithoutAnswersInput
    upsert?: ApplicationUpsertWithoutAnswersInput
    connect?: ApplicationWhereUniqueInput
    update?: XOR<XOR<ApplicationUpdateToOneWithWhereWithoutAnswersInput, ApplicationUpdateWithoutAnswersInput>, ApplicationUncheckedUpdateWithoutAnswersInput>
  }

  export type QuestionUpdateOneRequiredWithoutAnswersNestedInput = {
    create?: XOR<QuestionCreateWithoutAnswersInput, QuestionUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutAnswersInput
    upsert?: QuestionUpsertWithoutAnswersInput
    connect?: QuestionWhereUniqueInput
    update?: XOR<XOR<QuestionUpdateToOneWithWhereWithoutAnswersInput, QuestionUpdateWithoutAnswersInput>, QuestionUncheckedUpdateWithoutAnswersInput>
  }

  export type EventAttendanceCreateNestedManyWithoutEventInput = {
    create?: XOR<EventAttendanceCreateWithoutEventInput, EventAttendanceUncheckedCreateWithoutEventInput> | EventAttendanceCreateWithoutEventInput[] | EventAttendanceUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventAttendanceCreateOrConnectWithoutEventInput | EventAttendanceCreateOrConnectWithoutEventInput[]
    createMany?: EventAttendanceCreateManyEventInputEnvelope
    connect?: EventAttendanceWhereUniqueInput | EventAttendanceWhereUniqueInput[]
  }

  export type EventAttendanceUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<EventAttendanceCreateWithoutEventInput, EventAttendanceUncheckedCreateWithoutEventInput> | EventAttendanceCreateWithoutEventInput[] | EventAttendanceUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventAttendanceCreateOrConnectWithoutEventInput | EventAttendanceCreateOrConnectWithoutEventInput[]
    createMany?: EventAttendanceCreateManyEventInputEnvelope
    connect?: EventAttendanceWhereUniqueInput | EventAttendanceWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type EventAttendanceUpdateManyWithoutEventNestedInput = {
    create?: XOR<EventAttendanceCreateWithoutEventInput, EventAttendanceUncheckedCreateWithoutEventInput> | EventAttendanceCreateWithoutEventInput[] | EventAttendanceUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventAttendanceCreateOrConnectWithoutEventInput | EventAttendanceCreateOrConnectWithoutEventInput[]
    upsert?: EventAttendanceUpsertWithWhereUniqueWithoutEventInput | EventAttendanceUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: EventAttendanceCreateManyEventInputEnvelope
    set?: EventAttendanceWhereUniqueInput | EventAttendanceWhereUniqueInput[]
    disconnect?: EventAttendanceWhereUniqueInput | EventAttendanceWhereUniqueInput[]
    delete?: EventAttendanceWhereUniqueInput | EventAttendanceWhereUniqueInput[]
    connect?: EventAttendanceWhereUniqueInput | EventAttendanceWhereUniqueInput[]
    update?: EventAttendanceUpdateWithWhereUniqueWithoutEventInput | EventAttendanceUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: EventAttendanceUpdateManyWithWhereWithoutEventInput | EventAttendanceUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: EventAttendanceScalarWhereInput | EventAttendanceScalarWhereInput[]
  }

  export type EventAttendanceUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<EventAttendanceCreateWithoutEventInput, EventAttendanceUncheckedCreateWithoutEventInput> | EventAttendanceCreateWithoutEventInput[] | EventAttendanceUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventAttendanceCreateOrConnectWithoutEventInput | EventAttendanceCreateOrConnectWithoutEventInput[]
    upsert?: EventAttendanceUpsertWithWhereUniqueWithoutEventInput | EventAttendanceUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: EventAttendanceCreateManyEventInputEnvelope
    set?: EventAttendanceWhereUniqueInput | EventAttendanceWhereUniqueInput[]
    disconnect?: EventAttendanceWhereUniqueInput | EventAttendanceWhereUniqueInput[]
    delete?: EventAttendanceWhereUniqueInput | EventAttendanceWhereUniqueInput[]
    connect?: EventAttendanceWhereUniqueInput | EventAttendanceWhereUniqueInput[]
    update?: EventAttendanceUpdateWithWhereUniqueWithoutEventInput | EventAttendanceUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: EventAttendanceUpdateManyWithWhereWithoutEventInput | EventAttendanceUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: EventAttendanceScalarWhereInput | EventAttendanceScalarWhereInput[]
  }

  export type EventCreateNestedOneWithoutAttendancesInput = {
    create?: XOR<EventCreateWithoutAttendancesInput, EventUncheckedCreateWithoutAttendancesInput>
    connectOrCreate?: EventCreateOrConnectWithoutAttendancesInput
    connect?: EventWhereUniqueInput
  }

  export type ProfileCreateNestedOneWithoutEvent_attendancesInput = {
    create?: XOR<ProfileCreateWithoutEvent_attendancesInput, ProfileUncheckedCreateWithoutEvent_attendancesInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutEvent_attendancesInput
    connect?: ProfileWhereUniqueInput
  }

  export type EventUpdateOneRequiredWithoutAttendancesNestedInput = {
    create?: XOR<EventCreateWithoutAttendancesInput, EventUncheckedCreateWithoutAttendancesInput>
    connectOrCreate?: EventCreateOrConnectWithoutAttendancesInput
    upsert?: EventUpsertWithoutAttendancesInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutAttendancesInput, EventUpdateWithoutAttendancesInput>, EventUncheckedUpdateWithoutAttendancesInput>
  }

  export type ProfileUpdateOneRequiredWithoutEvent_attendancesNestedInput = {
    create?: XOR<ProfileCreateWithoutEvent_attendancesInput, ProfileUncheckedCreateWithoutEvent_attendancesInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutEvent_attendancesInput
    upsert?: ProfileUpsertWithoutEvent_attendancesInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutEvent_attendancesInput, ProfileUpdateWithoutEvent_attendancesInput>, ProfileUncheckedUpdateWithoutEvent_attendancesInput>
  }

  export type TermCreateNestedOneWithoutQuestionsInput = {
    create?: XOR<TermCreateWithoutQuestionsInput, TermUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: TermCreateOrConnectWithoutQuestionsInput
    connect?: TermWhereUniqueInput
  }

  export type ApplicationAnswerCreateNestedManyWithoutQuestionInput = {
    create?: XOR<ApplicationAnswerCreateWithoutQuestionInput, ApplicationAnswerUncheckedCreateWithoutQuestionInput> | ApplicationAnswerCreateWithoutQuestionInput[] | ApplicationAnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: ApplicationAnswerCreateOrConnectWithoutQuestionInput | ApplicationAnswerCreateOrConnectWithoutQuestionInput[]
    createMany?: ApplicationAnswerCreateManyQuestionInputEnvelope
    connect?: ApplicationAnswerWhereUniqueInput | ApplicationAnswerWhereUniqueInput[]
  }

  export type ApplicationAnswerUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: XOR<ApplicationAnswerCreateWithoutQuestionInput, ApplicationAnswerUncheckedCreateWithoutQuestionInput> | ApplicationAnswerCreateWithoutQuestionInput[] | ApplicationAnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: ApplicationAnswerCreateOrConnectWithoutQuestionInput | ApplicationAnswerCreateOrConnectWithoutQuestionInput[]
    createMany?: ApplicationAnswerCreateManyQuestionInputEnvelope
    connect?: ApplicationAnswerWhereUniqueInput | ApplicationAnswerWhereUniqueInput[]
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type EnumQuestionTypeFieldUpdateOperationsInput = {
    set?: $Enums.QuestionType
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TermUpdateOneRequiredWithoutQuestionsNestedInput = {
    create?: XOR<TermCreateWithoutQuestionsInput, TermUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: TermCreateOrConnectWithoutQuestionsInput
    upsert?: TermUpsertWithoutQuestionsInput
    connect?: TermWhereUniqueInput
    update?: XOR<XOR<TermUpdateToOneWithWhereWithoutQuestionsInput, TermUpdateWithoutQuestionsInput>, TermUncheckedUpdateWithoutQuestionsInput>
  }

  export type ApplicationAnswerUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<ApplicationAnswerCreateWithoutQuestionInput, ApplicationAnswerUncheckedCreateWithoutQuestionInput> | ApplicationAnswerCreateWithoutQuestionInput[] | ApplicationAnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: ApplicationAnswerCreateOrConnectWithoutQuestionInput | ApplicationAnswerCreateOrConnectWithoutQuestionInput[]
    upsert?: ApplicationAnswerUpsertWithWhereUniqueWithoutQuestionInput | ApplicationAnswerUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: ApplicationAnswerCreateManyQuestionInputEnvelope
    set?: ApplicationAnswerWhereUniqueInput | ApplicationAnswerWhereUniqueInput[]
    disconnect?: ApplicationAnswerWhereUniqueInput | ApplicationAnswerWhereUniqueInput[]
    delete?: ApplicationAnswerWhereUniqueInput | ApplicationAnswerWhereUniqueInput[]
    connect?: ApplicationAnswerWhereUniqueInput | ApplicationAnswerWhereUniqueInput[]
    update?: ApplicationAnswerUpdateWithWhereUniqueWithoutQuestionInput | ApplicationAnswerUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: ApplicationAnswerUpdateManyWithWhereWithoutQuestionInput | ApplicationAnswerUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: ApplicationAnswerScalarWhereInput | ApplicationAnswerScalarWhereInput[]
  }

  export type ApplicationAnswerUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<ApplicationAnswerCreateWithoutQuestionInput, ApplicationAnswerUncheckedCreateWithoutQuestionInput> | ApplicationAnswerCreateWithoutQuestionInput[] | ApplicationAnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: ApplicationAnswerCreateOrConnectWithoutQuestionInput | ApplicationAnswerCreateOrConnectWithoutQuestionInput[]
    upsert?: ApplicationAnswerUpsertWithWhereUniqueWithoutQuestionInput | ApplicationAnswerUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: ApplicationAnswerCreateManyQuestionInputEnvelope
    set?: ApplicationAnswerWhereUniqueInput | ApplicationAnswerWhereUniqueInput[]
    disconnect?: ApplicationAnswerWhereUniqueInput | ApplicationAnswerWhereUniqueInput[]
    delete?: ApplicationAnswerWhereUniqueInput | ApplicationAnswerWhereUniqueInput[]
    connect?: ApplicationAnswerWhereUniqueInput | ApplicationAnswerWhereUniqueInput[]
    update?: ApplicationAnswerUpdateWithWhereUniqueWithoutQuestionInput | ApplicationAnswerUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: ApplicationAnswerUpdateManyWithWhereWithoutQuestionInput | ApplicationAnswerUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: ApplicationAnswerScalarWhereInput | ApplicationAnswerScalarWhereInput[]
  }

  export type ApplicationCreateNestedManyWithoutTermInput = {
    create?: XOR<ApplicationCreateWithoutTermInput, ApplicationUncheckedCreateWithoutTermInput> | ApplicationCreateWithoutTermInput[] | ApplicationUncheckedCreateWithoutTermInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutTermInput | ApplicationCreateOrConnectWithoutTermInput[]
    createMany?: ApplicationCreateManyTermInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type QuestionCreateNestedManyWithoutTermInput = {
    create?: XOR<QuestionCreateWithoutTermInput, QuestionUncheckedCreateWithoutTermInput> | QuestionCreateWithoutTermInput[] | QuestionUncheckedCreateWithoutTermInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutTermInput | QuestionCreateOrConnectWithoutTermInput[]
    createMany?: QuestionCreateManyTermInputEnvelope
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
  }

  export type ApplicationUncheckedCreateNestedManyWithoutTermInput = {
    create?: XOR<ApplicationCreateWithoutTermInput, ApplicationUncheckedCreateWithoutTermInput> | ApplicationCreateWithoutTermInput[] | ApplicationUncheckedCreateWithoutTermInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutTermInput | ApplicationCreateOrConnectWithoutTermInput[]
    createMany?: ApplicationCreateManyTermInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type QuestionUncheckedCreateNestedManyWithoutTermInput = {
    create?: XOR<QuestionCreateWithoutTermInput, QuestionUncheckedCreateWithoutTermInput> | QuestionCreateWithoutTermInput[] | QuestionUncheckedCreateWithoutTermInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutTermInput | QuestionCreateOrConnectWithoutTermInput[]
    createMany?: QuestionCreateManyTermInputEnvelope
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
  }

  export type ApplicationUpdateManyWithoutTermNestedInput = {
    create?: XOR<ApplicationCreateWithoutTermInput, ApplicationUncheckedCreateWithoutTermInput> | ApplicationCreateWithoutTermInput[] | ApplicationUncheckedCreateWithoutTermInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutTermInput | ApplicationCreateOrConnectWithoutTermInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutTermInput | ApplicationUpsertWithWhereUniqueWithoutTermInput[]
    createMany?: ApplicationCreateManyTermInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutTermInput | ApplicationUpdateWithWhereUniqueWithoutTermInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutTermInput | ApplicationUpdateManyWithWhereWithoutTermInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type QuestionUpdateManyWithoutTermNestedInput = {
    create?: XOR<QuestionCreateWithoutTermInput, QuestionUncheckedCreateWithoutTermInput> | QuestionCreateWithoutTermInput[] | QuestionUncheckedCreateWithoutTermInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutTermInput | QuestionCreateOrConnectWithoutTermInput[]
    upsert?: QuestionUpsertWithWhereUniqueWithoutTermInput | QuestionUpsertWithWhereUniqueWithoutTermInput[]
    createMany?: QuestionCreateManyTermInputEnvelope
    set?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    disconnect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    delete?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    update?: QuestionUpdateWithWhereUniqueWithoutTermInput | QuestionUpdateWithWhereUniqueWithoutTermInput[]
    updateMany?: QuestionUpdateManyWithWhereWithoutTermInput | QuestionUpdateManyWithWhereWithoutTermInput[]
    deleteMany?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
  }

  export type ApplicationUncheckedUpdateManyWithoutTermNestedInput = {
    create?: XOR<ApplicationCreateWithoutTermInput, ApplicationUncheckedCreateWithoutTermInput> | ApplicationCreateWithoutTermInput[] | ApplicationUncheckedCreateWithoutTermInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutTermInput | ApplicationCreateOrConnectWithoutTermInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutTermInput | ApplicationUpsertWithWhereUniqueWithoutTermInput[]
    createMany?: ApplicationCreateManyTermInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutTermInput | ApplicationUpdateWithWhereUniqueWithoutTermInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutTermInput | ApplicationUpdateManyWithWhereWithoutTermInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type QuestionUncheckedUpdateManyWithoutTermNestedInput = {
    create?: XOR<QuestionCreateWithoutTermInput, QuestionUncheckedCreateWithoutTermInput> | QuestionCreateWithoutTermInput[] | QuestionUncheckedCreateWithoutTermInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutTermInput | QuestionCreateOrConnectWithoutTermInput[]
    upsert?: QuestionUpsertWithWhereUniqueWithoutTermInput | QuestionUpsertWithWhereUniqueWithoutTermInput[]
    createMany?: QuestionCreateManyTermInputEnvelope
    set?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    disconnect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    delete?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    update?: QuestionUpdateWithWhereUniqueWithoutTermInput | QuestionUpdateWithWhereUniqueWithoutTermInput[]
    updateMany?: QuestionUpdateManyWithWhereWithoutTermInput | QuestionUpdateManyWithWhereWithoutTermInput[]
    deleteMany?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
  }

  export type ApplicationCreateNestedManyWithoutProfileInput = {
    create?: XOR<ApplicationCreateWithoutProfileInput, ApplicationUncheckedCreateWithoutProfileInput> | ApplicationCreateWithoutProfileInput[] | ApplicationUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutProfileInput | ApplicationCreateOrConnectWithoutProfileInput[]
    createMany?: ApplicationCreateManyProfileInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type EventAttendanceCreateNestedManyWithoutProfileInput = {
    create?: XOR<EventAttendanceCreateWithoutProfileInput, EventAttendanceUncheckedCreateWithoutProfileInput> | EventAttendanceCreateWithoutProfileInput[] | EventAttendanceUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: EventAttendanceCreateOrConnectWithoutProfileInput | EventAttendanceCreateOrConnectWithoutProfileInput[]
    createMany?: EventAttendanceCreateManyProfileInputEnvelope
    connect?: EventAttendanceWhereUniqueInput | EventAttendanceWhereUniqueInput[]
  }

  export type ApplicationUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<ApplicationCreateWithoutProfileInput, ApplicationUncheckedCreateWithoutProfileInput> | ApplicationCreateWithoutProfileInput[] | ApplicationUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutProfileInput | ApplicationCreateOrConnectWithoutProfileInput[]
    createMany?: ApplicationCreateManyProfileInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type EventAttendanceUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<EventAttendanceCreateWithoutProfileInput, EventAttendanceUncheckedCreateWithoutProfileInput> | EventAttendanceCreateWithoutProfileInput[] | EventAttendanceUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: EventAttendanceCreateOrConnectWithoutProfileInput | EventAttendanceCreateOrConnectWithoutProfileInput[]
    createMany?: EventAttendanceCreateManyProfileInputEnvelope
    connect?: EventAttendanceWhereUniqueInput | EventAttendanceWhereUniqueInput[]
  }

  export type EnumUserStatusFieldUpdateOperationsInput = {
    set?: $Enums.UserStatus
  }

  export type EnumFacultyFieldUpdateOperationsInput = {
    set?: $Enums.Faculty
  }

  export type EnumPaymentMethodFieldUpdateOperationsInput = {
    set?: $Enums.PaymentMethod
  }

  export type ApplicationUpdateManyWithoutProfileNestedInput = {
    create?: XOR<ApplicationCreateWithoutProfileInput, ApplicationUncheckedCreateWithoutProfileInput> | ApplicationCreateWithoutProfileInput[] | ApplicationUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutProfileInput | ApplicationCreateOrConnectWithoutProfileInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutProfileInput | ApplicationUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: ApplicationCreateManyProfileInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutProfileInput | ApplicationUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutProfileInput | ApplicationUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type EventAttendanceUpdateManyWithoutProfileNestedInput = {
    create?: XOR<EventAttendanceCreateWithoutProfileInput, EventAttendanceUncheckedCreateWithoutProfileInput> | EventAttendanceCreateWithoutProfileInput[] | EventAttendanceUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: EventAttendanceCreateOrConnectWithoutProfileInput | EventAttendanceCreateOrConnectWithoutProfileInput[]
    upsert?: EventAttendanceUpsertWithWhereUniqueWithoutProfileInput | EventAttendanceUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: EventAttendanceCreateManyProfileInputEnvelope
    set?: EventAttendanceWhereUniqueInput | EventAttendanceWhereUniqueInput[]
    disconnect?: EventAttendanceWhereUniqueInput | EventAttendanceWhereUniqueInput[]
    delete?: EventAttendanceWhereUniqueInput | EventAttendanceWhereUniqueInput[]
    connect?: EventAttendanceWhereUniqueInput | EventAttendanceWhereUniqueInput[]
    update?: EventAttendanceUpdateWithWhereUniqueWithoutProfileInput | EventAttendanceUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: EventAttendanceUpdateManyWithWhereWithoutProfileInput | EventAttendanceUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: EventAttendanceScalarWhereInput | EventAttendanceScalarWhereInput[]
  }

  export type ApplicationUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<ApplicationCreateWithoutProfileInput, ApplicationUncheckedCreateWithoutProfileInput> | ApplicationCreateWithoutProfileInput[] | ApplicationUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutProfileInput | ApplicationCreateOrConnectWithoutProfileInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutProfileInput | ApplicationUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: ApplicationCreateManyProfileInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutProfileInput | ApplicationUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutProfileInput | ApplicationUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type EventAttendanceUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<EventAttendanceCreateWithoutProfileInput, EventAttendanceUncheckedCreateWithoutProfileInput> | EventAttendanceCreateWithoutProfileInput[] | EventAttendanceUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: EventAttendanceCreateOrConnectWithoutProfileInput | EventAttendanceCreateOrConnectWithoutProfileInput[]
    upsert?: EventAttendanceUpsertWithWhereUniqueWithoutProfileInput | EventAttendanceUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: EventAttendanceCreateManyProfileInputEnvelope
    set?: EventAttendanceWhereUniqueInput | EventAttendanceWhereUniqueInput[]
    disconnect?: EventAttendanceWhereUniqueInput | EventAttendanceWhereUniqueInput[]
    delete?: EventAttendanceWhereUniqueInput | EventAttendanceWhereUniqueInput[]
    connect?: EventAttendanceWhereUniqueInput | EventAttendanceWhereUniqueInput[]
    update?: EventAttendanceUpdateWithWhereUniqueWithoutProfileInput | EventAttendanceUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: EventAttendanceUpdateManyWithWhereWithoutProfileInput | EventAttendanceUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: EventAttendanceScalarWhereInput | EventAttendanceScalarWhereInput[]
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumApplicationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusFilter<$PrismaModel> | $Enums.ApplicationStatus
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ApplicationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApplicationStatusFilter<$PrismaModel>
    _max?: NestedEnumApplicationStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumQuestionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionTypeFilter<$PrismaModel> | $Enums.QuestionType
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel> | $Enums.QuestionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuestionTypeFilter<$PrismaModel>
    _max?: NestedEnumQuestionTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedEnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type NestedEnumFacultyFilter<$PrismaModel = never> = {
    equals?: $Enums.Faculty | EnumFacultyFieldRefInput<$PrismaModel>
    in?: $Enums.Faculty[] | ListEnumFacultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Faculty[] | ListEnumFacultyFieldRefInput<$PrismaModel>
    not?: NestedEnumFacultyFilter<$PrismaModel> | $Enums.Faculty
  }

  export type NestedEnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod
  }

  export type NestedEnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type NestedEnumFacultyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Faculty | EnumFacultyFieldRefInput<$PrismaModel>
    in?: $Enums.Faculty[] | ListEnumFacultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Faculty[] | ListEnumFacultyFieldRefInput<$PrismaModel>
    not?: NestedEnumFacultyWithAggregatesFilter<$PrismaModel> | $Enums.Faculty
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFacultyFilter<$PrismaModel>
    _max?: NestedEnumFacultyFilter<$PrismaModel>
  }

  export type NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodFilter<$PrismaModel>
  }

  export type ProfileCreateWithoutApplicationsInput = {
    id?: string
    first_name: string
    last_name: string
    user_status?: $Enums.UserStatus
    has_paid?: boolean
    wat_iam?: string | null
    faculty: $Enums.Faculty
    term: string
    heard_from_where?: string
    payment_method: $Enums.PaymentMethod
    payment_location?: string | null
    verifier?: string | null
    member_ideas?: string | null
    is_math_soc_member?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    event_attendances?: EventAttendanceCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutApplicationsInput = {
    id?: string
    first_name: string
    last_name: string
    user_status?: $Enums.UserStatus
    has_paid?: boolean
    wat_iam?: string | null
    faculty: $Enums.Faculty
    term: string
    heard_from_where?: string
    payment_method: $Enums.PaymentMethod
    payment_location?: string | null
    verifier?: string | null
    member_ideas?: string | null
    is_math_soc_member?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    event_attendances?: EventAttendanceUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutApplicationsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutApplicationsInput, ProfileUncheckedCreateWithoutApplicationsInput>
  }

  export type TermCreateWithoutApplicationsInput = {
    id?: bigint | number
    term_name: string
    app_release_date: Date | string
    app_soft_deadline: Date | string
    app_hard_deadline: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    questions?: QuestionCreateNestedManyWithoutTermInput
  }

  export type TermUncheckedCreateWithoutApplicationsInput = {
    id?: bigint | number
    term_name: string
    app_release_date: Date | string
    app_soft_deadline: Date | string
    app_hard_deadline: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    questions?: QuestionUncheckedCreateNestedManyWithoutTermInput
  }

  export type TermCreateOrConnectWithoutApplicationsInput = {
    where: TermWhereUniqueInput
    create: XOR<TermCreateWithoutApplicationsInput, TermUncheckedCreateWithoutApplicationsInput>
  }

  export type ApplicationAnswerCreateWithoutApplicationInput = {
    id?: bigint | number
    answer_text?: string | null
    answer_option?: string | null
    answer_options?: ApplicationAnswerCreateanswer_optionsInput | string[]
    answer_file?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    question: QuestionCreateNestedOneWithoutAnswersInput
  }

  export type ApplicationAnswerUncheckedCreateWithoutApplicationInput = {
    id?: bigint | number
    question_id: bigint | number
    answer_text?: string | null
    answer_option?: string | null
    answer_options?: ApplicationAnswerCreateanswer_optionsInput | string[]
    answer_file?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ApplicationAnswerCreateOrConnectWithoutApplicationInput = {
    where: ApplicationAnswerWhereUniqueInput
    create: XOR<ApplicationAnswerCreateWithoutApplicationInput, ApplicationAnswerUncheckedCreateWithoutApplicationInput>
  }

  export type ApplicationAnswerCreateManyApplicationInputEnvelope = {
    data: ApplicationAnswerCreateManyApplicationInput | ApplicationAnswerCreateManyApplicationInput[]
    skipDuplicates?: boolean
  }

  export type ProfileUpsertWithoutApplicationsInput = {
    update: XOR<ProfileUpdateWithoutApplicationsInput, ProfileUncheckedUpdateWithoutApplicationsInput>
    create: XOR<ProfileCreateWithoutApplicationsInput, ProfileUncheckedCreateWithoutApplicationsInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutApplicationsInput, ProfileUncheckedUpdateWithoutApplicationsInput>
  }

  export type ProfileUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    user_status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    has_paid?: BoolFieldUpdateOperationsInput | boolean
    wat_iam?: NullableStringFieldUpdateOperationsInput | string | null
    faculty?: EnumFacultyFieldUpdateOperationsInput | $Enums.Faculty
    term?: StringFieldUpdateOperationsInput | string
    heard_from_where?: StringFieldUpdateOperationsInput | string
    payment_method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    payment_location?: NullableStringFieldUpdateOperationsInput | string | null
    verifier?: NullableStringFieldUpdateOperationsInput | string | null
    member_ideas?: NullableStringFieldUpdateOperationsInput | string | null
    is_math_soc_member?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    event_attendances?: EventAttendanceUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    user_status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    has_paid?: BoolFieldUpdateOperationsInput | boolean
    wat_iam?: NullableStringFieldUpdateOperationsInput | string | null
    faculty?: EnumFacultyFieldUpdateOperationsInput | $Enums.Faculty
    term?: StringFieldUpdateOperationsInput | string
    heard_from_where?: StringFieldUpdateOperationsInput | string
    payment_method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    payment_location?: NullableStringFieldUpdateOperationsInput | string | null
    verifier?: NullableStringFieldUpdateOperationsInput | string | null
    member_ideas?: NullableStringFieldUpdateOperationsInput | string | null
    is_math_soc_member?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    event_attendances?: EventAttendanceUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type TermUpsertWithoutApplicationsInput = {
    update: XOR<TermUpdateWithoutApplicationsInput, TermUncheckedUpdateWithoutApplicationsInput>
    create: XOR<TermCreateWithoutApplicationsInput, TermUncheckedCreateWithoutApplicationsInput>
    where?: TermWhereInput
  }

  export type TermUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: TermWhereInput
    data: XOR<TermUpdateWithoutApplicationsInput, TermUncheckedUpdateWithoutApplicationsInput>
  }

  export type TermUpdateWithoutApplicationsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    term_name?: StringFieldUpdateOperationsInput | string
    app_release_date?: DateTimeFieldUpdateOperationsInput | Date | string
    app_soft_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    app_hard_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUpdateManyWithoutTermNestedInput
  }

  export type TermUncheckedUpdateWithoutApplicationsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    term_name?: StringFieldUpdateOperationsInput | string
    app_release_date?: DateTimeFieldUpdateOperationsInput | Date | string
    app_soft_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    app_hard_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUncheckedUpdateManyWithoutTermNestedInput
  }

  export type ApplicationAnswerUpsertWithWhereUniqueWithoutApplicationInput = {
    where: ApplicationAnswerWhereUniqueInput
    update: XOR<ApplicationAnswerUpdateWithoutApplicationInput, ApplicationAnswerUncheckedUpdateWithoutApplicationInput>
    create: XOR<ApplicationAnswerCreateWithoutApplicationInput, ApplicationAnswerUncheckedCreateWithoutApplicationInput>
  }

  export type ApplicationAnswerUpdateWithWhereUniqueWithoutApplicationInput = {
    where: ApplicationAnswerWhereUniqueInput
    data: XOR<ApplicationAnswerUpdateWithoutApplicationInput, ApplicationAnswerUncheckedUpdateWithoutApplicationInput>
  }

  export type ApplicationAnswerUpdateManyWithWhereWithoutApplicationInput = {
    where: ApplicationAnswerScalarWhereInput
    data: XOR<ApplicationAnswerUpdateManyMutationInput, ApplicationAnswerUncheckedUpdateManyWithoutApplicationInput>
  }

  export type ApplicationAnswerScalarWhereInput = {
    AND?: ApplicationAnswerScalarWhereInput | ApplicationAnswerScalarWhereInput[]
    OR?: ApplicationAnswerScalarWhereInput[]
    NOT?: ApplicationAnswerScalarWhereInput | ApplicationAnswerScalarWhereInput[]
    id?: BigIntFilter<"ApplicationAnswer"> | bigint | number
    application_id?: BigIntFilter<"ApplicationAnswer"> | bigint | number
    question_id?: BigIntFilter<"ApplicationAnswer"> | bigint | number
    answer_text?: StringNullableFilter<"ApplicationAnswer"> | string | null
    answer_option?: StringNullableFilter<"ApplicationAnswer"> | string | null
    answer_options?: StringNullableListFilter<"ApplicationAnswer">
    answer_file?: StringNullableFilter<"ApplicationAnswer"> | string | null
    created_at?: DateTimeFilter<"ApplicationAnswer"> | Date | string
    updated_at?: DateTimeFilter<"ApplicationAnswer"> | Date | string
  }

  export type ApplicationCreateWithoutAnswersInput = {
    id?: bigint | number
    roles_applying_for?: ApplicationCreateroles_applying_forInput | $Enums.Role[]
    resume_path?: string | null
    status?: $Enums.ApplicationStatus
    comments?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    submitted_at?: Date | string | null
    profile: ProfileCreateNestedOneWithoutApplicationsInput
    term: TermCreateNestedOneWithoutApplicationsInput
  }

  export type ApplicationUncheckedCreateWithoutAnswersInput = {
    id?: bigint | number
    profile_id: string
    term_id: bigint | number
    roles_applying_for?: ApplicationCreateroles_applying_forInput | $Enums.Role[]
    resume_path?: string | null
    status?: $Enums.ApplicationStatus
    comments?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    submitted_at?: Date | string | null
  }

  export type ApplicationCreateOrConnectWithoutAnswersInput = {
    where: ApplicationWhereUniqueInput
    create: XOR<ApplicationCreateWithoutAnswersInput, ApplicationUncheckedCreateWithoutAnswersInput>
  }

  export type QuestionCreateWithoutAnswersInput = {
    id?: bigint | number
    question_id: string
    role: $Enums.Role
    type: $Enums.QuestionType
    question: string
    is_required?: boolean
    order_num: number
    max_length?: number | null
    placeholder?: string | null
    help_text?: string | null
    term: TermCreateNestedOneWithoutQuestionsInput
  }

  export type QuestionUncheckedCreateWithoutAnswersInput = {
    id?: bigint | number
    term_id: bigint | number
    question_id: string
    role: $Enums.Role
    type: $Enums.QuestionType
    question: string
    is_required?: boolean
    order_num: number
    max_length?: number | null
    placeholder?: string | null
    help_text?: string | null
  }

  export type QuestionCreateOrConnectWithoutAnswersInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutAnswersInput, QuestionUncheckedCreateWithoutAnswersInput>
  }

  export type ApplicationUpsertWithoutAnswersInput = {
    update: XOR<ApplicationUpdateWithoutAnswersInput, ApplicationUncheckedUpdateWithoutAnswersInput>
    create: XOR<ApplicationCreateWithoutAnswersInput, ApplicationUncheckedCreateWithoutAnswersInput>
    where?: ApplicationWhereInput
  }

  export type ApplicationUpdateToOneWithWhereWithoutAnswersInput = {
    where?: ApplicationWhereInput
    data: XOR<ApplicationUpdateWithoutAnswersInput, ApplicationUncheckedUpdateWithoutAnswersInput>
  }

  export type ApplicationUpdateWithoutAnswersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    roles_applying_for?: ApplicationUpdateroles_applying_forInput | $Enums.Role[]
    resume_path?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profile?: ProfileUpdateOneRequiredWithoutApplicationsNestedInput
    term?: TermUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type ApplicationUncheckedUpdateWithoutAnswersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    profile_id?: StringFieldUpdateOperationsInput | string
    term_id?: BigIntFieldUpdateOperationsInput | bigint | number
    roles_applying_for?: ApplicationUpdateroles_applying_forInput | $Enums.Role[]
    resume_path?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type QuestionUpsertWithoutAnswersInput = {
    update: XOR<QuestionUpdateWithoutAnswersInput, QuestionUncheckedUpdateWithoutAnswersInput>
    create: XOR<QuestionCreateWithoutAnswersInput, QuestionUncheckedCreateWithoutAnswersInput>
    where?: QuestionWhereInput
  }

  export type QuestionUpdateToOneWithWhereWithoutAnswersInput = {
    where?: QuestionWhereInput
    data: XOR<QuestionUpdateWithoutAnswersInput, QuestionUncheckedUpdateWithoutAnswersInput>
  }

  export type QuestionUpdateWithoutAnswersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    question_id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    question?: StringFieldUpdateOperationsInput | string
    is_required?: BoolFieldUpdateOperationsInput | boolean
    order_num?: IntFieldUpdateOperationsInput | number
    max_length?: NullableIntFieldUpdateOperationsInput | number | null
    placeholder?: NullableStringFieldUpdateOperationsInput | string | null
    help_text?: NullableStringFieldUpdateOperationsInput | string | null
    term?: TermUpdateOneRequiredWithoutQuestionsNestedInput
  }

  export type QuestionUncheckedUpdateWithoutAnswersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    term_id?: BigIntFieldUpdateOperationsInput | bigint | number
    question_id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    question?: StringFieldUpdateOperationsInput | string
    is_required?: BoolFieldUpdateOperationsInput | boolean
    order_num?: IntFieldUpdateOperationsInput | number
    max_length?: NullableIntFieldUpdateOperationsInput | number | null
    placeholder?: NullableStringFieldUpdateOperationsInput | string | null
    help_text?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventAttendanceCreateWithoutEventInput = {
    id?: bigint | number
    checked_in?: boolean
    created_at?: Date | string
    profile: ProfileCreateNestedOneWithoutEvent_attendancesInput
  }

  export type EventAttendanceUncheckedCreateWithoutEventInput = {
    id?: bigint | number
    profile_id: string
    checked_in?: boolean
    created_at?: Date | string
  }

  export type EventAttendanceCreateOrConnectWithoutEventInput = {
    where: EventAttendanceWhereUniqueInput
    create: XOR<EventAttendanceCreateWithoutEventInput, EventAttendanceUncheckedCreateWithoutEventInput>
  }

  export type EventAttendanceCreateManyEventInputEnvelope = {
    data: EventAttendanceCreateManyEventInput | EventAttendanceCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type EventAttendanceUpsertWithWhereUniqueWithoutEventInput = {
    where: EventAttendanceWhereUniqueInput
    update: XOR<EventAttendanceUpdateWithoutEventInput, EventAttendanceUncheckedUpdateWithoutEventInput>
    create: XOR<EventAttendanceCreateWithoutEventInput, EventAttendanceUncheckedCreateWithoutEventInput>
  }

  export type EventAttendanceUpdateWithWhereUniqueWithoutEventInput = {
    where: EventAttendanceWhereUniqueInput
    data: XOR<EventAttendanceUpdateWithoutEventInput, EventAttendanceUncheckedUpdateWithoutEventInput>
  }

  export type EventAttendanceUpdateManyWithWhereWithoutEventInput = {
    where: EventAttendanceScalarWhereInput
    data: XOR<EventAttendanceUpdateManyMutationInput, EventAttendanceUncheckedUpdateManyWithoutEventInput>
  }

  export type EventAttendanceScalarWhereInput = {
    AND?: EventAttendanceScalarWhereInput | EventAttendanceScalarWhereInput[]
    OR?: EventAttendanceScalarWhereInput[]
    NOT?: EventAttendanceScalarWhereInput | EventAttendanceScalarWhereInput[]
    id?: BigIntFilter<"EventAttendance"> | bigint | number
    event_id?: BigIntFilter<"EventAttendance"> | bigint | number
    profile_id?: UuidFilter<"EventAttendance"> | string
    checked_in?: BoolFilter<"EventAttendance"> | boolean
    created_at?: DateTimeFilter<"EventAttendance"> | Date | string
  }

  export type EventCreateWithoutAttendancesInput = {
    id?: bigint | number
    name: string
    registration_required: boolean
    description?: string | null
    location?: string | null
    start_time: Date | string
    buffered_start_time: Date | string
    end_time: Date | string
    buffered_end_time: Date | string
    payment_required?: boolean
    image_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EventUncheckedCreateWithoutAttendancesInput = {
    id?: bigint | number
    name: string
    registration_required: boolean
    description?: string | null
    location?: string | null
    start_time: Date | string
    buffered_start_time: Date | string
    end_time: Date | string
    buffered_end_time: Date | string
    payment_required?: boolean
    image_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EventCreateOrConnectWithoutAttendancesInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutAttendancesInput, EventUncheckedCreateWithoutAttendancesInput>
  }

  export type ProfileCreateWithoutEvent_attendancesInput = {
    id?: string
    first_name: string
    last_name: string
    user_status?: $Enums.UserStatus
    has_paid?: boolean
    wat_iam?: string | null
    faculty: $Enums.Faculty
    term: string
    heard_from_where?: string
    payment_method: $Enums.PaymentMethod
    payment_location?: string | null
    verifier?: string | null
    member_ideas?: string | null
    is_math_soc_member?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    applications?: ApplicationCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutEvent_attendancesInput = {
    id?: string
    first_name: string
    last_name: string
    user_status?: $Enums.UserStatus
    has_paid?: boolean
    wat_iam?: string | null
    faculty: $Enums.Faculty
    term: string
    heard_from_where?: string
    payment_method: $Enums.PaymentMethod
    payment_location?: string | null
    verifier?: string | null
    member_ideas?: string | null
    is_math_soc_member?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    applications?: ApplicationUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutEvent_attendancesInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutEvent_attendancesInput, ProfileUncheckedCreateWithoutEvent_attendancesInput>
  }

  export type EventUpsertWithoutAttendancesInput = {
    update: XOR<EventUpdateWithoutAttendancesInput, EventUncheckedUpdateWithoutAttendancesInput>
    create: XOR<EventCreateWithoutAttendancesInput, EventUncheckedCreateWithoutAttendancesInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutAttendancesInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutAttendancesInput, EventUncheckedUpdateWithoutAttendancesInput>
  }

  export type EventUpdateWithoutAttendancesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    registration_required?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    buffered_start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    buffered_end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    payment_required?: BoolFieldUpdateOperationsInput | boolean
    image_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUncheckedUpdateWithoutAttendancesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    registration_required?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    buffered_start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    buffered_end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    payment_required?: BoolFieldUpdateOperationsInput | boolean
    image_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUpsertWithoutEvent_attendancesInput = {
    update: XOR<ProfileUpdateWithoutEvent_attendancesInput, ProfileUncheckedUpdateWithoutEvent_attendancesInput>
    create: XOR<ProfileCreateWithoutEvent_attendancesInput, ProfileUncheckedCreateWithoutEvent_attendancesInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutEvent_attendancesInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutEvent_attendancesInput, ProfileUncheckedUpdateWithoutEvent_attendancesInput>
  }

  export type ProfileUpdateWithoutEvent_attendancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    user_status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    has_paid?: BoolFieldUpdateOperationsInput | boolean
    wat_iam?: NullableStringFieldUpdateOperationsInput | string | null
    faculty?: EnumFacultyFieldUpdateOperationsInput | $Enums.Faculty
    term?: StringFieldUpdateOperationsInput | string
    heard_from_where?: StringFieldUpdateOperationsInput | string
    payment_method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    payment_location?: NullableStringFieldUpdateOperationsInput | string | null
    verifier?: NullableStringFieldUpdateOperationsInput | string | null
    member_ideas?: NullableStringFieldUpdateOperationsInput | string | null
    is_math_soc_member?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutEvent_attendancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    user_status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    has_paid?: BoolFieldUpdateOperationsInput | boolean
    wat_iam?: NullableStringFieldUpdateOperationsInput | string | null
    faculty?: EnumFacultyFieldUpdateOperationsInput | $Enums.Faculty
    term?: StringFieldUpdateOperationsInput | string
    heard_from_where?: StringFieldUpdateOperationsInput | string
    payment_method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    payment_location?: NullableStringFieldUpdateOperationsInput | string | null
    verifier?: NullableStringFieldUpdateOperationsInput | string | null
    member_ideas?: NullableStringFieldUpdateOperationsInput | string | null
    is_math_soc_member?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type TermCreateWithoutQuestionsInput = {
    id?: bigint | number
    term_name: string
    app_release_date: Date | string
    app_soft_deadline: Date | string
    app_hard_deadline: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    applications?: ApplicationCreateNestedManyWithoutTermInput
  }

  export type TermUncheckedCreateWithoutQuestionsInput = {
    id?: bigint | number
    term_name: string
    app_release_date: Date | string
    app_soft_deadline: Date | string
    app_hard_deadline: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    applications?: ApplicationUncheckedCreateNestedManyWithoutTermInput
  }

  export type TermCreateOrConnectWithoutQuestionsInput = {
    where: TermWhereUniqueInput
    create: XOR<TermCreateWithoutQuestionsInput, TermUncheckedCreateWithoutQuestionsInput>
  }

  export type ApplicationAnswerCreateWithoutQuestionInput = {
    id?: bigint | number
    answer_text?: string | null
    answer_option?: string | null
    answer_options?: ApplicationAnswerCreateanswer_optionsInput | string[]
    answer_file?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    application: ApplicationCreateNestedOneWithoutAnswersInput
  }

  export type ApplicationAnswerUncheckedCreateWithoutQuestionInput = {
    id?: bigint | number
    application_id: bigint | number
    answer_text?: string | null
    answer_option?: string | null
    answer_options?: ApplicationAnswerCreateanswer_optionsInput | string[]
    answer_file?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ApplicationAnswerCreateOrConnectWithoutQuestionInput = {
    where: ApplicationAnswerWhereUniqueInput
    create: XOR<ApplicationAnswerCreateWithoutQuestionInput, ApplicationAnswerUncheckedCreateWithoutQuestionInput>
  }

  export type ApplicationAnswerCreateManyQuestionInputEnvelope = {
    data: ApplicationAnswerCreateManyQuestionInput | ApplicationAnswerCreateManyQuestionInput[]
    skipDuplicates?: boolean
  }

  export type TermUpsertWithoutQuestionsInput = {
    update: XOR<TermUpdateWithoutQuestionsInput, TermUncheckedUpdateWithoutQuestionsInput>
    create: XOR<TermCreateWithoutQuestionsInput, TermUncheckedCreateWithoutQuestionsInput>
    where?: TermWhereInput
  }

  export type TermUpdateToOneWithWhereWithoutQuestionsInput = {
    where?: TermWhereInput
    data: XOR<TermUpdateWithoutQuestionsInput, TermUncheckedUpdateWithoutQuestionsInput>
  }

  export type TermUpdateWithoutQuestionsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    term_name?: StringFieldUpdateOperationsInput | string
    app_release_date?: DateTimeFieldUpdateOperationsInput | Date | string
    app_soft_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    app_hard_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUpdateManyWithoutTermNestedInput
  }

  export type TermUncheckedUpdateWithoutQuestionsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    term_name?: StringFieldUpdateOperationsInput | string
    app_release_date?: DateTimeFieldUpdateOperationsInput | Date | string
    app_soft_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    app_hard_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUncheckedUpdateManyWithoutTermNestedInput
  }

  export type ApplicationAnswerUpsertWithWhereUniqueWithoutQuestionInput = {
    where: ApplicationAnswerWhereUniqueInput
    update: XOR<ApplicationAnswerUpdateWithoutQuestionInput, ApplicationAnswerUncheckedUpdateWithoutQuestionInput>
    create: XOR<ApplicationAnswerCreateWithoutQuestionInput, ApplicationAnswerUncheckedCreateWithoutQuestionInput>
  }

  export type ApplicationAnswerUpdateWithWhereUniqueWithoutQuestionInput = {
    where: ApplicationAnswerWhereUniqueInput
    data: XOR<ApplicationAnswerUpdateWithoutQuestionInput, ApplicationAnswerUncheckedUpdateWithoutQuestionInput>
  }

  export type ApplicationAnswerUpdateManyWithWhereWithoutQuestionInput = {
    where: ApplicationAnswerScalarWhereInput
    data: XOR<ApplicationAnswerUpdateManyMutationInput, ApplicationAnswerUncheckedUpdateManyWithoutQuestionInput>
  }

  export type ApplicationCreateWithoutTermInput = {
    id?: bigint | number
    roles_applying_for?: ApplicationCreateroles_applying_forInput | $Enums.Role[]
    resume_path?: string | null
    status?: $Enums.ApplicationStatus
    comments?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    submitted_at?: Date | string | null
    profile: ProfileCreateNestedOneWithoutApplicationsInput
    answers?: ApplicationAnswerCreateNestedManyWithoutApplicationInput
  }

  export type ApplicationUncheckedCreateWithoutTermInput = {
    id?: bigint | number
    profile_id: string
    roles_applying_for?: ApplicationCreateroles_applying_forInput | $Enums.Role[]
    resume_path?: string | null
    status?: $Enums.ApplicationStatus
    comments?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    submitted_at?: Date | string | null
    answers?: ApplicationAnswerUncheckedCreateNestedManyWithoutApplicationInput
  }

  export type ApplicationCreateOrConnectWithoutTermInput = {
    where: ApplicationWhereUniqueInput
    create: XOR<ApplicationCreateWithoutTermInput, ApplicationUncheckedCreateWithoutTermInput>
  }

  export type ApplicationCreateManyTermInputEnvelope = {
    data: ApplicationCreateManyTermInput | ApplicationCreateManyTermInput[]
    skipDuplicates?: boolean
  }

  export type QuestionCreateWithoutTermInput = {
    id?: bigint | number
    question_id: string
    role: $Enums.Role
    type: $Enums.QuestionType
    question: string
    is_required?: boolean
    order_num: number
    max_length?: number | null
    placeholder?: string | null
    help_text?: string | null
    answers?: ApplicationAnswerCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateWithoutTermInput = {
    id?: bigint | number
    question_id: string
    role: $Enums.Role
    type: $Enums.QuestionType
    question: string
    is_required?: boolean
    order_num: number
    max_length?: number | null
    placeholder?: string | null
    help_text?: string | null
    answers?: ApplicationAnswerUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionCreateOrConnectWithoutTermInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutTermInput, QuestionUncheckedCreateWithoutTermInput>
  }

  export type QuestionCreateManyTermInputEnvelope = {
    data: QuestionCreateManyTermInput | QuestionCreateManyTermInput[]
    skipDuplicates?: boolean
  }

  export type ApplicationUpsertWithWhereUniqueWithoutTermInput = {
    where: ApplicationWhereUniqueInput
    update: XOR<ApplicationUpdateWithoutTermInput, ApplicationUncheckedUpdateWithoutTermInput>
    create: XOR<ApplicationCreateWithoutTermInput, ApplicationUncheckedCreateWithoutTermInput>
  }

  export type ApplicationUpdateWithWhereUniqueWithoutTermInput = {
    where: ApplicationWhereUniqueInput
    data: XOR<ApplicationUpdateWithoutTermInput, ApplicationUncheckedUpdateWithoutTermInput>
  }

  export type ApplicationUpdateManyWithWhereWithoutTermInput = {
    where: ApplicationScalarWhereInput
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyWithoutTermInput>
  }

  export type ApplicationScalarWhereInput = {
    AND?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
    OR?: ApplicationScalarWhereInput[]
    NOT?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
    id?: BigIntFilter<"Application"> | bigint | number
    profile_id?: UuidFilter<"Application"> | string
    term_id?: BigIntFilter<"Application"> | bigint | number
    roles_applying_for?: EnumRoleNullableListFilter<"Application">
    resume_path?: StringNullableFilter<"Application"> | string | null
    status?: EnumApplicationStatusFilter<"Application"> | $Enums.ApplicationStatus
    comments?: StringNullableFilter<"Application"> | string | null
    created_at?: DateTimeFilter<"Application"> | Date | string
    updated_at?: DateTimeFilter<"Application"> | Date | string
    submitted_at?: DateTimeNullableFilter<"Application"> | Date | string | null
  }

  export type QuestionUpsertWithWhereUniqueWithoutTermInput = {
    where: QuestionWhereUniqueInput
    update: XOR<QuestionUpdateWithoutTermInput, QuestionUncheckedUpdateWithoutTermInput>
    create: XOR<QuestionCreateWithoutTermInput, QuestionUncheckedCreateWithoutTermInput>
  }

  export type QuestionUpdateWithWhereUniqueWithoutTermInput = {
    where: QuestionWhereUniqueInput
    data: XOR<QuestionUpdateWithoutTermInput, QuestionUncheckedUpdateWithoutTermInput>
  }

  export type QuestionUpdateManyWithWhereWithoutTermInput = {
    where: QuestionScalarWhereInput
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyWithoutTermInput>
  }

  export type QuestionScalarWhereInput = {
    AND?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
    OR?: QuestionScalarWhereInput[]
    NOT?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
    id?: BigIntFilter<"Question"> | bigint | number
    term_id?: BigIntFilter<"Question"> | bigint | number
    question_id?: StringFilter<"Question"> | string
    role?: EnumRoleFilter<"Question"> | $Enums.Role
    type?: EnumQuestionTypeFilter<"Question"> | $Enums.QuestionType
    question?: StringFilter<"Question"> | string
    is_required?: BoolFilter<"Question"> | boolean
    order_num?: IntFilter<"Question"> | number
    max_length?: IntNullableFilter<"Question"> | number | null
    placeholder?: StringNullableFilter<"Question"> | string | null
    help_text?: StringNullableFilter<"Question"> | string | null
  }

  export type ApplicationCreateWithoutProfileInput = {
    id?: bigint | number
    roles_applying_for?: ApplicationCreateroles_applying_forInput | $Enums.Role[]
    resume_path?: string | null
    status?: $Enums.ApplicationStatus
    comments?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    submitted_at?: Date | string | null
    term: TermCreateNestedOneWithoutApplicationsInput
    answers?: ApplicationAnswerCreateNestedManyWithoutApplicationInput
  }

  export type ApplicationUncheckedCreateWithoutProfileInput = {
    id?: bigint | number
    term_id: bigint | number
    roles_applying_for?: ApplicationCreateroles_applying_forInput | $Enums.Role[]
    resume_path?: string | null
    status?: $Enums.ApplicationStatus
    comments?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    submitted_at?: Date | string | null
    answers?: ApplicationAnswerUncheckedCreateNestedManyWithoutApplicationInput
  }

  export type ApplicationCreateOrConnectWithoutProfileInput = {
    where: ApplicationWhereUniqueInput
    create: XOR<ApplicationCreateWithoutProfileInput, ApplicationUncheckedCreateWithoutProfileInput>
  }

  export type ApplicationCreateManyProfileInputEnvelope = {
    data: ApplicationCreateManyProfileInput | ApplicationCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type EventAttendanceCreateWithoutProfileInput = {
    id?: bigint | number
    checked_in?: boolean
    created_at?: Date | string
    event: EventCreateNestedOneWithoutAttendancesInput
  }

  export type EventAttendanceUncheckedCreateWithoutProfileInput = {
    id?: bigint | number
    event_id: bigint | number
    checked_in?: boolean
    created_at?: Date | string
  }

  export type EventAttendanceCreateOrConnectWithoutProfileInput = {
    where: EventAttendanceWhereUniqueInput
    create: XOR<EventAttendanceCreateWithoutProfileInput, EventAttendanceUncheckedCreateWithoutProfileInput>
  }

  export type EventAttendanceCreateManyProfileInputEnvelope = {
    data: EventAttendanceCreateManyProfileInput | EventAttendanceCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type ApplicationUpsertWithWhereUniqueWithoutProfileInput = {
    where: ApplicationWhereUniqueInput
    update: XOR<ApplicationUpdateWithoutProfileInput, ApplicationUncheckedUpdateWithoutProfileInput>
    create: XOR<ApplicationCreateWithoutProfileInput, ApplicationUncheckedCreateWithoutProfileInput>
  }

  export type ApplicationUpdateWithWhereUniqueWithoutProfileInput = {
    where: ApplicationWhereUniqueInput
    data: XOR<ApplicationUpdateWithoutProfileInput, ApplicationUncheckedUpdateWithoutProfileInput>
  }

  export type ApplicationUpdateManyWithWhereWithoutProfileInput = {
    where: ApplicationScalarWhereInput
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyWithoutProfileInput>
  }

  export type EventAttendanceUpsertWithWhereUniqueWithoutProfileInput = {
    where: EventAttendanceWhereUniqueInput
    update: XOR<EventAttendanceUpdateWithoutProfileInput, EventAttendanceUncheckedUpdateWithoutProfileInput>
    create: XOR<EventAttendanceCreateWithoutProfileInput, EventAttendanceUncheckedCreateWithoutProfileInput>
  }

  export type EventAttendanceUpdateWithWhereUniqueWithoutProfileInput = {
    where: EventAttendanceWhereUniqueInput
    data: XOR<EventAttendanceUpdateWithoutProfileInput, EventAttendanceUncheckedUpdateWithoutProfileInput>
  }

  export type EventAttendanceUpdateManyWithWhereWithoutProfileInput = {
    where: EventAttendanceScalarWhereInput
    data: XOR<EventAttendanceUpdateManyMutationInput, EventAttendanceUncheckedUpdateManyWithoutProfileInput>
  }

  export type ApplicationAnswerCreateManyApplicationInput = {
    id?: bigint | number
    question_id: bigint | number
    answer_text?: string | null
    answer_option?: string | null
    answer_options?: ApplicationAnswerCreateanswer_optionsInput | string[]
    answer_file?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ApplicationAnswerUpdateWithoutApplicationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    answer_text?: NullableStringFieldUpdateOperationsInput | string | null
    answer_option?: NullableStringFieldUpdateOperationsInput | string | null
    answer_options?: ApplicationAnswerUpdateanswer_optionsInput | string[]
    answer_file?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    question?: QuestionUpdateOneRequiredWithoutAnswersNestedInput
  }

  export type ApplicationAnswerUncheckedUpdateWithoutApplicationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    question_id?: BigIntFieldUpdateOperationsInput | bigint | number
    answer_text?: NullableStringFieldUpdateOperationsInput | string | null
    answer_option?: NullableStringFieldUpdateOperationsInput | string | null
    answer_options?: ApplicationAnswerUpdateanswer_optionsInput | string[]
    answer_file?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationAnswerUncheckedUpdateManyWithoutApplicationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    question_id?: BigIntFieldUpdateOperationsInput | bigint | number
    answer_text?: NullableStringFieldUpdateOperationsInput | string | null
    answer_option?: NullableStringFieldUpdateOperationsInput | string | null
    answer_options?: ApplicationAnswerUpdateanswer_optionsInput | string[]
    answer_file?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventAttendanceCreateManyEventInput = {
    id?: bigint | number
    profile_id: string
    checked_in?: boolean
    created_at?: Date | string
  }

  export type EventAttendanceUpdateWithoutEventInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    checked_in?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutEvent_attendancesNestedInput
  }

  export type EventAttendanceUncheckedUpdateWithoutEventInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    profile_id?: StringFieldUpdateOperationsInput | string
    checked_in?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventAttendanceUncheckedUpdateManyWithoutEventInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    profile_id?: StringFieldUpdateOperationsInput | string
    checked_in?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationAnswerCreateManyQuestionInput = {
    id?: bigint | number
    application_id: bigint | number
    answer_text?: string | null
    answer_option?: string | null
    answer_options?: ApplicationAnswerCreateanswer_optionsInput | string[]
    answer_file?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ApplicationAnswerUpdateWithoutQuestionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    answer_text?: NullableStringFieldUpdateOperationsInput | string | null
    answer_option?: NullableStringFieldUpdateOperationsInput | string | null
    answer_options?: ApplicationAnswerUpdateanswer_optionsInput | string[]
    answer_file?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    application?: ApplicationUpdateOneRequiredWithoutAnswersNestedInput
  }

  export type ApplicationAnswerUncheckedUpdateWithoutQuestionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    application_id?: BigIntFieldUpdateOperationsInput | bigint | number
    answer_text?: NullableStringFieldUpdateOperationsInput | string | null
    answer_option?: NullableStringFieldUpdateOperationsInput | string | null
    answer_options?: ApplicationAnswerUpdateanswer_optionsInput | string[]
    answer_file?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationAnswerUncheckedUpdateManyWithoutQuestionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    application_id?: BigIntFieldUpdateOperationsInput | bigint | number
    answer_text?: NullableStringFieldUpdateOperationsInput | string | null
    answer_option?: NullableStringFieldUpdateOperationsInput | string | null
    answer_options?: ApplicationAnswerUpdateanswer_optionsInput | string[]
    answer_file?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationCreateManyTermInput = {
    id?: bigint | number
    profile_id: string
    roles_applying_for?: ApplicationCreateroles_applying_forInput | $Enums.Role[]
    resume_path?: string | null
    status?: $Enums.ApplicationStatus
    comments?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    submitted_at?: Date | string | null
  }

  export type QuestionCreateManyTermInput = {
    id?: bigint | number
    question_id: string
    role: $Enums.Role
    type: $Enums.QuestionType
    question: string
    is_required?: boolean
    order_num: number
    max_length?: number | null
    placeholder?: string | null
    help_text?: string | null
  }

  export type ApplicationUpdateWithoutTermInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    roles_applying_for?: ApplicationUpdateroles_applying_forInput | $Enums.Role[]
    resume_path?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profile?: ProfileUpdateOneRequiredWithoutApplicationsNestedInput
    answers?: ApplicationAnswerUpdateManyWithoutApplicationNestedInput
  }

  export type ApplicationUncheckedUpdateWithoutTermInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    profile_id?: StringFieldUpdateOperationsInput | string
    roles_applying_for?: ApplicationUpdateroles_applying_forInput | $Enums.Role[]
    resume_path?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: ApplicationAnswerUncheckedUpdateManyWithoutApplicationNestedInput
  }

  export type ApplicationUncheckedUpdateManyWithoutTermInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    profile_id?: StringFieldUpdateOperationsInput | string
    roles_applying_for?: ApplicationUpdateroles_applying_forInput | $Enums.Role[]
    resume_path?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type QuestionUpdateWithoutTermInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    question_id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    question?: StringFieldUpdateOperationsInput | string
    is_required?: BoolFieldUpdateOperationsInput | boolean
    order_num?: IntFieldUpdateOperationsInput | number
    max_length?: NullableIntFieldUpdateOperationsInput | number | null
    placeholder?: NullableStringFieldUpdateOperationsInput | string | null
    help_text?: NullableStringFieldUpdateOperationsInput | string | null
    answers?: ApplicationAnswerUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateWithoutTermInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    question_id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    question?: StringFieldUpdateOperationsInput | string
    is_required?: BoolFieldUpdateOperationsInput | boolean
    order_num?: IntFieldUpdateOperationsInput | number
    max_length?: NullableIntFieldUpdateOperationsInput | number | null
    placeholder?: NullableStringFieldUpdateOperationsInput | string | null
    help_text?: NullableStringFieldUpdateOperationsInput | string | null
    answers?: ApplicationAnswerUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateManyWithoutTermInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    question_id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    question?: StringFieldUpdateOperationsInput | string
    is_required?: BoolFieldUpdateOperationsInput | boolean
    order_num?: IntFieldUpdateOperationsInput | number
    max_length?: NullableIntFieldUpdateOperationsInput | number | null
    placeholder?: NullableStringFieldUpdateOperationsInput | string | null
    help_text?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ApplicationCreateManyProfileInput = {
    id?: bigint | number
    term_id: bigint | number
    roles_applying_for?: ApplicationCreateroles_applying_forInput | $Enums.Role[]
    resume_path?: string | null
    status?: $Enums.ApplicationStatus
    comments?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    submitted_at?: Date | string | null
  }

  export type EventAttendanceCreateManyProfileInput = {
    id?: bigint | number
    event_id: bigint | number
    checked_in?: boolean
    created_at?: Date | string
  }

  export type ApplicationUpdateWithoutProfileInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    roles_applying_for?: ApplicationUpdateroles_applying_forInput | $Enums.Role[]
    resume_path?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    term?: TermUpdateOneRequiredWithoutApplicationsNestedInput
    answers?: ApplicationAnswerUpdateManyWithoutApplicationNestedInput
  }

  export type ApplicationUncheckedUpdateWithoutProfileInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    term_id?: BigIntFieldUpdateOperationsInput | bigint | number
    roles_applying_for?: ApplicationUpdateroles_applying_forInput | $Enums.Role[]
    resume_path?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: ApplicationAnswerUncheckedUpdateManyWithoutApplicationNestedInput
  }

  export type ApplicationUncheckedUpdateManyWithoutProfileInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    term_id?: BigIntFieldUpdateOperationsInput | bigint | number
    roles_applying_for?: ApplicationUpdateroles_applying_forInput | $Enums.Role[]
    resume_path?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EventAttendanceUpdateWithoutProfileInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    checked_in?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutAttendancesNestedInput
  }

  export type EventAttendanceUncheckedUpdateWithoutProfileInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    event_id?: BigIntFieldUpdateOperationsInput | bigint | number
    checked_in?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventAttendanceUncheckedUpdateManyWithoutProfileInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    event_id?: BigIntFieldUpdateOperationsInput | bigint | number
    checked_in?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}