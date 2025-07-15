# Logistics Dashboard

A modern, responsive logistics dashboard built with Next.js 15, shadcn/ui, and Tailwind CSS. Track shipments, monitor inventory levels, and analyze logistics data with a beautiful and intuitive interface.

## Features

- **Modern UI/UX**: Clean, responsive design with dark mode support
- **Real-time Analytics**: Track shipments, inventory, and revenue metrics with interactive charts
- **Search & Filter**: Find shipments and data quickly with advanced filtering
- **Inventory Management**: Monitor stock levels with status indicators
- **Shipment Tracking**: View recent shipments with status updates and ETAs
- **Mobile Responsive**: Works seamlessly on all devices
- **Docker Containerization**: Easy deployment with Docker Compose
- **Mock API**: JSON Server provides realistic test data with 44+ sample records
- **Single Command Startup**: Start everything with one script

## Technology Stack

- **Framework**: Next.js 15.4.1 with App Router
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS 4.0
- **Language**: TypeScript 5
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono
- **Charts**: Recharts for data visualization
- **Containerization**: Docker & Docker Compose
- **Mock API**: JSON Server with comprehensive test data

## Docker Setup (Recommended)

### Quick Start with Single Command

1. **Start everything with one command**:
   ```bash
   ./start-dev.sh
   ```

2. **Access the application**:
   - **Dashboard**: http://localhost:3000
   - **API**: http://localhost:3001
   - **API Documentation**: http://localhost:3001

3. **Stop all services**:
   ```bash
   ./stop-dev.sh
   ```

### Docker Commands

```bash
# Start services
./docker-scripts.sh start

# Stop services
./docker-scripts.sh stop

# Restart services
./docker-scripts.sh restart

# View logs
./docker-scripts.sh logs

# Build containers
./docker-scripts.sh build

# Clean up
./docker-scripts.sh clean
```

### Manual Docker Commands

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild containers
docker-compose build --no-cache
```

## Local Development Setup

If you prefer to run without Docker:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the mock API** (in a separate terminal):
   ```bash
   npx json-server --watch mock-api/db.json --port 3001 --cors
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
Logistics-Dashboard/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Dashboard page
│   ├── components/
│   │   ├── charts/          # Chart components
│   │   │   ├── delivery-performance-chart.tsx
│   │   │   ├── inventory-chart.tsx
│   │   │   ├── revenue-chart.tsx
│   │   │   └── shipment-chart.tsx
│   │   └── ui/              # shadcn/ui components
│   └── lib/
│       ├── utils.ts         # Utility functions
│       └── api.ts           # API service
├── mock-api/
│   └── db.json              # Mock API data (50+ records)
├── public/                  # Static assets
├── docker-compose.yml       # Docker services
├── Dockerfile               # Production build
├── Dockerfile.dev           # Development build
├── docker-scripts.sh        # Docker helper scripts
├── start-dev.sh            # Single command startup
├── stop-dev.sh             # Single command shutdown
└── components.json          # shadcn/ui configuration
```

## Mock API Endpoints

The application includes a comprehensive mock API with 44+ sample records and the following endpoints:

### Shipments
- `GET /shipments` - Get all shipments (15 records)
- `GET /shipments/:id` - Get specific shipment
- `POST /shipments` - Create new shipment
- `PATCH /shipments/:id` - Update shipment
- `DELETE /shipments/:id` - Delete shipment
- `GET /shipments?status=:status` - Filter by status
- `GET /shipments?q=:query` - Search shipments

### Inventory
- `GET /inventory` - Get all inventory items (15 records)
- `GET /inventory/:id` - Get specific item
- `PATCH /inventory/:id` - Update inventory item

### Analytics
- `GET /analytics` - Get analytics data

### Customers
- `GET /customers` - Get all customers (10 records)
- `GET /customers/:id` - Get specific customer

### Carriers
- `GET /carriers` - Get all carriers (4 records)
- `GET /carriers/:id` - Get specific carrier

### API Features
- **CORS enabled** for cross-origin requests
- **Full CRUD operations** on all resources
- **Search and filtering** capabilities
- **Real-time updates** when data changes
- **RESTful design** following best practices
- **Comprehensive test data** with realistic logistics scenarios

## Dashboard Features

### Header Section
- Dashboard title and description
- Action buttons for data export and new shipments
- Responsive design for mobile and desktop

### Search & Filters
- Search input for shipments and tracking numbers
- Filter button for advanced filtering options

### Analytics Cards
- **Total Shipments**: Overall shipment count with growth metrics
- **In Transit**: Currently shipping packages
- **Delivered**: Successfully delivered shipments
- **Revenue**: Financial performance tracking

### Interactive Charts
- **Shipment Performance**: Track delivery times and success rates
- **Revenue Trends**: Monitor financial performance over time
- **Inventory Levels**: Visualize stock levels and trends
- **Delivery Performance**: Analyze carrier and route performance

### Data Sections
- **Recent Shipments**: Latest shipments with status and ETA
- **Inventory Overview**: Stock levels with status indicators (Good/Low/Out)

## Customization

### Adding New Components
To add more shadcn/ui components:
```bash
npx shadcn@latest add <component-name>
```

### Styling
The dashboard uses Tailwind CSS 4.0 with a custom color scheme. Modify `src/app/globals.css` for global styles.

### Data Integration
The API service in `src/lib/api.ts` provides a clean interface for connecting to the mock API. Replace the mock API with real backend services by updating the `NEXT_PUBLIC_API_URL` environment variable in your Docker configuration or local environment.

## Dark Mode

The dashboard automatically supports dark mode based on system preferences. The design includes:
- Dark backgrounds and text colors
- Proper contrast ratios
- Consistent theming across all components

## Responsive Design

The dashboard is fully responsive with breakpoints for:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## Development

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting

### Component Architecture
- Reusable shadcn/ui components
- Consistent design patterns
- Accessible markup
- Interactive chart components

### API Integration
- Type-safe API service
- Error handling
- Loading states
- Real-time data updates

## Deployment

### Docker Deployment
1. Build the production image:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## Troubleshooting

### Common Issues

**Port already in use**:
```bash
# Check what's using the port
lsof -i :3000
lsof -i :3001

# Kill the process
kill -9 <PID>
```

**Docker container issues**:
```bash
# Rebuild containers
./docker-scripts.sh build

# Clean and restart
./docker-scripts.sh clean
./docker-scripts.sh start
```

**API connection issues**:
- Ensure the API container is running: `docker-compose ps`
- Check API logs: `./docker-scripts.sh api-logs`
- Verify API is accessible: `curl http://localhost:3001/shipments`

**Startup script issues**:
- Make scripts executable: `chmod +x start-dev.sh stop-dev.sh`
- Check script permissions: `ls -la *.sh`

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For questions or support, please open an issue in the repository.

---

Built with Next.js 15, shadcn/ui, Tailwind CSS 4, and Docker
