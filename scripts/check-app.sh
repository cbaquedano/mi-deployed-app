echo "Verificando app..."
curl -f http://localhost:3000/health && echo "✅ Health OK" || echo "❌ Health falló"
curl -f http://localhost:3000/ && echo "✅ Home OK" || echo "❌ Home falló"

