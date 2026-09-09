var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/object-assign@4.1.1/node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "node_modules/.pnpm/object-assign@4.1.1/node_modules/object-assign/index.js"(exports, module) {
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }
      return to;
    };
  }
});

// node_modules/.pnpm/vary@1.1.2/node_modules/vary/index.js
var require_vary = __commonJS({
  "node_modules/.pnpm/vary@1.1.2/node_modules/vary/index.js"(exports, module) {
    "use strict";
    module.exports = vary;
    module.exports.append = append;
    var FIELD_NAME_REGEXP = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
    function append(header, field) {
      if (typeof header !== "string") {
        throw new TypeError("header argument is required");
      }
      if (!field) {
        throw new TypeError("field argument is required");
      }
      var fields = !Array.isArray(field) ? parse(String(field)) : field;
      for (var j = 0; j < fields.length; j++) {
        if (!FIELD_NAME_REGEXP.test(fields[j])) {
          throw new TypeError("field argument contains an invalid header name");
        }
      }
      if (header === "*") {
        return header;
      }
      var val = header;
      var vals = parse(header.toLowerCase());
      if (fields.indexOf("*") !== -1 || vals.indexOf("*") !== -1) {
        return "*";
      }
      for (var i = 0; i < fields.length; i++) {
        var fld = fields[i].toLowerCase();
        if (vals.indexOf(fld) === -1) {
          vals.push(fld);
          val = val ? val + ", " + fields[i] : fields[i];
        }
      }
      return val;
    }
    function parse(header) {
      var end = 0;
      var list = [];
      var start = 0;
      for (var i = 0, len = header.length; i < len; i++) {
        switch (header.charCodeAt(i)) {
          case 32:
            if (start === end) {
              start = end = i + 1;
            }
            break;
          case 44:
            list.push(header.substring(start, end));
            start = end = i + 1;
            break;
          default:
            end = i + 1;
            break;
        }
      }
      list.push(header.substring(start, end));
      return list;
    }
    function vary(res, field) {
      if (!res || !res.getHeader || !res.setHeader) {
        throw new TypeError("res argument is required");
      }
      var val = res.getHeader("Vary") || "";
      var header = Array.isArray(val) ? val.join(", ") : String(val);
      if (val = append(header, field)) {
        res.setHeader("Vary", val);
      }
    }
  }
});

// node_modules/.pnpm/cors@2.8.6/node_modules/cors/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/cors@2.8.6/node_modules/cors/lib/index.js"(exports, module) {
    "use strict";
    (function() {
      "use strict";
      var assign = require_object_assign();
      var vary = require_vary();
      var defaults = {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204
      };
      function isString(s) {
        return typeof s === "string" || s instanceof String;
      }
      function isOriginAllowed(origin, allowedOrigin) {
        if (Array.isArray(allowedOrigin)) {
          for (var i = 0; i < allowedOrigin.length; ++i) {
            if (isOriginAllowed(origin, allowedOrigin[i])) {
              return true;
            }
          }
          return false;
        } else if (isString(allowedOrigin)) {
          return origin === allowedOrigin;
        } else if (allowedOrigin instanceof RegExp) {
          return allowedOrigin.test(origin);
        } else {
          return !!allowedOrigin;
        }
      }
      function configureOrigin(options, req) {
        var requestOrigin = req.headers.origin, headers = [], isAllowed;
        if (!options.origin || options.origin === "*") {
          headers.push([{
            key: "Access-Control-Allow-Origin",
            value: "*"
          }]);
        } else if (isString(options.origin)) {
          headers.push([{
            key: "Access-Control-Allow-Origin",
            value: options.origin
          }]);
          headers.push([{
            key: "Vary",
            value: "Origin"
          }]);
        } else {
          isAllowed = isOriginAllowed(requestOrigin, options.origin);
          headers.push([{
            key: "Access-Control-Allow-Origin",
            value: isAllowed ? requestOrigin : false
          }]);
          headers.push([{
            key: "Vary",
            value: "Origin"
          }]);
        }
        return headers;
      }
      function configureMethods(options) {
        var methods = options.methods;
        if (methods.join) {
          methods = options.methods.join(",");
        }
        return {
          key: "Access-Control-Allow-Methods",
          value: methods
        };
      }
      function configureCredentials(options) {
        if (options.credentials === true) {
          return {
            key: "Access-Control-Allow-Credentials",
            value: "true"
          };
        }
        return null;
      }
      function configureAllowedHeaders(options, req) {
        var allowedHeaders = options.allowedHeaders || options.headers;
        var headers = [];
        if (!allowedHeaders) {
          allowedHeaders = req.headers["access-control-request-headers"];
          headers.push([{
            key: "Vary",
            value: "Access-Control-Request-Headers"
          }]);
        } else if (allowedHeaders.join) {
          allowedHeaders = allowedHeaders.join(",");
        }
        if (allowedHeaders && allowedHeaders.length) {
          headers.push([{
            key: "Access-Control-Allow-Headers",
            value: allowedHeaders
          }]);
        }
        return headers;
      }
      function configureExposedHeaders(options) {
        var headers = options.exposedHeaders;
        if (!headers) {
          return null;
        } else if (headers.join) {
          headers = headers.join(",");
        }
        if (headers && headers.length) {
          return {
            key: "Access-Control-Expose-Headers",
            value: headers
          };
        }
        return null;
      }
      function configureMaxAge(options) {
        var maxAge = (typeof options.maxAge === "number" || options.maxAge) && options.maxAge.toString();
        if (maxAge && maxAge.length) {
          return {
            key: "Access-Control-Max-Age",
            value: maxAge
          };
        }
        return null;
      }
      function applyHeaders(headers, res) {
        for (var i = 0, n = headers.length; i < n; i++) {
          var header = headers[i];
          if (header) {
            if (Array.isArray(header)) {
              applyHeaders(header, res);
            } else if (header.key === "Vary" && header.value) {
              vary(res, header.value);
            } else if (header.value) {
              res.setHeader(header.key, header.value);
            }
          }
        }
      }
      function cors2(options, req, res, next) {
        var headers = [], method = req.method && req.method.toUpperCase && req.method.toUpperCase();
        if (method === "OPTIONS") {
          headers.push(configureOrigin(options, req));
          headers.push(configureCredentials(options));
          headers.push(configureMethods(options));
          headers.push(configureAllowedHeaders(options, req));
          headers.push(configureMaxAge(options));
          headers.push(configureExposedHeaders(options));
          applyHeaders(headers, res);
          if (options.preflightContinue) {
            next();
          } else {
            res.statusCode = options.optionsSuccessStatus;
            res.setHeader("Content-Length", "0");
            res.end();
          }
        } else {
          headers.push(configureOrigin(options, req));
          headers.push(configureCredentials(options));
          headers.push(configureExposedHeaders(options));
          applyHeaders(headers, res);
          next();
        }
      }
      function middlewareWrapper(o) {
        var optionsCallback = null;
        if (typeof o === "function") {
          optionsCallback = o;
        } else {
          optionsCallback = function(req, cb) {
            cb(null, o);
          };
        }
        return function corsMiddleware(req, res, next) {
          optionsCallback(req, function(err, options) {
            if (err) {
              next(err);
            } else {
              var corsOptions = assign({}, defaults, options);
              var originCallback = null;
              if (corsOptions.origin && typeof corsOptions.origin === "function") {
                originCallback = corsOptions.origin;
              } else if (corsOptions.origin) {
                originCallback = function(origin, cb) {
                  cb(null, corsOptions.origin);
                };
              }
              if (originCallback) {
                originCallback(req.headers.origin, function(err2, origin) {
                  if (err2 || !origin) {
                    next(err2);
                  } else {
                    corsOptions.origin = origin;
                    cors2(corsOptions, req, res, next);
                  }
                });
              } else {
                next();
              }
            }
          });
        };
      }
      module.exports = middlewareWrapper;
    })();
  }
});

// src/app.ts
import express from "express";
import { toNodeHandler } from "better-auth/node";

// src/app/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/app/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// src/generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.8.0",
  "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
  "activeProvider": "postgresql",
  "inlineSchema": 'model Attendance {\n  id         String          @id @default(uuid())\n  employeeId String\n  employee   EmployeeProfile @relation(fields: [employeeId], references: [id], onDelete: Cascade)\n\n  date     DateTime  @db.Date\n  checkIn  DateTime?\n  checkOut DateTime?\n\n  status AttendanceStatus @default(ABSENT)\n\n  workingHours   Float @default(0.0)\n  overtimeHours  Float @default(0.0)\n  lateMinutes    Int   @default(0)\n  earlyLeaveMins Int   @default(0)\n\n  checkInIp  String?\n  checkOutIp String?\n  notes      String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([employeeId, date])\n  @@index([date])\n  @@index([status])\n  @@map("attendances")\n}\n\nmodel AuditLog {\n  id     String  @id @default(uuid())\n  userId String?\n  user   User?   @relation(fields: [userId], references: [id], onDelete: SetNull)\n\n  action    AuditAction\n  details   String\n  ipAddress String?\n\n  createdAt DateTime @default(now())\n\n  @@map("audit_logs")\n}\n\nmodel User {\n  id                   String    @id @default(uuid())\n  name                 String\n  email                String    @unique\n  role                 Role      @default(EMPLOYEE)\n  phone                String?\n  image                String\n  isDeleted            Boolean   @default(false)\n  deletedAt            DateTime?\n  bgimage              String?   @default("https://images.pexels.com/photos/4303031/pexels-photo-4303031.jpeg")\n  isActive             Boolean   @default(false)\n  emailVerified        Boolean   @default(false)\n  createdAt            DateTime  @default(now())\n  updatedAt            DateTime  @updatedAt\n  sessions             Session[]\n  passwordResetToken   String?\n  passwordResetExpires DateTime?\n\n  employeeProfile EmployeeProfile?\n  auditLogs       AuditLog[]\n  approvedLeaves  LeaveRequest[]   @relation("ApprovedByRelation")\n  accounts        Account[]\n\n  @@map("users")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel Department {\n  id          String  @id @default(uuid())\n  name        String  @unique\n  code        String  @unique\n  description String?\n\n  employees EmployeeProfile[]\n  positions Position[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("departments")\n}\n\nmodel Position {\n  id           String     @id @default(uuid())\n  title        String\n  departmentId String\n  department   Department @relation(fields: [departmentId], references: [id], onDelete: Cascade)\n\n  employees EmployeeProfile[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([title, departmentId])\n  @@map("positions")\n}\n\nmodel EmployeeProfile {\n  id     String @id @default(uuid())\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  employeeId  String    @unique\n  firstName   String\n  lastName    String\n  phone       String?\n  gender      Gender?\n  dateOfBirth DateTime?\n  joiningDate DateTime\n\n  departmentId String?\n  department   Department? @relation(fields: [departmentId], references: [id], onDelete: SetNull)\n\n  positionId String?\n  position   Position? @relation(fields: [positionId], references: [id], onDelete: SetNull)\n\n  employmentType EmploymentType @default(FULL_TIME)\n\n  workScheduleId String?\n  workSchedule   WorkSchedule? @relation(fields: [workScheduleId], references: [id], onDelete: SetNull)\n\n  attendances   Attendance[]\n  leaveRequests LeaveRequest[] @relation("EmployeeLeaves")\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("employee_profiles")\n}\n\nenum Role {\n  ADMIN\n  HR\n  EMPLOYEE\n}\n\nenum Gender {\n  MALE\n  FEMALE\n  OTHER\n}\n\nenum EmploymentType {\n  FULL_TIME\n  PART_TIME\n  CONTRACT\n  INTERN\n}\n\nenum AttendanceStatus {\n  PRESENT\n  LATE\n  ABSENT\n  HALF_DAY\n  ON_LEAVE\n  HOLIDAY\n  WEEKEND\n}\n\nenum LeaveType {\n  CASUAL\n  SICK\n  ANNUAL\n  MATERNITY\n  PATERNITY\n  UNPAID\n}\n\nenum LeaveStatus {\n  PENDING\n  APPROVED\n  REJECTED\n  CANCELLED\n}\n\nenum AuditAction {\n  CREATE\n  UPDATE\n  DELETE\n  LOGIN\n  LOGOUT\n  CHECK_IN\n  CHECK_OUT\n  LEAVE_APPROVE\n  LEAVE_REJECT\n}\n\nmodel LeaveRequest {\n  id         String          @id @default(uuid())\n  employeeId String\n  employee   EmployeeProfile @relation("EmployeeLeaves", fields: [employeeId], references: [id], onDelete: Cascade)\n\n  leaveType LeaveType\n  startDate DateTime  @db.Date\n  endDate   DateTime  @db.Date\n  totalDays Int\n  reason    String\n\n  status LeaveStatus @default(PENDING)\n\n  approvedById String?\n  approvedBy   User?   @relation("ApprovedByRelation", fields: [approvedById], references: [id], onDelete: SetNull)\n  adminRemarks String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([employeeId])\n  @@index([status])\n  @@map("leave_requests")\n}\n\nmodel WorkSchedule {\n  id           String @id @default(uuid())\n  name         String @unique\n  startTime    String // e.g. "09:00"\n  endTime      String // e.g. "17:00"\n  graceMinutes Int    @default(15)\n  workDays     Int[] // Days array: [1, 2, 3, 4, 5] (1=Monday, 7=Sunday)\n\n  employees EmployeeProfile[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("work_schedules")\n}\n\nmodel Holiday {\n  id          String   @id @default(uuid())\n  title       String\n  date        DateTime @unique @db.Date\n  description String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("holidays")\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Attendance":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"employeeId","kind":"scalar","type":"String"},{"name":"employee","kind":"object","type":"EmployeeProfile","relationName":"AttendanceToEmployeeProfile"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"checkIn","kind":"scalar","type":"DateTime"},{"name":"checkOut","kind":"scalar","type":"DateTime"},{"name":"status","kind":"enum","type":"AttendanceStatus"},{"name":"workingHours","kind":"scalar","type":"Float"},{"name":"overtimeHours","kind":"scalar","type":"Float"},{"name":"lateMinutes","kind":"scalar","type":"Int"},{"name":"earlyLeaveMins","kind":"scalar","type":"Int"},{"name":"checkInIp","kind":"scalar","type":"String"},{"name":"checkOutIp","kind":"scalar","type":"String"},{"name":"notes","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"attendances"},"AuditLog":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AuditLogToUser"},{"name":"action","kind":"enum","type":"AuditAction"},{"name":"details","kind":"scalar","type":"String"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":"audit_logs"},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"phone","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"bgimage","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"passwordResetToken","kind":"scalar","type":"String"},{"name":"passwordResetExpires","kind":"scalar","type":"DateTime"},{"name":"employeeProfile","kind":"object","type":"EmployeeProfile","relationName":"EmployeeProfileToUser"},{"name":"auditLogs","kind":"object","type":"AuditLog","relationName":"AuditLogToUser"},{"name":"approvedLeaves","kind":"object","type":"LeaveRequest","relationName":"ApprovedByRelation"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"}],"dbName":"users"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Department":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"code","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"employees","kind":"object","type":"EmployeeProfile","relationName":"DepartmentToEmployeeProfile"},{"name":"positions","kind":"object","type":"Position","relationName":"DepartmentToPosition"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"departments"},"Position":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"departmentId","kind":"scalar","type":"String"},{"name":"department","kind":"object","type":"Department","relationName":"DepartmentToPosition"},{"name":"employees","kind":"object","type":"EmployeeProfile","relationName":"EmployeeProfileToPosition"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"positions"},"EmployeeProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"EmployeeProfileToUser"},{"name":"employeeId","kind":"scalar","type":"String"},{"name":"firstName","kind":"scalar","type":"String"},{"name":"lastName","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"gender","kind":"enum","type":"Gender"},{"name":"dateOfBirth","kind":"scalar","type":"DateTime"},{"name":"joiningDate","kind":"scalar","type":"DateTime"},{"name":"departmentId","kind":"scalar","type":"String"},{"name":"department","kind":"object","type":"Department","relationName":"DepartmentToEmployeeProfile"},{"name":"positionId","kind":"scalar","type":"String"},{"name":"position","kind":"object","type":"Position","relationName":"EmployeeProfileToPosition"},{"name":"employmentType","kind":"enum","type":"EmploymentType"},{"name":"workScheduleId","kind":"scalar","type":"String"},{"name":"workSchedule","kind":"object","type":"WorkSchedule","relationName":"EmployeeProfileToWorkSchedule"},{"name":"attendances","kind":"object","type":"Attendance","relationName":"AttendanceToEmployeeProfile"},{"name":"leaveRequests","kind":"object","type":"LeaveRequest","relationName":"EmployeeLeaves"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"employee_profiles"},"LeaveRequest":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"employeeId","kind":"scalar","type":"String"},{"name":"employee","kind":"object","type":"EmployeeProfile","relationName":"EmployeeLeaves"},{"name":"leaveType","kind":"enum","type":"LeaveType"},{"name":"startDate","kind":"scalar","type":"DateTime"},{"name":"endDate","kind":"scalar","type":"DateTime"},{"name":"totalDays","kind":"scalar","type":"Int"},{"name":"reason","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"LeaveStatus"},{"name":"approvedById","kind":"scalar","type":"String"},{"name":"approvedBy","kind":"object","type":"User","relationName":"ApprovedByRelation"},{"name":"adminRemarks","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"leave_requests"},"WorkSchedule":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"startTime","kind":"scalar","type":"String"},{"name":"endTime","kind":"scalar","type":"String"},{"name":"graceMinutes","kind":"scalar","type":"Int"},{"name":"workDays","kind":"scalar","type":"Int"},{"name":"employees","kind":"object","type":"EmployeeProfile","relationName":"EmployeeProfileToWorkSchedule"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"work_schedules"},"Holiday":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"description","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"holidays"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","sessions","employeeProfile","auditLogs","employee","approvedBy","approvedLeaves","accounts","_count","employees","department","positions","position","workSchedule","attendances","leaveRequests","Attendance.findUnique","Attendance.findUniqueOrThrow","Attendance.findFirst","Attendance.findFirstOrThrow","Attendance.findMany","data","Attendance.createOne","Attendance.createMany","Attendance.createManyAndReturn","Attendance.updateOne","Attendance.updateMany","Attendance.updateManyAndReturn","create","update","Attendance.upsertOne","Attendance.deleteOne","Attendance.deleteMany","having","_avg","_sum","_min","_max","Attendance.groupBy","Attendance.aggregate","AuditLog.findUnique","AuditLog.findUniqueOrThrow","AuditLog.findFirst","AuditLog.findFirstOrThrow","AuditLog.findMany","AuditLog.createOne","AuditLog.createMany","AuditLog.createManyAndReturn","AuditLog.updateOne","AuditLog.updateMany","AuditLog.updateManyAndReturn","AuditLog.upsertOne","AuditLog.deleteOne","AuditLog.deleteMany","AuditLog.groupBy","AuditLog.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","Session.findUnique","Session.findUniqueOrThrow","Session.findFirst","Session.findFirstOrThrow","Session.findMany","Session.createOne","Session.createMany","Session.createManyAndReturn","Session.updateOne","Session.updateMany","Session.updateManyAndReturn","Session.upsertOne","Session.deleteOne","Session.deleteMany","Session.groupBy","Session.aggregate","Account.findUnique","Account.findUniqueOrThrow","Account.findFirst","Account.findFirstOrThrow","Account.findMany","Account.createOne","Account.createMany","Account.createManyAndReturn","Account.updateOne","Account.updateMany","Account.updateManyAndReturn","Account.upsertOne","Account.deleteOne","Account.deleteMany","Account.groupBy","Account.aggregate","Verification.findUnique","Verification.findUniqueOrThrow","Verification.findFirst","Verification.findFirstOrThrow","Verification.findMany","Verification.createOne","Verification.createMany","Verification.createManyAndReturn","Verification.updateOne","Verification.updateMany","Verification.updateManyAndReturn","Verification.upsertOne","Verification.deleteOne","Verification.deleteMany","Verification.groupBy","Verification.aggregate","Department.findUnique","Department.findUniqueOrThrow","Department.findFirst","Department.findFirstOrThrow","Department.findMany","Department.createOne","Department.createMany","Department.createManyAndReturn","Department.updateOne","Department.updateMany","Department.updateManyAndReturn","Department.upsertOne","Department.deleteOne","Department.deleteMany","Department.groupBy","Department.aggregate","Position.findUnique","Position.findUniqueOrThrow","Position.findFirst","Position.findFirstOrThrow","Position.findMany","Position.createOne","Position.createMany","Position.createManyAndReturn","Position.updateOne","Position.updateMany","Position.updateManyAndReturn","Position.upsertOne","Position.deleteOne","Position.deleteMany","Position.groupBy","Position.aggregate","EmployeeProfile.findUnique","EmployeeProfile.findUniqueOrThrow","EmployeeProfile.findFirst","EmployeeProfile.findFirstOrThrow","EmployeeProfile.findMany","EmployeeProfile.createOne","EmployeeProfile.createMany","EmployeeProfile.createManyAndReturn","EmployeeProfile.updateOne","EmployeeProfile.updateMany","EmployeeProfile.updateManyAndReturn","EmployeeProfile.upsertOne","EmployeeProfile.deleteOne","EmployeeProfile.deleteMany","EmployeeProfile.groupBy","EmployeeProfile.aggregate","LeaveRequest.findUnique","LeaveRequest.findUniqueOrThrow","LeaveRequest.findFirst","LeaveRequest.findFirstOrThrow","LeaveRequest.findMany","LeaveRequest.createOne","LeaveRequest.createMany","LeaveRequest.createManyAndReturn","LeaveRequest.updateOne","LeaveRequest.updateMany","LeaveRequest.updateManyAndReturn","LeaveRequest.upsertOne","LeaveRequest.deleteOne","LeaveRequest.deleteMany","LeaveRequest.groupBy","LeaveRequest.aggregate","WorkSchedule.findUnique","WorkSchedule.findUniqueOrThrow","WorkSchedule.findFirst","WorkSchedule.findFirstOrThrow","WorkSchedule.findMany","WorkSchedule.createOne","WorkSchedule.createMany","WorkSchedule.createManyAndReturn","WorkSchedule.updateOne","WorkSchedule.updateMany","WorkSchedule.updateManyAndReturn","WorkSchedule.upsertOne","WorkSchedule.deleteOne","WorkSchedule.deleteMany","WorkSchedule.groupBy","WorkSchedule.aggregate","Holiday.findUnique","Holiday.findUniqueOrThrow","Holiday.findFirst","Holiday.findFirstOrThrow","Holiday.findMany","Holiday.createOne","Holiday.createMany","Holiday.createManyAndReturn","Holiday.updateOne","Holiday.updateMany","Holiday.updateManyAndReturn","Holiday.upsertOne","Holiday.deleteOne","Holiday.deleteMany","Holiday.groupBy","Holiday.aggregate","AND","OR","NOT","id","title","date","description","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","contains","startsWith","endsWith","not","name","startTime","endTime","graceMinutes","workDays","has","hasEvery","hasSome","every","some","none","employeeId","LeaveType","leaveType","startDate","endDate","totalDays","reason","LeaveStatus","status","approvedById","adminRemarks","userId","firstName","lastName","phone","Gender","gender","dateOfBirth","joiningDate","departmentId","positionId","EmploymentType","employmentType","workScheduleId","code","identifier","value","expiresAt","accountId","providerId","accessToken","refreshToken","idToken","accessTokenExpiresAt","refreshTokenExpiresAt","scope","password","token","ipAddress","userAgent","email","Role","role","image","isDeleted","deletedAt","bgimage","isActive","emailVerified","passwordResetToken","passwordResetExpires","AuditAction","action","details","checkIn","checkOut","AttendanceStatus","workingHours","overtimeHours","lateMinutes","earlyLeaveMins","checkInIp","checkOutIp","notes","title_departmentId","employeeId_date","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide","push"]'),
  graph: "2wVswAEUBwAAnwMAINsBAACcAwAw3AEAAC4AEN0BAACcAwAw3gEBAAAAAeABQADfAgAh4gFAAN8CACHjAUAA3wIAIfoBAQDeAgAhggIAAJ0DswIisAJAAIwDACGxAkAAjAMAIbMCCACeAwAhtAIIAJ4DACG1AgIA5wIAIbYCAgDnAgAhtwIBAOACACG4AgEA4AIAIbkCAQDgAgAhuwIAALMDACABAAAAAQAgDAMAAKYDACDbAQAAsgMAMNwBAAADABDdAQAAsgMAMN4BAQDeAgAh4gFAAN8CACHjAUAA3wIAIYUCAQDeAgAhlQJAAN8CACGfAgEA3gIAIaACAQDgAgAhoQIBAOACACEDAwAAlwUAIKACAAC0AwAgoQIAALQDACAMAwAApgMAINsBAACyAwAw3AEAAAMAEN0BAACyAwAw3gEBAAAAAeIBQADfAgAh4wFAAN8CACGFAgEA3gIAIZUCQADfAgAhnwIBAAAAAaACAQDgAgAhoQIBAOACACEDAAAAAwAgAQAABAAwAgAABQAgGAMAAKYDACANAACnAwAgDwAAqAMAIBAAAKkDACARAACqAwAgEgAAkAMAINsBAACjAwAw3AEAAAcAEN0BAACjAwAw3gEBAN4CACHiAUAA3wIAIeMBQADfAgAh-gEBAN4CACGFAgEA3gIAIYYCAQDeAgAhhwIBAN4CACGIAgEA4AIAIYoCAACkA4oCI4sCQACMAwAhjAJAAN8CACGNAgEA4AIAIY4CAQDgAgAhkAIAAKUDkAIikQIBAOACACEBAAAABwAgCgMAAK8DACDbAQAAsAMAMNwBAAAJABDdAQAAsAMAMN4BAQDeAgAh4gFAAN8CACGFAgEA4AIAIaACAQDgAgAhrgIAALEDrgIirwIBAN4CACEDAwAAlwUAIIUCAAC0AwAgoAIAALQDACAKAwAArwMAINsBAACwAwAw3AEAAAkAEN0BAACwAwAw3gEBAAAAAeIBQADfAgAhhQIBAOACACGgAgEA4AIAIa4CAACxA64CIq8CAQDeAgAhAwAAAAkAIAEAAAoAMAIAAAsAIBcEAACNAwAgBQAAjgMAIAYAAI8DACAJAACQAwAgCgAAkQMAINsBAACJAwAw3AEAAA0AEN0BAACJAwAw3gEBAN4CACHiAUAA3wIAIeMBQADfAgAh7wEBAN4CACGIAgEA4AIAIaICAQDeAgAhpAIAAIoDpAIipQIBAN4CACGmAiAAiwMAIacCQACMAwAhqAIBAOACACGpAiAAiwMAIaoCIACLAwAhqwIBAOACACGsAkAAjAMAIQEAAAANACARBwAAnwMAIAgAAK8DACDbAQAArAMAMNwBAAAPABDdAQAArAMAMN4BAQDeAgAh4gFAAN8CACHjAUAA3wIAIfoBAQDeAgAh_AEAAK0D_AEi_QFAAN8CACH-AUAA3wIAIf8BAgDnAgAhgAIBAN4CACGCAgAArgOCAiKDAgEA4AIAIYQCAQDgAgAhBAcAAIYFACAIAACXBQAggwIAALQDACCEAgAAtAMAIBEHAACfAwAgCAAArwMAINsBAACsAwAw3AEAAA8AEN0BAACsAwAw3gEBAAAAAeIBQADfAgAh4wFAAN8CACH6AQEA3gIAIfwBAACtA_wBIv0BQADfAgAh_gFAAN8CACH_AQIA5wIAIYACAQDeAgAhggIAAK4DggIigwIBAOACACGEAgEA4AIAIQMAAAAPACABAAAQADACAAARACABAAAADQAgEQMAAKYDACDbAQAAqwMAMNwBAAAUABDdAQAAqwMAMN4BAQDeAgAh4gFAAN8CACHjAUAA3wIAIYUCAQDeAgAhlgIBAN4CACGXAgEA3gIAIZgCAQDgAgAhmQIBAOACACGaAgEA4AIAIZsCQACMAwAhnAJAAIwDACGdAgEA4AIAIZ4CAQDgAgAhCAMAAJcFACCYAgAAtAMAIJkCAAC0AwAgmgIAALQDACCbAgAAtAMAIJwCAAC0AwAgnQIAALQDACCeAgAAtAMAIBEDAACmAwAg2wEAAKsDADDcAQAAFAAQ3QEAAKsDADDeAQEAAAAB4gFAAN8CACHjAUAA3wIAIYUCAQDeAgAhlgIBAN4CACGXAgEA3gIAIZgCAQDgAgAhmQIBAOACACGaAgEA4AIAIZsCQACMAwAhnAJAAIwDACGdAgEA4AIAIZ4CAQDgAgAhAwAAABQAIAEAABUAMAIAABYAIAEAAAADACABAAAACQAgAQAAAA8AIAEAAAAUACALDAAA6AIAIA4AAP0CACDbAQAA_AIAMNwBAAAcABDdAQAA_AIAMN4BAQDeAgAh4QEBAOACACHiAUAA3wIAIeMBQADfAgAh7wEBAN4CACGSAgEA3gIAIQEAAAAcACAMAwAAlwUAIA0AAJYFACAPAACYBQAgEAAAmQUAIBEAAJoFACASAACIBQAgiAIAALQDACCKAgAAtAMAIIsCAAC0AwAgjQIAALQDACCOAgAAtAMAIJECAAC0AwAgGAMAAKYDACANAACnAwAgDwAAqAMAIBAAAKkDACARAACqAwAgEgAAkAMAINsBAACjAwAw3AEAAAcAEN0BAACjAwAw3gEBAAAAAeIBQADfAgAh4wFAAN8CACH6AQEAAAABhQIBAAAAAYYCAQDeAgAhhwIBAN4CACGIAgEA4AIAIYoCAACkA4oCI4sCQACMAwAhjAJAAN8CACGNAgEA4AIAIY4CAQDgAgAhkAIAAKUDkAIikQIBAOACACEDAAAABwAgAQAAHgAwAgAAHwAgCgwAAOgCACANAACiAwAg2wEAAKEDADDcAQAAIQAQ3QEAAKEDADDeAQEA3gIAId8BAQDeAgAh4gFAAN8CACHjAUAA3wIAIY0CAQDeAgAhAgwAAPwDACANAACWBQAgCwwAAOgCACANAACiAwAg2wEAAKEDADDcAQAAIQAQ3QEAAKEDADDeAQEAAAAB3wEBAN4CACHiAUAA3wIAIeMBQADfAgAhjQIBAN4CACG6AgAAoAMAIAMAAAAhACABAAAiADACAAAjACADAAAABwAgAQAAHgAwAgAAHwAgAQAAAAcAIAEAAAAHACABAAAAIQAgAQAAACEAIAwMAADoAgAg2wEAAOYCADDcAQAAKgAQ3QEAAOYCADDeAQEA3gIAIeIBQADfAgAh4wFAAN8CACHvAQEA3gIAIfABAQDeAgAh8QEBAN4CACHyAQIA5wIAIfMBAADjAgAgAQAAACoAIAMAAAAHACABAAAeADACAAAfACABAAAABwAgEwcAAJ8DACDbAQAAnAMAMNwBAAAuABDdAQAAnAMAMN4BAQDeAgAh4AFAAN8CACHiAUAA3wIAIeMBQADfAgAh-gEBAN4CACGCAgAAnQOzAiKwAkAAjAMAIbECQACMAwAhswIIAJ4DACG0AggAngMAIbUCAgDnAgAhtgICAOcCACG3AgEA4AIAIbgCAQDgAgAhuQIBAOACACEGBwAAhgUAILACAAC0AwAgsQIAALQDACC3AgAAtAMAILgCAAC0AwAguQIAALQDACADAAAALgAgAQAALwAwAgAAAQAgAwAAAA8AIAEAABAAMAIAABEAIAEAAAAuACABAAAADwAgAQAAAAEAIAMAAAAuACABAAAvADACAAABACADAAAALgAgAQAALwAwAgAAAQAgAwAAAC4AIAEAAC8AMAIAAAEAIBAHAACVBQAg3gEBAAAAAeABQAAAAAHiAUAAAAAB4wFAAAAAAfoBAQAAAAGCAgAAALMCArACQAAAAAGxAkAAAAABswIIAAAAAbQCCAAAAAG1AgIAAAABtgICAAAAAbcCAQAAAAG4AgEAAAABuQIBAAAAAQEYAAA4ACAP3gEBAAAAAeABQAAAAAHiAUAAAAAB4wFAAAAAAfoBAQAAAAGCAgAAALMCArACQAAAAAGxAkAAAAABswIIAAAAAbQCCAAAAAG1AgIAAAABtgICAAAAAbcCAQAAAAG4AgEAAAABuQIBAAAAAQEYAAA6ADABGAAAOgAwEAcAAJQFACDeAQEAuAMAIeABQAC5AwAh4gFAALkDACHjAUAAuQMAIfoBAQC4AwAhggIAAPADswIisAJAAM4DACGxAkAAzgMAIbMCCADxAwAhtAIIAPEDACG1AgIAwAMAIbYCAgDAAwAhtwIBALoDACG4AgEAugMAIbkCAQC6AwAhAgAAAAEAIBgAAD0AIA_eAQEAuAMAIeABQAC5AwAh4gFAALkDACHjAUAAuQMAIfoBAQC4AwAhggIAAPADswIisAJAAM4DACGxAkAAzgMAIbMCCADxAwAhtAIIAPEDACG1AgIAwAMAIbYCAgDAAwAhtwIBALoDACG4AgEAugMAIbkCAQC6AwAhAgAAAC4AIBgAAD8AIAIAAAAuACAYAAA_ACADAAAAAQAgHwAAOAAgIAAAPQAgAQAAAAEAIAEAAAAuACAKCwAAjwUAICUAAJAFACAmAACTBQAgJwAAkgUAICgAAJEFACCwAgAAtAMAILECAAC0AwAgtwIAALQDACC4AgAAtAMAILkCAAC0AwAgEtsBAACWAwAw3AEAAEYAEN0BAACWAwAw3gEBANICACHgAUAA0wIAIeIBQADTAgAh4wFAANMCACH6AQEA0gIAIYICAACXA7MCIrACQADyAgAhsQJAAPICACGzAggAmAMAIbQCCACYAwAhtQICAOICACG2AgIA4gIAIbcCAQDUAgAhuAIBANQCACG5AgEA1AIAIQMAAAAuACABAABFADAkAABGACADAAAALgAgAQAALwAwAgAAAQAgAQAAAAsAIAEAAAALACADAAAACQAgAQAACgAwAgAACwAgAwAAAAkAIAEAAAoAMAIAAAsAIAMAAAAJACABAAAKADACAAALACAHAwAAjgUAIN4BAQAAAAHiAUAAAAABhQIBAAAAAaACAQAAAAGuAgAAAK4CAq8CAQAAAAEBGAAATgAgBt4BAQAAAAHiAUAAAAABhQIBAAAAAaACAQAAAAGuAgAAAK4CAq8CAQAAAAEBGAAAUAAwARgAAFAAMAEAAAANACAHAwAAjQUAIN4BAQC4AwAh4gFAALkDACGFAgEAugMAIaACAQC6AwAhrgIAAOwErgIirwIBALgDACECAAAACwAgGAAAVAAgBt4BAQC4AwAh4gFAALkDACGFAgEAugMAIaACAQC6AwAhrgIAAOwErgIirwIBALgDACECAAAACQAgGAAAVgAgAgAAAAkAIBgAAFYAIAEAAAANACADAAAACwAgHwAATgAgIAAAVAAgAQAAAAsAIAEAAAAJACAFCwAAigUAICcAAIwFACAoAACLBQAghQIAALQDACCgAgAAtAMAIAnbAQAAkgMAMNwBAABeABDdAQAAkgMAMN4BAQDSAgAh4gFAANMCACGFAgEA1AIAIaACAQDUAgAhrgIAAJMDrgIirwIBANICACEDAAAACQAgAQAAXQAwJAAAXgAgAwAAAAkAIAEAAAoAMAIAAAsAIBcEAACNAwAgBQAAjgMAIAYAAI8DACAJAACQAwAgCgAAkQMAINsBAACJAwAw3AEAAA0AEN0BAACJAwAw3gEBAAAAAeIBQADfAgAh4wFAAN8CACHvAQEA3gIAIYgCAQDgAgAhogIBAAAAAaQCAACKA6QCIqUCAQDeAgAhpgIgAIsDACGnAkAAjAMAIagCAQDgAgAhqQIgAIsDACGqAiAAiwMAIasCAQDgAgAhrAJAAIwDACEBAAAAYQAgAQAAAGEAIAoEAACFBQAgBQAAhgUAIAYAAIcFACAJAACIBQAgCgAAiQUAIIgCAAC0AwAgpwIAALQDACCoAgAAtAMAIKsCAAC0AwAgrAIAALQDACADAAAADQAgAQAAZAAwAgAAYQAgAwAAAA0AIAEAAGQAMAIAAGEAIAMAAAANACABAABkADACAABhACAUBAAAgAUAIAUAAIEFACAGAACCBQAgCQAAgwUAIAoAAIQFACDeAQEAAAAB4gFAAAAAAeMBQAAAAAHvAQEAAAABiAIBAAAAAaICAQAAAAGkAgAAAKQCAqUCAQAAAAGmAiAAAAABpwJAAAAAAagCAQAAAAGpAiAAAAABqgIgAAAAAasCAQAAAAGsAkAAAAABARgAAGgAIA_eAQEAAAAB4gFAAAAAAeMBQAAAAAHvAQEAAAABiAIBAAAAAaICAQAAAAGkAgAAAKQCAqUCAQAAAAGmAiAAAAABpwJAAAAAAagCAQAAAAGpAiAAAAABqgIgAAAAAasCAQAAAAGsAkAAAAABARgAAGoAMAEYAABqADAUBAAAyAQAIAUAAMkEACAGAADKBAAgCQAAywQAIAoAAMwEACDeAQEAuAMAIeIBQAC5AwAh4wFAALkDACHvAQEAuAMAIYgCAQC6AwAhogIBALgDACGkAgAAxgSkAiKlAgEAuAMAIaYCIADHBAAhpwJAAM4DACGoAgEAugMAIakCIADHBAAhqgIgAMcEACGrAgEAugMAIawCQADOAwAhAgAAAGEAIBgAAG0AIA_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_wIAMNwBAACoAQAQ3QEAAP8CADDeAQEAAAAB4gFAAN8CACHjAUAA3wIAIZMCAQDeAgAhlAIBAN4CACGVAkAA3wIAIQEAAAClAQAgAQAAAKUBACAJ2wEAAP8CADDcAQAAqAEAEN0BAAD_AgAw3gEBAN4CACHiAUAA3wIAIeMBQADfAgAhkwIBAN4CACGUAgEA3gIAIZUCQADfAgAhAAMAAACoAQAgAQAAqQEAMAIAAKUBACADAAAAqAEAIAEAAKkBADACAAClAQAgAwAAAKgBACABAACpAQAwAgAApQEAIAbeAQEAAAAB4gFAAAAAAeMBQAAAAAGTAgEAAAABlAIBAAAAAZUCQAAAAAEBGAAArQEAIAbeAQEAAAAB4gFAAAAAAeMBQAAAAAGTAgEAAAABlAIBAAAAAZUCQAAAAAEBGAAArwEAMAEYAACvAQAwBt4BAQC4AwAh4gFAALkDACHjAUAAuQMAIZMCAQC4AwAhlAIBALgDACGVAkAAuQMAIQIAAAClAQAgGAAAsgEAIAbeAQEAuAMAIeIBQAC5AwAh4wFAALkDACGTAgEAuAMAIZQCAQC4AwAhlQJAALkDACECAAAAqAEAIBgAALQBACACAAAAqAEAIBgAALQBACADAAAApQEAIB8AAK0BACAgAACyAQAgAQAAAKUBACABAAAAqAEAIAMLAAC2BAAgJwAAuAQAICgAALcEACAJ2wEAAP4CADDcAQAAuwEAEN0BAAD-AgAw3gEBANICACHiAUAA0wIAIeMBQADTAgAhkwIBANICACGUAgEA0gIAIZUCQADTAgAhAwAAAKgBACABAAC6AQAwJAAAuwEAIAMAAACoAQAgAQAAqQEAMAIAAKUBACALDAAA6AIAIA4AAP0CACDbAQAA_AIAMNwBAAAcABDdAQAA_AIAMN4BAQAAAAHhAQEA4AIAIeIBQADfAgAh4wFAAN8CACHvAQEAAAABkgIBAAAAAQEAAAC-AQAgAQAAAL4BACADDAAA_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-gEBAAAAAfwBAAAA_AEC_QFAAAAAAf4BQAAAAAH_AQIAAAABgAIBAAAAAYICAAAAggICgwIBAAAAAYQCAQAAAAEBGAAAjQIAIAzeAQEAAAAB4gFAAAAAAeMBQAAAAAH6AQEAAAAB_AEAAAD8AQL9AUAAAAAB_gFAAAAAAf8BAgAAAAGAAgEAAAABggIAAACCAgKDAgEAAAABhAIBAAAAAQEYAACPAgAwARgAAI8CADABAAAADQAgDgcAAIIEACAIAADjAwAg3gEBALgDACHiAUAAuQMAIeMBQAC5AwAh-gEBALgDACH8AQAA4AP8ASL9AUAAuQMAIf4BQAC5AwAh_wECAMADACGAAgEAuAMAIYICAADhA4ICIoMCAQC6AwAhhAIBALoDACECAAAAEQAgGAAAkwIAIAzeAQEAuAMAIeIBQAC5AwAh4wFAALkDACH6AQEAuAMAIfwBAADgA_wBIv0BQAC5AwAh_gFAALkDACH_AQIAwAMAIYACAQC4AwAhggIAAOEDggIigwIBALoDACGEAgEAugMAIQIAAAAPACAYAACVAgAgAgAAAA8AIBgAAJUCACABAAAADQAgAwAAABEAIB8AAI0CACAgAACTAgAgAQAAABEAIAEAAAAPACAHCwAA_QMAICUAAP4DACAmAACBBAAgJwAAgAQAICgAAP8DACCDAgAAtAMAIIQCAAC0AwAgD9sBAADpAgAw3AEAAJ0CABDdAQAA6QIAMN4BAQDSAgAh4gFAANMCACHjAUAA0wIAIfoBAQDSAgAh_AEAAOoC_AEi_QFAANMCACH-AUAA0wIAIf8BAgDiAgAhgAIBANICACGCAgAA6wKCAiKDAgEA1AIAIYQCAQDUAgAhAwAAAA8AIAEAAJwCADAkAACdAgAgAwAAAA8AIAEAABAAMAIAABEAIAwMAADoAgAg2wEAAOYCADDcAQAAKgAQ3QEAAOYCADDeAQEAAAAB4gFAAN8CACHjAUAA3wIAIe8BAQAAAAHwAQEA3gIAIfEBAQDeAgAh8gECAOcCACHzAQAA4wIAIAEAAACgAgAgAQAAAKACACABDAAA_AMAIAMAAAAqACABAACjAgAwAgAAoAIAIAMAAAAqACABAACjAgAwAgAAoAIAIAMAAAAqACABAACjAgAwAgAAoAIAIAkMAAD7AwAg3gEBAAAAAeIBQAAAAAHjAUAAAAAB7wEBAAAAAfABAQAAAAHxAQEAAAAB8gECAAAAAfMBAAD6AwAgARgAAKcCACAI3gEBAAAAAeIBQAAAAAHjAUAAAAAB7wEBAAAAAfABAQAAAAHxAQEAAAAB8gECAAAAAfMBAAD6AwAgARgAAKkCADABGAAAqQIAMAkMAADCAwAg3gEBALgDACHiAUAAuQMAIeMBQAC5AwAh7wEBALgDACHwAQEAuAMAIfEBAQC4AwAh8gECAMADACHzAQAAwQMAIAIAAACgAgAgGAAArAIAIAjeAQEAuAMAIeIBQAC5AwAh4wFAALkDACHvAQEAuAMAIfABAQC4AwAh8QEBALgDACHyAQIAwAMAIfMBAADBAwAgAgAAACoAIBgAAK4CACACAAAAKgAgGAAArgIAIAMAAACgAgAgHwAApwIAICAAAKwCACABAAAAoAIAIAEAAAAqACAFCwAAuwMAICUAALwDACAmAAC_AwAgJwAAvgMAICgAAL0DACAL2wEAAOECADDcAQAAtQIAEN0BAADhAgAw3gEBANICACHiAUAA0wIAIeMBQADTAgAh7wEBANICACHwAQEA0gIAIfEBAQDSAgAh8gECAOICACHzAQAA4wIAIAMAAAAqACABAAC0AgAwJAAAtQIAIAMAAAAqACABAACjAgAwAgAAoAIAIAnbAQAA3QIAMNwBAAC7AgAQ3QEAAN0CADDeAQEAAAAB3wEBAN4CACHgAUAAAAAB4QEBAOACACHiAUAA3wIAIeMBQADfAgAhAQAAALgCACABAAAAuAIAIAnbAQAA3QIAMNwBAAC7AgAQ3QEAAN0CADDeAQEA3gIAId8BAQDeAgAh4AFAAN8CACHhAQEA4AIAIeIBQADfAgAh4wFAAN8CACEB4QEAALQDACADAAAAuwIAIAEAALwCADACAAC4AgAgAwAAALsCACABAAC8AgAwAgAAuAIAIAMAAAC7AgAgAQAAvAIAMAIAALgCACAG3gEBAAAAAd8BAQAAAAHgAUAAAAAB4QEBAAAAAeIBQAAAAAHjAUAAAAABARgAAMACACAG3gEBAAAAAd8BAQAAAAHgAUAAAAAB4QEBAAAAAeIBQAAAAAHjAUAAAAABARgAAMICADABGAAAwgIAMAbeAQEAuAMAId8BAQC4AwAh4AFAALkDACHhAQEAugMAIeIBQAC5AwAh4wFAALkDACECAAAAuAIAIBgAAMUCACAG3gEBALgDACHfAQEAuAMAIeABQAC5AwAh4QEBALoDACHiAUAAuQMAIeMBQAC5AwAhAgAAALsCACAYAADHAgAgAgAAALsCACAYAADHAgAgAwAAALgCACAfAADAAgAgIAAAxQIAIAEAAAC4AgAgAQAAALsCACAECwAAtQMAICcAALcDACAoAAC2AwAg4QEAALQDACAJ2wEAANECADDcAQAAzgIAEN0BAADRAgAw3gEBANICACHfAQEA0gIAIeABQADTAgAh4QEBANQCACHiAUAA0wIAIeMBQADTAgAhAwAAALsCACABAADNAgAwJAAAzgIAIAMAAAC7AgAgAQAAvAIAMAIAALgCACAJ2wEAANECADDcAQAAzgIAEN0BAADRAgAw3gEBANICACHfAQEA0gIAIeABQADTAgAh4QEBANQCACHiAUAA0wIAIeMBQADTAgAhDgsAANkC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_AEAAOoC_AEi_QFAANMCACH-AUAA0wIAIf8BAgDiAgAhgAIBANICACGCAgAA6wKCAiKDAgEA1AIAIYQCAQDUAgAhBwsAANkCACAnAADvAgAgKAAA7wIAIOQBAAAA_AEC5QEAAAD8AQjmAQAAAPwBCO4BAADuAvwBIgcLAADZAgAgJwAA7QIAICgAAO0CACDkAQAAAIICAuUBAAAAggII5gEAAACCAgjuAQAA7AKCAiIHCwAA2QIAICcAAO0CACAoAADtAgAg5AEAAACCAgLlAQAAAIICCOYBAAAAggII7gEAAOwCggIiBOQBAAAAggIC5QEAAACCAgjmAQAAAIICCO4BAADtAoICIgcLAADZAgAgJwAA7wIAICgAAO8CACDkAQAAAPwBAuUBAAAA_AEI5gEAAAD8AQjuAQAA7gL8ASIE5AEAAAD8AQLlAQAAAPwBCOYBAAAA_AEI7gEAAO8C_AEiEtsBAADwAgAw3AEAAIUCABDdAQAA8AIAMN4BAQDSAgAh4gFAANMCACHjAUAA0wIAIfoBAQDSAgAhhQIBANICACGGAgEA0gIAIYcCAQDSAgAhiAIBANQCACGKAgAA8QKKAiOLAkAA8gIAIYwCQADTAgAhjQIBANQCACGOAgEA1AIAIZACAADzApACIpECAQDUAgAhBwsAANYCACAnAAD5AgAgKAAA-QIAIOQBAAAAigID5QEAAACKAgnmAQAAAIoCCe4BAAD4AooCIwsLAADWAgAgJwAA9wIAICgAAPcCACDkAUAAAAAB5QFAAAAABeYBQAAAAAXnAUAAAAAB6AFAAAAAAekBQAAAAAHqAUAAAAAB7gFAAPYCACEHCwAA2QIAICcAAPUCACAoAAD1AgAg5AEAAACQAgLlAQAAAJACCOYBAAAAkAII7gEAAPQCkAIiBwsAANkCACAnAAD1AgAgKAAA9QIAIOQBAAAAkAIC5QEAAACQAgjmAQAAAJACCO4BAAD0ApACIgTkAQAAAJACAuUBAAAAkAII5gEAAACQAgjuAQAA9QKQAiILCwAA1gIAICcAAPcCACAoAAD3AgAg5AFAAAAAAeUBQAAAAAXmAUAAAAAF5wFAAAAAAegBQAAAAAHpAUAAAAAB6gFAAAAAAe4BQAD2AgAhCOQBQAAAAAHlAUAAAAAF5gFAAAAABecBQAAAAAHoAUAAAAAB6QFAAAAAAeoBQAAAAAHuAUAA9wIAIQcLAADWAgAgJwAA-QIAICgAAPkCACDkAQAAAIoCA-UBAAAAigIJ5gEAAACKAgnuAQAA-AKKAiME5AEAAACKAgPlAQAAAIoCCeYBAAAAigIJ7gEAAPkCigIjCNsBAAD6AgAw3AEAAOkBABDdAQAA-gIAMN4BAQDSAgAh3wEBANICACHiAUAA0wIAIeMBQADTAgAhjQIBANICACEJ2wEAAPsCADDcAQAA0wEAEN0BAAD7AgAw3gEBANICACHhAQEA1AIAIeIBQADTAgAh4wFAANMCACHvAQEA0gIAIZICAQDSAgAhCwwAAOgCACAOAAD9AgAg2wEAAPwCADDcAQAAHAAQ3QEAAPwCADDeAQEA3gIAIeEBAQDgAgAh4gFAAN8CACHjAUAA3wIAIe8BAQDeAgAhkgIBAN4CACED9wEAACEAIPgBAAAhACD5AQAAIQAgCdsBAAD-AgAw3AEAALsBABDdAQAA_gIAMN4BAQDSAgAh4gFAANMCACHjAUAA0wIAIZMCAQDSAgAhlAIBANICACGVAkAA0wIAIQnbAQAA_wIAMNwBAACoAQAQ3QEAAP8CADDeAQEA3gIAIeIBQADfAgAh4wFAAN8CACGTAgEA3gIAIZQCAQDeAgAhlQJAAN8CACEQ2wEAAIADADDcAQAAogEAEN0BAACAAwAw3gEBANICACHiAUAA0wIAIeMBQADTAgAhhQIBANICACGWAgEA0gIAIZcCAQDSAgAhmAIBANQCACGZAgEA1AIAIZoCAQDUAgAhmwJAAPICACGcAkAA8gIAIZ0CAQDUAgAhngIBANQCACEL2wEAAIEDADDcAQAAjAEAEN0BAACBAwAw3gEBANICACHiAUAA0wIAIeMBQADTAgAhhQIBANICACGVAkAA0wIAIZ8CAQDSAgAhoAIBANQCACGhAgEA1AIAIRLbAQAAggMAMNwBAAB2ABDdAQAAggMAMN4BAQDSAgAh4gFAANMCACHjAUAA0wIAIe8BAQDSAgAhiAIBANQCACGiAgEA0gIAIaQCAACDA6QCIqUCAQDSAgAhpgIgAIQDACGnAkAA8gIAIagCAQDUAgAhqQIgAIQDACGqAiAAhAMAIasCAQDUAgAhrAJAAPICACEHCwAA2QIAICcAAIgDACAoAACIAwAg5AEAAACkAgLlAQAAAKQCCOYBAAAApAII7gEAAIcDpAIiBQsAANkCACAnAACGAwAgKAAAhgMAIOQBIAAAAAHuASAAhQMAIQULAADZAgAgJwAAhgMAICgAAIYDACDkASAAAAAB7gEgAIUDACEC5AEgAAAAAe4BIACGAwAhBwsAANkCACAnAACIAwAgKAAAiAMAIOQBAAAApAIC5QEAAACkAgjmAQAAAKQCCO4BAACHA6QCIgTkAQAAAKQCAuUBAAAApAII5gEAAACkAgjuAQAAiAOkAiIXBAAAjQMAIAUAAI4DACAGAACPAwAgCQAAkAMAIAoAAJEDACDbAQAAiQMAMNwBAAANABDdAQAAiQMAMN4BAQDeAgAh4gFAAN8CACHjAUAA3wIAIe8BAQDeAgAhiAIBAOACACGiAgEA3gIAIaQCAACKA6QCIqUCAQDeAgAhpgIgAIsDACGnAkAAjAMAIagCAQDgAgAhqQIgAIsDACGqAiAAiwMAIasCAQDgAgAhrAJAAIwDACEE5AEAAACkAgLlAQAAAKQCCOYBAAAApAII7gEAAIgDpAIiAuQBIAAAAAHuASAAhgMAIQjkAUAAAAAB5QFAAAAABeYBQAAAAAXnAUAAAAAB6AFAAAAAAekBQAAAAAHqAUAAAAAB7gFAAPcCACED9wEAAAMAIPgBAAADACD5AQAAAwAgGgMAAKYDACANAACnAwAgDwAAqAMAIBAAAKkDACARAACqAwAgEgAAkAMAINsBAACjAwAw3AEAAAcAEN0BAACjAwAw3gEBAN4CACHiAUAA3wIAIeMBQADfAgAh-gEBAN4CACGFAgEA3gIAIYYCAQDeAgAhhwIBAN4CACGIAgEA4AIAIYoCAACkA4oCI4sCQACMAwAhjAJAAN8CACGNAgEA4AIAIY4CAQDgAgAhkAIAAKUDkAIikQIBAOACACG8AgAABwAgvQIAAAcAIAP3AQAACQAg-AEAAAkAIPkBAAAJACAD9wEAAA8AIPgBAAAPACD5AQAADwAgA_cBAAAUACD4AQAAFAAg-QEAABQAIAnbAQAAkgMAMNwBAABeABDdAQAAkgMAMN4BAQDSAgAh4gFAANMCACGFAgEA1AIAIaACAQDUAgAhrgIAAJMDrgIirwIBANICACEHCwAA2QIAICcAAJUDACAoAACVAwAg5AEAAACuAgLlAQAAAK4CCOYBAAAArgII7gEAAJQDrgIiBwsAANkCACAnAACVAwAgKAAAlQMAIOQBAAAArgIC5QEAAACuAgjmAQAAAK4CCO4BAACUA64CIgTkAQAAAK4CAuUBAAAArgII5gEAAACuAgjuAQAAlQOuAiIS2wEAAJYDADDcAQAARgAQ3QEAAJYDADDeAQEA0gIAIeABQADTAgAh4gFAANMCACHjAUAA0wIAIfoBAQDSAgAhggIAAJcDswIisAJAAPICACGxAkAA8gIAIbMCCACYAwAhtAIIAJgDACG1AgIA4gIAIbYCAgDiAgAhtwIBANQCACG4AgEA1AIAIbkCAQDUAgAhBwsAANkCACAnAACbAwAgKAAAmwMAIOQBAAAAswIC5QEAAACzAgjmAQAAALMCCO4BAACaA7MCIg0LAADZAgAgJQAA5QIAICYAAOUCACAnAADlAgAgKAAA5QIAIOQBCAAAAAHlAQgAAAAE5gEIAAAABOcBCAAAAAHoAQgAAAAB6QEIAAAAAeoBCAAAAAHuAQgAmQMAIQ0LAADZAgAgJQAA5QIAICYAAOUCACAnAADlAgAgKAAA5QIAIOQBCAAAAAHlAQgAAAAE5gEIAAAABOcBCAAAAAHoAQgAAAAB6QEIAAAAAeoBCAAAAAHuAQgAmQMAIQcLAADZAgAgJwAAmwMAICgAAJsDACDkAQAAALMCAuUBAAAAswII5gEAAACzAgjuAQAAmgOzAiIE5AEAAACzAgLlAQAAALMCCOYBAAAAswII7gEAAJsDswIiEwcAAJ8DACDbAQAAnAMAMNwBAAAuABDdAQAAnAMAMN4BAQDeAgAh4AFAAN8CACHiAUAA3wIAIeMBQADfAgAh-gEBAN4CACGCAgAAnQOzAiKwAkAAjAMAIbECQACMAwAhswIIAJ4DACG0AggAngMAIbUCAgDnAgAhtgICAOcCACG3AgEA4AIAIbgCAQDgAgAhuQIBAOACACEE5AEAAACzAgLlAQAAALMCCOYBAAAAswII7gEAAJsDswIiCOQBCAAAAAHlAQgAAAAE5gEIAAAABOcBCAAAAAHoAQgAAAAB6QEIAAAAAeoBCAAAAAHuAQgA5QIAIRoDAACmAwAgDQAApwMAIA8AAKgDACAQAACpAwAgEQAAqgMAIBIAAJADACDbAQAAowMAMNwBAAAHABDdAQAAowMAMN4BAQDeAgAh4gFAAN8CACHjAUAA3wIAIfoBAQDeAgAhhQIBAN4CACGGAgEA3gIAIYcCAQDeAgAhiAIBAOACACGKAgAApAOKAiOLAkAAjAMAIYwCQADfAgAhjQIBAOACACGOAgEA4AIAIZACAAClA5ACIpECAQDgAgAhvAIAAAcAIL0CAAAHACAC3wEBAAAAAY0CAQAAAAEKDAAA6AIAIA0AAKIDACDbAQAAoQMAMNwBAAAhABDdAQAAoQMAMN4BAQDeAgAh3wEBAN4CACHiAUAA3wIAIeMBQADfAgAhjQIBAN4CACENDAAA6AIAIA4AAP0CACDbAQAA_AIAMNwBAAAcABDdAQAA_AIAMN4BAQDeAgAh4QEBAOACACHiAUAA3wIAIeMBQADfAgAh7wEBAN4CACGSAgEA3gIAIbwCAAAcACC9AgAAHAAgGAMAAKYDACANAACnAwAgDwAAqAMAIBAAAKkDACARAACqAwAgEgAAkAMAINsBAACjAwAw3AEAAAcAEN0BAACjAwAw3gEBAN4CACHiAUAA3wIAIeMBQADfAgAh-gEBAN4CACGFAgEA3gIAIYYCAQDeAgAhhwIBAN4CACGIAgEA4AIAIYoCAACkA4oCI4sCQACMAwAhjAJAAN8CACGNAgEA4AIAIY4CAQDgAgAhkAIAAKUDkAIikQIBAOACACEE5AEAAACKAgPlAQAAAIoCCeYBAAAAigIJ7gEAAPkCigIjBOQBAAAAkAIC5QEAAACQAgjmAQAAAJACCO4BAAD1ApACIhkEAACNAwAgBQAAjgMAIAYAAI8DACAJAACQAwAgCgAAkQMAINsBAACJAwAw3AEAAA0AEN0BAACJAwAw3gEBAN4CACHiAUAA3wIAIeMBQADfAgAh7wEBAN4CACGIAgEA4AIAIaICAQDeAgAhpAIAAIoDpAIipQIBAN4CACGmAiAAiwMAIacCQACMAwAhqAIBAOACACGpAiAAiwMAIaoCIACLAwAhqwIBAOACACGsAkAAjAMAIbwCAAANACC9AgAADQAgDQwAAOgCACAOAAD9AgAg2wEAAPwCADDcAQAAHAAQ3QEAAPwCADDeAQEA3gIAIeEBAQDgAgAh4gFAAN8CACHjAUAA3wIAIe8BAQDeAgAhkgIBAN4CACG8AgAAHAAgvQIAABwAIAwMAADoAgAgDQAAogMAINsBAAChAwAw3AEAACEAEN0BAAChAwAw3gEBAN4CACHfAQEA3gIAIeIBQADfAgAh4wFAAN8CACGNAgEA3gIAIbwCAAAhACC9AgAAIQAgDgwAAOgCACDbAQAA5gIAMNwBAAAqABDdAQAA5gIAMN4BAQDeAgAh4gFAAN8CACHjAUAA3wIAIe8BAQDeAgAh8AEBAN4CACHxAQEA3gIAIfIBAgDnAgAh8wEAAOMCACC8AgAAKgAgvQIAACoAIAP3AQAALgAg-AEAAC4AIPkBAAAuACARAwAApgMAINsBAACrAwAw3AEAABQAEN0BAACrAwAw3gEBAN4CACHiAUAA3wIAIeMBQADfAgAhhQIBAN4CACGWAgEA3gIAIZcCAQDeAgAhmAIBAOACACGZAgEA4AIAIZoCAQDgAgAhmwJAAIwDACGcAkAAjAMAIZ0CAQDgAgAhngIBAOACACERBwAAnwMAIAgAAK8DACDbAQAArAMAMNwBAAAPABDdAQAArAMAMN4BAQDeAgAh4gFAAN8CACHjAUAA3wIAIfoBAQDeAgAh_AEAAK0D_AEi_QFAAN8CACH-AUAA3wIAIf8BAgDnAgAhgAIBAN4CACGCAgAArgOCAiKDAgEA4AIAIYQCAQDgAgAhBOQBAAAA_AEC5QEAAAD8AQjmAQAAAPwBCO4BAADvAvwBIgTkAQAAAIICAuUBAAAAggII5gEAAACCAgjuAQAA7QKCAiIZBAAAjQMAIAUAAI4DACAGAACPAwAgCQAAkAMAIAoAAJEDACDbAQAAiQMAMNwBAAANABDdAQAAiQMAMN4BAQDeAgAh4gFAAN8CACHjAUAA3wIAIe8BAQDeAgAhiAIBAOACACGiAgEA3gIAIaQCAACKA6QCIqUCAQDeAgAhpgIgAIsDACGnAkAAjAMAIagCAQDgAgAhqQIgAIsDACGqAiAAiwMAIasCAQDgAgAhrAJAAIwDACG8AgAADQAgvQIAAA0AIAoDAACvAwAg2wEAALADADDcAQAACQAQ3QEAALADADDeAQEA3gIAIeIBQADfAgAhhQIBAOACACGgAgEA4AIAIa4CAACxA64CIq8CAQDeAgAhBOQBAAAArgIC5QEAAACuAgjmAQAAAK4CCO4BAACVA64CIgwDAACmAwAg2wEAALIDADDcAQAAAwAQ3QEAALIDADDeAQEA3gIAIeIBQADfAgAh4wFAAN8CACGFAgEA3gIAIZUCQADfAgAhnwIBAN4CACGgAgEA4AIAIaECAQDgAgAhAuABQAAAAAH6AQEAAAABAAAAAAHBAgEAAAABAcECQAAAAAEBwQIBAAAAAQAAAAAABcECAgAAAAHHAgIAAAAByAICAAAAAckCAgAAAAHKAgIAAAABAsECAgAAAATLAgIAAAAFCx8AAMMDADAgAADIAwAwvgIAAMQDADC_AgAAxQMAMMACAADGAwAgwQIAAMcDADDCAgAAxwMAMMMCAADHAwAwxAIAAMcDADDFAgAAyQMAMMYCAADKAwAwEwMAAPUDACANAAD2AwAgDwAA9wMAIBEAAPgDACASAAD5AwAg3gEBAAAAAeIBQAAAAAHjAUAAAAAB-gEBAAAAAYUCAQAAAAGGAgEAAAABhwIBAAAAAYgCAQAAAAGKAgAAAIoCA4sCQAAAAAGMAkAAAAABjQIBAAAAAY4CAQAAAAGQAgAAAJACAgIAAAAfACAfAAD0AwAgAwAAAB8AIB8AAPQDACAgAADQAwAgARgAANsFADAYAwAApgMAIA0AAKcDACAPAACoAwAgEAAAqQMAIBEAAKoDACASAACQAwAg2wEAAKMDADDcAQAABwAQ3QEAAKMDADDeAQEAAAAB4gFAAN8CACHjAUAA3wIAIfoBAQAAAAGFAgEAAAABhgIBAN4CACGHAgEA3gIAIYgCAQDgAgAhigIAAKQDigIjiwJAAIwDACGMAkAA3wIAIY0CAQDgAgAhjgIBAOACACGQAgAApQOQAiKRAgEA4AIAIQIAAAAfACAYAADQAwAgAgAAAMsDACAYAADMAwAgEtsBAADKAwAw3AEAAMsDABDdAQAAygMAMN4BAQDeAgAh4gFAAN8CACHjAUAA3wIAIfoBAQDeAgAhhQIBAN4CACGGAgEA3gIAIYcCAQDeAgAhiAIBAOACACGKAgAApAOKAiOLAkAAjAMAIYwCQADfAgAhjQIBAOACACGOAgEA4AIAIZACAAClA5ACIpECAQDgAgAhEtsBAADKAwAw3AEAAMsDABDdAQAAygMAMN4BAQDeAgAh4gFAAN8CACHjAUAA3wIAIfoBAQDeAgAhhQIBAN4CACGGAgEA3gIAIYcCAQDeAgAhiAIBAOACACGKAgAApAOKAiOLAkAAjAMAIYwCQADfAgAhjQIBAOACACGOAgEA4AIAIZACAAClA5ACIpECAQDgAgAhDt4BAQC4AwAh4gFAALkDACHjAUAAuQMAIfoBAQC4AwAhhQIBALgDACGGAgEAuAMAIYcCAQC4AwAhiAIBALoDACGKAgAAzQOKAiOLAkAAzgMAIYwCQAC5AwAhjQIBALoDACGOAgEAugMAIZACAADPA5ACIgHBAgAAAIoCAwHBAkAAAAABAcECAAAAkAICEwMAANEDACANAADSAwAgDwAA0wMAIBEAANQDACASAADVAwAg3gEBALgDACHiAUAAuQMAIeMBQAC5AwAh-gEBALgDACGFAgEAuAMAIYYCAQC4AwAhhwIBALgDACGIAgEAugMAIYoCAADNA4oCI4sCQADOAwAhjAJAALkDACGNAgEAugMAIY4CAQC6AwAhkAIAAM8DkAIiBR8AAMkFACAgAADZBQAgvgIAAMoFACC_AgAA2AUAIMQCAABhACAHHwAAxwUAICAAANYFACC-AgAAyAUAIL8CAADVBQAgwgIAABwAIMMCAAAcACDEAgAAvgEAIAcfAADFBQAgIAAA0wUAIL4CAADGBQAgvwIAANIFACDCAgAAIQAgwwIAACEAIMQCAAAjACALHwAA5gMAMCAAAOsDADC-AgAA5wMAML8CAADoAwAwwAIAAOkDACDBAgAA6gMAMMICAADqAwAwwwIAAOoDADDEAgAA6gMAMMUCAADsAwAwxgIAAO0DADALHwAA1gMAMCAAANsDADC-AgAA1wMAML8CAADYAwAwwAIAANkDACDBAgAA2gMAMMICAADaAwAwwwIAANoDADDEAgAA2gMAMMUCAADcAwAwxgIAAN0DADAMCAAA5QMAIN4BAQAAAAHiAUAAAAAB4wFAAAAAAfwBAAAA_AEC_QFAAAAAAf4BQAAAAAH_AQIAAAABgAIBAAAAAYICAAAAggICgwIBAAAAAYQCAQAAAAECAAAAEQAgHwAA5AMAIAMAAAARACAfAADkAwAgIAAA4gMAIAEYAADRBQAwEQcAAJ8DACAIAACvAwAg2wEAAKwDADDcAQAADwAQ3QEAAKwDADDeAQEAAAAB4gFAAN8CACHjAUAA3wIAIfoBAQDeAgAh_AEAAK0D_AEi_QFAAN8CACH-AUAA3wIAIf8BAgDnAgAhgAIBAN4CACGCAgAArgOCAiKDAgEA4AIAIYQCAQDgAgAhAgAAABEAIBgAAOIDACACAAAA3gMAIBgAAN8DACAP2wEAAN0DADDcAQAA3gMAEN0BAADdAwAw3gEBAN4CACHiAUAA3wIAIeMBQADfAgAh-gEBAN4CACH8AQAArQP8ASL9AUAA3wIAIf4BQADfAgAh_wECAOcCACGAAgEA3gIAIYICAACuA4ICIoMCAQDgAgAhhAIBAOACACEP2wEAAN0DADDcAQAA3gMAEN0BAADdAwAw3gEBAN4CACHiAUAA3wIAIeMBQADfAgAh-gEBAN4CACH8AQAArQP8ASL9AUAA3wIAIf4BQADfAgAh_wECAOcCACGAAgEA3gIAIYICAACuA4ICIoMCAQDgAgAhhAIBAOACACEL3gEBALgDACHiAUAAuQMAIeMBQAC5AwAh_AEAAOAD_AEi_QFAALkDACH-AUAAuQMAIf8BAgDAAwAhgAIBALgDACGCAgAA4QOCAiKDAgEAugMAIYQCAQC6AwAhAcECAAAA_AECAcECAAAAggICDAgAAOMDACDeAQEAuAMAIeIBQAC5AwAh4wFAALkDACH8AQAA4AP8ASL9AUAAuQMAIf4BQAC5AwAh_wECAMADACGAAgEAuAMAIYICAADhA4ICIoMCAQC6AwAhhAIBALoDACEHHwAAzAUAICAAAM8FACC-AgAAzQUAIL8CAADOBQAgwgIAAA0AIMMCAAANACDEAgAAYQAgDAgAAOUDACDeAQEAAAAB4gFAAAAAAeMBQAAAAAH8AQAAAPwBAv0BQAAAAAH-AUAAAAAB_wECAAAAAYACAQAAAAGCAgAAAIICAoMCAQAAAAGEAgEAAAABAx8AAMwFACC-AgAAzQUAIMQCAABhACAO3gEBAAAAAeABQAAAAAHiAUAAAAAB4wFAAAAAAYICAAAAswICsAJAAAAAAbECQAAAAAGzAggAAAABtAIIAAAAAbUCAgAAAAG2AgIAAAABtwIBAAAAAbgCAQAAAAG5AgEAAAABAgAAAAEAIB8AAPMDACADAAAAAQAgHwAA8wMAICAAAPIDACABGAAAywUAMBQHAACfAwAg2wEAAJwDADDcAQAALgAQ3QEAAJwDADDeAQEAAAAB4AFAAN8CACHiAUAA3wIAIeMBQADfAgAh-gEBAN4CACGCAgAAnQOzAiKwAkAAjAMAIbECQACMAwAhswIIAJ4DACG0AggAngMAIbUCAgDnAgAhtgICAOcCACG3AgEA4AIAIbgCAQDgAgAhuQIBAOACACG7AgAAswMAIAIAAAABACAYAADyAwAgAgAAAO4DACAYAADvAwAgEtsBAADtAwAw3AEAAO4DABDdAQAA7QMAMN4BAQDeAgAh4AFAAN8CACHiAUAA3wIAIeMBQADfAgAh-gEBAN4CACGCAgAAnQOzAiKwAkAAjAMAIbECQACMAwAhswIIAJ4DACG0AggAngMAIbUCAgDnAgAhtgICAOcCACG3AgEA4AIAIbgCAQDgAgAhuQIBAOACACES2wEAAO0DADDcAQAA7gMAEN0BAADtAwAw3gEBAN4CACHgAUAA3wIAIeIBQADfAgAh4wFAAN8CACH6AQEA3gIAIYICAACdA7MCIrACQACMAwAhsQJAAIwDACGzAggAngMAIbQCCACeAwAhtQICAOcCACG2AgIA5wIAIbcCAQDgAgAhuAIBAOACACG5AgEA4AIAIQ7eAQEAuAMAIeABQAC5AwAh4gFAALkDACHjAUAAuQMAIYICAADwA7MCIrACQADOAwAhsQJAAM4DACGzAggA8QMAIbQCCADxAwAhtQICAMADACG2AgIAwAMAIbcCAQC6AwAhuAIBALoDACG5AgEAugMAIQHBAgAAALMCAgXBAggAAAABxwIIAAAAAcgCCAAAAAHJAggAAAABygIIAAAAAQ7eAQEAuAMAIeABQAC5AwAh4gFAALkDACHjAUAAuQMAIYICAADwA7MCIrACQADOAwAhsQJAAM4DACGzAggA8QMAIbQCCADxAwAhtQICAMADACG2AgIAwAMAIbcCAQC6AwAhuAIBALoDACG5AgEAugMAIQ7eAQEAAAAB4AFAAAAAAeIBQAAAAAHjAUAAAAABggIAAACzAgKwAkAAAAABsQJAAAAAAbMCCAAAAAG0AggAAAABtQICAAAAAbYCAgAAAAG3AgEAAAABuAIBAAAAAbkCAQAAAAETAwAA9QMAIA0AAPYDACAPAAD3AwAgEQAA-AMAIBIAAPkDACDeAQEAAAAB4gFAAAAAAeMBQAAAAAH6AQEAAAABhQIBAAAAAYYCAQAAAAGHAgEAAAABiAIBAAAAAYoCAAAAigIDiwJAAAAAAYwCQAAAAAGNAgEAAAABjgIBAAAAAZACAAAAkAICAx8AAMkFACC-AgAAygUAIMQCAABhACADHwAAxwUAIL4CAADIBQAgxAIAAL4BACADHwAAxQUAIL4CAADGBQAgxAIAACMAIAQfAADmAwAwvgIAAOcDADDAAgAA6QMAIMQCAADqAwAwBB8AANYDADC-AgAA1wMAMMACAADZAwAgxAIAANoDADABwQICAAAABAQfAADDAwAwvgIAAMQDADDAAgAAxgMAIMQCAADHAwAwAAAAAAAABR8AAMAFACAgAADDBQAgvgIAAMEFACC_AgAAwgUAIMQCAAAfACADHwAAwAUAIL4CAADBBQAgxAIAAB8AIAAAAAcfAAC7BQAgIAAAvgUAIL4CAAC8BQAgvwIAAL0FACDCAgAAKgAgwwIAACoAIMQCAACgAgAgAx8AALsFACC-AgAAvAUAIMQCAACgAgAgAAAABR8AALUFACAgAAC5BQAgvgIAALYFACC_AgAAuAUAIMQCAAC-AQAgCx8AAI4EADAgAACSBAAwvgIAAI8EADC_AgAAkAQAMMACAACRBAAgwQIAAMcDADDCAgAAxwMAMMMCAADHAwAwxAIAAMcDADDFAgAAkwQAMMYCAADKAwAwEwMAAPUDACANAAD2AwAgEAAAiAQAIBEAAPgDACASAAD5AwAg3gEBAAAAAeIBQAAAAAHjAUAAAAAB-gEBAAAAAYUCAQAAAAGGAgEAAAABhwIBAAAAAYgCAQAAAAGKAgAAAIoCA4sCQAAAAAGMAkAAAAABjQIBAAAAAZACAAAAkAICkQIBAAAAAQIAAAAfACAfAACWBAAgAwAAAB8AIB8AAJYEACAgAACVBAAgARgAALcFADACAAAAHwAgGAAAlQQAIAIAAADLAwAgGAAAlAQAIA7eAQEAuAMAIeIBQAC5AwAh4wFAALkDACH6AQEAuAMAIYUCAQC4AwAhhgIBALgDACGHAgEAuAMAIYgCAQC6AwAhigIAAM0DigIjiwJAAM4DACGMAkAAuQMAIY0CAQC6AwAhkAIAAM8DkAIikQIBALoDACETAwAA0QMAIA0AANIDACAQAACHBAAgEQAA1AMAIBIAANUDACDeAQEAuAMAIeIBQAC5AwAh4wFAALkDACH6AQEAuAMAIYUCAQC4AwAhhgIBALgDACGHAgEAuAMAIYgCAQC6AwAhigIAAM0DigIjiwJAAM4DACGMAkAAuQMAIY0CAQC6AwAhkAIAAM8DkAIikQIBALoDACETAwAA9QMAIA0AAPYDACAQAACIBAAgEQAA-AMAIBIAAPkDACDeAQEAAAAB4gFAAAAAAeMBQAAAAAH6AQEAAAABhQIBAAAAAYYCAQAAAAGHAgEAAAABiAIBAAAAAYoCAAAAigIDiwJAAAAAAYwCQAAAAAGNAgEAAAABkAIAAACQAgKRAgEAAAABAx8AALUFACC-AgAAtgUAIMQCAAC-AQAgBB8AAI4EADC-AgAAjwQAMMACAACRBAAgxAIAAMcDADAAAAALHwAAqgQAMCAAAK4EADC-AgAAqwQAML8CAACsBAAwwAIAAK0EACDBAgAAxwMAMMICAADHAwAwwwIAAMcDADDEAgAAxwMAMMUCAACvBAAwxgIAAMoDADALHwAAngQAMCAAAKMEADC-AgAAnwQAML8CAACgBAAwwAIAAKEEACDBAgAAogQAMMICAACiBAAwwwIAAKIEADDEAgAAogQAMMUCAACkBAAwxgIAAKUEADAFDAAAmAQAIN4BAQAAAAHfAQEAAAAB4gFAAAAAAeMBQAAAAAECAAAAIwAgHwAAqQQAIAMAAAAjACAfAACpBAAgIAAAqAQAIAEYAAC0BQAwCwwAAOgCACANAACiAwAg2wEAAKEDADDcAQAAIQAQ3QEAAKEDADDeAQEAAAAB3wEBAN4CACHiAUAA3wIAIeMBQADfAgAhjQIBAN4CACG6AgAAoAMAIAIAAAAjACAYAACoBAAgAgAAAKYEACAYAACnBAAgCNsBAAClBAAw3AEAAKYEABDdAQAApQQAMN4BAQDeAgAh3wEBAN4CACHiAUAA3wIAIeMBQADfAgAhjQIBAN4CACEI2wEAAKUEADDcAQAApgQAEN0BAAClBAAw3gEBAN4CACHfAQEA3gIAIeIBQADfAgAh4wFAAN8CACGNAgEA3gIAIQTeAQEAuAMAId8BAQC4AwAh4gFAALkDACHjAUAAuQMAIQUMAACNBAAg3gEBALgDACHfAQEAuAMAIeIBQAC5AwAh4wFAALkDACEFDAAAmAQAIN4BAQAAAAHfAQEAAAAB4gFAAAAAAeMBQAAAAAETAwAA9QMAIA8AAPcDACAQAACIBAAgEQAA-AMAIBIAAPkDACDeAQEAAAAB4gFAAAAAAeMBQAAAAAH6AQEAAAABhQIBAAAAAYYCAQAAAAGHAgEAAAABiAIBAAAAAYoCAAAAigIDiwJAAAAAAYwCQAAAAAGOAgEAAAABkAIAAACQAgKRAgEAAAABAgAAAB8AIB8AALIEACADAAAAHwAgHwAAsgQAICAAALEEACABGAAAswUAMAIAAAAfACAYAACxBAAgAgAAAMsDACAYAACwBAAgDt4BAQC4AwAh4gFAALkDACHjAUAAuQMAIfoBAQC4AwAhhQIBALgDACGGAgEAuAMAIYcCAQC4AwAhiAIBALoDACGKAgAAzQOKAiOLAkAAzgMAIYwCQAC5AwAhjgIBALoDACGQAgAAzwOQAiKRAgEAugMAIRMDAADRAwAgDwAA0wMAIBAAAIcEACARAADUAwAgEgAA1QMAIN4BAQC4AwAh4gFAALkDACHjAUAAuQMAIfoBAQC4AwAhhQIBALgDACGGAgEAuAMAIYcCAQC4AwAhiAIBALoDACGKAgAAzQOKAiOLAkAAzgMAIYwCQAC5AwAhjgIBALoDACGQAgAAzwOQAiKRAgEAugMAIRMDAAD1AwAgDwAA9wMAIBAAAIgEACARAAD4AwAgEgAA-QMAIN4BAQAAAAHiAUAAAAAB4wFAAAAAAfoBAQAAAAGFAgEAAAABhgIBAAAAAYcCAQAAAAGIAgEAAAABigIAAACKAgOLAkAAAAABjAJAAAAAAY4CAQAAAAGQAgAAAJACApECAQAAAAEEHwAAqgQAML4CAACrBAAwwAIAAK0EACDEAgAAxwMAMAQfAACeBAAwvgIAAJ8EADDAAgAAoQQAIMQCAACiBAAwAAAAAAAAAAUfAACuBQAgIAAAsQUAIL4CAACvBQAgvwIAALAFACDEAgAAYQAgAx8AAK4FACC-AgAArwUAIMQCAABhACAAAAAFHwAAqQUAICAAAKwFACC-AgAAqgUAIL8CAACrBQAgxAIAAGEAIAMfAACpBQAgvgIAAKoFACDEAgAAYQAgAAAAAcECAAAApAICAcECIAAAAAELHwAA9AQAMCAAAPkEADC-AgAA9QQAML8CAAD2BAAwwAIAAPcEACDBAgAA-AQAMMICAAD4BAAwwwIAAPgEADDEAgAA-AQAMMUCAAD6BAAwxgIAAPsEADAHHwAA7wQAICAAAPIEACC-AgAA8AQAIL8CAADxBAAgwgIAAAcAIMMCAAAHACDEAgAAHwAgCx8AAOIEADAgAADnBAAwvgIAAOMEADC_AgAA5AQAMMACAADlBAAgwQIAAOYEADDCAgAA5gQAMMMCAADmBAAwxAIAAOYEADDFAgAA6AQAMMYCAADpBAAwCx8AANkEADAgAADdBAAwvgIAANoEADC_AgAA2wQAMMACAADcBAAgwQIAANoDADDCAgAA2gMAMMMCAADaAwAwxAIAANoDADDFAgAA3gQAMMYCAADdAwAwCx8AAM0EADAgAADSBAAwvgIAAM4EADC_AgAAzwQAMMACAADQBAAgwQIAANEEADDCAgAA0QQAMMMCAADRBAAwxAIAANEEADDFAgAA0wQAMMYCAADUBAAwDN4BAQAAAAHiAUAAAAAB4wFAAAAAAZYCAQAAAAGXAgEAAAABmAIBAAAAAZkCAQAAAAGaAgEAAAABmwJAAAAAAZwCQAAAAAGdAgEAAAABngIBAAAAAQIAAAAWACAfAADYBAAgAwAAABYAIB8AANgEACAgAADXBAAgARgAAKgFADARAwAApgMAINsBAACrAwAw3AEAABQAEN0BAACrAwAw3gEBAAAAAeIBQADfAgAh4wFAAN8CACGFAgEA3gIAIZYCAQDeAgAhlwIBAN4CACGYAgEA4AIAIZkCAQDgAgAhmgIBAOACACGbAkAAjAMAIZwCQACMAwAhnQIBAOACACGeAgEA4AIAIQIAAAAWACAYAADXBAAgAgAAANUEACAYAADWBAAgENsBAADUBAAw3AEAANUEABDdAQAA1AQAMN4BAQDeAgAh4gFAAN8CACHjAUAA3wIAIYUCAQDeAgAhlgIBAN4CACGXAgEA3gIAIZgCAQDgAgAhmQIBAOACACGaAgEA4AIAIZsCQACMAwAhnAJAAIwDACGdAgEA4AIAIZ4CAQDgAgAhENsBAADUBAAw3AEAANUEABDdAQAA1AQAMN4BAQDeAgAh4gFAAN8CACHjAUAA3wIAIYUCAQDeAgAhlgIBAN4CACGXAgEA3gIAIZgCAQDgAgAhmQIBAOACACGaAgEA4AIAIZsCQACMAwAhnAJAAIwDACGdAgEA4AIAIZ4CAQDgAgAhDN4BAQC4AwAh4gFAALkDACHjAUAAuQMAIZYCAQC4AwAhlwIBALgDACGYAgEAugMAIZkCAQC6AwAhmgIBALoDACGbAkAAzgMAIZwCQADOAwAhnQIBALoDACGeAgEAugMAIQzeAQEAuAMAIeIBQAC5AwAh4wFAALkDACGWAgEAuAMAIZcCAQC4AwAhmAIBALoDACGZAgEAugMAIZoCAQC6AwAhmwJAAM4DACGcAkAAzgMAIZ0CAQC6AwAhngIBALoDACEM3gEBAAAAAeIBQAAAAAHjAUAAAAABlgIBAAAAAZcCAQAAAAGYAgEAAAABmQIBAAAAAZoCAQAAAAGbAkAAAAABnAJAAAAAAZ0CAQAAAAGeAgEAAAABDAcAAIMEACDeAQEAAAAB4gFAAAAAAeMBQAAAAAH6AQEAAAAB_AEAAAD8AQL9AUAAAAAB_gFAAAAAAf8BAgAAAAGAAgEAAAABggIAAACCAgKEAgEAAAABAgAAABEAIB8AAOEEACADAAAAEQAgHwAA4QQAICAAAOAEACABGAAApwUAMAIAAAARACAYAADgBAAgAgAAAN4DACAYAADfBAAgC94BAQC4AwAh4gFAALkDACHjAUAAuQMAIfoBAQC4AwAh_AEAAOAD_AEi_QFAALkDACH-AUAAuQMAIf8BAgDAAwAhgAIBALgDACGCAgAA4QOCAiKEAgEAugMAIQwHAACCBAAg3gEBALgDACHiAUAAuQMAIeMBQAC5AwAh-gEBALgDACH8AQAA4AP8ASL9AUAAuQMAIf4BQAC5AwAh_wECAMADACGAAgEAuAMAIYICAADhA4ICIoQCAQC6AwAhDAcAAIMEACDeAQEAAAAB4gFAAAAAAeMBQAAAAAH6AQEAAAAB_AEAAAD8AQL9AUAAAAAB_gFAAAAAAf8BAgAAAAGAAgEAAAABggIAAACCAgKEAgEAAAABBd4BAQAAAAHiAUAAAAABoAIBAAAAAa4CAAAArgICrwIBAAAAAQIAAAALACAfAADuBAAgAwAAAAsAIB8AAO4EACAgAADtBAAgARgAAKYFADAKAwAArwMAINsBAACwAwAw3AEAAAkAEN0BAACwAwAw3gEBAAAAAeIBQADfAgAhhQIBAOACACGgAgEA4AIAIa4CAACxA64CIq8CAQDeAgAhAgAAAAsAIBgAAO0EACACAAAA6gQAIBgAAOsEACAJ2wEAAOkEADDcAQAA6gQAEN0BAADpBAAw3gEBAN4CACHiAUAA3wIAIYUCAQDgAgAhoAIBAOACACGuAgAAsQOuAiKvAgEA3gIAIQnbAQAA6QQAMNwBAADqBAAQ3QEAAOkEADDeAQEA3gIAIeIBQADfAgAhhQIBAOACACGgAgEA4AIAIa4CAACxA64CIq8CAQDeAgAhBd4BAQC4AwAh4gFAALkDACGgAgEAugMAIa4CAADsBK4CIq8CAQC4AwAhAcECAAAArgICBd4BAQC4AwAh4gFAALkDACGgAgEAugMAIa4CAADsBK4CIq8CAQC4AwAhBd4BAQAAAAHiAUAAAAABoAIBAAAAAa4CAAAArgICrwIBAAAAARMNAAD2AwAgDwAA9wMAIBAAAIgEACARAAD4AwAgEgAA-QMAIN4BAQAAAAHiAUAAAAAB4wFAAAAAAfoBAQAAAAGGAgEAAAABhwIBAAAAAYgCAQAAAAGKAgAAAIoCA4sCQAAAAAGMAkAAAAABjQIBAAAAAY4CAQAAAAGQAgAAAJACApECAQAAAAECAAAAHwAgHwAA7wQAIAMAAAAHACAfAADvBAAgIAAA8wQAIBUAAAAHACANAADSAwAgDwAA0wMAIBAAAIcEACARAADUAwAgEgAA1QMAIBgAAPMEACDeAQEAuAMAIeIBQAC5AwAh4wFAALkDACH6AQEAuAMAIYYCAQC4AwAhhwIBALgDACGIAgEAugMAIYoCAADNA4oCI4sCQADOAwAhjAJAALkDACGNAgEAugMAIY4CAQC6AwAhkAIAAM8DkAIikQIBALoDACETDQAA0gMAIA8AANMDACAQAACHBAAgEQAA1AMAIBIAANUDACDeAQEAuAMAIeIBQAC5AwAh4wFAALkDACH6AQEAuAMAIYYCAQC4AwAhhwIBALgDACGIAgEAugMAIYoCAADNA4oCI4sCQADOAwAhjAJAALkDACGNAgEAugMAIY4CAQC6AwAhkAIAAM8DkAIikQIBALoDACEH3gEBAAAAAeIBQAAAAAHjAUAAAAABlQJAAAAAAZ8CAQAAAAGgAgEAAAABoQIBAAAAAQIAAAAFACAfAAD_BAAgAwAAAAUAIB8AAP8EACAgAAD-BAAgARgAAKUFADAMAwAApgMAINsBAACyAwAw3AEAAAMAEN0BAACyAwAw3gEBAAAAAeIBQADfAgAh4wFAAN8CACGFAgEA3gIAIZUCQADfAgAhnwIBAAAAAaACAQDgAgAhoQIBAOACACECAAAABQAgGAAA_gQAIAIAAAD8BAAgGAAA_QQAIAvbAQAA-wQAMNwBAAD8BAAQ3QEAAPsEADDeAQEA3gIAIeIBQADfAgAh4wFAAN8CACGFAgEA3gIAIZUCQADfAgAhnwIBAN4CACGgAgEA4AIAIaECAQDgAgAhC9sBAAD7BAAw3AEAAPwEABDdAQAA-wQAMN4BAQDeAgAh4gFAAN8CACHjAUAA3wIAIYUCAQDeAgAhlQJAAN8CACGfAgEA3gIAIaACAQDgAgAhoQIBAOACACEH3gEBALgDACHiAUAAuQMAIeMBQAC5AwAhlQJAALkDACGfAgEAuAMAIaACAQC6AwAhoQIBALoDACEH3gEBALgDACHiAUAAuQMAIeMBQAC5AwAhlQJAALkDACGfAgEAuAMAIaACAQC6AwAhoQIBALoDACEH3gEBAAAAAeIBQAAAAAHjAUAAAAABlQJAAAAAAZ8CAQAAAAGgAgEAAAABoQIBAAAAAQQfAAD0BAAwvgIAAPUEADDAAgAA9wQAIMQCAAD4BAAwAx8AAO8EACC-AgAA8AQAIMQCAAAfACAEHwAA4gQAML4CAADjBAAwwAIAAOUEACDEAgAA5gQAMAQfAADZBAAwvgIAANoEADDAAgAA3AQAIMQCAADaAwAwBB8AAM0EADC-AgAAzgQAMMACAADQBAAgxAIAANEEADAADAMAAJcFACANAACWBQAgDwAAmAUAIBAAAJkFACARAACaBQAgEgAAiAUAIIgCAAC0AwAgigIAALQDACCLAgAAtAMAII0CAAC0AwAgjgIAALQDACCRAgAAtAMAIAAAAAAAAAcfAACgBQAgIAAAowUAIL4CAAChBQAgvwIAAKIFACDCAgAADQAgwwIAAA0AIMQCAABhACADHwAAoAUAIL4CAAChBQAgxAIAAGEAIAAAAAAABR8AAJsFACAgAACeBQAgvgIAAJwFACC_AgAAnQUAIMQCAAAfACADHwAAmwUAIL4CAACcBQAgxAIAAB8AIAMMAAD8AwAgDgAAtQQAIOEBAAC0AwAgCgQAAIUFACAFAACGBQAgBgAAhwUAIAkAAIgFACAKAACJBQAgiAIAALQDACCnAgAAtAMAIKgCAAC0AwAgqwIAALQDACCsAgAAtAMAIAIMAAD8AwAgDQAAlgUAIAEMAAD8AwAgABQDAAD1AwAgDQAA9gMAIA8AAPcDACAQAACIBAAgEgAA-QMAIN4BAQAAAAHiAUAAAAAB4wFAAAAAAfoBAQAAAAGFAgEAAAABhgIBAAAAAYcCAQAAAAGIAgEAAAABigIAAACKAgOLAkAAAAABjAJAAAAAAY0CAQAAAAGOAgEAAAABkAIAAACQAgKRAgEAAAABAgAAAB8AIB8AAJsFACADAAAABwAgHwAAmwUAICAAAJ8FACAWAAAABwAgAwAA0QMAIA0AANIDACAPAADTAwAgEAAAhwQAIBIAANUDACAYAACfBQAg3gEBALgDACHiAUAAuQMAIeMBQAC5AwAh-gEBALgDACGFAgEAuAMAIYYCAQC4AwAhhwIBALgDACGIAgEAugMAIYoCAADNA4oCI4sCQADOAwAhjAJAALkDACGNAgEAugMAIY4CAQC6AwAhkAIAAM8DkAIikQIBALoDACEUAwAA0QMAIA0AANIDACAPAADTAwAgEAAAhwQAIBIAANUDACDeAQEAuAMAIeIBQAC5AwAh4wFAALkDACH6AQEAuAMAIYUCAQC4AwAhhgIBALgDACGHAgEAuAMAIYgCAQC6AwAhigIAAM0DigIjiwJAAM4DACGMAkAAuQMAIY0CAQC6AwAhjgIBALoDACGQAgAAzwOQAiKRAgEAugMAIRMEAACABQAgBQAAgQUAIAkAAIMFACAKAACEBQAg3gEBAAAAAeIBQAAAAAHjAUAAAAAB7wEBAAAAAYgCAQAAAAGiAgEAAAABpAIAAACkAgKlAgEAAAABpgIgAAAAAacCQAAAAAGoAgEAAAABqQIgAAAAAaoCIAAAAAGrAgEAAAABrAJAAAAAAQIAAABhACAfAACgBQAgAwAAAA0AIB8AAKAFACAgAACkBQAgFQAAAA0AIAQAAMgEACAFAADJBAAgCQAAywQAIAoAAMwEACAYAACkBQAg3gEBALgDACHiAUAAuQMAIeMBQAC5AwAh7wEBALgDACGIAgEAugMAIaICAQC4AwAhpAIAAMYEpAIipQIBALgDACGmAiAAxwQAIacCQADOAwAhqAIBALoDACGpAiAAxwQAIaoCIADHBAAhqwIBALoDACGsAkAAzgMAIRMEAADIBAAgBQAAyQQAIAkAAMsEACAKAADMBAAg3gEBALgDACHiAUAAuQMAIeMBQAC5AwAh7wEBALgDACGIAgEAugMAIaICAQC4AwAhpAIAAMYEpAIipQIBALgDACGmAiAAxwQAIacCQADOAwAhqAIBALoDACGpAiAAxwQAIaoCIADHBAAhqwIBALoDACGsAkAAzgMAIQfeAQEAAAAB4gFAAAAAAeMBQAAAAAGVAkAAAAABnwIBAAAAAaACAQAAAAGhAgEAAAABBd4BAQAAAAHiAUAAAAABoAIBAAAAAa4CAAAArgICrwIBAAAAAQveAQEAAAAB4gFAAAAAAeMBQAAAAAH6AQEAAAAB_AEAAAD8AQL9AUAAAAAB_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_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-AUAAAAAB_wECAAAAAYACAQAAAAGCAgAAAIICAoMCAQAAAAGEAgEAAAABAwAAACEAIB8AAMUFACAgAADUBQAgCAAAACEAIA0AAIwEACAYAADUBQAg3gEBALgDACHfAQEAuAMAIeIBQAC5AwAh4wFAALkDACGNAgEAuAMAIQYNAACMBAAg3gEBALgDACHfAQEAuAMAIeIBQAC5AwAh4wFAALkDACGNAgEAuAMAIQMAAAAcACAfAADHBQAgIAAA1wUAIAkAAAAcACAOAACdBAAgGAAA1wUAIN4BAQC4AwAh4QEBALoDACHiAUAAuQMAIeMBQAC5AwAh7wEBALgDACGSAgEAuAMAIQcOAACdBAAg3gEBALgDACHhAQEAugMAIeIBQAC5AwAh4wFAALkDACHvAQEAuAMAIZICAQC4AwAhAwAAAA0AIB8AAMkFACAgAADaBQAgFQAAAA0AIAQAAMgEACAGAADKBAAgCQAAywQAIAoAAMwEACAYAADaBQAg3gEBALgDACHiAUAAuQMAIeMBQAC5AwAh7wEBALgDACGIAgEAugMAIaICAQC4AwAhpAIAAMYEpAIipQIBALgDACGmAiAAxwQAIacCQADOAwAhqAIBALoDACGpAiAAxwQAIaoCIADHBAAhqwIBALoDACGsAkAAzgMAIRMEAADIBAAgBgAAygQAIAkAAMsEACAKAADMBAAg3gEBALgDACHiAUAAuQMAIeMBQAC5AwAh7wEBALgDACGIAgEAugMAIaICAQC4AwAhpAIAAMYEpAIipQIBALgDACGmAiAAxwQAIacCQADOAwAhqAIBALoDACGpAiAAxwQAIaoCIADHBAAhqwIBALoDACGsAkAAzgMAIQ7eAQEAAAAB4gFAAAAAAeMBQAAAAAH6AQEAAAABhQIBAAAAAYYCAQAAAAGHAgEAAAABiAIBAAAAAYoCAAAAigIDiwJAAAAAAYwCQAAAAAGNAgEAAAABjgIBAAAAAZACAAAAkAICAQcAAgcDAAMLAA8NHQkPKQoQKw0RMAESMQYGBAYEBQgCBgwFCRIGChcHCwAIAQMAAwEDDgMCBwACCBMDAQMAAwQEGAAGGQAJGgAKGwADCwAMDCACDiQKAwsACwwlAg0ACQEMJgACDCcADigAAgsADgwsAgEMLQACETIAEjMAAAEHAAIBBwACBQsAFCUAFSYAFicAFygAGAAAAAAABQsAFCUAFSYAFicAFygAGAEDUwMBA1kDAwsAHScAHigAHwAAAAMLAB0nAB4oAB8AAAMLACQnACUoACYAAAADCwAkJwAlKAAmAQMAAwEDAAMDCwArJwAsKAAtAAAAAwsAKycALCgALQEDAAMBAwADAwsAMicAMygANAAAAAMLADInADMoADQAAAADCwA6JwA7KAA8AAAAAwsAOicAOygAPAAAAwsAQScAQigAQwAAAAMLAEEnAEIoAEMBDQAJAQ0ACQMLAEgnAEkoAEoAAAADCwBIJwBJKABKBAMAAw32AQkP9wEKEPgBDQQDAAMN_gEJD_8BChCAAg0DCwBPJwBQKABRAAAAAwsATycAUCgAUQIHAAIIkgIDAgcAAgiYAgMFCwBWJQBXJgBYJwBZKABaAAAAAAAFCwBWJQBXJgBYJwBZKABaAAAFCwBfJQBgJgBhJwBiKABjAAAAAAAFCwBfJQBgJgBhJwBiKABjAAAAAwsAaScAaigAawAAAAMLAGknAGooAGsTAgEUNAEVNQEWNgEXNwEZOQEaOxAbPBEcPgEdQBAeQRIhQgEiQwEjRBApRxMqSBkrSQUsSgUtSwUuTAUvTQUwTwUxURAyUhozVQU0VxA1WBs2WgU3WwU4XBA5Xxw6YCA7YgM8YwM9ZQM-ZgM_ZwNAaQNBaxBCbCFDbgNEcBBFcSJGcgNHcwNIdBBJdyNKeCdLeQRMegRNewROfARPfQRQfwRRgQEQUoIBKFOEAQRUhgEQVYcBKVaIAQRXiQEEWIoBEFmNASpajgEuW48BB1yQAQddkQEHXpIBB1-TAQdglQEHYZcBEGKYAS9jmgEHZJwBEGWdATBmngEHZ58BB2igARBpowExaqQBNWumATZspwE2baoBNm6rATZvrAE2cK4BNnGwARBysQE3c7MBNnS1ARB1tgE4drcBNne4ATZ4uQEQebwBOXq9AT17vwEJfMABCX3CAQl-wwEJf8QBCYABxgEJgQHIARCCAckBPoMBywEJhAHNARCFAc4BP4YBzwEJhwHQAQmIAdEBEIkB1AFAigHVAUSLAdYBCowB1wEKjQHYAQqOAdkBCo8B2gEKkAHcAQqRAd4BEJIB3wFFkwHhAQqUAeMBEJUB5AFGlgHlAQqXAeYBCpgB5wEQmQHqAUeaAesBS5sB7AECnAHtAQKdAe4BAp4B7wECnwHwAQKgAfIBAqEB9AEQogH1AUyjAfoBAqQB_AEQpQH9AU2mAYECAqcBggICqAGDAhCpAYYCTqoBhwJSqwGIAgasAYkCBq0BigIGrgGLAgavAYwCBrABjgIGsQGQAhCyAZECU7MBlAIGtAGWAhC1AZcCVLYBmQIGtwGaAga4AZsCELkBngJVugGfAlu7AaECDbwBogINvQGkAg2-AaUCDb8BpgINwAGoAg3BAaoCEMIBqwJcwwGtAg3EAa8CEMUBsAJdxgGxAg3HAbICDcgBswIQyQG2Al7KAbcCZMsBuQJlzAG6AmXNAb0CZc4BvgJlzwG_AmXQAcECZdEBwwIQ0gHEAmbTAcYCZdQByAIQ1QHJAmfWAcoCZdcBywJl2AHMAhDZAc8CaNoB0AJs"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/enums.ts
var Role = {
  ADMIN: "ADMIN",
  HR: "HR",
  EMPLOYEE: "EMPLOYEE"
};
var Gender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER"
};
var EmploymentType = {
  FULL_TIME: "FULL_TIME",
  PART_TIME: "PART_TIME",
  CONTRACT: "CONTRACT",
  INTERN: "INTERN"
};
var AttendanceStatus = {
  PRESENT: "PRESENT",
  LATE: "LATE",
  ABSENT: "ABSENT",
  HALF_DAY: "HALF_DAY",
  ON_LEAVE: "ON_LEAVE",
  HOLIDAY: "HOLIDAY",
  WEEKEND: "WEEKEND"
};
var LeaveType = {
  CASUAL: "CASUAL",
  SICK: "SICK",
  ANNUAL: "ANNUAL",
  MATERNITY: "MATERNITY",
  PATERNITY: "PATERNITY",
  UNPAID: "UNPAID"
};
var LeaveStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CANCELLED: "CANCELLED"
};

// src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/app/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/app/lib/auth.ts
import { bearer, emailOTP, oAuthProxy, phoneNumber } from "better-auth/plugins";

// src/app/config/env.ts
import dotenv from "dotenv";

// node_modules/.pnpm/http-status@2.1.0/node_modules/http-status/dist/chunk-CUNVWAK5.js
var e = { "1xx": "Informational", "1xx_NAME": "INFORMATIONAL", "1xx_MESSAGE": "Indicates an interim response for communicating connection status or request progress prior to completing the requested action and sending a final response.", INFORMATIONAL: "1xx", "2xx": "Successful", "2xx_NAME": "SUCCESSFUL", "2xx_MESSAGE": "Indicates that the client's request was successfully received, understood, and accepted.", SUCCESSFUL: "2xx", "3xx": "Redirection", "3xx_NAME": "REDIRECTION", "3xx_MESSAGE": "Indicates that further action needs to be taken by the user agent in order to fulfill the request.", REDIRECTION: "3xx", "4xx": "Client Error", "4xx_NAME": "CLIENT_ERROR", "4xx_MESSAGE": "Indicates that the client seems to have erred.", CLIENT_ERROR: "4xx", "5xx": "Server Error", "5xx_NAME": "SERVER_ERROR", "5xx_MESSAGE": "Indicates that the server is aware that it has erred or is incapable of performing the requested method.", SERVER_ERROR: "5xx" };
var t = { classes: e, 100: "Continue", "100_NAME": "CONTINUE", "100_MESSAGE": "The server has received the request headers and the client should proceed to send the request body.", "100_CLASS": e.INFORMATIONAL, CONTINUE: 100, 101: "Switching Protocols", "101_NAME": "SWITCHING_PROTOCOLS", "101_MESSAGE": "The requester has asked the server to switch protocols and the server has agreed to do so.", "101_CLASS": e.INFORMATIONAL, SWITCHING_PROTOCOLS: 101, 102: "Processing", "102_NAME": "PROCESSING", "102_MESSAGE": "A WebDAV request may contain many sub-requests involving file operations, requiring a long time to complete the request. This code indicates that the server has received and is processing the request, but no response is available yet.[7] This prevents the client from timing out and assuming the request was lost.", "102_CLASS": e.INFORMATIONAL, PROCESSING: 102, 103: "Early Hints", "103_NAME": "EARLY_HINTS", "103_MESSAGE": "Used to return some response headers before final HTTP message.", "103_CLASS": e.INFORMATIONAL, EARLY_HINTS: 103, 200: "OK", "200_NAME": "OK", "200_MESSAGE": "Standard response for successful HTTP requests.", "200_CLASS": e.SUCCESSFUL, OK: 200, 201: "Created", "201_NAME": "CREATED", "201_MESSAGE": "The request has been fulfilled, resulting in the creation of a new resource.", "201_CLASS": e.SUCCESSFUL, CREATED: 201, 202: "Accepted", "202_NAME": "ACCEPTED", "202_MESSAGE": "The request has been accepted for processing, but the processing has not been completed.", "202_CLASS": e.SUCCESSFUL, ACCEPTED: 202, 203: "Non-Authoritative Information", "203_NAME": "NON_AUTHORITATIVE_INFORMATION", "203_MESSAGE": "The server is a transforming proxy (e.g. a Web accelerator) that received a 200 OK from its origin, but is returning a modified version of the origin's response.", "203_CLASS": e.SUCCESSFUL, NON_AUTHORITATIVE_INFORMATION: 203, 204: "No Content", "204_NAME": "NO_CONTENT", "204_MESSAGE": "The server successfully processed the request and is not returning any content.", "204_CLASS": e.SUCCESSFUL, NO_CONTENT: 204, 205: "Reset Content", "205_NAME": "RESET_CONTENT", "205_MESSAGE": "The server successfully processed the request, but is not returning any content. Unlike a 204 response, this response requires that the requester reset the document view.", "205_CLASS": e.SUCCESSFUL, RESET_CONTENT: 205, 206: "Partial Content", "206_NAME": "PARTIAL_CONTENT", "206_MESSAGE": "The server is delivering only part of the resource (byte serving) due to a range header sent by the client.", "206_CLASS": e.SUCCESSFUL, PARTIAL_CONTENT: 206, 207: "Multi Status", "207_NAME": "MULTI_STATUS", "207_MESSAGE": "The message body that follows is by default an XML message and can contain a number of separate response codes, depending on how many sub-requests were made.", "207_CLASS": e.SUCCESSFUL, MULTI_STATUS: 207, 208: "Already Reported", "208_NAME": "ALREADY_REPORTED", "208_MESSAGE": "The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response, and are not being included again.", "208_CLASS": e.SUCCESSFUL, ALREADY_REPORTED: 208, 226: "IM Used", "226_NAME": "IM_USED", "226_MESSAGE": "The server has fulfilled a request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.", "226_CLASS": e.SUCCESSFUL, IM_USED: 226, 300: "Multiple Choices", "300_NAME": "MULTIPLE_CHOICES", "300_MESSAGE": "Indicates multiple options for the resource from which the client may choose.", "300_CLASS": e.REDIRECTION, MULTIPLE_CHOICES: 300, 301: "Moved Permanently", "301_NAME": "MOVED_PERMANENTLY", "301_MESSAGE": "This and all future requests should be directed to the given URI.", "301_CLASS": e.REDIRECTION, MOVED_PERMANENTLY: 301, 302: "Found", "302_NAME": "FOUND", "302_MESSAGE": 'This is an example of industry practice contradicting the standard. The HTTP/1.0 specification (RFC 1945) required the client to perform a temporary redirect (the original describing phrase was "Moved Temporarily"), but popular browsers implemented 302 with the functionality of a 303 See Other. Therefore, HTTP/1.1 added status codes 303 and 307 to distinguish between the two behaviours.', "302_CLASS": e.REDIRECTION, FOUND: 302, 303: "See Other", "303_NAME": "SEE_OTHER", "303_MESSAGE": "The response to the request can be found under another URI using the GET method.", "303_CLASS": e.REDIRECTION, SEE_OTHER: 303, 304: "Not Modified", "304_NAME": "NOT_MODIFIED", "304_MESSAGE": "Indicates that the resource has not been modified since the version specified by the request headers If-Modified-Since or If-None-Match.", "304_CLASS": e.REDIRECTION, NOT_MODIFIED: 304, 305: "Use Proxy", "305_NAME": "USE_PROXY", "305_MESSAGE": "The requested resource is available only through a proxy, the address for which is provided in the response.", "305_CLASS": e.REDIRECTION, USE_PROXY: 305, 306: "Switch Proxy", "306_NAME": "SWITCH_PROXY", "306_MESSAGE": 'No longer used. Originally meant "Subsequent requests should use the specified proxy.', "306_CLASS": e.REDIRECTION, SWITCH_PROXY: 306, 307: "Temporary Redirect", "307_NAME": "TEMPORARY_REDIRECT", "307_MESSAGE": "In this case, the request should be repeated with another URI; however, future requests should still use the original URI.", "307_CLASS": e.REDIRECTION, TEMPORARY_REDIRECT: 307, 308: "Permanent Redirect", "308_NAME": "PERMANENT_REDIRECT", "308_MESSAGE": "The request and all future requests should be repeated using another URI.", "308_CLASS": e.REDIRECTION, PERMANENT_REDIRECT: 308, 400: "Bad Request", "400_NAME": "BAD_REQUEST", "400_MESSAGE": "The server cannot or will not process the request due to an apparent client error.", "400_CLASS": e.CLIENT_ERROR, BAD_REQUEST: 400, 401: "Unauthorized", "401_NAME": "UNAUTHORIZED", "401_MESSAGE": "Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.", "401_CLASS": e.CLIENT_ERROR, UNAUTHORIZED: 401, 402: "Payment Required", "402_NAME": "PAYMENT_REQUIRED", "402_MESSAGE": "Reserved for future use. The original intention was that this code might be used as part of some form of digital cash or micropayment scheme, as proposed for example by GNU Taler, but that has not yet happened, and this code is not usually used.", "402_CLASS": e.CLIENT_ERROR, PAYMENT_REQUIRED: 402, 403: "Forbidden", "403_NAME": "FORBIDDEN", "403_MESSAGE": "The request was valid, but the server is refusing action.", "403_CLASS": e.CLIENT_ERROR, FORBIDDEN: 403, 404: "Not Found", "404_NAME": "NOT_FOUND", "404_MESSAGE": "The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.", "404_CLASS": e.CLIENT_ERROR, NOT_FOUND: 404, 405: "Method Not Allowed", "405_NAME": "METHOD_NOT_ALLOWED", "405_MESSAGE": "A request method is not supported for the requested resource.", "405_CLASS": e.CLIENT_ERROR, METHOD_NOT_ALLOWED: 405, 406: "Not Acceptable", "406_NAME": "NOT_ACCEPTABLE", "406_MESSAGE": "The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.", "406_CLASS": e.CLIENT_ERROR, NOT_ACCEPTABLE: 406, 407: "Proxy Authentication Required", "407_NAME": "PROXY_AUTHENTICATION_REQUIRED", "407_MESSAGE": "The client must first authenticate itself with the proxy.", "407_CLASS": e.CLIENT_ERROR, PROXY_AUTHENTICATION_REQUIRED: 407, 408: "Request Time-out", "408_NAME": "REQUEST_TIMEOUT", "408_MESSAGE": "The server timed out waiting for the request.", "408_CLASS": e.CLIENT_ERROR, REQUEST_TIMEOUT: 408, 409: "Conflict", "409_NAME": "CONFLICT", "409_MESSAGE": "Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.", "409_CLASS": e.CLIENT_ERROR, CONFLICT: 409, 410: "Gone", "410_NAME": "GONE", "410_MESSAGE": "Indicates that the resource requested is no longer available and will not be available again.", "410_CLASS": e.CLIENT_ERROR, GONE: 410, 411: "Length Required", "411_NAME": "LENGTH_REQUIRED", "411_MESSAGE": "The request did not specify the length of its content, which is required by the requested resource.", "411_CLASS": e.CLIENT_ERROR, LENGTH_REQUIRED: 411, 412: "Precondition Failed", "412_NAME": "PRECONDITION_FAILED", "412_MESSAGE": "The server does not meet one of the preconditions that the requester put on the request.", "412_CLASS": e.CLIENT_ERROR, PRECONDITION_FAILED: 412, 413: "Request Entity Too Large", "413_NAME": "REQUEST_ENTITY_TOO_LARGE", "413_MESSAGE": 'The request is larger than the server is willing or able to process. Previously called "Request Entity Too Large".', "413_CLASS": e.CLIENT_ERROR, REQUEST_ENTITY_TOO_LARGE: 413, 414: "Request-URI Too Large", "414_NAME": "REQUEST_URI_TOO_LONG", "414_MESSAGE": "The URI provided was too long for the server to process.", "414_CLASS": e.CLIENT_ERROR, REQUEST_URI_TOO_LONG: 414, 415: "Unsupported Media Type", "415_NAME": "UNSUPPORTED_MEDIA_TYPE", "415_MESSAGE": "The request entity has a media type which the server or resource does not support.", "415_CLASS": e.CLIENT_ERROR, UNSUPPORTED_MEDIA_TYPE: 415, 416: "Requested Range not Satisfiable", "416_NAME": "REQUESTED_RANGE_NOT_SATISFIABLE", "416_MESSAGE": "The client has asked for a portion of the file (byte serving), but the server cannot supply that portion.", "416_CLASS": e.CLIENT_ERROR, REQUESTED_RANGE_NOT_SATISFIABLE: 416, 417: "Expectation Failed", "417_NAME": "EXPECTATION_FAILED", "417_MESSAGE": "The server cannot meet the requirements of the Expect request-header field.", "417_CLASS": e.CLIENT_ERROR, EXPECTATION_FAILED: 417, 418: "I'm a teapot", "418_NAME": "IM_A_TEAPOT", "418_MESSAGE": `Any attempt to brew coffee with a teapot should result in the error code "418 I'm a teapot". The resulting entity body MAY be short and stout.`, "418_CLASS": e.CLIENT_ERROR, IM_A_TEAPOT: 418, 421: "Misdirected Request", "421_NAME": "MISDIRECTED_REQUEST", "421_MESSAGE": "The request was directed at a server that is not able to produce a response.", "421_CLASS": e.CLIENT_ERROR, MISDIRECTED_REQUEST: 421, 422: "Unprocessable Entity", "422_NAME": "UNPROCESSABLE_ENTITY", "422_MESSAGE": "The request was well-formed but was unable to be followed due to semantic errors.", "422_CLASS": e.CLIENT_ERROR, UNPROCESSABLE_ENTITY: 422, 423: "Locked", "423_NAME": "LOCKED", "423_MESSAGE": "The resource that is being accessed is locked.", "423_CLASS": e.CLIENT_ERROR, LOCKED: 423, 424: "Failed Dependency", "424_NAME": "FAILED_DEPENDENCY", "424_MESSAGE": "The request failed because it depended on another request and that request failed.", "424_CLASS": e.CLIENT_ERROR, FAILED_DEPENDENCY: 424, 425: "Too Early", "425_NAME": "TOO_EARLY", "425_MESSAGE": "The server is unwilling to risk processing a request that might be replayed.", "425_CLASS": e.CLIENT_ERROR, TOO_EARLY: 425, 426: "Upgrade Required", "426_NAME": "UPGRADE_REQUIRED", "426_MESSAGE": "The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.", "426_CLASS": e.CLIENT_ERROR, UPGRADE_REQUIRED: 426, 428: "Precondition Required", "428_NAME": "PRECONDITION_REQUIRED", "428_MESSAGE": "The origin server requires the request to be conditional.", "428_CLASS": e.CLIENT_ERROR, PRECONDITION_REQUIRED: 428, 429: "Too Many Requests", "429_NAME": "TOO_MANY_REQUESTS", "429_MESSAGE": "The user has sent too many requests in a given amount of time.", "429_CLASS": e.CLIENT_ERROR, TOO_MANY_REQUESTS: 429, 431: "Request Header Fields Too Large", "431_NAME": "REQUEST_HEADER_FIELDS_TOO_LARGE", "431_MESSAGE": "The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.", "431_CLASS": e.CLIENT_ERROR, REQUEST_HEADER_FIELDS_TOO_LARGE: 431, 451: "Unavailable For Legal Reasons", "451_NAME": "UNAVAILABLE_FOR_LEGAL_REASONS", "451_MESSAGE": "A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource.", "451_CLASS": e.CLIENT_ERROR, UNAVAILABLE_FOR_LEGAL_REASONS: 451, 500: "Internal Server Error", "500_NAME": "INTERNAL_SERVER_ERROR", "500_MESSAGE": "A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.", "500_CLASS": e.SERVER_ERROR, INTERNAL_SERVER_ERROR: 500, 501: "Not Implemented", "501_NAME": "NOT_IMPLEMENTED", "501_MESSAGE": "The server either does not recognize the request method, or it lacks the ability to fulfil the request. Usually this implies future availability.", "501_CLASS": e.SERVER_ERROR, NOT_IMPLEMENTED: 501, 502: "Bad Gateway", "502_NAME": "BAD_GATEWAY", "502_MESSAGE": "The server was acting as a gateway or proxy and received an invalid response from the upstream server.", "502_CLASS": e.SERVER_ERROR, BAD_GATEWAY: 502, 503: "Service Unavailable", "503_NAME": "SERVICE_UNAVAILABLE", "503_MESSAGE": "The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.", "503_CLASS": e.SERVER_ERROR, SERVICE_UNAVAILABLE: 503, 504: "Gateway Time-out", "504_NAME": "GATEWAY_TIMEOUT", "504_MESSAGE": "The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.", "504_CLASS": e.SERVER_ERROR, GATEWAY_TIMEOUT: 504, 505: "HTTP Version not Supported", "505_NAME": "HTTP_VERSION_NOT_SUPPORTED", "505_MESSAGE": "The server does not support the HTTP protocol version used in the request.", "505_CLASS": e.SERVER_ERROR, HTTP_VERSION_NOT_SUPPORTED: 505, 506: "Variant Also Negotiates", "506_NAME": "VARIANT_ALSO_NEGOTIATES", "506_MESSAGE": "Transparent content negotiation for the request results in a circular reference.", "506_CLASS": e.SERVER_ERROR, VARIANT_ALSO_NEGOTIATES: 506, 507: "Insufficient Storage", "507_NAME": "INSUFFICIENT_STORAGE", "507_MESSAGE": "The server is unable to store the representation needed to complete the request.", "507_CLASS": e.SERVER_ERROR, INSUFFICIENT_STORAGE: 507, 508: "Loop Detected", "508_NAME": "LOOP_DETECTED", "508_MESSAGE": "The server detected an infinite loop while processing the request.", "508_CLASS": e.SERVER_ERROR, LOOP_DETECTED: 508, 510: "Not Extended", "510_NAME": "NOT_EXTENDED", "510_MESSAGE": "Further extensions to the request are required for the server to fulfil it.", "510_CLASS": e.SERVER_ERROR, NOT_EXTENDED: 510, 511: "Network Authentication Required", "511_NAME": "NETWORK_AUTHENTICATION_REQUIRED", "511_MESSAGE": "The client needs to authenticate to gain network access. Intended for use by intercepting proxies used to control access to the network.", "511_CLASS": e.SERVER_ERROR, NETWORK_AUTHENTICATION_REQUIRED: 511, extra: { unofficial: { 103: "Checkpoint", "103_NAME": "CHECKPOINT", "103_MESSAGE": "Used in the resumable requests proposal to resume aborted PUT or POST requests.", "103_CLASS": e.INFORMATIONAL, CHECKPOINT: 103, 419: "Page Expired", "419_NAME": "PAGE_EXPIRED", "419_MESSAGE": "Used by the Laravel Framework when a CSRF Token is missing or expired.", "419_CLASS": e.CLIENT_ERROR, PAGE_EXPIRED: 419, 218: "This is fine", "218_NAME": "THIS_IS_FINE", "218_MESSAGE": "Used as a catch-all error condition for allowing response bodies to flow through Apache when ProxyErrorOverride is enabled. When ProxyErrorOverride is enabled in Apache, response bodies that contain a status code of 4xx or 5xx are automatically discarded by Apache in favor of a generic response or a custom response specified by the ErrorDocument directive.", "218_CLASS": e.SUCCESSFUL, THIS_IS_FINE: 218, 420: "Enhance Your Calm", "420_NAME": "ENHANCE_YOUR_CALM", "420_MESSAGE": "Returned by version 1 of the Twitter Search and Trends API when the client is being rate limited; versions 1.1 and later use the 429 Too Many Requests response code instead.", "420_CLASS": e.CLIENT_ERROR, ENHANCE_YOUR_CALM: 420, 450: "Blocked by Windows Parental Controls", "450_NAME": "BLOCKED_BY_WINDOWS_PARENTAL_CONTROLS", "450_MESSAGE": "The Microsoft extension code indicated when Windows Parental Controls are turned on and are blocking access to the requested webpage.", "450_CLASS": e.CLIENT_ERROR, BLOCKED_BY_WINDOWS_PARENTAL_CONTROLS: 450, 498: "Invalid Token", "498_NAME": "INVALID_TOKEN", "498_MESSAGE": "Returned by ArcGIS for Server. Code 498 indicates an expired or otherwise invalid token.", "498_CLASS": e.CLIENT_ERROR, INVALID_TOKEN: 498, 499: "Token Required", "499_NAME": "TOKEN_REQUIRED", "499_MESSAGE": "Returned by ArcGIS for Server. Code 499 indicates that a token is required but was not submitted.", "499_CLASS": e.CLIENT_ERROR, TOKEN_REQUIRED: 499, 509: "Bandwidth Limit Exceeded", "509_NAME": "BANDWIDTH_LIMIT_EXCEEDED", "509_MESSAGE": "The server has exceeded the bandwidth specified by the server administrator.", "509_CLASS": e.SERVER_ERROR, BANDWIDTH_LIMIT_EXCEEDED: 509, 530: "Site is frozen", "530_NAME": "SITE_IS_FROZEN", "530_MESSAGE": "Used by the Pantheon web platform to indicate a site that has been frozen due to inactivity.", "530_CLASS": e.SERVER_ERROR, SITE_IS_FROZEN: 530, 598: "Network read timeout error", "598_NAME": "NETWORK_READ_TIMEOUT_ERROR", "598_MESSAGE": "Used by some HTTP proxies to signal a network read timeout behind the proxy to a client in front of the proxy.", "598_CLASS": e.SERVER_ERROR, NETWORK_READ_TIMEOUT_ERROR: 598 }, iis: { 440: "Login Time-out", "440_NAME": "LOGIN_TIME_OUT", "440_MESSAGE": "The client's session has expired and must log in again.", "440_CLASS": e.CLIENT_ERROR, LOGIN_TIME_OUT: 440, 449: "Retry With", "449_NAME": "RETRY_WITH", "449_MESSAGE": "The server cannot honour the request because the user has not provided the required information.", "449_CLASS": e.CLIENT_ERROR, RETRY_WITH: 449, 451: "Redirect", "451_NAME": "REDIRECT", "451_MESSAGE": "Used in Exchange ActiveSync when either a more efficient server is available or the server cannot access the users' mailbox.", "451_CLASS": e.CLIENT_ERROR, REDIRECT: 451 }, nginx: { 444: "No Response", "444_NAME": "NO_RESPONSE", "444_MESSAGE": "Used internally to instruct the server to return no information to the client and close the connection immediately.", "444_CLASS": e.CLIENT_ERROR, NO_RESPONSE: 444, 494: "Request header too large", "494_NAME": "REQUEST_HEADER_TOO_LARGE", "494_MESSAGE": "Client sent too large request or too long header line.", "494_CLASS": e.CLIENT_ERROR, REQUEST_HEADER_TOO_LARGE: 494, 495: "SSL Certificate Error", "495_NAME": "SSL_CERTIFICATE_ERROR", "495_MESSAGE": "An expansion of the 400 Bad Request response code, used when the client has provided an invalid client certificate.", "495_CLASS": e.CLIENT_ERROR, SSL_CERTIFICATE_ERROR: 495, 496: "SSL Certificate Required", "496_NAME": "SSL_CERTIFICATE_REQUIRED", "496_MESSAGE": "An expansion of the 400 Bad Request response code, used when a client certificate is required but not provided.", "496_CLASS": e.CLIENT_ERROR, SSL_CERTIFICATE_REQUIRED: 496, 497: "HTTP Request Sent to HTTPS Port", "497_NAME": "HTTP_REQUEST_SENT_TO_HTTPS_PORT", "497_MESSAGE": "An expansion of the 400 Bad Request response code, used when the client has made a HTTP request to a port listening for HTTPS requests.", "497_CLASS": e.CLIENT_ERROR, HTTP_REQUEST_SENT_TO_HTTPS_PORT: 497, 499: "Client Closed Request", "499_NAME": "CLIENT_CLOSED_REQUEST", "499_MESSAGE": "Used when the client has closed the request before the server could send a response.", "499_CLASS": e.CLIENT_ERROR, CLIENT_CLOSED_REQUEST: 499 }, cloudflare: { 520: "Unknown Error", "520_NAME": "UNKNOWN_ERROR", "520_MESSAGE": 'The 520 error is used as a "catch-all response for when the origin server returns something unexpected", listing connection resets, large headers, and empty or invalid responses as common triggers.', "520_CLASS": e.SERVER_ERROR, UNKNOWN_ERROR: 520, 521: "Web Server Is Down", "521_NAME": "WEB_SERVER_IS_DOWN", "521_MESSAGE": "The origin server has refused the connection from Cloudflare.", "521_CLASS": e.SERVER_ERROR, WEB_SERVER_IS_DOWN: 521, 522: "Connection Timed Out", "522_NAME": "CONNECTION_TIMED_OUT", "522_MESSAGE": "Cloudflare could not negotiate a TCP handshake with the origin server.", "522_CLASS": e.SERVER_ERROR, CONNECTION_TIMED_OUT: 522, 523: "Origin Is Unreachable", "523_NAME": "ORIGIN_IS_UNREACHABLE", "523_MESSAGE": "Cloudflare could not reach the origin server.", "523_CLASS": e.SERVER_ERROR, ORIGIN_IS_UNREACHABLE: 523, 524: "A Timeout Occurred", "524_NAME": "A_TIMEOUT_OCCURRED", "524_MESSAGE": "Cloudflare was able to complete a TCP connection to the origin server, but did not receive a timely HTTP response.", "524_CLASS": e.SERVER_ERROR, A_TIMEOUT_OCCURRED: 524, 525: "SSL Handshake Failed", "525_NAME": "SSL_HANDSHAKE_FAILED", "525_MESSAGE": "Cloudflare could not negotiate a SSL/TLS handshake with the origin server.", "525_CLASS": e.SERVER_ERROR, SSL_HANDSHAKE_FAILED: 525, 526: "Invalid SSL Certificate", "526_NAME": "INVALID_SSL_CERTIFICATE", "526_MESSAGE": "Cloudflare could not validate the SSL/TLS certificate that the origin server presented.", "526_CLASS": e.SERVER_ERROR, INVALID_SSL_CERTIFICATE: 526, 527: "Railgun Error", "527_NAME": "RAILGUN_ERROR", "527_MESSAGE": "Error 527 indicates that the request timed out or failed after the WAN connection had been established.", "527_CLASS": e.SERVER_ERROR, RAILGUN_ERROR: 527 } } };
var E = t;

// src/app/errorHelper/AppError.ts
var AppError = class extends Error {
  statusCode;
  constructor(statusCode, message, stack = "") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};
var AppError_default = AppError;

// src/app/config/env.ts
dotenv.config();
var loadEnvVariables = () => {
  const requireEnvVariable = [
    "NODE_ENV",
    "PORT",
    "ACCESS_TOKEN_SECRET",
    "REFRESH_TOKEN_SECRET",
    "ACCESS_TOKEN_EXPIRES_IN",
    "BETTER_AUTH_SECRET",
    "BETTER_AUTH_URL",
    "STRIPE_SECRET_KEY",
    "STRIPE_WEBHOOK_SECRET",
    "FRONTEND_URL",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
    "GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET",
    "Email",
    "Password",
    "SENTRY_DSN"
  ];
  requireEnvVariable.forEach((variable) => {
    if (!process.env[variable]) {
      throw new AppError_default(
        E.INTERNAL_SERVER_ERROR,
        `Server configuration error: The required environment variable "${variable}" is not set. Verify your .env file or deployment environment settings.`
      );
    }
  });
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    EMAIL_SENDER: {
      SMTP_USER: process.env.EMAIL_SENDER_SMTP_USER,
      SMTP_PASS: process.env.EMAIL_SENDER_SMTP_PASS,
      SMTP_HOST: process.env.EMAIL_SENDER_SMTP_HOST,
      SMTP_PORT: process.env.EMAIL_SENDER_SMTP_PORT,
      SMTP_FROM: process.env.EMAIL_SENDER_SMTP_FROM
    },
    STRIPE: {
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET
    },
    FRONTEND_URL: process.env.FRONTEND_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    CLOUDINARY: {
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
    },
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    Email: process.env.Email,
    Password: process.env.Password,
    SENTRY_DSN: process.env.SENTRY_DSN
  };
};
var envVars = loadEnvVariables();

// src/app/lib/auth.ts
var auth = betterAuth({
  secret: envVars.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  baseURL: `${envVars.FRONTEND_URL}`,
  trustedOrigins: [envVars.FRONTEND_URL],
  appName: "axion",
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: Role.EMPLOYEE
      },
      emailVerified: {
        type: "boolean",
        returned: true,
        defaultValue: true
      },
      isDeleted: {
        type: "boolean",
        required: true,
        defaultValue: false
      },
      phone: {
        type: "string",
        required: false,
        defaultValue: ""
      },
      deletedAt: {
        type: "date",
        required: false,
        defaultValue: null
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true
  },
  plugins: [
    oAuthProxy(),
    bearer(),
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          const user = await prisma.user.findUnique({
            where: {
              email
            }
          });
          if (user?.role === "ADMIN") {
            await prisma.user.update({
              where: {
                email
              },
              data: {
                emailVerified: true
              }
            });
          }
        } else if (type === "forget-password") {
          const user = await prisma.user.findUnique({
            where: {
              email
            }
          });
        }
      },
      expiresIn: 10 * 60,
      otpLength: 6,
      resendStrategy: "rotate"
    }),
    phoneNumber({
      sendOTP: ({ phoneNumber: phoneNumber2, code }, ctx) => {
      }
    })
  ],
  socialProviders: {
    google: {
      clientId: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,
      accessType: "offline",
      prompt: "select_account consent",
      redirectURI: `${envVars.FRONTEND_URL}/api/auth/callback/google`,
      mapProfileToUser: () => {
        return {
          role: Role.EMPLOYEE,
          emailVerified: true,
          isDeleted: false,
          deletedAt: null
        };
      }
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    strategy: "jwt"
  },
  advanced: {
    // disableCSRFCheck: true,
    useSecureCookies: false,
    cookies: {
      state: {
        attributes: {
          sameSite: "none",
          secure: true,
          httpOnly: true,
          path: "/"
        }
      },
      sessionToken: {
        attributes: {
          sameSite: "none",
          secure: true,
          httpOnly: true,
          path: "/"
        }
      }
    }
  },
  redirectURLs: {
    signin: `${envVars.BETTER_AUTH_URL}`
  }
});

// src/app.ts
var import_cors = __toESM(require_lib(), 1);
import cookieParser from "cookie-parser";
import path2 from "path";
import pinoHttp from "pino-http";

// src/app/lib/pino.ts
import { pino } from "pino";
var logger = pino({
  level: envVars.NODE_ENV === "production" ? "info" : "debug",
  transport: envVars.NODE_ENV === "production" ? void 0 : {
    target: "pino-pretty",
    options: { colorize: true }
  }
});

// src/app/lib/sentry.ts
import * as Sentry from "@sentry/browser";
function initSentry() {
  Sentry.init({
    dsn: envVars.SENTRY_DSN,
    tracesSampleRate: 1,
    environment: envVars.NODE_ENV || "development"
  });
  return Sentry;
}
var initsentry = initSentry;

// src/app/router/index.route.ts
import { Router as Router7 } from "express";

// src/app/module/auth/auth.route.ts
import { Router } from "express";

// src/app/shared/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch",
        error: error.message
      });
    }
  };
};

// src/app/shared/sendResponse.ts
var sendResponse = (res, responseData) => {
  const { httpStatusCode, success, message, data } = responseData;
  res.status(httpStatusCode).json({
    success,
    message,
    data
  });
};

// src/app/utils/cookies.ts
var setCookie = (res, key, value, options) => {
  res.cookie(key, value, options);
};
var getCookie = (req, key) => {
  return req.cookies[key];
};
var clearCookie = (res, key, options) => {
  res.clearCookie(key, options);
};
var CookieUtils = {
  setCookie,
  getCookie,
  clearCookie
};

// src/app/utils/jwt.ts
import jwt from "jsonwebtoken";
var createToken = (payload, secret, { expiresIn }) => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};
var verifyToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return {
      success: true,
      data: decoded
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      error
    };
  }
};
var decodeToken = (token) => {
  const decoded = jwt.decode(token);
  return decoded;
};
var jwtUtils = {
  createToken,
  verifyToken,
  decodeToken
};

// src/app/utils/token.ts
var getAccessToken = (payload) => {
  const accessToken = jwtUtils.createToken(
    payload,
    envVars.ACCESS_TOKEN_SECRET,
    { expiresIn: envVars.ACCESS_TOKEN_EXPIRES_IN }
  );
  return accessToken;
};
var getRefreshToken = (payload) => {
  const refreshToken = jwtUtils.createToken(
    payload,
    envVars.REFRESH_TOKEN_SECRET,
    { expiresIn: 60 }
  );
  return refreshToken;
};
var setAccessTokenCookie = (res, token) => {
  CookieUtils.setCookie(res, "accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    //1 day
    maxAge: 60 * 60 * 60 * 24
  });
};
var setRefreshTokenCookie = (res, token) => {
  CookieUtils.setCookie(res, "refreshToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    //7d
    maxAge: 60 * 60 * 60 * 24 * 1e3
  });
};
var setBetterAuthSessionCookie = (res, token) => {
  CookieUtils.setCookie(res, "better-auth.session_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    //1 day
    maxAge: 60 * 60 * 60 * 24
  });
};
var tokenUtils = {
  getAccessToken,
  getRefreshToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setBetterAuthSessionCookie
};

// src/app/module/auth/auth.service.ts
var UserRegister = async (payload) => {
  const { name, email, password, phone, image } = payload;
  const userExist = await prisma.user.findUnique({
    where: { email }
  });
  if (!image) {
    throw new AppError_default(E.BAD_REQUEST, "Image is required to register a user.");
  }
  if (userExist) {
    throw new AppError_default(409, "user already exist,please try another email");
  }
  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      phone,
      image
    }
  });
  console.log({ userId: data?.user?.id }, "User registration response received");
  if (!data.user) {
    throw new AppError_default(400, "User register failed");
  }
  const accessToken = tokenUtils.getAccessToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified
  });
  const refreshToken = tokenUtils.getRefreshToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified
  });
  return {
    ...data,
    token: data.token,
    accessToken,
    refreshToken
  };
};
var loginUser = async (payload) => {
  const { email, password } = payload;
  const data = await auth.api.signInEmail({
    body: {
      email,
      password
    }
  });
  const accessToken = tokenUtils.getAccessToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified
  });
  const refreshToken = tokenUtils.getRefreshToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified
  });
  return {
    ...data,
    accessToken,
    refreshToken
  };
};
var getMe = async (user) => {
  if (!user?.userId) {
    throw new AppError_default(E.UNAUTHORIZED, "Unauthorized access. Please login first.");
  }
  const isUserExists = await prisma.user.findUnique({
    where: {
      id: user.userId
    }
  });
  if (!isUserExists) {
    throw new AppError_default(E.NOT_FOUND, "User not found");
  }
  return isUserExists;
};
var changePassword = async (payload, sessionToken) => {
  const session = await auth.api.getSession({
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`
    })
  });
  if (!session) {
    throw new AppError_default(E.UNAUTHORIZED, "Invalid session token");
  }
  const { currentPassword, newPassword } = payload;
  const result = await auth.api.changePassword({
    body: {
      currentPassword,
      newPassword,
      revokeOtherSessions: true
    },
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`
    })
  });
  if (!result) {
    throw new AppError_default(400, "user change password failed");
  }
  const accessToken = tokenUtils.getAccessToken({
    userId: session.user.id,
    role: session.user.role,
    name: session.user.name,
    email: session.user.email,
    isDeleted: session.user.isDeleted,
    emailVerified: session.user.emailVerified
  });
  const refreshToken = tokenUtils.getRefreshToken({
    userId: session.user.id,
    role: session.user.role,
    name: session.user.name,
    email: session.user.email,
    isDeleted: session.user.isDeleted,
    emailVerified: session.user.emailVerified
  });
  return {
    ...result,
    accessToken,
    refreshToken
  };
};
var logoutUser = async (sessionToken) => {
  const result = await auth.api.signOut({
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`
    })
  });
  return result;
};
var forgetPassword = async (email) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (!isUserExist) {
    throw new AppError_default(E.NOT_FOUND, "User not found");
  }
  await auth.api.requestPasswordResetEmailOTP({
    body: {
      email
    }
  });
};
var resetPassword = async (email, otp, newPassword) => {
  console.log({ email }, "Password reset requested");
  const isUserExist = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (!isUserExist) {
    throw new AppError_default(E.NOT_FOUND, "User not found");
  }
  await auth.api.resetPasswordEmailOTP({
    body: {
      email,
      otp,
      password: newPassword
    }
  });
  await prisma.session.deleteMany({
    where: {
      userId: isUserExist.id
    }
  });
};
var verifyEmail = async (email, otp) => {
  const result = await auth.api.verifyEmailOTP({
    body: {
      email,
      otp
    }
  });
  if (result.status && !result.user.emailVerified) {
    await prisma.user.update({
      where: {
        email
      },
      data: {
        emailVerified: true
      }
    });
  }
};
var sendOtp = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (!user) {
    throw new AppError_default(E.NOT_FOUND, "User not found");
  }
  if (user.emailVerified) {
    throw new AppError_default(E.BAD_REQUEST, "Email already verified");
  }
  const result = await auth.api.sendVerificationOTP({
    body: {
      email,
      // required
      type: "email-verification"
      // required
    }
  });
  return result;
};
var googleLoginSuccess = async (session) => {
  const isPatientExists = await prisma.user.findUnique({
    where: {
      id: session.user.id
    }
  });
  if (!isPatientExists) {
    await prisma.user.create({
      data: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: ""
      }
    });
  }
  const accessToken = tokenUtils.getAccessToken({
    userId: session?.user.id,
    role: session?.user.role,
    name: session?.user.name
  });
  const refreshToken = tokenUtils.getRefreshToken({
    userId: session?.user.id,
    role: session?.user.role,
    name: session?.user.name
  });
  return {
    accessToken,
    refreshToken
  };
};
var AuthService = {
  UserRegister,
  loginUser,
  getMe,
  changePassword,
  logoutUser,
  forgetPassword,
  resetPassword,
  verifyEmail,
  googleLoginSuccess,
  sendOtp
};

// src/app/module/auth/auth.controller.ts
var UserRegister2 = catchAsync(async (req, res) => {
  const payload = {
    ...req.body,
    image: req.body.image
  };
  const result = await AuthService.UserRegister(payload);
  const { accessToken, refreshToken, token } = result;
  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token);
  sendResponse(res, {
    httpStatusCode: E.CREATED,
    success: true,
    message: "user registered successfully",
    data: result
  });
});
var loginUser2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthService.loginUser(payload);
  console.log(
    payload,
    "payload"
  );
  const { accessToken, refreshToken, token } = result;
  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token);
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "User logged in successfully",
    data: result
  });
});
var getMe2 = catchAsync(async (req, res) => {
  if (!req.user?.userId) {
    throw new AppError_default(E.UNAUTHORIZED, "Unauthorized access. Please login first.");
  }
  const data = await AuthService.getMe(req.user);
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "User data retrieved successfully",
    data
  });
});
var changePassword2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const betterAuthSessionToken = req.cookies["better-auth.session_token"];
  const result = await AuthService.changePassword(
    payload,
    betterAuthSessionToken
  );
  const { accessToken, refreshToken, token } = result;
  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token);
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "Password changed successfully",
    data: result
  });
});
var logoutUser2 = catchAsync(async (req, res) => {
  const betterAuthSessionToken = req.cookies["better-auth.session_token"];
  const result = await AuthService.logoutUser(betterAuthSessionToken);
  CookieUtils.clearCookie(res, "accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });
  CookieUtils.clearCookie(res, "refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });
  CookieUtils.clearCookie(res, "better-auth.session_token", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "User logged out successfully",
    data: result
  });
});
var forgetPassword2 = catchAsync(async (req, res) => {
  const { email } = req.body;
  await AuthService.forgetPassword(email);
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "Password reset OTP sent to email successfully"
  });
});
var resetPassword2 = catchAsync(async (req, res) => {
  const { email, otp, newPassword } = req.body;
  await AuthService.resetPassword(email, otp, newPassword);
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "Password reset successfully"
  });
});
var verifyEmail2 = catchAsync(async (req, res) => {
  const { email, otp } = req.body;
  await AuthService.verifyEmail(email, otp);
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "Email verified successfully"
  });
});
var sendOtp2 = catchAsync(async (req, res) => {
  const { email } = req.body;
  await AuthService.sendOtp(email);
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "OTP sent to email successfully"
  });
});
var googleLogin = catchAsync((req, res) => {
  const callbackURL = `${envVars.BETTER_AUTH_URL}/api/v1/auth/google/success`;
  res.render("googleRedirect", {
    callbackURL,
    betterAuthUrl: envVars.BETTER_AUTH_URL
  });
});
var googleLoginSuccess2 = catchAsync(async (req, res) => {
  const redirectPath = req.query.redirect || "/dashboard";
  const sessionToken = req.cookies["better-auth.session_token"];
  if (!sessionToken) {
    return res.redirect(`${envVars.FRONTEND_URL}/login?error=oauth_failed`);
  }
  const session = await auth.api.getSession({
    headers: {
      "Cookie": `better-auth.session_token=${sessionToken}`
    }
  });
  if (!session) {
    return res.redirect(`${envVars.FRONTEND_URL}/login?error=no_session_found`);
  }
  if (session && !session.user) {
    return res.redirect(`${envVars.FRONTEND_URL}/login?error=no_user_found`);
  }
  const result = await AuthService.googleLoginSuccess(session);
  const { accessToken, refreshToken } = result;
  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  const isValidRedirectPath = redirectPath.startsWith("/") && !redirectPath.startsWith("//");
  const finalRedirectPath = isValidRedirectPath ? redirectPath : "/dashboard";
  res.redirect(`${envVars.FRONTEND_URL}${finalRedirectPath}`);
});
var handleOAuthError = catchAsync((req, res) => {
  const error = req.query.error || "oauth_failed";
  res.redirect(`${envVars.FRONTEND_URL}/login?error=${error}`);
});
var AuthController = {
  UserRegister: UserRegister2,
  loginUser: loginUser2,
  getMe: getMe2,
  changePassword: changePassword2,
  logoutUser: logoutUser2,
  forgetPassword: forgetPassword2,
  resetPassword: resetPassword2,
  verifyEmail: verifyEmail2,
  googleLogin,
  googleLoginSuccess: googleLoginSuccess2,
  handleOAuthError,
  sendOtp: sendOtp2
};

// src/app/module/auth/auth.validation.ts
import { z } from "zod";
var createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().optional(),
  image: z.any()
});

// src/app/middleware/validateRequest.ts
var validateRequest = (zodSchema) => {
  return (req, res, next) => {
    console.log(req.file, "file");
    if (req.body?.data) {
      try {
        req.body = JSON.parse(req.body.data);
      } catch (e2) {
        return next(new Error("Invalid JSON in 'data' field"));
      }
    }
    const parsedResult = zodSchema.safeParse(req.body);
    if (!parsedResult.success) {
      return next(parsedResult.error);
    }
    req.body = parsedResult.data;
    next();
  };
};

// src/app/middleware/Auth.ts
var auth2 = (roles) => {
  return async (req, res, next) => {
    try {
      console.log(roles, "roles");
      const sessionToken = CookieUtils.getCookie(req, "better-auth.session_token");
      console.log(sessionToken, "session");
      const accessToken = CookieUtils.getCookie(req, "accessToken");
      let isAuthenticated = false;
      if (sessionToken) {
        const betterSession = await auth.api.getSession({ headers: req.headers });
        if (betterSession && betterSession.session) {
          const sessionExists = await prisma.session.findFirst({
            where: {
              token: betterSession.session.token,
              expiresAt: { gt: /* @__PURE__ */ new Date() }
            },
            include: { user: true }
          });
          if (sessionExists && sessionExists.user) {
            const user = sessionExists.user;
            const now = /* @__PURE__ */ new Date();
            const expiresAt = new Date(sessionExists.expiresAt);
            const createdAt = new Date(sessionExists.createdAt);
            const sessionLifeTime = expiresAt.getTime() - createdAt.getTime();
            const timeRemaining = expiresAt.getTime() - now.getTime();
            const percentRemaining = timeRemaining / sessionLifeTime * 100;
            if (percentRemaining < 20) {
              res.setHeader("X-Session-Refresh", "true");
              res.setHeader("X-Session-Expires-At", expiresAt.toISOString());
            }
            if (roles.length > 0 && !roles.includes(user.role)) {
              throw new AppError_default(E.FORBIDDEN, "Forbidden access! No permission.");
            }
            req.user = { userId: user.id, role: user.role, email: user.email };
            isAuthenticated = true;
          }
        }
      }
      if (!isAuthenticated && accessToken) {
        const verifiedToken = jwtUtils.verifyToken(
          accessToken,
          process.env.ACCESS_TOKEN_SECRET
        );
        if (verifiedToken.success && verifiedToken.data) {
          const userData = verifiedToken.data;
          if (roles.length > 0 && !roles.includes(userData.role)) {
            throw new AppError_default(E.FORBIDDEN, "Forbidden access! No permission.");
          }
          req.user = {
            userId: userData.userId,
            role: userData.role,
            email: userData.email
          };
          isAuthenticated = true;
        }
      }
      if (!isAuthenticated) {
        throw new AppError_default(E.UNAUTHORIZED, "Unauthorized access! No valid session or token.");
      }
      next();
    } catch (error) {
      console.log(error, "message");
      throw new AppError_default(error.statusCode || E.BAD_REQUEST, error.message);
    }
  };
};
var Auth_default = auth2;

// src/app/lib/rateLimit.ts
import rateLimit, { ipKeyGenerator } from "express-rate-limit";
var createLimiter = (options) => {
  return rateLimit({
    windowMs: options.windowMs,
    keyGenerator: (req) => {
      return ipKeyGenerator(req.ip || "unknown-ip");
    },
    standardHeaders: true,
    legacyHeaders: false,
    limit: async (req) => {
      return options.limit;
    },
    handler: (_req, res) => {
      res.status(429).json({
        success: false,
        message: options.message
      });
    }
  });
};

// src/app/middleware/limitter.ts
var authLimiter = createLimiter({
  windowMs: 1 * 60 * 1e3,
  limit: 10,
  message: "Too many auth attempts"
});
var publicandprivateLimiter = createLimiter({
  windowMs: 1 * 60 * 1e3,
  limit: 20,
  message: "Too many requests on public route"
});

// src/app/module/auth/auth.route.ts
var router = Router();
router.post("/register", authLimiter, validateRequest(createUserSchema), AuthController.UserRegister);
router.post("/login", authLimiter, AuthController.loginUser);
router.get("/me", authLimiter, Auth_default([Role.ADMIN, Role.EMPLOYEE, Role.HR]), AuthController.getMe);
router.post("/change-password", authLimiter, Auth_default([Role.ADMIN, Role.EMPLOYEE, Role.HR]), AuthController.changePassword);
router.post("/logout", authLimiter, Auth_default([Role.ADMIN, Role.EMPLOYEE, Role.HR]), AuthController.logoutUser);
router.post("/forget-password", authLimiter, AuthController.forgetPassword);
router.post("/reset-password", authLimiter, AuthController.resetPassword);
router.post("/verify-email", authLimiter, AuthController.verifyEmail);
router.post("/send-otp", authLimiter, AuthController.sendOtp);
router.get("/login/google", authLimiter, AuthController.googleLogin);
router.get("/google/success", authLimiter, AuthController.googleLoginSuccess);
router.get("/oauth/error", AuthController.handleOAuthError);
var AuthRouters = router;

// src/app/module/employee/employee.route.ts
import { Router as Router2 } from "express";

// src/app/helpers/Pagination.ts
var paginationSortingHelper = (options) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 9;
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder
  };
};
var Pagination_default = paginationSortingHelper;

// src/app/module/employee/employee.service.ts
var getMyProfile = async (user) => {
  if (!user?.userId) {
    throw new AppError_default(E.UNAUTHORIZED, "Unauthorized access. Please login first.");
  }
  const employee = await prisma.employeeProfile.findUnique({
    where: { userId: user.userId },
    include: {
      user: { select: { id: true, email: true, role: true } },
      department: true,
      position: true,
      workSchedule: true
    }
  });
  if (!employee) {
    throw new AppError_default(E.NOT_FOUND, "Employee profile not found!");
  }
  return employee;
};
var createEmployeeProfile = async (user, payload) => {
  if (!user?.userId) {
    throw new AppError_default(E.UNAUTHORIZED, "Unauthorized access. Please login first.");
  }
  const targetUserId = payload.userId || user.userId;
  const { employeeId, ...restPayload } = payload;
  const userExist = await prisma.user.findUnique({
    where: { id: targetUserId },
    include: { employeeProfile: { select: { id: true } } }
  });
  const id = userExist?.employeeProfile?.id;
  if (!userExist) {
    throw new AppError_default(E.NOT_FOUND, "User account not found!");
  }
  if (userExist.employeeProfile) {
    throw new AppError_default(E.CONFLICT, "Employee profile already exists for this user!");
  }
  const isEmpIdExist = await prisma.employeeProfile.findUnique({
    where: { employeeId: id }
  });
  if (isEmpIdExist) {
    throw new AppError_default(E.CONFLICT, "Employee ID already exists!");
  }
  return await prisma.employeeProfile.create({
    data: {
      userId: targetUserId,
      employeeId,
      ...restPayload,
      dateOfBirth: restPayload.dateOfBirth ? new Date(restPayload.dateOfBirth) : void 0,
      joiningDate: new Date(restPayload.joiningDate)
    },
    include: {
      user: { select: { id: true, email: true, role: true } },
      department: true,
      position: true,
      workSchedule: true
    }
  });
};
var getAllEmployees = async (query) => {
  const { page, limit, skip, sortBy, sortOrder } = Pagination_default(query);
  const { searchTerm, departmentId, positionId } = query;
  const whereConditions = {};
  if (searchTerm) {
    whereConditions.OR = [
      { firstName: { contains: searchTerm, mode: "insensitive" } },
      { lastName: { contains: searchTerm, mode: "insensitive" } },
      { employeeId: { contains: searchTerm, mode: "insensitive" } },
      { phone: { contains: searchTerm, mode: "insensitive" } },
      { user: { email: { contains: searchTerm, mode: "insensitive" } } }
    ];
  }
  if (departmentId) whereConditions.departmentId = departmentId;
  if (positionId) whereConditions.positionId = positionId;
  const [data, total] = await Promise.all([
    prisma.employeeProfile.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      include: {
        user: { select: { id: true, email: true, role: true } },
        department: true,
        position: true,
        workSchedule: true
      }
    }),
    prisma.employeeProfile.count({ where: whereConditions })
  ]);
  return {
    meta: { page, limit, total, totalPage: Math.ceil(total / limit) },
    data
  };
};
var updateEmployeeProfile = async (id, payload) => {
  if (!id) {
    throw new AppError_default(E.BAD_REQUEST, "Employee Profile ID is required!");
  }
  const isExist = await prisma.employeeProfile.findUnique({ where: { id } });
  if (!isExist) {
    throw new AppError_default(E.NOT_FOUND, "Employee profile not found!");
  }
  return await prisma.employeeProfile.update({
    where: { id },
    data: {
      ...payload,
      dateOfBirth: payload.dateOfBirth ? new Date(payload.dateOfBirth) : void 0,
      joiningDate: payload.joiningDate ? new Date(payload.joiningDate) : void 0
    },
    include: {
      department: true,
      position: true,
      workSchedule: true
    }
  });
};
var EmployeeService = {
  getMyProfile,
  createEmployeeProfile,
  getAllEmployees,
  updateEmployeeProfile
};

// src/app/module/employee/employee.controller.ts
var getMyProfile2 = catchAsync(async (req, res) => {
  const result = await EmployeeService.getMyProfile(req.user);
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "Profile retrieved successfully",
    data: result
  });
});
var createEmployeeProfile2 = catchAsync(async (req, res) => {
  const result = await EmployeeService.createEmployeeProfile(req.user, req.body);
  sendResponse(res, {
    httpStatusCode: E.CREATED,
    success: true,
    message: "Employee profile created successfully",
    data: result
  });
});
var getAllEmployees2 = catchAsync(async (req, res) => {
  const result = await EmployeeService.getAllEmployees(req.query);
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "Employees fetched successfully",
    data: result.data
  });
});
var updateEmployeeProfile2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EmployeeService.updateEmployeeProfile(id, req.body);
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "Employee profile updated successfully",
    data: result
  });
});
var EmployeeController = {
  getMyProfile: getMyProfile2,
  createEmployeeProfile: createEmployeeProfile2,
  getAllEmployees: getAllEmployees2,
  updateEmployeeProfile: updateEmployeeProfile2
};

// src/app/module/employee/employee.validation.ts
import { z as z2 } from "zod";
var createEmployeeSchema = z2.object({
  userId: z2.string().uuid("Invalid User ID format").optional(),
  employeeId: z2.string().min(1, "Employee ID cannot be empty"),
  firstName: z2.string().min(1, "First name cannot be empty"),
  lastName: z2.string().min(1, "Last name cannot be empty"),
  phone: z2.string().optional(),
  gender: z2.nativeEnum(Gender).optional(),
  dateOfBirth: z2.string().datetime().or(z2.date()).optional(),
  joiningDate: z2.string().datetime().or(z2.date()),
  departmentId: z2.string().uuid("Invalid Department ID").optional(),
  positionId: z2.string().uuid("Invalid Position ID").optional(),
  employmentType: z2.nativeEnum(EmploymentType).optional(),
  workScheduleId: z2.string().uuid("Invalid Work Schedule ID").optional()
});
var updateEmployeeSchema = createEmployeeSchema.partial().omit({
  userId: true,
  employeeId: true
});
var employeeQuerySchema = z2.object({
  page: z2.string().optional(),
  limit: z2.string().optional(),
  searchTerm: z2.string().optional(),
  departmentId: z2.string().uuid().optional(),
  positionId: z2.string().uuid().optional(),
  sortBy: z2.string().optional(),
  sortOrder: z2.enum(["asc", "desc"]).optional()
});

// src/app/module/employee/employee.route.ts
var router2 = Router2();
router2.get(
  "/me",
  Auth_default([Role.ADMIN, Role.HR, Role.EMPLOYEE]),
  EmployeeController.getMyProfile
);
router2.post(
  "/create-profile",
  Auth_default([Role.ADMIN, Role.HR, Role.EMPLOYEE]),
  validateRequest(createEmployeeSchema),
  EmployeeController.createEmployeeProfile
);
router2.get(
  "/",
  Auth_default([Role.ADMIN, Role.HR]),
  EmployeeController.getAllEmployees
);
router2.patch(
  "/:id",
  Auth_default([Role.ADMIN, Role.HR]),
  validateRequest(updateEmployeeSchema),
  EmployeeController.updateEmployeeProfile
);
var EmployeeRoutes = router2;

// src/app/module/attendance/attendance.route.ts
import { Router as Router3 } from "express";

// src/app/module/attendance/attendance.service.ts
var checkIn = async (user, payload) => {
  if (!user?.userId) {
    throw new AppError_default(E.UNAUTHORIZED, "Unauthorized access. Please login first.");
  }
  const employee = await prisma.employeeProfile.findUnique({
    where: { userId: user.userId }
  });
  if (!employee) {
    throw new AppError_default(E.NOT_FOUND, "Employee profile not found!");
  }
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const existingAttendance = await prisma.attendance.findUnique({
    where: {
      employeeId_date: {
        employeeId: employee.id,
        date: today
      }
    }
  });
  if (existingAttendance?.checkIn) {
    throw new AppError_default(E.BAD_REQUEST, "You have already checked in today!");
  }
  const now = /* @__PURE__ */ new Date();
  const officeStartTime = /* @__PURE__ */ new Date();
  officeStartTime.setHours(9, 0, 0, 0);
  let lateMinutes = 0;
  let attendanceStatus = AttendanceStatus.PRESENT;
  if (now > officeStartTime) {
    lateMinutes = Math.floor((now.getTime() - officeStartTime.getTime()) / (1e3 * 60));
    attendanceStatus = AttendanceStatus.LATE;
  }
  return await prisma.attendance.upsert({
    where: {
      employeeId_date: {
        employeeId: employee.id,
        date: today
      }
    },
    update: {
      checkIn: now,
      status: attendanceStatus,
      lateMinutes,
      checkInIp: payload.checkInIp,
      notes: payload.notes
    },
    create: {
      employeeId: employee.id,
      date: today,
      checkIn: now,
      status: attendanceStatus,
      lateMinutes,
      checkInIp: payload.checkInIp,
      notes: payload.notes
    }
  });
};
var checkOut = async (user, payload) => {
  if (!user?.userId) {
    throw new AppError_default(E.UNAUTHORIZED, "Unauthorized access. Please login first.");
  }
  const employee = await prisma.employeeProfile.findUnique({
    where: { userId: user.userId }
  });
  if (!employee) {
    throw new AppError_default(E.NOT_FOUND, "Employee profile not found!");
  }
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const attendance = await prisma.attendance.findUnique({
    where: {
      employeeId_date: {
        employeeId: employee.id,
        date: today
      }
    }
  });
  if (!attendance || !attendance.checkIn) {
    throw new AppError_default(E.BAD_REQUEST, "You cannot check out without checking in first!");
  }
  if (attendance.checkOut) {
    throw new AppError_default(E.BAD_REQUEST, "You have already checked out today!");
  }
  const checkOutTime = /* @__PURE__ */ new Date();
  const diffInMs = checkOutTime.getTime() - new Date(attendance.checkIn).getTime();
  const totalHours = parseFloat((diffInMs / (1e3 * 60 * 60)).toFixed(2));
  const standardWorkHours = 8;
  const overtimeHours = totalHours > standardWorkHours ? parseFloat((totalHours - standardWorkHours).toFixed(2)) : 0;
  return await prisma.attendance.update({
    where: { id: attendance.id },
    data: {
      checkOut: checkOutTime,
      workingHours: totalHours,
      overtimeHours,
      checkOutIp: payload.checkOutIp,
      notes: payload.notes ? `${attendance.notes || ""} | Out Note: ${payload.notes}` : attendance.notes
    }
  });
};
var getMyAttendanceHistory = async (user, query) => {
  if (!user?.userId) {
    throw new AppError_default(E.UNAUTHORIZED, "Unauthorized access. Please login first.");
  }
  const employee = await prisma.employeeProfile.findUnique({
    where: { userId: user.userId }
  });
  if (!employee) {
    throw new AppError_default(E.NOT_FOUND, "Employee profile not found!");
  }
  const { page, limit, skip, sortBy, sortOrder } = Pagination_default(query);
  const { startDate, endDate, status: attendanceStatus } = query;
  const whereConditions = { employeeId: employee.id };
  if (startDate && endDate) {
    whereConditions.date = {
      gte: new Date(startDate),
      lte: new Date(endDate)
    };
  }
  if (attendanceStatus) {
    whereConditions.status = attendanceStatus;
  }
  const [data, total] = await Promise.all([
    prisma.attendance.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder }
    }),
    prisma.attendance.count({ where: whereConditions })
  ]);
  return {
    meta: { page, limit, total, totalPage: Math.ceil(total / limit) },
    data
  };
};
var AttendanceService = {
  checkIn,
  checkOut,
  getMyAttendanceHistory
};

// src/app/module/attendance/attendance.controller.ts
var checkIn2 = catchAsync(async (req, res) => {
  const result = await AttendanceService.checkIn(req.user, req.body);
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "Checked in successfully",
    data: result
  });
});
var checkOut2 = catchAsync(async (req, res) => {
  const result = await AttendanceService.checkOut(req.user, req.body);
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "Checked out successfully",
    data: result
  });
});
var getMyAttendanceHistory2 = catchAsync(async (req, res) => {
  const result = await AttendanceService.getMyAttendanceHistory(req.user, req.query);
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "Attendance history retrieved successfully",
    data: result.data
  });
});
var AttendanceController = {
  checkIn: checkIn2,
  checkOut: checkOut2,
  getMyAttendanceHistory: getMyAttendanceHistory2
};

// src/app/module/attendance/attendance.validation.ts
import { z as z3 } from "zod";
var checkInSchema = z3.object({
  notes: z3.string().optional(),
  checkInIp: z3.string().optional()
});
var checkOutSchema = z3.object({
  notes: z3.string().optional(),
  checkOutIp: z3.string().optional()
});
var attendanceQuerySchema = z3.object({
  page: z3.string().optional(),
  limit: z3.string().optional(),
  startDate: z3.string().optional(),
  endDate: z3.string().optional(),
  status: z3.nativeEnum(AttendanceStatus).optional(),
  employeeId: z3.string().uuid().optional(),
  sortBy: z3.string().optional(),
  sortOrder: z3.enum(["asc", "desc"]).optional()
});

// src/app/module/attendance/attendance.route.ts
var router3 = Router3();
router3.post(
  "/check-in",
  Auth_default([Role.ADMIN, Role.HR, Role.EMPLOYEE]),
  validateRequest(checkInSchema),
  AttendanceController.checkIn
);
router3.patch(
  "/check-out",
  Auth_default([Role.ADMIN, Role.HR, Role.EMPLOYEE]),
  validateRequest(checkOutSchema),
  AttendanceController.checkOut
);
router3.get(
  "/my-history",
  Auth_default([Role.ADMIN, Role.HR, Role.EMPLOYEE]),
  AttendanceController.getMyAttendanceHistory
);
var AttendanceRoutes = router3;

// src/app/module/department/department-position.route.ts
import { Router as Router4 } from "express";

// src/app/module/department/department-position.service.ts
var createDepartment = async (payload) => {
  const isExist = await prisma.department.findFirst({
    where: {
      OR: [{ name: payload.name }, { code: payload.code }]
    }
  });
  if (isExist) {
    throw new AppError_default(E.CONFLICT, "Department with this name or code already exists!");
  }
  return await prisma.department.create({ data: payload });
};
var getAllDepartments = async () => {
  return await prisma.department.findMany({
    include: {
      positions: true,
      _count: { select: { employees: true } }
    }
  });
};
var updateDepartment = async (id, payload) => {
  const department = await prisma.department.findUnique({ where: { id } });
  if (!department) {
    throw new AppError_default(E.NOT_FOUND, "Department not found!");
  }
  return await prisma.department.update({
    where: { id },
    data: payload
  });
};
var deleteDepartment = async (id) => {
  const department = await prisma.department.findUnique({ where: { id } });
  if (!department) {
    throw new AppError_default(E.NOT_FOUND, "Department not found!");
  }
  return await prisma.department.delete({ where: { id } });
};
var createPosition = async (payload) => {
  const department = await prisma.department.findUnique({
    where: { id: payload.departmentId }
  });
  if (!department) {
    throw new AppError_default(E.NOT_FOUND, "Department not found!");
  }
  const isExist = await prisma.position.findUnique({
    where: {
      title_departmentId: {
        title: payload.title,
        departmentId: payload.departmentId
      }
    }
  });
  if (isExist) {
    throw new AppError_default(E.CONFLICT, "Position title already exists in this department!");
  }
  return await prisma.position.create({
    data: payload,
    include: { department: true }
  });
};
var getAllPositions = async () => {
  return await prisma.position.findMany({
    include: {
      department: true,
      _count: { select: { employees: true } }
    }
  });
};
var updatePosition = async (id, payload) => {
  const position = await prisma.position.findUnique({ where: { id } });
  if (!position) {
    throw new AppError_default(E.NOT_FOUND, "Position not found!");
  }
  return await prisma.position.update({
    where: { id },
    data: payload,
    include: { department: true }
  });
};
var deletePosition = async (id) => {
  const position = await prisma.position.findUnique({ where: { id } });
  if (!position) {
    throw new AppError_default(E.NOT_FOUND, "Position not found!");
  }
  return await prisma.position.delete({ where: { id } });
};
var DepartmentPositionService = {
  createDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
  createPosition,
  getAllPositions,
  updatePosition,
  deletePosition
};

// src/app/module/department/department-position.controller.ts
var createDepartment2 = catchAsync(async (req, res) => {
  const result = await DepartmentPositionService.createDepartment(req.body);
  sendResponse(res, {
    httpStatusCode: E.CREATED,
    success: true,
    message: "Department created successfully",
    data: result
  });
});
var getAllDepartments2 = catchAsync(async (req, res) => {
  const result = await DepartmentPositionService.getAllDepartments();
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "Departments fetched successfully",
    data: result
  });
});
var updateDepartment2 = catchAsync(async (req, res) => {
  const result = await DepartmentPositionService.updateDepartment(req.params.id, req.body);
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "Department updated successfully",
    data: result
  });
});
var deleteDepartment2 = catchAsync(async (req, res) => {
  const result = await DepartmentPositionService.deleteDepartment(req.params.id);
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "Department deleted successfully",
    data: result
  });
});
var createPosition2 = catchAsync(async (req, res) => {
  const result = await DepartmentPositionService.createPosition(req.body);
  sendResponse(res, {
    httpStatusCode: E.CREATED,
    success: true,
    message: "Position created successfully",
    data: result
  });
});
var getAllPositions2 = catchAsync(async (req, res) => {
  const result = await DepartmentPositionService.getAllPositions();
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "Positions fetched successfully",
    data: result
  });
});
var updatePosition2 = catchAsync(async (req, res) => {
  const result = await DepartmentPositionService.updatePosition(req.params.id, req.body);
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "Position updated successfully",
    data: result
  });
});
var deletePosition2 = catchAsync(async (req, res) => {
  const result = await DepartmentPositionService.deletePosition(req.params.id);
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "Position deleted successfully",
    data: result
  });
});
var DepartmentPositionController = {
  createDepartment: createDepartment2,
  getAllDepartments: getAllDepartments2,
  updateDepartment: updateDepartment2,
  deleteDepartment: deleteDepartment2,
  createPosition: createPosition2,
  getAllPositions: getAllPositions2,
  updatePosition: updatePosition2,
  deletePosition: deletePosition2
};

// src/app/module/department/department-position.validation.ts
import { z as z4 } from "zod";
var createDepartmentSchema = z4.object({
  name: z4.string().min(1),
  code: z4.string().min(1),
  description: z4.string().optional()
});
var updateDepartmentSchema = createDepartmentSchema.partial();
var createPositionSchema = z4.object({
  title: z4.string().min(1),
  departmentId: z4.string().uuid("Invalid Department ID")
});
var updatePositionSchema = createPositionSchema.partial();

// src/app/module/department/department-position.route.ts
var router4 = Router4();
router4.post(
  "/departments",
  Auth_default([Role.ADMIN, Role.HR]),
  validateRequest(createDepartmentSchema),
  DepartmentPositionController.createDepartment
);
router4.get(
  "/departments",
  Auth_default([Role.ADMIN, Role.HR, Role.EMPLOYEE]),
  DepartmentPositionController.getAllDepartments
);
router4.patch(
  "/departments/:id",
  Auth_default([Role.ADMIN, Role.HR]),
  validateRequest(updateDepartmentSchema),
  DepartmentPositionController.updateDepartment
);
router4.delete(
  "/departments/:id",
  Auth_default([Role.ADMIN]),
  DepartmentPositionController.deleteDepartment
);
router4.post(
  "/positions",
  Auth_default([Role.ADMIN, Role.HR]),
  validateRequest(createPositionSchema),
  DepartmentPositionController.createPosition
);
router4.get(
  "/positions",
  Auth_default([Role.ADMIN, Role.HR, Role.EMPLOYEE]),
  DepartmentPositionController.getAllPositions
);
router4.patch(
  "/positions/:id",
  Auth_default([Role.ADMIN, Role.HR]),
  validateRequest(updatePositionSchema),
  DepartmentPositionController.updatePosition
);
router4.delete(
  "/positions/:id",
  Auth_default([Role.ADMIN]),
  DepartmentPositionController.deletePosition
);
var DepartmentPositionRoutes = router4;

// src/app/module/leave/leave-request.route.ts
import { Router as Router5 } from "express";

// src/app/module/leave/leave-request.interface.service.ts
var createLeaveRequest = async (user, payload) => {
  if (!user?.userId) {
    throw new AppError_default(E.UNAUTHORIZED, "Unauthorized access. Please login first.");
  }
  const employee = await prisma.employeeProfile.findUnique({
    where: { userId: user.userId }
  });
  if (!employee) {
    throw new AppError_default(E.NOT_FOUND, "Employee profile not found!");
  }
  const start = new Date(payload.startDate);
  const end = new Date(payload.endDate);
  if (start > end) {
    throw new AppError_default(E.BAD_REQUEST, "Start date cannot be after end date!");
  }
  const timeDiff = Math.abs(end.getTime() - start.getTime());
  const totalDays = Math.ceil(timeDiff / (1e3 * 3600 * 24)) + 1;
  const existingLeave = await prisma.leaveRequest.findFirst({
    where: {
      employeeId: employee.id,
      status: { in: [LeaveStatus.PENDING, LeaveStatus.APPROVED] },
      OR: [
        { startDate: { lte: end }, endDate: { gte: start } }
      ]
    }
  });
  if (existingLeave) {
    throw new AppError_default(E.CONFLICT, "You already have a pending or approved leave request during this date range!");
  }
  return await prisma.leaveRequest.create({
    data: {
      employeeId: employee.id,
      leaveType: payload.leaveType,
      startDate: start,
      endDate: end,
      totalDays,
      reason: payload.reason
    },
    include: {
      employee: { select: { id: true, firstName: true, lastName: true, employeeId: true } }
    }
  });
};
var getMyLeaveRequests = async (user, query) => {
  if (!user?.userId) {
    throw new AppError_default(E.UNAUTHORIZED, "Unauthorized access. Please login first.");
  }
  const employee = await prisma.employeeProfile.findUnique({
    where: { userId: user.userId }
  });
  if (!employee) {
    throw new AppError_default(E.NOT_FOUND, "Employee profile not found!");
  }
  const { page, limit, skip, sortBy, sortOrder } = Pagination_default(query);
  const { status: leaveStatus, leaveType } = query;
  const whereConditions = { employeeId: employee.id };
  if (leaveStatus) whereConditions.status = leaveStatus;
  if (leaveType) whereConditions.leaveType = leaveType;
  const [data, total] = await Promise.all([
    prisma.leaveRequest.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      include: {
        approvedBy: { select: { id: true, email: true, role: true } }
      }
    }),
    prisma.leaveRequest.count({ where: whereConditions })
  ]);
  return {
    meta: { page, limit, total, totalPage: Math.ceil(total / limit) },
    data
  };
};
var getAllLeaveRequests = async (query) => {
  const { page, limit, skip, sortBy, sortOrder } = Pagination_default(query);
  const { status: leaveStatus, leaveType, employeeId } = query;
  const whereConditions = {};
  if (leaveStatus) whereConditions.status = leaveStatus;
  if (leaveType) whereConditions.leaveType = leaveType;
  if (employeeId) whereConditions.employeeId = employeeId;
  const [data, total] = await Promise.all([
    prisma.leaveRequest.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      include: {
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            employeeId: true,
            department: { select: { name: true } }
          }
        },
        approvedBy: { select: { id: true, email: true, role: true } }
      }
    }),
    prisma.leaveRequest.count({ where: whereConditions })
  ]);
  return {
    meta: { page, limit, total, totalPage: Math.ceil(total / limit) },
    data
  };
};
var updateLeaveStatus = async (user, requestId, payload) => {
  if (!user?.userId) {
    throw new AppError_default(E.UNAUTHORIZED, "Unauthorized access. Please login first.");
  }
  const leaveRequest = await prisma.leaveRequest.findUnique({
    where: { id: requestId }
  });
  if (!leaveRequest) {
    throw new AppError_default(E.NOT_FOUND, "Leave request not found!");
  }
  return await prisma.leaveRequest.update({
    where: { id: requestId },
    data: {
      status: payload.status,
      adminRemarks: payload.adminRemarks,
      approvedById: user.userId
    },
    include: {
      employee: true,
      approvedBy: { select: { id: true, email: true, role: true } }
    }
  });
};
var LeaveRequestService = {
  createLeaveRequest,
  getMyLeaveRequests,
  getAllLeaveRequests,
  updateLeaveStatus
};

// src/app/module/leave/leave-request.controller.ts
var createLeaveRequest2 = catchAsync(async (req, res) => {
  const result = await LeaveRequestService.createLeaveRequest(req.user, req.body);
  sendResponse(res, {
    httpStatusCode: E.CREATED,
    success: true,
    message: "Leave request submitted successfully",
    data: result
  });
});
var getMyLeaveRequests2 = catchAsync(async (req, res) => {
  const result = await LeaveRequestService.getMyLeaveRequests(req.user, req.query);
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "My leave requests fetched successfully",
    data: result.data
  });
});
var getAllLeaveRequests2 = catchAsync(async (req, res) => {
  const result = await LeaveRequestService.getAllLeaveRequests(req.query);
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "All leave requests fetched successfully",
    data: result.data
  });
});
var updateLeaveStatus2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await LeaveRequestService.updateLeaveStatus(req.user, id, req.body);
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: `Leave request status updated to ${req.body.status}`,
    data: result
  });
});
var LeaveRequestController = {
  createLeaveRequest: createLeaveRequest2,
  getMyLeaveRequests: getMyLeaveRequests2,
  getAllLeaveRequests: getAllLeaveRequests2,
  updateLeaveStatus: updateLeaveStatus2
};

// src/app/module/leave/leave-request.validation.ts
import { z as z5 } from "zod";
var createLeaveRequestSchema = z5.object({
  leaveType: z5.nativeEnum(LeaveType),
  startDate: z5.string().datetime().or(z5.date()),
  endDate: z5.string().datetime().or(z5.date()),
  reason: z5.string().min(5, "Reason must be at least 5 characters long")
});
var updateLeaveStatusSchema = z5.object({
  status: z5.enum([LeaveStatus.APPROVED, LeaveStatus.REJECTED, LeaveStatus.PENDING]),
  adminRemarks: z5.string().optional()
});
var leaveRequestQuerySchema = z5.object({
  page: z5.string().optional(),
  limit: z5.string().optional(),
  status: z5.nativeEnum(LeaveStatus).optional(),
  leaveType: z5.nativeEnum(LeaveType).optional(),
  employeeId: z5.string().uuid().optional(),
  sortBy: z5.string().optional(),
  sortOrder: z5.enum(["asc", "desc"]).optional()
});

// src/app/module/leave/leave-request.route.ts
var router5 = Router5();
router5.post(
  "/",
  Auth_default([Role.ADMIN, Role.HR, Role.EMPLOYEE]),
  validateRequest(createLeaveRequestSchema),
  LeaveRequestController.createLeaveRequest
);
router5.get(
  "/my-requests",
  Auth_default([Role.ADMIN, Role.HR, Role.EMPLOYEE]),
  LeaveRequestController.getMyLeaveRequests
);
router5.get(
  "/",
  Auth_default([Role.ADMIN, Role.HR]),
  LeaveRequestController.getAllLeaveRequests
);
router5.patch(
  "/:id/status",
  Auth_default([Role.ADMIN, Role.HR]),
  validateRequest(updateLeaveStatusSchema),
  LeaveRequestController.updateLeaveStatus
);
var LeaveRequestRoutes = router5;

// src/app/module/schedule/schedule-holiday.route.ts
import { Router as Router6 } from "express";

// src/app/module/schedule/schedule-holiday.service.ts
var createWorkSchedule = async (payload) => {
  const isExist = await prisma.workSchedule.findUnique({
    where: { name: payload.name }
  });
  if (isExist) {
    throw new AppError_default(E.CONFLICT, "Work schedule with this name already exists!");
  }
  return await prisma.workSchedule.create({
    data: payload
  });
};
var getAllWorkSchedules = async () => {
  return await prisma.workSchedule.findMany({
    include: {
      _count: { select: { employees: true } }
    }
  });
};
var updateWorkSchedule = async (id, payload) => {
  const isExist = await prisma.workSchedule.findUnique({ where: { id } });
  if (!isExist) {
    throw new AppError_default(E.NOT_FOUND, "Work schedule not found!");
  }
  return await prisma.workSchedule.update({
    where: { id },
    data: payload
  });
};
var deleteWorkSchedule = async (id) => {
  const isExist = await prisma.workSchedule.findUnique({
    where: { id },
    include: { _count: { select: { employees: true } } }
  });
  if (!isExist) {
    throw new AppError_default(E.NOT_FOUND, "Work schedule not found!");
  }
  if (isExist._count.employees > 0) {
    throw new AppError_default(E.BAD_REQUEST, "Cannot delete work schedule assigned to active employees!");
  }
  return await prisma.workSchedule.delete({ where: { id } });
};
var createHoliday = async (payload) => {
  const holidayDate = new Date(payload.date);
  holidayDate.setHours(0, 0, 0, 0);
  const isExist = await prisma.holiday.findUnique({
    where: { date: holidayDate }
  });
  if (isExist) {
    throw new AppError_default(E.CONFLICT, "A holiday is already added for this date!");
  }
  return await prisma.holiday.create({
    data: {
      ...payload,
      date: holidayDate
    }
  });
};
var getAllHolidays = async () => {
  return await prisma.holiday.findMany({
    orderBy: { date: "asc" }
  });
};
var updateHoliday = async (id, payload) => {
  const isExist = await prisma.holiday.findUnique({ where: { id } });
  if (!isExist) {
    throw new AppError_default(E.NOT_FOUND, "Holiday not found!");
  }
  return await prisma.holiday.update({
    where: { id },
    data: {
      ...payload,
      date: payload.date ? new Date(payload.date) : void 0
    }
  });
};
var deleteHoliday = async (id) => {
  const isExist = await prisma.holiday.findUnique({ where: { id } });
  if (!isExist) {
    throw new AppError_default(E.NOT_FOUND, "Holiday not found!");
  }
  return await prisma.holiday.delete({ where: { id } });
};
var ScheduleHolidayService = {
  createWorkSchedule,
  getAllWorkSchedules,
  updateWorkSchedule,
  deleteWorkSchedule,
  createHoliday,
  getAllHolidays,
  updateHoliday,
  deleteHoliday
};

// src/app/module/schedule/schedule-holiday.controller.ts
var createWorkSchedule2 = catchAsync(async (req, res) => {
  const result = await ScheduleHolidayService.createWorkSchedule(req.body);
  sendResponse(res, {
    httpStatusCode: E.CREATED,
    success: true,
    message: "Work schedule created successfully",
    data: result
  });
});
var getAllWorkSchedules2 = catchAsync(async (req, res) => {
  const result = await ScheduleHolidayService.getAllWorkSchedules();
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "Work schedules fetched successfully",
    data: result
  });
});
var updateWorkSchedule2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ScheduleHolidayService.updateWorkSchedule(id, req.body);
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "Work schedule updated successfully",
    data: result
  });
});
var deleteWorkSchedule2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ScheduleHolidayService.deleteWorkSchedule(id);
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "Work schedule deleted successfully",
    data: result
  });
});
var createHoliday2 = catchAsync(async (req, res) => {
  const result = await ScheduleHolidayService.createHoliday(req.body);
  sendResponse(res, {
    httpStatusCode: E.CREATED,
    success: true,
    message: "Holiday created successfully",
    data: result
  });
});
var getAllHolidays2 = catchAsync(async (req, res) => {
  const result = await ScheduleHolidayService.getAllHolidays();
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "Holidays fetched successfully",
    data: result
  });
});
var updateHoliday2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ScheduleHolidayService.updateHoliday(id, req.body);
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "Holiday updated successfully",
    data: result
  });
});
var deleteHoliday2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ScheduleHolidayService.deleteHoliday(id);
  sendResponse(res, {
    httpStatusCode: E.OK,
    success: true,
    message: "Holiday deleted successfully",
    data: result
  });
});
var ScheduleHolidayController = {
  createWorkSchedule: createWorkSchedule2,
  getAllWorkSchedules: getAllWorkSchedules2,
  updateWorkSchedule: updateWorkSchedule2,
  deleteWorkSchedule: deleteWorkSchedule2,
  createHoliday: createHoliday2,
  getAllHolidays: getAllHolidays2,
  updateHoliday: updateHoliday2,
  deleteHoliday: deleteHoliday2
};

// src/app/module/schedule/schedule-holiday.validation.ts
import { z as z6 } from "zod";
var timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
var createWorkScheduleSchema = z6.object({
  name: z6.string().min(1),
  startTime: z6.string().regex(timeRegex, "Invalid time format. Use HH:mm (e.g. 09:00)"),
  endTime: z6.string().regex(timeRegex, "Invalid time format. Use HH:mm (e.g. 17:00)"),
  graceMinutes: z6.number().int().nonnegative().optional(),
  workDays: z6.array(z6.number().int().min(1, "Day must be between 1 and 7").max(7, "Day must be between 1 and 7")).min(1, "At least one work day must be selected")
});
var updateWorkScheduleSchema = createWorkScheduleSchema.partial();
var createHolidaySchema = z6.object({
  title: z6.string().min(1),
  date: z6.string().datetime().or(z6.date()),
  description: z6.string().optional()
});
var updateHolidaySchema = createHolidaySchema.partial();

// src/app/module/schedule/schedule-holiday.route.ts
var router6 = Router6();
router6.post(
  "/work-schedules",
  Auth_default([Role.ADMIN, Role.HR]),
  validateRequest(createWorkScheduleSchema),
  ScheduleHolidayController.createWorkSchedule
);
router6.get(
  "/work-schedules",
  Auth_default([Role.ADMIN, Role.HR, Role.EMPLOYEE]),
  ScheduleHolidayController.getAllWorkSchedules
);
router6.patch(
  "/work-schedules/:id",
  Auth_default([Role.ADMIN, Role.HR]),
  validateRequest(updateWorkScheduleSchema),
  ScheduleHolidayController.updateWorkSchedule
);
router6.delete(
  "/work-schedules/:id",
  Auth_default([Role.ADMIN]),
  ScheduleHolidayController.deleteWorkSchedule
);
router6.post(
  "/holidays",
  Auth_default([Role.ADMIN, Role.HR]),
  validateRequest(createHolidaySchema),
  ScheduleHolidayController.createHoliday
);
router6.get(
  "/holidays",
  Auth_default([Role.ADMIN, Role.HR, Role.EMPLOYEE]),
  ScheduleHolidayController.getAllHolidays
);
router6.patch(
  "/holidays/:id",
  Auth_default([Role.ADMIN, Role.HR]),
  validateRequest(updateHolidaySchema),
  ScheduleHolidayController.updateHoliday
);
router6.delete(
  "/holidays/:id",
  Auth_default([Role.ADMIN, Role.HR]),
  ScheduleHolidayController.deleteHoliday
);
var ScheduleHolidayRoutes = router6;

// src/app/router/index.route.ts
var router7 = Router7();
router7.use("/v1/employee", EmployeeRoutes);
router7.use("/v1/attendance", AttendanceRoutes);
router7.use("/v1/auth", AuthRouters);
router7.use("/v1/department", DepartmentPositionRoutes);
router7.use("/v1/leave", LeaveRequestRoutes);
router7.use("/v1/schedule", ScheduleHolidayRoutes);
var IndexRouter = router7;

// src/app.ts
var app = express();
app.use("/api/auth", toNodeHandler(auth));
app.set("view engine", "ejs");
app.set("views", path2.resolve(process.cwd(), `src/app/templates`));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  pinoHttp({
    logger,
    customProps: (req) => ({
      method: req.method,
      url: req.url,
      ip: req.ip,
      userId: req.user?.id || "guest"
    })
  })
);
app.use((0, import_cors.default)());
app.use(express.json());
initsentry();
app.use("/api", IndexRouter);
app.use("/", (req, res) => {
  res.status(200).json({ success: true, message: "home route" });
});
var app_default = app;

// src/server.ts
var server;
var port = 5e3;
var bootstrap = async () => {
  try {
    server = app_default.listen(envVars.PORT, () => {
      console.info("Server started on port 5000");
      console.info(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error({ error }, "Failed to start server");
  }
};
process.on("uncaughtException", (error) => {
  console.error({ error }, "Uncaught exception detected, shutting down server");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("unhandledRejection", (error) => {
  console.error({ error }, "Unhandled rejection detected, shutting down server");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});
process.on("SIGTERM", (error) => {
  console.warn({ error }, "SIGTERM detected, shutting down server");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
bootstrap();
/*! Bundled license information:

object-assign/index.js:
  (*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  *)

vary/index.js:
  (*!
   * vary
   * Copyright(c) 2014-2017 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
