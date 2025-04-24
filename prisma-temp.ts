// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
    provider = "prisma-client-js"
    output   = "../src/generated/prisma"
  }
  
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }
  
  model User {
    id           String     @id @default(cuid())
    fullname     String?
    username     String
    email        String
    hashPassword String
    role         Role       @default(STAFF)
    department   Department @default(UNASSIGN)
    icNo         String?
    epfNo        String?
    socsoNo      String?
    phoneNo      String?
    addressLine1 String?
    addressLine2 String?
    addressLine3 String?
    poscode      String?
    city         String?
    state        String?
  
    session Session[]
    store   Store?
  }
  
  model Session {
    id        String   @id
    userId    String
    expiresAt DateTime
  
    user User @relation(fields: [userId], references: [id])
  }
  
  enum Role {
    SUPERADMIN
    DIRECTOR
    MANAGER
    ADMIN
    STAFF
  }
  
  enum Department {
    UNASSIGN
    MANAGEMENT
    SALES
    MARKETING
    LOGISTIC
  }
  
  model Supplier {
    id           String  @id @default(cuid())
    supplierName String
    phone        String?
    email        String?
    addressLine1 String
    addressLine2 String
    addressLine3 String?
    poscode      String
    city         String
    country      String
  
    // relationship
    products Product[]
  }
  
  model Product {
    id          String @id @default(cuid())
    productCode String @unique
    description String
    unitPrice   Int
    oum         String
  
    // relationship
    supplierId String
    supplier   Supplier @relation(fields: [supplierId], references: [id])
    stocks     Stock[]
  
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }
  
  model Store {
    id           String  @id @default(cuid())
    storeName    String  @unique
    addressLine1 String
    addressLine2 String
    addressLine3 String?
    poscode      String
    city         String
    state        String
  
    userId String  @unique
    user   User    @relation(fields: [userId], references: [id])
    stocks Stock[]
  
    createdAt DateTime @default(now())
    updateAt  DateTime @updatedAt
  }
  
  model Stock {
    id              String    @id @default(cuid())
    lotNo           String?
    manufactureDate DateTime?
    expiredDate     DateTime?
    qty             Int
    // relationship
    productId       String
    products        Product   @relation(fields: [productId], references: [id])
  
    stores Store[]
  
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }
  