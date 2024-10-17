echo "Installing dependencies..."
npm install

echo "Cleaning previous build..."
rm -rf .next

echo "Building the Next.js app..."
npm run build

# Проверка успешности сборки
if [ $? -eq 0 ]; then
  echo "Build successful!"
else
  echo "Build failed!"
  exit 1
fi

echo "Copying static files..."
cp -R public/ out/public/

echo "Setting up environment..."
export NODE_ENV=production

echo "Starting the app for testing..." # need to update
npm start

echo "Build script finished."
